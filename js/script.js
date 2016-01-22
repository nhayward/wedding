var safari = (navigator.userAgent.indexOf("Safari") != -1 && 
			  navigator.userAgent.indexOf("Chrome") == -1);

var ieOrEdge = (navigator.userAgent.indexOf('MSIE') != -1 || 
				navigator.appVersion.indexOf('Trident/') != -1 || 
				navigator.userAgent.indexOf('Edge') != -1);

var edge = (navigator.userAgent.indexOf('Edge') != -1);

var firefox = (navigator.userAgent.indexOf("Firefox") != -1 );

var mobile = false;

$(document).ready(function() {
	$('a[href^="#"]').on('click', function(event) {
		var target = $(this).attr('href');
		if (target.length) {
			event.preventDefault();
			$('html, body').animate({
				scrollTop: $(target).offset().top - 88
			}, 1000);
		}
	});

	$('#carousel').slick({
		dots: false,
		infinite: true,
		speed: 1000,
		slidesToShow: 1,
		fade: true,
		cssEase: 'linear',
		autoplay: true,
		autoplaySpeed: 3000
	});

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

	$('#amenities .content iframe').addClass('scrolloff');
    $('#amenities .content #mapContainer').on('click', function () {
        $('#amenities .content iframe').removeClass('scrolloff');
    });

    $("#amenities .content iframe").mouseleave(function () {
        $('#amenities .content iframe').addClass('scrolloff');
    });

	function mobileAndTabletCheck() {
		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))mobile = true})(navigator.userAgent||navigator.vendor||window.opera);
	}

	mobileAndTabletCheck();

	if (mobile || edge) {
		$('#venue, #amenities, #rsvp').css('background-attachment', 'scroll');
	}

	if (!mobile) {
		if ($(document).scrollTop() <= 45) {
			$('#logo img').data('size','big');
			$('#logo img').css('max-height', 200);
			if (safari) {
				$('#logo').width(545);
	            $('#logo img').width('92%');
			}
		} else {
			$('#logo img').data('size','small');
			$('#logo img').css('max-height', 78);
			if (safari) {
				$('#logo').width(200);
				$('#logo').css('background-color', '#000033');
				$('#logo').css('max-height', 88);
	            $('#logo img').width('85.5%');
			}
			$('#logo img').css('background-color', '#000033');
		}
	} else {
		$('#logo img').css('max-height', 78);
		if (safari) {
			$('#logo').width(200);
			$('#logo').css('background-color', '#000033');
			$('#logo').css('max-height', 88);
            $('#logo img').width('85.5%');
		}
		$('#logo img').css('background-color', '#000033');
		$('#wrapper').css('margin-top', 0);
	}

	if (mobile && !safari) {
		$('.nav-item').css('min-height', 44);
		$('#logo').css('background-color', '#000033');
	}

	if (firefox) {
		$('#logo').width('100%');
		$('#logo').width('initial');
	}

	if (!mobile) {
		document.querySelector('style').textContent += 
			'@media screen and (max-width: 922px) {' +
			 	'#logo {' +
			 		'display: none !important;' +
			 	'}' +
			'}';
	}

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
					'Dear Nick and Carly,<br />' +
					'I am <input type="text" name="introAdjective" placeholder="Adjective"> to hear about your upcoming nuptials!<br />' +
					'<input type="text" name="names" placeholder="Your Name *" maxlength="500" required/> is ' +
					'<input type="text" name="adjective" placeholder="Adjective"> to ' +
					'<select name="attendance" required>' +
				 		'<option value="" disabled selected>Select *</option>' +
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
					'</select> a seat on the shuttle from the hotel.<br />' +
					'Sincerely,<br />' + name + '<br />' +
					'<button id="submitForm" type="button" onclick="postContactToGoogle()">RSVP</button>' +
				'</div>';
	} else {
		multiples = true;
		return '<div id="rsvpForm">' +
					'Dear Nick and Carly,<br />' +
					'We are <input type="text" name="introAdjective" placeholder="Adjective"> to hear about your upcoming nuptials!<br />' +
					'<input type="text" name="names" placeholder="Your Names *" maxlength="500" required/> is/are ' +
					'<input type="text" name="adjective" placeholder="Adjective"> to ' +
					'<select name="attendance" required>' +
				 		'<option value="" disabled selected>Select *</option>' +
				 		'<option value="attend">attend</option>' +
						'<option value="miss">miss</option>' +
					'</select> the celebration. There is/are ' +
					'<input type="number" name="number" min="0" max="5" placeholder="# *" required/> attendee(s) in our party. ' +
					'<input type="number" name="numberFood" min="0" max="5" placeholder="#"> of us can\'t eat ' +
					'<input type="text" name="dietaryRestriction" placeholder="Dietary Restrictions" maxlength="500">.<br />' +
					'Dancing will only happen if ' +
					'<input type="text" name="songRequest" placeholder="Song/Artist" maxlength="500"> is heard. I/We ' +
					'<select name="shuttle">' +
						'<option value="" disabled selected>Select</option>' +
						'<option value="would like">would like</option>' +
						'<option value="will not need">will not need</option>' +
					'</select> a seat on the shuttle from the King\'s Port Inn.<br />' +
					'Sincerely,<br />' + name + '<br />' +
					'<button id="submitForm" type="button" onclick="postContactToGoogle()">RSVP</button>' +
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
			if (code.toUpperCase() == guests[i].gsx$code.$t.toUpperCase()) {
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
					if (code.toUpperCase() == responses[j].gsx$code.$t.toUpperCase()) {
						rsvpd = true;
						response = responses[j].gsx$response.$t;
						break;
					}	
				}
			}
			var invitedText = "";
			if (!mobile) {
				invitedText += '<svg width="325" height="80">';
				if (ieOrEdge) {
					invitedText += '<text y="70" fill="#000033" font-size="50">';
				} else {
					invitedText += '<text y="70" fill="none" stroke="#000033" stroke-width="1" font-size="50">';
				}
				invitedText += 'You\'re Invited!</text></svg>';
			} else {
				invitedText += '<h2>You\'re Invited!</h2>';
			}
			var invite = 
					'<div id="invite">' +
						'<div id="upper_right"></div>' +
						'<div id="upper_left"></div>' +
						'<div id="lower_left"></div>' +
						'<div id="lower_right"></div>' +
						invitedText +
						'<p>Dear ' + name + ',</p>' +
						'<p>Carly Thomas Bornstein &<br />' +
						'Nicholas William Hayward<br />' +
						'together with their families<br />' +
						'invite you to share and celebrate at their wedding</p>' +
						'<p>Saturday, the twenty-fourth of September<br />' +
						'Two thousand and sixteen<br />' +
						'at four-thirty in the afternoon</p>' +
						'<p>The Homestead Farm<br />' +
						'74 Old North Berwick Road<br />' +
						'Lyman, Maine</p>' +
						'<p>Dinner and dancing to follow<br />' +
						'Semi-Formal (It’s outside, so heels might be a problem!)</p>' +
					'</div>' +
					'<h3>Response Card</h3>' +
					'<p><b>Please respond by September 1, 2016 or we will use at least four forms of communication to hassle you.</b></p><br />';
			if (valid && !rsvpd) {
				$('#codeEntry p').remove();
				$('#rsvp .content').html(invite + whichForm(numInParty) + 
											'<p><i>Fields with a * are required</i></p>'
										);
			} else if (valid && rsvpd) {
		        $('#codeEntry p').remove();
				$('#rsvp .content').html(invite +
					'<div id="rsvpForm">' +
						'<p style="text-align: center;"><b>You have already sent us your RSVP card, thank you! See below to review your response:</b></p>' +
						'<p>Dear Nick and Carly,</p>' +
						'<p>' + response + '</p>' +
						'<p>Sincerely,<br />' +
						name + '</p>' +
						'<p><i>Contact nhayward2011@gmail.com if you need to make a change.</i></p>' +
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
				"There is/are " + $('[name=number]').val() + " attendee(s) in our party. ";
			if ($('[name=numberFood]').val() && $('[name=dietaryRestriction]').val()) {
				response += $('[name=numberFood]').val() + " of us can\'t eat " +
					$('[name=dietaryRestriction]').val() + ".\n";
			}
			if ($('[name=songRequest]').val()) {
				response += "Dancing will only happen if " + $('[name=songRequest]').val() + " is heard. ";
			}
			if ($('[name=shuttle]').val()) {
				response += "I/We " + $('[name=shuttle]').val() +
				" a seat on the shuttle from the King\'s Port Inn.";
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
				" a seat on the shuttle from the King\'s Port Inn.";
			}
		}
		var thankText = "";
		if (!mobile) {
			thankText += '<svg width="253" height="75">';
			if (ieOrEdge) {
				thankText += '<text y="55" fill="#000033" font-size="50">';
			} else {
				thankText += '<text y="55" fill="none" stroke="#000033" stroke-width="1" font-size="50">';
			}
			thankText += 'Thank You!</text></svg>';
		} else {
			thankText += '<h2>Thank You!</h2>';
		}
		$('#rsvp .content p:last-child').remove();
		$('#rsvp .content #rsvpForm').html(
			thankText +
			'<p><b>Your response:</b></p>' +
			'<p>Dear Nick and Carly,</p>' +
			'<p>' + response + '</p>' +
			'<p>Sincerely,<br />' +
			name + '</p>' +
			'<p><b>You can review your response at any time by coming back and inputting your code.</b></p>' +
			'<p><i>Contact nhayward2011@gmail.com if you need to make a change.</i></p>'
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

if (!mobile) {
	$(window).scroll(function() {
		if ($(window).width() > 922) {
		    if($(document).scrollTop() > 45)
		    {
		        if($('#logo img').data('size') == 'big')
		        {
		        	if (safari) {
		        		$('#logo img').data('size','small');
			            $('#logo img').css('background-color', '#000033');
						$('#logo img').css('max-height', 78);
			            $('#logo').width(200);
			            $('#logo').css('background-color', '#000033');
						$('#logo').css('max-height', 88);
			            $('#logo img').width('85.5%');
		        	} else {
			            $('#logo img').data('size','small');
			            $('#logo img').css('background-color', '#000033');
			            $('#logo img').stop().animate({
			                'max-height':'78px'
			            },500);
		        	}
		        }
		    } else {
		        if($('#logo img').data('size') == 'small')
		        {
		        	if (safari) {
		        		$('#logo img').data('size','big');
			            $('#logo img').css('background-color', 'initial');
			            $('#logo').width(545);
			            $('#logo img').width('92%');
						$('#logo img').css('max-height', 200);
		        	} else {
			            $('#logo img').data('size','big');
			            $('#logo img').css('background-color', 'initial');
			            $('#logo img').stop().animate({
			                'max-height':'200px'
			            },500);
		        	}
		        }  
		    }
		}
	});
}
