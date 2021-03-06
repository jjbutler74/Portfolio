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
			if (value.name == projectName && projectName != null)
			{
				detailHtml = detailHtml + '<div class="container">'
				detailHtml = detailHtml + '<div class="project-details">';
				detailHtml = detailHtml + '<div class="wow fadeInDown">'
				detailHtml = detailHtml + '<h1>' + value.title + '</h1>';
				detailHtml = detailHtml + '<h3 class="hidden-xs">' + value.description + '</h3>';
				detailHtml = detailHtml + '<div class="line-thin"></div>';
				detailHtml = detailHtml + '<h4 class="hidden-xs">' + value.caption + '</h4>';
				detailHtml = detailHtml + '</div>';
				
				detailHtml = detailHtml + '<div class="wow fadeIn">';
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
				detailHtml = detailHtml + '</div>';
				detailHtml = detailHtml + '</div>';
			}
		});

		if (detailHtml == '')
		{
			detailHtml = detailHtml + '<h1>Nothing to see here.</h1>';
			detailHtml = detailHtml + '<h5>Just click the "jasonbutler.com" link above.</h5>';
		}
		
		detailHtml = detailHtml + '<div class="margin-top-20">'
		detailHtml = detailHtml + '<footer id="pagefooter">'
		detailHtml = detailHtml + '<div class="line-thin"></div>'
		var year = new Date().getFullYear();
		detailHtml = detailHtml + '<p><span class="glyphicon glyphicon-copyright-mark"></span> ' + year + '</span> <a class="nounderline black" href="http://jasonbutler.com/">Jason Butler</a></p>'
		detailHtml = detailHtml + '</footer>'
		return detailHtml;
	}
});