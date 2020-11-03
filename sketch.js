var database;
var ball,foodObj;
var dog, happyDog, database, foodS, foodStock,dogIMG, Milk,button1,button2;
var feedTime;
var lastFed;
var bedroom, garden, washroom; 
var readState;
//var showError;
function preLoad(){
    dogIMG = loadImage("dog.png");
    happyDog = loadImage("happydog.png");
    bedroom = loadImage("Bed Room.png");
    garden = loadImage("Garden.png");
    washroom = loadImage("Wash Room.png");
}
function setup(){
    database = firebase.database();
    //console.log(database);
    createCanvas(700,700);
    
    foodObj = new Food();
    dog = createSprite(550,550,10,10);
    dog.addImage(dogIMG);
    dog.scale = .8;

    foodStock = database.ref('food');
    foodStock.on("value",readStock);

    feed = createButton("Feed the dog")
    feed.position(600,100)
    feed.mousePressed(feedDog)

    addFood = createButton("Add Food")
    addFood.position(800,95)
    addFood.mousePressed(addFoods)
    readState = database.ref('gameState');
    readState.on("value",function(data){
    gameState = data.val();
    }) 
    

}

function draw(){
    background("green");
    foodObj.display()
    textSize(15);
    fill("black");
    text("Food remaining: "+foodS, 365, 200);
    if(lastfeed>=12)
 {
   text("Last Feed :" + LastFed%12 + "PM", 350,30);
 }else if(LastFed ===0 )
 {
   text("Last Feed : 12 AM" , 350,30)
 }else
 {
   text("Last Feed :" + LastFed + "AM", 350,30);
 }
drawSprites();

 currentTime = hour();
  if(currentTime ==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }else if(currentTime ==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }else if(currentTime>(lastFed+2) && currentTime<(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }else{
    update("Hungry");
    foodObj.display();
  }

 feedTime = database.ref('FeedTime');
 feedTime.on("value",function(data){
   lastFed = data.val();
 })
 
 if(gameState!= "Hungry"){
  feed.hide();
  addFood.hide();
  dog.remove();
}else{
  feed.show();
  addFood.show();
  dog.addImage(DogImage);
}
}
function readStock(data){
    foodS = data.val();
    foodObj.updateFoodStock(foodS)
  }
  
  function writeStock(x){
    if(x>0){
      x=x-1
    }
    else{
      x=0
    }
    database.ref('/').set({
      food: x
    })
  }

function addFoods(){
    foodS++
    database.ref('/').update({
      food:foodS
    })
    }

function feedDog(){

    dog.addImage(happyDog)
    foodObj.updateFoodStock(foodObj.getFoodStock()-1)
     database.ref('/').update({
       food:foodObj.getFoodStock(),
       FeedTime:hour ()
     })
    }


function update(state){
  database.ref('/').update({
    gameState: state
  });
}