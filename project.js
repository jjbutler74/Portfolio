$(document).ready(function() {
	
    // Navbar tracks scrolling (Add scrollspy to <body>)
    $('body').scrollspy({
        target: ".navbar",
        offset: 50
    });

    // Add smooth scrolling on all links inside the navbar
	$(".slow-scroll a").on('click', function(event) {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 800, function() {
            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
        });
    });

    // Close compressed nav bar on selection
    $(function() {
        $('.nav a').on('click', function() {
            if ($('.navbar-toggle').css('display') != 'none') {
                $(".navbar-toggle").trigger("click");
            }
        });
    });

	// Activate wow
	new WOW().init();
	
	// Get Project from URL
	var projectName = getParameterByName("name");
	
	function getParameterByName(name) {
		var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
		return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
	};
	
	// Put Project Details on Screen
	$.getJSON( "/data/projects.json", function(data) {
		$('#details').append(createDetailHtml(data.projects));
	});
	
	function createDetailHtml(details) {
		var detailHtml = '';
		$.each( details, function( key, value ) {
			if (value.name == projectName)
			{
				detailHtml = detailHtml + '<div class="project-details">';

				
				detailHtml = detailHtml + '<h1>' + value.title + '</h1>';
				detailHtml = detailHtml + '<h3 class="hidden-xs">' + value.description + '</h3>';
				
				detailHtml = detailHtml + '<div class="line-thin"></div>';
				
				detailHtml = detailHtml + '<h4 class="hidden-xs">' + value.caption + '</h4>';
				
				
				$.each( value.screens, function( key2, value2 ) {
					detailHtml = detailHtml + '<div class="row margin-top-20">';
					
					detailHtml = detailHtml + '<div class="col-md-9 col-md-push-3">'
					detailHtml = detailHtml + '<img class="center-block img-responsive" src="' + value2.image + '">';
					detailHtml = detailHtml + '</div>';
					
					detailHtml = detailHtml + '<div class="col-md-3 col-md-pull-9">'
					detailHtml = detailHtml + '<p>' + value2.description + '</p>';
					detailHtml = detailHtml + '</div>';
					
					detailHtml = detailHtml + '</div>';
				});
				
				if (value.final != undefined)
				{
					detailHtml = detailHtml + '<p>' + value.final + '</p>';
				}
				
				detailHtml = detailHtml + '</div>';
				
			}
		});
		return detailHtml;
	}
});