mainfunction = function all($scope, $timeout, $mdSidenav, $mdDialog, $window, $http, $q) {

	// LIBRARIES

	svg4everybody();

	$scope.buildToggler = function (componentId) {
		return function () {
			$mdSidenav(componentId).toggle();
			console.log($mdSidenav(componentId).isOpen());
			if ($mdSidenav(componentId).isOpen() === true) {
				// something
			}
			else {
				// something other
			}
		};
	};

	$scope.toggleLeft = $scope.buildToggler('left');

	$scope.doPrimaryAction = function (event) {
		$mdDialog.show(
			$mdDialog.alert()
			.title('Primary Action')
			.textContent('Primary actions can be used for one click actions')
			.ariaLabel('Primary click demo')
			.ok('Awesome!')
			.targetEvent(event));
	};

	$scope.doSecondaryAction = function (event) {
		$mdDialog.show(
			$mdDialog.alert()
			.title('Secondary Action')
			.textContent('Secondary actions can be used for one click actions')
			.ariaLabel('Secondary click demo')
			.ok('Neat!')
			.targetEvent(event));
	};

	var originatorEv;

	$scope.openMenu = function ($mdOpenMenu, ev) {
		originatorEv = ev;
		$mdOpenMenu(ev);
	};

	// SMALL FUNCTIONS FOR DEVELOPMENT

	// rounds numbers - value: number to round, exp: how many decimals
	round = function (value, exp) {
		if (typeof exp === 'undefined' || +exp === 0)
			return Math.round(value);

		value = +value;
		exp = +exp;

		if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
			return NaN;

		// Shift
		value = value.toString().split('e');
		value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

		// Shift back
		value = value.toString().split('e');
		return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
	};

	jQuery2html = function (prefix, attribute) {
		allElements = $("*");
		for (var i = 0, n = allElements.length; i < n; ++i) {
			var el = allElements[i];
			if (el.id) {
				$scope[prefix + el[attribute]] = el;
			}
		}
	};

	nthIndex = function (string, char, index) {
		return string.split(char, index).join(char).length;
	};


	findhomepath = function () {
		if (($scope.currentpath.match(/\//g) || []).length > 3) {
			return location.origin + $scope.currentpath.slice(0, nthIndex($scope.currentpath, "/", ($scope.currentpath.match(/\//g) || []).length - 1));
		}
		else {
			return location.origin + $scope.currentpath.slice(0, nthIndex($scope.currentpath, "/", ($scope.currentpath.match(/\//g) || []).length) + 1);
		}
	};

	pathgenerator = function (directory) {
		if (($scope.currentpath.match(/\//g) || []).length > 3) {
			$scope[directory + "path"] = $scope.homepath + "/" + directory + "/";
		}
		else {
			$scope[directory + "path"] = $scope.homepath + directory + "/";
		}
	};

	htmlEntities = function (str) {
		return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	};

	createVariable = function (varName, varContent) {
		var scriptStr = "var " + varName + "= " + varContent + "";

		var nodescriptCode = document.createTextNode(scriptStr);
		var nodescript = document.createElement("script");
		nodescript.type = "text/javascript";
		nodescript.setAttribute("class", "momentscript");
		nodescript.appendChild(nodescriptCode);

		var nodehead = document.getElementsByTagName("head")[0];
		nodehead.appendChild(nodescript);
	};


	// -----------------------------
	// CONVERTING
	// -----------------------------

	Object.size = function (obj) {
		var size = 0,
			key;
		for (key in obj) {
			if (obj.hasOwnProperty(key))
				size++;
		}
		return size;
	};

	dom2object = function () {
		collectionobject = {};
		collectionobject.user = login;
		collectionobject.collection = {};

		pushobjectbadge = function (collectionbadge, auto) {
			if (collectionbadge != "undefined") {
				x = getChildrenIndex(collectionbadge);

				collectionobject.collection[x] = "swag";
				collectionobject.collection[x] = {
					id1: (collectionbadge.attributes.id.nodeValue).slice(0, (collectionbadge.attributes.id.nodeValue).indexOf("-")),
					id2: (collectionbadge.attributes.id.nodeValue).slice(((collectionbadge.attributes.id.nodeValue).indexOf("-") + 1), ((collectionbadge.attributes.id.nodeValue).indexOf("-") + 4)),
					badgename: (collectionbadge.attributes.id.nodeValue).slice((collectionbadge.attributes.id.nodeValue).indexOf("-") + 4),
					src: collectionbadge.firstElementChild.attributes.src.nodeValue.slice(0, collectionbadge.firstElementChild.attributes.src.nodeValue.indexOf("?")),
					auto: auto
				};
			}
		};
		f = 0;
		while (f < $scope.html_badgescontainer.childElementCount) {
			pushobjectbadge($scope.html_badgescontainer.children[f], true);
			f = f + 1;
		}
	};

	object2dom = function () {
		collectiondom = document.createElement("div");
		x = 0;
		while (x < Object.size(collectionobject.collection)) {
			collectiondom.innerHTML += "<div class='badgebox' id='" + collectionobject.collection[x].id1 + "-" + collectionobject.collection[x].id2 + collectionobject.collection[x].badgename + "'><img src='" + collectionobject.collection[x].src + "?time=" + jQuery.now() + "' class='badge'/></div>";
			x = x + 1;
		}
	};

	zeroFill = function (number, width) {
		width -= number.toString().length;
		if (width > 0) {
			return new Array(width + (/\./.test(number) ? 2 : 1)).join("0") + number;
		}
		return number + ""; // always return a string
	};

	capitalizeFirstLetter = function (string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	create = function (htmlStr) {
		var frag = document.createDocumentFragment();
		var temp = document.createElement("div");
		temp.innerHTML = htmlStr;
		while (temp.firstChild) {
			frag.appendChild(temp.firstChild);
		}
		return frag;
	};




	//---------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------



	// APP DATA
	//---------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------

	// DATA THAT WILL NEVER CHANGE THROUGH A SESSION
	//---------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------

	// MANIFEST & VERSION
	$scope.manifest = $.get("manifest.json").done(function () {
		$scope.version = $scope.manifest.responseJSON.version;
		$scope.client_id = $scope.manifest.responseJSON.client_id;
	});
	
	$scope.currenthref = location.href;
	
	$scope.currentpath = location.pathname;

	$scope.homepath = findhomepath();

	$scope.logininput = "";

	scope = angular.element("#site").scope();

	pathgenerator("badges");
	pathgenerator("collection");
	pathgenerator("collections");
	pathgenerator("ids");


	// DATA THAT WILL CHANGE THROUGH A SESSION
	//---------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------


	// BUTTONS
	$scope.buttons = {
		search: {
			text: "search"
		},
		profile: {
			text: "add them to your profile"
		}
	};

	// STYLES
	$scope.styles = {
		loadingcontainer: {
			"display": "none"
		},
		starscontainer: {
			"height": ""
		},
		stars: {
			"font-size": ""
		}
	};

	$scope.l = {};

	// UI FUNCTIONS
	$scope.ui = {
		newtab: function () {
			$scope.url = {
				github: 'https://github.com/nnmrts/badges',
				impressum: 'http://www.pumpn.net/impressum.html'
			};
		},
		search: function () {
			$("#loadingcontainer:hidden").fadeIn(250, $.bez([0.0, 0.0, 0.2, 1]), function () {
				// START LOADING BAR
				NProgress.start();

				// RENAME SEARCH BUTTON
				$scope.buttons.search.text = "search again";
			});
			
			// RESET FIRST LOOP BOOLEAN
			$scope.l.firstloop = true;

			// INIT LOOP
			$scope.loop();
		}
	};

	// INIT SEARCH FUNCTION WHEN PRESSING ENTER
	$("input").keypress(function (event) {
		if (event.which == 13) {
			event.preventDefault();
			$scope.ui.search();
		}
	});
	
	$scope.user = {};
	
	
	// BIG LOOP FUNCTION
	//---------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------
	
	$scope.loop = function () {
		NProgress.inc();

		$scope.$applyAsync();

		// FIRST LOOP (for setup and resetting...)
		if ($scope.l.firstloop) {

			isnothing = "no";

			// RESET/DEFINE VARIABLES
			$scope.l = {
				firstloop: false,
				input: {
					checked: false
				},
				server: {
					checked: false,
				},
				yahoo: {
					checked: false,
					index: 9
				},
				genius: {

				},
				id: {
					given: false
				},
				user: {
					given: false
				},
				error: {
					occurred: false,
					inputinvalid: false,
					notfound: false,
					inputempty: false
				},
				time: {
					starttime: $.now()
				}
			};

			// LOOP IT BRUH
			$scope.loop();
		}

		if (!$scope.l.error.occurred) {
			if (!$scope.l.user.given) {
				// IS ID GIVEN?
				if (!$scope.l.id.given) {
					// IS INPUT CHECKED?
					if (!$scope.l.input.checked) {
						// CHECK IF INPUT VALID
						if ($scope.logininput.match("^[#%^&\{\}\]\[\(\)\`\'<>\|\ ]*$") !== null || $scope.logininput.match(/\\/) !== null || $scope.logininput.match("\"") !== null) {
							$scope.l.input.valid = false;
							console.log("L: INPUT NOT VALID");
							$scope.l.input.checked = true;
							console.log("L: INPUT CHECKED");
							$scope.loop();
						}
						else {
							$scope.l.input.valid = true;
							console.log("L: INPUT VALID");
							$scope.l.input.checked = true;
							console.log("L: INPUT CHECKED");
							$scope.loop();
						}
					}
					else {
						// IS INPUT VALID?
						if ($scope.l.input.valid) {
							// IS SERVER CHECKED?
							if (!$scope.l.server.checked) {
								// CHECK IF ID ON SERVER
								$scope.l.server.data = $http.get($scope.homepath + "ids/" + $scope.logininput.toUpperCase().replace(/\s+/g, "-") + ".txt", {
									responseType: "text"
								});

								$q.when($scope.l.server.data, function () {
									if ($scope.l.server.data.$$state.value.data.length < 10) {
										$scope.user.id = $scope.l.server.data.$$state.value.data;
										$scope.l.id.given = true;
										console.log("L: ID GIVEN");
										$scope.l.id.fromserver = true;
										console.log("L: ID FROM SERVER");
									}
									$scope.l.server.checked = true;
									console.log("L: SERVER CHECKED");
									$scope.loop();
								});
							}
							else {
								// IS YAHOO CHECKED?
								if (!$scope.l.yahoo.checked) {
									// IS YAHOO INDEX OVER -1?
									if ($scope.l.yahoo.index > -1) {

										$scope.l.yahoo.url = "https://query.yahooapis.com/v1/public/yql?q=select * from html where url='http://genius.com/" + $scope.logininput.toUpperCase().replace(/\s+/g, "-") + "'and%20xpath=%27(//preload-content)[last()-" + $scope.l.yahoo.index + "]%27&format=json";

										$scope.l.yahoo.data = $http.get($scope.l.yahoo.url);

										$q.when($scope.l.yahoo.data, function () {
											$scope.l.yahoo.source = $scope.l.yahoo.data.$$state.value.data;
											sourcestring1 = JSON.stringify($scope.l.yahoo.source);
											if (sourcestring1.indexOf("user") < 200 && sourcestring1.indexOf("user") != -1) {
												findid();
												$scope.l.id.given = true;
												console.log("L: ID GIVEN");
												$scope.l.id.fromyahoo = true;
												console.log("L: ID FROM YAHOO");
												$scope.l.yahoo.checked = true;
												console.log("L: YAHOO CHECKED");
												$scope.l.yahoo.oldindex = $scope.l.yahoo.index;
												$scope.l.yahoo.index = -1;
											}
											else {
												$scope.l.yahoo.index = $scope.l.yahoo.index - 1;
											}
											$scope.loop();
										});
									}
									else {
										$scope.l.yahoo.checked = true;
										console.log("L: YAHOO CHECKED");
										$scope.loop();
									}
								}
								else {
									if ($scope.logininput !== "") {
										$scope.l.error.occurred = true;
										console.log("ERROR OCCURRED");
										$scope.l.error.notfound = true;
										console.log("ERROR: NOT FOUND");
										$scope.loop();
									}
									else {
										// EASTER EGG
										$scope.l.error.occurred = true;
										console.log("ERROR OCCURRED");
										$scope.l.error.inputempty = true;
										console.log("ERROR: INPUT EMPTY");
										$scope.loop();
									}
								}
							}
						}
						else {
							$scope.l.error.occurred = true;
							console.log("ERROR OCCURRED");
							$scope.l.error.inputinvalid = true;
							console.log("ERROR: INPUT INVALID");
							$scope.loop();
						}

					}
				}
				else {
					// IS ID FROM SERVER?
					if (!$scope.l.id.fromserver) {
						// SAVE ID ON SERVER
						phpid = new FormData();
						phpid.append("phpid", $scope.user.id);
						phpid.append("phplogin", $scope.logininput.toUpperCase().replace(/\s+/g, "-"));
						xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP");
						xhr.open('post', 'saveid.php', true);
						xhr.send(phpid);
						console.log("ID SAVED ON SERVER");
					}

					// GET JSON FROM GENIUS
					geniusurl = "https://api.genius.com/users/" + $scope.user.id + "?access_token=lUQ8rzBeb78dJdtUcBbE4Jh-jfO88nfoDxHV3Ji3iOz268lNbYAYh8G0PjlcV-ma";

					$.getJSON(geniusurl).done(function (data) {
						$scope.l.genius.source = data;
						$scope.l.user.given = true;
						scope.$apply(function () {
							scope.l.user.given = true;
							console.log("USER GIVEN");
						});
						$scope.loop();

					});
				}
			}
			else {
				$scope.user = $scope.l.genius.source.response.user;
				console.log("END LOOP");
				$scope.doit();
			}
		}
		else {
			if ($scope.l.error.inputinvalid) {

			}
			else {
				if ($scope.l.error.notfound) {
					$scope.html_profile.innerHTML = "NOTHING HERE";

					$scope.html_generatedtext.innerHTML = "";

					$scope.html_nouser.innerHTML = $scope.logininput;

					$("#optionscontainer").attr({
						style: "width: 100%;height: initial;background: #fff;display: flex;justify-content: space-around;align-items: center;flex-direction: row;position: static;margin: 30px 0 30px;"
					});

					$("#buttoncontainer").attr({
						style: "padding-top: 5vh;padding-bottom: 5vh;"
					});

					$("#profilebox").attr({
						style: "height: 0;display:none;opacity: 0;"
					});

					$("#profiletext").attr({
						style: "opacity: 0"
					});

					$("#generatedtext").attr({
						style: "opacity: 0"
					});

					$("#profilehr").attr({
						style: "opacity: 0"
					});

					$("#customize").attr({
						style: "opacity: 0"
					});

					$("#authenticate").attr({
						style: "opacity: 0"
					});

					$("#info").attr({
						style: "width: initial;"
					});

					$("#badgeslogo").attr({
						style: "width: 3vw;align-self: center;height: initial;"
					});

					$("#version").attr({
						style: "font-size: 5vmin;color: #000000;font-weight: 700;margin-top: 0;margin-bottom: 0;line-height: 80%;padding-bottom:0;"
					});

					$("#menucontainer").attr({
						style: "display: flex"
					});

					$("#top").attr({
						style: "height: initial;margin-bottom: 41px;"
					});

					$("#search").attr({
						style: "margin-top: 0;"
					});

					NProgress.done();

					$("#loadingcontainer").fadeOut(250, $.bez([0.4, 0.0, 1, 1]), function () {


						$("#usererror:hidden").fadeIn(250, $.bez([0.0, 0.0, 0.2, 1]));
					});
				}
				else {
					if ($scope.l.error.inputempty) {
						NProgress.done();
						console.log("user entered nothing");
						$("#optionscontainer").attr({
							style: "width: 100%;height: initial;background: #fff;display: flex;justify-content: space-around;align-items: center;flex-direction: row;position: static;margin: 30px 0 30px;"
						});

						$("#buttoncontainer").attr({
							style: "padding-top: 5vh;padding-bottom: 5vh;"
						});

						$("#info").attr({
							style: "display: none;"
						});


						$scope.l.time.endtime = $.now();
						$scope.l.time.waitingtime = $scope.l.time.endtime - $scope.l.time.starttime;
						$scope.l.time.waitingtimeinseconds = $scope.l.time.waitingtime / 1000;

						$("#profilebox").attr({
							style: "height: 0;display:none;opacity: 0;"
						});

						$("#profiletext").attr({
							style: "opacity: 0"
						});

						$("#generatedtext").attr({
							style: "opacity: 0"
						});

						$("#profilehr").attr({
							style: "opacity: 0"
						});

						$("#customize").attr({
							style: "opacity: 0"
						});

						$("#authenticate").attr({
							style: "opacity: 0"
						});

						$scope.html_profile.innerHTML = "NOTHING HERE";

						$scope.html_generatedtext.innerHTML = "";
						$("#nothing:hidden").fadeIn(250, $.bez([0.0, 0.0, 0.2, 1]));

						$("#loadingcontainer").fadeOut(250, $.bez([0.4, 0.0, 1, 1]));
					}
				}
			}
		}
	};




	/*
	usergivenfunc = function () {

		$scope.logininput = window.location.pathname.slice(nthIndex(currentpath, "/", 3) + 1);

		$(".mdl-textfield").addClass("is-dirty");

		starttime = $.now();

		id_given = "no";

		isnothing = "no";

		n = 0;

		index = 0;

		arraychecked = 0;

		i = 9;

		serverchecked = 0;

		logininputchecked = 0;

		idonserver = 0;

		userhere = 0;

		userpagegiven = 0;

		$("#optionscontainer").fadeOut(250, $.bez([0.4, 0.0, 1, 1]), function () {
			$("#userinfo").fadeOut(250, $.bez([0.4, 0.0, 1, 1]), function () {
				$("#loadingcontainer").fadeIn(250, $.bez([0.0, 0.0, 0.2, 1]), function () {
					$scope.$apply(function () {
						loop();
					});
				});
			});
		});
	};

	if ($scope.currentpath.indexOf("/collection") == -1) {
		if (localStorage.getItem("access_token") !== null) {
			if (localStorage.getItem("tokentime") !== null) {
				if (jQuery.now() - (localStorage.getItem("tokentime")) < 1209600000) {
					$scope.html_authenticate.parentNode.attributes.href.nodeValue = "collection";
				}
			}
		}
		if ($scope.currentpath.length != nthIndex($scope.currentpath, "/", 3) + 1) {
			usergiven = 1;
			$scope.styles.loadingcontainer = "";
			usergivenfunc();
		}
	}
	*/



	$scope.doit = function () {

		$.get($scope.collectionspath + $scope.user.login.toUpperCase().replace(/\s+/g, "-") + ".js").done(function (data) {
			collectionsource = data;
			if (collectionsource.indexOf("<!") !== 0) {
				console.log("found collection on server");
				collectionhere = 1;
				NProgress.inc();
				object2dom();
				while ($scope.html_badgescontainer.firstChild) {
					$scope.html_badgescontainer.removeChild($scope.html_badgescontainer.firstChild);
				}
				$scope.html_badgescontainer.innerHTML = collectiondom.innerHTML;

				badgesnumber = $scope.html_badgescontainer.childElementCount;

				if (location.pathname.indexOf("collection") == -1) {
					/* insertavatar();
					insertstats();
					insertnamelink();
					insertname();
					insertlogin();
					insertiq_for_display();
					insertrole_for_display();
					insertrole_icon();
					insertstars(); */

					NProgress.inc();
				}
				else {
					$scope.html_editbadges.innerHTML = collectiondom.innerHTML;

					mapObj2 = {
						'class="badgebox"': 'class="badgebox ui-state-default"',
						'div': 'li'
					};

					$scope.html_editbadges.innerHTML = $scope.html_editbadges.innerHTML.replace(/class="badgebox"|div/g, function (matched) {
						return mapObj2[matched];
					});

					m = 0;
					while (m < Object.size(collectionobject.collection)) {
						$scope.html_editbadges.children[m].appendChild($scope.html_smallfooter.cloneNode(true));
						m = m + 1;
					}

					hoverEnabled = 1;
					$(".smallfooter").fadeOut(250, $.bez([0.4, 0.0, 1, 1]));

					$(".badgebox").hover(function () {
							childindex = getChildrenIndex(this);
							currentfooter = $("#editbadges > .badgebox")[childindex].lastElementChild;
							if (currentfooter.id == "smallfooter") {
								if (hoverEnabled == 1) {
									$(currentfooter).fadeIn(250, $.bez([0.0, 0.0, 0.2, 1]));
								}
							}
						},
						function () {
							childindex = getChildrenIndex(this);
							currentfooter = $("#editbadges > .badgebox")[childindex].lastElementChild;
							if (currentfooter.id == "smallfooter") {
								$(currentfooter).fadeOut(250, $.bez([0.4, 0.0, 1, 1]));
							}
						});

					if (isnothing == "no") {
						imageloop();
					}
					else {
						$("#loadingcontainer").fadeOut(250, $.bez([0.4, 0.0, 1, 1]));
						NProgress.done();
					}
				}
			}
			else {
				collectionhere = 0;

				NProgress.inc();

				if (location.pathname.indexOf("collection") == -1) {

					insert();
				}
				else {
					insertbadges();
				}

				NProgress.inc();
			}

			if (location.pathname.indexOf("collection") == -1) {
				$scope.html_usererror.style.display = "none";

				$("#userinfo:hidden").attr({
					style: "display: flex;"
				});

				$("#optionscontainer").attr({
					style: "width: 100%;height: initial;background: #fff;display: flex;justify-content: space-around;align-items: center;flex-direction: row;position: static;margin: 30px 0 30px;"
				});

				$("#buttoncontainer").attr({
					style: "padding-top: 5vh;padding-bottom: 5vh;"
				});

				$("#profilebox").attr({
					style: "height: 0;display:none;opacity: 0;"
				});

				$("#profiletext").attr({
					style: "opacity: 0"
				});

				$("#generatedtext").attr({
					style: "opacity: 0"
				});

				$("#profilehr").attr({
					style: "opacity: 0"
				});

				$("#customize").attr({
					style: "opacity: 0"
				});

				$("#authenticate").attr({
					style: "opacity: 0"
				});

				$scope.html_profile.innerHTML = "ADD THEM TO YOUR PROFILE";

				$scope.html_generatedtext.innerHTML = "";

				$("#info").attr({
					style: "width: initial;"
				});

				$("#badgeslogo").attr({
					style: "width: 3vw;align-self: center;height: initial;"
				});

				$("#version").attr({
					style: "font-size: 5vmin;color: #000000;font-weight: 700;margin-top: 0;margin-bottom: 0;line-height: 80%;padding-bottom:0;"
				});

				$("#menucontainer").attr({
					style: "display: flex"
				});

				$("#top").attr({
					style: "height: initial;margin-bottom: 41px;"
				});

				$("#search").attr({
					style: "margin-top: 0;"
				});

				NProgress.inc();

				if (isnothing == "no") {
					imageloop();
				}
				else {
					$("#loadingcontainer").fadeOut(250, $.bez([0.4, 0.0, 1, 1]));
					NProgress.done();
				}

				history.pushState({}, document.title, $scope.currentpath.slice(0, (nthIndex($scope.currentpath, "/", 3) + 1)) + $scope.user.login.toUpperCase().replace(/\s+/g, "-").toLowerCase());

				/* data = [
					["avatar", $scope.user.avatar],
					["link", link],
					["name", name],
					["login", login],
					["iq_for_display", iq_for_display],
					["iq", iq],
					["id", id],
					["transcriptions_count", transcriptions_count],
					["annotations_count", annotations_count],
					["role_for_display", role_for_display],
					["swag?", "swag."]
				];
				console.table(data); */
			}
			else {
				NProgress.done();
			}
		}).fail(function () {
			console.log("didn't find collection on server");
			collectionhere = 0;

			NProgress.inc();

			if (location.pathname.indexOf("collection") == -1) {

				insert();
			}
			else {
				insertbadges();
			}

			NProgress.inc();

			if (location.pathname.indexOf("collection") == -1) {
				$scope.html_usererror.style.display = "none";

				$("#userinfo:hidden").attr({
					style: "display: flex;"
				});

				$("#optionscontainer").attr({
					style: "width: 100%;height: initial;background: #fff;display: flex;justify-content: space-around;align-items: center;flex-direction: row;position: static;margin: 30px 0 30px;"
				});

				$("#buttoncontainer").attr({
					style: "padding-top: 5vh;padding-bottom: 5vh;"
				});

				$("#profilebox").attr({
					style: "height: 0;display:none;opacity: 0;"
				});

				$("#profiletext").attr({
					style: "opacity: 0"
				});

				$("#generatedtext").attr({
					style: "opacity: 0"
				});

				$("#profilehr").attr({
					style: "opacity: 0"
				});

				$("#customize").attr({
					style: "opacity: 0"
				});

				$("#authenticate").attr({
					style: "opacity: 0"
				});

				$scope.html_profile.innerHTML = "ADD THEM TO YOUR PROFILE";

				$scope.html_generatedtext.innerHTML = "";

				$("#info").attr({
					style: "width: initial;"
				});

				$("#badgeslogo").attr({
					style: "width: 3vw;align-self: center;height: initial;"
				});

				$("#version").attr({
					style: "font-size: 5vmin;color: #000000;font-weight: 700;margin-top: 0;margin-bottom: 0;line-height: 80%;padding-bottom:0;"
				});

				$("#menucontainer").attr({
					style: "display: flex"
				});

				$("#top").attr({
					style: "height: initial;margin-bottom: 41px;"
				});

				$("#search").attr({
					style: "margin-top: 0;"
				});

				NProgress.inc();

				if (isnothing == "no") {
					imageloop();
				}
				else {
					$("#loadingcontainer").fadeOut(250, $.bez([0.4, 0.0, 1, 1]));
					NProgress.done();
				}

				window.history.pushState("object or string", "Title", currentpath.slice(0, (nthIndex(currentpath, "/", 3) + 1)) + $scope.user.login.toUpperCase().replace(/\s+/g, "-").toLowerCase());

				/* data = [
					["avatar", avatar],
					["link", link],
					["name", name],
					["login", login],
					["iq_for_display", iq_for_display],
					["iq", iq],
					["id", id],
					["transcriptions_count", transcriptions_count],
					["annotations_count", annotations_count],
					["role_for_display", role_for_display],
					["swag?", "swag."]
				];
				console.table(data); */
			}
			else {
				NProgress.done();
			}
		});
	};


	pathactivated = 1;
	circleactivated = 0;
	polygonactivated = 0;

	imageloop = function () {
		if ($scope.html_badgescontainer.firstElementChild.firstElementChild.complete === true) {
			$("#loadingcontainer").fadeOut(250, $.bez([0.4, 0.0, 1, 1]), function () {
				if (location.pathname.indexOf("collection") == -1) {
					$("md-content").animate({
						scrollTop: $('#userinfo').offset().top - 75
					}, 1000, $.bez([0.4, 0.0, 0.2, 1]));
				}
			});
			NProgress.done();
			console.log("images loaded");
		}
		else {
			setTimeout(function () {
				NProgress.inc();
				console.log("images not loaded yet");
				imageloop();
			}, 500);
		}
	};

	//-----------------
	//-----------------
	//-----------------

	findid = function () {
		if (location.pathname.indexOf("collection") !== -1) {
			$scope.user.id = $scope.l.genius.source.response.user.id;
		}
		else {
			$scope.user.id = JSON.parse($scope.l.yahoo.source.query.results["preload-content"]["data-preload_data"]).user.id;
		}
	};

	/* findavatar = function () {
		$scope.user.avatar = $scope.l.genius.source.responseJSON.response.user.avatar;
	};

	findname = function () {
		$scope.user.name = $scope.l.genius.source.responseJSON.response.user.name;
	};

	findlogin = function () {
		$scope.user.login = $scope.l.genius.source.responseJSON.response.user.login;
	};

	findlink = function () {
		link = "https://genius.com/" + login;
	};

	findiq_for_display = function () {
		$scope.user.iq_for_display = $scope.l.genius.source.responseJSON.response.user.iq_for_display;
	};

	findrole_for_display = function () {
		$scope.user.role_for_display = $scope.l.genius.source.responseJSON.response.user.role_for_display;
	};

	findroles_for_display = function () {
		$scope.user.roles_for_display = $scope.l.genius.source.responseJSON.response.user.roles_for_display;
	};

	findiq = function () {
		$scope.user.iq = $scope.l.genius.source.responseJSON.response.user.iq;
	};

	findtranscriptions_count = function () {
		$scope.user.transcriptions_count = $scope.l.genius.source.responseJSON.response.user.stats.transcriptions_count;
	};

	findannotations_count = function () {
		$scope.user.annotations_count = $scope.l.genius.source.responseJSON.response.user.stats.annotations_count;
	}; */

	//-------------------------------------------------------------------------
	//-------------------------------------------------------------------------
	//-------------------------------------------------------------------------

	/* insertavatar = function () {
		$scope.html_avatar.style = "background-image: url(" + avatar + ")";
	};
	insertstats = function () {
		$scope.html_annotations_count.innerHTML = annotations_count;
		$scope.html_transcriptions_count.innerHTML = transcriptions_count;
	};

	insertnamelink = function () {
		$scope.html_namelink.setAttribute("href", link);
	};
	insertname = function () {
		$scope.html_name.innerHTML = emojione.shortnameToImage(emojione.toShort(name));
	};
	insertlogin = function () {
		$scope.html_login.innerHTML = login;
	};
	insertiq_for_display = function () {
		$scope.html_iq_for_display.innerHTML = iq_for_display;
	};
	insertrole_for_display = function () {
		if (role_for_display !== null) {
			$scope.html_role_for_display.innerHTML = role_for_display.replace(/[_]/g, " ");
		}
	}; */
	insertrole_icon = function () {
		// CONTRIBUTOR
		if (is.startWith(role_for_display, 'co') === true) {
			$scope.html_divider.setAttribute("style", "display: inline-block");
			$scope.html_iconbox.setAttribute("style", "display: inline-block");
			$scope.html_role_for_display.setAttribute("style", "display: inline-block");
			//------------------------------------------------------------
			//------------------------------------------------------------
			//------------------------------------------------------------

			$scope.html_role_icon.setAttribute("style", "display: none");
			$scope.html_iconbox.removeChild($scope.html_role_icon);

			fragment = create("<svg id='role_icon' src='equilateral_triangle.svg' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 9 7' version='1.1' style='fill: #ffffff;width: 1rem;height: 1rem;stroke: #9a9a9a;stroke-width: 1px;top: 2px;position: relative;display: block'><path id='role_icon_path' d='M8.25 6.418L4.25 0l-4 6.418z' cx='74' cy='10' r='9'></path></svg>");
			// You can use native DOM methods to insert the fragment:
			$scope.html_iconbox.insertBefore(fragment, $scope.html_iconbox.childNodes[0]);
			$scope.html_role_icon = $("#role_icon")[0];
		}
		else {
			// MEDIATOR
			if (is.startWith(role_for_display, 'me') === true) {
				$scope.html_divider.setAttribute("style", "display: inline-block");
				$scope.html_iconbox.setAttribute("style", "display: inline-block");
				$scope.html_role_for_display.setAttribute("style", "display: inline-block");
				//------------------------------------------------------------
				//------------------------------------------------------------
				//------------------------------------------------------------

				$scope.html_role_icon.setAttribute("style", "display: none");
				$scope.html_iconbox.removeChild($scope.html_role_icon);

				fragment = create("<svg id='role_icon' src='square.svg' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' version='1.1' style='fill: #ff518c;width: .9rem;height: .9rem;stroke: #9a9a9a;stroke-width: 2px;position: relative;display: block'><path id='role_icon_path' d='M1.5 1.5h17v17h-17z' cx='74' cy='10' r='9'></path></svg>");
				// You can use native DOM methods to insert the fragment:
				$scope.html_iconbox.insertBefore(fragment, $scope.html_iconbox.childNodes[0]);
				$scope.html_role_icon = $("#role_icon")[0];
			}
			else {
				// EDITOR
				if (is.startWith(role_for_display, 'ed') === true) {
					$scope.html_divider.setAttribute("style", "display: inline-block");
					$scope.html_iconbox.setAttribute("style", "display: inline-block");
					$scope.html_role_for_display.setAttribute("style", "display: inline-block");
					//------------------------------------------------------------
					//------------------------------------------------------------
					//------------------------------------------------------------

					$scope.html_role_icon.setAttribute("style", "display: none");
					$scope.html_iconbox.removeChild($scope.html_role_icon);

					fragment = create("<svg id='role_icon' src='square.svg' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' version='1.1' style='fill: #ffff64;width: .9rem;height: .9rem;stroke: #9a9a9a;stroke-width: 2px;position: relative;display: block'><path id='role_icon_path' d='M1.5 1.5h17v17h-17z' cx='74' cy='10' r='9'></path></svg>");
					// You can use native DOM methods to insert the fragment:
					$scope.html_iconbox.insertBefore(fragment, $scope.html_iconbox.childNodes[0]);
					$scope.html_role_icon = $("#role_icon")[0];
				}
				else {
					// MODERATOR
					if (is.startWith(role_for_display, 'mo') === true) {
						$scope.html_divider.setAttribute("style", "display: inline-block");
						$scope.html_iconbox.setAttribute("style", "display: inline-block");
						$scope.html_role_for_display.setAttribute("style", "display: inline-block");
						//------------------------------------------------------------
						//------------------------------------------------------------
						//------------------------------------------------------------

						$scope.html_role_icon.setAttribute("style", "display: none");
						$scope.html_iconbox.removeChild($scope.html_role_icon);

						fragment = create("<svg id='role_icon' src='diamond.svg' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 22 22' version='1.1' style='fill: #7689e8;width: 1.05rem;height: 1.05rem;stroke: #9a9a9a;stroke-width: 2px;position: relative;display: block'><path id='role_icon_path' d='M11 1.95l8.98 8.98L11 19.91l-8.98-8.98z' cx='74' cy='10' r='9'></path></svg>");
						// You can use native DOM methods to insert the fragment:
						$scope.html_iconbox.insertBefore(fragment, $scope.html_iconbox.childNodes[0]);
						$scope.html_role_icon = $("#role_icon")[0];
					}
					else {
						// REGULATOR
						if (is.startWith(role_for_display, 're') === true) {
							$scope.html_role_for_display.innerHTML = "Staff";
							$scope.html_divider.setAttribute("style", "display: inline-block");
							$scope.html_iconbox.setAttribute("style", "display: inline-block");
							$scope.html_role_for_display.setAttribute("style", "display: inline-block");
							//------------------------------------------------------------
							//------------------------------------------------------------
							//------------------------------------------------------------

							$scope.html_role_icon.setAttribute("style", "display: none");
							$scope.html_iconbox.removeChild($scope.html_role_icon);

							fragment = create("<svg id='role_icon' src='circle.svg' xmlns='http://www.w3.org/2000/svg' viewBox='64 0 20 20' version='1.1' style='fill: #b0c4de;width: .9rem;height: .9rem;stroke: #9a9a9a;stroke-width: 2px;position: relative;display: block'><circle id='role_icon_circle' d='M1.5 1.5h17v17h-17z' cx='74' cy='10' r='9'></circle></svg>");
							// You can use native DOM methods to insert the fragment:
							$scope.html_iconbox.insertBefore(fragment, $scope.html_iconbox.childNodes[0]);
							$scope.html_role_icon = $("#role_icon")[0];
						}
						else {
							// VERIFIED ARTIST
							if (is.startWith(role_for_display, 've') === true) {
								$scope.html_divider.setAttribute("style", "display: inline-block");
								$scope.html_iconbox.setAttribute("style", "display: inline-block");
								$scope.html_role_for_display.setAttribute("style", "display: inline-block");
								//------------------------------------------------------------
								//------------------------------------------------------------
								//------------------------------------------------------------
								$scope.html_role_icon.setAttribute("style", "display: none");
								$scope.html_iconbox.removeChild($scope.html_role_icon);

								fragment = create("<svg id='role_icon' src='checky.svg' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 11 11' version='1.1' width='14px' height='14px' style='fill: #38ef51;    height: 17px;margin: 0 2px;top: 2px;width: 17px;stroke: #fff;position: relative;display: block'><polygon points='5.5 0 10.2631397 2.75 10.2631397 8.25 5.5 11 0.736860279 8.25 0.736860279 2.75 '></polygon><path d='M2.5,5.5 L4.5,7.5' stroke-width='1.2' stroke-linecap='square'></path><path d='M4.5,7.5 L8.5,3.5' stroke-width='1.2' stroke-linecap='square'></path></svg>");
								// You can use native DOM methods to insert the fragment:
								$scope.html_iconbox.insertBefore(fragment, $scope.html_iconbox.childNodes[0]);
								$scope.html_role_icon = $("#role_icon")[0];
							}
							else {
								// NO ROLE
								$scope.html_divider.setAttribute("style", "display: none");
								$scope.html_role_icon.setAttribute("style", "display: none");
								$scope.html_iconbox.setAttribute("style", "display: none");
								$scope.html_role_for_display.setAttribute("style", "display: none");
								$scope.html_role_icon = $("#role_icon")[0];
							}
						}
					}
				}
			}
		}
	};

	//-------------------------------------------
	//-------------------------------------------
	//-------------------------------------------


	$scope.amount2id = function (type) {
		if (type < 100) {
			badgeid = 0;
		}
		else {
			if (type < 500) {
				badgeid = 1;
			}
			else {
				if (type < 1000) {
					badgeid = 2;
				}
				else {
					if (type < 5000) {
						badgeid = 3;
					}
					else {
						if (type < 10000) {
							badgeid = 4;
						}
						else {
							if (type < 25000) {
								badgeid = 5;
							}
							else {
								if (type < 50000) {
									badgeid = 6;
								}
								else {
									if (type < 75000) {
										badgeid = 7;
									}
									else {
										if (type < 100000) {
											badgeid = 8;
										}
										else {
											if (type < 125000) {
												badgeid = 9;
											}
											else {
												if (type < 250000) {
													badgeid = 10;
												}
												else {
													if (type < 375000) {
														badgeid = 11;
													}
													else {
														if (type < 500000) {
															badgeid = 12;
														}
														else {
															if (type < 625000) {
																badgeid = 13;
															}
															else {
																if (type < 750000) {
																	badgeid = 14;
																}
																else {
																	if (type < 875000) {
																		badgeid = 15;
																	}
																	else {
																		if (type < 1000000) {
																			badgeid = 16;
																		}
																		else {
																			badgeid = 17;
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		stars = stars + badgeid;
		$scope.$apply(function () {
			$scope.user.stars = stars;
		});
	};

	badgeelement = "div";
	badgeclass = "badgebox";

	starbadge1 = "undefined";
	starbadge2 = "undefined";
	starbadge3 = "undefined";
	rolebadge1 = "undefined";
	rolebadge2 = "undefined";
	verifiedartistbadge = "undefined";

	starbadgenamechooser = function (badgeid) {
		badgenames = [{
				0: ""
					}, {
				1: "coal"
					}, {
				2: "copper"
					}, {
				3: "bronze"
					}, {
				4: "silver"
					}, {
				5: "gold"
					}, {
				6: "platinum"
					}, {
				7: "sapphire"
					}, {
				8: "amber"
					}, {
				9: "emerald"
					}, {
				10: "topaz"
					}, {
				11: "opal"
					}, {
				12: "amethyst"
					}, {
				13: "ruby"
					}, {
				14: "yellowdiamond"
					}, {
				15: "greendiamond"
					}, {
				16: "reddiamond"
					}, {
				17: "diamond"
					}
				];
		badgename = badgenames[badgeid][badgeid];
	};

	starbadgecategorylist = ["genius", "transcriber", "annotator"];

	$scope.starbadgechooser = function (category, type, count) {
		categoryid = (starbadgecategorylist.indexOf(category)) + 1;
		if (categoryid == 1) {
			$scope.amount2id(type);
			starbadgenamechooser(badgeid);

			if (badgeid > 0) {
				badgebox = document.createElement(badgeelement);
				badgebox.setAttribute("class", badgeclass);
				badgebox.setAttribute("id", zeroFill(categoryid, 3) + "-" + zeroFill(badgeid, 3) + badgename + category);
				badge = document.createElement("img");
				badge.setAttribute("src", badgespath + zeroFill(categoryid, 3) + "%20" + capitalizeFirstLetter(category) + "%20Badges/genius-" + zeroFill(categoryid, 3) + "-" + zeroFill(badgeid, 3) + badgename + category + "500px.png?time=" + jQuery.now());
				badge.setAttribute("class", "badge");
				badgebox.appendChild(badge);

				window["starbadge" + count] = badgebox;
			}
			else {
				window["starbadge" + count] = "undefined";
			}
		}
		else {
			$scope.amount2id((type) * 100);
			starbadgenamechooser(badgeid);

			if (badgeid > 0) {
				badgebox = document.createElement(badgeelement);
				badgebox.setAttribute("class", badgeclass);
				badgebox.setAttribute("id", zeroFill(categoryid, 3) + "-" + zeroFill(badgeid, 3) + badgename + category);
				badge = document.createElement("img");
				badge.setAttribute("src", badgespath + zeroFill(categoryid, 3) + "%20" + capitalizeFirstLetter(category) + "%20Badges/genius-" + zeroFill(categoryid, 3) + "-" + zeroFill(badgeid, 3) + badgename + category + "500px.png?time=" + jQuery.now());
				badge.setAttribute("class", "badge");
				badgebox.appendChild(badge);

				window["starbadge" + count] = badgebox;
			}
			else {
				window["starbadge" + count] = "undefined";
			}
		}
	};

	//-------------------------------------------
	//-------------------------------------------
	//-------------------------------------------


	role2id = function (role) {
		roleloop = function () {
			if (role_for_display === null) {
				badgeid = 0;
			}
			else {
				if (is.startWith(role, 'co') === true) {
					badgeid = 1;
				}
				else {
					if (is.startWith(role, 'me') === true) {
						badgeid = 2;
					}
					else {
						if (is.startWith(role, 'ed') === true) {
							badgeid = 3;
						}
						else {
							if (is.startWith(role, 'mo') === true) {
								badgeid = 4;
							}
							else {
								if (is.startWith(role, 're') === true) {
									badgeid = 5;
								}
								else {
									if (is.startWith(role, 've') === true) {
										role = roles_for_display[1];
										roleloop();
									}
								}
							}
						}
					}
				}
			}
		};
		roleloop();
	};

	rolebadgenamechooser = function (badgeid) {
		badgenames = [{
				0: ""
					}, {
				1: "contributor"
					}, {
				2: "mediator"
					}, {
				3: "editor"
					}, {
				4: "moderator"
					}, {
				5: "staff"
					}
				];
		badgename = badgenames[badgeid][badgeid];
	};

	rolebadgechooser = function (role, count) {
		role2id(role);
		rolebadgenamechooser(badgeid);
		if (badgeid > 0) {
			badgebox = document.createElement(badgeelement);
			badgebox.setAttribute("class", badgeclass);
			badgebox.setAttribute("id", "004-" + zeroFill(badgeid, 3) + badgename);
			badge = document.createElement("img");
			badge.setAttribute("src", badgespath + "004%20Role%20Badges/genius-004-" + zeroFill(badgeid, 3) + badgename + "500px.png?time=" + jQuery.now());
			badge.setAttribute("class", "badge");
			badgebox.appendChild(badge);

			window["rolebadge" + count] = badgebox;
		}
		else {
			window["rolebadge" + count] = "undefined";
		}
	};

	verifiedartistbadgechooser = function () {
		if ($scope.user.artist !== null) {
			badgebox = document.createElement(badgeelement);
			badgebox.setAttribute("class", badgeclass);
			badgebox.setAttribute("id", "005-001verifiedartist");
			badge = document.createElement("img");
			badge.setAttribute("src", badgespath + "005%20Verified%20Artist%20Badges/genius-005-001verifiedartist500px.png?time=" + jQuery.now());
			badge.setAttribute("class", "badge");
			badgebox.appendChild(badge);

			verifiedartistbadge = badgebox;
		}
		else {
			verifiedartistbadge = "undefined";
		}
	};

	$scope.insertbadges = function () {
		while ($scope.html_badgescontainer.firstChild) {
			$scope.html_badgescontainer.removeChild($scope.html_badgescontainer.firstChild);
		}
		$scope.starbadgechooser("genius", $scope.user.iq, 1);
		if (starbadge1 !== "undefined") {
			$scope.html_badgescontainer.appendChild(starbadge1);
		}
		$scope.starbadgechooser("transcriber", $scope.user.stats.transcriptions_count, 2);
		if (starbadge2 !== "undefined") {
			$scope.html_badgescontainer.appendChild(starbadge2);
		}
		$scope.starbadgechooser("annotator", $scope.user.stats.annotations_count, 3);
		if (starbadge3 !== "undefined") {
			$scope.html_badgescontainer.appendChild(starbadge3);
		}

		rolebadgechooser($scope.user.role_for_display, 1);
		if (rolebadge1 !== "undefined") {
			$scope.html_badgescontainer.appendChild(rolebadge1);
		}

		if ($scope.user.roles_for_display.indexOf("mediator") == 1) {
			rolebadgechooser("mediator", 2);
			if (rolebadge2 !== "undefined") {
				$scope.html_badgescontainer.appendChild(rolebadge2);
			}
		}

		verifiedartistbadgechooser();
		if (verifiedartistbadge !== "undefined") {
			$scope.html_badgescontainer.appendChild(verifiedartistbadge);
		}

		badgesnumber = $scope.html_badgescontainer.childElementCount;

		if ((4 * (badgesnumber % 4)) === 4 && (4 * (badgesnumber % 4)) > 4) {
			$scope.html_badgescontainer.lastChild.setAttribute("class", "badgebox first");
		}
		else {
			if ((4 * (badgesnumber % 4)) === 8 && (4 * (badgesnumber % 4)) > 4) {
				$scope.html_badgescontainer.lastChild.setAttribute("class", "badgebox second");
			}
			else {
				if ((4 * (badgesnumber % 4)) === 12 && (4 * (badgesnumber % 4)) > 4) {
					$scope.html_badgescontainer.lastChild.setAttribute("class", "badgebox third");
				}
				else {
					if ((4 * (badgesnumber % 4)) === 16 && (4 * (badgesnumber % 4)) > 4) {
						$scope.html_badgescontainer.lastChild.setAttribute("class", "badgebox fourth");
					}
				}
				if (badgesnumber === 0) {
					isnothing = "yes";
					$scope.html_badgescontainer.innerHTML = "<p id='nobadges'>This user has no badges yet. Sad.</p>";
				}
			}
		}
		if (location.pathname.indexOf("collection") !== -1) {
			badgeelement = "li";
			badgeclass = "badgebox ui-state-default";
			while ($scope.html_editbadges.hasChildNodes() === true) {
				$scope.html_editbadges.removeChild($scope.html_editbadges.firstChild);
			}
			starbadgechooser("genius", iq, 1);
			if (starbadge1 !== "undefined") {
				$scope.html_editbadges.appendChild(starbadge1);
				starbadge1.appendChild($scope.html_smallfooter.cloneNode(true));
			}
			starbadgechooser("transcriber", transcriptions_count, 2);
			if (starbadge2 !== "undefined") {
				$scope.html_editbadges.appendChild(starbadge2);
				starbadge2.appendChild($scope.html_smallfooter.cloneNode(true));
			}
			starbadgechooser("annotator", annotations_count, 3);
			if (starbadge3 !== "undefined") {
				$scope.html_editbadges.appendChild(starbadge3);
				starbadge3.appendChild($scope.html_smallfooter.cloneNode(true));
			}

			rolebadgechooser(role_for_display, 1);
			if (rolebadge1 !== "undefined") {
				$scope.html_editbadges.appendChild(rolebadge1);
				rolebadge1.appendChild($scope.html_smallfooter.cloneNode(true));
			}

			if (roles_for_display.indexOf("mediator") == 1) {
				rolebadgechooser("mediator", 2);
				if (rolebadge2 !== "undefined") {
					$scope.html_editbadges.appendChild(rolebadge2);
					rolebadge2.appendChild($scope.html_smallfooter.cloneNode(true));
				}
			}

			verifiedartistbadgechooser();
			if (verifiedartistbadge !== "undefined") {
				$scope.html_editbadges.appendChild(verifiedartistbadge);
				verifiedartistbadge.appendChild($scope.html_smallfooter.cloneNode(true));
			}
			hoverEnabled = 1;
			$(".smallfooter").fadeOut(250, $.bez([0.4, 0.0, 1, 1]));

			$(".badgebox").hover(function () {
					childindex = getChildrenIndex(this);
					currentfooter = $("#editbadges > .badgebox")[childindex].lastElementChild;
					if (currentfooter.id == "smallfooter") {
						if (hoverEnabled == 1) {
							$(currentfooter).fadeIn(250, $.bez([0.0, 0.0, 0.2, 1]));
						}
					}
				},
				function () {
					childindex = getChildrenIndex(this);
					currentfooter = $("#editbadges > .badgebox")[childindex].lastElementChild;
					if (currentfooter.id == "smallfooter") {
						$(currentfooter).fadeOut(250, $.bez([0.4, 0.0, 1, 1]));
					}
				});
		}

	};

	/* insertstars = function () {
		if (stars > 0) {
			$("#starscontainer").attr({
				style: "display: flex"
			});
			if (stars == 1) {
				$scope.html_stars.innerHTML = stars + " STAR";
				$("#starscontainer").attr({
					style: "height: " + ((8 * stars / 51 + 17 / 5) + 2) + "vh"
				});
				$("#stars").attr({
					style: "font-size: " + (8 * stars / 51 + 17 / 5) + "vh"
				});
			} else {
				$scope.html_stars.innerHTML = stars + " STARS";
			}
			$("#starscontainer").attr({
				style: "height: " + ((8 * stars / 51 + 17 / 5) + 2) + "vh"
			});
			$("#stars").attr({
				style: "font-size: " + (8 * stars / 51 + 17 / 5) + "vh"
			});
		} else {
			$("#starscontainer").attr({
				style: "display: none"
			});
		}
	}; */

	insert = function () {
		$scope.insertbadges();
		$scope.styles.starscontainer.height = round(((8 * $scope.user.stars / 51 + 17 / 5) + 2), 3) + "vh";
		$scope.styles.stars["font-size"] = round((8 * $scope.user.stars / 51 + 17 / 5), 3) + "vh";
		/*
		insertavatar();
		insertstats();
		insertnamelink();
		insertname();
		insertlogin();
		insertiq_for_display();
		insertrole_for_display();
		insertrole_icon();
		insertstars(); */
	};

	warmupyahooapi = function () {
		url = "https://query.yahooapis.com/v1/public/yql?q=select * from html where url='http://genius.com/SinaTheQueen'&format=json";

		source = $.getJSON(url).done(function () {
			sourcestring1 = JSON.stringify(source);
		});
	};

	// it's really a warmup...if this function wouldn't exist, the first request a user makes would take super long and eventually error then...i don't know why...it's like starting a steam machine or so :D


	id = 0;


	jQuery2html("html_", "id");

	/*
	if (usergiven === 0) {
	$("#loadingcontainer").attr({
	style: "display: none"
	});
	}
	 */

	$(document).ready(function () {
		$("#donate").click(function () {
			donate();
		});
	});

	$(document).ready(function () {
		$("#profile").click(function () {
			if (l.user.given) {
				if ($scope.html_profile.innerHTML == "CLOSE THAT") {
					$("#profilebox").animate({
						opacity: 0
					}, 250, $.bez([0.4, 0.0, 1, 1]), function () {
						$("#profilebox").animate({
							height: 0
						}, 400, $.bez([0.4, 0.0, 0.2, 1]), function () {
							$("#profilebox").attr({
								style: "height: 0;display:none;opacity: 0;"
							});
						});
					});
					$scope.html_profile.innerHTML = "ADD THEM TO YOUR PROFILE";

				}
				else {
					if (collectionhere === 0) {
						urlarray = [];

						if (starbadge1 != "undefined") {
							urlarray.push(starbadge1.firstChild.src.slice(0, starbadge1.firstChild.src.indexOf("500px")) + "170px.png");
						}
						if (starbadge2 != "undefined") {
							urlarray.push(starbadge2.firstChild.src.slice(0, starbadge2.firstChild.src.indexOf("500px")) + "170px.png");
						}
						if (starbadge3 != "undefined") {
							urlarray.push(starbadge3.firstChild.src.slice(0, starbadge3.firstChild.src.indexOf("500px")) + "170px.png");
						}
						if (rolebadge1 != "undefined") {
							urlarray.push(rolebadge1.firstChild.src.slice(0, rolebadge1.firstChild.src.indexOf("500px")) + "170px.png");
						}
						if (rolebadge2 != "undefined") {
							urlarray.push(rolebadge2.firstChild.src.slice(0, rolebadge2.firstChild.src.indexOf("500px")) + "170px.png");
						}
						if (verifiedartistbadge != "undefined") {
							urlarray.push(verifiedartistbadge.firstChild.src.slice(0, verifiedartistbadge.firstChild.src.indexOf("500px")) + "170px.png");
						}
					}
					else {
						urlarray = [];

						z = 0;
						while (z < collectiondom.children.length) {
							urlarray.push(collectiondom.children[z].firstChild.src.slice(0, collectiondom.children[z].firstChild.src.indexOf("500px")) + "170px.png");
							z = z + 1;
						}
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
					$scope.html_generatedtext.innerHTML = gentext;
					$scope.html_profiletext.innerHTML = "You are " + name + "? Just copy-paste this text to your profile bio:";
					$("#profilebox").attr({
						style: "height: 0;display:flex;opacity: 0;"
					});
					$("#generatedtext").attr({
						style: "opacity: 1;"
					});
					$("#profilehr").attr({
						style: "opacity: 1;"
					});
					$("#customize").attr({
						style: "opacity: 1;"
					});
					$("#authenticate").attr({
						style: "opacity: 1;"
					});
					$("#profiletext").attr({
						style: "opacity: 1;"
					});
					$("#profilebox").animate({
						height: "350px"
					}, 400, $.bez([0.4, 0.0, 0.2, 1]), function () {
						$scope.html_profile.innerHTML = "CLOSE THAT";
						$("#profilebox").animate({
							opacity: 1
						}, 250, $.bez([0.0, 0.0, 0.2, 1]));
					});
				}
			}
		});
	});

	$(document).ready(function () {
		$("#about").click(function () {
			about();
		});
	});

	// bind();


	// warmupyahooapi();

	// ---------------------------------------------
	// CHECK IF IN ELECTRON ------------------------
	// ---------------------------------------------
	if (navigator.userAgent === "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36") {
		userindexvalue = 172;
	}
	else {
		userindexvalue = 175;
	}
	// ---------------------------------------------
	// ---------------------------------------------
	// ---------------------------------------------
};

// ANGULARJS

array = ["$scope", "$timeout", "$mdSidenav", "$mdDialog", "$window", "$http", "$q", mainfunction];

var badges = angular.module('badges', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache']);

badges.config(["$mdIconProvider", "$qProvider", function ($mdIconProvider, $qProvider) {
	$mdIconProvider.defaultIconSet('libraries/mdi/svg/mdi.svg');
	$qProvider.errorOnUnhandledRejections(false);
}]);

badges.controller("all", array);