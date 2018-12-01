var express = require('express');
var router = express.Router();
var controller = require('../controllers/bebidaController');

router.post('/api/bebidasAlcoholicas', controller.create);
router.get('/api/bebidasAlcoholicas', controller.getAll);
router.get('/api/bebidasAlcoholicas/:id', controller.getOne);
router.delete('/api/bebidasAlcoholicas/:id', controller.delete);
router.put('/api/bebidasAlcoholicas/:id', controller.update);

module.exports = router;