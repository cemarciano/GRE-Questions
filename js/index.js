
const horizontalScale = 6;

/* Initialization function: */
$(document).ready(function(){

	// Loads data:
	jQuery.get({ url: 'data.json', cache: false }).done(function (data) {
		// Creates a progress bar:
		data[0]["manhattan"].forEach(section => {
			console.log(section.completed/section.total)
			$("#all-progress-bars").append( createProgressBar(section.name, (section.completed/section.total)*100+"%", section.total*horizontalScale+"px") );
		});
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
