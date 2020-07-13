const express = require('express');
const cors = require("cors");
const helmet = require('helmet');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cron = require('node-cron');
const { errors } = require('celebrate');

require('./database');
const routes = require('./routes');
const checkProjectsLate = require('./app/functions/checkProjectsLate');

const app = express();
const appOrigin = process.env.appOrigin;

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: process.env.jwksUri
}),
audience: process.env.audience,
issuer: process.env.issuer,
algorithms: ['RS256']
});

app.use(cors({ origin: appOrigin }));
app.use(jwtCheck);
app.use(helmet());
app.use(express.json());
app.use(routes);
app.use(errors());

cron.schedule('30 12 * * *', () => {
  checkProjectsLate();
}, {
  scheduled: true,
  timezone: "America/Sao_Paulo"
});

module.exports = app;
