
const MongoClient = require('../node_modules/mongodb').MongoClient;
var dbName = 'googleImages';
var collectionName = 'imageDetails';

var url = "mongodb://localhost:27017/"+dbName;


module.exports = {
    insert: function(data){
    	console.log('inserting Data')
    	        
    	MongoClient.connect(url, function(err, db) {
        	if (err)
          		throw err;

          db.collection(collectionName).insert(data, (err, res)=>{
          	if (err) throw err;
          	console.log('data Insterted');
    		db.close();
    	    });
           
        });
    }, 

    fetchDistinct: function(distinctField,extractDataCallback){
		
		MongoClient.connect(url, function(err, db) {
        	if (err)
          		throw err;

	    	db.collection(collectionName).distinct(distinctField, function(err, docs) {
  				console.log('fetching Data');
  				if (err)
          		throw err;
				db.close();
				extractDataCallback(docs);
			  
    	    });
           
        });
     
    },

    fetch: function(queryObj,coloumnObj,extractDataCallback){

    	MongoClient.connect(url, function(err, db) {
    		if (err)
    			throw err;

    		db.collection(collectionName).find(queryObj, coloumnObj).toArray(function(err, result) {
   		 		console.log('fetching data');
   		 		if (err) throw err;
    			db.close();
    			extractDataCallback(result);
 			});



    	});

    }
}      
