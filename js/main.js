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
}
