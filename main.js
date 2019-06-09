window.onload = function()

{
    
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    
    var player;
    var playerExist=0;
    var cerclePosX=canvas.width/2;
    var cerclePosY=canvas.height-30;
    var nbColumn=9;
    var nbLine=4;
    var brickHeight=20;
    var brickWidth=70;
    var brickSpace=10;
    var brickSpaceLeft=40;
    var brickSpaceTop=30;
    var paddleX=250;
    var paddleWidth=100;
    var paddleY=25;
    var vitesseX=4;
    var vitesseY=-2;
    var diametreBalle=10;
    var rightPress=false;
    var leftPress=false;
    var score = 0;
    var live=3;
    var niveau = 1;
    var scorefinale;
    var chronoArret;
    var timeInterval;
    var milliSeconds=0;
    var second=0;
    var min=0;
    var hr=0;
    
    
    
    
    var bricks=[];
    for (c=0; c<nbColumn; c++){
        bricks[c]=[];
        for (l=0; l<nbLine; l++){
            bricks[c][l] = {x:0, y:0, status:1}; 
        }
    }
    var bricks2=[];
    for (c=0; c<nbColumn; c++){
        bricks2[c]=[];
        for (l=0; l<nbLine-2; l++){
            bricks2[c][l] = {x:0, y:0, status:1}; 
        }
        for (l=2; l<nbLine; l++){
            bricks2[c][l] = {x:0, y:0, status:2}; 
        }
    }
    
    
    document.addEventListener("keydown",onKeyDown, false);
    document.addEventListener("keyup",onKeyUp, false);

    function onKeyDown(event){
        if(event.keyCode===37){
            leftPress=true;
            
        }
        else if(event.keyCode===39){
            rightPress=true;
        }
    }
    function onKeyUp(event){
        if(event.keyCode===37){
            leftPress=false;
        }
        else if(event.keyCode===39){
            rightPress=false;
        }
    }
    function displayCercle(){
        context.beginPath();
        context.arc(cerclePosX,cerclePosY,diametreBalle,0, Math.PI*2);
        context.fillStyle="blue";
        context.fill();
        context.closePath();
    }
    
    function displayPaddle(){
        context.beginPath();
        context.rect(paddleX, canvas.height-paddleY, paddleWidth, paddleY);
        context.fillStyle="red";
        context.fill();
        context.closePath();
           
    }
    function displayBricks(){
        for (c=0; c<nbColumn;c++){
            for (l=0; l<nbLine;l++){
                if (bricks[c][l].status == 1){
                    var brickX= (c*(brickWidth+brickSpace))+ brickSpaceLeft;
                    var brickY = (l*(brickHeight+brickSpace))+ brickSpaceTop;
                    bricks[c][l].x = brickX;
                    bricks[c][l].y = brickY;

                    context.beginPath();
                    context.rect(brickX,brickY,brickWidth,brickHeight);
                    context.fillStyle="green";
                    context.fill();
                    context.closePath();
                }
            }
        }
    }
    function displayBricks2(){
        for (c=0; c<nbColumn;c++){
            for (l=0; l<nbLine;l++){
                if (bricks2[c][l].status == 2){
                    var brickX= (c*(brickWidth+brickSpace))+ brickSpaceLeft;
                    var brickY = (l*(brickHeight+brickSpace))+ brickSpaceTop;
                    bricks2[c][l].x = brickX;
                    bricks2[c][l].y = brickY;

                    context.beginPath();
                    context.rect(brickX,brickY,brickWidth,brickHeight);
                    context.fillStyle="red";
                    context.fill();
                    context.closePath();
                }
                else if (bricks2[c][l].status == 1){
                    var brickX= (c*(brickWidth+brickSpace))+ brickSpaceLeft;
                    var brickY = (l*(brickHeight+brickSpace))+ brickSpaceTop;
                    bricks2[c][l].x = brickX;
                    bricks2[c][l].y = brickY;

                    context.beginPath();
                    context.rect(brickX,brickY,brickWidth,brickHeight);
                    context.fillStyle="green";
                    context.fill();
                    context.closePath();
                }
            }
        }
    }
    function collisionBrick() {
        for(var c=0; c<nbColumn; c++) {
            for(var l=0; l<nbLine; l++) {
                var b = bricks[c][l];
                if (b.status == 2 || b.status == 1){
                    if(cerclePosX > b.x && cerclePosX< b.x+brickWidth && cerclePosY > b.y && cerclePosY < b.y+brickHeight) {
                            vitesseY *= -1;
                            b.status = b.status-1;
                            score++;
                            if (score==nbColumn*nbLine){
                                niveau+=1;
                                position();
                            }
                           
                    }
                }
            }
        }
    }
    function collisionBrick2() {
        for(var c=0; c<nbColumn; c++) {
            for(var l=0; l<nbLine; l++) {
                var b = bricks2[c][l];
                if (b.status == 2 || b.status == 1){
                    if(cerclePosX > b.x && cerclePosX< b.x+brickWidth && cerclePosY > b.y && cerclePosY < b.y+brickHeight) {
                            vitesseY *= -1;
                            b.status = b.status-1;
                            score++;
                            if (score==nbColumn*nbLine+(nbColumn*nbLine/2)){
                                alert("Bravo tu as terminé le jeu en:" + chronoArret);
                                
                            }
                           
                    }
                }
            }
        }
    }

    function position(){
        cerclePosX=canvas.width/2;
        cerclePosY=canvas.height-30;
        vitesseX=4;
        vitesseY=-2;
        paddleX=250;
        paddleY=25;
    }

    function drawScore(){
        context.font=("14px Arial");
        context.fillStyle="green";
        context.fillText("Score:" +score,8,20);
    }
    
    function drawLive(){
        context.font=("14px Arial");
        context.fillStyle="blue";
        context.fillText("Vies:" +live, 400,20);
    }
    $(function(){
        hideButton();
        startGame();
        pauseGame();
        relaunchGame();
        
    });
    
    function hideButton(){
        $("#pause").hide();
        $("#relaunch").hide();
        $("#regex").hide();
        
    }

    function startGame(){
        $("#nextpage").on("click",function(){
          player = $("#player").val(); 
          if (/[<>]/.test(player) || player==""){
              $("#regex").show();
              
          }
          else{
              $("#intro").hide();
              playerExist=1;
          }
          if (playerExist==1){
              
              $("#pause").show();
              $("#regex").hide();
              interval();          
          }
          
        });
    }
    function pauseGame(){
        $("#pause").on("click",function(){
            clearInterval(timeInterval);
            $("#pause").hide();
            $("#relaunch").show();
        });
        
    }
    function relaunchGame(){
        $("#relaunch").on("click",function(){
            interval();
            $("#pause").show();
            $("#relaunch").hide();
        });
        
    }
    function collision(){
        if (cerclePosX+diametreBalle/2>=canvas.width || cerclePosX<=0+diametreBalle/2 )
        {
            vitesseX*=-1;
        }
      
        if (cerclePosY<=0+diametreBalle/2 ){
            vitesseY*=-1;
        }
        else if (cerclePosY+diametreBalle>canvas.height){
            if (cerclePosX > paddleX && cerclePosX < paddleX + paddleWidth){
                if(cerclePosY-diametreBalle>cerclePosY-paddleY){
                    vitesseY*=-1;
                }
                
            }
           else{
                
                live=live-1;
                console.log(live);
                if (!live){
                    scorefinale=score;
                    
                    encodingScore();
                    alert ("Dommage " + player + " votre score est de: " + score);
                    
                    document.location.reload();
                }
                else{
                    position();
                }
            }
        }
       
        
        if(rightPress && paddleX < canvas.width-paddleWidth){
            paddleX += 3;
        }
        if(leftPress && paddleX>0){
            paddleX -= 3;
        }
        
        cerclePosX+=vitesseX;
        cerclePosY+=vitesseY;
        
    }
    
    function draw(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        displayCercle();
        displayPaddle();
        switch(niveau){
            case 1:
                displayBricks();
                collisionBrick();
                break;
            case 2:
                displayBricks2();
                collisionBrick2();
                break;
        }
        
        drawScore();
        drawLive();
        collision();
        
    }
    
    function interval(){
        timeInterval=setInterval(clock, 10);
    };

    
    function clock(){
        draw();
        chrono();
        
       
    }
    
    

    function chrono(){
        milliSeconds=milliSeconds+10;
        
            
        if (milliSeconds>=1000){
            second++;
            milliSeconds=0;
        }
        if (second>=60){
            min++;
            second=0;
        }
        if (min>=60){
            hr++;
            
        }
     
        document.getElementById("chronotime").innerHTML = hr + ":" + min + ":" + second + ":" + milliSeconds;
        chronoArret = document.getElementById("chronotime").innerHTML = hr + ":" + min + ":" + second + ":" + milliSeconds;
        
        
    };
    
    function encodingScore(){
    $.ajax({
        
        url : "score.php",
        type : "post",
        data: {"pseudo" : player, "score" : score, "chrono": chronoArret},
        success: function(response){
            console.log("reussi");
        },
    });
    }
};

