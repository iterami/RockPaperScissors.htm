'use strict';

function percent(value, max){
    return ((value / max) * 100).toFixed(7) + '%';
}

function play(selected){
    core_storage_save();

    // Check how many games player wants to play.
    if(core_storage_data['repeat'] < 1
      || Number.isNaN(core_storage_data['repeat'])){
        return;
    }

    // Keep track of results.
    let opponent_plays = [
      0,
      0,
      0,
    ];
    let results = [
      0,
      0,
      0,
    ];
    total += core_storage_data['repeat'];

    // Loop through the games.
    let loop_counter = core_storage_data['repeat'] - 1;
    do{
        // Result is a loss by default.
        let result = 0;

        // Generate a random number (0, 1, or 2).
        let opponent_choice_int = core_random_integer({
          'max': 3,
        });
        opponent_choice = [
          'rock',
          'paper',
          'scissors',
        ][opponent_choice_int];
        opponent_plays[opponent_choice_int] += 1;

        // Check for ties.
        if(selected === opponent_choice){
            result = 2;

        // Check for wins.
        }else if((selected === 'rock' && opponent_choice === 'scissors')
          || (selected === 'paper' && opponent_choice === 'rock')
          || (selected === 'scissors' && opponent_choice === 'paper')){
            result = 1;
        }

        // Update loss/tie/win values and store them in a temporary array.
        results[result] += 1;
    }while(loop_counter--);

    losses += results[0];
    ties += results[2];
    wins += results[1];

    // Create result strings.
    let paper = opponent_plays[1] + ' papers (';
    let rock = opponent_plays[0] + ' rocks (';
    let scissors = opponent_plays[2] + ' scissors (';

    if(selected === 'rock'){
        paper += 'losses) ' + percent(results[0], core_storage_data['repeat']);
        rock += 'ties) ' + percent(results[2], core_storage_data['repeat']);
        scissors += 'wins) ' + percent(results[1], core_storage_data['repeat']);

    }else if(selected === 'paper'){
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
      + selected
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
