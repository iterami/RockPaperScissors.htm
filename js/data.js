'use strict';

function percent(value, max){
    return core_number_format({
      'number': core_round({
        'number': (value / max) * 100,
      }),
    }) + '%';
}

function play(selected){
    core_storage_save();

    // Check how many games player wants to play.
    if(core_storage_data['repeat'] < 1
      || globalThis.isNaN(core_storage_data['repeat'])){
        return;
    }

    // Keep track of results.
    const opponent_plays = [
      0,
      0,
      0,
    ];
    const results = [
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
        const opponent_choice_int = core_random_integer({
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
    let paper = core_number_format({
      'decimals-min': 0,
      'number': opponent_plays[1],
    }) + ' papers (';
    let rock = core_number_format({
      'decimals-min': 0,
      'number': opponent_plays[0],
    }) + ' rocks (';
    let scissors = core_number_format({
      'decimals-min': 0,
      'number': opponent_plays[2],
    }) + ' scissors (';

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
    document.getElementById('results').innerHTML = 'You played '
      + selected
      + ' ' + core_number_format({
        'decimals-min': 0,
        'number': core_storage_data['repeat'],
      }) + ' times.<br>'
      + 'Your opponent played:<br>'
      + rock + '<br>'
      + paper + '<br>'
      + scissors + '<br>'
      + core_number_format({
        'decimals-min': 0,
        'number': total,
      }) + ' total games played<br>'
      + core_number_format({
        'decimals-min': 0,
        'number': losses,
      }) + ' losses (' + percent(losses, total) + ')<br>'
      + core_number_format({
        'decimals-min': 0,
        'number': ties,
      }) + ' ties (' + percent(ties, total) + ')<br>'
      + core_number_format({
        'decimals-min': 0,
        'number': wins,
      }) + ' wins (' + percent(wins, total) + ')';
}
