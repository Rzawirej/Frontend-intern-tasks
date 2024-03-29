/**
 * Main function that solves the riddle of statue. It doesn't change the original board. Instead it returns a new one.
 * @param {int[][]} board - board with jewels.
 * @returns {int[][]} board with solved riddle.
 */
function riddleSolver(board){
    const boardClone = JSON.parse(JSON.stringify(board));
    let adjacents = findAdjacents(boardClone);
    while(adjacents.length > 0){
        changeAdjacentsToZero(boardClone, adjacents);
        fillHoles(boardClone);
        adjacents = findAdjacents(boardClone);
    }
    return boardClone;
}
/**
 * @typedef {Object} Adjacent
 * Object that stores informations about adjacent jewels.
 * @property {number} column - Index of column in which chain of jewels starts.
 * @property {number} row - Index of row in which chain of jewels starts.
 * @property {number} length - How many jewels of the same type in a row.
 * @property {boolean} vertical - True if vertical line. False if horizontal line.
 */
/**
 * Helper function that finds where in board there are 3 or more jewels adjacent horizontally or vertically.
 * @param {int[][]} board - board with jewels.
 * @returns {Adjacent[]} board with solved riddle.
 */
function findAdjacents(board){
    const adjacents = [];
    //Find vertical adjacents
    for (let j = 0; j < board.length; j++) {
        let matchLength = 1;
        for (let i = 0; i < board[0].length; i++) {
            let finishedChecking = false;
            if (i == board[0].length - 1) {
                finishedChecking = true;
            } else {
                if (board[i][j] == board[i + 1][j] && board[i][j] != 0) {
                    matchLength += 1;
                } else {
                    finishedChecking = true;
                }
            }
            if (finishedChecking) {
                if (matchLength >= 3) {
                    adjacents.push({
                        column: i + 1 - matchLength,
                        row: j,
                        length: matchLength,
                        vertical: true
                    });
                }
                matchLength = 1;
            }
        }
    }
    //Find horizontal adjacents
    for (let i = 0; i < board[0].length; i++) {
        let matchLength = 1;
        for (let j = 0; j < board.length; j++) {
            let finishedChecking = false;
            if (j == board.length - 1) {
                finishedChecking = true;
            } else {
                if (board[i][j] == board[i][j + 1] && board[i][j] != 0) {
                    matchLength += 1;
                } else {
                    finishedChecking = true;
                }
            }
            if (finishedChecking) {
                if (matchLength >= 3) {
                    adjacents.push({
                        column: i,
                        row: j + 1 - matchLength,
                        length: matchLength,
                        vertical: false
                    });
                }
                matchLength = 1;
            }
        }
    }
    return adjacents;
}
/**
 * Helper function that removes jewels by making them zeros.
 * @param {int[][]} board - board with jewels.
 * @param {Adjacent[]} adjacents - Array of objects from each one represents one set of adjacent jewels.
 */
function changeAdjacentsToZero(board, adjacents){
    adjacents.forEach(el => {
        if(!el.vertical){
            for(j = el.row; j < el.row + el.length; j++){
                board[el.column][j] = 0;
            }
        }else{
            for(i = el.column; i < el.column + el.length; i++){
                board[i][el.row] = 0;
            }
        }
    });
}
/**
 * Helper function that drops jewels if some jewel under it was removed.
 * @param {int[][]} board - board with jewels
 */
function fillHoles(board){
    for(j = 0; j < board.length; j++){
        for (i = board[0].length-1; i >= 0; i--){
            if(board[i][j] != 0){
                let i_temp = i;
                while (i_temp + 1 < board[0].length && board[i_temp + 1][j] == 0){
                    i_temp++;
                }
                [board[i][j], board[i_temp][j]] = [board[i_temp][j], board[i][j]];
            }
        }
    }
}
module.exports.riddleSolver = riddleSolver
