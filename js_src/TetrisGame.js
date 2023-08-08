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
    constructor(ctx, cell_width, scoreboard, previewctx) {
        // ctx: canvas contex 2d
        // cell_width: width of a single cell in pixels
        // previewctx: 2d context of preview canvas
        this.ctx = ctx;
        this.cell_width = cell_width;
        this.game_height = 20;
        this.game_width = 10;
        this.scoreboard = scoreboard;
        this.nextpiecepreview = previewctx;

        let matrix_map = []
        for(let h=-2; h<this.game_height; h++){
            let row = []
            for(let w=0; w<this.game_width; w++){
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

    updateScore(){
        this.scoreboard.innerHTML = this.score;
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
        let cp = this.curr_piece;
        for(let i=0; i<cp.matrix_rep.length; i++){
            for(let j=0; j<cp.matrix_rep[0].length; j++){
                let true_x = cp.x+j;    // x coord in the game matrix
                let true_y = cp.y+i;
                if(cp.matrix_rep[i][j] !== 0){
                    // check if actual part of the piece is out of bounds
                    if(true_x < 0 || true_x >= this.game_width){
                        console.log("out of x bounds");
                        return false;
                    }
                    if(true_y >= this.game_height){
                        console.log("out of y bounds");
                        return false;
                    }
                    if(true_y > 0){ // consider starting pieces
                        // check if piece collides with piece in matrix
                        if(this.game_matrix[true_y][true_x] !== 0){
                            console.log("collision with other piece");
                            return false; // there is a piece already here
                        }
                    }
                }
            }
        }
        return true;
    }

    drawPieces(){
        // draw pieces placed in the game
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
        // draw current piece
        for(let i=0; i<this.curr_piece.matrix_rep.length; i++){
            for(let j=0; j<this.curr_piece.matrix_rep[0].length; j++){
                if(this.curr_piece.matrix_rep[i][j] !== 0){
                    let xval = (this.curr_piece.x + j)*cw;
                    let yval = (this.curr_piece.y + i)*cw;
                    this.ctx.fillStyle = this.curr_piece.color;
                    this.ctx.fillRect(xval+1, yval+1, cw-2, cw-2);
                }
            }
        }
        // update score
        this.updateScore();
    }

    drawPreview(){
        // Draws the piece in the preview canvas
        let nextpiecetype = this.peekNextPiece();
        let nextpiece = new nextpiecetype(0, 0);    // temporarily make new piece
        let cw = this.cell_width/2;
        let piecedim = nextpiece.matrix_rep.length;
        for(let i=0; i < 2; i++){
            for(let j=0; j < 4; j++){
                // draw grid regardless
                this.nextpiecepreview.fillStyle = "#1b1b1b"
                this.nextpiecepreview.fillRect(j*cw+1, i*cw+1, cw-2, cw-2);
                if(i < piecedim && j < piecedim ){
                    if(nextpiece.matrix_rep[i][j] !== 0){
                        let xval = j*cw;
                        let yval = i*cw;
                        // color blocks
                        this.nextpiecepreview.fillStyle = nextpiece.color;
                        this.nextpiecepreview.fillRect(xval+1, yval+1, cw-2, cw-2);
                    }
                }

            }
        }

    }

    moveDown(){
        let old_y = this.curr_piece.y;
        this.curr_piece.y = old_y+1;
        let isValid = this.isValidMove();

        // if not valid move, put it back to old position
        if(!isValid){
            this.curr_piece.y = old_y;
        }
        this.drawPieces();
        return isValid;
    }
    moveHorizontal(modifier){
        // move left (-1) or right (+1)
        let old_x = this.curr_piece.x;
        this.curr_piece.x = old_x + modifier;

        if(!this.isValidMove()){
            this.curr_piece.x = old_x
        }
        this.drawPieces();
    }
    moveLeft(){
        this.moveHorizontal(-1);
    }
    moveRight(){
        this.moveHorizontal(+1);
    }

    moveDownWouldFail(){
        // Checks whether moving down would fail
        let old_y = this.curr_piece.y;
        this.curr_piece.y = old_y+1;
        let isValid = this.isValidMove();
        this.curr_piece.y = old_y;

        if(!isValid){ return true;} // failed
        return false;   // moving down would not fail
    }

    placeCurrPiece(){
        // TODO: check if piece allowed to be placed -> beforehand!
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

    rotateCurrPiece(){
        this.curr_piece.rotate();
        if(!this.isValidMove()){
            for(let i=0;i<3;i++){this.curr_piece.rotate()}
        }
        this.drawPieces();
    }

    increaseScore(amount){
        this.score += amount;
    }

    clearOneLine(index){
        // Clear a specific line at index i
        for(let i=index; i>=0; i--){
            for(let j=0; j<this.game_width; j++){
                if(i===0){
                    this.game_matrix[i][j] = 0; // empty first row
                }
                else{
                    // take the block from cell above
                    this.game_matrix[i][j] = this.game_matrix[i-1][j];
                }
            }
        }
    }

    clearLines(){
        // go over everything reverse order
        for(let i=(this.game_height-1); i>=0; i--){
            let row_full = true;
            for(let j=0; j<this.game_width; j++){
                if(this.game_matrix[i][j] === 0){
                    row_full = false;
                }
            }

            if(row_full){
                this.clearOneLine(i);
                this.increaseScore(100);    // increase with 100 points
                return this.clearLines();   // recursively remove all lines
            }
        }
        this.drawPieces();
    }




    dropPiece(){
        this.moveDown();
        this.drawPieces();
        if(this.moveDownWouldFail()){
            // lock in the block and get next one
            this.placeCurrPiece();
            this.getNextPiece();
            this.drawPieces();
            this.drawPreview(); // refresh the preview
        }
    }


    start(){
        this.addNewSequence();
        this.getNextPiece();
        this.drawPieces();
        this.drawPreview();
    }



}

export {TetrisGame}