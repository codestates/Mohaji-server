const express = require('express');
const router = express.Router();

const { spotController } = require('../controller')

router.get('/taginfo', spotController.taginfo.get);
router.post('/taginfo', spotController.taginfo.post);
router.get('/comment/:playspot_id', spotController.comment.get);
router.post('/comment', spotController.comment.post);



module.exports = router;