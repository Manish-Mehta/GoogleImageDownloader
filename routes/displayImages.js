
const express = require('express');
const router = express.Router();
const mongo = require('../lib/mongoModule');


router.get('/', function (req, res) {

	var keywordName = req.query.imageName;
	res.writeHead(200, { 'Content-Type': 'text/html' });

	mongo.fetch({ keyword: keywordName }, { _id: false, keyword: true, fullpath: true }, extractData);

	function extractData(result) {
		var serverURL = req.protocol + '://' + req.get('host');
		var htmlOP = "<html><head><title>Image Display</title></head><body><br>" +
			"<a href='" + serverURL + "/'><< HOME" + "</a>   " +
			"<a href='" + serverURL + "/displayKeywords/' style='margin-left:80%'>Display keywords >>" + "</a><br><br>";

		console.log("data fetched");
		console.log(result);
		result.forEach(function (element) {
			htmlOP += "<img src='" + (element.fullpath).split('/')[1] + "' alt='" + element.keyword + "' " +
				"height='300' width='300' style='border-radius:5%; border:thin #125699 solid;'>";

		});
		res.end(htmlOP + "</body></html>");
		//console.log(htmlOP);
	}
});

module.exports = router;

