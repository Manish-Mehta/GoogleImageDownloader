
require('dotenv').config();	//loading environment variables

const express = require('express');
const path = require('path');
const logger = require('morgan');

const search = require('./routes/search');
const displayKeywords = require('./routes/displayKeywords');
const displayImages = require('./routes/displayImages');

const app = express();
app.set('port', (process.env.PORT || 3000));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('combined'));

// Home Route
app.get('/', (req, res) => {
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
app.listen(app.get('port'), () => {
	console.log('Server started at ', app.get('port'));
});