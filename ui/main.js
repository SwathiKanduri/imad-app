console.log('Loaded!');
var element=document.getElementById("main_text");

element.innerHTML='Changed value using JS';
var move=document.getElementById("image");

var marginleft=10;
function moveright(){
    if(move.onclick=='true')
    {
        return;
    }

    marginleft=marginleft+1;
    move.style.marginLeft=marginleft+ 'px';
}

move.onclick=function (){
    
    var interval=setInterval(moveright,50);
   
    };
    
    
