

const express = require('express');
const router = express.Router();
const mongo = require('../LIB/mongoModule');



//display keyword page
router.get('/', function(req,res){
    res.writeHead(200, {'Content-Type' : 'text/html' });
    mongo.fetchDistinct('keyword', extractData);
    
    function extractData(docs)
    {
    	console.log("keywords fetched: "+docs);
    	var htmlOP = "<link rel='stylesheet' type='text/css' href='css/style.css'><div class='keywordDisplayBlock'>";
    	docs.forEach(function(element)
		{
			htmlOP+="<br><a href='http://localhost:3000/displayImages?imageName="+element+"' style='text-decoration:underline'>"+element+"</a>";
			
		});
		res.end(htmlOP);
    }

});


module.exports = router;