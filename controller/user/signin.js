const { user } = require('../../models');

module.exports = {
    post: async (req, res) => {
        let { email, password } = req.body;
        let data = await user.findOne({ where: { email: email, password: password } });
        if (data) {
            req.session.userid = { id: data.id };
            res.status(200).json(data.nickname);
        } else {
            res.status(404).send("User is not invalid.");
        }
    }

};


