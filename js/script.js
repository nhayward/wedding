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
		$('#logo img').height(59);
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
	
	$('#submitCode').prop("disabled", false);

});

var code, name, multiples;

function clickOnEnter() {
    $('[name=code]').keypress(function(e) {
        if (e.which == 13) {
            $('#submitCode').click();
            $('#submitCode').prop("disabled", true);
            $('[name=code]').unbind("keypress");
        }
    });
}

function whichForm(numParty) {
	if (numParty == 1) {
		multiples = false;
		return '<div id="rsvpForm">' +
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
					'</select> a seat on the shuttle from the hotel, if possible.<br />' +
					'<button id="submitForm" type="button" onclick="postContactToGoogle()">I\'m ready for you to see my answer!</button>' +
				'</div>';
	} else {
		multiples = true;
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
					'<button id="submitForm" type="button" onclick="postContactToGoogle()">I\'m ready for you to see my answer!</button>' +
				'</div>';
	}
}

function checkCodeAndGetInvite() {
	$('#submitCode').prop("disabled", true);
	code = $('[name=code]').val();
	var valid = false;
	var rsvpd = false;
	var numInParty = 0;
	var guestSheet = 'https://spreadsheets.google.com/feeds/list/1_gjZsuyP6N4RUyFzogFlbLQRBc90uHNJKycGuIBHEwg/1/public/values?alt=json';
	$.getJSON(guestSheet).success(function(data) {
		var guests = data.feed.entry;
		for (var i = 0; i < guests.length; i++) {
			if (code == guests[i].gsx$code.$t) {
				valid = true;
				name = guests[i].gsx$name.$t;
				numInParty = guests[i].gsx$numberinparty.$t;
				break;
			}	
		}
		var responseSheet = 'https://spreadsheets.google.com/feeds/list/1_gjZsuyP6N4RUyFzogFlbLQRBc90uHNJKycGuIBHEwg/2/public/values?alt=json';
		$.getJSON(responseSheet).success(function(data) {
			var response = "";
			var responses = data.feed.entry;
			if (responses) {
				for (var j = 0; j < responses.length; j++) {
					if (code == responses[j].gsx$code.$t) {
						rsvpd = true;
						response = responses[j].gsx$response.$t;
						break;
					}	
				}
			}
			var invite = 
					'<div id="invite">' +
						'<div id="upper_right"></div>' +
						'<div id="upper_left"></div>' +
						'<div id="lower_left"></div>' +
						'<div id="lower_right"></div>' +
						'<svg width="325" height="80">' +
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
					'</div>';
			if (valid && !rsvpd) {
				$('#codeEntry p').remove();
				$('#rsvp .content').html(invite + whichForm(numInParty));
			} else if (valid && rsvpd) {
		        $('#codeEntry p').remove();
				$('#rsvp .content').html(invite +
					'<div id="rsvpForm">' +
						'<p style="text-align: center;">You have already RSVP\'d. Thanks! See your response below:</p>' +
						'<p>' + response + '</p>' +
					'</div>'
				);
				$('#submitCode').prop("disabled", false);
				clickOnEnter();
		    } else {
		    	$('#codeEntry p').remove();
				$('#codeEntry').append('<p>Sorry, that code is invalid</p>');
				$('#submitCode').prop("disabled", false);
				clickOnEnter();
		    }
		});
	});
}

function postContactToGoogle() {
	if ($('[name=names]').val() && $('[name=attendance]').val() && 
		((multiples && $('[name=number]').val()) || !multiples)) {
		var response = "";
		if (multiples) {
			if ($('[name=introAdjective]').val()) {
				response += "We are " + $('[name=introAdjective]').val() + " to hear about your upcoming nuptials!\n";
			}
			if ($('[name=adjective]').val()) {
				response += $('[name=names]').val() + " is/are " + $('[name=adjective]').val() + " to ";
			} else {
				response += $('[name=names]').val() + " is/are going to ";
			}
			response += $('[name=attendance]').val() + " the celebration. " +
				"There are " + $('[name=number]').val() + " people in our party. ";
			if ($('[name=numberFood]').val() && $('[name=dietaryRestriction]').val()) {
				response += $('[name=numberFood]').val() + " of us can\'t eat " +
					$('[name=dietaryRestriction]').val() + ".\n";
			}
			if ($('[name=songRequest]').val()) {
				response += "We will only dance if we hear " + $('[name=songRequest]').val() + ". ";
			}
			if ($('[name=shuttle]').val()) {
				response += "I/We " + $('[name=shuttle]').val() +
				" a seat on the shuttle from the King\'s Port Inn, if possible.";
			}
		} else {
			if ($('[name=introAdjective]').val()) {
				response += "I am " + $('[name=introAdjective]').val() + " to hear about your upcoming nuptials!\n";
			}
			if ($('[name=adjective]').val()) {
				response += $('[name=names]').val() + " is " + $('[name=adjective]').val() + " to ";
			} else {
				response += $('[name=names]').val() + " is going to ";
			}
			response += $('[name=attendance]').val() + " the celebration. ";
			if ($('[name=dietaryRestriction]').val()) {
				response += "I can\'t eat " + $('[name=dietaryRestriction]').val() + ".\n";
			}
			if ($('[name=songRequest]').val()) {
				response += "I will only dance if I hear " + $('[name=songRequest]').val() + ". ";
			}
			if ($('[name=shuttle]').val()) {
				response += "I " + $('[name=shuttle]').val() +
				" a seat on the shuttle from the King\'s Port Inn, if possible.";
			}
		}
		$('#rsvp .content #rsvpForm').html(
			'<svg width="253" height="75">' +
				'<text y="55" fill="none" stroke="#000033" stroke-width="1" font-size="50">' +
					'Thank You!' +
				'</text>' +
			'</svg>'
		);
		$.post(
			"https://script.google.com/macros/s/AKfycbwfBOa4cvvhXfb7Ug3s-A9W2O9Yt13tPdMFzw-LMIAVVjsAqDY/exec",
			{"Code": code, "Name": name, "Response": response}
		);
	} else {
		alert("Please fill out all required fields");
		$('#rsvpForm input, #rsvpForm select').css("box-shadow", "initial");
		if (!$('[name=names]').val()) {
			$('[name=names]').css("box-shadow", "0 0 3px 1px #CC0000");
		}
		if (!$('[name=attendance]').val()) {
			$('[name=attendance]').css("box-shadow", "0 0 3px 1px #CC0000");
		}
		if (!$('[name=number]').val()) {
			$('[name=number]').css("box-shadow", "0 0 3px 1px #CC0000");
		}
	}
}

$(window).scroll(function() {
	if ($(window).width() > 922) {
	    if($(document).scrollTop() > 45)
	    {
	        if($('#logo img').data('size') == 'big')
	        {
	            $('#logo img').data('size','small');
	            $('#logo img').css('background-color', '#000033');
	            $('#logo img').stop().animate({
	                height:'59px'
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