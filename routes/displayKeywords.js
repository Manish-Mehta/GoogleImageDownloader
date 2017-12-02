

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
    	var htmlOP = "<link rel='stylesheet' type='text/css' href='../css/style.css'><div class='keywordDisplayBlock'><h4>keywords Searched</h4>";
        var serverURL = req.protocol + '://' + req.get('host') ;
    	docs.forEach(function(element)
		{
			htmlOP+="<br><a href='"+serverURL+"/displayImages?imageName="+element+"' style='text-decoration:underline'>"+element+"</a>";
			
		});
		res.end(htmlOP);
    }

});


module.exports = router;