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
    $('#logo img').data('size','big');
});

$(window).scroll(function(){
    if($(document).scrollTop() > 0)
    {
        if($('#logo img').data('size') == 'big')
        {
            $('#logo img').data('size','small');
            $('#logo img').stop().animate({
                height:'58px'
            },600);
        }
    }
    else
    {
        if($('#logo img').data('size') == 'small')
        {
            $('#logo img').data('size','big');
            $('#logo img').stop().animate({
                height:'150px'
            },600);
        }  
    }
});