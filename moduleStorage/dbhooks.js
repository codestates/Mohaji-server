require('dotenv').config();
const crypto = require('crypto');
const secret = process.env.cryptoSecret;

module.exports = {
    password: (password) => {
      let hash = crypto.createHmac('sha256', secret);
      hash.update(password);
      return hash.digest('hex');
  }
}