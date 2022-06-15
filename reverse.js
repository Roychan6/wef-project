function Backstage() { // Reverse
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            let neighbors = 0;
            for (let i of [-1, 0, 1]) {
                for (let j of [-1, 0, 1]) {  
            if( i == 0 && j == 0 ){
                
                continue;
            }
            neighbors += currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
        }
}
  // Rules of Life (Reverse)
  if (currentBoard[x][y] === 0 && neighbors >2) {
  
    nextBoard[x][y] = 1;
} else if (currentBoard[x][y] === 0 && neighbors < 3 ) {
  
    nextBoard[x][y] = 1;
}         
else if (currentBoard[x][y] === 1 && neighbors === 3) {
  
    nextBoard[x][y] = 0;
} else {
    // Stasis
    nextBoard[x][y] = currentBoard[x][y];
}
}
}
// Swap the nextBoard to be the current Board
[currentBoard, nextBoard] = [nextBoard, currentBoard];
}