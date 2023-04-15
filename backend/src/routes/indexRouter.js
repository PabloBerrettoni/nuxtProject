const express = require('express');
const app = express();
const router = express.Router();
const controller = require('../controllers/indexController');

router.get('/', controller.index);

router.post('/createUser', controller.create);

module.exports = router;