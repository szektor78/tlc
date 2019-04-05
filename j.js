$(function() {
	var d = new Date(), m = d.getMonth(),
		request = true, b = document.body, c = 'className', cs = 'customize-support', rcs = new RegExp('(^|\\s+)(no-)?'+cs+'(\\s+|$)');

	b[c] = b[c].replace( rcs, '' );
	b[c] += ( window.postMessage && request ? ' ' : ' no-' ) + cs;

	m++;
	menus(2,'aside > a[href="/covers/valentines-day"]');
	menus(5,'aside > a[href="/covers/memorial-day"]');

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


	//$(".gmid").addClass("g"+g[0]);//google mid ad centering
	$("#srcf").submit(function() {
		$(this).attr('action', '/search/result/'+$('#srci').val()).submit();
	});
	$("a.hold").click(function() {//Download count
		$.get("/downloads_add",{addto: $(this).data('id') });
	});

	//popup src.
	$("#psrc").submit(function() {
		$(this).attr('action', '/search/result/'+$('#psrci').val()).submit();
	});


	function menus(c,s) {
		if (m==c) $(s).addClass('SeasonalMenu');
		else $(s).hide();
	}

	var $rating = $('.rating');
	if ($rating.length>0){//RatePost (details view only)
		$rating.starRating({
			starSize: 25,
			initialRating: $rating.data('r'),
			useFullStars: true,
			callback: function(vote, el){
				$.get("/ratings_rpc",{j:vote,q:$(el).closest('div.rating').data('id')});
				$rating.html('Thank you!&nbsp;&nbsp;&nbsp;').removeClass('rating');
			}
		});
	}

	//yt video
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
	}

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

	$('h1').css('opacity', '0.69');
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
	}
});
/*$(window).on("load",function(){
	$('img').each(function(){$(this).attr('src',$(this).attr('lsrc'));});
});*/

//Modal:
!function(e,n){"function"==typeof define&&define.amd?define(n):"object"==typeof exports?module.exports=n(require,exports,module):e.ouibounce=n()}(this,function(){return function(e,n){function o(e,n){return"undefined"==typeof e?n:e}function t(e){var n=24*e*60*60*1e3,o=new Date;return o.setTime(o.getTime()+n),"; expires="+o.toUTCString()}function i(){L.addEventListener("mouseleave",u),L.addEventListener("mouseenter",r),L.addEventListener("keydown",c)}function u(e){e.clientY>v||d(T,"true")&&!l||(w=setTimeout(m,p))}function r(){w&&(clearTimeout(w),w=null)}function c(e){g||d(T,"true")&&!l||e.metaKey&&76===e.keyCode&&(g=!0,w=setTimeout(m,p))}function d(e,n){return a()[e]===n}function a(){for(var e=document.cookie.split("; "),n={},o=e.length-1;o>=0;o--){var t=e[o].split("=");n[t[0]]=t[1]}return n}function m(){f(),y()}function f(){e&&(e.style.display="block"),s()}function s(e){var e=e||{};"undefined"!=typeof e.cookieExpire&&(E=t(e.cookieExpire)),e.sitewide===!0&&(b=";path=/"),"undefined"!=typeof e.cookieDomain&&(x=";domain="+e.cookieDomain),"undefined"!=typeof e.cookieName&&(T=e.cookieName),document.cookie=T+"=true"+E+x+b,L.removeEventListener("mouseleave",u),L.removeEventListener("mouseenter",r),L.removeEventListener("keydown",c)}var n=n||{},l=n.aggressive||!1,v=o(n.sensitivity,20),k=o(n.timer,1e3),p=o(n.delay,0),y=n.callback||function(){},E=t(n.cookieExpire)||"",x=n.cookieDomain?";domain="+n.cookieDomain:"",T=n.cookieName?n.cookieName:"viewedOuibounceModal",b=n.sitewide===!0?";path=/":"",w=null,L=document.documentElement;setTimeout(i,k);var g=!1;return{fire:f,disable:s}}});
