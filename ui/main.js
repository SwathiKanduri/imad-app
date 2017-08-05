console.log('Loaded!');
var element=document.getElementById("main_text");

element.innerHTML='Changed value using JS';
var move=document.getElementById("image");
function moveright(){
    marginleft=10;
    move.style.marginleft=marginleft+1;
}

move.onclick=function (){
    var interval=setInterval(moveright(),50);
    
};
