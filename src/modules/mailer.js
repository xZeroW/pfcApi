const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const { host, port, secure, auth } = require('../config/mail.json');

const transport = nodemailer.createTransport({
   host,
   port,
   secure,
   auth
});

const handlebarOptions = {
   viewEngine: {
     extName: '.hbs',
     partialsDir: path.resolve(__dirname, '../resources/templates'),
     layoutsDir: path.resolve(__dirname, '../resources/templates'),
     defaultLayout: '',
   },
   viewPath: path.resolve(__dirname, '../resources/templates'),
   extName: '.hbs',
};

transport.use('compile', hbs(handlebarOptions));

module.exports = transport;
