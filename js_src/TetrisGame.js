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
    constructor(ctx, cell_width) {
        // ctx: canvas contex 2d
        // cell_width: width of a single cell in pixels
        this.ctx = ctx;
        this.cell_width = cell_width;

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

    peekNextPiece(){
        return this.curr_sequence[0];
    }

    getNextPiece(){
        // puts next piece at curr piece, "pops" from array
        let piecetype = this.curr_sequence.shift();
        this.curr_piece = new piecetype(3, -2);    // x=3 and y=-2
        if(this.curr_sequence.length <= 1){
            this.addNewSequence();
        }
    }

    isValidMove(){
        //TODO
        return true;
    }

    moveDown(){
        let old_y = this.curr_piece.y;
        this.curr_piece.y = old_y+1;

        // if not valid move, put it back to old position
        if(!this.isValidMove()){
            this.curr_piece.y = old_y;
        }
    }

    placeCurrPiece(){
        // TODO: check if piece allowed to be placed
        let piecematrix = this.curr_piece.matrix_rep;
        for(let i=0; i<piecematrix.length; i++){
            for(let j=0; j<piecematrix[0].length; j++){
                if(piecematrix[i][j] === 1){
                    let game_x = this.curr_piece.x + j;
                    let game_y = this.curr_piece.y + i;
                    // set the color of the piece in the matrix
                    this.game_matrix[game_y][game_x] = this.curr_piece.color;
                }
            }
        }
    }

    drawPieces(){
        // draw pieces using canvas context
        // cell width in pixels
        let cw = this.cell_width;
        for(let i=0; i<this.game_matrix.length; i++){
            for(let j=0; j<this.game_matrix[0].length; j++){
                // draw grid regardless
                this.ctx.fillStyle = "#1b1b1b"
                this.ctx.fillRect(j*cw+1, i*cw+1, cw-2, cw-2);

                if(this.game_matrix[i][j] !== 0){
                    let xval = j*cw;
                    let yval = i*cw;
                    // color blocks
                    this.ctx.fillStyle = this.game_matrix[i][j];
                    this.ctx.fillRect(xval+1, yval+1, cw-2, cw-2);
                }
            }
        }
    }

    dropPiece(){
        this.moveDown();
        this.placeCurrPiece();
        this.drawPieces();
        window.requestAnimationFrame(this.dropPiece);
    }

    start(){
        this.addNewSequence();
        this.getNextPiece();
        this.moveDown();
        this.moveDown();
        this.placeCurrPiece();
        this.drawPieces()
        window.requestAnimationFrame(this.dropPiece);

    }



}

export {TetrisGame}