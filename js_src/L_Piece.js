import {TetrisPiece} from "./TetrisPiece.js";

class L_Piece extends TetrisPiece{
    constructor(x, y) {
        let matrixrepr = [
            [0,0,1],
            [1,1,1],
            [0,0,0]
        ]
        let color = "orange";
        super(matrixrepr, x, y);
    }
}

export {L_Piece}