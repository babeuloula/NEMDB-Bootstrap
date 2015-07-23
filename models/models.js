/**
 * Dépôt git
 * @url https://github.com/babeuloula/NodeMVC
 * 
 * Module permettant une gestion plus facile des bases de données NeDB
 * @author BaBeuloula <contact@babeuloula.fr>
 *
 * Si vous souhaitez plus d'information sur NeDB
 * @url https://github.com/louischatriot/nedb
 */


var Datastore = require('nedb');
var path = require('path');


// Dossier de l'application
var data_path = path.dirname(process.execPath) + path.sep;


var models = {
    /**
     * Objet contenant nos bases de données
     */
    db: {},


    /**
     * Charge les bases de données
     *
     * @param databases object Structuré comme ceci : {nom_de_la_bdd: chemin_vers_la_bdd}
     */
    loadModel: function(databases) {
        for(var database in databases) {
            models.db[database] = new Datastore({
                filename: databases[database],
                autoload: true
            });
        }
	},

    /**
     * Permet de compacter les bases de données
     *
     * @param database string (optionnel) Nom de la base de données à compacter. S'il n'est pas rentré, toutes les bases seront compactées
     */
    compactDatabase: function(database) {
        if(database === undefined) {
            for(var database in models.db) {
                models.db[database].persistence.compactDatafile;
            }
        } else {
            models.db[database].persistence.compactDatafile;
        }
    },


    /**
     * Permet de récupérer toutes les informations de la base de données
     * https://github.com/louischatriot/nedb#finding-documents
     *
     * @param dbname string Nom de la base de données
     * @param options object (optionnel) Options de tri et pagination (https://github.com/louischatriot/nedb#sorting-and-paginating)
     * @param callback function(err, docs) Données de la base de données
     */
    findAll: function(dbname, options, callback) {
        models.find(dbname, {}, options, callback);
    },


    /**
     * Permet de récuprer certaines colonnes de la base de données
     * @url https://github.com/louischatriot/nedb#finding-documents
     *
     * @param dbname string Nom de la base de données
     * @param where object Clause where
     * @param options object (optionnel) Options de tri et pagination (https://github.com/louischatriot/nedb#sorting-and-paginating)
     * @param callback function(err, docs) Données de la base de données
     */
    find: function(dbname, where, options, callback) {
        var getType = {};
        if(options === undefined || getType.toString.call(options) === '[object Function]') {
            callback = options;
            options = {
                sort: {},
                skip: 0,
                limit: 0
            };
        }

        models.db[dbname]
            .find(where)
            .sort(options.sort)
            .skip(options.skip)
            .limit(options.limit)
            .exec(function (err, docs) {
                callback(err, docs);
            }
        );
    },


    /**
     * Compte le nombre d'occurence dans la base de données
     * @url https://github.com/louischatriot/nedb#counting-documents
     *
     * @param dbname string Nom de la base de données
     * @param datas object (optionnel) Nom des colonnes
     * @param callback function(err, count) Données de la base de données
     */
    count: function(dbname, datas, callback) {
        var getType = {};
        if(datas === undefined || getType.toString.call(datas) === '[object Function]') {
            callback = datas;
            datas = {};
        }

        models.db[dbname].count(datas, function (err, count) {
            callback(err, count);
        });
    },


    /**
     * Permet de faire une insertion dans la base de donnée
     * @url https://github.com/louischatriot/nedb#inserting-documents
     *
     * @param dbname string Nom de la base de données
     * @param datas object Données à insrérer
     * @param callback function(err, newDoc) Données de la base de données
     */
    insert: function(dbname, datas, callback) {
        models.db[dbname].insert(datas, function(err, newDoc) {
            callback(err, docs);
        });
    },


    /**
     * Permet de modifier une entrée (ou plusieurs) dans la base de données
     * @url https://github.com/louischatriot/nedb#updating-documents
     *
     * @param dbname string Nom de la base de données
     * @param where object Clause where
     * @param datas object Données à mettre à jour ()
     * @param options object (optionnel) Option de la modification
     * @param callback function(err, numReplaced, newDoc) Données de la base de données
     */
    update: function(dbname, where, datas, options, callback) {
        var getType = {};

        if(options === undefined || getType.toString.call(options) === '[object Function]') {
            callback = options;
            options = {
                multi: true
            };
        }

        models.db[dbname].update(
            where,
            datas,
            options,
            function (err, numReplaced, newDoc) {
                callback(err, numReplaced, newDoc);
            }
        );
    },


    /**
     * Permet de supprimer une entrée (ou plusieurs) de la base de données
     * @url https://github.com/louischatriot/nedb#removing-documents
     *
     * @param dbname string Nom de la base de données
     * @param where object Clause where
     * @param options object (optionnel) Option de la suppréssion
     * @param callback function(err, numRemoved) Données de la base de données
     */
    remove: function(dbname, where, options, callback) {
        var getType = {};

        if(options === undefined || getType.toString.call(options) === '[object Function]') {
            callback = options;
            options = {
                multi: true
            };
        }

        models.db[dbname].remove(datas, options, function (err, numRemoved) {
            callback(err, numRemoved);
        });
    }
};







// On renvoi notre module
module.exports = models;