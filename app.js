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
	
    // Include html file
    $(function() {
        var includes = $('.include');
        jQuery.each(includes, function() {
            var file = $(this).data('include');
            $(this).load(file);
        });
    });

    // Show/Hide extra projects. Better than Bootstarap Collapse, handles double clicks
    $("#more-projects").on("hide.bs.collapse", function() {
        $("#more").html('<span class="glyphicon glyphicon-chevron-down"></span> Show more projects');
    });
    $("#more-projects").on("show.bs.collapse", function() {
        $("#more").html('<span class="glyphicon glyphicon-chevron-up"></span> Show less projects');
    });

    // Show 2nd set of Icons
    $("#target").click(function() {

        $(".icon-plus").animate({
            width: 'toggle'
        });
        $(".icon2").delay(400).animate({
            width: 'toggle'
        });
    });

	// Put Projects on Screen
	var projects;
	$.getJSON( "/data/projects.json", function(data) {
		projects = data.projects;
		$('#projects').append(createProjectHtml(projects, false));
		$('#more-projects').append(createProjectHtml(projects, true));
	});
		
	// Put Quotes on Screen
	$.getJSON( "/data/quotes.json", function(data) {
		$('#quotes').append(createQuoteHtml(data.quotes));
	});
	
	function createProjectHtml(projects, extraProject) {
		var projHtml = '';
		var odd = true;
		$.each( projects, function( key, value ) {
			if (value.extra == extraProject) {
				if (odd)
				{
					projHtml = projHtml + '<div class="col-xs-12 col-md-5 col-lg-4 text-center margin-top-20 col-md-offset-1 col-lg-offset-0">'
				}
				else
				{
					projHtml = projHtml + '<div class="col-xs-12 col-md-5 col-lg-4 text-center margin-top-20">'
				};
				odd = !odd;
				projHtml = projHtml + '<figure class="cap-bot">';
				projHtml = projHtml + '<a href="' + value.link + '">';
				projHtml = projHtml + '<img class="img-square center-block img-thumbnail" src="' + value.image + '" width="325" height="270">';
				projHtml = projHtml + '</a>';
				projHtml = projHtml + '<figcaption>' + value.caption + '</figcaption>';
				projHtml = projHtml + '</figure>';
				projHtml = projHtml + '<div class="caption portfolio-caption">';
				projHtml = projHtml + '<h3>' + value.title + '</h3>';
				projHtml = projHtml + '<p class="hidden-xs">' + value.description + '</p>';
				projHtml = projHtml + '</div>';
				projHtml = projHtml + '</div>';
			};
		});
		return projHtml;
	}
		
	function createQuoteHtml(quotes) {
		var quoteHtml = '';
		var first = true;
		shuffle(quotes);
		$.each( quotes, function( key, value ) {
			if (first)
			{
				quoteHtml = quoteHtml + '<div class="item active">';
				first = false;
			}
			else
			{
				quoteHtml = quoteHtml + '<div class="item">';
			};
			quoteHtml = quoteHtml + '<div class="carousel-content">';
			quoteHtml = quoteHtml + '<div>';
			quoteHtml = quoteHtml + '<h3>' + value.quote + '</h3>';
			
			if (Math.random() < 0.5)
			{
				quoteHtml = quoteHtml + '<p>' + value.attribute + '</p>';
			}
			else
			{
				quoteHtml = quoteHtml + '<p align="center">' + value.attribute + '</p>';
			}
			
			quoteHtml = quoteHtml + '</div>';
			quoteHtml = quoteHtml + '</div>';
			quoteHtml = quoteHtml + '</div>';
		});
		return quoteHtml;
	}
	
	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}
});