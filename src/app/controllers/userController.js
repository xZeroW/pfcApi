const User = require("../models/User");

const bcrypt = require('bcrypt');
const crypto = require('crypto');


const createEmail = require('../functions/createEmail');
const mailer = require('../../modules/mailer');

module.exports = {
   create: async (req, res) => {
      try {
         const { first_name, last_name, email, password } = req.body;

         const verifyEmail = await User.findOne({ where: { email } });

         if (verifyEmail) {
            return res.status(409).json({ menssage: 'User already exists' });
         } else {

            const hashedPassword = await bcrypt.hashSync(password, 10);

            const registeredUser = await User.create({
               first_name,
               last_name,
               email,
               password: hashedPassword,
            });

            if (!registeredUser) {
               return res.status(400).json({ error: `Error when registering user [ERROR: ${registeredUser}]` })
            };

            registeredUser.password = undefined;
            registeredUser.password_reset_token = undefined;
            registeredUser.password_token_expires = undefined;

            await mailer.sendMail(createEmail.welcome(registeredUser));
            return res.status(201).json({ registeredUser });
         }

      } catch (err) {
         console.error(err);
         return res.status(400).json({ error: err });
      }
   },

   forgotPassword: async (req, res) => {
      try {
         const { email } = req.body;

         const user = await User.findOne({ where: { email } });

         if (!user) {
            return res.status(400).json({ error: 'User not found' });
         };

         const token = crypto.randomBytes(10).toString('hex');

         const now = new Date();
         now.setHours(now.getHours() + 1);

         await User.update({
            password_reset_token: token,
            password_token_expires: now
         }, {
            where: { id: user.id }
         });

         mailer.sendMail(createEmail.forgotPassword(user, token), (err => {

            if (err) {
               console.log(err);
               return res.status(400).json({ error: 'Cannot send forgot password e-mail' });
            };

            return res.status(200).json({ ok: true });
         }));

      } catch (err) {
         console.error(err);
         return res.status(400).json({ error: err });
      }
   },

   resetPassword: async (req, res) => {
      try {
         const { email, token, new_password } = req.body;

         const user = await User.findOne({ where: { email } });

         if (!user) {
            return res.status(400).json({ error: 'User not found' });
         };

         if (token !== user.password_reset_token) {
            return res.status(400).json({ error: 'Token invalid' });
         };

         const now = new Date();

         if (now > user.password_token_expires) {
            return res.status(400).json({ error: 'Token expired' });
         };

         const hashedNewPassword = await bcrypt.hashSync(new_password, 10);

         user.password = hashedNewPassword;

         await user.save().then(ok => {
            return res.status(200).json({ ok: true });
         }).catch(err => {
            console.log(err);
            return res.status(400).json({ error: 'Error changing password, please try again' });
         });

      } catch (err) {
         console.error(err);
         return res.status(400).json({ error: err });
      }
   },
};


