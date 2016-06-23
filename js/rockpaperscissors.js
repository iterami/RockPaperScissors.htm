'use strict';

function percent(value, max){
    return ((value / max) * 100).toFixed(2) + '%';
}

function play(selected){
    // Fetch how many games player wants to play.
    var repeat = parseInt(
      document.getElementById('repeat').value,
      10
    );
    total += repeat;

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
        // Result is a loss by default.
        var result = 0;

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
        }

        // Update loss/tie/win values and store them in a temporary array.
        results[result] += 1;
    }while(loop_counter--);

    losses += results[0];
    ties += results[2];
    wins += results[1];

    // Create result strings.
    var paper = '<b>' + opponent_plays[1] + '</b> papers (';
    var rock = '<b>' + opponent_plays[0] + '</b> rocks (';
    var scissors = '<b>' + opponent_plays[2] + '</b> scissors (';

    if(selected === 0){
        paper += 'losses) ' + percent(results[0], repeat);
        rock += 'ties) ' + percent(results[2], repeat);
        scissors += 'wins) ' + percent(results[1], repeat);

    }else if(selected === 1){
        paper += 'ties) ' + percent(results[2], repeat);
        rock += 'wins) ' + percent(results[1], repeat);
        scissors += 'losses) ' + percent(results[0], repeat);

    }else{
        paper += 'wins) ' + percent(results[1], repeat);
        rock += 'losses) ' + percent(results[0], repeat);
        scissors += 'ties) ' + percent(results[2], repeat);
    }

    // Display game information.
    document.getElementById('opponent').innerHTML = 'You played '
      + ['rock', 'paper', 'scissors',][selected]
      + ' <b>' + repeat + '</b> times.<br>'
      + 'Your opponent played:<br>'
        + rock + '<br>'
        + paper + '<br>'
        + scissors;
    document.getElementById('player').innerHTML =
      '<b>' + losses + '</b> losses (' + percent(losses, total) + ')<br>'
        + '<b>' + ties + '</b> ties (' + percent(ties, total) + ')<br>'
        + '<b>' + wins + '</b> wins (' + percent(wins, total) + ')';
}

function reset(){
    if(!window.confirm('Reset scores?')){
        return;
    }

    document.getElementById('opponent').innerHTML = '';
    document.getElementById('player').innerHTML = '';

    losses = 0;
    ties = 0;
    total = 0;
    wins = 0;
}

var losses = 0;
var opponent_choice = 0;
var selected = 0;
var ties = 0;
var total = 0;
var wins = 0;

window.onload = function(e){
    init_input(
      {
        80: {
          'todo': function(){
              play(1);
          },
        },
        82: {
          'todo': function(){
              play(0);
          },
        },
        83: {
          'todo': function(){
              play(2);
          },
        },
      }
    );
};
