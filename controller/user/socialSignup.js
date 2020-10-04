const axios = require('axios');
const { user:User, user_tag:User_tag } = require('../../models');
require('dotenv').config();

module.exports = {
  post: async (req, res) => {
    let { token, nickname, tag } = req.body;
    let { data:result, status } = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`).catch(err => err.response);
    if (status === 200 && result.azp === process.env.google_client_id && nickname && tag) {
      let user = await User.create({
        nickname,
        social: true,
        social_id: result.sub
      }).catch(err=>console.log(err));
      console.log(result.sub)
      if (user) {
        for (let i in tag) {
          if (tag[i]) {
            User_tag.create({
              user_id: result.id,
              tag_id: i
            })
          }
        }
        res.status(201).send();
      } else {
        res.status(500).send();
      }
    } else {
      res.status(400).send('올바르지 않은 접근입니다.');
    }
  }
}