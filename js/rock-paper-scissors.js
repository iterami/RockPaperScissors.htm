function play(selected){
    // generate a random number (0, 1, or 2)
    opponent_choice = Math.floor(Math.random() * 3);

    // display game information
    document.getElementById('result').innerHTML = 'You played <b>' + ['rock', 'paper', 'scissors'][selected]
        + '</b><br>Your opponent played <b>' + ['rock', 'paper', 'scissors'][opponent_choice]
        + '</b><br><b>YOU ' + ['LOSE', 'WIN', 'TIE'][
            /* if both players pick same option, game is a tie (2) */
            selected == opponent_choice ? 2
            : (
                /* if player has the winning choice, player wins (1) */
                (
                    (selected == 0 && opponent_choice == 2)
                 || (selected == 1 && opponent_choice == 0)
                 || (selected == 2 && opponent_choice == 1)
                ) ? 1

                /* else computer wins (0) */
                : 0
              )
            ]
        + '!</b>'
}

var key = 0;
var opponent_choice = 0;
var selected = 0;

window.onkeydown = function(e){
    key = window.event ? event : e;
    key = key.charCode ? key.charCode : key.keyCode;

    // key == R, play Rock
    if(key == 82){
        play(0)

    // key == P, play Paper
    }else if(key == 80){
        play(1)

    // key == S, play Scissors
    }else if(key == 83){
        play(2)
    }
};
