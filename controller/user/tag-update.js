const { user } = require('../../models');
const { user_tag } = require('../../models');

module.exports = {
    post: async (req, res) => {
        let { userid } = req.session;
        let { tag } = req.body;
        if (userid) {
            let userData = await user.findOne({ where: { id: userid.id } });
            user_tag.destroy({ where: { user_id: userData.id } });
            for (let i in tag) {
                if (tag[i]) {
                    await user_tag.create({ user_id: userData.id, tag_id: i });
                }
            }
            return res.status(201).send('수정 완료')
        } else {
            return res.status(401).send('session not fonud')
        }
    }
};