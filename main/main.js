$(function(){
//The deck variable gives me access to my deck script file
  var deck = App.deck()
// The global variable for my player
  var firstCardPulled;
  var secondCardPulled;
  var firstCardValue;
  var firstCardSuit;
  var secondCardValue;
  var secondCardSuit;
// The global variable for my dealer
  var firstDealerCardPulled;
  var firstDealerCardValue;
  var secondDealerCardPulled;
  var secondDealerCardValue;
  var firstDealerSuit;
  var secondDealerSuit;
//The global variables for the points accumulated for my player and dealer
  var playerPoints;
  var dealerPoints;
//The global variables for my total win, losses, and balance
  var wins = 0;
  var losses = 0;
  var balanceValue = 1000;
  var wageValue = 0;
//The global variable for hit
  var hitCardPulled;
  var hitCardSuit;
  var hitCardValue;
//The global variables for dealer hit
  var dealerHitCardPulled;
  var dealerHitCardSuit;
  var dealerHitCardValue;
//The global variables for my buttons
  var deal = $("#deal-button")
  var hit = $("#hit-button")
  var stand = $("#stand-button")
//The global jQuery selectors for form, deal, first, second, and dealer card
  var form = $("#wager_balance")
  var firstCard = $("#first-card")
  var secondCard = $("#second-card")
  var dealerCard = $("#dealerCard")
//Hide my buttons until user wages an amount
  hit.hide()
  stand.hide()
  deal.hide()
//The balance submit button updates the total balance located at the top of the screen
  var balance = $("#wager_balance")
  form.on("submit", function(event){
    event.preventDefault()
    wageValue = $("#wage-value").val()
    if(wageValue > balanceValue){
      var inputValue;
      swal({
        title: "Error",
        text: "You placed a wager that is more than your balance. Please place a wager less than or equal to your balance or else you will be removed from the Cesar's Casino",
        type: "input",
        showCancelButton: false,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "Place Wager"
      },
      function(inputValue) {
        if (inputValue === false) return false;
        if (inputValue === "" || inputValue > balanceValue) {
          swal.showInputError("You need to put in a correct value!");
          return false
        }
        if(inputValue < balanceValue){
          swal("Thank You!", "You wrote: " + inputValue, "success")
          console.log(inputValue, 'inputValue');
          inputValue = parseInt(inputValue)
          wageValue = inputValue;
          reRenderPlayerAmount(wageValue, balanceValue)
          return inputValue
        }
      });
      wageValue = inputValue;
      reRenderPlayerAmount(wageValue, balanceValue)
      return wageValue
    } else{
      reRenderPlayerAmount(wageValue, balanceValue)
      return wageValue
    }
  })
  function reRenderPlayerAmount(wageValue = 0, balanceValue = 0) {
    updateWageValue(wageValue);
    updateBalanceValue(balanceValue, wageValue);

    form.hide()
    deal.show()
  }
  function updateWageValue(wageValue) {
    $("#wage-val").text(wageValue)
  }
  function updateBalanceValue(balanceValue, wageValue) {
    balanceValue = balanceValue - wageValue;
    $("#balance-val").text(balanceValue)
  }
//Game over function when user's balance reaches zero
  function gameOver(){
    if(balanceValue === 0){
      swal()
      swal({
      title: "<h1>GAME OVER!</h1>",
      text: "You lost all of your money. <a href='/Users/vvt941/Documents/developer/week7/unit-1-project/blackjack/index4.html' style='color:#F8BB86'> Click Here to Play Again<a>",
      html: true
      });
      form.hide()
    }
  }
// The deal button returns the suit and value of the card
//  console.log(deal)
  deal.on("click",function(){
    firstCard.empty()
    secondCard.empty()
    dealerCard.empty()
    dealerCards()
    playerCards()
    deal.hide()
    hit.show()
    stand.show()
    firstCardImage()
    secondCardImage()
    dealerCardImage()
    backOfDealerCardImage()
    if(playerPoints === 21 ){
      swal()
      swal({
        title: "BLACKJACK!",
        text: "You hit 21. Please Click Stand to receive your winnings",
        imageUrl: "/Users/vvt941/Documents/developer/week7/unit-1-project/blackjack/images/Blackjack21.jpg"
      });
      hit.hide()
    }
  })
// The hit button adds another card from the deck and applies the value to the
// two current cards and if your total is above 21 you bust otherwise you hit
// BlackJack
  hit.on("click",function(){
    hitCard()
    hitCardImage()
    playerPoints = playerPoints + hitCardValue
    console.log(playerPoints);
    if (playerPoints > 21) {
      swal()
      swal({
        title: "Sorry",
        text: "You lost the hand.",
        imageUrl: "/Users/vvt941/Documents/developer/week7/unit-1-project/blackjack/images/You-Are-A-Loser-Picture.jpg"
      });
      losses++
      $("#losses-val").text(losses)
      balanceValue = balanceValue - wageValue
      $("#balance-val").text(balanceValue)
      stand.hide()
      deal.hide()
      hit.hide()
      form.show()
      gameOver()
    } else if (playerPoints === 21){
      swal()
      swal({
        title: "BLACKJACK!",
        text: "You hit 21. Please Click Stand to receive your winnings",
        imageUrl: "/Users/vvt941/Documents/developer/week7/unit-1-project/blackjack/images/Blackjack21.jpg"
      });
      hit.hide()
    }
    return playerPoints
  })
//My Stand button
  stand.on("click",function(){
    console.log(dealerPoints);
    dealerCardImgHidden()
    if(dealerPoints < 16){
      dealerHitCard()
      console.log(dealerPoints);
      dealerPoints = dealerPoints + dealerHitCardValue
      console.log(dealerPoints);
      dealerHitCardImage()
    }
    flipCards()
    deal.hide()
    hit.hide()
    stand.hide()
    form.show()
    gameOver()
  })
//My hit function to pull another card from the deck
  function hitCard(){
    hitCardNumValue()
    function hitCardNumValue(){
      deck.getCardValue()
      hitCardPulled = deck.card
      hitCardValue = deck.cardValue
      hitSuitValue = deck.suitValue
      if (playerPoints > 10 && hitCardValue === 11){
        hitCardValue = 1
      }
      console.log("Pulled a " + hitCardPulled + " of " + hitSuitValue);
      return hitCardValue;
    }
  }

  function dealerHitCard(){
    dealerHitCardNumValue()
    function dealerHitCardNumValue(){
      deck.getCardValue()
      dealerHitCardPulled = deck.card
      dealerHitCardValue = deck.cardValue
      dealerHitSuitValue = deck.suitValue
      if (dealerPoints > 10 && dealerHitCardValue === 11){
        dealerHitCardValue = 1
      }
      console.log("Pulled a " + dealerHitCardPulled + " of " + dealerHitSuitValue);
      return dealerHitCardValue;
    }
  }
//Below are my functions that return the cards from my deck for my player and
//my dealer. It also contains the points accumulated from the cards in my
//flipCards function.
    function flipCards(){
      var winsTag = $("#wins_tag")
      console.log(playerPoints + " versus " + dealerPoints);
      if(playerPoints > dealerPoints || dealerPoints > 21){
        swal()
        swal("Good job!", "You won the hand!", "success")
        wins++
        $("#wins-val").text(wins)
        balanceValue = balanceValue + (wageValue * 2)
        $("#balance-val").text(balanceValue)
      } else if (playerPoints < dealerPoints){
        swal()
        swal({
          title: "Sorry",
          text: "You lost the hand.",
          imageUrl: "/Users/vvt941/Documents/developer/week7/unit-1-project/blackjack/images/You-Are-A-Loser-Picture.jpg"
        });
        losses++
        $("#losses-val").text(losses)
        balanceValue = balanceValue - wageValue
        $("#balance-val").text(balanceValue)
      } else {
        swal()
        swal({
          title: "PUSH!",
          text: "You tied with the dealer.",
          imageUrl: "/Users/vvt941/Documents/developer/week7/unit-1-project/blackjack/images/Safe145-Push.jpg"
        });
        balanceValue = parseInt(balanceValue)
        console.log(balanceValue);
        wageValue = parseInt(wageValue)
        console.log(wageValue);
        newBalanceValue = balanceValue + wageValue
        console.log(balanceValue , wageValue);
        $("#balance-val").text(newBalanceValue)
      }
    }
// The function to pull the cards for the player
    function playerCards(){
      firstCardNumValue()
      firstCardSuitValue()
      secondCardNumValue()
      secondCardSuitValue()
      console.log("My first card: " + firstCardValue + " of " + firstCardSuit)
      console.log("My second card: " + secondCardValue + " of " + secondCardSuit)
      playerPoints = firstCardValue + secondCardValue
      if (playerPoints === 21){
        hit.hide()
        swal()
        swal({
          title: "BLACKJACK!",
          text: "You hit 21. Please Click Stand to receive your winnings",
          imageUrl: "/Users/vvt941/Documents/developer/week7/unit-1-project/blackjack/images/Blackjack21.jpg"
        });
      }
      console.log("Total Points", playerPoints);
    }
    //The function gives me access to the numeric value of the card pulled by the player for the first card
    function firstCardNumValue(){
      deck.getCardValue()
      firstCardValue = deck.cardValue
      firstCardPulled = deck.card
      return firstCardValue;
    }
    //The function gives me access to the value of the suit pulled by the player for the first card
    function firstCardSuitValue(){
      deck.getSuit()
      firstCardSuit = deck.suitValue
      return firstCardSuit;
    }
    //The function gives me access to the numeric value of the card pulled by the player for the second card
    function secondCardNumValue(){
      deck.getCardValue()
      secondCardValue = deck.cardValue
      secondCardPulled = deck.card
      if(secondCardValue === 11 && firstCardValue === 11){
        secondCardValue = 1;
      }
      return secondCardValue;
    }
    //The function gives me access to the value of the suit pulled by the player for the second card
    function secondCardSuitValue(){
      deck.getSuit()
      secondCardSuit = deck.suitValue
      return secondCardSuit;
    }
//The function to pull the cards for the dealer
    function dealerCards(){
      dealerFirstCardNumValue()
      dealerFirstCardSuitValue()
      dealerSecondCardNumValue()
      dealerSecondCardSuitValue()
      console.log("Dealer first Second Card: " + firstDealerCardValue + " of " + firstDealerSuit);
      dealerPoints = firstDealerCardValue + secondDealerCardValue
    }
    //The function gives me access to the numeric value of the card pulled by the dealer for the first card
    function dealerFirstCardNumValue(){
      deck.getCardValue()
      firstDealerCardValue = deck.cardValue
      firstDealerCardPulled = deck.card
      // console.log(firstDealerCardValue)
      return firstDealerCardValue;
    }
    //The function gives me access to the value of the suit pulled by the dealer for the first card
    function dealerFirstCardSuitValue(){
      deck.getSuit()
      firstDealerSuit = deck.suitValue
      // console.log(firstDealerSuit)
      return firstDealerSuit;
    }
    //The function gives me access to the numeric value of the card pulled by the dealer for the second card
    function dealerSecondCardNumValue(){
      deck.getCardValue()
      secondDealerCardValue = deck.cardValue
      secondDealerCardPulled = deck.card
      // console.log(secondDealerCardValue)
      return secondDealerCardValue;
    }
    //The function gives me access to the value of the suit pulled by the dealer for the second card
      function dealerSecondCardSuitValue(){
      secondDealerSuit = deck.suitValue
      // console.log(secondDealerSuit)
      return secondDealerSuit;
    }
    //Card Images to appear for Player
      function firstCardImage(){
        var firstCardImg = $('<img id="card-one" src="images/PNG-cards-1.3/' + firstCardPulled + '_of_' + firstCardSuit +'.png">')
        firstCard.append(firstCardImg)
      }
      function secondCardImage(){
        var secondCardImg = $('<img id="card-two" src="images/PNG-cards-1.3/' + secondCardPulled + '_of_' + secondCardSuit +'.png">')
        firstCard.append(secondCardImg)
      }
      function hitCardImage(){
        var hitCardImg = $('<img id="card-hit" src="images/PNG-cards-1.3/' + hitCardPulled + '_of_' + hitSuitValue +'.png">')
        firstCard.append(hitCardImg)
      }

      //Card Image to appear for Dealer
      function dealerCardImage(){
        var dealerCardImg = $('<img id="shown-DealerCard" src="images/PNG-cards-1.3/' + firstDealerCardPulled + '_of_' + firstDealerSuit +'.png">')
        dealerCard.append(dealerCardImg)
      }
      function backOfDealerCardImage(){
        var backOfCard = $('<img id="hidden-DealerCard" src="./images/playing-card-back.jpg">')
        dealerCard.append(backOfCard)
      }
      function dealerCardImgHidden(){
        var backOfCard = $("#hidden-DealerCard")
        backOfCard.remove()
        var dealerCardImgHid = $('<img id="shown-DealerCard" src="images/PNG-cards-1.3/' + secondDealerCardPulled + '_of_' + secondDealerSuit +'.png">')
        dealerCard.append(dealerCardImgHid)
      }

      function dealerHitCardImage(){
        var dealerHitCardImg = $('<img id="shown-DealerCard" src="images/PNG-cards-1.3/' + dealerHitCardPulled + '_of_' + dealerHitSuitValue +'.png">')
        dealerCard.append(dealerHitCardImg)
      }

})
