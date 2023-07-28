import {TetrisPiece} from "./TetrisPiece.js";

class I_Piece extends TetrisPiece{
    constructor(x, y) {
        let matrixrepr = [
            [0,0,0,0],
            [1,1,1,1],
            [0,0,0,0],
            [0,0,0,0]
        ]
        let color = "cyan";
        super(matrixrepr, x, y);
    }
}

export {I_Piece}