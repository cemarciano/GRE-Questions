
const horizontalScale = 6;

/* Initialization function: */
$(document).ready(function(){

	// Loads data:
	jQuery.get({ url: 'data.json', cache: false }).done(function (data) {

		data.forEach(book => {
			let div = $("<div></div>").addClass("book");
			// Creates title:
			div.append(
				$("<h1></h1>").text(book.title)
			);
			// Creates progress bars:
			book.sections.forEach(section => {
				div.append( createProgressBar(section.name, (section.completed/section.total)*100+"%", section.total*horizontalScale+"px") );
			});
			// Adds to the DOM:
			$("body").append( div );
		})

	});

});


function createProgressBar(name, perc, pixelSize){
	return $("<div></div>").addClass("progress-wrapper").append(
		[
			$("<span></span>").addClass("progress-text").text(name),
			$("<div></div>").addClass("progress-bar").css("width", pixelSize).append(
				$("<span></span>").addClass("bar").append(
					$("<span></span>").addClass("progress").css("width", perc)
				)
			)
		]
	)
}
