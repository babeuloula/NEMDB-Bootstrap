/**
 * Routes de hello (/hello)
 * @author BaBeuloula <contact@babeuloula.fr>
 */


var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
    res.render('Hello\\hello.mustache', {
        name: 'World'
    });
});


/**
 * Vous pouvez faire passer des paramètres aux routes
 * :name est le paramètre qui pourra être utilisé pour aller chercher dans notre base de donnée
 * Les conditions sont sous forme de regex et placés entre () après le paramètre
 */
router.get('/:name([a-zA-Z0-9]+)', function (req, res) {
    /**
     * On récupère la valeur du paramètre
     */

    res.render('Hello\\hello.mustache', {
        name: req.params.name
    });
});

module.exports = router;