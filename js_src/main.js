import {TetrisGame} from "./TetrisGame.js";

//let canvas_height = Math.round((Math.max(window.innerWidth, window.innerHeight) * 0.4));
let canvas_height = window.innerHeight * 0.8;
const tetris_canvas = document.getElementById("tetriscanvas");
let cell_width =  Math.floor(canvas_height / 20);
tetris_canvas.height = cell_width * 20;
tetris_canvas.width = cell_width * 10;
console.log("Canvas dim: " + tetris_canvas.height + "x" + tetris_canvas.width);

const previewcanvas = document.getElementById("nextpiecepreview");  // 4x4 matrix
previewcanvas.height = cell_width;
previewcanvas.width = cell_width * 2;

// TETRIS GAME
const ctx = document.getElementById("tetriscanvas").getContext("2d");
const scoreboard = document.getElementById("scorevalue");
const previewctx = document.getElementById("nextpiecepreview").getContext("2d");
let game = new TetrisGame(ctx, cell_width, scoreboard, previewctx);
game.start();





let base_framerate = 64;
function isMobileDevice(){
    if(window.innerHeight > window.innerWidth){
        return true;
    }
    else{
        return false;
    }
}
if(isMobileDevice()){
    base_framerate = 32;
}

let framecounter = 0;
function dropGamePiece(){
    if(framecounter >= base_framerate){  // every 64 frames
        game.dropPiece();
        game.clearLines();
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
    game.clearLines();
    switch (e.key) {
        case 'ArrowUp':
            game.rotateCurrPiece();
            break;
        case 'ArrowDown':
            let success = game.moveDown();
            if(success){
                game.increaseScore(1);
            }
            break;
        case 'ArrowLeft':
            game.moveLeft();
            break;
        case 'ArrowRight':
            game.moveRight();
    }
};

/*
Add listeners for swipe
 */
let touchstartX = 0
let touchstartY = 0
let touchendX = 0
let touchendY = 0

function checkDirection() {
    game.clearLines();
    if( Math.abs(touchendX - touchstartX) > Math.abs(touchendY - touchstartY)){
        // Horizontal swipe
        if (touchendX < touchstartX){
            game.moveLeft();
        }
        if (touchendX > touchstartX){
            game.moveRight();
        }
    }
    else{
        // vertical swipe
        if (touchendY < touchstartY) {
            game.rotateCurrPiece(); // move 'up'
        }
        if (touchendY > touchstartY) {
            let success = game.moveDown();
            if(success){
                game.increaseScore(1);
            }
        }
    }
}

document.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX
    touchstartY = e.changedTouches[0].screenY
});

document.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    touchendY = e.changedTouches[0].screenY;
    checkDirection();
});