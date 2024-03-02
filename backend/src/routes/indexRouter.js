const express = require('express');
const app = express();
const router = express.Router();
const controller = require('../controllers/indexController');

router.get('/', controller.index);

router.post('/api/userData', controller.userData);

router.post('/api/createUser', controller.create);

router.post('/api/loginUser', controller.login);

router.get('/indexPokeFav', controller.indexPokeFav);

router.post('/api/addPokeFav', controller.addPokeFav);

router.delete('/api/deletePokeFav', controller.deletePokeFav);

module.exports = router;