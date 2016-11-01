collectioninit = function() {
	
	$("#sitecontainer").attr({
		style: "position: relative;padding: 41px 5vw 41px 5vw;margin-top: 41px;"
	});
	
	getsource = function(){
		code = location.search.slice((location.search.indexOf("=")+1), location.search.indexOf("&"));

		$.post( "https://api.genius.com/oauth/token", {
			"code": code,
			"client_id": "VBCq06AtaVIVjTdXHhSDHBn57vwQPOeQFNB4Q-hpt5eoBxGWdXgjHIlsMt3AXgf5",
			"client_secret": "FZAGoMtQ-d79uPgO-pfnW0Uul-trrQOwMCass4Ly74jPeFl5_l2G0y0CMwaAKLg8LxM6CRNOGKtp-MNzh59rrQ",
			"redirect_uri": "http://www.pumpn.net/mag/badges2.1-weekly-201644/collection/",
			"response_type": "code",
			"grant_type": "authorization_code"
		})
		.done(function( data ) {
			source = data;
			geniusurl = "http://api.genius.com/account?access_token=" + source.access_token;
			geniussource = $.getJSON(geniusurl)
			.done(function() {
				stars = 0;
				find();
				$(".headline")[0].innerHTML = "Hey " + name + "!";
				badgespath = "../badges/";
				insertbadges();
			});
			
			
			
			
			
			
		});
	};
	
	getsource();
	
			   
								   
sorterinit = function() {
	$( ".sortable" ).sortable({
		tolerance: "pointer",
		containment: $("#editbadges"),
		revert: 200,
		revertDuration: 200,
		zIndex: 1,
		deactivate: function( event, ui ) {
			sorting = $( ".sortable" ).sortable( "toArray" );
			console.log($( ".sortable" ).sortable( "toArray" ));
		},
		cursor: "move"
	});
	$( ".sortable" ).disableSelection();
};

sorterinit();
 
done = false;

function initNav() {
   $("#nav .items div").each(function(i) {
      $(this).attr("nav-select", i);
   });
   $("#nav .items").attr("nav-offset", 0);
   navSelect($("#nav .items div[nav-select=\"" + ($("#nav .items").attr("nav-index")) + "\"]"));
   $(document).on("click", "#nav .items div", function() {
      navSelect($(this));
   });
}
function navSelect($this) {
   $("#nav .items div").removeClass("selected");
   $this.addClass("selected");
   var i = $this.attr("nav-select");
   $("#nav .items").attr("nav-index", i);
   var mx = parseInt($("#nav .items").attr("nav-offset"));
   var nx = $this.offset().left /*+ (($this.width())*(1-0.8991066736731477)) */- mx;
   var px = (($(window).width())*0.8991066736731477) / 2;
   var ox = px - nx + (done ? -5: 5); //Not sure why I need this, I think it's something to do with measurement of the font on load.
   $("#nav .items").attr("nav-offset", ox);
   $("#nav .items").css("transform", "translateX(-50%) translateX(" + ox + "px)");
   done = true;
}

initNav();


stickyOffset = $('#nav').offset().top;

$(window).scroll(function(){
	sticky = $('#nav');
	scrolla = $("#body").scrollTop();

	if (scrolla >= (stickyOffset - 41)) {
		sticky.addClass('fixed');
		$('#collectioncontainer').addClass('navisfixed');
	}
	else {
		sticky.removeClass('fixed');
		$('#collectioncontainer').removeClass('navisfixed');
	}
});

// -----------------------------
// NAVIGATION
// -----------------------------


$(document).ready(function() {
	$("#collectionpage").click(function() {
		$( "#badgescontainer" ).animate({
			left: 0
			}, 1000, "easeInOutQuad", function() {
			// Animation complete.
			}
		);

		$( "#editbadges" ).animate({
			left: 0
			}, 1000, "easeInOutQuad", function() {
			// Animation complete.
			}
		);
		
		$( "#savebadges" ).animate({
			left: 0
			}, 1000, "easeInOutQuad", function() {
			// Animation complete.
			}
		);
	});
	$("#editpage").click(function() {
		$( "#badgescontainer" ).animate({
			left: "-100%"
			}, 1000, "easeInOutQuad", function() {
			// Animation complete.
			}
		);

		$( "#editbadges" ).animate({
			left: "-100%"
			}, 1000, "easeInOutQuad", function() {
			// Animation complete.
			}
		);
		
		$( "#savebadges" ).animate({
			left: "-100%"
			}, 1000, "easeInOutQuad", function() {
			// Animation complete.
			}
		);
	});
	$("#savepage").click(function() {
		$( "#badgescontainer" ).animate({
			left: "-200%"
			}, 1000, "easeInOutQuad", function() {
			// Animation complete.
			}
		);

		$( "#editbadges" ).animate({
			left: "-200%"
			}, 1000, "easeInOutQuad", function() {
			// Animation complete.
			}
		);
		
		$( "#savebadges" ).animate({
			left: "-200%"
			}, 1000, "easeInOutQuad", function() {
			// Animation complete.
			}
		);
	});
});

}