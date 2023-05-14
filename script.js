let score = document.querySelector(".score");
let high = document.querySelector(".high-score");
let road = document.querySelector(".road");
let mycar = document.querySelector(".mycar");
let cars = document.querySelector(".cars");
let roadLine = document.querySelector(".roadLines");
let player;
let speed1 = 123;



const randomColor = () => {
    
    return Math.floor(Math.random() * 100000);
    
}




let carMovement = (code) => {
    let car = document.querySelector(".car");
    if (code == 37 && x > 0) {
        x -= speed1;
    }
    if (code == 39 && x < 246) {
        x += speed1;
    }
    car.style.left = x + "px";

}

const leftRandom = () => {
    let position = [0, 123, 246];
    return position[Math.floor(Math.random() * 3)];
}



let speed2 = 4;
let speed = 10;
let sc = 0;
let hc = 3;

const isCollide = (enemy) => {
    let car = document.querySelector(".car");
    let enemyTop = parseInt(window.getComputedStyle(enemy).getPropertyValue("top"));
    let enemyLeft = parseInt(window.getComputedStyle(enemy).getPropertyValue("left"));
    let carLeft = parseInt(window.getComputedStyle(car).getPropertyValue("left"));
    console.log(enemyTop, enemyLeft, carLeft);

    return (enemyLeft === carLeft) && (enemyTop > 540) && (enemyTop < 560);



}

const enemyCarMovement = () => {
    let enemyCars = document.querySelectorAll(".cars>div");
    enemyCars.forEach(enemy => {
        if (player) {
            if (enemy.y > 721) {
                enemy.y -= 700;
                sc++;
                score.innerHTML = `Score ${sc}`;
                enemy.style.backgroundColor = "#" + randomColor();
                console.log("dd")
                enemy.style.left = leftRandom() + "px";
            }
            if (isCollide(enemy)) {

                endGame();
            }
            enemy.y += speed;
            enemy.style.top = enemy.y + "px";
            window.requestAnimationFrame(enemyCarMovement);
        }
    });

}


const createCar = () => {
    let car = document.createElement("div");
    car.setAttribute("class", "car");
    mycar.appendChild(car);
    x = car.offsetLeft;
    y = car.offsetTop;
    console.log(x, y);

}
const createEnemyCars = () => {
    for (let i = 0; i < 1; i++) {
        let enemyCar = document.createElement("div");
        enemyCar.y = (i * 150);
        enemyCar.style.top = (i * 150) + "px";
        enemyCar.style.backgroundColor = "#" + randomColor();
        cars.appendChild(enemyCar);
        window.requestAnimationFrame(enemyCarMovement);
    }
}

const linesMovement = () => {
    let lines = roadLine.querySelectorAll("div");
    lines.forEach(line => {
        if (player) {
            if (line.y >= 750) {
                line.y -= 750;
            }
            line.y += speed2;
            line.style.top = line.y + "px";

        }
    })
    window.requestAnimationFrame(linesMovement);
}

const createLines = () => {

    for (let i = 0; i < 5; i++) {
        let line = document.createElement("div");
        line.y = (i * 150);
        line.style.top = (i * 150) + "px";
        roadLine.appendChild(line);
    }
    window.requestAnimationFrame(linesMovement);

}

document.addEventListener("keydown", (event) => {
    let keyCode = event.keyCode;
    carMovement(keyCode);

})


let start = document.querySelector(".start")


start.addEventListener("click", () => {
    start.classList.add("hide");
    road.classList.remove("hide");
    player = true;

    createCar();
    createEnemyCars();
    createLines();

})


function endGame() {
    player = false;
    start.innerHTML = "ReStart";
    
    start.classList.remove("hide");
    score.innerHTML = `Score ${sc}`;

    start.classList.add("restart");
    start.classList.remove("start");

    reload(document.querySelector(".restart"));


}
function reload(event) {
    event.addEventListener("click", () => {

        event.classList.add("start");
        event.classList.remove("restart");
      
        window.location.reload();
    })
}