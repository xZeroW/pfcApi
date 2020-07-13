const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

module.exports = function generateToken(params = {}){
   return jwt.sign({ 
      params, 
      expiresIn: Math.floor(Date.now() / 2000) + (60 * 60), 
   }, authConfig.secret);
};