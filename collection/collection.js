collectioninit = function() {
	
	getsource = function(){
		code = location.search.slice((location.search.indexOf("=")+1), location.search.indexOf("&"));

		$.post( "https://api.genius.com/oauth/token", {
			"code": code,
			"client_id": "AmeAeHEwCCzFN0n6IgHmyLTzi8PDtVa59s2lajN6zYsORSLBYsn9fTFHX16NREz3",
			"client_secret": "1I2Hw8UkidvHmvRaFzBXSqosrPR8gD4TsVbdLOby97tDOYGN-WM_rNWDkqWcPQ5zfL1wrP8YFpaoIx4NTf6kJg",
			"redirect_uri": "http://www.pumpn.net/mag/badges2.1-weekly-201643/collection/",
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
				insertbadges();
			});
			
			
			
			
			
			
		});
	};
	
	getsource();
	
	
var done = false;
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
   var nx = $this.offset().left + ($this.width() / 2) - mx;
   var px = $(window).width() / 2;
   var ox = px - nx + (done ? -5: 5); //Not sure why I need this, I think it's something to do with measurement of the font on load.
   $("#nav .items").attr("nav-offset", ox);
   $("#nav .items").css("transform", "translateX(-50%) translateX(" + ox + "px)");
   done = true;
}

initNav();


stickyOffset = $('#nav').offset().top;

$("#sitecontainer").scroll(function(){
	sticky = $('#nav');
	scroll = $("#sitecontainer").scrollTop();

	if (scroll >= (stickyOffset - 42)) {
		sticky.addClass('fixed');
	}
	else {
		sticky.removeClass('fixed');
	}
});

}