var grid = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]
];

var RED = 1;
var BLACK = 2;

exports.makeMove = function(player,column) {
    var row = grid.length-1;
    while (row >= 0 && grid[row][column] != 0) {
        row--;
    }
    if (row >= 0) {
        grid[row][column] = player;
    }
}

exports.getWinner = function() {
    //check for wins across
    var red = 0, black = 0;
    for (var i=0; i<grid.length; i++) {
        for (var j=0; j<grid.length; j++) {
            switch (grid[i][j]) {
                case RED:
                    red++;
                    black = 0;
                    if (red>=4)
                        return RED;
                    break;
                case BLACK:
                    black++;
                    red = 0;
                    if (black>=4)
                        return BLACK;
                    break;
                default:
                    red = 0;
                    black = 0;
                    break;
            }
        }
    }

    //check for wins vertical
    red = 0, black = 0;
    for (var i=0; i<grid[0].length; i++) {
        for (var j=0; j<grid.length; j++) {
            switch (grid[j][i]) {
                case RED:
                    red++;
                    black = 0;
                    if (red>=4)
                        return RED;
                    break;
                case BLACK:
                    black++;
                    red = 0;
                    if (black>=4)
                        return BLACK;
                    break;
                default:
                    red = 0;
                    black = 0;
                    break;
            }
        }
    }

    //check for diagonal win
    for (var i=0; i<grid.length-2; i++) {
        for (var j=0; j<grid.length; j++) {
            if (grid[i][j] > 0) {
                if (partOfDiagonalWin(grid[i][j],i,j)) {
                    return grid[i][j];
                }
            }
        }
    }

    console.log(grid);

    return 0;
}


function partOfDiagonalWin(player,row,col) {
    var countRight = 1;
    var shiftRight = 1;
    while ((row+shiftRight) < grid.length && (col+shiftRight) < grid[0].length && grid[row+shiftRight][col+shiftRight] == player) {
        countRight++;
        shiftRight++;

        if (countRight >= 4)
            return true;
    }

    var countLeft = 1;
    var shiftLeft = 1;
    while ((row+shiftLeft) < grid.length && (col-shiftLeft) >= 0 && grid[row+shiftLeft][col-shiftLeft] == player) {
        countLeft++;
        shiftLeft++;

        if (countLeft >= 4)
            return true
    }

    return false
}

exports.reset = function() {
    for (var i=0; i<grid.length; i++) {
        for (var j=0; j<grid.length; j++) {
            grid[i][j] = 0;
        }
    }
}
