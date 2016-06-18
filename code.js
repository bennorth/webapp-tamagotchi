$(document).ready(function()
{
    var canvas = document.getElementById('game');
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.arc(240, 240, 180, 0.0, 2.0 * Math.PI, false);
    ctx.fill();
});
