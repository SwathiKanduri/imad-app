/*

var button=document.getElementById("counter");


button.onclick=function(){
    
    // create a request
    var request=new XMLHttpRequest();
    
    
    // capture response and store it in a variable
    request.onreadystatechange=function(){
       if(request.readyState===XMLHttpRequest.DONE){
           if(request.status===200){
               var counter=request.responseText;
             var span=document.getElementById("count");
                span.innerHTML=counter.toString();
               
           }
       } 
        
    };
    
    //make a request
    request.open('GET','http://swathikandooree.imad.hasura-app.io/counter',true);
    request.send(null);
};


//submit button code for index page


var submit=document.getElementById('submit_btn');
submit.onclick=function(){
    
    var nameInput=document.getElementById('name');
var name=nameInput.value;
    
     var request=new XMLHttpRequest();
    
    
    // capture response and store it in a variable
    request.onreadystatechange=function(){
       if(request.readyState===XMLHttpRequest.DONE){
           if(request.status===200){
               
               var names=request.responseText;
               names=JSON.parse(names);
      var list='';
    for(var i=0;i<names.length;i++){
        list+='<li>'+names[i]+'</li>'; 
    }
    var ul=document.getElementById('namelist');
    ul.innerHTML=list;
               
           }
       } 
        
    
    };
    
    request.open('GET','http://swathikandooree.imad.hasura-app.io/submit-name?name='+name,true);
    request.send(null);
    
};


*/

//submit button code for drawing page


var submitdrw=document.getElementById('submit_drw');
submitdrw.onclick=function(){
    
    var inpdraw=document.getElementById('inputdrw');
var inputdrw=inpdraw.value;
    
     var request=new XMLHttpRequest();
    
    
    // capture response and store it in a variable
    request.onreadystatechange=function(){
       if(request.readyState===XMLHttpRequest.DONE){
           if(request.status===200){
              var comments= request.responseText;
              comments=inputdrw;
    var division=document.getElementById('spndrw');
    // division.innerHTML=comments;
  
               
           }
       } 
        
    
    };
    
    request.open('GET','http://swathikandooree.imad.hasura-app.io/drawing/submitdrw',true);
    request.send(null);
    
};




























/* console.log('Loaded!');
var element=document.getElementById("main_text");

element.innerHTML='Changed value using JS';
var move=document.getElementById("image");


var marginleft=10;
function moveright(){
    
   
    marginleft=marginleft+1;
    move.style.marginLeft=marginleft+ 'px';

}

move.onclick=function (){
   
    var interval=setInterval(moveright,50);
           
    };   */
    
  
    
