
// Possible states: "start" (no words shown), "word" (a word is shown), "definition" (the definition is shown)
var state = "start";
var currentWord;
var currentIndex;
var totalDeletions = 0;
var words;

/* Initialization function: */
$(document).ready(function(){

	// Loads data:
	jQuery.get({ url: 'json/words.json', cache: false }).done(function (data) {

		// Saves json data:
		words = data;

		// Allows the simulation to start:
		$(document).on('click touch', handleTouch);

		// Adds a swipe event (to stop a word from showing up again):
		$(document).on('swipe', handleSwipe);

		$(document).on('taphold', () => {
			console.log("hey")
			alert("Total words: " + words.length)
		});

		// Removes JQuery mobile loading message:
		$.mobile.loading().hide();

		// To prevent tap+swipe, we remove bindings on swipe and readd them on mouseup:
		$(document).on("mouseup", handleMouseUp)

	});

});


function handleMouseUp(){
	// Make sure no bindings exist:
	$(document).unbind();
	// Rebinds events:
	$(document).on('click touch', handleTouch);
	$(document).on('swipe', handleSwipe);
	$(document).on('mouseup', handleMouseUp);
}

// Upon swiping during a word, the current word will not be shown again in the future (removes from selection array):
function handleSwipe() {
	// Adds a visual swipe effect:
	$(".wrapper").children()
	.animate(
		{
			"margin-left" : "44vw",
			"opacity": 0
		},
		{
			"duration" : 100,
			"complete" : swipeComplete
	  	}
	);
}

// Function to be called once the swipe animation is over:
function swipeComplete(){
	// Checks if a word is being displayed:
	if (state != "start"){
		// Removes it from the selection array:
		var removed = words.splice(currentIndex, 1);
		totalDeletions += 1;
		// Generates a new word:
		state = "start";
		handleTouch();
	}
}


function handleTouch() {
	// Checks if no words are being displayed:
	if ((state == "start") || (state == "definition")){
		// Samples a word:
		currentIndex = Math.floor( Math.random() * (words.length) );
		currentWord = words[currentIndex];
		createWord();
		state = "word";
	} else if (state == "word"){
		createDefinition();
		state = "definition";
	}

}

function createWord(){
	// Clears current DOM:
	$(".wrapper").empty();
	// Creates word:
	let h1 = $("<h1></h1>").text(capitalize(currentWord.word));
	// Appends to the DOM:
	$(".wrapper").append(h1)
}

function createDefinition(){

	// Case where there's just one meaning:
	if (typeof currentWord.meaning == "string") {
		$(".wrapper").append( $("<h2></h2>").text(punctuate(capitalize(currentWord.meaning))) );
	// Case where there are multiple meanings:
	} else if (Array.isArray(currentWord.meaning)) {
		currentWord.meaning.forEach((meaning, index) => {
			$(".wrapper").append( $("<h2></h2>").text(index+1 + ". " + punctuate(capitalize(meaning))) );
		});
	}

	// Checks if example phrase exists:
	if (currentWord.phrase != undefined) {
		// Case where there's just one example phrase:
		if (typeof currentWord.phrase == "string") {
			$(".wrapper").append( $("<h3></h3>").text("\"" + capitalize(currentWord.phrase) + "\"") );
		// Case where there are multiple phrases:
		} else if (Array.isArray(currentWord.phrase)) {
			currentWord.phrase.forEach(phrase => {
				$(".wrapper").append( $("<h3></h3>").text("\"" + capitalize(phrase) + "\"") );
			});
		}
	}
}

function capitalize(s){
	// Checks if s is really a string:
	if (typeof s !== 'string') return ""
	// Capitalize:
	return s.charAt(0).toUpperCase() + s.slice(1)
}

function punctuate(s){
	// Checks if s is really a string:
	if (typeof s !== 'string') return ""
	// Punctuate:
	if (s.charAt(s.length-1) != ".") s += "."
	return s
}
