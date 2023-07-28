import {TetrisGame} from "./TetrisGame.js";

let canvas_height = Math.round((Math.max(window.innerWidth, window.innerHeight) * 0.4));
const tetris_canvas = document.getElementById("tetriscanvas");
let cell_width =  Math.floor(canvas_height / 20);
tetris_canvas.height = cell_width * 20;
tetris_canvas.width = cell_width * 10;
console.log("Canvas dim: " + tetris_canvas.height + "x" + tetris_canvas.width);



// TETRIS GAME
const ctx = document.getElementById("tetriscanvas").getContext("2d");
const scoreboard = document.getElementById("scorevalue");
let game = new TetrisGame(ctx, cell_width, scoreboard);
game.start();

let framecounter = 0;
function dropGamePiece(){
    if(framecounter >= 64){  // every 64 frames
        game.dropPiece();
        framecounter = 0;
    }
    framecounter++;
    window.requestAnimationFrame(dropGamePiece);
}

window.requestAnimationFrame(dropGamePiece);

/*
Add event listeners for the keystrokes
 */
document.onkeydown = function (e) {
    switch (e.key) {
        case 'ArrowUp':
            // do rotation
            break;
        case 'ArrowDown':
            game.moveDown();
            break;
        case 'ArrowLeft':
            game.moveLeft();
            break;
        case 'ArrowRight':
            game.moveRight();
    }
};