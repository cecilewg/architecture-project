const express = require('express');
const app = express();

app.set('view engine', 'pug');

// mongodb
const dbName = 'db';
const collectionName='velib';
// const url = "mongodb://localhost:27017/";
const url = "mongodb+srv://cecile:cecile@cluster0.1byvq.mongodb.net/test"
const mongoClient = require('mongodb').MongoClient;

// Gestion des routes
// Accueil
app.get('/',  function (req, res) {
    console.log("Page index");

    // Me connecter à mongo et renvoyer des données à mon template pug
    mongoClient.connect(url, { useUnifiedTopology: true }, function (err,client){
        const collection = client.db(dbName).collection(collectionName);
        collection.find().toArray(function (err, data){
            res.render('index', { velib : data});
        })
    })
});

app.listen(3456, function(){
    console.log('App started at http://localhost:3456');
})
