var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


 var infos={
 'painting' : {
    title:'Painting',
       content: ` <p align="left" > <font class=pinfo>
                Pablo Picasso rightly said that every child is a born artist, the problem is to retain that artist within themselves. This universe is full of art and inspiration, that is what everyone can see, but it takes a really talented and visionary artist to pick paint and brush and illustrate their thoughts, visions and this beautiful universe into paintings. 
            </font>
             </p> `
},

 'drawing' :{
    title:'Drawing' ,
       content: ` <p align="center"> <font class=dinfo> Drawing is a form of visual art in which a person uses various drawing instruments to mark paper or another two-dimensional.Drawing is a form of visual art in which a person uses various drawing instruments to mark paper or another two-dimensional medium
            Drawing is a form of visual art in which a person uses various drawing instruments to mark paper or another two-dimensional
            Drawing is a form of visual art in which a person uses various drawing instruments to mark paper or another two-dimensional

</font>
</p> `

}

};

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
 app.get('/drawing/submitdrw-inputdrw', function (req, res) {
  var inputdrw=req.query.inputdrw;
   res.send(comments);
  
}); 


/* app.get('/drawing', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'drawing.html'));
}); */




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



app.get('/:artName', function (req, res) {
    var artName=req.params.artName;
  res.send(creatingtemplate(infos[artName]));
});

*/

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
