'use strict';

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

    document.getElementById('paper').onclick =
      document.getElementById('rock').onclick =
      document.getElementById('scissors').onclick = function(){
        play(this.id);
    };
}
