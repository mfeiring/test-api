const express = require('express');
const router = express.Router();
const productionController = require('../controllers/production');
const userController = require('../controllers/user');

router.all('*', userController.authorize); // Muligens en grei måte å sørge for at alle private steder blir autorisert?
router.get('/', productionController.getProductions);
router.post('/create', productionController.createProduction);

module.exports = router;
