                                                                                                                                                         
 // Name: Justin Nguyen                                                                                                                                        
 // Contact: justintimenguyen@gmail.com                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
 // Date Updated: March 1, 2016                                                                                                                                                                                                                              
 // Description: Implementing Blackjack using the MVC method        
 // Copyright [2016] by Justin Nguyen. All rights reserved.                                                                                                    
 // May be freely copied or excerpted for educational purposes with credit to the author.                                                                      
 
var BJ_CARDS; //object to hold the json object

//Ajax call to get the playing card information
$.ajax({
    async: false,
    dataType: "json",
    url: "apps/PlayingCards.json",
    success: function (data) {
        BJ_CARDS = data;
        console.log(BJ_CARDS);
    },
    error: function () {
        console.log("Error: json has not loaded");
    }
}); //end of ajax call

//Ready when page is loaded
$(document).ready(function() {
    generateCards();
    DealerHand();
}); //end ready


/*Global Variables*/
var numOfElements = BJ_CARDS.numberOfCards; //keeps track of the number of different type of cards
//keeps track fo total player score of the player and dealer
var dealerTotalScore = 0;
var playerTotalScore = 0;

//generates cards in the Player's hand
function generateCards() {
    cards = '';
    var cards_value = '';
    var playerCardScore = 0;
    for (var i = 0; i < 2; i++) {
        var value = Math.floor(Math.random() * numOfElements); //randomize 2 cards
        BJ_CARDS.PlayingCards[value].number_remaining--;

        if (BJ_CARDS.PlayingCards[value].number_remaining === 0) {
            value = Math.floor(Math.random() * BJ_CARDS.length);
        } //end of if statement

        var cards_value = BJ_CARDS.PlayingCards[value].card;
        var cardImageUrl = 'img/PlayingCards/PlayingCards';

        cards += "<img id='play-cards" + "' class='card-piece" + cards_value + 'a' + "' src='" + cardImageUrl + cards_value + 'a' + ".png" + "'></img>";

        playerTotalScore += BJ_CARDS.PlayingCards[value].value;
    } //end of forloop

    //insert values into HTML
    $('#cards_value').html(cards_value);
    $('#cards').html(cards);
    $('#playerScore').html(playerTotalScore);
} //end of function generateCards()

//TODO: Fix how the card are displayed
//      This should also be taking away values from the deck
//will generate the cards in the Dealer's hand
function DealerHand() {
    dealerCards = '';
    var dealerCardValues = '';
    var dealerCardScore = 0;
    for (var i = 0; i < 2; i++) {
        var value = Math.floor(Math.random() * numOfElements); //randomize 2 cards
        if (BJ_CARDS.PlayingCards[value].number_remaining === 0) {
            value = Math.floor(Math.random() * numOfElements);
        } //end if statement
        BJ_CARDS.PlayingCards[value].number_remaining--;
        var dealerCardValues = BJ_CARDS.PlayingCards[value].card;
        //dealerCardValues += BJ_CARDS.PlayingCards[value].card;
        var cardImageUrl = 'img/PlayingCards/PlayingCards';

        //dealerCardScore = generateScore(BJ_CARDS.PlayingCards[value].value);
        dealerTotalScore += BJ_CARDS.PlayingCards[value].value;
        //need to make it able to put both card-values in the array but only display 1 and display a facedown card
        dealerCards += "<img id='play-cards" + "' class='card-piece" + dealerCardValues + 'a' + "' src='" + cardImageUrl + dealerCardValues + 'a' + ".png" + "'></img>";

    } //end forloop

    //insert values into HTML
    $('#dealer_value').html(dealerCardValues);
    $('#dealerScore').html(dealerTotalScore);
    $('#dealer_cards').html(dealerCards);
    //dealerCards += "<img id='play-cards class='card-piece' src='" + dealerCardValues + 'a' + ".png" + "></img>";        
    //dealerCards += "<img id='play-cards" + "' class='card-piece" + card_value + 'a' + "' src='" + cardImageUrl + card_value + 'a' + ".png" + "'></img>";
} //end of function DealerHand()


var PlayerCardHitValue = '';
//TODO: Generate a new card to add to the current 2 cards of the user.
//      Needs to generate the cards out of the pool of remaining cards
$("#hit").click(function() {
    //var cardHitValue = '';
    //generate one new card from deck
    var value = Math.floor(Math.random() * numOfElements);
    if (BJ_CARDS.PlayingCards[value].number_remaining === 0) {
        value = Math.floor(Math.random() * numOfElements);
    } //end if statement

    var card_value = BJ_CARDS.PlayingCards[value].card;
    var cardImageUrl = 'img/PlayingCards/PlayingCards';


    playerTotalScore += BJ_CARDS.PlayingCards[value].value;

    PlayerCardHitValue += "<img id='play-cards" + "' class='card-piece" + card_value + 'a' + "' src='" + cardImageUrl + card_value + 'a' + ".png" + "'></img>";
    
    //insert values into HTML
    $('#playerScore').text(playerTotalScore);
    $('#card_hit').html(PlayerCardHitValue);    
}); //end of function

//TODO: Able to hit more than once card
$("#stay").click(function() {
    var cardHitValue = '';
    if (dealerTotalScore < playerTotalScore) {
        //if Dealer's score is less than 16, then hit and generate a new card
        while (dealerTotalScore < 16) {
            var value = Math.floor(Math.random() * numOfElements);

            if (BJ_CARDS.PlayingCards[value].number_remaining === 0) {
                value = Math.floor(Math.random() * numOfElements);
            } //end if statement
            var card_value = BJ_CARDS.PlayingCards[value].card;
            var cardImageUrl = 'img/PlayingCards/PlayingCards';

            dealerTotalScore += BJ_CARDS.PlayingCards[value].value;
            cardHitValue += "<img id='play-cards" + "' class='card-piece" + card_value + 'a' + "' src='" + cardImageUrl + card_value + 'a' + ".png" + "'></img>";

            $('#dealer_hit').html(cardHitValue);
        } //end while statement
    }
    $('#dealerScore').replaceWith(dealerTotalScore);
    $('#playerScore').replaceWith(playerTotalScore);
    winner();
}); //end of function


// First check if both player and dealer have the same score and if so, push.
// Next check if player has a higher score than dealer, but not over 21, if so, Player wins.
// Lastly, check if dealer has a high a higher score than player, but not over 21, if so, Dealer wins.
function winner() {
    $('#dealerScore').replaceWith(dealerTotalScore);
    var winner = "";
    if ((dealerTotalScore > 21 && playerTotalScore > 21) || (dealerTotalScore === playerTotalScore)) {
        winner = "<div class='text-center'>Tied Game. Pushed!</div>";
        $("#declare-winner").html(winner)
    } //end of if statement
    if (dealerTotalScore > 21 || (playerTotalScore <= 21 && (playerTotalScore > dealerTotalScore))) {
        if (dealerTotalScore === 21) {
            winner = "<div class='text-center'>Blackjack! Player Wins!</div>";
            $("#declare-winner").html(winner);
            return;
        } //end of if statement
        winner = "<div class='text-center'>Player Wins!</div>";
        $("#declare-winner").html(winner);
    } //end of if statement
    if (playerTotalScore > 21 || (dealerTotalScore <= 21 && (dealerTotalScore > playerTotalScore))) {
        if (dealerTotalScore === 21) {
            winner = "<div class='text-center'> Blackjack! Dealer Wins!</div>";
            $("#declare-winner").html(winner);
            return;
        } //end of if statement
        winner = "<div class='text-center'>Dealer Wins!</div>";
        $("#declare-winner").html(winner);
    } //end of if statement
    return;
} //end of function winner()
