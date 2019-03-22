
const MongoClient = require('../node_modules/mongodb').MongoClient;

var userName = process.env.DB_USER;
var password = process.env.DB_PASSWORD;
var dbName = process.env.DB_NAME || 'googleimages';
var collectionName = process.env.IMAGE_COLLECTION || 'imageDetails';
var dbHost = process.env.DB_HOST;
var dbPort = process.env.DB_PORT;

var url = `mongodb://${userName}:${password}@${dbHost}:${dbPort}/${dbName}`;
var db_connection;

MongoClient.connect(url, (err, db) => {
  if (err) {
    throw err;
  }
  db_connection = db;
  console.log('DB Connected successfully')
});

module.exports = {
  insert: function (data) {
    console.log('inserting Data');
    db_connection.collection(collectionName).insert(data, (err, res) => {
      if (err) {
        throw err;
      }
      console.log('data Insterted');
    });
  },

  fetchDistinct: function (distinctField, extractDataCallback) {
    db_connection.collection(collectionName).distinct(distinctField, function (err, docs) {
      console.log('fetching Data');
      if (err) {
        throw err;
      }
      extractDataCallback(docs);
    });
  },

  fetch: function (queryObj, coloumnObj, extractDataCallback) {
    db_connection.collection(collectionName).find(queryObj, coloumnObj).toArray(function (err, result) {
      console.log('fetching data');
      if (err) {
        throw err;
      }
      extractDataCallback(result);
    });
  }
}
