let { createTransport } = require('nodemailer');
const logger = require('../../utils/logging');
let twilio = require('twilio');
let config = require('../../config')

// Nodemailer
const email = config.email
const password = config.email_password

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: email,
        pass: password
    }
});

const sendEmail = async (subject, user, cart, totalPrice) => {
    const options = {
        to: email,
        subject,
        html: subject == 'Nuevo registro' ?
            `
        <h1>Nuevo registro</h1>
        <ul>
            <li>Nombre: ${user.name}</li>
            <li>Edad: ${user.age}</li>
            <li>Dirección: ${user.address}</li>
            <li>Teléfono: ${user.tel}</li>
            <li>Email: ${user.email}</li>
            <li>Contraseña: ${user.password}</li>
        </ul>
        `
            :
            `
         <h1>Nuevo pedido</h1>
         <p>De:</p>
         <ul>
            <li>Nombre: ${user.name}</li>
            <li>Email: ${user.email}</li>
         </ul>
         <p>Productos:</p>
         <ul>
        ${cart.products.map(product => {
                return `
            <li>Nombre: ${product.name}</li>
            <li>Cantidad: ${product.quantity}</li>
            <li>Subtotal: ${product.price * product.quantity}</li>
            `
            })}
         </ul>
         <p>Total: ${totalPrice}</p>
         `
    }
    try {
        await transporter.sendMail(options)
    }
    catch (err) {
        logger.error(err)
    }
}

//Twilio
const accountSid = config.account_sid
const authToken = config.auth_token

const client = twilio(accountSid, authToken);

const sendMessage = async (message, receiver, method) => {
    const options = {
        body: message,
        from: method == 'whatsapp' ? 'whatsapp:+14155238886' : '+19035679992',
        to: receiver
    }
    try {
        await client.messages.create(options);
    }
    catch (err) {
        logger.error(err);
    }
};

module.exports = { sendEmail, sendMessage }