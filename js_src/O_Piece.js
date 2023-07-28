import {TetrisPiece} from "./TetrisPiece.js";

class O_Piece extends TetrisPiece{
    constructor(x, y) {
        let matrixrepr = [
            [1,1],
            [1,1]
        ]
        let color = "yellow";
        super(matrixrepr, x, y, color);
    }
}

export {O_Piece}