'use strict';

function repo_init(){
    core_repo_init({
      'info-events': {
        'paper': {
          'todo': function(){
              play('paper');
          },
        },
        'rock': {
          'todo': function(){
              play('rock');
          },
        },
        'scissors': {
          'todo': function(){
              play('scissors');
          },
        },
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
