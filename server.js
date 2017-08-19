var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser');

var config= {
    user:'swathikandooree',
    database:'swathikandooree',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());


/* var content={
 'article-one' : {
    title:'Article-one',
    date : 'Aug 13 2017' ,
       content: ` <p align="left" > <font class=art1info>
               ARTICLE ONE Pablo Picasso rightly said that every child is a born artist, the problem is to retain that artist within themselves. This universe is full of art and inspiration, that is what everyone can see, but it takes a really talented and visionary artist to pick paint and brush and illustrate their thoughts, visions and this beautiful universe into paintings. 
            </font>
             </p> `
},

 'article-two' :{
    title:'Article-two' ,
    date : 'Aug 13 2017',
       content: ` <p align="center"> <font class=art2info> ARTICLE TWO Drawing is a form of visual art in which a person uses various drawing instruments to mark paper or another two-dimensional.Drawing is a form of visual art in which a person uses various drawing instruments to mark paper or another two-dimensional medium
            Drawing is a form of visual art in which a person uses various drawing instruments to mark paper or another two-dimensional
            Drawing is a form of visual art in which a person uses various drawing instruments to mark paper or another two-dimensional

</font>
</p> `

}

};  */

function creatingtemplate(data)
{
var title=data.title;
var content=data.content;
var htmltemplate= `

<html> 
    <head> 
        <title>
         ${title}
    </title>
    <link href="/ui/style.css" rel="stylesheet" />
    </head>
 <body>
    <a href='/'>Back to home</a>
    ${content}
 </body>

</html>
` ;
return htmltemplate;
}


function hash(input,salt)
{
    //to create a hash, use cryto and below pre defined method
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512, 'sha512');
    return['pbkdf2','10000',salt, hashed.toString('hex')].join('$');
}

app.get('/hash/:input',function(req,res){
   var hashedString=hash(req.params.input,'this is a radom string as salt value');
   res.send(hashedString);
    
});


app.post('/create-user',function(req,res){
   // code to add uesrname, hashed pwd to database
   var username=req.body.username;
   var password=req.body.password;
   var salt=crypto.randomBytes(128).toString('hex');
   var dbString=hash(password,salt);
   pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)',[username,dbString], function(err,result){
       if(err){
          res.status(500).send(err.toString());
      } else{
          res.send('user successfully created: '+username);
      }
   });
});


app.post('/login',function(req,res){
   
  var username=req.body.username;
   var password=req.body.password;
   
   pool.query('SELECT * FROM "user" WHERE username=$1',[username], function(err,result){
       if(err){
          res.status(500).send(err.toString());
      } else{
          if(result.rows.length===0){
                res.status(403).send("no such username/password found");
            }
            else{
                //match password
                var dbString=result.rows[0].password;
                var salt=dbString.split('$')[2];
                var hashedPassword=hash(password,salt); // creating a hash, based on submitted password and original salt (salt extracted                                                                                   // from pwd string stored in the db)
                if(hashedPassword===dbString){
                    res.send('your entered credentials are correct! ');
                }
                else{
                    res.status(403).send(" username/password invalid");
                }
                
            }
      }
   }); 
  
});





var pool=new Pool(config);
app.get('/test-db', function(req,res) {
    //make a select request
    //return a response with the result
   pool.query('select * from test',function(err,result){
      if(err){
          res.status(500).send(err.toString());
      } else{
          res.send(JSON.stringify(result.rows));
      }
   });
    
});


app.get('/articles/:articleName', function (req, res) {
  
  //  var articleName=req.params.articleName; '; delete from "article" where 'a'='a ---> eg,. for if user add this instead of a string
  // pool.query("select * from article where title= '" +req.params.articleName+ "'",function(err,result){ old query
  
    pool.query("select * from article where title= $1" , [req.params.articleName],function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            if(result.rows.length===0){
                res.status(404).send("no rows with given title found");
            }
            else{
                var articleData=result.rows[0];
                res.send(creatingtemplate(articleData));
            }
        }
    });
    
  
});

var counter=0;

app.get('/counter', function (req, res) {
    counter=counter+1;
  res.send(counter.toString());
});


 var names=[];
app.get('/submit-name', function (req, res) {
  var name=req.query.name;
  names.push(name);
  res.send(JSON.stringify(names));
}); 

 var comments='';
 app.get('/drawing/submitdrw', function (req, res) {
  res.send(comments);
});  

 app.get('/drawing', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'drawing.html'));
}); 




app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});



/*app.get('/painting', function (req, res) {
  res.send(creatingtemplate(painting));
 // res.sendFile(path.join(__dirname, 'ui', 'painting.html'));
});

 app.get('/drawing', function (req, res) {
  res.send(creatingtemplate(infodrawing));
});

*/

app.get('/:articleName', function (req, res) {
    var articleName=req.params.articleName;
  res.send(creatingtemplate(content[articleName]));
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});


app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
