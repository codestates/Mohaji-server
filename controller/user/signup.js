const { user } = require('../../models');
const { user_tag } = require('../../models');

module.exports = {
    post: async (req, res) => {
        let { email, nickname, password, tag } = req.body
        let [result, created] = await user.findOrCreate({
            where: { email },
            defaults: {
                nickname,
                password,
                social: false
            }
        });

        if (!created) {
            return res.status(409).send('이미 존재하는 이메일입니다.');
        } else {
            for (let i in tag) {
                if (tag[i]) {
                    user_tag.create({
                        user_id: result.id,
                        tag_id: i
                    })
                }

            }
            return res.status(200).send(result.nickname);
        }
    }
}

