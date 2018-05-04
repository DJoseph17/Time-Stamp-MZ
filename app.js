// app.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
app.get('/datevalues/:dateVal', (req, res, next) =>{
    //get call to return json that formats natural and unix dates
    //get the request data for the date
    var dateVal = req.params.dateVal;
    
    //options to format natural date
    var dateFormat ={
        year: 'numeric',
        month: 'long',
        day: 'numeric'
        
    };
    
    if(isNaN(dateVal)){
        var naturalDate = new Date(dateVal);
        naturalDate = naturalDate.toLocaleDateString('en-us',dateFormat);
        
        var unixDate = new Date(dateVal).getTime()/1000;
    }
    else {
         var unixDate = dateVal;
         var naturalDate = new Date(dateVal) *1000;
         naturalDate = naturalDate.toLocaleDateString('en-us',dateFormat);
        
    }
    
   
     //allows the date to be formatted in unix natural
    res.json({unix: unixDate, natural:naturalDate} );
    
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
