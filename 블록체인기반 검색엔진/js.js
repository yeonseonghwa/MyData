var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;

app.get('/',function(req,res){
    res.sendFile(__dirname + "/mongo.html")
});

function db_connect(keyword){
    return new Promise(function(resolve,reject){
            var url = 'mongodb://localhost:27021'
            MongoClient.connect(url,function(err,database){
                console.log('connect success');
                var db = database.db('eosmain');
                var commant = db.collection('action_traces')
                commant.find({'act.data.searchkeyword':{$regex:keyword}}).sort("act.data.t",-1).toArray(function(err,docs){
                    resolve(docs);
                });
            })
    });
}

app.get('/search_in_blockchain',async function(req,res){
    await db_connect(req.query.keyword).then(function(db_result){
        var result = ''
        for(var index in db_result){
           i = db_result[index].act.data
           console.log(i.url)
           var li ='<li><a href="'+i.url+'">'+i.clickkeyword+'</a></li>'
           result = result + li
        }
        res.send(top_html+result+buttom_html)
    })
})


app.listen(3000,function(){
    console.log("Express server has started on port 3000");
});



var top_html = '<!DOCTYPE html>\
<html lang="en" dir="ltr">\
  <head>\
    <meta charset="utf-8">\
    <title>search in blockchain</title>\
    <script src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>\
    <style media="screen">\
     header{background-color:#E6E6FA}\
     .login{display:inline;}\
     .url{width:50%; display:inline}\
     a{font-size:25px}\
    </style>\
  </head>\
  <body>\
    <header>\
      <form class="search" action="/search_in_blockchain" method="get">\
        WAJUEZHEMEN<input type="text" name="keyword" value="">\
        <input type="submit" name="" value="블록내검색">\
      </form>\
    </header>\
    <div id="result">\
'

var buttom_html = '</div></body></html>'
