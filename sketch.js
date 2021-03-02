var dog,sadDog,happyDog;
var database, foodStock;
//buttons
var feedDog, addFood;
var foodObj;
var foodS;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database = firebase.database();

  createCanvas(1000,400);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  foodStock = database.ref("food");
  foodStock.on("value",fnReadStock);

  foodObj = new Food();

  feedDog = createButton("Feed the dog");
  feedDog.position(700,100);
  feedDog.mousePressed(fnFeedDog);

  addFood = createButton("Add food");
  addFood.position(800,100);
  addFood.mousePressed(fnAddFood);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  drawSprites();
}

//function to read food Stock
function fnReadStock(data){
  foodObj.updateFoodStock(data.val());
}

//function to update food stock and last fed time
function fnFeedDog(){
  dog.addImage(happyDog);

  database.ref("/").update({
    food:foodObj.deductFood()
  });
}

//function to add food in stock
function fnAddFood(){
  database.ref("/").update({
    food:foodObj.getFoodStock() + 1
  });
}

