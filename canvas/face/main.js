/* 
 * @Author: haoyang.li
 * @Date:   2015-03-06 15:28:24
 * @Last Modified by:   haoyang.li
 * @Last Modified time: 2015-03-07 20:19:17
 */
var mycanvas = document.getElementById("myCanvasTag");
var mycontext = mycanvas.getContext('2d');

//draw face
mycontext.beginPath();
mycontext.arc(200, 250, 200, 0, Math.PI * 2, true);
mycontext.closePath();
mycontext.fillStyle = 'rgba(255,0,0,0.3)';
mycontext.fill();

//draw left eye
mycontext.beginPath();
mycontext.arc(120, 150, 30, 0, Math.PI * 2, true);
mycontext.closePath();
mycontext.fillStyle = '#ff00ff';
mycontext.fill();

//draw left pupil
mycontext.beginPath();
mycontext.arc(120, 150, 10, 0, Math.PI * 2, true);
mycontext.closePath();
mycontext.fillStyle = '#000';
mycontext.fill();

//draw left eyelid
mycontext.beginPath();
mycontext.arc(120, 150, 30, 0, Math.PI, true);
mycontext.closePath();
mycontext.fillStyle = '#f00';
mycontext.fill();

//draw left eyelashes
mycontext.strokeStyle = '#000';
lashes(mycontext, 98, 170, 93, 185);
lashes(mycontext, 108, 177, 104, 193);
lashes(mycontext, 120, 180, 120, 195);
lashes(mycontext, 132, 177, 136, 193);
lashes(mycontext, 142, 170, 147, 185);
mycontext.stroke();

openeye();

//draw right eyelashes
mycontext.strokeStyle = '#000';
lashes(mycontext, 258, 170, 253, 185);
lashes(mycontext, 268, 177, 264, 193);
lashes(mycontext, 280, 180, 280, 195);
lashes(mycontext, 292, 177, 296, 193);
lashes(mycontext, 302, 170, 307, 185);
mycontext.stroke();

//draw nose
mycontext.beginPath();
mycontext.arc(200, 250, 20, 0, Math.PI * 2, true);
mycontext.closePath();
mycontext.strokeStyle = '#ff00ff';
mycontext.stroke();

// draw smile
mycontext.beginPath();
mycontext.lineWidth = 10;
mycontext.moveTo(80, 320);
mycontext.bezierCurveTo(140, 320, 340, 320, 300, 360);
mycontext.closePath();
mycontext.strokeStyle = '#f00';
mycontext.stroke();


function lashes(cntx, x1, y1, x2, y2) {
    cntx.moveTo(x1, y1);
    cntx.lineTo(x2, y2);
}

function closeeye() {
    //close right eye
    var mycanvas = document.getElementById("myCanvasTag");
    var mycontext = mycanvas.getContext('2d');
    mycontext.beginPath();
    mycontext.arc(280, 150, 30, 0, Math.PI * 2, true);
    mycontext.closePath();
    mycontext.fillStyle = '#f00';
    mycontext.fill();
}

function openeye() {
    //open right eye
    var mycanvas = document.getElementById("myCanvasTag");
    var mycontext = mycanvas.getContext('2d');
    mycontext.beginPath();
    mycontext.arc(280, 150, 30, 0, Math.PI * 2, true);
    mycontext.closePath();
    mycontext.fillStyle = '#ff00ff';
    mycontext.fill();
    //draw right pupil
    mycontext.beginPath();
    mycontext.arc(280, 150, 10, 0, Math.PI * 2, true);
    mycontext.closePath();
    mycontext.fillStyle = '#000';
    mycontext.fill();
    //draw right eyelid
    mycontext.beginPath();
    mycontext.arc(280, 150, 30, 0, Math.PI, true);
    mycontext.closePath();
    mycontext.fillStyle = '#f00';
    mycontext.fill();
}