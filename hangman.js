var inquirer = require("inquirer");
var Words = require("./word");
var Letter = require("./letter");

var guesses = 10;
var userGuessed = [];
var word;
var wordArray;
var round = 0;
var score = 0;

var gameWords = ["bitcoin","ethereum","litecoin"];
var gameWordsArray = [];

for (var i = 0; i < gameWords.length; i++) {
    var newWord = new Words(gameWords[i]);
    gameWordsArray.push(newWord.word);
}

var setWord = function(round) {
    word = gameWordsArray[round];
    wordArray = [];
    for (var i = 0; i < word.length; i++) {
        var letter = new Letter(word[i]);
        wordArray.push(letter);
    }
};

var playGame = function() {
    
    var currentWord = [];
    for (var i in wordArray) {
        currentWord.push(wordArray[i].display());
    }

    if (currentWord.includes("_")) {
        console.log(guesses + " guesses remaining!");
        console.log(currentWord.join(" "));

        if (guesses > 0) {
            
            inquirer.prompt([
                {
                    name: "letter",
                    message: "Guess a letter!"
                }
            ]).then(function(answers) {
    
                if (userGuessed.includes(answers.letter)) {
    
                    console.log("You've already guessed this letter!");
    
                } else {
    
                    userGuessed.push(answers.letter);
                    for (var i in wordArray) {
                        if (answers.letter === wordArray[i].letter) {
                            wordArray[i].guessed = true;
                        }
                    }
                    guesses--;
                }
                playGame();
            });
        }
        else {
            round++;
            console.log("Nice try...the word was " + word);
            if (round < gameWords.length) {
                console.log("Next Word...");
                guesses = 10;
                userGuessed = [];
                setWord(round);
                playGame();
            } else {
                console.log("Game over! Score: " + score + "/" + gameWords.length);
            }
        }
    } else {
        score++;
        round++;
        console.log("You've guessed it!");
        if (round < gameWords.length) {
            console.log("Next Word...");
            guesses = 10;
            userGuessed = [];
            setWord(round);
            playGame();
        } else {
            console.log("Game over! Score: " + score + "/" + gameWords.length);
        }
    }
};

setWord(round);
playGame();
  