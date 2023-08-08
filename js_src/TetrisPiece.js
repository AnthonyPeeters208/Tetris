class TetrisPiece{
    constructor(matrix_rep, x, y, color) {
        this.matrix_rep = matrix_rep;
        this.x = x;
        this.y = y;
        this.color = color;
    }

    rotate(){
        // rotates clockwise
        let newmatrixrep = []
        let oldm = this.matrix_rep;
        for(let i=0; i<oldm.length; i++){
            let row = []
            for(let j=(oldm.length-1); j>=0; j--){
                row.push(oldm[j][i]);
            }
            newmatrixrep.push(row);
        }
        this.matrix_rep = newmatrixrep;
    }

}

export {TetrisPiece}