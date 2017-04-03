var addUsers = function(records) {
    console.log("Hey i am trying to connect to DB");
    //lets require/import the mongodb native drivers.
    var mongodb = require('mongodb');

    //We need to work with "MongoClient" interface in order to connect to a mongodb server.
    var MongoClient = mongodb.MongoClient;

    // Connection URL. This is where your mongodb server is running.
    var url = 'mongodb://localhost:27017/my_database';

    // Use connect method to connect to the Server
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //HURRAY!! We are connected. :)
            console.log('Connection established to', url);

            // do some work here with the database.

            // Get the documents collection
            var collection = db.collection('users');

            // Insert some users
            collection.insert(records, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                }
                //Close connection
                db.close();
            });

            //Close connection
            db.close();
        }
    });
}

var getAllUsers = function() {
    console.log("Getting all users");
    //lets require/import the mongodb native drivers.
    var mongodb = require('mongodb');

    //We need to work with "MongoClient" interface in order to connect to a mongodb server.
    var MongoClient = mongodb.MongoClient;

    // Connection URL. This is where your mongodb server is running.
    var url = 'mongodb://localhost:27017/my_database';

    return new Promise(function(resolve, reject) {
        // Use connect method to connect to the Server
        MongoClient.connect(url, function(err, db) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
                reject(err);
            } else {
                //HURRAY!! We are connected. :)
                console.log('Connection established to', url);
                resolve(db);

            }
        });
    }).then(function(db) {

        return new Promise(function(resolve, reject) {
          // do some work here with the database.
          //console.log(db.collection('users').find({}))
          var result = [];
         db.collection('users').find().toArray(function(err, items) {
           if(err){
             reject(err);
           }else{
              resolve(items);
             //Close connection
             db.close();
           }

         });


        });

    });

}
var deleteUser = function(id) {
    console.log("Delete user");
    //lets require/import the mongodb native drivers.
    var mongodb = require('mongodb');

    //We need to work with "MongoClient" interface in order to connect to a mongodb server.
    var MongoClient = mongodb.MongoClient;

    // Connection URL. This is where your mongodb server is running.
    var url = 'mongodb://localhost:27017/my_database';

    return new Promise(function(resolve, reject) {
        // Use connect method to connect to the Server
        MongoClient.connect(url, function(err, db) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
                reject(err);
            } else {
                //HURRAY!! We are connected. :)
                console.log('Connection established to', url);
                resolve(db);

            }
        });
    }).then(function(db) {

        return new Promise(function(resolve, reject) {
          // do some work here with the database.
          console.log("In DAO Layer, id:" + id);

         db.collection('users').remove({"_id": new mongodb.ObjectID(id)},function(err, result) {
           if(err){
             console.log(err);
             reject(err);
           }else{
              resolve(result);
             //Close connection
             db.close();
           }

         });


        });

    });

}

//{"_id": new mongodb.ObjectID("58e20ce1ad775b10a03b71c0")}
exports.addUsers = addUsers;
exports.getAllUsers = getAllUsers;
exports.deleteUser = deleteUser;
