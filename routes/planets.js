/**
 * Dépôt git
 * @url https://github.com/babeuloula/NodeMVC
 * 
 * Routes de planets (/planets)
 * @author BaBeuloula <contact@babeuloula.fr>
 */


var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
    // Là où seront stockés les données de la base de données
    var datas = {
        planets: null
    };

    // Le nombre de requêtes éxecutées
    var nbReq = 0;


    // La requète pour recupérer les planets
    models.findAll('planets', function(err, docs) {
        if(err === null) {
            datas.planets = docs;
            nbReq++;
        }
    });


    // On attend que toutes les requêtes soit terminées avant de lancer notre rendu
    var interval = setInterval(function() {
        if(nbReq === Object.keys(datas).length) {
            clearInterval(interval);

            res.render('Planet\\planets.mustache', {
                planets: datas.planets
            });
        }
    }, 100);
});

/**
 * Vous pouvez faire passer des paramètres aux routes
 * :_id est le paramètre qui pourra être utilisé pour aller chercher dans notre base de donnée
 * Les conditions sont sous forme de regex et placés entre () après le paramètre
 */
router.get('/:_id([0-9]+)', function (req, res) {
    // Là où seront stockés les données de la base de données
    var datas = {
        planet: null
    };

    // Le nombre de requêtes éxecutées
    var nbReq = 0;


    // La requète pour recupérer les planets
    models.find('planets', { _id: req.params._id }, function(err, docs) {
        if(err === null) {
            datas.planet = docs;
            nbReq++;
        }
    });


    // On attend que toutes les requêtes soit terminées avant de lancer notre rendu
    var interval = setInterval(function() {
        if(nbReq === Object.keys(datas).length) {
            clearInterval(interval);

            res.render('Planet\\planet.mustache', {
                planet: datas.planet[0].planet,
                system: datas.planet[0].system
            });
        }
    }, 100);
});





module.exports = router;