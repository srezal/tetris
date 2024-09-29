export class Field{


    constructor(width, height){
        this.width = width
        this.height = height
        this.generate()
    }


    generate(){
        this.arr = []
        for (let row = -2; row < this.height; row++) {
            this.arr[row] = [];
            for (let col = 0; col < this.width; col++) {
                this.arr[row][col] = 0;
            }
        }
    }


    get(i, j){
        return this.arr[i][j];
    }


    checkCollision(figure){
        for (let row = 0; row < figure.matrix.length; row++) {
            for (let col = 0; col < figure.matrix[row].length; col++) {
                if (figure.matrix[row][col] && (
                    figure.col + col < 0 ||
                    figure.col + col >= this.width ||
                    figure.row + row >= this.height ||
                    this.arr[figure.row + row][figure.col + col])
                ) {
                    return false;
                }
            }
        }
        return true;
    }


    placeFigure(figure){
        for (let row = 0; row < figure.matrix.length; row++) {
            for (let col = 0; col < figure.matrix[row].length; col++) {
                if (figure.matrix[row][col]) {
                    if (figure.row + row < 0) {
                        return -1;
                    }
                    this.arr[figure.row + row][figure.col + col] = figure.name;
                }
            } 
        }
    
        let clearedRows = 0;
        for (let row = this.height - 1; row >= 0; ) {
            if (this.arr[row].every(cell => !!cell)) {
                clearedRows++;
                for (let r = row; r >= 0; r--) {
                    for (let c = 0; c < this.arr[r].length; c++) {
                        this.arr[r][c] = this.arr[r-1][c];
                    }
                }
            }
            else {
                row--;
            }
        }
        
        return clearedRows;
    }

}