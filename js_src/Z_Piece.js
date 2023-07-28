import {TetrisPiece} from "./TetrisPiece.js";

class Z_Piece extends TetrisPiece{
    constructor(x, y) {
        let matrixrepr = [
            [1,1,0],
            [0,1,1],
            [0,0,0]
        ]
        let color = "green";
        super(matrixrepr, x, y, color);
    }
}

export {Z_Piece}