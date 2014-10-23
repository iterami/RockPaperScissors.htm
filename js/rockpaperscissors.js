function play(selected){
    // Fetch how many games player wants to play.
    repeat = parseInt(document.getElementById('repeat').value);

    if(repeat < 1){
        return;
    }

    var temp_increases = [
      0,
      0,
      0,
    ];

    // Loop through the games.
    var loop_counter = repeat - 1;
    do{
        // Generate a random number (0, 1, or 2).
        opponent_choice = Math.floor(Math.random() * 3);

        // Determine the result of the game.
        if(selected == opponent_choice){
            // Result is a tie.
            result = 2;

        }else if((selected == 0 && opponent_choice == 2)
          || (selected == 1 && opponent_choice == 0)
          || (selected == 2 && opponent_choice == 1)){
            // Result is a win.
            result = 1;

        }else{
            // Result is a loss.
            result = 0;
        }

        // Update loss/tie/win values and store them in a temporary array.
        temp_increases[result] += 1;
    }while(loop_counter--);

    // Update losses innerHTML.
    document.getElementById('losses').innerHTML =
      parseInt(document.getElementById('losses').innerHTML)
      + temp_increases[0];

    // Update ties innerHTML.
    document.getElementById('ties').innerHTML =
      parseInt(document.getElementById('ties').innerHTML)
      + temp_increases[2];

    // Update wins innerHTML.
    document.getElementById('wins').innerHTML =
      parseInt(document.getElementById('wins').innerHTML)
      + temp_increases[1];

    // display game information, limiting information for multiple games played
    document.getElementById('result').innerHTML = 'You played <b>'
      + ['rock', 'paper', 'scissors',][selected]
      + '</b> ' + repeat + ' times<br>'
      + 'Your opponent played <b>'
      + (repeat > 1
        ? 'lots of stuff'
        : ['rock', 'paper', 'scissors',][opponent_choice]
      )
      + '</b><br><b>'
      + (repeat > 1
        ? 'You probably won some of them!'
        : 'YOU ' + ['LOSE', 'WIN', 'TIE',][result] + '!</b>'
      );
}

function reset(){
    if(confirm('Reset scores?')){
        document.getElementById('losses').innerHTML = 0;
        document.getElementById('ties').innerHTML = 0;
        document.getElementById('wins').innerHTML = 0;

        document.getElementById('result').innerHTML = '';
    }
}

var key = 0;
var opponent_choice = 0;
var repeat = 0;
var result = 0;
var selected = 0;

window.onkeydown = function(e){
    key = window.event ? event : e;
    key = key.charCode ? key.charCode : key.keyCode;

    // R: play rock.
    if(key == 82){
        play(0);

    // P: play paper.
    }else if(key == 80){
        play(1);

    // S: play scissors.
    }else if(key == 83){
        play(2);
    }
};
