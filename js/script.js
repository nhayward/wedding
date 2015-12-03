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

	if ($(document).scrollTop() <= 45) {
		$('#logo img').data('size','big');
		$('#logo img').height(200);
	} else {
		$('#logo img').data('size','small');
		$('#logo img').height(60);
		$('#logo img').css('background-color', '#000033');
	}

	$("#registry img")
		.mouseover(function() {
			var src = $(this).attr("src").replace("_gray.png", ".png");
			$(this).attr("src", src);
		})
		.mouseout(function() { 
			var src = $(this).attr("src").match(/[^\.]+/) + "_gray.png";
			$(this).attr("src", src);
		});

	clickOnEnter();
});

function clickOnEnter() {
    $('[name=code]').keypress(function(e) {
        if (e.which == 13) {
            $('#submit').click();
            $("#submit").prop("disabled", true);
            $('[name=code]').unbind("keypress");
        }
    });
}

function whichForm(numParty) {
	if (numParty == 1) {
		return '<div id="rsvpForm">' +
					'<input type="text" name="exclamation" placeholder="Exclamation" autofocus>!<br />' +
					'I am <input type="text" name="introAdjective" placeholder="Adjective"> to hear about your upcoming nuptials!<br />' +
					'<input type="text" name="names" placeholder="Guest Name" maxlength="500" required/> is ' +
					'<input type="text" name="adjective" placeholder="Adjective"> to ' +
					'<select name="attendance" required>' +
				 		'<option value="" disabled selected>Select</option>' +
				 		'<option value="attend">attend</option>' +
						'<option value="miss">miss</option>' +
					'</select> the celebration. I can\'t eat ' +
					'<input type="text" name="dietaryRestriction" placeholder="Dietary Restrictions" maxlength="500">.<br />' +
					'I will only dance if I hear ' +
					'<input type="text" name="songRequest" placeholder="Song/Artist" maxlength="500">. I ' +
					'<select name="shuttle">' +
						'<option value="" disabled selected>Select</option>' +
						'<option value="would like">would like</option>' +
						'<option value="will not need">will not need</option>' +
						'<option value="may need">may need</option>' +
					'</select> a seat on the shuttle from the hotel, if possible.<br />' +
					'<input type="submit" value="I\'m ready for you to see my answer!">' +
				'</div>';
	} else {
		return '<div id="rsvpForm">' +
					'We are <input type="text" name="introAdjective" placeholder="Adjective"> to hear about your upcoming nuptials!<br />' +
					'<input type="text" name="names" placeholder="Guest Names" maxlength="500" required/> is/are ' +
					'<input type="text" name="adjective" placeholder="Adjective"> to ' +
					'<select name="attendance" required>' +
				 		'<option value="" disabled selected>Select</option>' +
				 		'<option value="attend">attend</option>' +
						'<option value="miss">miss</option>' +
					'</select> the celebration. There are ' +
					'<input type="number" name="number" min="0" max="5" placeholder="#" required/> people in our party. ' +
					'<input type="number" name="numberFood" min="0" max="5" placeholder="#"> of us can\'t eat ' +
					'<input type="text" name="dietaryRestriction" placeholder="Dietary Restrictions" maxlength="500">.<br />' +
					'We will only dance if we hear ' +
					'<input type="text" name="songRequest" placeholder="Song/Artist" maxlength="500">. I/We ' +
					'<select name="shuttle">' +
						'<option value="" disabled selected>Select</option>' +
						'<option value="would like">would like</option>' +
						'<option value="will not need">will not need</option>' +
					'</select> a seat on the shuttle from the King\'s Port Inn, if possible.<br />' +
					'<input type="submit" value="I\'m ready for you to see my answer!">' +
				'</div>';
	}
}

function postContactToGoogle() {
	$("#submit").prop("disabled", true);
	var code = $('[name=code]').val();
	var valid = false;
	var rsvpd = false;
	var name = "";
	var numInParty = 0;
	var url1 = 'https://spreadsheets.google.com/feeds/list/1_gjZsuyP6N4RUyFzogFlbLQRBc90uHNJKycGuIBHEwg/1/public/values?alt=json';
	$.getJSON(url1).success(function(data) {
		var guests = data.feed.entry;
		for (var i = 0; i < guests.length; i++) {
			if (code == guests[i].gsx$code.$t) {
				valid = true;
				name = guests[i].gsx$name.$t;
				numInParty = guests[i].gsx$numberinparty.$t;
				break;
			}	
		}
		var url2 = 'https://spreadsheets.google.com/feeds/list/1_gjZsuyP6N4RUyFzogFlbLQRBc90uHNJKycGuIBHEwg/2/public/values?alt=json';
		$.getJSON(url2).success(function(data) {
			var responses = data.feed.entry;
			if (responses) {
				for (var j = 0; j < responses.length; j++) {
					if (code == responses[j].gsx$code.$t) {
						rsvpd = true;
						break;
					}	
				}
			}
			if (valid && !rsvpd) {
				$('#codeEntry p').remove();
				$('#rsvp .content').html(
					'<div id="invite">' +
						'<div id="upper_right"></div>' +
						'<div id="upper_left"></div>' +
						'<div id="lower_left"></div>' +
						'<div id="lower_right"></div>' +
						'<svg width="330" height="75">' +
							'<text y="70" fill="none" stroke="#000033" stroke-width="1" font-size="50">' +
								'You\'re Invited!' +
							'</text>' +
						'</svg>' +
						'<p>Dear ' + name + ',</p>' +
						'<p>Carly Thomas Bornstein &<br />' +
						'Nicholas William Hayward<br />' +
						'together with their families<br />' +
						'invite you to share and celebrate at their wedding</p>' +
						'<p>Saturday, September 24, 2016<br />' +
						'at 4:30 in the afternoon</p>' +
						'<p>The Homestead Farm<br />' +
						'74 Old North Berwick Road<br />' +
						'Lyman, Maine 04002</p>' +
						'<p>Dinner and dancing to follow.<br />' +
						'Semi-Formal (It’s outside, so heels might be a problem!)</p>' +
						'<p>RSVP by [insert date] or we will use at least 4 forms of communication to hassle you.</p><br />' +
					'</div>' +
					'<br /><br />' + whichForm(numInParty)
				);
			    // $.post(
			    // 	"https://script.google.com/macros/s/AKfycbwfBOa4cvvhXfb7Ug3s-A9W2O9Yt13tPdMFzw-LMIAVVjsAqDY/exec",
			    // 	{"Code": code, "Name": name, "Response": code}
			    // );
			} else if (valid && rsvpd) {
		        $('#codeEntry p').remove();
				$('#codeEntry').append('<p>You have already RSVP\'d. Thanks!</p>');
				$("#submit").prop("disabled", false);
				clickOnEnter();
		    } else {
		    	$('#codeEntry p').remove();
				$('#codeEntry').append('<p>Sorry, that code is invalid</p>');
				$("#submit").prop("disabled", false);
				clickOnEnter();
		    }
		});
	});
}

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