'use strict';

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
        49: {
          'todo': function(){
              play('rock');
          },
        },
        50: {
          'todo': function(){
              play('paper');
          },
        },
        51: {
          'todo': function(){
              play('scissors');
          },
        },
      },
      'storage': {
        'repeat': 1,
      },
      'storage-menu': '<table><tr><td><input id=repeat min=1 type=number><td>Repeat</table>',
      'title': 'RockPaperScissors.htm',
    });
}
