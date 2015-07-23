# NodeMVC v1.0.0
**NodeMVC** est un squelette d'application pour **[Node-Webkit](http://nwjs.io/)**.<br>
Il utilise le framework web **[ExpressJS](http://expressjs.com/)** ainsi le moteur de template **[Mustache](https://mustache.github.io/)**.<br>
Pour ce qui est de la gestion des base de données, il utilise **[NeDB](https://github.com/louischatriot/nedb)** mais simplifiée grâce au module **Models**.<br>
<br>
Le squelette est déjà tout configurer pour fonctionner avec les modules cités ci-dessus, inutile de plonger les mains de le cambouis.


## Dossiers
* *core* : Vos modules personnels
* *databases* : Les bases de données **NeDB**
* *models* : Module permettant une gestion simplifiée des bases de données **NeDB**
* *public* : CSS, JS, images ... qui permettent à votre application de fonctionner
* *routes* : Gestion des routes de l'application
* *server* : Le serveur web qui est appelé lors du lancement de l'application
* *views* : Emplacement où sont sockés les vues


## Utilisation

### Changer le port par defaut de l'application
Modifiez la variable `global.port` dans le fichier *server/server.js* et rentrez votre numéro de port.

### Charger une base de données
Modifiez le fichier *server/server.js* et ajoutez, dans l'objet de la fonction `loadModel` :<br>
`nom_de_la_bdd: chemin_vers_la_bdd`<br>
<br>
Si votre base de donnée est dans le dossier de l'application : <br>
`nom_de_la_bdd: path.join(global.data_path, 'databases/ma_bdd')`

### Ajouter de nouvelles routes
* Commencez par modifier le fichier *routes/routes.js* en ajoutant votre module comme ceci :<br>
`router.use('/prefix_de_la_route', require('./nom_du_module'));`<br>
* Puis créez un nouveau fichier en vous basant sur planets.js

### Les requêtes de la base de données
Le module *Models* qui est dans *models/models.js* est documenté, lisez donc la documentation

### Ajouter un dossier de ressources
Ajoutez à la suite de `app.use('/public', express.static('public'))` dans le fichier *server/server.js* :<br>
`app.use('/prefix_du_dossier', express.static('dossier_a_inserer'));`


## Installation
* Téléchargez **[Node-Webkit](http://nwjs.io/)**
* Installer les modules `npm install`