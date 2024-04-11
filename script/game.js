
let score = 0;
let previousScore = 0;
let highScore = localStorage.getItem("highScore") || 0;
let currentPlayerPosition = { row: 0, column: 0 };
let currentCatPosition = { row: 0, column: 0 };
let currentZombiePosition = { row: 0, column: 0 };
let zombieMoveTime;
let zombieSound = new Audio('sound/zombie.mp3')


let map = {
    "places": [
        [
            { 'img': 'images/forest1.gif', 'description': "Grön naturtrappa till grotta,fjärilar flyger" },
            { 'img': 'images/forest2.gif', 'description': "Det flyger maskrosfrön i vinden" },
            { 'img': 'images/forest3.gif', 'description': "Stuga vid bäck,rosa löv faller" },
            { 'img': 'images/forest4.gif', 'description': "vacker landskap med blommor och berg" },
            { 'img': 'images/forest5.gif', 'description': "Natthimmel i skog" }
        ],
        [
            { 'img': 'images/forest6.gif', 'description': "Norrsken" },
            { 'img': 'images/forest7.gif', 'description': "Snön faller kanin, vattenfall" },
            { 'img': 'images/forest8.gif', 'description': "Snön faller över vinterträd" },
            { 'img': 'images/forest9.gif', 'description': "Snön faller, vinter" },
            { 'img': 'images/forest10.gif', 'description': "Snö faller över slott" }
        ],
        [
            { 'img': 'images/forest11.gif', 'description': "Hus och berg" },
            { 'img': 'images/forest12.gif', 'description': "Kraftigt regn över vacker byggnad" },
            { 'img': 'images/forest13.gif', 'description': "Natt över staden, ljus i fönstren" },
            { 'img': 'images/forest14.gif', 'description': "Kör framåt på landsväg med norrsken på himlen" },
            { 'img': 'images/forest15.gif', 'description': "Soluppgång över vacker landskap med blommor och berg" }
        ],
        [
            { 'img': 'images/forest16.gif', 'description': "Vacker landskap med blommor och berg" },
            { 'img': 'images/forest17.gif', 'description': "Damm omgiven av vackra träd" },
            { 'img': 'images/forest18.gif', 'description': "Rosa träd mmed blad som faller" },
            { 'img': 'images/forest19.gif', 'description': "Väg genom by, fjärilar " },
            { 'img': 'images/forest20.gif', 'description': "Solrosor i solsken" }
        ],
        [
            { 'img': 'images/forest21.gif', 'description': "Eldgnista genom skogen i skymning" },
            { 'img': 'images/forest22.gif', 'description': "Fullmåne över vatten" },
            { 'img': 'images/forest23.gif', 'description': "Natt, fullmåne, skräckinjagande slott" },
            { 'img': 'images/forest24.gif', 'description': "Rökmoln över berg" },
            { 'img': 'images/forest25.gif', 'description': "Vattenfall, örn som flyger" }
        ]
    ]
};

function drawTable() {
    let gameboard = document.getElementById("gameboard")
    gameboard.innerHTML = ""   //För att rensa spelplanen

    let table = document.createElement("table")  //Skapa en tabell
    table.setAttribute("border", "1")
    for (let i = 0; i < 5; i++) {
        let row = document.createElement("tr")

        for (let j = 0; j < 5; j++) {
            let cell = document.createElement("td")
            if (i === currentPlayerPosition.row && j === currentPlayerPosition.column) {
                cell.textContent = "X";
            }

            //för kontroll av zombieposition, rita ut ett Z på tabellen
            /* if (i === currentZombiePosition.row && j === currentZombiePosition.column) {
                  cell.textContent = "Z"
              }*/

            row.appendChild(cell)
        }
        table.appendChild(row)


    }
    gameboard.appendChild(table)

}
function drawMapImage() {
    let mapImageContainer = document.getElementById("mapImage")
    mapImageContainer.innerHTML = "" //För att rensa tidigare bild

    let currentPlace = map.places[currentPlayerPosition.row][currentPlayerPosition.column]
    let mapImage = document.createElement("img")
    mapImage.src = currentPlace.img
    mapImageContainer.appendChild(mapImage)
}
function drawZombieImage() {
    let zombieImageContainer = document.getElementById("zombieImage")
    zombieImageContainer.innerHTML = ""
    if (currentPlayerPosition.row === currentZombiePosition.row && currentPlayerPosition.column === currentZombiePosition.column) {

        let zombieImage = document.createElement("img")
        zombieImage.src = "images/zombie.png"
        zombieImageContainer.appendChild(zombieImage)

    }

}
function drawCatImage() {
    let catImageContainer = document.getElementById("catImage")
    catImageContainer.innerHTML = ""
    if (currentPlayerPosition.row === currentCatPosition.row && currentPlayerPosition.column === currentCatPosition.column) {
        currentPlace = map.places[currentCatPosition.row][currentCatPosition.column]
        let catImage = document.createElement("img")
        catImage.src = "images/cat.png"
        catImageContainer.appendChild(catImage)

    }

}

function drawMapDescription() {
    let drawMapDescriptionContainer = document.getElementById("mapDescription")
    drawMapDescriptionContainer.innerHTML = ""

    let currentPlace = map.places[currentPlayerPosition.row][currentPlayerPosition.column]
    let mapDescription = document.createElement("p")
    mapDescription.textContent = currentPlace.description
    drawMapDescriptionContainer.appendChild(mapDescription)
}
function findCat() {
    if (currentPlayerPosition.row === currentCatPosition.row && currentPlayerPosition.column === currentCatPosition.column) {
        drawCatImage();
        score++;
        alert("Bravo du hittade katten! poäng: " + score);
        document.getElementById("score").textContent = "poäng: " + score;
        API()
        placeCatRandomly();
    }
    else {
        let catImageContainer = document.getElementById("catImage");
        catImageContainer.innerHTML = "";
        let api = document.getElementById("api");
        api.innerHTML = "";
    }
}

function zombieAttack() {
    if (currentPlayerPosition.row === currentZombiePosition.row && currentPlayerPosition.column === currentZombiePosition.column) {
        drawZombieImage();


        alert("Oh nej zombien tog dig! GAME OVER!!");
        previousScore = score
        document.getElementById("score").textContent = "Du fick poäng: " + score;
        updateHighScore(score);

        placeZombieRandomly()
        score = 0;


    }
    else {
        let zombieImageContainer = document.getElementById("zombieImage");
        zombieImageContainer.innerHTML = "";
        document.getElementById("score").textContent = "poäng: " + score;

    }

}
function updateHighScore(score) {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
    }
    document.getElementById("highScore").textContent = "Bästa  resultat: " + highScore;
}
function displayHighScore() {
    document.getElementById("highScore").textContent = "Bästa resultat: " + highScore;
}
function moveZombie() {


    let direction = Math.floor(Math.random() * 4)

    switch (direction) {
        case 0:
            if (currentZombiePosition.row > 0) {
                currentZombiePosition.row--;
            }
            break;
        case 1:
            if (currentZombiePosition.row < 4) {
                currentZombiePosition.row++;
            }
            break;
        case 2:
            if (currentZombiePosition.column > 0) {
                currentZombiePosition.column--;
            }
            break;
        case 3:
            if (currentZombiePosition.column < 4) {
                currentZombiePosition.column++;
            }
            break;
    }
    drawZombieImage();
    if (Math.abs(currentPlayerPosition.row - currentZombiePosition.row) <= 2 && Math.abs(currentPlayerPosition.column - currentZombiePosition.column) <= 2) {
        zombieSound.play();
    }


}


function moveplayer(direction) {

    switch (direction) {
        case "Nord":
            if (currentPlayerPosition.row > 0) {
                currentPlayerPosition.row--;
                moveZombie()
            }
            break;
        case "Syd":
            if (currentPlayerPosition.row < 4) {
                currentPlayerPosition.row++;
                moveZombie()
            }
            break;
        case "Väst":
            if (currentPlayerPosition.column > 0) {
                currentPlayerPosition.column--;
                moveZombie()
            }
            break;
        case "Öst":
            if (currentPlayerPosition.column < 4) {
                currentPlayerPosition.column++;
                moveZombie()
            }
            break;
    }
    drawTable();
    drawMapImage();
    drawMapDescription();
    zombieAttack();

    findCat();


}




function placePlayerRandomly() {
    currentPlayerPosition.row = Math.floor(Math.random() * 5);
    currentPlayerPosition.column = Math.floor(Math.random() * 5);
}
function placeCatRandomly() {
    currentCatPosition.row = Math.floor(Math.random() * 5);
    currentCatPosition.column = Math.floor(Math.random() * 5);
}
function placeZombieRandomly() {
    currentZombiePosition.row = Math.floor(Math.random() * 5);
    currentZombiePosition.column = Math.floor(Math.random() * 5);
}
placeCatRandomly();
placePlayerRandomly();
placeZombieRandomly();
moveZombie();
displayHighScore();
drawTable();
drawMapImage();
drawMapDescription();
















