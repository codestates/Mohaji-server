const { user } = require('../../models');
const { user_tag } = require('../../models');
const { tag } = require('../../models')

module.exports = {
    get: async (req, res) => {
        let { userid } = req.session;
        if (userid) {
            let data = await user.findOne({
                where: { id: userid.id },
                include: [
                    {
                        model: user_tag,
                    },

                    {
                        model: user_tag,
                        include: {
                            model: tag,

                        }
                    }
                ]
            })

            let tagOfUser = data.user_tags.map((val) => val.tag_id)
            let userInfo = {
                email: data.email,
                nickname: data.nickname,
                tag: tagOfUser
            }
            res.status(200).json(userInfo);
        } else {
            res.status(404).send('session not fonud');
        }
    }

};
