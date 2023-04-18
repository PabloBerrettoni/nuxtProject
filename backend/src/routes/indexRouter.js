const express = require('express');
const app = express();
const router = express.Router();
const controller = require('../controllers/indexController');

router.get('/', controller.index);

router.post('/userData', controller.userData);

router.post('/userLogout', controller.userLogout);

router.post('/createUser', controller.create);

router.post('/loginUser', controller.login);

module.exports = router;