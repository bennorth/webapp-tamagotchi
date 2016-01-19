$(document).ready(function()
{
    var canvas = document.getElementById('game');
    var ctx = canvas.getContext('2d');

    function draw_circle(x, y, r)
    {
        ctx.beginPath();
        ctx.arc(x, y, r, 0.0, 2.0 * Math.PI, false);
        ctx.fill();
    }

    ctx.fillStyle = 'green';
    draw_circle(240, 240, 180);

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

    $('#hatch').click(draw_alien_fade_instructions);

    function fade_out_hatch_instructions()
    {
        $('#hatch-instructions').fadeOut();
    }

    function draw_alien_fade_instructions()
    {
        draw_alien();
        fade_out_hatch_instructions();
    }
});
