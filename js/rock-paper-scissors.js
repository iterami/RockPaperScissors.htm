function get(i){
    return document.getElementById(i);
}

function play(selected){
    // fetch how many games player wants to play
    repeat = parseInt(get('repeat').value);

    if(repeat > 0){
        // loop through the games
        i = repeat;

        do{
            // generate a random number (0, 1, or 2)
            opponent_choice = Math.floor(Math.random() * 3);

            // determine the result
            if(selected == opponent_choice){
                // result is a tie
                result = 2;
            }else if((selected == 0 && opponent_choice == 2)
                  || (selected == 1 && opponent_choice == 0)
                  || (selected == 2 && opponent_choice == 1)){
                // result is a win
                result = 1;
            }else{
                // result is a loss
                result = 0;
            }

            // update loss/tie/win values
            get(['losses', 'wins', 'ties'][result]).innerHTML =
                parseInt(document.getElementById(['losses', 'wins', 'ties'][result]).innerHTML)
                + 1;
        }while(i--);

        // display game information, limiting information for multiple games played
        get('result').innerHTML = 'You played <b>' + ['rock', 'paper', 'scissors'][selected]
            + '</b> ' + repeat + ' times<br>'
            + 'Your opponent played <b>' + (repeat > 1
              ? 'lots of stuff'
              : ['rock', 'paper', 'scissors'][opponent_choice])
            + '</b><br><b>' + (repeat > 1
              ? 'You probably won some of them!'
              : 'YOU ' + ['LOSE', 'WIN', 'TIE'][result]
            + '!</b>');
    }
}

function reset(){
    if(confirm('Reset scores?')){
        get('losses').innerHTML = 0;
        get('ties').innerHTML = 0;
        get('wins').innerHTML = 0;

        get('result').innerHTML = '';
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

    // key == R, play Rock
    if(key == 82){
        play(0);

    // key == P, play Paper
    }else if(key == 80){
        play(1);

    // key == S, play Scissors
    }else if(key == 83){
        play(2);
    }
};
