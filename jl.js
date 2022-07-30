$(function() {
	var d = new Date(), m = d.getMonth(),
		request = true, b = document.body, c = 'className', cs = 'customize-support', rcs = new RegExp('(^|\\s+)(no-)?'+cs+'(\\s+|$)');

	b[c] = b[c].replace(rcs, '');
	b[c] += (window.postMessage && request ? ' ' : ' no-')+cs;

	m++;
	menus(2,'aside > a[href="/covers/valentines-day"]');
	menus(5,'aside > a[href="/covers/memorial-day"]');
	helloMenus();

	$(".ur b a").click(function() {//RatePost (common view)
		var vote=$(this).parent().index();
		var mid=$(this).closest('p').data('id'),
			u="#u"+mid;
		$(u).append('<b class=loadingRating></b>');
		$.get("/ratings_rpc",{j:vote,q:mid},function(re){
			$(u+" .loadingRating").remove();
			$(u).replaceWith(re);
		});
	});
	$(".img-list li").each(function() {
		var h3=$(this).find("h3");
		h3.html('<b style=color:#eaba00>Click to view&nbsp;&nbsp;&nbsp; <i>\uF105</i></b><br>'+h3.text());
	});

	$("a.hold").click(function() {//Download count
		if ($(this).data('id'))	{
			$.get("/downloads_add",{addto:$(this).data('id')});
		}
	});


	//$(".gmid").addClass("g"+g[0]);//google mid ad centering
	$("#srcf").submit(function(e) {
		e.preventDefault();
		$(location).attr('href', '/search/result/'+$('#srci').val() );
		return false;
		//$(this).attr('action', '/search/result/'+$('#srci').val()).submit();
	});
	//popup src. form submit
	$("#psrc").submit(function(e) {
		e.preventDefault();
		$(location).attr('href', '/search/result/'+$('#psrci').val() );
		return false;
		//$(this).attr('action', '/search/result/'+$('#psrci').val()).submit();
	});

	function menus(c,s) {//by month
		if (m==c) $(s).addClass('SeasonalMenu').show();
		else $(s).hide();
	}
	function helloMenus() {
		var day=d.getDate(), str='aside > a[href="/covers/hello-';
		menus(15,'aside > a[href^="/covers/hello-"]');
		if (day<10){
			menus(1,str+'january"]');
			menus(2,str+'february"]');
			menus(3,str+'march"]');
			menus(4,str+'april"]');
			menus(5,str+'may"]');
			menus(6,str+'june"]');
			menus(7,str+'july"]');
			menus(8,str+'august"]');
			menus(9,str+'september"]');
			menus(10,str+'october"]');
			menus(11,str+'november"]');
			menus(12,str+'december"]');
		}
		if (day>24){
			menus(12,str+'january"]');
			menus(1,str+'february"]');
			menus(2,str+'march"]');
			menus(3,str+'april"]');
			menus(4,str+'may"]');
			menus(5,str+'june"]');
			menus(6,str+'july"]');
			menus(7,str+'august"]');
			menus(8,str+'september"]');
			menus(9,str+'october"]');
			menus(10,str+'november"]');
			menus(11,str+'december"]');
		}
	}

	function shAd(t){
		var ads=[],ind=0;
		if (t=='main') {
			ads[0]="<a href=https://b2dc5hvouercfka6jdtdz552ym.hop.clickbank.net alt='Visit BioEnergy'><img src=/images/newaff/bioenergy-300x250.jpg width=300 height=250></a>";
			ads[1]="<a href=https://641aclylvfp8dw5jszx5qot6t0.hop.clickbank.net alt='Visit Live Chat Jobs'><img src=/images/newaff/livechatjobs300x250.jpg width=300 height=250></a>";
			ads[2]="<a href=https://04a31akpsdvf5u3kpd7athwnfc.hop.clickbank.net alt='Visit MoonReading'><img src=/images/newaff/moonreading-300x250.jpg width=300 height=250></a>";
			ads[3]="<a href=https://e1b777nm47nh5n82peg0icsw9p.hop.clickbank.net alt='Visit PhotoJobz'><img src=/images/newaff/photojobz-300x250.jpg width=300 height=250></a>";
			ads[4]="<a href=https://0547akyr3gqe9nb3y7sj5lqbnw.hop.clickbank.net alt='Visit Ex Factor'><img src=/images/newaff/exfactorguide300x250.jpg width=300 height=250></a>";
			//ads[]="<a href= alt='Visit '><img src=/images/newaff/ width=300 height=250></a>";
		}
		if (t=='side') {
			ads[0]="<a href=https://b2dc5hvouercfka6jdtdz552ym.hop.clickbank.net alt='Visit BioEnergy'><img src=/images/newaff/bioenergy-160x600.jpg width=160 height=600></a>";
			ads[1]="<a href=https://e1b777nm47nh5n82peg0icsw9p.hop.clickbank.net alt='Visit PhotoJobz'><img src=/images/newaff/nature-landscape-photojobz-side.jpg width=160 height=600></a>";
			//ads[]="<a href= alt='Visit '><img src=/images/newaff/ width=160 height=600></a>";			
		}
		ind = Math.floor(Math.random()*ads.length);
		document.getElementById(t).innerHTML = ads[ind];
	}
	shAd('main');
	shAd('side');
	
	var $ra = $('.rating');
	if ($ra.length>0){//details view only
		$.get("/downloads_add",{view: $ra.data('id') });//add view to db (cloudflare: No query string)
		$ra.starRating({//RatePost
			starSize: 25,
			initialRating: $ra.data('r'),
			useFullStars: true,
			callback: function(vote, el){
				$.get("/ratings_rpc",{j:vote,q:$(el).closest('div.rating').data('id')});
				$ra.html('Thank you!&nbsp;&nbsp;&nbsp;').removeClass('rating');
			}
		});
	}


	if ($('#my_camera').length>0){//Only on webcam page
		Webcam.set({
			// live preview size
			width: 426,
			height: 320,

			// device capture size
			dest_width: 640,
			dest_height: 480,

			// final cropped size
			crop_width: 480,
			crop_height: 480
		});
		Webcam.attach('#my_camera');

		$("#getit").hide();
		$("#snapit").click(function() {
			Webcam.snap(function(data_uri) {
				$(".image-tag").val(data_uri);
				$('#results').html('<img src="'+data_uri+'" width=320 height=320>');
				$("#getit").attr('href', data_uri).show();
			});
		});
	}
	//https://purge.jsdelivr.net/gh/szektor78/tlc/j.min.js


	/*/yt video
	if ($(window).width()>679){
	$(".yt").each(function() {
		var image = new Image(),
			yt=$(this);
		image.src = "https://img.youtube.com/vi/"+ yt.data('embed') +"/sddefault.jpg";
		image.addEventListener("load", function(){
			yt.append(image);
		});
		yt.click(function() {
			var iframe = document.createElement("iframe");
			iframe.setAttribute("frameborder", "0");
			iframe.setAttribute("allowfullscreen", "");
			iframe.setAttribute("src", "https://www.youtube.com/embed/"+ this.dataset.embed +"?rel=0&showinfo=0&autoplay=1");
			this.innerHTML = "";
			this.appendChild(iframe);
		});
	}).hover(function(){$(this).addClass("ythover");},function(){$(this).removeClass("ythover");});
	}*/


	/*/webfont loading
	WebFontConfig = {
		google: {
			families: ['Open Sans']
		}
	};
	$.getScript("https://cdn.jsdelivr.net/npm/webfontloader@1.6.28/webfontloader.min.js");*/

	/*var tl = new TimelineLite, 
	mySplitText = new SplitText("#txteff", {type:"words,chars"}), 
	chars = mySplitText.chars;

	TweenLite.set("#txteff", {perspective:400});
	tl.staggerFrom(chars, 0.8, {opacity:0, scale:0, y:80, rotationX:180, transformOrigin:"0% 50% -50",  ease:Back.easeOut}, 0.01, "+=0");
	tl.restart();*/


	/*$('h1').css('opacity', '0.69');
	$('h1').each(function(){//h1 anim.
		var $t = $(this),
			rows = $.trim($t.html()).split('<br>');
		$t.html('');
		$.each(rows, function(i, val){
			val=val.replace('&amp;', ' & ');
			val=val.replace('  ', ' ');
			val=val.replace('  ', ' ');
			$('<span class="row"></span>').appendTo($t);
			var letters = $.trim(val).split('');
			$.each(letters, function(j, v){
				v = (v == ' ') ? '&nbsp;' : v;
				$('<span>' + $.trim(v) + '</span>').appendTo($('.row:last', $t));
			});
		});
	});
	for (i = 0; i < $('h1 span').length; i++) {
		(function(ind) {
			setTimeout(function(){
				$('h1 span:not(".row")').eq(ind).toggleClass('animate');
			}, ind * 17);
		})(i);
	}*/


	$("#toTop").click(function() {
		$("html, body").animate({scrollTop: 0}, 1000);
	});

	$(window).scroll(function() {
		if ($(this).scrollTop() > 0) {
			$('.scroll-down').fadeOut();
		} else {
			$('.scroll-down').fadeIn();
		}
	});

	//Search auto suggest
	/*var coversrc = [
		{"title":"abstract"},{"title":"american"},{"title":"angel"},{"title":"animals"},{"title":"anime"},{"title":"anonymous"},{"title":"apple"},{"title":"april"},{"title":"art"},{"title":"assassins creed"},{"title":"autumn"},{"title":"avengers"},{"title":"avengers endgame"},{"title":"barcelona"},{"title":"basketball"},{"title":"beach"},{"title":"beauty"},{"title":"believe"},{"title":"best friends"},{"title":"birds"},{"title":"birthday"},{"title":"black"},{"title":"blue"},{"title":"blue flowers"},{"title":"bmw"},{"title":"boo"},{"title":"book"},{"title":"books"},{"title":"business"},{"title":"butterflies"},{"title":"butterfly"},{"title":"calm"},{"title":"camera"},{"title":"car"},{"title":"cat"},{"title":"chakra"},{"title":"change"},{"title":"chicago"},{"title":"child"},{"title":"children"},{"title":"christian"},{"title":"christmas"},{"title":"city"},{"title":"coca cola"},{"title":"coffee"},{"title":"cold"},{"title":"comic"},{"title":"computer"},{"title":"cool"},{"title":"craft"},{"title":"cross"},{"title":"dance"},{"title":"dark"},{"title":"deadpool"},{"title":"denver"},{"title":"diamond"},{"title":"disney"},{"title":"doctor who"},{"title":"dog"},{"title":"dota 2"},{"title":"dragon"},{"title":"dragonfly"},{"title":"dream"},{"title":"eagle"},{"title":"earth"},{"title":"easter"},{"title":"eminem"},{"title":"fairy"},{"title":"faith"},{"title":"fall"},{"title":"fall colors"},{"title":"fallout"},{"title":"family"},{"title":"fantasy"},{"title":"fashion"},{"title":"fate"},{"title":"february"},{"title":"fire"},{"title":"fitness"},{"title":"flag"},{"title":"flower"},{"title":"food"},{"title":"forest"},{"title":"fortnite"},{"title":"friend"},{"title":"friends"},{"title":"friendship"},{"title":"fruit"},{"title":"funny"},{"title":"game of thrones"},{"title":"girl"},{"title":"glitter"},{"title":"god"},{"title":"god of war"},{"title":"goku"},{"title":"good"},{"title":"gothic"},{"title":"green"},{"title":"guardians of the galaxy"},{"title":"guitar"},{"title":"gym"},{"title":"hair"},{"title":"halloween"},{"title":"happy"},{"title":"happy easter"},{"title":"happy new year"},{"title":"harry"},{"title":"harry potter"},{"title":"heart"},{"title":"holiday"},{"title":"home"},{"title":"hope"},{"title":"horror"},{"title":"horse"},{"title":"house"},{"title":"hunting"},{"title":"ice"},{"title":"in love"},{"title":"infinity war"},{"title":"irish"},{"title":"iron man"},{"title":"istanbul"},{"title":"japan"},{"title":"jesus"},{"title":"jewelry"},{"title":"john wick"},{"title":"joker"},{"title":"kid"},{"title":"ladybug"},{"title":"lamborghini"},{"title":"landscape"},{"title":"lannister"},{"title":"laptop"},{"title":"last jedi"},{"title":"lavender"},{"title":"law"},{"title":"lawyer"},{"title":"league of legends"},{"title":"library"},{"title":"light"},{"title":"lion"},{"title":"lips"},{"title":"love"},{"title":"madonna"},{"title":"magic"},{"title":"man"},{"title":"mandala"},{"title":"map"},{"title":"marilyn monroe"},{"title":"marvel"},{"title":"matrix"},{"title":"memorial day"},{"title":"merry"},{"title":"merry christmas"},{"title":"mickey"},{"title":"military"},{"title":"milky way"},{"title":"minecraft"},{"title":"mob psycho 100"},{"title":"money"},{"title":"moon"},{"title":"mother"},{"title":"mothers day"},{"title":"mountain"},{"title":"mountains"},{"title":"music"},{"title":"naruto"},{"title":"nature"},{"title":"nba"},{"title":"neon"},{"title":"new year"},{"title":"new years"},{"title":"new york"},{"title":"night"},{"title":"ocean"},{"title":"owl"},{"title":"panda"},{"title":"party"},{"title":"patriotic"},{"title":"peace"},{"title":"photo"},{"title":"photography"},{"title":"pink"},{"title":"planets"},{"title":"police"},{"title":"poppies"},{"title":"programming"},{"title":"psychedelic"},{"title":"psycho"},{"title":"purple"},{"title":"queen"},{"title":"quote"},{"title":"quotes"},{"title":"rain"},{"title":"rainbow"},{"title":"reiki"},{"title":"religious"},{"title":"road"},{"title":"rose"},{"title":"run"},{"title":"running"},{"title":"saber"},{"title":"sad"},{"title":"sci fi"},{"title":"sea"},{"title":"sexy"},{"title":"shoes"},{"title":"shop"},{"title":"skull"},{"title":"skulls"},{"title":"sky"},{"title":"smile"},{"title":"snoopy"},{"title":"snow"},{"title":"snowman"},{"title":"space"},{"title":"sport"},{"title":"spring"},{"title":"spring flower"},{"title":"spring flowers"},{"title":"st patrick"},{"title":"st patricks day"},{"title":"star"},{"title":"star wars"},{"title":"stress"},{"title":"success"},{"title":"summer"},{"title":"sunset"},{"title":"supernatural"},{"title":"technology"},{"title":"teddy"},{"title":"the witcher 3"},{"title":"think"},{"title":"tiger"},{"title":"travel"},{"title":"tree"},{"title":"tropical"},{"title":"tulip"},{"title":"unicorn"},{"title":"universe"},{"title":"valentine"},{"title":"video"},{"title":"viking"},{"title":"vintage"},{"title":"watch"},{"title":"water"},{"title":"waterfall"},{"title":"website"},{"title":"winter"},{"title":"wolf"},{"title":"women"},{"title":"work"},{"title":"world"},{"title":"xmas"},{"title":"yellow"},{"title":"youtube"},{"title":"zero two"},
	];
	$("#srci").tinyAutocomplete({
		data:coversrc,
		onSelect: function(el, val) {
			$(this).val(val.title);
			$(location).attr('href', '/search/result/'+val.title);
			//$("#srcf").attr('action', '/search/result/'+val.title);
			//document.srcf.submit();
			//btoa(unescape(encodeURIComponent(str))))
		}
	});*/


	//Cookie consent
	if(localStorage.getItem('cookieSeen')!='shown'){
		$(".cookie-banner").delay(250).fadeIn();
		localStorage.setItem('cookieSeen','shown');
	}
	$('.cclose').click(function(){$('.cookie-banner').fadeOut();});


	if ($('#ldr').length>0){//Only on pages with infinite scroll
		var PG=1;
		function onScroll() {
			if($(window).scrollTop() + $(window).height() + 300 >= $(document).height()) {
				PG++;
				if(PG<ttlPgs) loadData();
			}
		}
		function loadData() {//Load more Function
			$("#ldr").show();
			$.get(iUrl+'page/'+PG)
			.done(function(cont) {
				console.log(this.url);
				$("#ldr").hide();
				$(".img-list").append(cont);
			});
		}
		//$(document.body).on('touchmove', onScroll);// for mobile
		$(window).scroll(onScroll);
	}
});
var pixiebase = {
	baseUrl: 'https://timelinecovers.pro/facebook-cover/download',
	tools: {
		export: {
			defaultFormat: 'jpeg',
			defaultName: 'timelinecovers-pro'
		},
	},
	/*crossOrigin: true,
	objectDefaults: {
		fontFamily: 'Dancing Script'
	}*/
};
var pixiecover = {
	blankCanvasSize: {width: 851, height: 315},
	ui: {
		allowZoom: false,
		nav: {
			replaceDefault: true,
			items: [
				{name: 'filter', icon: 'filter-custom', action: 'filter'},
				/*{type: 'separator'},
				{name: 'transform', icon: 'transform-custom', action: 'transform'},*/
				{type: 'separator'},
				{name: 'draw', icon: 'pencil-custom', action: 'draw'},
				{name: 'text', icon: 'text-box-custom', action: 'text'},
				{name: 'shapes', icon: 'polygon-custom', action: 'shapes'},
				/*{name: 'stickers', icon: 'sticker-custom', action: 'stickers'},
				{name: 'frame', icon: 'frame-custom', action: 'frame'},*/
				{type: 'separator'},
				{name: 'merge', icon: 'merge-custom', action: 'merge'},
			],
		}
	},
};


/*$(window).on("load",function(){
	$('img').each(function(){$(this).attr('src',$(this).attr('lsrc'));});
});*/

//Modal:
!function(e,n){"function"==typeof define&&define.amd?define(n):"object"==typeof exports?module.exports=n(require,exports,module):e.ouibounce=n()}(this,function(){return function(e,n){function o(e,n){return"undefined"==typeof e?n:e}function t(e){var n=24*e*60*60*1e3,o=new Date;return o.setTime(o.getTime()+n),"; expires="+o.toUTCString()}function i(){L.addEventListener("mouseleave",u),L.addEventListener("mouseenter",r),L.addEventListener("keydown",c)}function u(e){e.clientY>v||d(T,"true")&&!l||(w=setTimeout(m,p))}function r(){w&&(clearTimeout(w),w=null)}function c(e){g||d(T,"true")&&!l||e.metaKey&&76===e.keyCode&&(g=!0,w=setTimeout(m,p))}function d(e,n){return a()[e]===n}function a(){for(var e=document.cookie.split("; "),n={},o=e.length-1;o>=0;o--){var t=e[o].split("=");n[t[0]]=t[1]}return n}function m(){f(),y()}function f(){e&&(e.style.display="block"),s()}function s(e){var e=e||{};"undefined"!=typeof e.cookieExpire&&(E=t(e.cookieExpire)),e.sitewide===!0&&(b=";path=/"),"undefined"!=typeof e.cookieDomain&&(x=";domain="+e.cookieDomain),"undefined"!=typeof e.cookieName&&(T=e.cookieName),document.cookie=T+"=true"+E+x+b,L.removeEventListener("mouseleave",u),L.removeEventListener("mouseenter",r),L.removeEventListener("keydown",c)}var n=n||{},l=n.aggressive||!1,v=o(n.sensitivity,20),k=o(n.timer,1e3),p=o(n.delay,0),y=n.callback||function(){},E=t(n.cookieExpire)||"",x=n.cookieDomain?";domain="+n.cookieDomain:"",T=n.cookieName?n.cookieName:"viewedOuibounceModal",b=n.sitewide===!0?";path=/":"",w=null,L=document.documentElement;setTimeout(i,k);var g=!1;return{fire:f,disable:s}}});
