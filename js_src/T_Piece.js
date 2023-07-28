import {TetrisPiece} from "./TetrisPiece.js";

class T_Piece extends TetrisPiece{
    constructor(x, y) {
        let matrixrepr = [
            [0,1,0],
            [1,1,1],
            [0,0,0]
        ]
        let color = "purple";
        super(matrixrepr, x, y, color);
    }
}

export {T_Piece}