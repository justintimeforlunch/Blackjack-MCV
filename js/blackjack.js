/*                                                                                                                                                         
 Name: Justin Nguyen                                                                                                                                        
 Contact: justintimenguyen@gmail.com                                                                                                                                                                                                                                                    
 School: University of Massachusetts Lowell                                                                                                                                                                                                                                                                                 
 Date Updated: February 11, 2016                                                                                                                                                                                                                              
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
//Ace will need to be tested for 1 and 11
//If score is under 21, Keep it at 11. If the score goes over 21, change it to 1
PlayingCards[12] = { "card": "14", "value": 1, "original_distribution": 4, "number_remaining": 4 }; //Card: Ace

/*Ready when page is loaded*/
$(document).ready(function () {
    generateCards();
    //generateBoard();
    //toDragAndDrop();
}); //end ready

/*Global Variables*/
var cards = "";
var dealerCards = ""; //generate dealer hand
var table = ""; //generate scrabble board
var score = 0;
var board = [];
var values = []; // holds the letter's value
var cards_placed = [];
var display_letters = "";
//var alphabet = ""; //created for testing purposes

//TODO: Fix tile placement. The droppable is taking the draggable on the bottom right of it.

//generates cards in the Player's hand
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
        
        //values.push([i, PlayingCards[value].value]);
        //cards_placed.push([i, cards_value]);
        //console.log(values[i][1]);

        generateScore(PlayingCards[value].value);
        //console.log(cards_value);
        //$('#score').html(score);
        $('#cards_value').html(cards_value);
        $('#cards').html(cards);
    }
}

//TODO: fix to use for both the Player and Dealer.
//      Make it more general
//generates the score of both the player and dealer
function generateScore(scoreResult) {
    score += scoreResult;
    //console.log(score);
    $('#score').html(score);
}

//TODO: Fix how the card are displayed
//      This should also be taking away values from the deck
//will generate the cards in the Dealer's hand
function DealerHand() {
    dealerCards = '';
    dealerCardValues = '';
    for (var i = 0; i < 2; i++) {
        var value = Math.floor(Math.random() * PlayingCards.length); //randomize 2 cards
        if (PlayingCards[value].number_remaining === 0) {
            value = Math.floor(Math.random() * PlayingCards.length);
        } //end if statement
        var dealerCardValues = PlayingCards[value].card;
        dealerCardValues += PlayingCards.card;
        var cardImageUrl = 'img/PlayingCards/PlayingCards';

        //need to make it able to put both card-values in the array but only display 1 and display a facedown card
        dealerCards += "<img id='play-cards" + "' class='card-piece" + card_value + 'a' + "' src='" + cardImageUrl + card_value + 'a' + ".png" + "'></img>";
    } //end forloop
        dealerCards += "<img id='play-cards class='card-piece' src='" + dealerCardValues + 'a' + ".png" + "></img>";        
        dealerCards += "<img id='play-cards" + "' class='card-piece" + card_value + 'a' + "' src='" + cardImageUrl + card_value + 'a' + ".png" + "'></img>";
}

//TODO: Generate a new card to add to the current 2 cards of the user.
//      Needs to generate the cards out of the pool of remaining cards
/*
function blackjackHit() {
    
}
*/