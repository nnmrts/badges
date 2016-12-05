function successcall1(data) {
	geniussource = {};
	geniussource.responseJSON = data;
	doit();
	$(".headline")[0].innerHTML = "Hey " + name + "!";

	localStorage.setItem("access_token", localStorage.getItem("access_token"));
	localStorage.setItem("tokentime", jQuery.now());
}

function successcall2(data) {
	source = data;
	geniusurl = "https://api.genius.com/account?access_token=" + source.access_token;
	getgeniussource();
}

function getgeniussource() {
	window.history.replaceState({}, document.title, currentpath);
	$.ajax({
		url: geniusurl,
		dataType: 'json',
		type: 'GET',
		success: successcall1
	});
}

function getsource() {
	code = location.search.slice((location.search.indexOf("=") + 1), location.search.indexOf("&"));

	$.ajax({
		url: 'https://api.genius.com/oauth/token',
		dataType: 'json',
		type: 'POST',
		data: {
			"code": code,
			"client_id": "rGoLmLmJDZkIynkbytsVHLYICi-102p4OGqjMUPoIktV0xjvP66rR1ZT3_CuM3XQ",
			"client_secret": "AyXqdRzvM3y4tXKGj95pnSTnFO62pYD6SZEi56TBhCyCQC_XU2SCQbzvFOFQT48zQfbOm7-ZGYPuW4G5VRCaDw",
			"redirect_uri": collectionpath,
			"response_type": "code",
			"grant_type": "authorization_code"
		},
		success: function(data) {
			source = data;
			localStorage.setItem("access_token", source.access_token);
			geniusurl = "https://api.genius.com/account?access_token=" + source.access_token;
			getgeniussource();
		}
	})
}

$( document ).ajaxError(function( event, jqxhr, settings, thrownError ) {
  if ( settings.url == "https://api.genius.com/oauth/token" ) {
    geniusurl = "https://api.genius.com/account?access_token=" + localStorage.getItem("access_token");
	getgeniussource();
  }
});


sorterinit = function () {
	sortable = Sortable.create($(".sortable")[0], {
		/*$( ".sortable" ).sortable({*/
		tolerance: "pointer",
		containment: $("#editbadges"),
		helper: "clone",
		revert: 200,
		revertDuration: 200,
		animation: 1000,
		forceFallback: true,
		scroll: $("#editbadges")[0],
		chosenClass: 'sortable-chosen',
		ghostClass: 'sortable-ghost',
		onStart: function ( /**Event*/ evt) {
			hoverEnabled = 0;
			footer = $("#editbadges")[0].lastElementChild.lastElementChild;
			if (footer.id == "smallfooter") {
				$(footer).fadeOut(200);
			}
		},
		/*
				onClone: function (evt) {
					footer = $("#editbadges")[0].lastElementChild.lastElementChild;
					if (footer.id == "smallfooter") {
						footer.parentNode.removeChild(footer);
					}
				},*/
		onMove: function (evt) {
			footer = $("#editbadges")[0].lastElementChild.lastElementChild;
			if (footer.id == "smallfooter") {
				$(footer).fadeOut(200);
			}
		},
		onEnd: function ( /**Event*/ evt) {
			hoverEnabled = 1;
			footer = $("#editbadges")[0].children[evt.newIndex].lastElementChild;
			if (footer != undefined || footer.id == "smallfooter") {
				$(footer).fadeIn(200);
			}
			mapObj = {
				'class="badgebox ui-state-default"': 'class="badgebox"',
				'li': 'div'
			};

			html_badgescontainer.innerHTML = html_editbadges.innerHTML.replace(/class="badgebox ui-state-default"|li/g, function (matched) {
				return mapObj[matched];
			});

			dom2object();
			object2dom();
		},
		store: {
			/**
			 * Get the order of elements. Called once during initialization.
			 * @param   {Sortable}  sortable
			 * @returns {Array}
			 */
			get: function (sortable) {
				order = localStorage.getItem(sortable.options.group.name);
				return order ? order.split('|') : [];
			},

			/**
			 * Save the order of elements. Called onEnd (when the item is dropped).
			 * @param {Sortable}  sortable
			 */
			set: function (sortable) {
				order = sortable.toArray();
				localStorage.setItem(sortable.options.group.name, order.join('|'));
			}
		},
		/*
		start: function(e, ui){
        $(ui.placeholder).hide(300);
			},
		change: function (e,ui){
			$(ui.placeholder).hide().show(300);
		},
		*/
		zIndex: 1,
		items: "> li",
		deactivate: function (event, ui) {
			sorting = $(".sortable").sortable("toArray");
			console.log($(".sortable").sortable("toArray"));

			mapObj = {
				'class="badgebox ui-state-default"': 'class="badgebox"',
				'li': 'div'
			};

			html_badgescontainer.innerHTML = html_editbadges.innerHTML.replace(/class="badgebox ui-state-default"|li/g, function (matched) {
				return mapObj[matched];
			});

			dom2object();
			object2dom();
		},
		cursor: "move"
			/*});*/
	});
	$(".sortable").disableSelection();
};

Drag = function (subject) {
	var dative = this,
		handle,
		dragClickOffsetX,
		dragClickOffsetY,
		lastDragX,
		lastDragY;

	subject.draggable = true;

	dative.styleHandle(subject);

	subject.addEventListener('dragstart', function (e) {
		handle = dative.makeHandle(subject);

		dragClickOffsetX = e.layerX;
		dragClickOffsetY = e.layerY;

		this.style.opacity = 0;
	});

	subject.addEventListener('drag', function (e) {
		var useX = e.x,
			useY = e.y;

		// Odd glitch
		if (useX === 0 && useY === 0) {
			useX = lastDragX;
			useY = lastDragY;
		}

		if (useX === lastDragX && useY === lastDragY) {
			return;
		}

		dative.translate(useX - dragClickOffsetX, useY - dragClickOffsetY, handle, subject);

		lastDragX = useX;
		lastDragY = useY;
	});

	subject.addEventListener('dragend', function (e) {
		this.style.opacity = 1;

		handle.parentNode.removeChild(handle);
	});
};

done = false;

getChildrenIndex = function (ele) {
	//IE use Element.sourceIndex
	if (ele.sourceIndex) {
		var eles = ele.parentNode.children;
		var low = 0,
			high = eles.length - 1,
			mid = 0;
		var esi = ele.sourceIndex,
			nsi;
		//use binary search algorithm
		while (low <= high) {
			mid = (low + high) >> 1;
			nsi = eles[mid].sourceIndex;
			if (nsi > esi) {
				high = mid - 1;
			}
			else if (nsi < esi) {
				low = mid + 1;
			}
			else {
				return mid;
			}
		}
	}
	//other browsers
	var i = 0;
	while (ele = ele.previousElementSibling) {
		i++;
	}
	return i;
}

initNav = function () {
	$("#nav .items div").each(function (i) {
		$(this).attr("nav-select", i);
	});
	$("#nav .items").attr("nav-offset", 0);
	navSelect($("#nav .items div[nav-select=\"" + ($("#nav .items").attr("nav-index")) + "\"]"));
	$(document).on("click", "#nav .items div", function () {
		navSelect($(this));
	});
};

navSelect = function (navbutton) {
	$("#nav .items div").removeClass("selected");
	navbutton.addClass("selected");
	var i = navbutton.attr("nav-select");
	$("#nav .items").attr("nav-index", i);
	var mx = parseInt($("#nav .items").attr("nav-offset"));
	var nx = navbutton.offset().left /*+ ((navbutton.width())*(1-0.8991066736731477)) */ - mx;
	var px = (($(window).width()) * 0.8991066736731477) / 2;
	var ox = px - nx + (done ? -5 : 5); //Not sure why I need this, I think it's something to do with measurement of the font on load.
	$("#nav .items").attr("nav-offset", ox);
	$("#nav .items").css("transform", "translateX(-50%) translateX(" + ox + "px)");
	done = true;
};

calcoffset = function (jQueryElement) {
	stickyOffsetTop = $('#nav').offset().top;
	stickyOffsetLeft = $('#nav').offset().left;
}

// -----------------------------
// ADDING
// -----------------------------

bind1 = function () {
	html_add.onclick = function () {

	};
};

// -----------------------------
// SAVING
// -----------------------------

bind2 = function () {
	html_save.onclick = function () {
		phpcollection = new FormData();
		phpcollection.append("phplogin", login.toUpperCase().replace(/\s+/g, "-"));
		phpcollection.append("phpcollection", "collectionobject = " + JSON.stringify(collectionobject) + ";");
		xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP");
		xhr.open('post', window.location.origin + window.location.pathname.slice(0, nthIndex(currentpath, "/", 3) + 1) + "savecollection.php", true);
		xhr.send(phpcollection);
		console.log("saved collection on server");

		urlarray = [];

		z = 0;

		while (z < collectiondom.children.length) {
			urlarray.push(collectiondom.children[z].firstChild.src.slice(0, collectiondom.children[z].firstChild.src.indexOf("500px")) + "170px.png");
			z = z + 1;
		}

		realstart = "<table><tbody>";

		littlestart = "<tr>";

		itemstart = "<td><img src='";

		itemend = "'></td>";

		littleend = "</tr>";

		realend = "</tbody></table>";

		if (urlarray.length === 0) {
			gentexthtml = "This user has no badges. :(";
		}
		if (urlarray.length == 1) {
			gentexthtml = realstart + littlestart;
			gentexthtml += itemstart + urlarray[0] + itemend;
			gentexthtml += littleend + realend;
		}
		if (urlarray.length == 2) {
			gentexthtml = realstart + littlestart;
			gentexthtml += itemstart + urlarray[0] + itemend;
			gentexthtml += itemstart + urlarray[1] + itemend;
			gentexthtml += littleend + realend;
		}
		if (urlarray.length == 3) {
			gentexthtml = realstart + littlestart;
			gentexthtml += itemstart + urlarray[0] + itemend;
			gentexthtml += itemstart + urlarray[1] + itemend;
			gentexthtml += littleend;
			gentexthtml += littlestart;
			gentexthtml += itemstart + urlarray[2] + itemend;
			gentexthtml += littleend + realend;
		}
		if (urlarray.length == 4) {
			gentexthtml = realstart + littlestart;
			gentexthtml += itemstart + urlarray[0] + itemend;
			gentexthtml += itemstart + urlarray[1] + itemend;
			gentexthtml += littleend;
			gentexthtml += littlestart;
			gentexthtml += itemstart + urlarray[2] + itemend;
			gentexthtml += itemstart + urlarray[3] + itemend;
			gentexthtml += littleend + realend;
		}
		if (urlarray.length == 5) {
			gentexthtml = realstart + littlestart;
			gentexthtml += itemstart + urlarray[0] + itemend;
			gentexthtml += itemstart + urlarray[1] + itemend;
			gentexthtml += littleend;
			gentexthtml += littlestart;
			gentexthtml += itemstart + urlarray[2] + itemend;
			gentexthtml += itemstart + urlarray[3] + itemend;
			gentexthtml += littleend;
			gentexthtml += littlestart;
			gentexthtml += itemstart + urlarray[4] + itemend;
			gentexthtml += littleend + realend;
		}
		if (urlarray.length == 6) {
			gentexthtml = realstart + littlestart;
			gentexthtml += itemstart + urlarray[0] + itemend;
			gentexthtml += itemstart + urlarray[1] + itemend;
			gentexthtml += littleend;
			gentexthtml += littlestart;
			gentexthtml += itemstart + urlarray[2] + itemend;
			gentexthtml += itemstart + urlarray[3] + itemend;
			gentexthtml += littleend;
			gentexthtml += littlestart;
			gentexthtml += itemstart + urlarray[4] + itemend;
			gentexthtml += itemstart + urlarray[5] + itemend;
			gentexthtml += littleend + realend;
		}

		gentext = htmlEntities(gentexthtml);
		html_generatedtext.innerHTML = gentext;

		$("#generatedtext").attr({
			style: "display: block;opacity: 0;margin-top:30px"
		});

		$("#generatedtext").animate({
			opacity: 1
		}, 250, $.bez([0.0, 0.0, 0.2, 1]));

	};
};

// ᴍᴀɪɴ ғᴜɴᴄᴛɪᴏɴ
collectioninit = function () {
	jQuery2html("html_", "id");
	
	html_badgesdrawertitle.href = homepath();
	
	pathgenerator("badges");
	pathgenerator("collection");
	pathgenerator("collections");
	pathgenerator("ids");
	
	isnothing = "no";
	collectionhere = 1;

	if (localStorage.getItem("access_token") !== null || window.location.search.indexOf("loggedin") !== -1) {
		getsource();
	}
	else {
		window.location.replace("https://api.genius.com/oauth/authorize?client_id=rGoLmLmJDZkIynkbytsVHLYICi-102p4OGqjMUPoIktV0xjvP66rR1ZT3_CuM3XQ&redirect_uri=http://www.pumpn.net/mag/badges2.1-weekly-201649/collection/&scope=me&state=loggedin&response_type=code");
	}

	sorterinit();

	initNav();

	calcoffset();

	$(".mdl-layout__content").scroll(function () {
		sticky = $('#nav');
		scrolla = $(".mdl-layout__content").scrollTop();

		if (scrolla >= (stickyOffsetTop - 41)) {
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

	$(document).ready(function () {
		$("#collectionpage").click(function () {
			$("#badgescontainer").animate({
				left: 0
			}, 1000, "easeInOutQuint", function () {
				// Animation complete.
			});

			$("#editbadges").animate({
				left: 0
			}, 1000, "easeInOutQuint", function () {
				// Animation complete.
			});

			$("#savebadges").animate({
				left: 0
			}, 1000, "easeInOutQuint", function () {
				// Animation complete.
			});
		});
		$("#editpage").click(function () {
			$("#badgescontainer").animate({
				left: "-100%"
			}, 1000, "easeInOutQuint", function () {
				// Animation complete.
			});

			$("#editbadges").animate({
				left: "-100%"
			}, 1000, "easeInOutQuint", function () {
				// Animation complete.
			});

			$("#savebadges").animate({
				left: "-100%"
			}, 1000, "easeInOutQuint", function () {
				// Animation complete.
			});
		});
		$("#savepage").click(function () {
			$("#badgescontainer").animate({
				left: "-200%"
			}, 1000, "easeInOutQuint", function () {
				// Animation complete.
			});

			$("#editbadges").animate({
				left: "-200%"
			}, 1000, "easeInOutQuint", function () {
				// Animation complete.
			});

			$("#savebadges").animate({
				left: "-200%"
			}, 1000, "easeInOutQuint", function () {
				// Animation complete.
			});
		});
	});

	// -----------------------------
	// ADDING
	// -----------------------------

	bind1();

	// -----------------------------
	// SAVING
	// -----------------------------

	bind2();
}