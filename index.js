// Requires
const express = require('express');
const cors = require('cors');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoStore = require('connect-mongo');
const serverRoutes = require('./routes');
const config = require('./config');
const cluster = require("cluster");
const numCPUs = require('os').cpus().length;
const compression = require('compression');
const logger = require('./utils/logging');
let methodOverride = require('method-override');
const { Server: HttpServer } = require('http');
const Sockets = require('./utils/sockets');

// Variables
const app = express();
const mongoSettings = { useNewUrlParser: true, useUnifiedTopology: true };
const server = new HttpServer(app);
const socket = new Sockets(server);


// Middlewares
app.use(cors(config.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(methodOverride('_method'));
app.engine(
    "hbs",
    handlebars({
        extname: '.hbs',
        defaultLayout: 'main.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials',
    })
);
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static('public'));
app.use(cookieParser());
app.use(session({
    store: mongoStore.create({
        mongoUrl: config.mongo_db_uri,
        mongoOptions: mongoSettings
    }),
    secret: 'secret',
    resave: true,
    rolling: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 600000
    }
}))
app.use((req, res, next) => {
    logger.info(`ruta: ${req._parsedUrl.pathname}, método: ${req.method} - PETICIÓN RECIBIDA`)
    next();
});

// Routes and sockets
socket.listenConnection();
serverRoutes(app);

// Start on cluster or fork mode
if (config.mode === 'CLUSTER' && cluster.isMaster) {
    logger.info(`Master PID: ${process.pid}`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        logger.info(`Subproceso ${worker.process.pid} muerto.`);
        cluster.fork();
    });
} else {
    server.listen(process.env.PORT || config.port, () => {
        logger.info(`Connected to http://localhost:${config.port}`)
    })
}

// Errors
app.all('*', (req, res, next) => {
    logger.warn(`ruta: ${req._parsedUrl.pathname}, método: ${req.method} - NO IMPLEMENTADO`)
    res.send(`ruta: ${req._parsedUrl.pathname}, método: ${req.method} - NO IMPLEMENTADO`)
})

server.on('error', error => logger.error(error));