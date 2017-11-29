//npm install imagemin --save

const express = require('express');
const path = require('path');
const mongoModule = require('./LIB/mongoModule');

var search = require('./routes/search');
var displayKeywords = require('./routes/displayKeywords');
var displayImages = require('./routes/displayImages');


let app = express();



app.set('views',path.join(__dirname,'views'));	
app.set('view engine', 'pug');

// HOME Route
app.get('/', (req, res) => 
{
	res.render('search');
});


app.use(express.static(path.join(__dirname, 'Download')));
app.use(express.static(path.join(__dirname, 'public')));

//search route
app.use('/search', search);

//displayKeywords route
app.use('/displayKeywords', displayKeywords);


//displayImages route
app.use('/displayImages', displayImages);


//Server Starting Point
app.listen(3000, () =>
{
	console.log('Server started at 3000.....');
});