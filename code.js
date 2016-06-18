$(document).ready(function()
{
    var canvas = document.getElementById('game');
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.arc(240, 240, 180, 0.0, 2.0 * Math.PI, false);
    ctx.fill();

    function draw_alien()
    {
        ctx.clearRect(0, 0, 480, 480);
        ctx.fillStyle = 'blue';

        ctx.beginPath();
        ctx.arc(240, 110, 80, 0.0, 2.0 * Math.PI, false);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(240, 300, 150, 0.0, 2.0 * Math.PI, false);
        ctx.fill();
    }

    $('#hatch').click(draw_alien);
});
