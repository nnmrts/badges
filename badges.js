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

	$scope.s = {};
	
	$scope.d = {};

	// UI FUNCTIONS
	$scope.ui = {
		newtab: function () {
			$scope.url = {
				github: 'https://github.com/nnmrts/badges',
				impressum: 'https://www.pumpn.net/impressum.html'
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
			$scope.s.firstloop = true;

			// INIT LOOP
			$scope.searchloop();
		},
		profile: function () {
			
			animateclass = "animated pulse";
			
			if ($scope.s.user.given) {
				if ($scope.buttons.profile.text == "close that") {
					
					$scope.buttons.profile.text = "add them to your profile";
					
					$('#profile').removeClass(animateclass).addClass(animateclass).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
						$(this).removeClass(animateclass);
					});
					
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

				}
				else {
					$scope.buttons.profile.text = "close that";
					
					$('#profile').removeClass(animateclass).addClass(animateclass).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
						$(this).removeClass(animateclass);
					});
					
					if (!$scope.d.collection.given) {
						
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
						
						$("#profilebox").animate({
							opacity: 1
						}, 250, $.bez([0.0, 0.0, 0.2, 1]));
					});
				}
			}
		}
	};

	// INIT SEARCH FUNCTION WHEN PRESSING ENTER
	$("input").keypress(function (event) {
		if (event.which == 13) {
			event.preventDefault();
			$scope.ui.search();
		}
	});
	
	// BIG LOOP FUNCTION
	//---------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------
	
	$scope.searchloop = function () {
		NProgress.inc();

		$scope.$applyAsync();

		// FIRST LOOP (for setup and resetting...)
		if ($scope.s.firstloop) {
			
			$scope.user = {};

			isnothing = "no";

			// RESET/DEFINE VARIABLES
			$scope.s = {
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
			$scope.searchloop();
		}
		else {
			if (!$scope.s.error.occurred) {
				if (!$scope.s.user.given) {
					// IS ID GIVEN?
					if (!$scope.s.id.given) {
						// IS INPUT CHECKED?
						if (!$scope.s.input.checked) {
							// CHECK IF INPUT VALID
							if ($scope.logininput.match("^[#%^&\{\}\]\[\(\)\`\'<>\|\ ]*$") !== null || $scope.logininput.match(/\\/) !== null || $scope.logininput.match("\"") !== null) {
								$scope.s.input.valid = false;
								console.log("S: INPUT NOT VALID");
								$scope.s.input.checked = true;
								console.log("S: INPUT CHECKED");
							}
							else {
								$scope.s.input.valid = true;
								console.log("S: INPUT VALID");
								$scope.s.input.checked = true;
								console.log("S: INPUT CHECKED");
							}
							
							$scope.searchloop();
						}
						else {
							// IS INPUT VALID?
							if ($scope.s.input.valid) {
								// IS SERVER CHECKED?
								if (!$scope.s.server.checked) {
									// CHECK IF ID ON SERVER
									$scope.s.server.data = $http.get($scope.homepath + "ids/" + $scope.logininput.toUpperCase().replace(/\s+/g, "-") + ".txt", {
										responseType: "text"
									});

									$q.when($scope.s.server.data, function () {
										if ($scope.s.server.data.$$state.value.data.length < 10) {
											$scope.user.id = $scope.s.server.data.$$state.value.data;
											$scope.s.id.given = true;
											console.log("S: ID GIVEN");
											$scope.s.id.fromserver = true;
											console.log("S: ID FROM SERVER");
										}
										$scope.s.server.checked = true;
										console.log("S: SERVER CHECKED");
										
										$scope.searchloop();
									});
								}
								else {
									// IS YAHOO CHECKED?
									if (!$scope.s.yahoo.checked) {
										// IS YAHOO INDEX OVER -1?
										if ($scope.s.yahoo.index > -1) {

											$scope.s.yahoo.url = "https://query.yahooapis.com/v1/public/yql?q=select * from html where url='https://genius.com/" + $scope.logininput.toUpperCase().replace(/\s+/g, "-") + "'and%20xpath=%27(//preload-content)[last()-" + $scope.s.yahoo.index + "]%27&format=json";

											$scope.s.yahoo.data = $http.get($scope.s.yahoo.url);

											$q.when($scope.s.yahoo.data, function () {
												$scope.s.yahoo.source = $scope.s.yahoo.data.$$state.value.data;
												sourcestring1 = JSON.stringify($scope.s.yahoo.source);
												if (sourcestring1.indexOf("user") < 200 && sourcestring1.indexOf("user") != -1) {
													findid();
													$scope.s.id.given = true;
													console.log("S: ID GIVEN");
													$scope.s.id.fromyahoo = true;
													console.log("S: ID FROM YAHOO");
													$scope.s.yahoo.checked = true;
													console.log("S: YAHOO CHECKED");
													$scope.s.yahoo.oldindex = $scope.s.yahoo.index;
													$scope.s.yahoo.index = -1;
												}
												else {
													$scope.s.yahoo.index = $scope.s.yahoo.index - 1;
												}
												$scope.searchloop();
											});
										}
										else {
											$scope.s.yahoo.checked = true;
											console.log("S: YAHOO CHECKED");
											$scope.searchloop();
										}
									}
									else {
										if ($scope.logininput !== "") {
											$scope.s.error.occurred = true;
											console.log("S: ERROR OCCURRED");
											$scope.s.error.notfound = true;
											console.log("S: ERROR: NOT FOUND");
										}
										else {
											// EASTER EGG
											$scope.s.error.occurred = true;
											console.log("S: ERROR OCCURRED");
											$scope.s.error.inputempty = true;
											console.log("S: ERROR: INPUT EMPTY");
										}
										$scope.searchloop();
									}
								}
							}
							else {
								$scope.s.error.occurred = true;
								console.log("S: ERROR OCCURRED");
								$scope.s.error.inputinvalid = true;
								console.log("S: ERROR: INPUT INVALID");
								$scope.searchloop();
							}

						}
					}
					else {
						// IS ID FROM SERVER?
						if (!$scope.s.id.fromserver) {
							// SAVE ID ON SERVER
							phpid = new FormData();
							phpid.append("phpid", $scope.user.id);
							phpid.append("phplogin", $scope.logininput.toUpperCase().replace(/\s+/g, "-"));
							xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP");
							xhr.open('post', 'saveid.php', true);
							xhr.send(phpid);
							console.log("S: ID SAVED ON SERVER");
						}

						// GET JSON FROM GENIUS
						geniusurl = "https://api.genius.com/users/" + $scope.user.id + "?access_token=lUQ8rzBeb78dJdtUcBbE4Jh-jfO88nfoDxHV3Ji3iOz268lNbYAYh8G0PjlcV-ma";

						$.getJSON(geniusurl).done(function (data) {
							$scope.s.genius.source = data;
							$scope.s.user.given = true;
							scope.$apply(function () {
								scope.s.user.given = true;
								console.log("S: USER GIVEN");
							});
							$scope.searchloop();

						});
					}
				}
				else {
					$scope.user = $scope.s.genius.source.response.user;
					console.log("S: END LOOP");
					$scope.doit();
				}
			}
			else {
				if ($scope.s.error.inputinvalid) {

				}
				else {
					if ($scope.s.error.notfound) {
						$scope.buttons.profile.text = "nothing here";

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
						if ($scope.s.error.inputempty) {
							NProgress.done();
							$("#optionscontainer").attr({
								style: "width: 100%;height: initial;background: #fff;display: flex;justify-content: space-around;align-items: center;flex-direction: row;position: static;margin: 30px 0 30px;"
							});

							$("#buttoncontainer").attr({
								style: "padding-top: 5vh;padding-bottom: 5vh;"
							});

							$("#info").attr({
								style: "display: none;"
							});


							$scope.s.time.endtime = $.now();
							$scope.s.time.waitingtime = $scope.s.time.endtime - $scope.s.time.starttime;
							$scope.s.time.waitingtimeinseconds = $scope.s.time.waitingtime / 1000;

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

							$scope.buttons.profile.text = "nothing here";

							$scope.html_generatedtext.innerHTML = "";
							$("#nothing:hidden").fadeIn(250, $.bez([0.0, 0.0, 0.2, 1]));

							$("#loadingcontainer").fadeOut(250, $.bez([0.4, 0.0, 1, 1]));
						}
					}
				}
			}
		}
	};
	
	$scope.doit = function () {
		// RESET FIRST LOOP BOOLEAN
		$scope.d.firstloop = true;

		// INIT LOOP
		$scope.doitloop();
	};
	
	$scope.doitloop = function () {
		
		NProgress.inc();
		
		$scope.$applyAsync();
		
		if ($scope.d.firstloop) {
			
			$scope.user.stars = 0;

			$scope.d = {
				firstloop: false,
				collection: {
					checked: false,
					given: false
				},
				badgescontainer: {
					emptied: false
				}
			};

			// LOOP IT BRUH
			$scope.doitloop();
		}
		else {
			if (!$scope.d.badgescontainer.emptied) {
				while ($scope.html_badgescontainer.firstChild) {
					$scope.html_badgescontainer.removeChild($scope.html_badgescontainer.firstChild);
				}
				
				$scope.d.badgescontainer.emptied = true;
				console.log("D: BADGESCONTAINER EMPTIED");
				
				$scope.doitloop();
			}
			else {
				if (!$scope.d.collection.checked) {
					
					$scope.d.collection.data = $http.get($scope.homepath + "collections/" + $scope.logininput.toUpperCase().replace(/\s+/g, "-") + ".txt", {
							responseType: "text"
					});

					$q.when($scope.d.collection.data, function () {
						if (JSON.stringify($scope.d.collection.data.$$state.value.data).indexOf("{") === 0) {
							$scope.user.collection = $scope.d.collection.data.$$state.value.data;
							
							$scope.d.collection.given = true;
							console.log("D: COLLECTION GIVEN");
						}
						
						$scope.d.collection.checked = true;
						console.log("D: COLLECTION CHECKED");
						
						$scope.doitloop();
					});
				}
				else {
					insert();
					
					$scope.$applyAsync();
					
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

					$scope.buttons.profile.text = "add them to your profile";

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

					window.history.pushState($scope.user.login + "'s badges collection", "Badges", $scope.currentpath.slice(0, (nthIndex($scope.currentpath, "/", 3) + 1)) + $scope.user.login.toUpperCase().replace(/\s+/g, "-").toLowerCase());
				}
			}
		}
	};
	
	$scope.doit2 = function () {

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

				$scope.buttons.profile.text = "add them to your profile";

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

				$scope.buttons.profile.text = "add them to your profile";

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
			$scope.user.id = $scope.s.genius.source.response.user.id;
		}
		else {
			$scope.user.id = JSON.parse($scope.s.yahoo.source.query.results["preload-content"]["data-preload_data"]).user.id;
		}
	};

	/* findavatar = function () {
		$scope.user.avatar = $scope.s.genius.source.responseJSON.response.user.avatar;
	};

	findname = function () {
		$scope.user.name = $scope.s.genius.source.responseJSON.response.user.name;
	};

	findlogin = function () {
		$scope.user.login = $scope.s.genius.source.responseJSON.response.user.login;
	};

	findlink = function () {
		link = "https://genius.com/" + login;
	};

	findiq_for_display = function () {
		$scope.user.iq_for_display = $scope.s.genius.source.responseJSON.response.user.iq_for_display;
	};

	findrole_for_display = function () {
		$scope.user.role_for_display = $scope.s.genius.source.responseJSON.response.user.role_for_display;
	};

	findroles_for_display = function () {
		$scope.user.roles_for_display = $scope.s.genius.source.responseJSON.response.user.roles_for_display;
	};

	findiq = function () {
		$scope.user.iq = $scope.s.genius.source.responseJSON.response.user.iq;
	};

	findtranscriptions_count = function () {
		$scope.user.transcriptions_count = $scope.s.genius.source.responseJSON.response.user.stats.transcriptions_count;
	};

	findannotations_count = function () {
		$scope.user.annotations_count = $scope.s.genius.source.responseJSON.response.user.stats.annotations_count;
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

			fragment = create("<svg id='role_icon' src='equilateral_triangle.svg' xmlns='https://www.w3.org/2000/svg' viewBox='0 0 9 7' version='1.1' style='fill: #ffffff;width: 1rem;height: 1rem;stroke: #9a9a9a;stroke-width: 1px;top: 2px;position: relative;display: block'><path id='role_icon_path' d='M8.25 6.418L4.25 0l-4 6.418z' cx='74' cy='10' r='9'></path></svg>");
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

				fragment = create("<svg id='role_icon' src='square.svg' xmlns='https://www.w3.org/2000/svg' viewBox='0 0 20 20' version='1.1' style='fill: #ff518c;width: .9rem;height: .9rem;stroke: #9a9a9a;stroke-width: 2px;position: relative;display: block'><path id='role_icon_path' d='M1.5 1.5h17v17h-17z' cx='74' cy='10' r='9'></path></svg>");
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

					fragment = create("<svg id='role_icon' src='square.svg' xmlns='https://www.w3.org/2000/svg' viewBox='0 0 20 20' version='1.1' style='fill: #ffff64;width: .9rem;height: .9rem;stroke: #9a9a9a;stroke-width: 2px;position: relative;display: block'><path id='role_icon_path' d='M1.5 1.5h17v17h-17z' cx='74' cy='10' r='9'></path></svg>");
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

						fragment = create("<svg id='role_icon' src='diamond.svg' xmlns='https://www.w3.org/2000/svg' viewBox='0 0 22 22' version='1.1' style='fill: #7689e8;width: 1.05rem;height: 1.05rem;stroke: #9a9a9a;stroke-width: 2px;position: relative;display: block'><path id='role_icon_path' d='M11 1.95l8.98 8.98L11 19.91l-8.98-8.98z' cx='74' cy='10' r='9'></path></svg>");
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

							fragment = create("<svg id='role_icon' src='circle.svg' xmlns='https://www.w3.org/2000/svg' viewBox='64 0 20 20' version='1.1' style='fill: #b0c4de;width: .9rem;height: .9rem;stroke: #9a9a9a;stroke-width: 2px;position: relative;display: block'><circle id='role_icon_circle' d='M1.5 1.5h17v17h-17z' cx='74' cy='10' r='9'></circle></svg>");
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

								fragment = create("<svg id='role_icon' src='checky.svg' xmlns='https://www.w3.org/2000/svg' viewBox='0 0 11 11' version='1.1' width='14px' height='14px' style='fill: #38ef51;    height: 17px;margin: 0 2px;top: 2px;width: 17px;stroke: #fff;position: relative;display: block'><polygon points='5.5 0 10.2631397 2.75 10.2631397 8.25 5.5 11 0.736860279 8.25 0.736860279 2.75 '></polygon><path d='M2.5,5.5 L4.5,7.5' stroke-width='1.2' stroke-linecap='square'></path><path d='M4.5,7.5 L8.5,3.5' stroke-width='1.2' stroke-linecap='square'></path></svg>");
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
		
		$scope.user.stars = $scope.user.stars + badgeid;
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
				badge.setAttribute("src", $scope.badgespath + zeroFill(categoryid, 3) + "%20" + capitalizeFirstLetter(category) + "%20Badges/genius-" + zeroFill(categoryid, 3) + "-" + zeroFill(badgeid, 3) + badgename + category + "500px.png?time=" + jQuery.now());
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
				badge.setAttribute("src", $scope.badgespath + zeroFill(categoryid, 3) + "%20" + capitalizeFirstLetter(category) + "%20Badges/genius-" + zeroFill(categoryid, 3) + "-" + zeroFill(badgeid, 3) + badgename + category + "500px.png?time=" + jQuery.now());
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
			if ($scope.user.role_for_display === null) {
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
			badge.setAttribute("src", $scope.badgespath + "004%20Role%20Badges/genius-004-" + zeroFill(badgeid, 3) + badgename + "500px.png?time=" + jQuery.now());
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
			badge.setAttribute("src", $scope.badgespath + "005%20Verified%20Artist%20Badges/genius-005-001verifiedartist500px.png?time=" + jQuery.now());
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

			rolebadgechooser($scope.user.role_for_display, 1);
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
		url = "https://query.yahooapis.com/v1/public/yql?q=select * from html where url='https://genius.com/SinaTheQueen'&format=json";

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