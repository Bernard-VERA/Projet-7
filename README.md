# Développez le back-end d'un site de notation de livres  
## Mon Vieux Grimoire
Ce dépot contient le backend de l'application Mon Vieux Grimoire  
  
![image](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![image](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![image](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![image](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![image](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![image](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)


## Prérequis
Avant d'installer et d'exécuter ce projet vous devez avoir installé Node.js et npm.

## Installation du back-end
1. Clonez ce dépot dans un dossier "backend" sur votre ordinateur.
2. Installez les dépendances nécessaires avec la commande `npm install`.
3. __Attention ! L'utilisation d'un fichier ".env" est obligatoire.__ Pour cela,vous devez créer un fichier __.env__ à la racine du back-end.
4. Ce fichier contient les mots de passe pour accéder à la base de données MongoDB. Il devra y avoir deux lignes
* MONGO_DATABASE_USER="xxxxxxxxxxxxxxxxxxxxxx" (les X représentent l'adresse de votre base de données MongoDB, avec identifiant et mot de passe).  
* SECRET_KEY="RANDOM_TOKEN_SECRET"
5. Une fois le fichier __.env__ installé, lancez l'application avec la commande `nodemon server` ou `node server`.
6. L'application sera disponible sur le port 4000.

## Installation du Front-end
Le frontend de l'application est mis à disposition par Openclassrooms, à l'adresse: 
https://github.com/OpenClassrooms-Student-Center/P7-Dev-Web-livres
  
1. Dans le même répertoire que le backend, copiez le repo du frontend.
2. Faites la commande `npm install` pour installer les dépendances puis `npm start` pour lancer le projet.
3. L'application sera disponible à l'adresse http://localhost:3000
4. __Attention ! Sur certaines configurations, des erreurs ESLINT peuvent apparaître au lancement de l'application.__ \
Pour supprimer ces erreurs du frontend, vous pouvez ajouter ce code dans le fichier .eslintrc.json qui se trouve à la racine du "frontend": \
`"rules": {
        "linebreak-style": 0
    }`  
      
## Scénario  

Vous êtes développeur back-end en freelance depuis maintenant un an. Vous avez l’habitude de travailler avec Kévin, un développeur front-end plus expérimenté que vous, et qui a déjà un bon réseau de contacts dans le milieu.  
Kévin vous contacte pour vous proposer de travailler avec lui en mutualisant vos compétences front / back sur un tout nouveau projet qui lui a été proposé. Il s’agit d’une petite chaîne de librairies qui souhaite ouvrir un site de référencement et de notation de livres.  
Kevin vous envoi un message :  

*Développement d’un site de notation de livres*  
*Salut, Ça y est, j’ai terminé le front-end du site ! Tout est disponible sur GitHub. J’ai aussi préparé le document de spécifications techniques de l’API, qui sera en fait ton cahier des charges pour le développement du back-end. Assure-toi que l’ensemble du site fonctionne bien, normalement le front est complètement prêt pour se brancher à ton API.*
*Une fois que tu auras terminé, je te propose qu’on fasse un point tous les deux pour que tu me présentes ton code, et qu’on vérifie que l’application fonctionne bien. Ensuite je pourrai envoyer tout ça au client, et lui présenter le site finalisé.*

*Pièces jointes :*   
* *Spécifications techniques de l’API*  
* *Code du front-end sur GitHub*  

*Dernière requête*  
*Pour que le projet soit conforme aux bonnes pratiques du Green Code, il faut qu’on prenne en compte la taille des images. Dans le Back-End, il faut optimiser les images qui seront envoyées par les utilisateurs. Il y en aura beaucoup.*  
*A bientôt.*

## Mission :  

Ce projet vous amène à développer le back-end d'un site de notation de livres. 
Votre rôle sera de créer un serveur avec Express et de le connecter à une base de données MongoDB. Cela impliquera la mise en place de la structure du serveur et la gestion de la communication entre le serveur et la base de données.
Vous développerez les modèles de données et implémenterez des opérations CRUD (Créer, Lire, Mettre à jour, Supprimer) pour la gestion des livres et des notations. Cela nécessitera une attention particulière à la sécurité des données et à leur stockage sécurisé.
Vous devrez implémenter un système d'authentification sécurisé pour les utilisateurs du site. 
Le projet comprendra également la gestion du téléchargement et de l'optimisation des images, ainsi que l'ajout de fonctionnalités pour noter les livres et calculer la note moyenne.
Vous respecterez les bonnes pratiques du Green Code pour réduire l'empreinte écologique du site.
Pour compléter le projet, vous utiliserez Mongoose pour modéliser les données MongoDB, et vous suivrez une architecture MVC (Modèle-Vue-Contrôleur) pour structurer votre application.

## Compétences :  

* Le développement back-end, en particulier avec Node.js, Express, et MongoDB, est essentiel pour créer des applications web modernes et performantes. 
* La maîtrise des opérations CRUD, de la sécurité des données, et de l'authentification sont des compétences clés pour tout développeur back-end. 
* De plus, l'expérience avec l'architecture MVC et la création d'API RESTful vous préparera à travailler sur des applications web full-stack complexes.
