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
    
  
    
