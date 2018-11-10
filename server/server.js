var express = require('express');
var app = express();
app.use(function (req, res, next) {        
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
    res.setHeader('Access-Control-Allow-Credentials', true);       
    next();  
});  

var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: '1gKSPkCP3YMv081PEcSpkWfyZ',
  consumer_secret: 'u1zdnrGHfIsSOW3iANxqsgalJ9JjvLpWuM82BJKroYUuFvXviq',
  access_token_key: '2558464252-wm5GxvAzfmxAQpLASAxtnC5f2vidMUYPseXNMnJ',
  access_token_secret: 'NJxOVfoRbT3dCkLzei33cn3bq7WAAZbkwrsTswEje45Sz'
});


app.get('/:id-:num',(req,res,next)=>{
    var id = req.params.id; //params is an object of parameters
    var num = req.params.num;
    
    // var currentDate = new Date().getTime();
    // var date_30_day_ago = currentDate - 30*24*60*60*1000;
    // var searchDate = new Date(date_30_day_ago);
    // var year = searchDate.getFullYear();
    // var month = searchDate.getMonth();
    // var day = searchDate.getDay();

    // var dateCondition = " since:"+year.toString()+"-"+month.toString()+"-"+day.toString();

    client.get('search/tweets',{q: id ,count: num}, function(error, tweets, response) {
        if(error || tweets == undefined) 
        {
            console.log(error);
            res.send("nothing found");
        }
        else{
          res.send(tweets.statuses); //returnig an array of tweets
        }
      });

})

app.listen(3000,()=>{
    console.log("listening to port 3000");
});
