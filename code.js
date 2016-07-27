$(document).ready(function()
{
    var canvas = document.getElementById('game');
    var ctx = canvas.getContext('2d');

    var hungriness = 0;
    var health = 100;
    var happiness = 100;
    var bored = false;
    var last_game_age = 0;
    var age = 0;

    function alien_is_alive()
    {
        return (hungriness < 100) && (health > 0) && (happiness > 0);
    }

    function alien_still_growing()
    {
        return (age < 100);
    }

    function game_is_running()
    {
        return alien_is_alive() && alien_still_growing();
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

        ctx.fillStyle = 'black';
        draw_circle(210, 90, 10);
        draw_circle(270, 90, 10);

        ctx.lineWidth = 5.0;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(200, 130);
        ctx.lineTo(220, 150);
        ctx.lineTo(260, 150);
        ctx.lineTo(280, 130);
        ctx.stroke();
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

    function make_alien_sicker(health_lost)
    {
        health -= health_lost;
        if (health < 0)
        {
            health = 0;
        }

        $('#health').html(health);
        draw_alien();

        if ( ! alien_is_alive())
        {
            game_over_lost();
        }
    }

    function maybe_make_alien_sicker()
    {
        if (Math.random() < 0.1)
        {
            make_alien_sicker(40);
        }
    }

    function make_healthier()
    {
        health += 40;
        if (health > 100)
        {
            health = 100;
        }

        $('#health').html(health);
        draw_alien();
    }

    function make_alien_older()
    {
        age += 1;
        $('#age').html(age);
    }

    function update_alien_happiness()
    {
        bored = ((age - last_game_age) >= 3);

        if (bored)
        {
            happiness -= 5;
            if (happiness < 0) happiness = 0;
        }
        else
        {
            happiness += 2;
            if (happiness > 100) happiness = 100;
        }

        $('#happiness').html(happiness);
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
        if ( ! game_is_running())
            return;

        feed_alien(20);
        temporarily_disable('#feed-bread');
    }

    $('#feed-bread').click(feed_alien_some_bread);

    function feed_alien_sweets()
    {
        if ( ! game_is_running())
            return;

        feed_alien(10);
        temporarily_disable('#feed-sweets');

        // Sweets are not healthy:
        make_alien_sicker(5);
    }

    $('#feed-sweets').click(feed_alien_sweets);

    function give_alien_medicine()
    {
        if ( ! game_is_running())
            return;

        make_healthier();
        temporarily_disable('#give-medicine');
    }

    $('#give-medicine').click(give_alien_medicine);

    function play_game()
    {
        if ( ! game_is_running())
            return;

        last_game_age = age;
        temporarily_disable('#play-game');
    }

    $('#play-game').click(play_game);

    function game_over_lost()
    {
        $('#messages').html('Oh no!  Your Tamagotchi died!');
    }

    function game_over_won()
    {
        $('#messages').html('Well done!  Your Tamagotchi reached old age!');
    }

    function time_goes_by()
    {
        if ( ! game_is_running())
            return;

        make_alien_hungrier();
        maybe_make_alien_sicker();
        make_alien_older();
        update_alien_happiness();

        if ( ! alien_still_growing())
        {
            game_over_won();
        }
        else if ( ! alien_is_alive())
        {
            game_over_lost();
        }
        else
        {
            window.setTimeout(time_goes_by, 2000);
        }
    }
});
