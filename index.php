<html lang="en" class="mdl-js">
	<head>
		<!-- TITLE -->
		<title>Badges</title>
		
		<link rel="author" href="humans.txt" />
		
		<!-- Google Tag Manager -->
		<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-PCSB9HM');</script>
		<!-- End Google Tag Manager -->
		
		<!-- Web Application Manifest -->
		<link rel="manifest" href="manifest.json">
		
		<meta name="mobile-web-app-capable" content="yes">
		<meta name="application-name" content="Badges">
		
		<!-- META -->
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<meta name="description" content="badgesbadgesbadgesbadgesbadgesbadges">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		
		<meta name="apple-mobile-web-app-title" content="Badges">
		<meta name="application-name" content="Badges">
		<meta name="msapplication-TileColor" content="#ffffff">
		<meta name="msapplication-TileImage" content="favicon/mstile-144x144.png?v=m2dBzPMjbw">
		<meta name="msapplication-config" content="favicon/browserconfig.xml?v=m2dBzPMjbw">
		<meta name="msapplication-tap-highlight" content="no">
		<meta name="theme-color" content="#ffffff">
		
		<!-- FAVICON -->
		<link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png?v=m2dBzPMjbw">
		<link rel="icon" type="image/png" href="favicon/favicon-32x32.png?v=m2dBzPMjbw" sizes="32x32">
		<link rel="icon" type="image/png" href="favicon/favicon-194x194.png?v=m2dBzPMjbw" sizes="194x194">
		<link rel="icon" type="image/png" href="favicon/android-chrome-192x192.png?v=m2dBzPMjbw" sizes="192x192">
		<link rel="icon" type="image/png" href="favicon/favicon-16x16.png?v=m2dBzPMjbw" sizes="16x16">
		<link rel="manifest" href="favicon/manifest.json?v=m2dBzPMjbw">
		<link rel="mask-icon" href="favicon/safari-pinned-tab.svg?v=m2dBzPMjbw" color="#ffff64">
		<link rel="shortcut icon" href="favicon/favicon.ico?v=m2dBzPMjbw">
		
		<!-- CSS -->
		<!--- LIBRARIES --->
		<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
		<link rel="stylesheet" href="libraries/normalize/normalize.css">
		
		<link rel="stylesheet" href="libraries/emojione/assets/css/emojione.css"/>
		
		<link rel="stylesheet" href="libraries/mdl/material.css"/>
		<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
		
		<link rel='stylesheet' href="libraries/nprogress/nprogress.css"/>
		
		<!--- MAIN --->
		<link rel="stylesheet" href="fonts/fonts.css">
		<link rel="stylesheet" href="style.css">
		
		<!-- JS -->
		<!--- LIBRARIES --->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
		<script src="libraries/jquery-ui-1.12.1/jquery-ui.js"></script>
		
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
		<script src="libraries/bootbox/bootbox.min.js"></script>
		
		<script src="libraries/browserify/bundle.js"></script>
		<script src="libraries/emojione/emojione.js"></script>
		<script src="libraries/is.js/is.js"></script>
		<script src="libraries/mdl/material.js"></script>
		<script src="libraries/nprogress/nprogress.js"></script>
		<script src="libraries/xhr/xhr.js"></script>
		
		<!--- MAIN --->
		<script src="badges.js"></script>
		
		<!--[if lt IE 9]>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.js"></script>
		<![endif]-->
	</head>
	<body onload="init();" class="badges-layout">
	
		<!-- Google Tag Manager (noscript) -->
		<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PCSB9HM"
		height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
		<!-- End Google Tag Manager (noscript) -->
		
		<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header badges-layout">
		<header class="mdl-layout__header badges-header">
			<div class="mdl-layout__header-row">
				<a href="http://genius.com/" class="logo_container"></a>
			</div>
		</header>
		<div class="mdl-layout__drawer">
			<span class="mdl-layout-title"><a href="">BADGES</a></span>
			<nav class="mdl-navigation">
				<div class="mdl-navigation__link" id="about">ABOUT</div>
				<div class="mdl-navigation__link" id="donate">DONATE</div>
				<a class="mdl-navigation__link" id="github" href="https://github.com/nnmrts/badges" target="_blank">GITHUB REPOSITORY</a>
				<a class="mdl-navigation__link" href="http://www.pumpn.net/impressum.html" target="_blank">PRIVACY & TERMS</a>
			</nav>
		</div>
		<main class="mdl-layout__content">
			<div id="top" class="mdl-card mdl-shadow--2dp">
				<div id="optionscontainer">
					<div id="info">
						<img id="badgeslogo" src="images/badgeslogooncircle.png"/>
						<h1 id="title">BADGES</h1>
					</div>
					<form action="#">
						<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label badges-textfield">
							<input id="userinput" class="mdl-textfield__input" type="text">
							<label class="mdl-textfield__label" for="userinput">USER</label>
						</div>
					</form>
					
					<button id="search" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">search</button>
				</div>
				<div id="menucontainer" style="display: none">
					<button id="profile" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">ADD THEM TO YOUR PROFILE</button>
				</div>
				<div id="profilebox" style="height: 0;display:none;opacity: 1;">
					<!-- window.location.search: ?code=1qaa4_qEg45nvL5d-Mt07GhfYJVEyvVC1T9qwS8gh-cVez-a1Tr6FcTByzfnJyWg&state=loggedin -->
					<span id="profiletext" style="opacity: 0;">You are SinaTheQueen? Just copy-paste this text to your profile bio:</span>
					<span id="generatedtext" style="opacity: 0;"></span>
					<hr id="profilehr" style="opacity: 0; display: none">
					<span id="customize" style="opacity: 0; display: none">Do you want to customize your badges collection? Connect with your Genius account below!</span>
					<a href="https://api.genius.com/oauth/authorize?client_id=kB4bzMdamqUMJqZsigFyrWzWLYYLwq7e6Zm9pjOF1dWxx71-iJsCjpHpkAx2FaJA&redirect_uri=http://www.pumpn.net/mag/badges2.1-weekly-201648/collection/&scope=me&state=loggedin&response_type=code" style="text-decoration: none; color: black;"><div class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" id="authenticate" style="opacity: 0; display: none">CONNECT</div></a>
				</div>
			</div>
			<div id="userinfo" class="mdl-card mdl-shadow--2dp" style="display: none;">
				<div class="BOXavatar">
					<div id="avatar" style="background-image: url(&quot;https://images.genius.com/avatars/medium/a775893c8c742f8b8dcdae21ef8c6a91&quot;);">
					</div>
				</div>
				<div class="identity">
					<div class="line1">
						<div class="BOXname">
							<a id="namelink" href="https://genius.com/SinaTheQueen"><span id="name">SinaTheQueen</span></a>
						</div>
						<div class="BOXiq_for_display">
							<span id="iq_for_display">169,880</span>
						</div>
					</div>
					<div class="line2">
						<div class="BOXlogin">
							<span>@</span><span id="login">SinaTheQueen</span>
						</div>
						<span id="divider" style="display: inline-block"> | </span>
						<div class="BOXrole_for_display">
							<div class="BOXrole_icon" id="iconbox" style="display: inline-block"><svg id="role_icon" src="diamond.svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" version="1.1" style="fill: #7689e8;width: 1.05rem;height: 1.05rem;stroke: #9a9a9a;stroke-width: 2px;position: relative;display: block"><path id="role_icon_path" d="M11 1.95l8.98 8.98L11 19.91l-8.98-8.98z" cx="74" cy="10" r="9"></path></svg>
								
								<svg id="role_icon2">
								</svg>
								<svg id="role_icon3">
								</svg>
							</div>
							<span id="role_for_display" style="display: inline-block">moderator</span>
						</div>
					</div>
				</div>
				<div id="statsbox">
					<div class="statistics_panel" id="leftstats">
						<statistics-panel-item class="statistics_panel-item">
							<div>
								<div class="statistic_and_label">
									<div class="statistic_and_label-primary">
										<svg class="inline_icon inline_icon--tall" src="bloopie.svg" viewBox="0 0 49 56" xmlns="http://www.w3.org/2000/svg">
											<g fill="none" fill-rule="evenodd">
												<path fill="#000" d="M23.29 44.936h11.646L29.113 56.17M0 0h50.463v44.936H0z"></path>
												<g fill="#FFF">
													<path d="M15.56 23.787c.04.026.084.04.14.04.14 0 .253-.104.253-.234 0-.026 0-.065-.014-.09-.37-.908-.566-1.893-.566-2.93-.014-2.294 1-4.393 2.605-5.923l.014-.013.014-.013c.026-.038.054-.09.054-.142v-2.98c0-.13-.112-.234-.253-.234h-3.25c-.07 0-.14.04-.184.077-.07.052-.127.117-.198.17-1.564 1.437-2.536 3.42-2.536 5.624 0 2.2.972 4.183 2.534 5.622.408.388.872.725 1.38 1.023zm6.053-6.22c-.14.012-.24.116-.24.233v.052c.07.66.353 1.257.803 1.723l.014.013.085.078.028.026.084.078.03.026c.027.026.055.038.083.064.014.013.028.026.042.026.028.026.057.04.085.065.014.016.028.03.042.03.025.012.053.04.07.05.01.013.026.026.054.04.028.012.056.025.07.05.014.014.042.027.056.04.03.012.058.025.07.04.016.01.044.024.058.024.027.013.055.026.07.04.028.012.042.025.07.025.028.012.042.025.07.04.028.01.043.01.07.024.03.013.043.026.07.026.03.01.043.01.07.024.03.013.044.013.072.026.028.014.056.014.084.027.028.013.043.013.07.026.03.012.057.012.085.025.03 0 .04.013.07.013.03.016.056.016.084.016.028 0 .042.013.07.013.03 0 .057.012.1.012.027 0 .04.014.07.014.028 0 .07.013.098.013.014 0 .042 0 .056.012.042 0 .084 0 .112.012h.28c1.79-.04 3.226-1.374 3.226-3.033v-2.204c0-.13.11-.233.252-.233h.9c.142 0 .254-.104.254-.233 0-.027 0-.04-.014-.066-.295-1.296-.93-2.49-1.816-3.487-.042-.05-.112-.09-.197-.09H24.89c-.14 0-.253.103-.253.233v3.06c.014 1.594-1.323 2.903-3.027 3.006z"></path>
													<path d="M34.875 11.5c-.042-.05-.112-.09-.197-.09-.14 0-.253.104-.253.233 0 .026 0 .052.014.078v.016c.645 1.555 1.01 3.266 1.01 5.03 0 7.646-6.73 13.84-15.036 13.84-1.928 0-3.773-.336-5.462-.946-.028-.013-.057-.013-.1-.013-.14 0-.252.103-.252.233 0 .077.043.14.1.18 2.562 2.255 6.025 3.63 9.84 3.63 7.885 0 14.276-5.885 14.276-13.143 0-3.512-1.492-6.687-3.942-9.046z"></path>
												</g>
											</g>
										</svg>
										<span id="annotations_count" class="statistic_and_label-number">4513</span>
									</div>
									<div class="statistic_and_label-subtext">Annotations</div>
								</div>
							</div>
						</statistics-panel-item>
					</div>
					<div class="statistics_panel" id="rightstats">
						<statistics-panel-item class="statistics_panel-item">
							<div>
								<div class="statistic_and_label">
									<div class="statistic_and_label-primary">
										<svg class="inline_icon inline_icon--tall" src="one_document.svg" xmlns="http://www.w3.org/2000/svg" viewBox="-3392 6367.9 17.4 20">
											<path d="M-3392 6367.9v20h17.4v-20h-17.4zm15.2 17.8h-13v-15.6h13v15.6z"></path>
											<path d="M-3386.3 6374.3h6v1.1h-6zm0 3.3h6v1.1h-6zm0 4.3h6v-1.1h-6v1.1"></path>
										</svg>
										<span id="transcriptions_count" class="statistic_and_label-number">339</span>
									</div>
									<div class="statistic_and_label-subtext">Transcriptions</div>
								</div>
							</div>
						</statistics-panel-item>
					</div>
				</div>
				<div id="starscontainer" style="height: 9.792156862745099vh">
					<img src="images/badgesstar.png" id="starleft">
					<span id="stars" style="font-size: 7.792156862745099vh">28 STARS</span>
					<img src="images/badgesstar.png" id="starright">
				</div>
				<div id="badgescontainer"><div class="badgebox" id="001-010topazgenius"><img src="badges/001%20Genius%20Badges/genius-001-010topazgenius500px.png?time=1477737861146" class="badge"></div><div class="badgebox" id="002-006platinumtranscriber"><img src="badges/002%20Transcriber%20Badges/genius-002-006platinumtranscriber500px.png?time=1477737861147" class="badge"></div><div class="badgebox" id="003-012amethystannotator"><img src="badges/003%20Annotator%20Badges/genius-003-012amethystannotator500px.png?time=1477737861147" class="badge"></div><div class="badgebox" id="004-004moderator"><img src="badges/004%20Role%20Badges/genius-004-004moderator500px.png?time=1477737861149" class="badge"></div><div class="badgebox" id="005-001verifiedartist"><img src="badges/005%20Verified%20Artist%20Badges/genius-005-001verifiedartist500px.png?time=1477737861150" class="badge"></div></div>
			</div>
			<div id="usererror" style="display:none">
				<div class="BOXerror">
					<span>There is no user called "</span><span id="nouser">SwigSwagSwigSwag</span><span>".</span>
				</div>
			</div>
			<div id="nothing" style="display:none">
				<div class="BOXnothing">
					<span>Wow. You entered nothing, searched for it and waited even </span><span id="wait">3.34</span><span> seconds expecting a result.
					<br>
					<br>
					So, yeah, here you have it.
					<br><br><br>
					<small id="muhahaha">Of course I could have checked if you entered nothing, <i>before</i> the whole script started and loaded through. Of course I could have <i>notified</i> you that the input box is empty.<br>By the way, have you heard my "Muhahaha" already?</small></span>
				</div>
			</div>
		</main>
		<div id="loadingcontainer">
			<div id="loading">
				<img id="load" src="http://i.imgur.com/7qHrFCE.gif"/>
			</div>
		</div>
		<div id="loadingcontaineroverlay">
			<div id="loadingoverlay">
			</div>
		</div>
		</div>
	<script>
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-47871844-3', 'auto');
	  ga('send', 'pageview');
	</script>
	</body>
</html>