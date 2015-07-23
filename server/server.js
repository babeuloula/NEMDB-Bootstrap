/**
 * Dépôt git
 * @url https://github.com/babeuloula/NodeMVC
 * 
 * Coeur du système, Le serveur web qui est appelé lors du lancement de l'application
 * @author BaBeuloula <contact@babeuloula.fr>
 */


var express = require('express');
var app = express();
var mustacheExpress = require('mustache-express');
var path = require('path');
var WindowManager = require('node-webkit-window-manager').windowManager;
var gui = require('nw.gui');
var win = gui.Window.get();


/**
 * Variables global
 *      debug: Si l'application est en mode debug ou non (utilisée lors de l'affichage ou non de la toolbar)
 *      port: Numéro de port de l'application
 *      version: Numéro de version de l'application
 *      data_path: Dossier de l'application
 */
global.debug = true;
global.port = 1337;
global.version = require('nw.gui').App.manifest.version;
global.data_path = path.dirname(process.execPath) + path.sep;



/**
 * Models
 */
global.models = require('../models/models');
global.models.loadModel({
    // Ajoutez ici vos bases de données
    planets: path.join(global.data_path, 'databases/planets.db')
});



/**
 * Routes
 **/
var router = require('../routes/router');
app.use(router);



/**
 * Gestion des erreurs
 **/
app.use(function(req, res, next) {
    res.status(404).render('Error\\404.mustache');
});


/**
 * Dossier des ressources
 **/
app.use('/public', express.static('public'));



/**
 * Système de vues
 **/
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(global.data_path, 'views'));



/**
 * Démarrage du serveur
 **/
var server = app.listen(global.port, function () {
    global.windowManager = new WindowManager(gui, {
        "application": {
            page: 'http://127.0.0.1:' + global.port,
            options: {
                frame : true,
                toolbar: global.debug,
                width: 1024,
                height: 600,
                min_width: 1024,
                min_height: 600,
                resizable: true,
                title: "NEMDB Bootstrap",
                show: true
            }
        }
    });

    // On ouvre la fenêtre app
    var application = global.windowManager.open('application');

    // On maximize la fenêtre au démarrage
    application.maximize();

    // On ferme la fenêtre de chargement
    win.close();

    // Si jamais on veut détecter la fermeture de l'application
    /*app.on('close', function() {
        alert('CLOSE !');
    });*/
});