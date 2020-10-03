//const { playspot } = require('../../models');
const { comment } = require('../../models');
const { user } = require('../../models');

module.exports = {
    get: async (req, res) => {
        let {playspot_id} = req.params
        let data = await comment.findAll({
            attributes: ['message', 'createdAt', 'updatedAt'],
            where: { playspot_id },
            include: [
                {
                    model: user,
                    attributes: ['nickname']
                }
            ]
        });
        data = JSON.parse(JSON.stringify(data)).map((val) => {
            val.nickname = val.user.nickname;
            delete val.user;
            return val
        })
        res.status(200).json(data)
    },

    post: async (req, res) => {
        let { userid } = req.session;
        let { message, playspot_id } = req.body;
        if (userid) {
            let data = await comment.create({
                playspot_id: playspot_id,
                message: message,    
                user_id: userid.id,
            })
            res.status(201).json(data);
        } else {
            res.status(400).send("잘못된 요청입니다.")
        }
    }
}
