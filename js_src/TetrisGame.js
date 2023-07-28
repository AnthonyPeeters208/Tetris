import {I_Piece} from "./I_Piece.js";
import {J_Piece} from "./J_Piece.js";
import {L_Piece} from "./L_Piece.js";
import {O_Piece} from "./O_Piece.js";
import {S_Piece} from "./S_Piece.js";
import {Z_Piece} from "./Z_Piece.js";
import {T_Piece} from "./T_Piece.js";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

class TetrisGame{
    constructor() {
        let matrix_map = []
        for(let h=-2; h<20; h++){
            let row = []
            for(let w=0; w<10; w++){
                row.push(0);
            }
            matrix_map.push(row);
        }

        this.game_matrix = matrix_map;
        this.score = 0;
        this.piece_collection = [I_Piece, J_Piece, L_Piece, O_Piece, S_Piece, Z_Piece, T_Piece];
        this.curr_sequence = [];
        this.curr_piece = null;
    }

    addNewSequence(){
        // permute piece collection
        const pieces_copy = this.piece_collection.map((x) => x);
        while(pieces_copy.length > 0){
            let r = getRandomInt(pieces_copy.length);
            let item = pieces_copy.splice(r, 1)[0];
            this.curr_sequence.push(item);
        }
    }

    start(){
        this.curr_piece = getNextPiece();
    }
}

export {TetrisGame}