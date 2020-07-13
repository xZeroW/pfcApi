const User = require("../models/User");
const bcrypt = require('bcrypt');
const generateToken = require('../functions/token');

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(400).json({ message: 'User does not exists' });
      };

      const verifyPassword = await bcrypt.compareSync(password, user.password);

      if (!verifyPassword) {
        return res.status(400).json({ message: 'Invalid Password' });
      };

      user.password = undefined;
      user.password_reset_token = undefined;
      user.password_token_expires = undefined;

      const token = generateToken(user);

      return res.status(200).json({ user, token });

    } catch (err) {
      console.error(err);
      return res.status(400).json({ error: err });
    };
  },
}