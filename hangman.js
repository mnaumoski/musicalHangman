var hangmanGame = {
		wordsToPick: {
			"imany": {
					picture: 'imany.jpeg',
					song: 'Take care',
					preview: 'https://open.spotify.com/track/6TMZiMjubhWvNlYfcXrCH1'
			},
			"ayo": {
					picture: 'ayo.jpeg',
					song: 'Down on my knees',
					preview: 'https://open.spotify.com/track/1nBzjMvmvOxNdmNRTnWlVs'

			},
			"anouk": {
					picture: 'anouk.jpeg',
					song: 'Nobodys Wife',
					preview: 'https://open.spotify.com/track/1Q0p30HuN1ADMX2CmPzIvO'

			},
			"adele": {
					picture: 'adele.jpeg',
					song: 'Someone Like You',
					preview: 'https://open.spotify.com/track/4kflIGfjdZJW4ot2ioixTB'
			},
			"nora": {
					picture: 'nora.jpeg',
					song: 'Seven Years',
					preview:'https://open.spotify.com/track/39kuVkJjfRjXqUpAtkDItK'
			},
			"gaga": {
					picture: 'gaga.jpeg',
					song: 'Paper Gangsta',
					preview: 'https://open.spotify.com/track/6VOEk7UZEC21swLWIuHP80'
			},
			"caro": {
					picture: 'caro.jpeg',
					song: 'Night Like This',
					preview: 'https://open.spotify.com/track/4lR79JbogJio3Vbr4fgMAN'
			},
			"zaz": {
					picture: 'zaz.jpeg',
					song: 'Je veux',
					preview: 'https://open.spotify.com/track/41CFzRHUEOdbf0bUOd3PN2'
			}
		},

	wordInPlay: null,
	lettersOfTheWord: [],
	matchedLetters: [],
	guessedLetters: [],
	guessesLeft: 0,
	totalGuesss: 0,
	letterGuessed: null,
	wins: 0,
	setupGame: function() {
			var objKeys = Object.keys(this.wordsToPick); //obj - the object whose enumerable own propeties are to be returned.
			this.wordInPlay = objKeys[Match.floor(Math.random()*objKeys.length)];

			this.lettersOfTheWord = this.wordInPlay.split('');
			this.rebuildWordView();
			this.processUpdateTotalGuesses();
	},
	updatePage: function() {
			if (this.guessesLeft == 0){
					this.restartGame();

			}else {
					this.updateGuesses(letter);
					this.updateMatchedLetters(letter);
					this.rebuildWordView();
					if(this.updateWins() == true) {
						this.restartGame();
				}
			}
	},
	updateGuesses: function (letter) { 
			if((this.guessedLetters.indexOf(letter) == -1) && (this.lettersOfTheWord.indexOf(letter) == -1)) {
				this.guessedLetters.push(letter);
				this.guessesLeft--;
				document.querySelector('guesses-remaining').innerHTML = this.guessesLeft;
				document.querySelector('guessed-letters').innerHTML = this.guessedLetters.join(',');
			}
	},
	processUpdateTotalGuesses: function() {

			this.totalGuesses = this.lettersOfTheWord.length + 5;
			this.guessesLeft  = this.totalGuesses;
			//render the guesses left
			document.querySelector('#guesses-remaining').innerHTML = this.guessesLeft;
	}
	updateMatchedLetters: function(letter) {
			for (var i=0; i < this.lettersOfTheWord.length; i++) {
				if ((letter === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(letter) == -1)) {
						this.matchedLetters.push(letter);

				};
			};

	},
	rebuildWordView: function() {
			var wordView = '';
			for (var i=0, i<this.lettersOfTheWord.length; i++) {
					if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) != -1) {
						wordView+=this.lettersOfTheWord[i];
					}else {
						wordView+='&nbsp;_&nbsp;'
					}
			}
			document.querySelector('#current-word').innerHTML = wordView;
	},
	restartGame: function() {
			document.querySelector('#guessed-letters').innerHTML = '';
			this.wordInPlay = null;
			this.lettersOfTheWord = [];
			this.matchedLetters = [];
			this.guessedLetters = [];
			this.guessesLeft = 0;
			this.totalGuesses = 0;
			this.letterGuessed = null;
			this.setupGame();
			this.rebuildWordView();
	},
	updateWins: function() {
			if (this.matchedLetters.length == 0) {
				var win = false;
			}else{
				var win = true
			}

			for (var i=0; i<this.lettersOfTheWord.length; i++) {
				if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) == -1){
					win = false;
				}
			}
	
			if(win == true) {
				this.wins = this.wins +1;
				document.querySelector('#wins').innerHTML = this.wins;
				document.querySelector('#music').innerHTML = this.wordsToPick[this.wordInPlay].song + " By " + this.wordInPlay;
				document.querySelector('#bandDiv').innerHTML = '<img class="bandImage" src="images/' + this.wordsToPick[this.wordInPlay].picture + '" alt="' + this.wordsToPick[this.wordInPlay].song + '">';
				var audio = new Audio(this.wordsToPick[this.wordInPlay].preview);
				audio.play();

				return true;

			 }else{
			 	return false;
			 }
	}
};

hangmanGame.setupGame();

document.onkeyup = function(event) {
	hangmanGame.letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	hangmanGame.updatePage(hangmanGame.letterGuessed);
}




