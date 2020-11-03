class Food{
    constructor(){
        foodStock = 0;
        lastFed = null;
        this.image = loadImage("Milk.png");
    }
    preload(){
        Milk = loadImage("Milk.png");
    }
    display(){
        var x = 80
        var y = 100;
        imageMode(CENTER);
        image(this.image,720,220,70,70);
      
        if(this.foodStock!=0){
          for(var i=0;i<this.foodStock;i++){
            if(i%10===0){
              x=80;
              y=y+50;
            }
            image(this.image,x,y,50,50);
            x=x+30;
          }
        }
    }
    getFoodStock(){
        return this.foodStock;
    }
    
    updateFoodStock(foodStock){
        this.foodStock=foodStock;
    }
    deductFood(){
       if(this.foodStock > 0){
           this.foodStock = this.foodStock - 1;
       }
    }
    bedroom(){
        background(bedroom, 600, 500);
    }
    garden(){
        background(garden, 600, 500);
    }
    washroom(){
        background(washroom, 600, 500);
    }
    
    
    }

  


  
  
    
  