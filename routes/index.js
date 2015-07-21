/**
 * Routes d'index (/)
 * @author BaBeuloula <contact@babeuloula.fr>
 */

var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
    res.render('Index\\index.mustache');
});

module.exports = router;