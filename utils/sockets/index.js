const { Server: IOServer } = require("socket.io");
const moment = require('moment');
const chat = require('../../components/chat/services/chatService');
const util = require('util');
const logger = require('../../utils/logging');

let allMessages;

const getMessages = async () => {
    allMessages = await chat.getMessages()
    // print(normalizedData)
}
getMessages()

function print(obj) {
    logger.info(util.inspect(obj, false, 4, true))
}

class Sockets {
    constructor(server) {
        this.io = new IOServer(server);
    }

    listenConnection = () => {
        try {
            this.io.on('connection', socket => {

                logger.info('Nuevo usuario conectado', socket.id);
                // chat
                socket.emit('server:loadmessages', allMessages);

                socket.on('chat:newmessage', async data => {
                    const message = {
                        author: {
                            name: data.name,
                            email: data.email,
                            avatar: data.avatar
                        },
                        message: data.message,
                        time: moment().format("DD/MM/YYYY h:mm:ss A")
                    }
                    await chat.pushMessages(message);
                    getMessages()
                    this.io.sockets.emit('server:newmessage', message);
                });

                socket.on('chat:typing', data => {
                    socket.broadcast.emit('server:chat-typing', data);

                })
                // end chat
            })
        }
        catch (err) {
            logger.error(err)
        }
    }
}

module.exports = Sockets