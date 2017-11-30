const express = require('express');
const router = express.Router();
const Scraper = require ('images-scraper')
const download = require('image-downloader');
const mongo = require('../LIB/mongoModule');

let imageDownloadPath = 'Download/';
let searchKeyword = '';
let counter = 0;
let promiseCounter = 0;
var response;
var fileDetail = [];



//search Page
router.get('/', function (req, res) {
  fileDetail = [];
  promiseCounter = 0;
  counter = 0;
  response = res;
  response.writeHead(200, {'Content-Type' : 'text/html' });

  searchKeyword = req.query.searchInput;
  console.log("search request made for "+searchKeyword);
  response.write("your search request for "+searchKeyword+ "is processing please wait.....");
  
  //image scrapping
  var google = new Scraper.Google();
  
  google.list({
    keyword: searchKeyword,
    num: 15,
    detail: true,
    nightmare: {
        show: false
    }
  })
  .then(imageDownload).catch(function(err) {
    console.log('err', err);
  });

  
});


//image Downloading module
function imageDownload(fetchedOBJ)
{
	
	fetchedOBJ.forEach(function(element)
		{
			//console.log('Image URL->'+ element.url);
			counter++;
			Download(element.url);
		});


	function Download(imageURL){
		var fileTemp = ""+searchKeyword+"_"+Date.now()+"_"+counter+".jpg";
		fileDetail.push({ keyword: searchKeyword,name: fileTemp, fullpath: imageDownloadPath+fileTemp });

		const options = {
  							url: imageURL,
  							dest: imageDownloadPath+fileTemp                
						}

		download.image(options)
		  .then(({ filename, image }) => {
		    console.log('File saved to', filename);
		    response.write('File downloaded to Server in DIR: '+filename+"<br>");
		    promiseCounter++;
		    if (promiseCounter == 15) {
		    	afterDownloading();
		    }
		  }).catch((err) => {
		  	afterDownloading();
		    throw err;
		  });
	}

}

function afterDownloading()
{
	var hrefString = "<br><a href='https://google-image-downloader.herokuapp.com/displayKeywords'>Click here</a> to see all the keywords"+
					"  Entered yet!<br>";
	response.end("Downloading Completed"+hrefString);
	console.log("Downloading Completed!");

	mongo.insert(fileDetail);
	
}


module.exports = router;
