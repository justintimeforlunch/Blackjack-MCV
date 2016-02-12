/*                                                                                                                                                         
 Name: Justin Nguyen                                                                                                                                        
 Contact: justintimenguyen@gmail.com                                                                                                                                                                                                                                                    
 School: University of Massachusetts Lowell                                                                                                                                                                                                                                                                                 
 Date Updated: February 11, 2016                                                                                                                                                                                                                              
 Description: Implementing Blackjack using the MVC method        
 Copyright [2016] by Justin Nguyen. All rights reserved.                                                                                                    
 May be freely copied or excerpted for educational purposes with credit to the author.                                                                      
 */


/*Ready when page is loaded*/
$(document).ready(function() {
    generateCards();
    DealerHand();
}); //end ready

/*Global Variables*/
var dealerTotalScore = 0;
var playerTotalScore = 0;

//generates cards in the Player's hand
function generateCards() {
    cards = '';
    var cards_value = '';
    var playerCardScore = 0;
    for (var i = 0; i < 2; i++) {
        var value = Math.floor(Math.random() * PlayingCards.length); //randomize 2 cards
        PlayingCards[value].number_remaining--;

        if (PlayingCards[value].number_remaining === 0) {
            value = Math.floor(Math.random() * PlayingCards.length);
        } //end of if statement

        var cards_value = PlayingCards[value].card;
        var cardImageUrl = 'img/PlayingCards/PlayingCards';

        cards += "<img id='play-cards" + "' class='card-piece" + cards_value + 'a' + "' src='" + cardImageUrl + cards_value + 'a' + ".png" + "'></img>";

        playerTotalScore += PlayingCards[value].value;
    } //end of forloop
    $('#cards_value').html(cards_value);
    $('#cards').html(cards);
    $('#playerScore').html(playerTotalScore);
}

//TODO: Fix how the card are displayed
//      This should also be taking away values from the deck
//will generate the cards in the Dealer's hand
function DealerHand() {
    dealerCards = '';
    var dealerCardValues = '';
    var dealerCardScore = 0;
    for (var i = 0; i < 2; i++) {
        var value = Math.floor(Math.random() * PlayingCards.length); //randomize 2 cards
        if (PlayingCards[value].number_remaining === 0) {
            value = Math.floor(Math.random() * PlayingCards.length);
        } //end if statement
        var dealerCardValues = PlayingCards[value].card;
        //dealerCardValues += PlayingCards[value].card;
        var cardImageUrl = 'img/PlayingCards/PlayingCards';

        //dealerCardScore = generateScore(PlayingCards[value].value);
        dealerTotalScore += PlayingCards[value].value;
        //need to make it able to put both card-values in the array but only display 1 and display a facedown card
        dealerCards += "<img id='play-cards" + "' class='card-piece" + dealerCardValues + 'a' + "' src='" + cardImageUrl + dealerCardValues + 'a' + ".png" + "'></img>";

    } //end forloop
    $('#dealer_value').html(dealerCardValues);
    $('#dealerScore').html(dealerTotalScore);
    $('#dealer_cards').html(dealerCards);
    //dealerCards += "<img id='play-cards class='card-piece' src='" + dealerCardValues + 'a' + ".png" + "></img>";        
    //dealerCards += "<img id='play-cards" + "' class='card-piece" + card_value + 'a' + "' src='" + cardImageUrl + card_value + 'a' + ".png" + "'></img>";
}

//TODO: Generate a new card to add to the current 2 cards of the user.
//      Needs to generate the cards out of the pool of remaining cards
$("#hit").click(function() {
    //generate one new card from deck
    var value = Math.floor(Math.random() * PlayingCards.length);
    if (PlayingCards[value].number_remaining === 0) {
        value = Math.floor(Math.random() * PlayingCards.length);
    } //end if statement

    var card_value = PlayingCards[value].card;
    var cardImageUrl = 'img/PlayingCards/PlayingCards';


    playerTotalScore += PlayingCards[value].value;


    var cardHitValue = "<img id='play-cards" + "' class='card-piece" + card_value + 'a' + "' src='" + cardImageUrl + card_value + 'a' + ".png" + "'></img>";
    $('#playerScore').replaceWith(playerTotalScore);
    $('#card_hit').html(cardHitValue);
});

//TODO: Able to hit more than once card
$("#stay").click(function() {
    //if Dealer's score is less than 16, then hit and generate a new card
    while (dealerTotalScore < 16) {
        var value = Math.floor(Math.random() * PlayingCards.length);

        if (PlayingCards[value].number_remaining === 0) {
            value = Math.floor(Math.random() * PlayingCards.length);
        } //end if statement
        var card_value = PlayingCards[value].card;
        var cardImageUrl = 'img/PlayingCards/PlayingCards';

        dealerTotalScore += PlayingCards[value].value;
        var cardHitValue = "<img id='play-cards" + "' class='card-piece" + card_value + 'a' + "' src='" + cardImageUrl + card_value + 'a' + ".png" + "'></img>";
        $('#dealerScore').replaceWith(dealerTotalScore);
        $('#dealer_hit').html(cardHitValue);
    } //end while statement
    winner();
});

//TODO: If it is even
function winner() {
    var winner = "";
    if (playerTotalScore > dealerTotalScore && playerTotalScore < 21) {
        winner = "<div class='text-center'>Player Wins!</div>";
        $("#declare-winner").html(winner)
    } else {
        winner = "<div class='text-center'>Dealer Wins!</div>";
        $("#declare-winner").html(winner)
            //dealer win
    }
    return;
}

var PlayingCards = [];
PlayingCards[0] = { //Card: 2
    "card": "2",
    "value": 2,
    "original_distribution": 4,
    "number_remaining": 4
}; 
PlayingCards[1] = { //Card: 3
    "card": "3",
    "value": 3,
    "original_distribution": 4,
    "number_remaining": 4
};
PlayingCards[2] = { //Card: 4
    "card": "4",
    "value": 4,
    "original_distribution": 4,
    "number_remaining": 4
};
PlayingCards[3] = { //Card: 5
    "card": "5",
    "value": 5,
    "original_distribution": 4,
    "number_remaining": 4
}; 
PlayingCards[4] = { //Card: 6
    "card": "6",
    "value": 6,
    "original_distribution": 4,
    "number_remaining": 4
};
PlayingCards[5] = { //Card: 7
    "card": "7",
    "value": 7,
    "original_distribution": 4,
    "number_remaining": 4
};
PlayingCards[6] = { //Card: 8
    "card": "8",
    "value": 8,
    "original_distribution": 4,
    "number_remaining": 4
};
PlayingCards[7] = { //Card: 9
    "card": "9",
    "value": 9,
    "original_distribution": 4,
    "number_remaining": 4
};
PlayingCards[8] = { //Card: 10
    "card": "10",
    "value": 10,
    "original_distribution": 4,
    "number_remaining": 4
}; 
PlayingCards[9] = { //Card: Jack
    "card": "11",
    "value": 10,
    "original_distribution": 4,
    "number_remaining": 4
}; 
PlayingCards[10] = { //Card: Queen
    "card": "12",
    "value": 10,
    "original_distribution": 4,
    "number_remaining": 4
};
PlayingCards[11] = { //Card: King
    "card": "13",
    "value": 10,
    "original_distribution": 4,
    "number_remaining": 4
};
//Ace will need to be tested for 1 and 11
//If score is under 21, Keep it at 11. If the score goes over 21, change it to 1
PlayingCards[12] = { //Card: Ace
    "card": "14",
    "value": 1,
    "original_distribution": 4,
    "number_remaining": 4
};