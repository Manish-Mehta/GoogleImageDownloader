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
var request;
var fileDetail = [];
var serverURL;
let responseEnded;


//search Page
router.get('/', function (req, res) {
  fileDetail = [];
  promiseCounter = 0;
  counter = 0;
  response = res;
  responseEnded = false;
  request = req;
  searchKeyword = req.query.searchInput;
  
  response.writeHead(200, {'Content-Type' : 'text/html' });
  response.write("<link rel='stylesheet' type='text/css' href='../css/style.css'><div class='container'>"+
  			"<br>your search request for "+searchKeyword+ " is processing please wait.....<br>");

  
  console.log("search request made for "+searchKeyword);
  
  
function delayFn(arg) {
	if(!responseEnded)
		response.write(arg);
}
function delayFn2(arg) {
	if(!responseEnded)
		response.write(arg);
}

function delayFn3(arg) {
	if(!responseEnded)
		response.write(arg);
}

setTimeout(delayFn, 10000, '<br> this may take a while	<br>');
setTimeout(delayFn2, 50000, '<br> waiting for image information<br>');
setTimeout(delayFn3, 103000, '<br>its taking longer than expected <br>');
	

  
  //image scrapping
  var google = new Scraper.Google();
  
  try
   {
	  	google.list({
	    keyword: searchKeyword,
	    num: 15,
	    detail: true,
	    nightmare: {
	        show: false
	    }
	    })
	    .then(imageDownloaded, onRejected);
	}
	catch(err){
		console.log(err);
	}
});

function onRejected()
{
	console.log('promise rejected: images did not scrapped');
	response.end("error occurred while scrapping</div>", endResponse);
}


//image Downloading module
function imageDownloaded(fetchedOBJ)
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
		    response.write('**File downloaded to Server in DIR: '+filename+"<br>");
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
	serverURL = request.protocol + '://' + request.get('host') ;
	var hrefString = "<br><a href='"+serverURL+"/displayKeywords/' style='color:red'>Click here</a> to see all the keywords"+
					"  Entered yet!<br>";
	response.end("Downloading Completed"+hrefString+"</div>", endResponse);
	console.log("Downloading Completed!");

	mongo.insert(fileDetail);
	
}

function endResponse()
{
	responseEnded=true;
}


module.exports = router;
