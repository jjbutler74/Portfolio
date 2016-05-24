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
	$.getJSON( "/data/details.json", function(data) {
		$('#details').append(createDetailHtml(data.details));
	});
	
	function createDetailHtml(details) {
		var detailHtml = '';
		$.each( details, function( key, value ) {
			if (value.name == projectName)
			{
				detailHtml = detailHtml + '<h1>' + value.title + '</h1>';
				$.each( value.screens, function( key2, value2 ) {
					detailHtml = detailHtml + '<img class="img-square center-block img-thumbnail" src="' + value2.image + '">';
					detailHtml = detailHtml + '<h3>' + value2.description + '</h3>';
				});
				
				
				
			}
		});
		return detailHtml;
	}
});