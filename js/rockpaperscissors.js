'use strict';

function percent(value, max){
    return ((value / max) * 100).toFixed(7) + '%';
}

function play(selected){
    core_storage_save();

    // Check how many games player wants to play.
    if(core_storage_data['repeat'] < 1
      || isNaN(core_storage_data['repeat'])){
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
    total += core_storage_data['repeat'];

    // Loop through the games.
    var loop_counter = core_storage_data['repeat'] - 1;
    do{
        // Result is a loss by default.
        var result = 0;

        // Generate a random number (0, 1, or 2).
        opponent_choice = core_random_integer({
          'max': 3,
        });
        opponent_plays[opponent_choice] += 1;

        // Check for ties.
        if(selected === opponent_choice){
            result = 2;

        // Check for wins.
        }else if((selected === 0 && opponent_choice === 2)
          || (selected === 1 && opponent_choice === 0)
          || (selected === 2 && opponent_choice === 1)){
            result = 1;
        }

        // Update loss/tie/win values and store them in a temporary array.
        results[result] += 1;
    }while(loop_counter--);

    losses += results[0];
    ties += results[2];
    wins += results[1];

    // Create result strings.
    var paper = opponent_plays[1] + ' papers (';
    var rock = opponent_plays[0] + ' rocks (';
    var scissors = opponent_plays[2] + ' scissors (';

    if(selected === 0){
        paper += 'losses) ' + percent(results[0], core_storage_data['repeat']);
        rock += 'ties) ' + percent(results[2], core_storage_data['repeat']);
        scissors += 'wins) ' + percent(results[1], core_storage_data['repeat']);

    }else if(selected === 1){
        paper += 'ties) ' + percent(results[2], core_storage_data['repeat']);
        rock += 'wins) ' + percent(results[1], core_storage_data['repeat']);
        scissors += 'losses) ' + percent(results[0], core_storage_data['repeat']);

    }else{
        paper += 'wins) ' + percent(results[1], core_storage_data['repeat']);
        rock += 'losses) ' + percent(results[0], core_storage_data['repeat']);
        scissors += 'ties) ' + percent(results[2], core_storage_data['repeat']);
    }

    // Display game information.
    document.getElementById('opponent').innerHTML = 'You played '
      + ['rock', 'paper', 'scissors',][selected]
      + ' ' + core_storage_data['repeat'] + ' times.<br>'
      + 'Your opponent played:<br>'
        + rock + '<br>'
        + paper + '<br>'
        + scissors;
    document.getElementById('player').innerHTML =
      total + ' total games played<br>'
        + losses + ' losses (' + percent(losses, total) + ')<br>'
        + ties + ' ties (' + percent(ties, total) + ')<br>'
        + wins + ' wins (' + percent(wins, total) + ')';
}

function repo_init(){
    core_repo_init({
      'keybinds': {
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
      },
      'storage': {
        'repeat': 1,
      },
      'storage-menu': '<table><tr><td><input id=repeat><td>Repeat</table>',
      'title': 'RockPaperScissors.htm',
    });

    core_storage_update();

    document.getElementById('paper').onclick = function(){
        play(1);
    };
    document.getElementById('rock').onclick = function(){
        play(0);
    };
    document.getElementById('scissors').onclick = function(){
        play(2);
    };
}

var losses = 0;
var opponent_choice = 0;
var selected = 0;
var ties = 0;
var total = 0;
var wins = 0;
