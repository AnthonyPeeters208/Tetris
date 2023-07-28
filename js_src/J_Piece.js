import {TetrisPiece} from "./TetrisPiece.js";

class J_Piece extends TetrisPiece{
    constructor(x, y) {
        let matrixrepr = [
            [1,0,0],
            [1,1,1],
            [0,0,0]
        ]
        let color = "blue";
        super(matrixrepr, x, y, color);
    }
}

export {J_Piece}