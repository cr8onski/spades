/*  Spades by Andy Creighton, May 2015
    Following is a game of spades to test by use my understanding of HTML and
    JavaScript.  It offers a basic (no jokers, no sandbags) one player game
    with barely competent opponents and partner.  
                                                                             */

/*  Spades is a card game ...
                                                                             */

/*  Spades Main controls the flow of the game and acts as the main menu.  Game
    flow is initialize stuff, start game, play round, update game score, and 
    renew.
                                                                             */

/*  This is a test with Git to see what I can learn, and build some confidence */

//to start we can offer two buttons - play or quit - taken care of in the html document
//upon quit we close the window and go home
//upon play:

function spadesMain () {
    //clear buttons
    document.getElementById("cardPileP").innerHTML = "";
    document.getElementById("cardPileNextP").innerHTML = "";
	//  we make four players
	//  player constructor
	function player (name, seat) {
		this.name = name;
		this.seat = seat%4;
		this.hand = [];
		this.spades = [];
		this.clubs = [];
		this.hearts = [];
		this.diamonds = [];
		this.deal = false;
		this.lead = false;
		this.score = 0;
		this.bid = 0;
		this.books = 0;
	}

	var west = new player ("Stinky Pete", 0),
		north = new player ("Woody", 1),
		east = new player ("Evil Emperor Zurg", 2),
		south = new player ("Me", 3);
	document.getElementById("westHand").innerHTML = west.name;
	document.getElementById("northHand").innerHTML = north.name;
	document.getElementById("eastHand").innerHTML = east.name;


	//Skipping until later
	//    we let the user enter his name for the south player
	//document.getElementById("cardPileP").innerHTML = "Please enter you name.";
	//document.getElementById("cardPileNextP").innerHTML = <form><input type="text" name="name"><input type="submit" value="Submit"></form>
	//document.getElementById("")
	var tempName = window.prompt("Enter your name:");
	south.name = (tempName) ? tempName : south.name;
	document.getElementById("southHand").innerHTML = south.name;

	function book (l) {
		this.cardW = -1;	//card from the West player
		this.cardN = -1;	//card from the North player
		this.cardE = -1;	//card from the East player
		this.cardS = -1;	//card from the South player
		this.lead = l;	//Who lead (0-3 for W-S)
	}

	function round () {
		this.books = [];
		this.nsBid = 0;
		this.ewBid = 0;
		this.nsScore = 0;
		this.ewScore = 0;
	}

	//    set any game variables and
	function gameStats (nsScore, ewScore, d, l) {
		this.ns = nsScore;
		this.ew = ewScore;
		this.dealer = d;
		this.leader = l;
		this.rounds = [];
	//    updateNS: function(){ns = ns + north.score + south.score;},
	//    updateEW: function(){ew = ew + east.score + west.score;}
	};
	var game = new gameStats(0, 0, 0, 0);
	//var dealer = 0; - added to gameStats with leader for passing by reference
	//var leader = 0;  don't need leader out here
	// check it worked - document.getElementById("northHand").innerHTML = "Game Score is NS=" + gameScore.ns + " EW=" + gameScore.ew;
	//    begin a round:
	document.getElementById("messages").innerHTML = "testing dealer is " + game.dealer + " and leader is " + game.leader + " before startRound."
	startRound(west, north, east, south, game);
	//document.getElementById("northHand").innerHTML = "Returned from startRound function."
	document.getElementById("messages").innerHTML = "Checking dealer: " + game.dealer + " and leader: " + game.leader + " after return from startRound function."
	/*        dealing:
	/*          distribute
				sort
				display
	/*        mark dealer and leader
			take bids
			1 - 13 books:
				collect
				evaluate
				tally to player
			compare score to bid
			compute new scores
			check for winner:
				yes game
				no next round  */
				
	/*    display scores
		congratulate winner
		prompt play or quit
	*/
}  //end spadesMain

function startRound (west, north, east, south, game) {
//document.getElementById("messages").innerHTML = "Inside startRound function"
/* Array representing a standard deck of 52 cards.  Cards are represented
    by a string of two characters the first being the value and the second
    being the suit.                                                      */
/* New thought - the deck will be four arrays, one of numerical values 0 - 51,
    two of names i.e. Ace of Spades, three of short hand one i.e. AS, and four of 
    short hand two i.e. A&clubs;.  These can be referenced as needed to get the 
    desired result.                                                       */
    var deck = {
        index: [ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12,
                13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
                26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
                39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51],
        name: ["Two of Spades", "Three of Spades", "Four of Spades", "Five of Spades", "Six of Spades", "Seven of Spades", "Eight of Spades", "Nine of Spades", "Ten of Spades", "Jack of Spades", "Queen of Spades", "King of Spades", "Ace of Spades",
               "Two of Clubs", "Three of Clubs", "Four of Clubs", "Five of Clubs", "Six of Clubs", "Seven of Clubs", "Eight of Clubs", "Nine of Clubs", "Ten of Clubs", "Jack of Clubs", "Queen of Clubs", "King of Clubs", "Ace of Clubs",
               "Two of Hearts", "Three of Hearts", "Four of Hearts", "Five of Hearts", "Six of Hearts", "Seven of Hearts", "Eight of Hearts", "Nine of Hearts", "Ten of Hearts", "Jack of Hearts", "Queen of Hearts", "King of Hearts", "Ace of Hearts",
               "Two of Diamonds", "Three of Diamonds", "Four of Diamonds", "Five of Diamonds", "Six of Diamonds", "Seven of Diamonds", "Eight of Diamonds", "Nine of Diamonds", "Ten of Diamonds", "Jack of Diamonds", "Queen of Diamonds", "King of Diamonds", "Ace of Diamonds"],
        sh1: ["2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "0S", "JS", "QS", "KS", "AS",
              "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "0C", "JC", "QC", "KC", "AC",
              "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "0H", "JH", "QH", "KH", "AH", 
              "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "0D", "JD", "QD", "KD", "AD"],
        sh2: ["2&spades;", "3&spades;", "4&spades;", "5&spades;", "6&spades;", "7&spades;", "8&spades;", "9&spades;", "0&spades;", "J&spades;", "Q&spades;", "K&spades;", "A&spades;",
              "2&clubs;", "3&clubs;", "4&clubs;", "5&clubs;", "6&clubs;", "7&clubs;", "8&clubs;", "9&clubs;", "0&clubs;", "J&clubs;", "Q&clubs;", "K&clubs;", "A&clubs;",
              "2&hearts;", "3&hearts;", "4&hearts;", "5&hearts;", "6&hearts;", "7&hearts;", "8&hearts;", "9&hearts;", "0&hearts;", "J&hearts;", "Q&hearts;", "K&hearts;", "A&hearts;", 
              "2&diams;", "3&diams;", "4&diams;", "5&diams;", "6&diams;", "7&diams;", "8&diams;", "9&diams;", "0&diams;", "J&diams;", "Q&diams;", "K&diams;", "A&diams;"],
    },

    i, randnum;
    
//document.getElementById("messages").innerHTML = "Passed startRound variable declarations";
//document.getElementById("messages").innerHTML = "Checking dealer: " + game.dealer + " and leader: " + game.leader + " in startRound before modifications.";

//deal
    //distribute cards randomly to players hands
    for (i = 0; i < 13; i++) {
        randnum = Math.floor(Math.random() * deck.index.length);
        west.hand[i] = deck.index[randnum];
        deck.index.splice(randnum, 1);
        document.getElementById("southHand").innerHTML = deck.index.length;
        randnum = Math.floor(Math.random() * deck.index.length);
        north.hand[i] = deck.index[randnum];
        deck.index.splice(randnum, 1);
        document.getElementById("southHand").innerHTML = deck.index.length;
        randnum = Math.floor(Math.random() * deck.index.length);
        east.hand[i] = deck.index[randnum];
        deck.index.splice(randnum, 1);
        document.getElementById("southHand").innerHTML = deck.index.length;
        randnum = Math.floor(Math.random() * deck.index.length);
        south.hand[i] = deck.index[randnum];
        deck.index.splice(randnum, 1);
        document.getElementById("southHand").innerHTML = deck.index.length;
    }
        
//    document.getElementById("northHand").innerHTML = "You made it past the for loop.";
    
//sort the cards in each hand
    west.hand.sort(function(a,b){return a-b});
    north.hand.sort(function(a,b){return a-b});
    east.hand.sort(function(a,b){return a-b});
    south.hand.sort(function(a,b){return a-b});
    
//display the cards in each hand
    document.getElementById("westHand").innerHTML = "This is West's hand " + west.hand;
    document.getElementById("northHand").innerHTML = "This is North's hand " + north.hand;
    document.getElementById("eastHand").innerHTML = "This is East's hand " + east.hand;
    document.getElementById("southHand").innerHTML = "This is South's hand " + south.hand;
    
/*    document.getElementById("cardPile").innerHTML = "Naming the cards " + deck.name;
    document.getElementById("cardPile").innerHTML = "Short hand 1: " + deck.sh1;
    document.getElementById("cardPile").innerHTML = "Short Hand 2: " + deck.sh2;
*/
    
//mark dealer and leader
    game.dealer++;
    game.leader = 42;
//document.getElementById("messages").innerHTML = "Checking dealer: " + game.dealer + " and leader: " + game.leader + " in startRound after modifying.";
document.getElementById("messages").innerHTML = "The way it stands is that South dealt and it is West's turn.<br>Play a card West.";

//take bids
    /* Temporary fix assign everyone a bid of three.
       Will make up bidding strategies and take the players bid later.
       With help of course!!  */
    west.bid = 3;
    north.bid = 3;
    east.bid = 3;
    south.bid = 3;

//1 - 13 books:
    for (i = 0; i < 13; i++) {
        startBook(west, north, east, south, game);
        
    }  //end of loop of books for the round
}  //end of startRound function

function startBook (west, north, east, south, game) {
/*//just want to test my card spaces
    document.getElementById("westCard").innerHTML = west.hand[12];
    document.getElementById("northCard").innerHTML = north.hand[12];
    document.getElementById("eastCard").innerHTML = east.hand[12];
    document.getElementById("southCard").innerHTML = south.hand[12];
    document.getElementById("westCard").innerHTML = "";
    document.getElementById("northCard").innerHTML = "";
    document.getElementById("eastCard").innerHTML = "";
    document.getElementById("southCard").innerHTML = "";
    document.getElementById("westCard").innerHTML = west.hand[0];
    document.getElementById("northCard").innerHTML = north.hand[1];
    document.getElementById("eastCard").innerHTML = east.hand[2];
    document.getElementById("southCard").innerHTML = south.hand[3];
    document.getElementById("westCard").innerHTML = "";
    document.getElementById("northCard").innerHTML = "";
    document.getElementById("eastCard").innerHTML = "";
    document.getElementById("southCard").innerHTML = "";
//Test over - everyone go home*/

/*    //Think this through
    //We are just handling one book
    var book
    //so we look at the leader and ask for his card
    //for (var i = 0; )
    //trying a do while
    var next = game.leader;
    do {
        switch (next) {
            case 0:
                getCard(west);
                
        }
        next++;
    }
    while (next != leader);
    //then proceed clockwise until each player plays her card
    //once we have the cards we compare and 
    //award the point to the winner who will be the next leader
    //return
*/
}  //end of start book function
