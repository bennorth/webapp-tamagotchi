$(document).ready(function()
{
    var canvas = document.getElementById('game');
    var ctx = canvas.getContext('2d');

    var age = 0;
    var health = 100;
    var hungriness = 0;
    var last_played_with = 0;
    var bored = false;

    function alien_is_alive()
    {
        return (hungriness < 100) && (health > 0);
    }

    function alien_still_growing()
    {
        return (age < 100);
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
        if (health >= 50)
        {
            ctx.fillStyle = 'blue';
        }
        else
        {
            ctx.fillStyle = 'rgb(0, 255, 200)';
        }

        draw_circle(240, 110, 80);
        draw_circle(240, 300, 150);

        if (alien_is_alive())
        {
            ctx.fillStyle = 'black';
            draw_circle(210, 90, 10);
            draw_circle(270, 90, 10);

            ctx.lineWidth = 5.0;
            ctx.beginPath();
            if (bored)
            {
                ctx.moveTo(200, 140);
                ctx.lineTo(280, 140);
            }
            else
            {
                ctx.moveTo(200, 130);
                ctx.lineTo(220, 150);
                ctx.lineTo(260, 150);
                ctx.lineTo(280, 130);
            }
            ctx.stroke();
        }
        else
        {
            ctx.lineWidth = 2.0;

            ctx.beginPath();
            ctx.moveTo(200, 80);
            ctx.lineTo(220, 100);
            ctx.moveTo(220, 80);
            ctx.lineTo(200, 100);
            ctx.moveTo(260, 80);
            ctx.lineTo(280, 100);
            ctx.moveTo(280, 80);
            ctx.lineTo(260, 100);

            ctx.moveTo(200, 140);
            ctx.lineTo(280, 140);
            ctx.stroke();
        }
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
        $('#hungriness').html('Hungriness: ' + hungriness);

        // If it gets too hungry, it starts losing health too.
        if (hungriness > 50)
        {
            make_sicker(5);
        }
    }

    function make_sicker(health_lost)
    {
        health -= health_lost;
        if (health < 0)
        {
            health = 0;
        }

        $('#health').html('Health: ' + health);

        draw_alien();

        if ( ! alien_is_alive())
        {
            game_over_lost();
        }
    }

    function make_healthier(health_gained)
    {
        health += health_gained;
        if (health > 100)
        {
            health = 100;
        }

        $('#health').html('Health: ' + health);

        draw_alien();
    }

    function maybe_make_alien_sicker()
    {
        if (Math.random() < 0.1)
        {
            make_sicker(40);
        }
    }

    function make_alien_older()
    {
        age += 1;
        $('#age').html('Age: ' + age + ' hours');
    }

    function maybe_make_alien_bored()
    {
        // TODO: Make bored if too long has gone by without a game.
    }

    function enable_bread_button()
    {
        $('#feed-bread').attr('disabled', false);
    }

    function feed_alien_some_bread()
    {
        hungriness -= 20;
        if (hungriness < 0)
        {
            hungriness = 0;
        }

        $('#hungriness').html('Hungriness: ' + hungriness);

        // The player can't immediately give more bread
        $('#feed-bread').attr('disabled', true);
        //
        // but after a few seconds have gone by, they can.
        window.setTimeout(enable_bread_button, 3000);
    }

    $('#feed-bread').click(feed_alien_some_bread);

    function enable_sweets_button()
    {
        $('#feed-sweets').attr('disabled', false);
    }

    function feed_alien_sweets()
    {
        hungriness -= 10;
        if (hungriness < 0)
        {
            hungriness = 0;
        }

        $('#hungriness').html('Hungriness: ' + hungriness);

        // But sweets are not healthy:
        make_sicker(5);

        if (alien_is_alive())
        {
            // The player can't immediately give more sweets
            $('#feed-sweets').attr('disabled', true);
            //
            // but after a few seconds have gone by, they can.
            window.setTimeout(enable_sweets_button, 200);
        }
    }

    $('#feed-sweets').click(feed_alien_sweets);

    function enable_medicine_button()
    {
        $('#give-medicine').attr('disabled', false);
    }

    function give_alien_medicine()
    {
        make_healthier(40);
        $('#give-medicine').attr('disabled', true);
        window.setTimeout(enable_medicine_button, 5000);
    }

    $('#give-medicine').click(give_alien_medicine);

    function game_over_lost()
    {
        $('#messages').html('Oh no!  Your Tamagotchi died!');
    }

    function game_over_won()
    {
        $('#messages').html('Well done!'
                            + '  Your Tamagotchi reached the ripe old age'
                            + ' of 100 hours!');
    }

    function time_goes_by()
    {
        make_alien_hungrier();
        maybe_make_alien_sicker();
        make_alien_older();

        if (alien_is_alive() && alien_still_growing())
        {
            window.setTimeout(time_goes_by, 2000);
        }
        else if (alien_is_alive())
        {
            game_over_won();
        }
        else
        {
            game_over_lost();
        }
    }
});
