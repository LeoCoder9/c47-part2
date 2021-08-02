class Game {
    constructor() {

    }



    start() {

        background(startbg);
        form = new Form();
        form.display();

        intromusic.loop();

        bg = createSprite(100, 100, width, height);
        bg.addImage("BG1", bgIm);
        bg.addImage("BG2", bgIm2);
        bg.addImage("BG3", bgIm3);
        bg.addImage("BG4", bgIm4);
        bg.addImage("finish", startbg);
        bg.scale = 2.5;
        knight = createSprite(200, 100, 5, 5);
        knight.addAnimation("KnightIdle", knightIdle);
        knight.addAnimation("knightRun", knightRun);
      
        dragon = createSprite(width, height/2)
        dragon.addAnimation("flying", dragonIm)
        dragon.scale = 2
       
        dragon.visible = false

        knight.scale = 0.2;


        knight.shapeColor = "red";
        floor = createSprite(750, height + 351, width, height);
        floor.shapeColor= color(109, 217, 65);


        mountain = createSprite(width/2 + 600, height/2 + 300, 400, 500)
        mountain.shapeColor = color(109, 217, 65);
       mountain.visible = false

         cage = createSprite(width/2 + 600, height/2 - 8, 20, 20)
        cage.addImage("cage", cageIm)
        cage.scale = 0.15
      
        cage.visible = false

        princess = createSprite(width/2 + 600, height/2 - 8, 20, 20)
     
        princess.scale = 0.8
        princess.visible = false

        story = createSprite(width/2 + 500, height/2, 150, 150)
        story.addImage(storyIm)
        story.scale = 1.2
        knight.collide(floor);

       
        
        
    }




    play() {
        background("white")
        
        gameState = "PLAY"

        knight.velocityY = knight.velocityY + 12
        knight.collide(floor)

        if (bg.x < 0) {
            bg.x = width / 2
        }

        if (keyWentDown("space")) {
            knight.velocityY = -70
    
        }

        princess.depth = cage.depth;
        cage.depth = cage.depth + 10;
      
        princess.addAnimation("worried", princessIm)

        if (keyWentDown("S") && keyS === false) {
            intromusic.stop()
            bg.velocityX = -10
            knight.changeAnimation("knightRun", knightRun);

            form.hide()
            keyS = true

            playmusic.loop()
            story.destroy()
            voice.stop()

        

        }

        ThrowSwords()

        if (keyS === true) {

            Monster1()
            Monster2()
         
           

        }

        if (kills >= 3) {
            level = 2
            Monster3()
            bg.changeImage("BG2", bgIm2);
            bg.scale = 1.5
            floor.shapeColor = color("#476321")
         
        }
        if (kills >= 10) {
            level = 3
            obstacles()
            bg.changeImage("BG3", bgIm3);
            bg.scale = 6.5
            floor.shapeColor = color("#000000")
            
        }
        if (kills >= 22) {
            level = 4
            Monster5()
            bg.changeImage("BG4", bgIm4);
            bg.scale = 1
            floor.shapeColor = color("#476321")
        }
        if (kills >= 34) {
            level = 5
            Monster4()
         
           
        }
        if (kills >= 45) {
            level = 6
  
        }

        if(level === 6){

            translate(random(-5,5),random(-5,5));

            var box1, box2, box3, box4

            
            dragon.bounceOff(edges)
            
            box1 = createSprite(width/2 - 100, height/2, 20, 510)
              
            box2 = createSprite(width/2 + 250, height/2 + 150, 1130, 20)
            box3 = createSprite(width/2 + 250, height/2 - 270, 1130, 20)

            box4 = createSprite(width/2 + 500, height/2, 20, 510)

           box1.visible = false
           box2.visible = false
           box3.visible = false
           box4.visible = false

            fireballs()

            dragon.bounceOff(box1)
            dragon.bounceOff(box2)
            dragon.bounceOff(box3)
            dragon.bounceOff(box4)

            monsters.destroyEach()


            if(swordGroup.isTouching(dragon)){
                Dlives = Dlives - 1
                swordGroup.destroyEach()
            }

            if(Dlives === 0 ){
            
              //  played = false
              // if(played === false){
                 //  played = true
                // dragonRoar.play()
               // }
                
                dragon.destroy()
                cage.destroy()
                fireGroup.destroyEach()
                translate(0, 0);
                princess.x = knight.x+100
                princess.y = knight.y

                text("WELL DONE! YOU SLAYED THE DRAGON!!", 400, height/2)

                time = second()
                if(time > 1){
                    //bg.changeImage(startbg)
                    console.log("Hello")

                    //bg.changeImage("finish", startbg);
                    bg.destroy()
                    background(startbg)
                    bg.scale = 2


                    knight.destroy()
                    floor.destroy()
                    princess.destroy()
                    mountain.destroy()

                    //playmusic.stop()
                   // intromusic.loop()
                }
              
                
            }
            

            if(played === false){
                played = true
                console.log("BOSS LEVEL!")


                

               

                dragon.debug = true
                
               dragon.visible  = true
                dragon.velocityX = -5
                dragon.velocityY = 2
     
                mountain.depth = dragon.depth;
                princess.depth = dragon.depth;
                cage.depth = dragon.depth;
                dragon.depth =  dragon.depth + 1;
                
     
               dragonRoar.play()
    
               
               dragon.setCollider("rectangle", 0, 0, 50, 50)
               dragon.x = width/2 + 350
               dragon.y =  height/2 - 100
         
               princess.visible = true
               mountain.visible = true
               cage.visible = true
     
              
              
     
            }

            bg.velocityX = 0
            knight.changeAnimation("KnightIdle", knightIdle);
   
        }


        for (var i = 0; i < monsters.length; i++) {
            if (monsters.get(i).isTouching(knight)) {
                monsters.get(i).destroy()
                lives = lives - 1
                hurt.play()
                hit.play()
            }
        }

        for (var i = 0; i < fireGroup.length; i++) {
            if (fireGroup.get(i).isTouching(knight)) {
                fireGroup.get(i).destroy()
                lives = lives - 1
                hurt.play()
                hit.play()
            }
        }


        for (var i = 0; i < monsters.length; i++) {
            if (monsters.get(i).isTouching(swordGroup)) {
              monsters.get(i).destroy();
              kills = kills + 1
              //ghostHurt.play()
              hit.play()
              for(var i = 0; i < swordGroup.length; i++){
                  swordGroup.get(i).destroy()
              }
            }
          }


     



          

   





        function Monster1() {
            if (frameCount % 100 === 0) {
                var hyena = createSprite(width, height - 78, 30, 30);
                hyena.velocityX = -23;
                hyena.addAnimation("HyenaRun", hyenaIm);
                hyena.scale = 1.5
                hyena.lifetime = 150
                hyena.setCollider("rectangle", 0, 0, 20, 20)
                monsters.add(hyena)
            }

        }



        function Monster2() {
            if (frameCount % Math.round(random(100, 200)) === 0) {
                var vulture = createSprite(width, Math.round(random(250, 600)), 30, 30);
                vulture.velocityX = -28;
                vulture.addAnimation("VultureRun", vultureIm);
                vulture.scale = 1.2
                vulture.lifetime = 150
                vulture.setCollider("rectangle", 0, 0, 20, 20)
                monsters.add(vulture)
            }

        }
        function Monster3() {
            if (frameCount % Math.round(random(100, 200)) === 0) {
                var deceased = createSprite(width, height - 78, 30, 30);
                deceased.velocityX = -18;
                deceased.addAnimation("DeceasedRun", deceasedIm);
                deceased.scale = 1.5
                deceased.lifetime = 170
                deceased.setCollider("rectangle", 0, 0, 20, 20)
                monsters.add(deceased)
            }

        }
        function Monster4() {
            if (frameCount % Math.round(random(100, 210)) === 0) {
                var scorpio = createSprite(width, height - 65, 30, 30);
                scorpio.velocityX = -18;
                scorpio.addAnimation("ScorpioRun", scorpioIm);
                scorpio.scale = 1.5
                scorpio.lifetime = 170
                monsters.add(scorpio)
            }

        }
        function Monster5() {
            if (frameCount % Math.round(random(110, 210)) === 0) {
                var mummy = createSprite(width, height - 78, 30, 30);
                mummy.velocityX = -16;
                mummy.addAnimation("MummyRun", mummyIm);
                mummy.scale = 1.5
                mummy.lifetime = 170
                mummy.setCollider("rectangle", 0, 0, 20, 20)
                monsters.add(mummy)
            }

        }

    
function ThrowSwords() {
    if (keyWentDown("e")) {
      var throwSword = createSprite(knight.x + 100, knight.y, 10, 10)

      throwSword.addImage("sword", swordImage)
      throwSword.velocityX = 25
      throwSword.scale = 0.035
      swordswoosh.play()
  
      swordGroup.add(throwSword)
      throwSword.lifetime = 100
   
  
    }
  
  }

      
function fireballs() {
    if (frameCount % Math.round(random(100, 200)) === 0 ) {
    
      var fire = createSprite(dragon.x  -150, dragon.y+ 20, 20, 20)

      fire.setSpeedAndDirection(-10,-18,fire.getDirection() + 1);

    

      fire.shapeColor = "red"
      fire.addImage("ball", fireballImage)
      fire.scale = 0.07
      //fire.addImage("sword", swordImage)
      fire.velocityX = -15
      fire.lifetime = 100
      fire.angle = knight.angle
     
      fireGroup.add(fire)
  
  
    }
  
  }

  function obstacles() {
    if (frameCount % 230 === 0) {
        var ob = createSprite(width, height - 40, 30, 30);
        ob.velocityX = -15;
        ob.addImage("spike", obsImage);
        ob.scale = 0.4
        ob.lifetime = 170
        ob.setCollider("rectangle", 0, 0, 20, 20)
        monsters.add(ob)
    }

}


    

        drawSprites();
       
        textSize(20)
        fill("white")
        if (lives >= 1) {
        textAlign(CENTER);
        text(form.name, knight.x - 10, knight.y - 80)
     }
        console.log(form.name)
        textSize(30)
        fill("red")
        stroke(25)
        text("Lives: " + lives, 100, 70)
        text("Kills: " + kills, 1200, 70)
        text("Level: " + level, 780, 120)

      if(level === 6 && Dlives != 0){
          fill("black")
          text("DRAGON LIVES: " + Dlives, dragon.x- 100, dragon.y-150)
      }




        if (lives < 1) {
            console.log("GAME OVER");
            game.end();


        }



    }
    end() {

        monsters.destroyEach();
        bg.velocityX = 0;
        bg.destroy();
        monsters.destroyEach();
        ///knight.destroy();

        keyS = false

        background(endbg);

        translate(0, 0);

        fill("brown");
        stroke(100);
        textSize(30);
        text("Press 'R' to retry", 670, 600);
        text("Oh No.. ", 730, 120);
        textSize(130);
        text("GAME OVER!", 375, 350);

        if (keyDown("R")) {
            kills = 0;
            level = 1;
            lives = 5;
            background(startbg);
            monsters.destroyEach();
            gameState = "START"
            game.start();
            playmusic.stop()
            
        }

    }


}




//textAlign(CENTER);
//floor.shapeColor= color(0,0,0);