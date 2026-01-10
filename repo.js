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

    const repeat = Math.floor(core_storage_data.repeat);
    if(repeat < 1
      || globalThis.isNaN(repeat)){
        return;
    }

    const opponent_plays = [0, 0, 0,];
    const results = [0, 0, 0,];
    total += repeat;

    let loop_counter = repeat - 1;
    do{
        let result = 0;
        const opponent_choice_int = core_random_integer(3);
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
      'number': opponent_plays[1],
    }) + ' papers<td>';
    let rock = core_number_format({
      'number': opponent_plays[0],
    }) + ' rocks<td>';
    let scissors = core_number_format({
      'number': opponent_plays[2],
    }) + ' scissors<td>';

    if(selected === 'rock'){
        paper += 'losses<td>' + percent(results[0], repeat);
        rock += 'ties<td>' + percent(results[2], repeat);
        scissors += 'wins<td>' + percent(results[1], repeat);

    }else if(selected === 'paper'){
        paper += 'ties<td>' + percent(results[2], repeat);
        rock += 'wins<td>' + percent(results[1], repeat);
        scissors += 'losses<td>' + percent(results[0], repeat);

    }else{
        paper += 'wins<td>' + percent(results[1], repeat);
        rock += 'losses<td>' + percent(results[0], repeat);
        scissors += 'ties<td>' + percent(results[2], repeat);
    }

    core_elements.results.innerHTML = 'You played '
      + selected
      + ' ' + core_number_format({
        'number': repeat,
      }) + ' times.<br>'
      + 'Your opponent played:<table><tr><td>' + rock
      + '<tr><td>' + paper
      + '<tr><td>' + scissors + '</table>'
      + core_number_format({
        'number': total,
      }) + ' total games played<table><tr><td>'
      + core_number_format({
        'number': losses,
      }) + ' losses<td>' + percent(losses, total) + '<tr><td>'
      + core_number_format({
        'number': ties,
      }) + ' ties<td>' + percent(ties, total) + '<tr><td>'
      + core_number_format({
        'number': wins,
      }) + ' wins<td>' + percent(wins, total) + '</table>';
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
          'down': function(){
              play('rock');
          },
        },
        'Digit2': {
          'down': function(){
              play('paper');
          },
        },
        'Digit3': {
          'down': function(){
              play('scissors');
          },
        },
      },
      'storage': {
        'repeat': 1,
      },
      'storage_menu': '<table><tr><td><input class=mini id=repeat min=1 step=1 type=number><td>Repeat</table>',
      'title': 'RockPaperScissors.htm',
      'ui_elements': [
        'results',
      ],
    });
}
