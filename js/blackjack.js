/*                                                                                                                                                         
 Name: Justin Nguyen                                                                                                                                        
 Contact: justinnnguyen@hotmail.com                                                                                                                                                                                                                                                     
 School: University of Massachusetts Lowell                                                                                                                                                                                                                                                                                 
 Date Updated: January 28, 2016                                                                                                                                                                                                                              
 Description: Assignment 9 - Implementing Blackjack using the MVC method        
 Copyright [2016] by Justin Nguyen. All rights reserved.                                                                                                    
 May be freely copied or excerpted for educational purposes with credit to the author.                                                                      
 */

var PlayingCards = [];
PlayingCards[0] = { "card": "2", "value": 2, "original_distribution": 4, "number_remaining": 4 }; //Card: 2
PlayingCards[1] = { "card": "3", "value": 3, "original_distribution": 4, "number_remaining": 4 }; //Card: 3
PlayingCards[2] = { "card": "4", "value": 4, "original_distribution": 4, "number_remaining": 4 }; //Card: 4
PlayingCards[3] = { "card": "5", "value": 5, "original_distribution": 4, "number_remaining": 4 }; //Card: 5
PlayingCards[4] = { "card": "6", "value": 6, "original_distribution": 4, "number_remaining": 4 }; //Card: 6
PlayingCards[5] = { "card": "7", "value": 7, "original_distribution": 4, "number_remaining": 4 }; //Card: 7
PlayingCards[6] = { "card": "8", "value": 8, "original_distribution": 4, "number_remaining": 4 }; //Card: 8
PlayingCards[7] = { "card": "9", "value": 9, "original_distribution": 4, "number_remaining": 4 }; //Card: 9
PlayingCards[8] = { "card": "10", "value": 10, "original_distribution": 4, "number_remaining": 4 }; //Card: 10
PlayingCards[9] = { "card": "11", "value": 10, "original_distribution": 4, "number_remaining": 4 }; //Card: Jack
PlayingCards[10] = { "card": "12", "value": 10, "original_distribution": 4, "number_remaining": 4 }; //Card: Queen
PlayingCards[11] = { "card": "13", "value": 10, "original_distribution": 4, "number_remaining": 4 }; //Card: King
/*Ace will need to be tested for 1 and 11*/
PlayingCards[12] = { "card": "14", "value": 1, "original_distribution": 4, "number_remaining": 4 }; //Card: Ace

/*Ready when page is loaded*/
$(document).ready(function () {
    generateCards();
    //generateBoard();
    //toDragAndDrop();
}); //end ready

/*Global Variables*/
var cards = "";
var table = ""; //generate scrabble board
var score = 0;
var board = [];
var values = []; // holds the letter's value
var cards_placed = [];
var display_letters = "";
//var alphabet = ""; //created for testing purposes

//TODO: Fix tile placement. The droppable is taking the draggable on the bottom right of it.

function generateCards() {
    cards = '';
    var cards_value = '';
    for (var i = 0; i < 2; i++) {
        var value = Math.floor(Math.random() * PlayingCards.length); //randomize 2 cards
        if (PlayingCards[value].number_remaining === 0) {
            value = Math.floor(Math.random() * PlayingCards.length);
        }
        var card_value = PlayingCards[value].card;
        cards_value += PlayingCards[value].card;
        var cardImageUrl = 'img/PlayingCards/PlayingCards';

        cards += "<img id='play-cards" + "' class='card-piece" + card_value + 'a' + "' src='" + cardImageUrl + card_value + 'a' + ".png" + "'></img>";


        values.push([i, PlayingCards[value].value]);
        cards_placed.push([i, cards_value]);

        console.log(values[i][1]);

        generateScore(PlayingCards[value].value);
        console.log(cards_value);
        //$('#score').html(score);
        $('#cards_value').html(cards_value);
        $('#cards').html(cards);
    }
}

function generateScore(scoreResult) {
    score += scoreResult;
    
    //console.log(score);
    $('#score').html(score);
}

/*TODO: Generate a new card to add to the current 2 cards of the user.*/
/*
function blackjackHit() {
    
}
*/
/*function generateCards() {
    tiles = ""; //inserts the image of the tile corresponding to the letter
    //alphabet = ""; //keeps track of the randomized letters for testing purposes
    //alpha_value = ""; //keeps track for value for testing purposes

    //This gets 7 random letters from the ScrabbleTiles array
    //reference: http://stackoverflow.com/questions/4550505/getting-random-value-from-an-array
    for (var i = 0; i < 2; i++) {
        var value = Math.floor(Math.random() * PlayingCards.length); //randomize a letter

        //check if number remaining of random letter is 0, if it is get a new letter  
        if (PlayingCards[value].number_remaining === 0) {
            value = Math.floor(Math.random() * PlayingCards.length);
        }
        var letter_value = PlayingCards[value].letter;
        //alphabet += letter_value; //put the letters in an array for testing purposes

        var scrabble_url = "images/Scrabble_Tiles/Scrabble_Tile_";
        //inserts the id, class and image of the board pieces

        tiles += "<img id='tile-drag_" + i + "' class='card-piece" + letter_value + "' src='" + scrabble_url + letter_value + ".jpg" + "'></img>";
        //alpha_value += ScrabbleTiles[value].number_remaining -= 1; 

        var numRemaining = PlayingCards[value].number_remaining;
        numRemaining = numRemaining - 1; //decrement number remaining of that tile

        values.push([i, PlayingCards[value].value]);
        letters_placed.push([i, letter_value]);
        //console.log(values[i][1]);

    }
    $('#score').html(score);
    $('#cards').html(tiles);
    //$('#alpha').html(alpha_value);
    //$('#rack').html(alphabet[3]);

}
*/