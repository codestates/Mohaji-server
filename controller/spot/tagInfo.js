let { tag } = require('../../models');

module.exports = {
    get: async (req, res) => {
        let findAllTag = await tag.findAll();
        let tagData = findAllTag.reduce((acc, val) => {
            let { id, tag_name } = val;
            acc.push({ id, tag_name });
            return acc
        }, [])
        res.status(200).json(tagData)
    },



    post: async (req, res) => {
        let { tag_name } = req.body
        let [result, created] = await tag.findOrCreate({ where: { tag_name } });

        if (!created) {
            return res.status(409).end();
        } else {
            return res.status(201).end();
        }
    }
}