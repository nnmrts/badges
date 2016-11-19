// ᴍᴀɪɴ ғᴜɴᴄᴛɪᴏɴ
collectioninit = function() {	
	html_loading = document.getElementById("loading");
	
	html_smallfooter = document.getElementById("smallfooter");
	
	html_add = document.getElementById("add");	
	$("#sitecontainer").attr({
		style: "position: relative;padding: 41px 5vw 41px 5vw;margin-top: 41px;"
	});	
	getsource = function() {
		code = location.search.slice((location.search.indexOf("=") + 1), location.search.indexOf("&"));		
		$.post("https://api.genius.com/oauth/token", {
				"code": code,
				"client_id": "LuWjcKRaYYtvXzePOpw5reD0PZ-sFqhNIlxOuLcHEHimuUrDThK09sM94NvBTuMT",
				"client_secret": "dbC3zPzTzs9wdCwJ1vxhTm8WhrP5GYBM2JoeeCYohebFIlJlAcw8u-h2-WjXaMVOfGxnm-n76wLKWHa1Dhphuw",
				"redirect_uri": "http://www.pumpn.net/mag/badges2.1-weekly-201646/collection/",
				"response_type": "code",
				"grant_type": "authorization_code"
			})
			.done(function(data) {
				source = data;
				geniusurl = "http://api.genius.com/account?access_token=" + source.access_token;
				geniussource = $.getJSON(geniusurl)
					.done(function() {
						stars = 0;
						find();
						$(".headline")[0].innerHTML = "Hey " + name + "!";
						badgespath = "../badges/";
						insertbadges();
						$("#loadingcontainer").fadeOut(1000, function() {
							$("#loadingcontaineroverlay").fadeOut(1000, function() {});
						});

						badgesarray = [];

						$("#badgescontainer > .badgebox").each(function() {
							badgesarray.push($(this).attr("id"));
						});
					});
			});
	};	
	getsource();	
	placeholderNumber = 0;	
	sorterinit = function() {
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
			onStart: function( /**Event*/ evt) {
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
			onMove: function(evt) {
				footer = $("#editbadges")[0].lastElementChild.lastElementChild;
				if (footer.id == "smallfooter") {
					$(footer).fadeOut(200);
				}
			},
			onEnd: function( /**Event*/ evt) {
				hoverEnabled = 1;
				footer = $("#editbadges")[0].children[evt.newIndex].lastElementChild;
				if (footer != undefined || footer.id == "smallfooter") {
					$(footer).fadeIn(200);
				}
				mapObj = {
					'class="badgebox ui-state-default"': 'class="badgebox"',
					'li': 'div'
				};

				html_badgescontainer.innerHTML = html_editbadges.innerHTML.replace(/class="badgebox ui-state-default"|li/g, function(matched) {
					return mapObj[matched];
				});
			},
			store: {
				/**
				 * Get the order of elements. Called once during initialization.
				 * @param   {Sortable}  sortable
				 * @returns {Array}
				 */
				get: function(sortable) {
					order = localStorage.getItem(sortable.options.group.name);
					return order ? order.split('|') : [];
				},

				/**
				 * Save the order of elements. Called onEnd (when the item is dropped).
				 * @param {Sortable}  sortable
				 */
				set: function(sortable) {
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
			deactivate: function(event, ui) {
				sorting = $(".sortable").sortable("toArray");
				console.log($(".sortable").sortable("toArray"));

				mapObj = {
					'class="badgebox ui-state-default"': 'class="badgebox"',
					'li': 'div'
				};

				html_badgescontainer.innerHTML = html_editbadges.innerHTML.replace(/class="badgebox ui-state-default"|li/g, function(matched) {
					return mapObj[matched];
				});
			},
			cursor: "move"
				/*});*/
		});
		$(".sortable").disableSelection();
	};	
	sorterinit();	
	Drag = function(subject) {
		var dative = this,
			handle,
			dragClickOffsetX,
			dragClickOffsetY,
			lastDragX,
			lastDragY;

		subject.draggable = true;

		dative.styleHandle(subject);

		subject.addEventListener('dragstart', function(e) {
			handle = dative.makeHandle(subject);

			dragClickOffsetX = e.layerX;
			dragClickOffsetY = e.layerY;

			this.style.opacity = 0;
		});		
		subject.addEventListener('drag', function(e) {
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
		subject.addEventListener('dragend', function(e) {
			this.style.opacity = 1;

			handle.parentNode.removeChild(handle);
		});
	};	
	/*
	draggerinit = function() {
		$( ".badge" ).draggable({
			helper: "clone"
		});
	};
	draggerinit();
	*/	
	getChildrenIndex = function(ele) {
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
		var nx = $this.offset().left /*+ (($this.width())*(1-0.8991066736731477)) */ - mx;
		var px = (($(window).width()) * 0.8991066736731477) / 2;
		var ox = px - nx + (done ? -5 : 5); //Not sure why I need this, I think it's something to do with measurement of the font on load.
		$("#nav .items").attr("nav-offset", ox);
		$("#nav .items").css("transform", "translateX(-50%) translateX(" + ox + "px)");
		done = true;
	}	
	initNav();	

	stickyOffset = $('#nav').offset().top;	
	$(window).scroll(function() {
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
			$("#badgescontainer").animate({
				left: 0
			}, 1000, "easeInOutQuad", function() {
				// Animation complete.
			});

			$("#editbadges").animate({
				left: 0
			}, 1000, "easeInOutQuad", function() {
				// Animation complete.
			});

			$("#savebadges").animate({
				left: 0
			}, 1000, "easeInOutQuad", function() {
				// Animation complete.
			});
		});
		$("#editpage").click(function() {
			$("#badgescontainer").animate({
				left: "-100%"
			}, 1000, "easeInOutQuad", function() {
				// Animation complete.
			});

			$("#editbadges").animate({
				left: "-100%"
			}, 1000, "easeInOutQuad", function() {
				// Animation complete.
			});

			$("#savebadges").animate({
				left: "-100%"
			}, 1000, "easeInOutQuad", function() {
				// Animation complete.
			});
		});
		$("#savepage").click(function() {
			$("#badgescontainer").animate({
				left: "-200%"
			}, 1000, "easeInOutQuad", function() {
				// Animation complete.
			});

			$("#editbadges").animate({
				left: "-200%"
			}, 1000, "easeInOutQuad", function() {
				// Animation complete.
			});

			$("#savebadges").animate({
				left: "-200%"
			}, 1000, "easeInOutQuad", function() {
				// Animation complete.
			});
		});
	});	
	
	// -----------------------------
	// ADDING
	// -----------------------------
	
	bind = function() {
		html_add.onclick = function() {
			
		};
	};
	
	bind();
}