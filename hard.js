const chara = document.querySelector('#chara');
const body = document.querySelector('body');
const frame = document.querySelector('.frame');
const overlay = document.getElementById("overlay");

//const button = document.querySelector('button');
//const title = document.querySelector('h1');



let seconds = 0;
let minutes = 0;

let timerInterval;

function startTimer() {
  timerInterval = setInterval(() => {
    seconds++;

    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }

    updateDisplay();
  }, 1000); // Update every second
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  seconds = 0;
  minutes = 0;
  updateDisplay();
}

function updateDisplay() {
  const timeString = `${pad(minutes)}:${pad(seconds)}`;
  document.getElementById("timer").textContent = timeString;
  document.getElementById("timeText").textContent = timeString;
}

function pad(number) {
  return (number < 10 ? "0" : "") + number;
}

// Call startTimer() to initiate the timer
startTimer();



//health bar
const healthBar = document.getElementById("health-bar");
let currentHealth = 10;

function updateHealth() {
  const hearts = healthBar.querySelectorAll(".heart");
  console.log(currentHealth);

  hearts.forEach((heart, index) => {
    if (index < currentHealth) {
      heart.classList.remove("empty");
    } else {
      heart.classList.add("empty");
    }
  });
}
updateHealth();

let isMovingLeft = false;
let isMovingRight = false;
let isMovingUp = false;
let isMovingDown = false;
let x = 0;
let y = 0;
//obstacles move at a random speed everytime the page loads
let dx = getRandomSpeed(1,5);
let dy = getRandomSpeed(1,5);

function animateChara() {       //frog animation properties
    let posX = parseInt(chara.style.left);
    let posY = parseInt(chara.style.top);
    let padding = 25;
    //speed of frog
    if(isMovingRight){
        if(posX < frame.offsetLeft + frame.offsetWidth - 55) {
        posX += 5;
        chara.src='images/chararight.png'
        }
    }
    
    if(isMovingLeft){
        if(posX > frame.offsetLeft+padding) {
        posX -= 5;
        chara.src='images/charaleft.png'
        }
    }
    if(isMovingUp) {
        if(posY > frame.offsetTop+padding) {
        posY -= 5;
        chara.src='images/charaup.png'
        }
    }
    if(isMovingDown) {
        if(posY < frame.offsetTop + frame.offsetHeight - 60) {
        posY +=5;
        chara.src='images/charadown.png'
        }
    }
    if (currentHealth <= 0) { 
        overlay.style.display = 'block'; 
        stopTimer()
      } else { 
        overlay.style.display = 'none'; 
    }

    chara.style.left = String(posX)+'px';
    chara.style.top = String(posY)+'px';
    requestAnimationFrame(animateChara);
}
animateChara();

document.addEventListener('keydown', (event)=> {    //moving player with arrow keys pressed
    //frog logic
    if(event.key === 'ArrowRight') {
        if (currentHealth > 0) {
            isMovingRight = true;
            chara.src='images/chararight.png'
        }
    }
    if(event.key === 'ArrowLeft') {
        if (currentHealth > 0) {
            isMovingLeft = true;
            chara.src='images/charaleft.png'
        }
    }
    if(event.key === 'ArrowUp') {
        if (currentHealth > 0) {
            isMovingUp = true;
            chara.src='images/charaup.png'
        }
    }
    if(event.key === 'ArrowDown') {
        if (currentHealth > 0) {
            isMovingDown = true;
            chara.src='images/charadown.png'
        }
    }
})
document.addEventListener('keyup', (event) => {     //player will stop moving with no arrows pressed
    //frog logic
    if(event.key === 'ArrowRight') {
        isMovingRight = false;
        chara.src='images/chara.png'
    }
    if(event.key === 'ArrowLeft') {
        isMovingLeft = false;
        chara.src='images/chara.png'
    }
    if(event.key === 'ArrowUp') {
        isMovingUp = false;
        chara.src='images/chara.png'
    }
    if(event.key === 'ArrowDown') {
        isMovingDown = false;
        chara.src='images/chara.png'
    }
})

//function for random speed
function getRandomSpeed(minSpeed, maxSpeed) {
    return Math.random() * (maxSpeed - minSpeed) + minSpeed;
}

//function for when two objects collide
function isColliding(obj1, obj2) {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}

class GameObject {
    constructor(height, width, speed) {
        this.height = height;
        this.width = getRandomSpeed(3, 5)*10;
        this.speed = speed;
        this.x = frame.offsetLeft;
        this.y = frame.offsetTop;
        this.dx = getRandomSpeed(1, 3);
        this.dy = getRandomSpeed(1, 2);
        this.element;
    }
  
    animation() {
        if (currentHealth > 0) { 
        this.x += this.dx;
        this.y += this.dy;
        }
        if (this.x + this.width > frame.offsetLeft + frame.width || this.x < 0) {
            //this.dx = -this.dx;
            this.element.remove()
        }
        if (this.y + this.height > frame.offsetTop + frame.offsetHeight + 45 || this.y < 0) {
            //this.dy = -this.dy;
            this.element.remove()
        }
        if(isColliding(this.element, chara)) {
            this.element.remove()
            //add additonal game logic like score etc
            currentHealth -= 1
            updateHealth()
        }
    
        // Assuming you have a way to assign style to the element (e.g., this.element.style.left)
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';

        // Call the animation again using requestAnimationFrame
        requestAnimationFrame(this.animation.bind(this));
    }
  
    show() {
        const item = document.createElement('img');
        item.classList.add('object');
        item.src = 'images/ball.png'
        item.style.left = this.x + 'px';
        item.style.top = this.y + 'px';
        item.style.width = this.width+'px'
        item.style.height = 'auto'
        item.style.position = 'absolute'
        body.appendChild(item);
            
        // Assign the element to the game object (assuming you have a way to store it)
        this.element = item;
    
        // Start the animation loop
        this.animation();
    }
    remove() {
        this.delete()
    }

}

class Balls {
    constructor(height, width, speed) {
        this.height = height;
        this.width = getRandomSpeed(3, 5)*10;
        this.speed = speed;
        this.x = frame.offsetLeft+frame.offsetWidth;
        this.y = frame.offsetTop;
        this.dx = getRandomSpeed(-1, -3);
        this.dy = getRandomSpeed(1, 2);
        this.element;
    }
  
    animation() {
        if (currentHealth > 0) { 
            this.x += this.dx;
            this.y += this.dy;
            }
    
        if (this.x - this.width < frame.offsetLeft - 20 || this.x < 0) {
            //this.dx = -this.dx;
            this.element.remove()
        }
        if (this.y + this.height > frame.offsetTop+frame.height+45 || this.y < 0) {
            //this.dy = -this.dy;
            this.element.remove()
        }
        if(isColliding(this.element, chara)) {
            this.element.remove()
            //add additonal game logic like score etc
            currentHealth -= 1
            updateHealth()
        }
    
        // Assuming you have a way to assign style to the element (e.g., this.element.style.left)
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';

        // Call the animation again using requestAnimationFrame
        requestAnimationFrame(this.animation.bind(this));
    }
  
    show() {
        const item = document.createElement('img');
        item.classList.add('object');
        item.src = 'images/ball.png'
        item.style.left = this.x + 'px';
        item.style.top = this.y + 'px';
        item.style.width = this.width+'px'
        item.style.height = 'auto'
        item.style.position = 'absolute'
        body.appendChild(item);
            
        // Assign the element to the game object (assuming you have a way to store it)
        this.element = item;
    
        // Start the animation loop
        this.animation();
    }
    remove() {
        this.delete()
    }

}

//for(let i= 0; i < 10; i++) {
//    const item = new GameObject(100, 50, 2);
//    item.show();
//    item.animation();
//}

class Bomb {
    constructor(height, width, speed) {
        this.height = height;
        this.width = 60;
        this.speed = speed;
        this.x = frame.offsetLeft;
        this.y = getRandomSpeed(frame.height-300,frame.height-50);
        this.dx = getRandomSpeed(1,1.5);
        this.dy = getRandomSpeed(-1,-0.3);
        this.element;
    }
  
    animation() {
        if (currentHealth > 0) { 
            this.x += this.dx;
            this.y += this.dy;
        }
        const hitbox = {
            x: this.offsetLeft,
            y: this.offsetTop,
            width: this.offsetWidth,
            height: this.offsetHeight,
        };
    
        if (this.x + this.width > frame.offsetLeft+frame.width-20 || this.x < 0) {
            //this.dx = -this.dx;
            this.element.remove()
        }
        if (this.y - this.height < frame.offsetTop-70 || this.y < 0) {
            this.dy = -this.dy;
            //this.element.remove()
        }
        if (this.y + this.height > frame.offsetTop+frame.height+50 || this.y < 0) {
            this.dy = -this.dy;
        }
        if(isColliding(this.element, chara)) {
            this.element.remove()
            //add additonal game logic like score etc
            currentHealth -= 2
            updateHealth()
            }
    
  
        // Assuming you have a way to assign style to the element (e.g., this.element.style.left)
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';

        // Call the animation again using requestAnimationFrame
        requestAnimationFrame(this.animation.bind(this));
    }
  
    show() {
        const item = document.createElement('img');
        item.classList.add('object');
        item.src = 'images/bomb.png'
        item.style.left = this.x + 'px';
        item.style.top = this.y + 'px';
        item.style.width = this.width+'px'
        item.style.height = 'auto'
        item.style.position = 'absolute'
        body.appendChild(item);
            
        // Assign the element to the game object (assuming you have a way to store it)
        this.element = item;
    
        // Start the animation loop
        this.animation();
    }
    remove() {
        this.delete()
    }

}

class Bomb1 {
    constructor(height, width, speed) {
        this.height = height;
        this.width = 60;
        this.speed = speed;
        this.x = frame.offsetLeft+frame.offsetWidth - 70;
        this.y = getRandomSpeed(frame.height-300,frame.height-50);
        this.dx = getRandomSpeed(-1,-1.5);
        this.dy = getRandomSpeed(-1,-0.3);
        this.element;
    }
  
    animation() {
        if (currentHealth > 0) { 
            this.x += this.dx;
            this.y += this.dy;
        }
        const hitbox = {
            x: this.offsetLeft,
            y: this.offsetTop,
            width: this.offsetWidth,
            height: this.offsetHeight,
        };
    
        if (this.x - this.width < frame.offsetLeft-50 || this.x < 0) {
            //this.dx = -this.dx;
            this.element.remove()
        }
        if (this.y - this.height < frame.offsetTop-70 || this.y < 0) {
            this.dy = -this.dy;
            //this.element.remove()
        }
        if (this.y + this.height > frame.offsetTop+frame.height+50 || this.y < 0) {
            this.dy = -this.dy;
        }
        if(isColliding(this.element, chara)) {
            this.element.remove()
            //add additonal game logic like score etc
            currentHealth -= 2
            updateHealth()
            }
    
  
        // Assuming you have a way to assign style to the element (e.g., this.element.style.left)
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';

        // Call the animation again using requestAnimationFrame
        requestAnimationFrame(this.animation.bind(this));
    }
  
    show() {
        const item = document.createElement('img');
        item.classList.add('object');
        item.src = 'images/bomb.png'
        item.style.left = this.x + 'px';
        item.style.top = this.y + 'px';
        item.style.width = this.width+'px'
        item.style.height = 'auto'
        item.style.position = 'absolute'
        body.appendChild(item);
            
        // Assign the element to the game object (assuming you have a way to store it)
        this.element = item;
    
        // Start the animation loop
        this.animation();
    }
    remove() {
        this.delete()
    }

}

class Arrow {
    constructor(height, width, speed) {
        this.height = height;
        this.width = width;
        this.speed = speed;
        this.x = chara.offsetLeft - 200;
        this.y = chara.offsetTop - 300;
        this.dx = getRandomSpeed(1,1.5);
        this.dy = getRandomSpeed(1,3);
        this.element;
    }
  
    animation() {
        if (currentHealth > 0) { 
            this.x += this.dx;
            this.y += this.dy;
        }

        if (this.x + this.width > frame.offsetLeft+frame.width-20 || this.x < 0) {
            //this.dx = -this.dx;
            this.element.remove()
        }
        if (this.x - this.width < frame.offsetLeft || this.x < 0) {
            this.element.remove()
        }
        if (this.y + this.height > frame.offsetTop+frame.height+30 || this.y < 0) {
            //this.dy = -this.dy;
            this.element.remove()
        }
        if (this.y - this.height < frame.offsetTop-70 || this.y < 0) {
            //this.dy = -this.dy;
            this.element.remove()
        }
        if(isColliding(this.element, chara)) {
            this.element.remove()
            currentHealth -= 1
            updateHealth()
        }
    
  
        // Assuming you have a way to assign style to the element (e.g., this.element.style.left)
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';

        // Call the animation again using requestAnimationFrame
        requestAnimationFrame(this.animation.bind(this));
    }
  
    show() {
        const item = document.createElement('img');
        item.classList.add('object');
        item.src = 'images/arrow.png'
        item.style.left = this.x + 'px';
        item.style.top = this.y + 'px';
        item.style.width = this.width+'px'
        item.style.height = 'auto'
        item.style.position = 'absolute'
        body.appendChild(item);
            
        // Assign the element to the game object (assuming you have a way to store it)
        this.element = item;
        //setInterval(() => {
        //    this.x = chara.offsetLeft - 100;
        //    this.y = chara.offsetTop;
        //}, 2000)

        // Start the animation loop
        this.animation();
    }
    remove() {
        this.delete()
    }

}

class Arrow1 {
    constructor(height, width, speed) {
        this.height = height;
        this.width = width;
        this.speed = speed;
        this.x = chara.offsetLeft + 200;
        this.y = chara.offsetTop + 300;
        this.dx = getRandomSpeed(-1,-1.5);
        this.dy = getRandomSpeed(-1,-3);
        this.element;
    }
  
    animation() {
        if (currentHealth > 0) { 
            this.x += this.dx;
            this.y += this.dy;
        }

        if (this.x + this.width > frame.offsetLeft+frame.width-20 || this.x < 0) {
            //this.dx = -this.dx;
            this.element.remove()
        }
        if (this.x - this.width < frame.offsetLeft || this.x < 0) {
            this.element.remove()
        }
        if (this.y + this.height > frame.offsetTop+frame.height+30 || this.y < 0) {
            //this.dy = -this.dy;
            this.element.remove()
        }
        if (this.y - this.height < frame.offsetTop-70 || this.y < 0) {
            //this.dy = -this.dy;
            this.element.remove()
        }
        if(isColliding(this.element, chara)) {
            this.element.remove()
            currentHealth -= 1
            updateHealth()
        }
    
  
        // Assuming you have a way to assign style to the element (e.g., this.element.style.left)
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';

        // Call the animation again using requestAnimationFrame
        requestAnimationFrame(this.animation.bind(this));
    }
  
    show() {
        const item = document.createElement('img');
        item.classList.add('object');
        item.src = 'images/arrow.png'
        item.style.left = this.x + 'px';
        item.style.top = this.y + 'px';
        item.style.width = this.width+'px'
        item.style.height = 'auto'
        item.style.position = 'absolute'
        body.appendChild(item);
            
        // Assign the element to the game object (assuming you have a way to store it)
        this.element = item;
        //setInterval(() => {
        //    this.x = chara.offsetLeft - 100;
        //    this.y = chara.offsetTop;
        //}, 2000)

        // Start the animation loop
        this.animation();
    }
    remove() {
        this.delete()
    }

}

class Star {
    constructor(height, width, speed) {
        this.height = height;
        this.width = getRandomSpeed(3, 5)*10;
        this.speed = speed;
        this.x = frame.offsetLeft + frame.offsetWidth/2;
        this.y = frame.height/2;
        this.dx = getRandomSpeed(1, 5);
        this.dy = getRandomSpeed(1, 5);
        this.element;
    }
  
    animation() {
        if (currentHealth > 0) { 
            this.x += this.dx;
            this.y += this.dy;
        }
    
        if (this.x + this.width > frame.offsetLeft+frame.width-20 || this.x < 0) {
            this.dx = -this.dx;
            //this.element.remove()
        }
        if (this.x - this.width < frame.offsetLeft || this.x < 0) {
            this.element.remove()
        }
        if (this.y + this.height > frame.offsetTop+frame.height+50 || this.y < 0) {
            this.dy = -this.dy;
            //this.element.remove()
        }
        if (this.y - this.height < frame.offsetTop-70 || this.y < 0) {
            this.dy = -this.dy;
        }
        if(isColliding(this.element, chara)) {
            this.element.remove()
            //add additonal game logic like score etc
            currentHealth -= 1
            updateHealth()
            }
    
        // Assuming you have a way to assign style to the element (e.g., this.element.style.left)
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';

        // Call the animation again using requestAnimationFrame
        requestAnimationFrame(this.animation.bind(this));
    }
  
    show() {
        const item = document.createElement('img');
        item.classList.add('object');
        item.src = 'images/star.png'
        item.style.left = this.x + 'px';
        item.style.top = this.y + 'px';
        item.style.width = this.width+'px'
        item.style.height = 'auto'
        item.style.position = 'absolute'
        body.appendChild(item);
            
        // Assign the element to the game object (assuming you have a way to store it)
        this.element = item;
    
        // Start the animation loop
        this.animation();
    }
    remove() {
        this.delete()
    }
    

}

class Heal {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.x = getRandomSpeed(frame.offsetLeft+40, frame.offsetLeft+frame.offsetWidth-40);
        this.y = getRandomSpeed(frame.offsetTop+40, frame.offsetTop+frame.offsetHeight-40);
        this.element;
    }
    animation() {
        if(isColliding(this.element, chara)) {
            this.element.remove()
            //add additonal game logic like score etc
            currentHealth += 3
            updateHealth()
        }
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';

        requestAnimationFrame(this.animation.bind(this));
    }
    show() {
        const item = document.createElement('img');
        item.classList.add('object');
        item.src = 'images/heal.png'
        item.style.left = this.x + 'px';
        item.style.top = this.y + 'px';
        item.style.width = this.width+'px'
        item.style.height = 'auto'
        item.style.position = 'absolute'
        body.appendChild(item);
            
        // Assign the element to the game object (assuming you have a way to store it)
        this.element = item;
    
        // Start the animation loop
        this.animation();
    }
    remove() {
        this.delete()
    }

}

//balls spawn from top left every 7s

setInterval(() => {
    if (currentHealth > 0) { 
        console.log(new GameObject);
        for(let i= 0; i < 5; i++) {
            const item = new GameObject(100, 50, 2);
            item.show();
            item.animation();
        }
    }
}, 3000);

//balls spawn from top right every 7s
setInterval(() => {
    if (currentHealth > 0) {
        console.log(new Balls);
        for(let i= 0; i < 5; i++) {
            const item = new Balls(100, 50, 2);
            item.show();
            item.animation();
        }
    }
}, 7000);

//bomb spawn from bottom left
setInterval(() => {
    if (currentHealth > 0) {
        console.log(new Bomb);
        const item = new Bomb(100, 50, 2);
        item.show();
        item.animation();
    }
}, 2000);

//bomb spawn from bottom right
setInterval(() => {
    if (currentHealth > 0) {
        console.log(new Bomb1);
        const item = new Bomb1(100, 50, 2);
        item.show();
        item.animation();
    }
}, 3000);

//arrow spawn near character
setInterval(() => {
    if (currentHealth > 0) {
        const item = new Arrow(100, 50, 2);
        console.log(item);
        //updateBullet(Arrow, chara);
        item.show();
        item.animation();
    }
}, 1500);

//arrow spawn near character
setInterval(() => {
    if (currentHealth > 0) {
        const item = new Arrow1(100, 50, 2);
        console.log(item);
        //updateBullet(Arrow, chara);
        item.show();
        item.animation();
    }
}, 3000);

//stars spawn in the middle
setInterval(() => {
    if (currentHealth > 0) {
        console.log(new Star);
        for(let i= 0; i < 3; i++) {
            const item = new Star(100, 50, 2);
            item.show();
            item.animation();
        }
    }
}, 4000);

setInterval(() => {
    if (currentHealth > 0) {
        const item = new Heal(100, 40);
        console.log(item);
        //updateBullet(Arrow, chara);
        item.show();
        item.animation();
    }
}, 10000);


