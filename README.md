# Mon Vieux Grimoire
Ce dépot contient le backend de l'application Mon Vieux Grimoire

## Prérequis
Avant d'installer et d'exécuter ce projet vous devez avoir installé Node.js et npm.

## Installation
1. Clonez ce dépot dans un dossier "backend" sur votre ordinateur.
2. Installez les dépendances nécessaires avec la commande `npm install`.
3. __ Attention ! L'utilisation d'un fichier ".env" est obligatoire. __ Pour l'instant, ce fichier est uniquement accessible à l'équipe éducative d'Openclassrooms, dans le cadre de ma formation.
4. __ Copiez le fichier ".env" fourni dans les livrables, sur le site d'Openclassrooms et collez-le à la racine du dossier "backend".__ Ce fichier contient les mots de passe pour accéder à la base de données.
5. Une fois le fichier ".env" installé, lancez l'application avec la commande `nodemon server` ou `node server`

## Frontend
Le frontend de l'application est mis à disposition par Openclassrooms, à l'adresse:\  
https://github.com/OpenClassrooms-Student-Center/P7-Dev-Web-livres

1. Faites la commande `npm install` pour installer les dépendances puis `npm start` pour lancer le projet.
2. L'application sera disponible à l'adresse http://localhost:3000
3. __ Attention ! Sur certaines configurations, des erreurs ESLINT peuvent apparaître au lancement de l'application. __ \
Pour corriger ces erreurs, vous pouvez ajouter ce code dans le fichier .eslintrc.json qui se trouve à la racine du "frontend": \ 
"rules": {
        "linebreak-style": 0
    }