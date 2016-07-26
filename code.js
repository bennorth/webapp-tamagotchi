$(document).ready(function()
{
    var canvas = document.getElementById('game');
    var ctx = canvas.getContext('2d');

    var hungriness = 0;
    var health = 100;

    function alien_is_alive()
    {
        return (hungriness < 100);
    }

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

        draw_circle(240, 110, 80);
        draw_circle(240, 300, 150);
    }

    $('#hatch').click(draw_alien_fade_instructions);

    function fade_out_hatch_instructions()
    {
        $('#hatch-instructions').fadeOut(400, fade_in_playing_sections);
    }

    function fade_in_playing_sections()
    {
        $('#levels').fadeIn();
        $('#action-buttons').fadeIn();
    }

    function draw_alien_fade_instructions()
    {
        draw_alien();
        fade_out_hatch_instructions();
        window.setTimeout(time_goes_by, 2000);
    }

    function make_alien_hungrier()
    {
        hungriness += 5;
        $('#hungriness').html(hungriness);
    }

    function feed_alien(hungriness_reduction)
    {
        hungriness -= hungriness_reduction;
        if (hungriness < 0)
        {
            hungriness = 0;
        }

        $('#hungriness').html(hungriness);
    }

    function temporarily_disable(button_id)
    {
        $(button_id).attr('disabled', true);
        window.setTimeout(
            function() { $(button_id).attr('disabled', false); },
            3000);
    }

    function feed_alien_some_bread()
    {
        feed_alien(20);
        temporarily_disable('#feed-bread');
    }

    $('#feed-bread').click(feed_alien_some_bread);

    function feed_alien_sweets()
    {
        feed_alien(10);
        temporarily_disable('#feed-sweets');

        // Sweets are not healthy:
        health -= 5;
        $('#health').html(health);

        // TODO: Make the alien die if all health gone.
    }

    $('#feed-sweets').click(feed_alien_sweets);

    function game_over_lost()
    {
        $('#messages').html('Oh no!  Your Tamagotchi died!');
    }

    function time_goes_by()
    {
        make_alien_hungrier();

        if (alien_is_alive())
        {
            window.setTimeout(time_goes_by, 2000);
        }
        else
        {
            game_over_lost();
        }
    }
});
