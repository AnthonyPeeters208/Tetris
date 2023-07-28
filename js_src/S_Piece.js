import {TetrisPiece} from "./TetrisPiece.js";

class S_Piece extends TetrisPiece{
    constructor(x, y) {
        let matrixrepr = [
            [0,1,1],
            [1,1,0],
            [0,0,0]
        ]
        let color = "lightgreen";
        super(matrixrepr, x, y, color);
    }
}

export {S_Piece}