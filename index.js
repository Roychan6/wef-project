const unitLength  = 10;
const boxColor    = 51;
const strokeColor = 51; // color when presses

let fr = 10;
let slider;

let columns; /* To be determined by window width */
let rows;    /* To be determined by window height */
let currentBoard;
let nextBoard;
let isGameStart = false;
var emoji = String.fromCodePoint(0x1F621)

function windowResized() {
    width = windowWidth / 2.7;
    height = windowHeight / 2.3;
    resizeCanvas(width, height);
    updateUI();
  }

function setup() {
    width = windowWidth / 2.7;
    height = windowHeight / 2.3;
    const canvas = createCanvas (width, height);
    canvas.parent(document.querySelector("#canvas"));

    columns = floor(width  / unitLength); //55
    rows    = floor(height / unitLength); //41

    currentBoard = [];
    nextBoard = [];
    for (let i = 0; i < columns; i++) {
        currentBoard[i] = []; // currentBoard.push([])
        nextBoard[i] = []
    }

    setGameStart(false); // Stop the game first
    initGame();
    frameRate(fr);
    updateUI();


}

function initGame() {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            currentBoard[i][j] = 0; //[0][1] means columns 0 raw 1, lopp all to clear
            nextBoard[i][j] = 0;
            // 0 means no lift, 1 means with life
        }
    }
}

//function UpdateGameBoardSize () {}

function updateUI() {
    // visualize the board
    
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (currentBoard[i][j] === 1) {
                fill(Math.floor(Math.random() * 256) + 1,
                Math.floor(Math.random() * 256) + 1,
                Math.floor(Math.random() * 256) + 1);

            } else {
                fill(30);
            }
            stroke(strokeColor);
            rect(i * unitLength, j * unitLength, unitLength, unitLength);
            }
        }
        NumCounter()
        FrCount()
    }
    
function generate() { // loop nei
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            // every single cell
            let neighbors = 0;
            for (let i of [-1, 0, 1]) {
                for (let j of [-1, 0, 1]) {
                    // every around box
            if( i == 0 && j == 0 ){
                // the cell itself is not its own neighbor
                continue;
            }
            // for boarder box (box without nei)
            // plus columns then & colums, no remain.
            // The unexisted box will refer to top/left/right/bottom col/rows 
            // currentBoard[i][j] should equal to 0/1
            // neighbors += will plus all 8 boxes including 0/1 by loop
            neighbors += currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
        }
        }
          // Rules of Life
          if (currentBoard[x][y] === 1 && neighbors < 2) {
            // Die of Loneliness
            nextBoard[x][y] = 0;
        } else if (currentBoard[x][y] === 1 && neighbors > 3) {
            // Die of Overpopulation
            nextBoard[x][y] = 0;
        }         
        else if (currentBoard[x][y] === 0 && neighbors == 3) {
            // New life due to Reproduction
            nextBoard[x][y] = 1;
        } else {
            // Stasis
            nextBoard[x][y] = currentBoard[x][y];
        }
    }
}
// Swap the nextBoard to be the current Board
[currentBoard, nextBoard] = [nextBoard, currentBoard];
}



// function GameBoardSizeAdjustment () {}
    
function FrCount () {
    let FrCounter = document.querySelector("#Framerate");

    FrCounter.innerHTML = "Framerate:" + fr

}

function NumCounter() {
    let Counter = document.querySelector("#Count");
    var count = 0;

    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (currentBoard[i][j] === 1) {
                count ++;
            }
         }}
         Counter.innerHTML = "Population:" + count
        
        }


function draw() {
    if (!isGameStart) {
        return;
    }

    console.log("draw");
    generate();
    updateUI();
}

function setGameStart(isStart) {
    isGameStart = isStart;
    if (isStart) {
        loop();
    } else {
        noLoop();
    }
}


function insertPattern(x, y) {
    const acornPatternArr = acornPattern.split("\n");
    for (let i = 0; i < acornPatternArr.length; i++) {
        // i -> row
        for (let j = 0; j < acornPatternArr[i].length; j++) {
            // j -> column
            currentBoard[x + j][y + i] = acornPatternArr[i][j] === "." ? 0 : 1;
        }
    }

    updateUI();
}

function KickbackPattern(x, y) {
    const KickBackArr = Kickback.split("\n");
    for (let i = 0; i < KickBackArr.length; i++) {
        // i -> row
        for (let j = 0; j < KickBackArr[i].length; j++) {
            // j -> column
            currentBoard[x + j][y + i] = KickBackArr[i][j] === "." ? 0 : 1;
        }
    }

    updateUI();
}

function JamPattern(x, y) {
    const jamArr = jam.split("\n");
    for (let i = 0; i < jamArr.length; i++) {
        // i -> row
        for (let j = 0; j < jamArr[i].length; j++) {
            // j -> column
            currentBoard[x + j][y + i] = jamArr[i][j] === "." ? 0 : 1;
        }
    }

    updateUI();
}

function WhyNotPattern(x, y) {
    const WhyNotAyy = WhyNot.split("\n");
    for (let i = 0; i < WhyNotAyy.length; i++) {
        // i -> row
        for (let j = 0; j < WhyNotAyy[i].length; j++) {
            // j -> column
            currentBoard[x + j][y + i] = WhyNotAyy[i][j] === "." ? 0 : 1;
        }
    }

    updateUI();
}
// Key control

function LobsterPattern(x, y) {
    const LobsterArr = Lobster.split("\n");
    for (let i = 0; i < LobsterArr.length; i++) {
        // i -> row
        for (let j = 0; j < LobsterArr[i].length; j++) {
            // j -> column
            currentBoard[x + j][y + i] = LobsterArr[i][j] === "." ? 0 : 1;
        }
    }

    updateUI();
}




let Xray = 27; // Xray for left(+)/right(-)
let Bray = 20;

function keyPressed () {
    setGameStart(false);

    // Set 2 locations
    // ori location is old location
    // after moved, new location saved
    // new location replaced old location 
    // so old(new) location could be used again.
    
        // Use 2 const
        // use push function???
        // oldLocation.push([Xray],[Bray]);
        // oldLocation = currentBoard[Xray][Bray];
        

    if (keyCode === UP_ARROW){
        //console.log(Bray)
        // console.log(oldLocation)
        console.log("up");
        Bray = Bray - 1;
        console.log(Bray)
        currentBoard[Xray][Bray] = 1; 
        fill(200);
        stroke(strokeColor); // color the selected box
        rect(Xray * unitLength, (Bray)* unitLength, unitLength, unitLength);
        // location = location[Xray][Bray-1]
        //currentBoard[Xray][Bray] = currentBoard[Xray][Bray-1];
        //console.log(currentBoard[Xray][Bray]); // 1
        //oldLocation.push([Xray],[Bray-1]); 
        //console.log(oldLocation) // 2 arrays, first 16, second 8
        //currentBoard.length = 0; // clear content of currentBoard
        //console.log(currentBoard) // 0
        //currentBoard.push(oldLocation);
        //console.log("currentfinal value" + currentBoard);

    } else if (keyCode === DOWN_ARROW) {
        console.log("down")
        Bray = Bray + 1;
        currentBoard[Xray][Bray] = 1; 
        fill(200);
        stroke(strokeColor); // color the selected box
        rect(Xray * unitLength, (Bray)* unitLength, unitLength, unitLength);
        
    } else if (keyCode === LEFT_ARROW) {
        console.log("left")
        Xray = Xray - 1;
        currentBoard[Xray][Bray] = 1; 
        fill(200);
        stroke(strokeColor); // color the selected box
        rect((Xray) * unitLength, (Bray)* unitLength, unitLength, unitLength);
    } else if (keyCode === RIGHT_ARROW) {
        console.log("right")
        Xray = Xray + 1;
        currentBoard[Xray][Bray] = 1; 
        fill(200);
        stroke(strokeColor); // color the selected box
        rect((Xray) * unitLength, (Bray)* unitLength, unitLength, unitLength);
    } 
}


// When mouse is dragged
 
function mouseDragged() {
    /**
     * If the mouse coordinate is outside the board
     */
    if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
        return;
    }
    const x = Math.floor(mouseX / unitLength);
    const y = Math.floor(mouseY / unitLength);
    console.log(currentBoard[x][y])
    currentBoard[x][y] = 1;
    console.log(currentBoard[x][y])
    fill(255);
    stroke(strokeColor); // color the selected box
    rect(x * unitLength, y * unitLength, unitLength, unitLength);
}

/**
 * When mouse is pressed
 */
function mousePressed() {
    noLoop();
    mouseDragged();
}

/**
 * When mouse is released
 */
function mouseReleased() {
    loop();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  

function randomDisplay () {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            currentBoard[i][j] = getRandomInt(2)
;

}}}


document.querySelector("#Next-stage").addEventListener("click", (e) => {
    setGameStart(false);
    generate();
    updateUI();
});

document.querySelector("#start").addEventListener("click", (e) => {
    setGameStart(true);
});
document.querySelector("#pause").addEventListener("click", (e) => {
    setGameStart(false);
});
document.querySelector("#stop").addEventListener("click", (e) => {
    setGameStart(false);
    initGame();
    updateUI();
});

document.querySelector("#random").addEventListener("click", (e) => {
    setGameStart(false);
    initGame();
    randomDisplay();
    updateUI();
});

document.querySelector("#Increase-Speed").addEventListener("click",(e) => {
    if (fr >= 60) // max 60fr
    return;
    fr +=10;
    frameRate(fr); 
    FrCount(fr);

})

document.querySelector("#Decrease-Speed").addEventListener("click",(e) => {
    if (fr <= 0) // min 0 fr
    return;
    fr -=10;
    frameRate(fr);
    FrCount(fr);
    
})

document.querySelector("#pattern1").addEventListener("click" , (e) => {
    setGameStart(false);
    initGame();
    insertPattern(10, 5);

})

document.querySelector("#Kickback").addEventListener("click", (e) => {
    setGameStart(false);
    initGame();
    KickbackPattern(5,5);
})

document.querySelector("#jam").addEventListener("click", (e) => {
    setGameStart(false);
    initGame();
    JamPattern(5,5);
    
})

document.querySelector("#WhyNot").addEventListener("click", (e) => {
    setGameStart(false);
    initGame();
    WhyNotPattern(5,5)
    
})

document.querySelector("#Lobster").addEventListener("click", (e) => {
    setGameStart(false);
    initGame();
    LobsterPattern(8,8);
})
