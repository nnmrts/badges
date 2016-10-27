/*global name:true */
function init() {
	$.get("ids2.js");
	
	
	html_search = document.getElementById("search");
	html_generatedtext = document.getElementById("generatedtext");
	html_profiletext = document.getElementById("profiletext");
	html_profile = document.getElementById("profile");

	html_userinfo = document.getElementById("userinfo");
	html_usererror = document.getElementById("usererror");
	html_loading = document.getElementById("loading");

	html_avatar = document.getElementById("avatar");
	html_annotations_count = document.getElementById("annotations_count");
	html_transcriptions_count = document.getElementById("transcriptions_count");
	html_namelink = document.getElementById("namelink");
	html_name = document.getElementById("name");
	html_login = document.getElementById("login");
	html_iq_for_display = document.getElementById("iq_for_display");
	html_divider = document.getElementById("divider");
	html_iconbox = document.getElementById("iconbox");
	html_role_icon = document.getElementById("role_icon");
	html_role_icon_path = document.getElementById("role_icon_path");
	html_role_icon2 = document.getElementById("role_icon2");
	html_role_for_display = document.getElementById("role_for_display");

	html_badgescontainer = document.getElementById("badgescontainer");

	html_stars = document.getElementById("stars");

	html_nouser = document.getElementById("nouser");

	html_wait = document.getElementById("wait");

	pathactivated = 1;
	circleactivated = 0;
	polygonactivated = 0;

	nthIndex = function(str, pat, n) {
		var L = str.length;
		var i = -1;
		while (n-- && i++ < L) {
			i = str.indexOf(pat, i);
		}
		return i;
	};

	function htmlEntities(str) {
		return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	}

	function createVariable(varName, varContent) {
		var scriptStr = "var " + varName + "= " + varContent + "";

		var nodescriptCode = document.createTextNode(scriptStr);
		var nodescript = document.createElement("script");
		nodescript.type = "text/javascript";
		nodescript.setAttribute("class", "momentscript");
		nodescript.appendChild(nodescriptCode);

		var nodehead = document.getElementsByTagName("head")[0];
		nodehead.appendChild(nodescript);
	}

	function donate() {
		bootbox.dialog({
			message: '<div id="message1"><h2>GIMME MONEY<\/h2><br>sooo, i\'m 17 and did all this just for fun...you don\'t need to give me money to earn a badge or something like that, but if you want to support this project, feel free to go on <a href="https://nnmrts.bandcamp.com/album/mittlerweile?action=download&from=embed">my bandcamp page</a> and just enter a price you want for an album you want<br><small>- nano miratus, was too lazy to setup a paypal donate button</small><br><br><br><\/div><iframe style="border: 0; width: 100%; height: 120px;" src="https://bandcamp.com/EmbeddedPlayer/album=1755031164/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless><a href="http://nnmrts.bandcamp.com/album/mittlerweile">Mittlerweile by Nano Miratus</a></iframe><br><h3>cheerio<\/h3>',
			title: "DONATE",
			buttons: {
				success: {
					label: "No!",
					className: "button",
					callback: function() {}
				}
			}
		});
	}

	$(document).ready(function() {
		$("#donate").click(function() {
			donate();
		});
	});

	$(document).ready(function() {
		$("#profile").click(function() {
			if (userhere === 0) {}
			else {
				if (html_profile.innerHTML == "CLOSE THAT") {
					$("#profiletext").animate({
						opacity: 0
					}, 500, function() {});
					$("#generatedtext").animate({
						opacity: 0
					}, 500, function() {});
					$("#profilebox").animate({
						marginTop: 0,
						marginBottom: 0,
						height: 0
					}, 1000, function() {
						html_profile.innerHTML = "ADD THEM TO YOUR PROFILE";
					});
				}
				else {
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
					if (verifiedartistbadge != "undefined") {
						urlarray.push(verifiedartistbadge.firstChild.src.slice(0, verifiedartistbadge.firstChild.src.indexOf("500px")) + "170px.png");
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

					gentext = htmlEntities(gentexthtml);
					html_generatedtext.innerHTML = gentext;
					html_profiletext.innerHTML = "You are " + name + "? Just copy-paste this text to your profile bio:";
					$("#profilebox").animate({
						marginTop: "-41px",
						marginBottom: "41px",
						height: "200px"
					}, 1000, function() {
						$("#profiletext").animate({
							opacity: 1
						}, 500, function() {
							// Animation complete.
						});
						$("#generatedtext").animate({
							opacity: 1
						}, 500, function() {});
						html_profile.innerHTML = "CLOSE THAT";
					});

				}
			}
		});
	});

	function about() {
		bootbox.dialog({
			message: '<div id="message1"><h2>HEY HEY HEY<\/h2><br>okay, dis hard to explain...you know, there are some users on a website called genius.com and they can collect points called "iq" for annotating lyrics like darude sandstorm or so...long story short, i made badges for them and reading that text was totally a waste of time for you<br><small>- nano miratus, exaggerating small ass things since 2013</small><br><br><img src="http://i.imgur.com/9PmIlRx.gif"/><\/div><br><h3>swigswag bye<\/h3>',
			title: "ABOUT",
			buttons: {
				success: {
					label: "Alright!",
					className: "button",
					callback: function() {}
				}
			}
		});
	}

	$(document).ready(function() {
		$("#about").click(function() {
			about();
		});
	});

	/* $.get("ids.js", function(response) {}, "script"); */

	
	
	
	function zeroFill(number, width) {
		width -= number.toString().length;
		if (width > 0) {
			return new Array(width + (/\./.test(number) ? 2 : 1)).join("0") + number;
		}
		return number + ""; // always return a string
	}



	capitalizeFirstLetter = function(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	function create(htmlStr) {
		var frag = document.createDocumentFragment();
		var temp = document.createElement("div");
		temp.innerHTML = htmlStr;
		while (temp.firstChild) {
			frag.appendChild(temp.firstChild);
		}
		return frag;
	}

	findid = function() {
		var start1 = nthIndex(sourcestring1, "\\\"id\\\"", 2);

		var end1 = nthIndex(sourcestring1, "\\\"iq\\\"", 3);

		id = sourcestring1.slice((start1 + 7), (end1 - 1));

		// id =


	};

	findavatar = function() {
		avatar = geniussource.responseJSON.response.user.avatar.medium.url;
	};

	findname = function() {
		name = geniussource.responseJSON.response.user.name;
	};
	
	findlogin = function() {
		login = geniussource.responseJSON.response.user.login;
	};

	findlink = function() {
		link = "https://genius.com/" + login;
	};

	findiq_for_display = function() {
		iq_for_display = geniussource.responseJSON.response.user.iq_for_display;
	};

	findrole_for_display = function() {
		role_for_display = geniussource.responseJSON.response.user.role_for_display;
	};

	findroles_for_display = function() {
		roles_for_display = geniussource.responseJSON.response.user.roles_for_display;
	};

	findiq = function() {
		iq = geniussource.responseJSON.response.user.iq;
	};

	findtranscriptions_count = function() {
		transcriptions_count = geniussource.responseJSON.response.user.stats.transcriptions_count;
	};

	findannotations_count = function() {
		annotations_count = geniussource.responseJSON.response.user.stats.annotations_count;
	};

	find = function() {
		findavatar();
		findname();
		findlogin();
		findlink();
		findiq_for_display();
		findrole_for_display();
		findroles_for_display();
		findiq();
		findtranscriptions_count();
		findannotations_count();
	};

	//-------------------------------------------------------------------------
	//-------------------------------------------------------------------------
	//-------------------------------------------------------------------------

	insertavatar = function() {
		html_avatar.style = "background-image: url(" + avatar + ")";
	};
	insertstats = function() {
		html_annotations_count.innerHTML = annotations_count;
		html_transcriptions_count.innerHTML = transcriptions_count;
	};

	insertnamelink = function() {
		html_namelink.setAttribute("href", link);
	};
	insertname = function() {
		html_name.innerHTML = emojione.shortnameToImage(emojione.toShort(name));
	};
	insertlogin = function() {
		html_login.innerHTML = login;
	};
	insertiq_for_display = function() {
		html_iq_for_display.innerHTML = iq_for_display;
	};
	insertrole_for_display = function() {
		if (role_for_display !== null) {
			html_role_for_display.innerHTML = role_for_display.replace(/[_]/g, " ");
		}
	};
	insertrole_icon = function() {
		// CONTRIBUTOR
		if (is.startWith(role_for_display, 'co') === true) {
			html_divider.setAttribute("style", "display: inline-block");
			html_iconbox.setAttribute("style", "display: inline-block");
			html_role_for_display.setAttribute("style", "display: inline-block");
			//------------------------------------------------------------
			//------------------------------------------------------------
			//------------------------------------------------------------

			html_role_icon.setAttribute("style", "display: none");
			html_iconbox.removeChild(html_role_icon);

			fragment = create("<svg id='role_icon' src='equilateral_triangle.svg' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 9 7' version='1.1' style='fill: #ffffff;width: 1rem;height: 1rem;stroke: #9a9a9a;stroke-width: 1px;top: 2px;position: relative;display: block'><path id='role_icon_path' d='M8.25 6.418L4.25 0l-4 6.418z' cx='74' cy='10' r='9'></path></svg>");
			// You can use native DOM methods to insert the fragment:
			html_iconbox.insertBefore(fragment, html_iconbox.childNodes[0]);
			html_role_icon = document.getElementById("role_icon");
		}
		else {
			// MEDIATOR
			if (is.startWith(role_for_display, 'me') === true) {
				html_divider.setAttribute("style", "display: inline-block");
				html_iconbox.setAttribute("style", "display: inline-block");
				html_role_for_display.setAttribute("style", "display: inline-block");
				//------------------------------------------------------------
				//------------------------------------------------------------
				//------------------------------------------------------------

				html_role_icon.setAttribute("style", "display: none");
				html_iconbox.removeChild(html_role_icon);

				fragment = create("<svg id='role_icon' src='square.svg' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' version='1.1' style='fill: #ff518c;width: .9rem;height: .9rem;stroke: #9a9a9a;stroke-width: 2px;position: relative;display: block'><path id='role_icon_path' d='M1.5 1.5h17v17h-17z' cx='74' cy='10' r='9'></path></svg>");
				// You can use native DOM methods to insert the fragment:
				html_iconbox.insertBefore(fragment, html_iconbox.childNodes[0]);
				html_role_icon = document.getElementById("role_icon");
			}
			else {
				// EDITOR
				if (is.startWith(role_for_display, 'ed') === true) {
					html_divider.setAttribute("style", "display: inline-block");
					html_iconbox.setAttribute("style", "display: inline-block");
					html_role_for_display.setAttribute("style", "display: inline-block");
					//------------------------------------------------------------
					//------------------------------------------------------------
					//------------------------------------------------------------

					html_role_icon.setAttribute("style", "display: none");
					html_iconbox.removeChild(html_role_icon);

					fragment = create("<svg id='role_icon' src='square.svg' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' version='1.1' style='fill: #ffff64;width: .9rem;height: .9rem;stroke: #9a9a9a;stroke-width: 2px;position: relative;display: block'><path id='role_icon_path' d='M1.5 1.5h17v17h-17z' cx='74' cy='10' r='9'></path></svg>");
					// You can use native DOM methods to insert the fragment:
					html_iconbox.insertBefore(fragment, html_iconbox.childNodes[0]);
					html_role_icon = document.getElementById("role_icon");
				}
				else {
					// MODERATOR
					if (is.startWith(role_for_display, 'mo') === true) {
						html_divider.setAttribute("style", "display: inline-block");
						html_iconbox.setAttribute("style", "display: inline-block");
						html_role_for_display.setAttribute("style", "display: inline-block");
						//------------------------------------------------------------
						//------------------------------------------------------------
						//------------------------------------------------------------

						html_role_icon.setAttribute("style", "display: none");
						html_iconbox.removeChild(html_role_icon);

						fragment = create("<svg id='role_icon' src='diamond.svg' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 22 22' version='1.1' style='fill: #7689e8;width: 1.05rem;height: 1.05rem;stroke: #9a9a9a;stroke-width: 2px;position: relative;display: block'><path id='role_icon_path' d='M11 1.95l8.98 8.98L11 19.91l-8.98-8.98z' cx='74' cy='10' r='9'></path></svg>");
						// You can use native DOM methods to insert the fragment:
						html_iconbox.insertBefore(fragment, html_iconbox.childNodes[0]);
						html_role_icon = document.getElementById("role_icon");
					}
					else {
						// REGULATOR
						if (is.startWith(role_for_display, 're') === true) {
							html_role_for_display.innerHTML = "Staff";
							html_divider.setAttribute("style", "display: inline-block");
							html_iconbox.setAttribute("style", "display: inline-block");
							html_role_for_display.setAttribute("style", "display: inline-block");
							//------------------------------------------------------------
							//------------------------------------------------------------
							//------------------------------------------------------------

							html_role_icon.setAttribute("style", "display: none");
							html_iconbox.removeChild(html_role_icon);


							fragment = create("<svg id='role_icon' src='circle.svg' xmlns='http://www.w3.org/2000/svg' viewBox='64 0 20 20' version='1.1' style='fill: #b0c4de;width: .9rem;height: .9rem;stroke: #9a9a9a;stroke-width: 2px;position: relative;display: block'><circle id='role_icon_circle' d='M1.5 1.5h17v17h-17z' cx='74' cy='10' r='9'></circle></svg>");
							// You can use native DOM methods to insert the fragment:
							html_iconbox.insertBefore(fragment, html_iconbox.childNodes[0]);
							html_role_icon = document.getElementById("role_icon");
						}
						else {
							// VERIFIED ARTIST
							if (is.startWith(role_for_display, 've') === true) {
								html_divider.setAttribute("style", "display: inline-block");
								html_iconbox.setAttribute("style", "display: inline-block");
								html_role_for_display.setAttribute("style", "display: inline-block");
								//------------------------------------------------------------
								//------------------------------------------------------------
								//------------------------------------------------------------
								html_role_icon.setAttribute("style", "display: none");
								html_iconbox.removeChild(html_role_icon);


								fragment = create("<svg id='role_icon' src='checky.svg' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 11 11' version='1.1' width='14px' height='14px' style='fill: #38ef51;    height: 17px;margin: 0 2px;top: 2px;width: 17px;stroke: #fff;position: relative;display: block'><polygon points='5.5 0 10.2631397 2.75 10.2631397 8.25 5.5 11 0.736860279 8.25 0.736860279 2.75 '></polygon><path d='M2.5,5.5 L4.5,7.5' stroke-width='1.2' stroke-linecap='square'></path><path d='M4.5,7.5 L8.5,3.5' stroke-width='1.2' stroke-linecap='square'></path></svg>");
								// You can use native DOM methods to insert the fragment:
								html_iconbox.insertBefore(fragment, html_iconbox.childNodes[0]);
								html_role_icon = document.getElementById("role_icon");
							}
							else {
								// NO ROLE
								html_divider.setAttribute("style", "display: none");
								html_role_icon.setAttribute("style", "display: none");
								html_iconbox.setAttribute("style", "display: none");
								html_role_for_display.setAttribute("style", "display: none");
								html_role_icon = document.getElementById("role_icon");
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

	amount2id = function(type) {
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
	};

	starbadgenamechooser = function(badgeid) {
		badgenames = [{0: ""}, {1: "coal"}, {2: "copper"}, {3: "bronze"}, {4: "silver"}, {5: "gold"}, {6: "platinum"}, {7: "sapphire"}, {8: "amber"}, {9: "emerald"}, {10: "topaz"}, {11: "opal"}, {12: "amethyst"}, {13: "ruby"}, {14: "yellowdiamond"}, {15: "greendiamond"}, {16: "reddiamond"}, {17: "diamond"}];
		badgename = badgenames[badgeid][badgeid];
	};

	starbadgecategorylist = ["genius", "transcriber", "annotator"];

	starbadgechooser = function(category, type, count) {
		categoryid = (starbadgecategorylist.indexOf(category)) + 1;
		if (categoryid == 1) {
			amount2id(type);
			starbadgenamechooser(badgeid);

			if (badgeid > 0) {
				badgebox = document.createElement("div");
				badgebox.setAttribute("class", "badgebox");
				badgebox.setAttribute("id", zeroFill(categoryid, 3) + "-" + zeroFill(badgeid, 3) + badgename + category);
				badge = document.createElement("img");
				badge.setAttribute("src", "badges/" + zeroFill(categoryid, 3) + "%20" + capitalizeFirstLetter(category) + "%20Badges/genius-" + zeroFill(categoryid, 3) + "-" + zeroFill(badgeid, 3) + badgename + category + "500px.png?time=" + jQuery.now());
				badge.setAttribute("class", "badge");
				badgebox.appendChild(badge);

				window["starbadge" + count] = badgebox;
			}
			else {
				window["starbadge" + count] = "undefined";
			}
		}
		else {
			amount2id((type) * 100);
			starbadgenamechooser(badgeid);

			if (badgeid > 0) {
				badgebox = document.createElement("div");
				badgebox.setAttribute("class", "badgebox");
				badgebox.setAttribute("id", zeroFill(categoryid, 3) + "-" + zeroFill(badgeid, 3) + badgename + category);
				badge = document.createElement("img");
				badge.setAttribute("src", "badges/" + zeroFill(categoryid, 3) + "%20" + capitalizeFirstLetter(category) + "%20Badges/genius-" + zeroFill(categoryid, 3) + "-" + zeroFill(badgeid, 3) + badgename + category + "500px.png?time=" + jQuery.now());
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

	role2id = function(role) {
		roleloop = function() {
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

	rolebadgenamechooser = function(badgeid) {
		badgenames = [{0: ""}, {1: "contributor"}, {2: "mediator"}, {3: "editor"}, {4: "moderator"}, {5: "staff"}];
		badgename = badgenames[badgeid][badgeid];
	};

	rolebadgechooser = function(role, count) {
		role2id(role);
		rolebadgenamechooser(badgeid);
		if (badgeid > 0) {
			badgebox = document.createElement("div");
			badgebox.setAttribute("class", "badgebox");
			badgebox.setAttribute("id", "004-" + zeroFill(badgeid, 3) + badgename);
			badge = document.createElement("img");
			badge.setAttribute("src", "badges/004%20Role%20Badges/genius-004-" + zeroFill(badgeid, 3) + badgename + "500px.png?time=" + jQuery.now());
			badge.setAttribute("class", "badge");
			badgebox.appendChild(badge);

			window["rolebadge" + count] = badgebox;
		}
		else {
			window["rolebadge" + count] = "undefined";
		}
	};

	verifiedartistbadgechooser = function() {
		if (geniussource.responseJSON.response.user.artist !== null) {
			badgebox = document.createElement("div");
			badgebox.setAttribute("class", "badgebox");
			badgebox.setAttribute("id", "005-001verifiedartist");
			badge = document.createElement("img");
			badge.setAttribute("src", "badges/005%20Verified%20Artist%20Badges/genius-005-001verifiedartist500px.png?time=" + jQuery.now());
			badge.setAttribute("class", "badge");
			badgebox.appendChild(badge);

			verifiedartistbadge = badgebox;
		}
		else {
			verifiedartistbadge = "undefined";
		}
	};

	insertbadges = function() {
		while (html_badgescontainer.firstChild) {
			html_badgescontainer.removeChild(html_badgescontainer.firstChild);
		}
		starbadgechooser("genius", iq, 1);
		if (starbadge1 !== "undefined") {
			html_badgescontainer.appendChild(starbadge1);
		}
		starbadgechooser("transcriber", transcriptions_count, 2);
		if (starbadge2 !== "undefined") {
			html_badgescontainer.appendChild(starbadge2);
		}
		starbadgechooser("annotator", annotations_count, 3);
		if (starbadge3 !== "undefined") {
			html_badgescontainer.appendChild(starbadge3);
		}

		rolebadgechooser(role_for_display, 1);
		if (rolebadge1 !== "undefined") {
			html_badgescontainer.appendChild(rolebadge1);
		}

		verifiedartistbadgechooser();
		if (verifiedartistbadge !== "undefined") {
			html_badgescontainer.appendChild(verifiedartistbadge);
		}

		badgesnumber = html_badgescontainer.childElementCount;



		if ((4 * (badgesnumber % 4)) === 4 && (4 * (badgesnumber % 4)) > 4) {
			html_badgescontainer.lastChild.setAttribute("class", "badgebox first");
		}
		else {
			if ((4 * (badgesnumber % 4)) === 8 && (4 * (badgesnumber % 4)) > 4) {
				html_badgescontainer.lastChild.setAttribute("class", "badgebox second");
			}
			else {
				if ((4 * (badgesnumber % 4)) === 12 && (4 * (badgesnumber % 4)) > 4) {
					html_badgescontainer.lastChild.setAttribute("class", "badgebox third");
				}
				else {
					if ((4 * (badgesnumber % 4)) === 16 && (4 * (badgesnumber % 4)) > 4) {
						html_badgescontainer.lastChild.setAttribute("class", "badgebox fourth");
					}
				}
				if (badgesnumber === 0) {
					isnothing = "yes";
					html_badgescontainer.innerHTML = "<p id='nobadges'>This user has no badges yet. Sad.</p>";
				}
			}
		}

	};


	insertstars = function() {
		if (stars > 0) {
			$("#starscontainer").attr({
				style: "display: flex"
			});
			if (stars == 1) {
				html_stars.innerHTML = stars + " STAR";
				$("#starscontainer").attr({
					style: "height: " + ((8 * stars / 51 + 17 / 5) + 2) + "vh"
				});
				$("#stars").attr({
					style: "font-size: " + (8 * stars / 51 + 17 / 5) + "vh"
				});
			}
			else {
				html_stars.innerHTML = stars + " STARS";
			}
			$("#starscontainer").attr({
				style: "height: " + ((8 * stars / 51 + 17 / 5) + 2) + "vh"
			});
			$("#stars").attr({
				style: "font-size: " + (8 * stars / 51 + 17 / 5) + "vh"
			});
		}
		else {
			$("#starscontainer").attr({
				style: "display: none"
			});
		}
	};

	insert = function() {
		insertbadges();
		insertavatar();
		insertstats();
		insertnamelink();
		insertname();
		insertlogin();
		insertiq_for_display();
		insertrole_for_display();
		insertrole_icon();
		insertstars();
	};

	doit = function() {
		stars = 0;

		find();

		insert();

		html_usererror.style.display = "none";

		html_search.innerHTML = "search again";
		$("#userinfo:hidden").attr({
			style: "display: flex;"
		});

		$("#optionscontainer").attr({
			style: "width: 100%;height: initial;background: #fff;display: flex;justify-content: space-around;align-items: center;flex-direction: row;position: static;margin-bottom: 41px;"
		});

		$("#buttoncontainer").attr({
			style: "padding-top: 5vh;padding-bottom: 5vh;"
		});

		$("#profilebox").attr({
			style: "height: 0;margin-top: initial;margin-bottom: initial"
		});

		$("#profiletext").attr({
			style: "opacity: 0"
		});

		$("#generatedtext").attr({
			style: "opacity: 0"
		});

		html_profile.innerHTML = "ADD THEM TO YOUR PROFILE";

		html_generatedtext.innerHTML = "";

		$("#infocontainer").attr({
			style: "background: #fff;width: initial;"
		});

		$("#info").attr({
			style: "text-align: center;display: flex;flex-direction: column;justify-content: space-around;"
		});

		$("#badgeslogo").attr({
			style: "width: 3vw;align-self: center;margin-bottom: 10px;height: initial;top: 0;"
		});

		$("#version").attr({
			style: "font-size: 5vmin;color: #000000;font-weight: 700;margin-top: 0;margin-bottom: 0;line-height: 80%;padding-bottom:0;"
		});

		$("#menucontainer").attr({
			style: "display: flex"
		});

		imageloop = function() {
			if (html_badgescontainer.firstChild.firstChild.complete === true) {
				$("#loadingcontainer").fadeOut(1000, function() {
					$("#loadingcontaineroverlay").fadeOut(1000, function() {
						$("#sitecontainer").attr({
							style: "position: absolute;padding: 41px 5vw 41px 5vw;margin-top: 41px;"
						});
						$("#sitecontainer").animate({
							scrollTop: $('#userinfo').offset().top
						}, 1000);
					});
				});
				console.log("images loaded");
			}
			else {
				setTimeout(function() {
						console.log("images not loaded yet");
						imageloop();
					},
					1000);
			}
		};
		if (isnothing == "no") {
			imageloop();
		}
		else {
			$("#loadingcontainer").fadeOut(1000, function() {
				$("#loadingcontaineroverlay").fadeOut(1000);
			});
		}

		data = [
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
		console.table(data);

	};

	bind();

	warmupyahooapi = function() {
		url = "https://query.yahooapis.com/v1/public/yql?q=select * from html where url='http://genius.com/SinaTheQueen'&format=json";

		source = $.getJSON(url).done(function() {
			sourcestring1 = JSON.stringify(source);
		});
	};

	// it's really a warmup...if this function wouldn't exist, the first request a user makes would take super long and eventually error then...i don't know why...it's like starting a steam machine or so :D

	// warmupyahooapi();

	$("input").keypress(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			html_search.onclick();
		}
	});

	id = 0;

	/*
	loop=function(){$("script.momentscript").remove(),0!==n?i>0?(url="https://query.yahooapis.com/v1/public/yql?q=select * from html where url='http://genius.com/"+logininput.toUpperCase()+"'and%20compat='html5'%20and%20xpath=%27(//preload-content)[last()-"+i+"]%27&format=json",source=$.getJSON(url).done(function(){sourcestring1=JSON.stringify(source),175==sourcestring1.indexOf("user")?(findid(),id_given="yes",n=0,loop()):(i-=1,loop())})):(n=0,loop()):index<300?(createVariable("momentusername","ids["+index+"].username"),logininput.toUpperCase()==momentusername.toUpperCase()?(createVariable("momentid","ids["+index+"].id"),id=momentid,id_given="yes",index=1e6,loop()):(index+=1,loop())):"no"==id_given&&0==serverchecked?$.get("ids/"+logininput.toUpperCase()+".txt",function(a){},"text").done(function(a){id=a,id_given="yes",serverchecked=1,loop()}).fail(function(a){console.log("error"),n=1,serverchecked=1,loop()}):"yes"==id_given?(geniusurl="http://api.genius.com/users/"+id+"?access_token=G6EpShLbSH5axVzAGk7o_yzK2updweNevUtHX4qMa8oUVq9WSduHHSN8V0rO9axS&format=json",geniussource=$.getJSON(geniusurl).done(function(){doit(),phpid=new FormData,phpid.append("phpid",id),phpid.append("phplogin",login.toUpperCase()),xhr=window.XMLHttpRequest?new XMLHttpRequest:new activeXObject("Microsoft.XMLHTTP"),xhr.open("post","saveid.php",!0),xhr.send(phpid)})):""!=logininput?(html_nouser.innerHTML=logininput,$("#loadingcontainer").fadeOut("slow",function(){$("#usererror:hidden").fadeIn("slow")})):$("#loadingcontainer").fadeOut("slow",function(){endtime=$.now(),waitingtime=endtime-starttime,waitingtimeinseconds=waitingtime/1e3,html_wait.innerHTML=waitingtimeinseconds,$("#nothing:hidden").fadeIn("slow")})};
	*/

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



	loop = function() {
		if (logininputchecked === 0) {
			if (logininput.match("^[#%^&\{\}\]\[\(\)\`\'<>\|\ ]*$") !== null || logininput.match(/\\/) !== null || logininput.match("\"") !== null) {
				serverchecked = 1;
				index = 300;
				logininputchecked = 1;
				loop();
			}
			else {
				logininputchecked = 1;
				loop();
			}
		}
		else {
			$("script.momentscript").remove();
			if (n !== 0) {
				if (i > 0) {
					// check if existent (yahoo)
					url = "https://query.yahooapis.com/v1/public/yql?q=select * from html where url='http://genius.com/" + logininput.toUpperCase().replace(/\s+/g, "-") + "'and%20xpath=%27(//preload-content)[last()-" + i + "]%27&format=json";

					source = $.get(url).done(function() {
						sourcestring1 = JSON.stringify(source);
						if (sourcestring1.indexOf("user") < 200 && sourcestring1.indexOf("user") != -1) {
							findid();
							id_given = "yes";
							n = 0;
							console.log("did find user on genius");
							loop();
						}
						else {
							i = i - 1;
							loop();
						}
					});
				}
				else {
					n = 0;
					console.log("didn't find user on genius");
					loop();
				}
			}
			else {
				if (serverchecked === 0) {

					// check if on server

					$.get("ids/" + logininput.toUpperCase().replace(/\s+/g, "-") + ".txt", function(response) {}, "text")
						.done(function(response) {
							id = response;
							id_given = "yes";
							serverchecked = 1;
							idonserver = 1;
							console.log("did find id on server");
							loop();
						})
						.fail(function(response) {
							serverchecked = 1;
							console.log("didn't find id on server");
							loop();
						});
				}

				else {
					if (id_given == "no" && arraychecked === 0) {

						// check if in json


						findusername = function(e) {
							return e.username.toUpperCase() === logininput.toUpperCase();
						};

						if (ids2.find(findusername) !== undefined) {
							id = ids2.find(findusername).id;
							id_given = "yes";
							arraychecked = 1;
							console.log("did find id in array");
							loop();
						}
						else {
							n = 1;
							arraychecked = 1;
							console.log("didn't find id in array");
							loop();
						}

						/*
						createVariable("momentusername", "ids2[" + index + "].username");
						if (logininput.toUpperCase() == momentusername.toUpperCase().replace(/\s+/g, "-")) {
							createVariable("momentid", "ids2[" + index + "].id");
							id = momentid;
							id_given = "yes";
							index = 1000000;
							loop();
						}
						else {
							index = index + 1;
							$("script.momentscript").remove();
							n = 1;
							loop();
						}
						*/
					}
					else {
						if (id_given == "yes") {
							geniusurl = "http://api.genius.com/users/" + id + "?access_token=lUQ8rzBeb78dJdtUcBbE4Jh-jfO88nfoDxHV3Ji3iOz268lNbYAYh8G0PjlcV-ma";

							geniussource = $.getJSON(geniusurl).done(function() {
								console.log("got json from genius api");
								doit();
								userhere = 1;

								if (idonserver === 0) {
									phpid = new FormData();
									phpid.append("phpid", id);
									phpid.append("phplogin", logininput.toUpperCase().replace(/\s+/g, "-"));
									xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP");
									xhr.open('post', 'saveid.php', true);
									xhr.send(phpid);
									console.log("saved id on server");
								}
							});
						}
						else {
							if (logininput !== "") {
								console.log("entered username was not found");
								userhere = 0;
								html_search.innerHTML = "search again";
								$("#optionscontainer").attr({
									style: "width: 100%;height: initial;background: #fff;display: flex;justify-content: space-around;align-items: center;flex-direction: row;position: static;margin-bottom: 41px;"
								});

								$("#buttoncontainer").attr({
									style: "padding-top: 5vh;padding-bottom: 5vh;"
								});

								$("#infocontainer").attr({
									style: "display: none;"
								});
								$("#loadingcontainer").fadeOut(1000, function() {
									$("#loadingcontaineroverlay").fadeOut(1000);


									$("#profilebox").attr({
										style: "height: 0;margin-top: initial;margin-bottom: initial"
									});

									$("#profiletext").attr({
										style: "opacity: 0"
									});

									$("#generatedtext").attr({
										style: "opacity: 0"
									});

									html_profile.innerHTML = "NOTHING HERE";

									html_generatedtext.innerHTML = "";

									html_nouser.innerHTML = logininput;
									$("#usererror:hidden").fadeIn("slow");
								});
							}
							else {
								console.log("user entered nothing");
								userhere = 0;
								html_search.innerHTML = "search again";
								$("#optionscontainer").attr({
									style: "width: 100%;height: initial;background: #fff;display: flex;justify-content: space-around;align-items: center;flex-direction: row;position: static;margin-bottom: 41px;"
								});

								$("#buttoncontainer").attr({
									style: "padding-top: 5vh;padding-bottom: 5vh;"
								});

								$("#infocontainer").attr({
									style: "display: none;"
								});

								$("#loadingcontainer").fadeOut(1000, function() {
									$("#loadingcontaineroverlay").fadeOut(1000);
									endtime = $.now();
									waitingtime = endtime - starttime;
									waitingtimeinseconds = waitingtime / 1000;


									$("#profilebox").attr({
										style: "height: 0;margin-top: initial;margin-bottom: initial"
									});

									$("#profiletext").attr({
										style: "opacity: 0"
									});

									$("#generatedtext").attr({
										style: "opacity: 0"
									});

									html_profile.innerHTML = "NOTHING HERE";

									html_generatedtext.innerHTML = "";

									html_wait.innerHTML = waitingtimeinseconds;
									$("#nothing:hidden").fadeIn("slow");
								});
							}
						}
					}
				}
			}
		}
	};
}

bind = function() {
	html_search.onclick = function() {

		logininput = $("#userinput").val();

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

		if ($("#optionscontainer").css("margin-bottom") == "41px") {
			$("#userinfo").fadeOut("slow", function() {
				$("#loadingcontainer:hidden").fadeIn(1000, function() {
					$("#loadingcontaineroverlay:hidden").fadeIn(1000, function() {
						//$.get("ids2.js").done(function() {
							loop();
						//});
					});
				});
			});
		}
		else {
			$("#optionscontainer").fadeOut("slow", function() {
				$("#userinfo").fadeOut("slow", function() {
					$("#loadingcontainer:hidden").fadeIn(1000, function() {
						$("#loadingcontaineroverlay:hidden").fadeIn(1000, function() {
							//$.get("ids2.js").done(function() {
								loop();
							//});
						});
					});
				});
			});
		}
	};
};