const express = require('express');
const cors = require("cors");
const helmet = require('helmet');
const cron = require('node-cron');
const { errors } = require('celebrate');
const jwtCheck = require('./app/middlewares/auth0');

require('./database');
const routes = require('./routes');
const checkProjectsLate = require('./app/functions/checkProjectsLate');

const app = express();
var whitelist = ['http://localhost:3000', 'https://myproject-five.now.sh']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));
app.use(jwtCheck);
app.use(helmet());
app.use(express.json());
app.use(routes);
app.use(errors());
app.use (function (req, res, next) {
  if (req.secure) {
    // request was via https, so do no special handling
    next();
  } else {
    // request was via http, so redirect to https
    res.redirect('https://' + req.headers.host + req.url);
  }
});

cron.schedule('30 12 * * *', () => {
  checkProjectsLate();
}, {
  scheduled: true,
  timezone: "America/Sao_Paulo"
});

module.exports = app;
