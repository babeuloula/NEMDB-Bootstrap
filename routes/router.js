/**
 * Module permettant une gestion des routes de l'application
 * @author BaBeuloula <contact@babeuloula.fr>
 */


var express = require('express');
var router = express.Router();


/**
 * Inscrivez ici vos routes avec le prefix de la route suivi du module
 */
router.use('/', require('./index'));
router.use('/hello', require('./hello'));
router.use('/planets', require('./planets'));



module.exports = router;