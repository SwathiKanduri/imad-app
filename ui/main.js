console.log('Loaded!');
var element=document.getElementById("main_text");

element.innerHTML='Changed value using JS';
var move=document.getElementById("image");


var marginleft=10;
function moveright(){
   
    marginleft=marginleft+1;
    move.style.marginLeft=marginleft+ 'px';
}

move.onclick=start();
function start (){
   if(move.onclick=='true'){
               stop();
           }
           else{
            var interval=setInterval(moveright,50);
                }
 
    }
    
   function stop(){
       window.location.reload();
        
    }
    
    
