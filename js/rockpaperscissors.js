'use strict';

function play(selected){
    // Fetch how many games player wants to play.
    repeat = parseInt(document.getElementById('repeat').value);

    if(repeat < 1){
        return;
    }

    // Keep track of results.
    var opponent_plays = [
      0,
      0,
      0,
    ];
    var results = [
      0,
      0,
      0,
    ];

    // Loop through the games.
    var loop_counter = repeat - 1;
    do{
        // Generate a random number (0, 1, or 2).
        opponent_choice = Math.floor(Math.random() * 3);
        opponent_plays[opponent_choice] += 1;

        // Determine the result of the game.
        if(selected === opponent_choice){
            // Result is a tie.
            result = 2;

        }else if((selected === 0 && opponent_choice === 2)
          || (selected === 1 && opponent_choice === 0)
          || (selected === 2 && opponent_choice === 1)){
            // Result is a win.
            result = 1;

        }else{
            // Result is a loss.
            result = 0;
        }

        // Update loss/tie/win values and store them in a temporary array.
        results[result] += 1;
    }while(loop_counter--);

    // Update losses innerHTML.
    document.getElementById('losses').innerHTML =
      parseInt(document.getElementById('losses').innerHTML)
      + results[0];

    // Update ties innerHTML.
    document.getElementById('ties').innerHTML =
      parseInt(document.getElementById('ties').innerHTML)
      + results[2];

    // Update wins innerHTML.
    document.getElementById('wins').innerHTML =
      parseInt(document.getElementById('wins').innerHTML)
      + results[1];

    // Create result strings.
    var paper = '<b>' + opponent_plays[1] + '</b> papers (';
    var rock = '<b>' + opponent_plays[0] + '</b> rocks (';
    var scissors = '<b>' + opponent_plays[2] + '</b> scissors (';

    if(selected === 0){
        paper += results[0] + ' losses)';
        rock += results[2] + ' ties)';
        scissors += results[1] + ' wins)';

    }else if(selected === 1){
        paper += results[2] + ' ties)';
        rock += results[1] + ' wins)';
        scissors += results[0] + ' losses)';

    }else{
        paper += results[1] + ' wins)';
        rock += results[0] + ' losses)';
        scissors += results[2] + ' ties)';
    }

    // display game information, limiting information for multiple games played
    document.getElementById('result').innerHTML = 'You played '
      + ['rock', 'paper', 'scissors',][selected]
      + ' <b>' + repeat + '</b> times.<br>'
      + 'Your opponent played:<ul>'
        + '<li>' + rock
        + '<li>' + paper
        + '<li>' + scissors
      + '</ul>';
}

function reset(){
    if(!window.confirm('Reset scores?')){
        return;
    }

    var ids = {
      'losses': 0,
      'result': '',
      'ties': 0,
      'wins': 0,
    };
    for(var id in ids){
        document.getElementById(id).innerHTML = ids[id];
    }
}

var opponent_choice = 0;
var repeat = 0;
var result = 0;
var selected = 0;

window.onkeydown = function(e){
    var key = e.keyCode || e.which;

    // R: play rock.
    if(key === 82){
        play(0);

    // P: play paper.
    }else if(key === 80){
        play(1);

    // S: play scissors.
    }else if(key === 83){
        play(2);
    }
};
