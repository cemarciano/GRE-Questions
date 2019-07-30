
// Possible states: "start" (no words shown), "word" (a word is shown), "definition" (the definition is shown)
var state = "start";
var currentWord;
var words;

/* Initialization function: */
$(document).ready(function(){

	// Loads data:
	jQuery.get({ url: 'json/words.json', cache: false }).done(function (data) {

		// Saves json data:
		words = data;

		// Allows the simulation to start:
		$(document).on('click touch', handleTouch);

	});

});


function handleTouch() {
	// Checks if no words are being displayed:
	if ((state == "start") || (state == "definition")){
		// Samples a word:
		currentWord = words[Math.floor(Math.random() * words.length)];
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
