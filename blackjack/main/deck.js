var deck = (function(){
  //Varibales to store the amount of suits in deck
  var heartsCount = 13;
  var diamondsCount = 13;
  var spadesCount = 13;
  var clubsCount = 13;

  //Empty array to store the used numbers from deck
  var usedArray = [];
  //Created a variable to see the card pulled
  var cardPulled;
  //Value of the card pulled
  var pulledCardValue = 0;
  //Suit of the card pulled
  var pulledCardSuit = "";

  return {
    card: cardPulled,
    suitValue: pulledCardSuit,
    cardValue: pulledCardValue,
    //Get a random Suit function and subtract the suit from
    getSuit: function(){
      //get a random number between 0-3
      var randomSuitIndex = Math.floor(Math.random() * 4);
        // console.log(randomSuitIndex);

      //Array of possible suits
      suitArray = ["hearts","diamonds","spades","clubs"]
      pulledCardSuit = suitArray[randomSuitIndex];
      this.suitValue = pulledCardSuit;
      // console.log(this.suitValue);


      //Use randomSuitIndex to randomize the selection of suits
      //If a suit is taken then subtract the suit from the amount of possible
      //in the deck, 13.
      if (suitArray[randomSuitIndex] === "hearts"){
        heartsCount--
        if(heartsCount === 0){
          suitArray.pop("hearts")
        }
      } else if(suitArray[randomSuitIndex] === "diamonds"){
        diamondsCount--
        if(diamondsCount === 0){
          suitArray.pop("diamonds")
        }
      } else if(suitArray[randomSuitIndex] === "spades"){
        spadesCount--
        if(spadesCount === 0){
          suitArray.pop("spades")
        }
      } else if(suitArray[randomSuitIndex] === "clubs"){
        clubsCount--
        if(clubsCount === 0 ){
          suitArray.pop("clubs")
        }
      } else{
        console.log("There was an error trying to get the suit")
      }

    },
    //Get a random value of a card
    getCardValue: function(){
      numArray = ["ace","2","3","4","5","6","7","8","9","10","jack","queen","king",
                  "ace","2","3","4","5","6","7","8","9","10","jack","queen","king",
                  "ace","2","3","4","5","6","7","8","9","10","jack","queen","king",
                  "ace","2","3","4","5","6","7","8","9","10","jack","queen","king"]
        // console.log(numArray);
      var randomNumIndex = Math.floor(Math.random() * 52);
        // console.log(numArray[randomNumIndex])
      usedArray.push(numArray[randomNumIndex])
        // console.log(usedArray);
      cardPulled = numArray[randomNumIndex]
      this.card = cardPulled;
        // console.log(cardPulled)
      if(cardPulled === "ace"){
          pulledCardValue = 11;
        } else if(cardPulled === "2"){
          pulledCardValue = 2;
        } else if(cardPulled === "3"){
          pulledCardValue = 3;
        } else if(cardPulled === "4"){
          pulledCardValue = 4;
        } else if(cardPulled === "5"){
          pulledCardValue = 5;
        } else if(cardPulled === "6"){
          pulledCardValue = 6;
        } else if(cardPulled === "7"){
          pulledCardValue = 7;
        } else if(cardPulled === "8"){
          pulledCardValue = 8;
        } else if(cardPulled === "9"){
          pulledCardValue = 9;
        } else{
          pulledCardValue = 10;
        }
          // console.log(pulledCardValue)
          this.cardValue = pulledCardValue
        // return pulledCardValue
          // console.log(this.cardValue);
      }

    };



})();
