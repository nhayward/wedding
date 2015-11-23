$(document).ready(function() {
	$('a[href^="#"]').on('click', function(event) {
	    var target = $(this).attr('href');
	    if (target.length) {
	        event.preventDefault();
	        $('html, body').animate({
	            scrollTop: $(target).offset().top - 70
	        }, 1000);
	    }
	});
});

function codeSubmit() {
	if (codes.indexOf($('[name=code]').val()) != -1) {
		$('#codeEntry p').remove();
		$('#rsvp .content').html('<svg width="500" height="125"><text x="100" y="80" fill="none" stroke="#000033" stroke-width="1" font-size="50">You\'re Invited!</text></svg>');
	} else {
		$('#codeEntry p').remove();
		$('#codeEntry').append('<p>Sorry, that code is invalid</p>');
	}
}

$(function() {
    $('[name=code]').keypress(function(e) {
        if (e.which == 13) {
            $('#submit').click();
        }
    });
});

$(function(){
	if ($(document).scrollTop() <= 45) {
    	$('#logo img').data('size','big');
    	$('#logo img').height(200);
	} else {
    	$('#logo img').data('size','small');
    	$('#logo img').height(60);
    	$('#logo img').css('background-color', '#000033');
	}
});

$(window).scroll(function(){
	if ($(window).width() > 922) {
	    if($(document).scrollTop() > 45)
	    {
	        if($('#logo img').data('size') == 'big')
	        {
	            $('#logo img').data('size','small');
	            $('#logo img').css('background-color', '#000033');
	            $('#logo img').stop().animate({
	                height:'60px'
	            },500);
	        }
	    }
	    else
	    {
	        if($('#logo img').data('size') == 'small')
	        {
	            $('#logo img').data('size','big');
	            $('#logo img').css('background-color', 'initial');
	            $('#logo img').stop().animate({
	                height:'200px'
	            },500);
	        }  
	    }
	}
});

$(function() {
    $("#registry img")
        .mouseover(function() {
            var src = $(this).attr("src").replace("_gray.png", ".png");
            $(this).attr("src", src);
        })
        .mouseout(function() { 
            var src = $(this).attr("src").match(/[^\.]+/) + "_gray.png";
            $(this).attr("src", src);
        });
});