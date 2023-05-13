const express = require('express');
const app = express();
const router = express.Router();
const controller = require('../controllers/indexController');

router.get('/', controller.index);

router.post('/userData', controller.userData);

router.post('/createUser', controller.create);

router.post('/loginUser', controller.login);

router.get('/indexPokeFav', controller.indexPokeFav);

router.post('/addPokeFav', controller.addPokeFav);

router.delete('/deletePokeFav', controller.deletePokeFav);

module.exports = router;