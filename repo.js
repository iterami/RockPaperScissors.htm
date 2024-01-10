'use strict';

function percent(value, max){
    return core_number_format({
      'number': core_round({
        'number': (value / max) * 100,
      }),
    }) + '%';
}

function play(selected){
    core_storage_save([
      'repeat',
    ]);

    if(core_storage_data['repeat'] < 1
      || Number.isNaN(core_storage_data['repeat'])){
        return;
    }

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

    let loop_counter = core_storage_data['repeat'] - 1;
    do{
        let result = 0;
        const opponent_choice_int = core_random_integer({
          'max': 3,
        });
        opponent_choice = [
          'rock',
          'paper',
          'scissors',
        ][opponent_choice_int];
        opponent_plays[opponent_choice_int] += 1;

        if(selected === opponent_choice){
            result = 2;

        }else if((selected === 'rock' && opponent_choice === 'scissors')
          || (selected === 'paper' && opponent_choice === 'rock')
          || (selected === 'scissors' && opponent_choice === 'paper')){
            result = 1;
        }

        results[result] += 1;
    }while(loop_counter--);

    losses += results[0];
    ties += results[2];
    wins += results[1];

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

function repo_init(){
    core_repo_init({
      'events': {
        'paper': {
          'onclick': function(){
              play('paper');
          },
        },
        'rock': {
          'onclick': function(){
              play('rock');
          },
        },
        'scissors': {
          'onclick': function(){
              play('scissors');
          },
        },
      },
      'globals': {
        'losses': 0,
        'opponent_choice': 0,
        'ties': 0,
        'total': 0,
        'wins': 0,
      },
      'keybinds': {
        'Digit1': {
          'todo': function(){
              play('rock');
          },
        },
        'Digit2': {
          'todo': function(){
              play('paper');
          },
        },
        'Digit3': {
          'todo': function(){
              play('scissors');
          },
        },
      },
      'storage': {
        'repeat': 1,
      },
      'storage-menu': '<table><tr><td><input class=mini id=repeat min=1 step=any type=number><td>Repeat</table>',
      'title': 'RockPaperScissors.htm',
    });
}
