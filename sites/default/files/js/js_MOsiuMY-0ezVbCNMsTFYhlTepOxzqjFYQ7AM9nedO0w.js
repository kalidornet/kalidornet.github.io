(function () {
	'use strict';

	var isCommonjs = typeof module !== 'undefined' && module.exports;
	var keyboardAllowed = typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element;

	var fn = (function () {
		var val;
		var valLength;

		var fnMap = [
			[
				'requestFullscreen',
				'exitFullscreen',
				'fullscreenElement',
				'fullscreenEnabled',
				'fullscreenchange',
				'fullscreenerror'
			],
			// new WebKit
			[
				'webkitRequestFullscreen',
				'webkitExitFullscreen',
				'webkitFullscreenElement',
				'webkitFullscreenEnabled',
				'webkitfullscreenchange',
				'webkitfullscreenerror'

			],
			// old WebKit (Safari 5.1)
			[
				'webkitRequestFullScreen',
				'webkitCancelFullScreen',
				'webkitCurrentFullScreenElement',
				'webkitCancelFullScreen',
				'webkitfullscreenchange',
				'webkitfullscreenerror'

			],
			[
				'mozRequestFullScreen',
				'mozCancelFullScreen',
				'mozFullScreenElement',
				'mozFullScreenEnabled',
				'mozfullscreenchange',
				'mozfullscreenerror'
			],
			[
				'msRequestFullscreen',
				'msExitFullscreen',
				'msFullscreenElement',
				'msFullscreenEnabled',
				'MSFullscreenChange',
				'MSFullscreenError'
			]
		];

		var i = 0;
		var l = fnMap.length;
		var ret = {};

		for (; i < l; i++) {
			val = fnMap[i];
			if (val && val[1] in document) {
				for (i = 0, valLength = val.length; i < valLength; i++) {
					ret[fnMap[0][i]] = val[i];
				}
				return ret;
			}
		}

		return false;
	})();

	var screenfull = {
		request: function (elem) {
			var request = fn.requestFullscreen;

			elem = elem || document.documentElement;

			// Work around Safari 5.1 bug: reports support for
			// keyboard in fullscreen even though it doesn't.
			// Browser sniffing, since the alternative with
			// setTimeout is even worse.
			if (/5\.1[\.\d]* Safari/.test(navigator.userAgent)) {
				elem[request]();
			} else {
				elem[request](keyboardAllowed && Element.ALLOW_KEYBOARD_INPUT);
			}
		},
		exit: function () {
			document[fn.exitFullscreen]();
		},
		toggle: function (elem) {
			if (this.isFullscreen) {
				this.exit();
			} else {
				this.request(elem);
			}
		},
		onchange: function () {},
		onerror: function () {},
		raw: fn
	};

	if (!fn) {
		if (isCommonjs) {
			module.exports = false;
		} else {
			window.screenfull = false;
		}

		return;
	}

	Object.defineProperties(screenfull, {
		isFullscreen: {
			get: function () {
				return !!document[fn.fullscreenElement];
			}
		},
		element: {
			enumerable: true,
			get: function () {
				return document[fn.fullscreenElement];
			}
		},
		enabled: {
			enumerable: true,
			get: function () {
				// Coerce to boolean in case of old WebKit
				return !!document[fn.fullscreenEnabled];
			}
		}
	});

	document.addEventListener(fn.fullscreenchange, function (e) {
		screenfull.onchange.call(screenfull, e);
	});

	document.addEventListener(fn.fullscreenerror, function (e) {
		screenfull.onerror.call(screenfull, e);
	});

	if (isCommonjs) {
		module.exports = screenfull;
	} else {
		window.screenfull = screenfull;
	}
})();
;

(function($){

$( document ).ready(function() {

  var tishinaArrowDownClickHandler = function(){
    $(this).hide();
    $('#page-wrapper .slider.fullscreen.media.photo1 ul.slides li.item:nth-of-type(1)').scrollTop('300');

    $(document).find('.navigation-container .next').show();
  }

  var ppArrowDownClickHandler = function(){
    $(this).hide();
    $('#page-wrapper .slider.fullscreen.media.photo1 ul.slides li.item:nth-of-type(1) .text-container').css('margin-top', '60%');


    $(document).find('.navigation-container .next').show();
  }

  $('#node-28 .intro-container .text-container .arrow').on('click', tishinaArrowDownClickHandler);
  $('#node-28 .intro-container .text-container .arrow').on('touchstart', tishinaArrowDownClickHandler);

  $('#node-34 .intro-container .text-container .arrow').on('click', ppArrowDownClickHandler);
  $('#node-34 .intro-container .text-container .arrow').on('touchstart', ppArrowDownClickHandler);

  $('#page-wrapper .slider.fullscreen.media.photo1 ul.slides li.item:nth-of-type(1)').scroll(function(){

    // add lazy loading event for images
    $(".item img").lazyload({
        event : "sporty"
    });


      if ( parseFloat($(this).scrollTop()/$('#page-wrapper .slider.fullscreen.media.photo1 ul.slides li.item:nth-of-type(1) .text-container').height()) >= 0.7 ){
        $(document).find('.navigation-container .next').show();
        $(this).find('.intro-container .arrow').hide();
        // trigger lazy loading event on scrolling down
        $(".item img").trigger("sporty");
      }
  });

 // private public  
 // http://kalidor.net/public-privacy

 var changeNameToIntroHandler = function(){
    // add lazy loading event for images
    $(".item img").lazyload({
        event : "sporty"
    });

    $(document).find('.text-container').show();
    $(document).find('.navigation-container .next').show();
    $(document).find('.intro-container .name').hide();
    $(document).find('.intro-container .arrow').hide();
    // trigger lazy loading event on scrolling down
    $(".item img").trigger("sporty");
  }

 $('#page-wrapper #node-34 .slider.fullscreen.media.photo1 ul.slides li.item:nth-of-type(1) .intro-container').on('click', changeNameToIntroHandler);
 $('#page-wrapper #node-34 .slider.fullscreen.media.photo1 ul.slides li.item:nth-of-type(1) .intro-container').on('touchstart', changeNameToIntroHandler);
 $('.wtf-read-more').on('mouseenter', function(){
    $(document).find('.intro-container .name .wtf-read-more').addClass('hover');
 });
 $('.wtf-read-more').on('mouseleave', function(){
    $(document).find('.intro-container .name .wtf-read-more').removeClass('hover');
 });
 $('#page-wrapper #node-34 .slider.fullscreen.media.photo1 ul.slides li.item:nth-of-type(1) .intro-container h1').on('mouseenter', function(){
    $(document).find('.intro-container .name').addClass('hover');
 });

  $('#page-wrapper #node-34 .slider.fullscreen.media.photo1 ul.slides li.item:nth-of-type(1) .intro-container h1').on('mouseleave', function(){
    $(document).find('.intro-container .name').removeClass('hover');
 });
});

})(jQuery);
/* QuoJS v2.3.6 - 2013/5/13
   http://quojs.tapquo.com
   Copyright (c) 2013 Javi Jimenez Villar (@soyjavi) - Licensed MIT */
(function(){var e;e=function(){var e,t,n;t=[];e=function(t,r){var i;if(!t){return n()}else if(e.toType(t)==="function"){return e(document).ready(t)}else{i=e.getDOMObject(t,r);return n(i,t)}};n=function(e,r){e=e||t;e.__proto__=n.prototype;e.selector=r||"";return e};e.extend=function(e){Array.prototype.slice.call(arguments,1).forEach(function(t){var n,r;r=[];for(n in t){r.push(e[n]=t[n])}return r});return e};n.prototype=e.fn={};return e}();window.Quo=e;"$$"in window||(window.$$=e)}).call(this);(function(){(function(e){var t,n,r,i,u,a,o,s,c,f,l;t={TYPE:"GET",MIME:"json"};r={script:"text/javascript, application/javascript",json:"application/json",xml:"application/xml, text/xml",html:"text/html",text:"text/plain"};n=0;e.ajaxSettings={type:t.TYPE,async:true,success:{},error:{},context:null,dataType:t.MIME,headers:{},xhr:function(){return new window.XMLHttpRequest},crossDomain:false,timeout:0};e.ajax=function(n){var r,o,f,h;f=e.mix(e.ajaxSettings,n);if(f.type===t.TYPE){f.url+=e.serializeParameters(f.data,"?")}else{f.data=e.serializeParameters(f.data)}if(i(f.url)){return e.jsonp(f)}h=f.xhr();h.onreadystatechange=function(){if(h.readyState===4){clearTimeout(r);return c(h,f)}};h.open(f.type,f.url,f.async);s(h,f);if(f.timeout>0){r=setTimeout(function(){return l(h,f)},f.timeout)}try{h.send(f.data)}catch(d){o=d;h=o;a("Resource not found",h,f)}if(f.async){return h}else{return u(h,f)}};e.jsonp=function(t){var r,i,u,a;if(t.async){i="jsonp"+ ++n;u=document.createElement("script");a={abort:function(){e(u).remove();if(i in window){return window[i]={}}}};r=void 0;window[i]=function(n){clearTimeout(r);e(u).remove();delete window[i];return f(n,a,t)};u.src=t.url.replace(RegExp("=\\?"),"="+i);e("head").append(u);if(t.timeout>0){r=setTimeout(function(){return l(a,t)},t.timeout)}return a}else{return console.error("QuoJS.ajax: Unable to make jsonp synchronous call.")}};e.get=function(t,n,r,i){return e.ajax({url:t,data:n,success:r,dataType:i})};e.post=function(e,t,n,r){return o("POST",e,t,n,r)};e.put=function(e,t,n,r){return o("PUT",e,t,n,r)};e["delete"]=function(e,t,n,r){return o("DELETE",e,t,n,r)};e.json=function(n,r,i){return e.ajax({url:n,data:r,success:i,dataType:t.MIME})};e.serializeParameters=function(e,t){var n,r;if(t==null){t=""}r=t;for(n in e){if(e.hasOwnProperty(n)){if(r!==t){r+="&"}r+=""+encodeURIComponent(n)+"="+encodeURIComponent(e[n])}}if(r===t){return""}else{return r}};c=function(e,t){if(e.status>=200&&e.status<300||e.status===0){if(t.async){f(u(e,t),e,t)}}else{a("QuoJS.ajax: Unsuccesful request",e,t)}};f=function(e,t,n){n.success.call(n.context,e,t)};a=function(e,t,n){n.error.call(n.context,e,t,n)};s=function(e,t){var n;if(t.contentType){t.headers["Content-Type"]=t.contentType}if(t.dataType){t.headers["Accept"]=r[t.dataType]}for(n in t.headers){e.setRequestHeader(n,t.headers[n])}};l=function(e,t){e.onreadystatechange={};e.abort();a("QuoJS.ajax: Timeout exceeded",e,t)};o=function(t,n,r,i,u){return e.ajax({type:t,url:n,data:r,success:i,dataType:u,contentType:"application/x-www-form-urlencoded"})};u=function(e,n){var r,i;i=e.responseText;if(i){if(n.dataType===t.MIME){try{i=JSON.parse(i)}catch(u){r=u;i=r;a("QuoJS.ajax: Parse Error",e,n)}}else{if(n.dataType==="xml"){i=e.responseXML}}}return i};return i=function(e){return RegExp("=\\?").test(e)}})(Quo)}).call(this);(function(){(function(e){var t,n,r,i,u,a,o,s;t=[];i=Object.prototype;r=/^\s*<(\w+|!)[^>]*>/;u=document.createElement("table");a=document.createElement("tr");n={tr:document.createElement("tbody"),tbody:u,thead:u,tfoot:u,td:a,th:a,"*":document.createElement("div")};e.toType=function(e){return i.toString.call(e).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()};e.isOwnProperty=function(e,t){return i.hasOwnProperty.call(e,t)};e.getDOMObject=function(t,n){var i,u,a;i=null;u=[1,9,11];a=e.toType(t);if(a==="array"){i=o(t)}else if(a==="string"&&r.test(t)){i=e.fragment(t.trim(),RegExp.$1);t=null}else if(a==="string"){i=e.query(document,t);if(n){if(i.length===1){i=e.query(i[0],n)}else{i=e.map(function(){return e.query(i,n)})}}}else if(u.indexOf(t.nodeType)>=0||t===window){i=[t];t=null}return i};e.map=function(t,n){var r,i,u,a;a=[];r=void 0;i=void 0;if(e.toType(t)==="array"){r=0;while(r<t.length){u=n(t[r],r);if(u!=null){a.push(u)}r++}}else{for(i in t){u=n(t[i],i);if(u!=null){a.push(u)}}}return s(a)};e.each=function(t,n){var r,i;r=void 0;i=void 0;if(e.toType(t)==="array"){r=0;while(r<t.length){if(n.call(t[r],r,t[r])===false){return t}r++}}else{for(i in t){if(n.call(t[i],i,t[i])===false){return t}}}return t};e.mix=function(){var t,n,r,i,u;r={};t=0;i=arguments.length;while(t<i){n=arguments[t];for(u in n){if(e.isOwnProperty(n,u)&&n[u]!==undefined){r[u]=n[u]}}t++}return r};e.fragment=function(t,r){var i;if(r==null){r="*"}if(!(r in n)){r="*"}i=n[r];i.innerHTML=""+t;return e.each(Array.prototype.slice.call(i.childNodes),function(){return i.removeChild(this)})};e.fn.map=function(t){return e.map(this,function(e,n){return t.call(e,n,e)})};e.fn.instance=function(e){return this.map(function(){return this[e]})};e.fn.filter=function(t){return e([].filter.call(this,function(n){return n.parentNode&&e.query(n.parentNode,t).indexOf(n)>=0}))};e.fn.forEach=t.forEach;e.fn.indexOf=t.indexOf;o=function(e){return e.filter(function(e){return e!==void 0&&e!==null})};return s=function(e){if(e.length>0){return[].concat.apply([],e)}else{return e}}})(Quo)}).call(this);(function(){(function(e){e.fn.attr=function(t,n){if(this.length===0){null}if(e.toType(t)==="string"&&n===void 0){return this[0].getAttribute(t)}else{return this.each(function(){return this.setAttribute(t,n)})}};e.fn.removeAttr=function(e){return this.each(function(){return this.removeAttribute(e)})};e.fn.data=function(e,t){return this.attr("data-"+e,t)};e.fn.removeData=function(e){return this.removeAttr("data-"+e)};e.fn.val=function(t){if(e.toType(t)==="string"){return this.each(function(){return this.value=t})}else{if(this.length>0){return this[0].value}else{return null}}};e.fn.show=function(){return this.style("display","block")};e.fn.hide=function(){return this.style("display","none")};e.fn.height=function(){var e;e=this.offset();return e.height};e.fn.width=function(){var e;e=this.offset();return e.width};e.fn.offset=function(){var e;e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:e.width,height:e.height}};return e.fn.remove=function(){return this.each(function(){if(this.parentNode!=null){return this.parentNode.removeChild(this)}})}})(Quo)}).call(this);(function(){(function(e){var t,n,r,i,u,a,o;r=null;t=/WebKit\/([\d.]+)/;n={Android:/(Android)\s+([\d.]+)/,ipad:/(iPad).*OS\s([\d_]+)/,iphone:/(iPhone\sOS)\s([\d_]+)/,Blackberry:/(BlackBerry|BB10|Playbook).*Version\/([\d.]+)/,FirefoxOS:/(Mozilla).*Mobile[^\/]*\/([\d\.]*)/,webOS:/(webOS|hpwOS)[\s\/]([\d.]+)/};e.isMobile=function(){r=r||u();return r.isMobile&&r.os.name!=="firefoxOS"};e.environment=function(){r=r||u();return r};e.isOnline=function(){return navigator.onLine};u=function(){var e,t;t=navigator.userAgent;e={};e.browser=i(t);e.os=a(t);e.isMobile=!!e.os;e.screen=o();return e};i=function(e){var n;n=e.match(t);if(n){return n[0]}else{return e}};a=function(e){var t,r,i;t=null;for(r in n){i=e.match(n[r]);if(i){t={name:r==="iphone"||r==="ipad"?"ios":r,version:i[2].replace("_",".")};break}}return t};return o=function(){return{width:window.innerWidth,height:window.innerHeight}}})(Quo)}).call(this);(function(){(function(e){var t,n,r,i,u,a,o,s,c,f,l,h;t=1;i={};r={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};n={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",touch:"click",doubletap:"dblclick",orientationchange:"resize"};u=/complete|loaded|interactive/;e.fn.on=function(t,n,r){if(n==="undefined"||e.toType(n)==="function"){return this.bind(t,n)}else{return this.delegate(n,t,r)}};e.fn.off=function(t,n,r){if(n==="undefined"||e.toType(n)==="function"){return this.unbind(t,n)}else{return this.undelegate(n,t,r)}};e.fn.ready=function(t){if(u.test(document.readyState)){return t(e)}else{return e.fn.addEvent(document,"DOMContentLoaded",function(){return t(e)})}};e.Event=function(e,t){var n,r;n=document.createEvent("Events");n.initEvent(e,true,true,null,null,null,null,null,null,null,null,null,null,null,null);if(t){for(r in t){n[r]=t[r]}}return n};e.fn.bind=function(e,t){return this.each(function(){l(this,e,t)})};e.fn.unbind=function(e,t){return this.each(function(){h(this,e,t)})};e.fn.delegate=function(t,n,r){return this.each(function(i,u){l(u,n,r,t,function(n){return function(r){var i,o;o=e(r.target).closest(t,u).get(0);if(o){i=e.extend(a(r),{currentTarget:o,liveFired:u});return n.apply(o,[i].concat([].slice.call(arguments,1)))}}})})};e.fn.undelegate=function(e,t,n){return this.each(function(){h(this,t,n,e)})};e.fn.trigger=function(t,n,r){if(e.toType(t)==="string"){t=e.Event(t,n)}if(r!=null){t.originalEvent=r}return this.each(function(){this.dispatchEvent(t)})};e.fn.addEvent=function(e,t,n){if(e.addEventListener){return e.addEventListener(t,n,false)}else if(e.attachEvent){return e.attachEvent("on"+t,n)}else{return e["on"+t]=n}};e.fn.removeEvent=function(e,t,n){if(e.removeEventListener){return e.removeEventListener(t,n,false)}else if(e.detachEvent){return e.detachEvent("on"+t,n)}else{return e["on"+t]=null}};l=function(t,n,r,u,a){var c,l,h,d;n=s(n);h=f(t);l=i[h]||(i[h]=[]);c=a&&a(r,n);d={event:n,callback:r,selector:u,proxy:o(c,r,t),delegate:c,index:l.length};l.push(d);return e.fn.addEvent(t,d.event,d.proxy)};h=function(t,n,r,u){var a;n=s(n);a=f(t);return c(a,n,r,u).forEach(function(n){delete i[a][n.index];return e.fn.removeEvent(t,n.event,n.proxy)})};f=function(e){return e._id||(e._id=t++)};s=function(t){var r;r=e.isMobile()?t:n[t];return r||t};o=function(e,t,n){var r;t=e||t;r=function(e){var r;r=t.apply(n,[e].concat(e.data));if(r===false){e.preventDefault()}return r};return r};c=function(e,t,n,r){return(i[e]||[]).filter(function(e){return e&&(!t||e.event===t)&&(!n||e.callback===n)&&(!r||e.selector===r)})};return a=function(t){var n;n=e.extend({originalEvent:t},t);e.each(r,function(e,r){n[e]=function(){this[r]=function(){return true};return t[e].apply(t,arguments)};return n[r]=function(){return false}});return n}})(Quo)}).call(this);(function(){(function($$){var CURRENT_TOUCH,EVENT,FIRST_TOUCH,GESTURE,GESTURES,HOLD_DELAY,TAPS,TOUCH_TIMEOUT,_angle,_capturePinch,_captureRotation,_cleanGesture,_distance,_fingersPosition,_getTouches,_hold,_isSwipe,_listenTouches,_onTouchEnd,_onTouchMove,_onTouchStart,_parentIfText,_swipeDirection,_trigger;TAPS=null;EVENT=void 0;GESTURE={};FIRST_TOUCH=[];CURRENT_TOUCH=[];TOUCH_TIMEOUT=void 0;HOLD_DELAY=650;GESTURES=["touch","tap","singleTap","doubleTap","hold","swipe","swiping","swipeLeft","swipeRight","swipeUp","swipeDown","rotate","rotating","rotateLeft","rotateRight","pinch","pinching","pinchIn","pinchOut","drag","dragLeft","dragRight","dragUp","dragDown"];GESTURES.forEach(function(e){$$.fn[e]=function(t){var n;n=e==="touch"?"touchend":e;return $$(document.body).delegate(this.selector,n,t)};return this});$$(document).ready(function(){return _listenTouches()});_listenTouches=function(){var e;e=$$(document.body);e.bind("touchstart",_onTouchStart);e.bind("touchmove",_onTouchMove);e.bind("touchend",_onTouchEnd);return e.bind("touchcancel",_cleanGesture)};_onTouchStart=function(e){var t,n,r,i;EVENT=e;r=Date.now();t=r-(GESTURE.last||r);TOUCH_TIMEOUT&&clearTimeout(TOUCH_TIMEOUT);i=_getTouches(e);n=i.length;FIRST_TOUCH=_fingersPosition(i,n);GESTURE.el=$$(_parentIfText(i[0].target));GESTURE.fingers=n;GESTURE.last=r;if(!GESTURE.taps){GESTURE.taps=0}GESTURE.taps++;if(n===1){if(n>=1){GESTURE.gap=t>0&&t<=250}return setTimeout(_hold,HOLD_DELAY)}else if(n===2){GESTURE.initial_angle=parseInt(_angle(FIRST_TOUCH),10);GESTURE.initial_distance=parseInt(_distance(FIRST_TOUCH),10);GESTURE.angle_difference=0;return GESTURE.distance_difference=0}};_onTouchMove=function(e){var t,n,r;EVENT=e;if(GESTURE.el){r=_getTouches(e);t=r.length;if(t===GESTURE.fingers){CURRENT_TOUCH=_fingersPosition(r,t);n=_isSwipe(e);if(n){GESTURE.prevSwipe=true}if(n||GESTURE.prevSwipe===true){_trigger("swiping")}if(t===2){_captureRotation();_capturePinch();e.preventDefault()}}else{_cleanGesture()}}return true};_isSwipe=function(e){var t,n,r;t=false;if(CURRENT_TOUCH[0]){n=Math.abs(FIRST_TOUCH[0].x-CURRENT_TOUCH[0].x)>30;r=Math.abs(FIRST_TOUCH[0].y-CURRENT_TOUCH[0].y)>30;t=GESTURE.el&&(n||r)}return t};_onTouchEnd=function(e){var t,n,r,i,u;EVENT=e;_trigger("touch");if(GESTURE.fingers===1){if(GESTURE.taps===2&&GESTURE.gap){_trigger("doubleTap");_cleanGesture()}else if(_isSwipe()||GESTURE.prevSwipe){_trigger("swipe");u=_swipeDirection(FIRST_TOUCH[0].x,CURRENT_TOUCH[0].x,FIRST_TOUCH[0].y,CURRENT_TOUCH[0].y);_trigger("swipe"+u);_cleanGesture()}else{_trigger("tap");if(GESTURE.taps===1){TOUCH_TIMEOUT=setTimeout(function(){_trigger("singleTap");return _cleanGesture()},100)}}}else{t=false;if(GESTURE.angle_difference!==0){_trigger("rotate",{angle:GESTURE.angle_difference});i=GESTURE.angle_difference>0?"rotateRight":"rotateLeft";_trigger(i,{angle:GESTURE.angle_difference});t=true}if(GESTURE.distance_difference!==0){_trigger("pinch",{angle:GESTURE.distance_difference});r=GESTURE.distance_difference>0?"pinchOut":"pinchIn";_trigger(r,{distance:GESTURE.distance_difference});t=true}if(!t&&CURRENT_TOUCH[0]){if(Math.abs(FIRST_TOUCH[0].x-CURRENT_TOUCH[0].x)>10||Math.abs(FIRST_TOUCH[0].y-CURRENT_TOUCH[0].y)>10){_trigger("drag");n=_swipeDirection(FIRST_TOUCH[0].x,CURRENT_TOUCH[0].x,FIRST_TOUCH[0].y,CURRENT_TOUCH[0].y);_trigger("drag"+n)}}_cleanGesture()}return EVENT=void 0};_fingersPosition=function(e,t){var n,r;r=[];n=0;e=e[0].targetTouches?e[0].targetTouches:e;while(n<t){r.push({x:e[n].pageX,y:e[n].pageY});n++}return r};_captureRotation=function(){var angle,diff,i,symbol;angle=parseInt(_angle(CURRENT_TOUCH),10);diff=parseInt(GESTURE.initial_angle-angle,10);if(Math.abs(diff)>20||GESTURE.angle_difference!==0){i=0;symbol=GESTURE.angle_difference<0?"-":"+";while(Math.abs(diff-GESTURE.angle_difference)>90&&i++<10){eval("diff "+symbol+"= 180;")}GESTURE.angle_difference=parseInt(diff,10);return _trigger("rotating",{angle:GESTURE.angle_difference})}};_capturePinch=function(){var e,t;t=parseInt(_distance(CURRENT_TOUCH),10);e=GESTURE.initial_distance-t;if(Math.abs(e)>10){GESTURE.distance_difference=e;return _trigger("pinching",{distance:e})}};_trigger=function(e,t){if(GESTURE.el){t=t||{};if(CURRENT_TOUCH[0]){t.iniTouch=GESTURE.fingers>1?FIRST_TOUCH:FIRST_TOUCH[0];t.currentTouch=GESTURE.fingers>1?CURRENT_TOUCH:CURRENT_TOUCH[0]}return GESTURE.el.trigger(e,t,EVENT)}};_cleanGesture=function(e){FIRST_TOUCH=[];CURRENT_TOUCH=[];GESTURE={};return clearTimeout(TOUCH_TIMEOUT)};_angle=function(e){var t,n,r;t=e[0];n=e[1];r=Math.atan((n.y-t.y)*-1/(n.x-t.x))*(180/Math.PI);if(r<0){return r+180}else{return r}};_distance=function(e){var t,n;t=e[0];n=e[1];return Math.sqrt((n.x-t.x)*(n.x-t.x)+(n.y-t.y)*(n.y-t.y))*-1};_getTouches=function(e){if($$.isMobile()){return e.touches}else{return[e]}};_parentIfText=function(e){if("tagName"in e){return e}else{return e.parentNode}};_swipeDirection=function(e,t,n,r){var i,u;i=Math.abs(e-t);u=Math.abs(n-r);if(i>=u){if(e-t>0){return"Left"}else{return"Right"}}else{if(n-r>0){return"Up"}else{return"Down"}}};return _hold=function(){if(GESTURE.last&&Date.now()-GESTURE.last>=HOLD_DELAY){_trigger("hold");return GESTURE.taps=0}}})(Quo)}).call(this);(function(){(function(e){e.fn.text=function(t){if(t||e.toType(t)==="number"){return this.each(function(){return this.textContent=t})}else{return this[0].textContent}};e.fn.html=function(t){var n;n=e.toType(t);if(t||n==="number"||n==="string"){return this.each(function(){var e,r,i,u;if(n==="string"||n==="number"){return this.innerHTML=t}else{this.innerHTML=null;if(n==="array"){u=[];for(r=0,i=t.length;r<i;r++){e=t[r];u.push(this.appendChild(e))}return u}else{return this.appendChild(t)}}})}else{return this[0].innerHTML}};e.fn.append=function(t){var n;n=e.toType(t);return this.each(function(){var e=this;if(n==="string"){return this.insertAdjacentHTML("beforeend",t)}else if(n==="array"){return t.each(function(t,n){return e.appendChild(n)})}else{return this.appendChild(t)}})};e.fn.prepend=function(t){var n;n=e.toType(t);return this.each(function(){var e=this;if(n==="string"){return this.insertAdjacentHTML("afterbegin",t)}else if(n==="array"){return t.each(function(t,n){return e.insertBefore(n,e.firstChild)})}else{return this.insertBefore(t,this.firstChild)}})};e.fn.replaceWith=function(t){var n;n=e.toType(t);this.each(function(){var e=this;if(this.parentNode){if(n==="string"){return this.insertAdjacentHTML("beforeBegin",t)}else if(n==="array"){return t.each(function(t,n){return e.parentNode.insertBefore(n,e)})}else{return this.parentNode.insertBefore(t,this)}}});return this.remove()};return e.fn.empty=function(){return this.each(function(){return this.innerHTML=null})}})(Quo)}).call(this);(function(){(function(e){var t,n,r,i,u,a;r="parentNode";t=/^\.([\w-]+)$/;n=/^#[\w\d-]+$/;i=/^[\w-]+$/;e.query=function(e,r){var u;r=r.trim();if(t.test(r)){u=e.getElementsByClassName(r.replace(".",""))}else if(i.test(r)){u=e.getElementsByTagName(r)}else if(n.test(r)&&e===document){u=e.getElementById(r.replace("#",""));if(!u){u=[]}}else{u=e.querySelectorAll(r)}if(u.nodeType){return[u]}else{return Array.prototype.slice.call(u)}};e.fn.find=function(t){var n;if(this.length===1){n=Quo.query(this[0],t)}else{n=this.map(function(){return Quo.query(this,t)})}return e(n)};e.fn.parent=function(e){var t;t=e?a(this):this.instance(r);return u(t,e)};e.fn.siblings=function(e){var t;t=this.map(function(e,t){return Array.prototype.slice.call(t.parentNode.children).filter(function(e){return e!==t})});return u(t,e)};e.fn.children=function(e){var t;t=this.map(function(){return Array.prototype.slice.call(this.children)});return u(t,e)};e.fn.get=function(e){if(e===undefined){return this}else{return this[e]}};e.fn.first=function(){return e(this[0])};e.fn.last=function(){return e(this[this.length-1])};e.fn.closest=function(t,n){var r,i;i=this[0];r=e(t);if(!r.length){i=null}while(i&&r.indexOf(i)<0){i=i!==n&&i!==document&&i.parentNode}return e(i)};e.fn.each=function(e){this.forEach(function(t,n){return e.call(t,n,t)});return this};a=function(t){var n;n=[];while(t.length>0){t=e.map(t,function(e){if((e=e.parentNode)&&e!==document&&n.indexOf(e)<0){n.push(e);return e}})}return n};return u=function(t,n){if(n===undefined){return e(t)}else{return e(t).filter(n)}}})(Quo)}).call(this);(function(){(function(e){var t,n,r;t=["-webkit-","-moz-","-ms-","-o-",""];e.fn.addClass=function(e){return this.each(function(){if(!r(e,this.className)){this.className+=" "+e;return this.className=this.className.trim()}})};e.fn.removeClass=function(e){return this.each(function(){if(!e){return this.className=""}else{if(r(e,this.className)){return this.className=this.className.replace(e," ").replace(/\s+/g," ").trim()}}})};e.fn.toggleClass=function(e){return this.each(function(){if(r(e,this.className)){return this.className=this.className.replace(e," ")}else{this.className+=" "+e;return this.className=this.className.trim()}})};e.fn.hasClass=function(e){return r(e,this[0].className)};e.fn.style=function(e,t){if(t){return this.each(function(){return this.style[e]=t})}else{return this[0].style[e]||n(this[0],e)}};e.fn.css=function(e,t){return this.style(e,t)};e.fn.vendor=function(e,n){var r,i,u,a;a=[];for(i=0,u=t.length;i<u;i++){r=t[i];a.push(this.style(""+r+e,n))}return a};r=function(e,t){var n;n=t.split(/\s+/g);return n.indexOf(e)>=0};return n=function(e,t){return document.defaultView.getComputedStyle(e,"")[t]}})(Quo)}).call(this);;
/*
 * jQuery FlexSlider v2.2.2
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
;(function(d){d.flexslider=function(g,l){var a=d(g);a.vars=d.extend({},d.flexslider.defaults,l);var e=a.vars.namespace,v=window.navigator&&window.navigator.msPointerEnabled&&window.MSGesture,t=("ontouchstart"in window||v||window.DocumentTouch&&document instanceof DocumentTouch)&&a.vars.touch,m="",u,p="vertical"===a.vars.direction,n=a.vars.reverse,h=0<a.vars.itemWidth,r="fade"===a.vars.animation,q=""!==a.vars.asNavFor,c={};d.data(g,"flexslider",a);c={init:function(){a.animating=!1;a.currentSlide=parseInt(a.vars.startAt?
a.vars.startAt:0,10);isNaN(a.currentSlide)&&(a.currentSlide=0);a.animatingTo=a.currentSlide;a.atEnd=0===a.currentSlide||a.currentSlide===a.last;a.containerSelector=a.vars.selector.substr(0,a.vars.selector.search(" "));a.slides=d(a.vars.selector,a);a.container=d(a.containerSelector,a);a.count=a.slides.length;a.syncExists=0<d(a.vars.sync).length;"slide"===a.vars.animation&&(a.vars.animation="swing");a.prop=p?"top":"marginLeft";a.args={};a.manualPause=!1;a.stopped=!1;a.started=!1;a.startTimeout=null;
a.transitions=!a.vars.video&&!r&&a.vars.useCSS&&function(){var b=document.createElement("div"),f=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"],k;for(k in f)if(void 0!==b.style[f[k]])return a.pfx=f[k].replace("Perspective","").toLowerCase(),a.prop="-"+a.pfx+"-transform",!0;return!1}();""!==a.vars.controlsContainer&&(a.controlsContainer=0<d(a.vars.controlsContainer).length&&d(a.vars.controlsContainer));""!==a.vars.manualControls&&(a.manualControls=0<d(a.vars.manualControls).length&&
d(a.vars.manualControls));a.vars.randomize&&(a.slides.sort(function(){return Math.round(Math.random())-0.5}),a.container.empty().append(a.slides));a.doMath();a.setup("init");a.vars.controlNav&&c.controlNav.setup();a.vars.directionNav&&c.directionNav.setup();a.vars.keyboard&&(1===d(a.containerSelector).length||a.vars.multipleKeyboard)&&d(document).bind("keyup",function(b){b=b.keyCode;a.animating||39!==b&&37!==b||(b=39===b?a.getTarget("next"):37===b?a.getTarget("prev"):!1,a.flexAnimate(b,a.vars.pauseOnAction))});
a.vars.mousewheel&&a.bind("mousewheel",function(b,f,k,d){b.preventDefault();b=0>f?a.getTarget("next"):a.getTarget("prev");a.flexAnimate(b,a.vars.pauseOnAction)});a.vars.pausePlay&&c.pausePlay.setup();a.vars.slideshow&&a.vars.pauseInvisible&&c.pauseInvisible.init();a.vars.slideshow&&(a.vars.pauseOnHover&&a.hover(function(){a.manualPlay||a.manualPause||a.pause()},function(){a.manualPause||a.manualPlay||a.stopped||a.play()}),a.vars.pauseInvisible&&c.pauseInvisible.isHidden()||(0<a.vars.initDelay?a.startTimeout=
setTimeout(a.play,a.vars.initDelay):a.play()));q&&c.asNav.setup();t&&a.vars.touch&&c.touch();(!r||r&&a.vars.smoothHeight)&&d(window).bind("resize orientationchange focus",c.resize);a.find("img").attr("draggable","false");setTimeout(function(){a.vars.start(a)},200)},asNav:{setup:function(){a.asNav=!0;a.animatingTo=Math.floor(a.currentSlide/a.move);a.currentItem=a.currentSlide;a.slides.removeClass(e+"active-slide").eq(a.currentItem).addClass(e+"active-slide");if(v)g._slider=a,a.slides.each(function(){this._gesture=
new MSGesture;this._gesture.target=this;this.addEventListener("MSPointerDown",function(a){a.preventDefault();a.currentTarget._gesture&&a.currentTarget._gesture.addPointer(a.pointerId)},!1);this.addEventListener("MSGestureTap",function(b){b.preventDefault();b=d(this);var f=b.index();d(a.vars.asNavFor).data("flexslider").animating||b.hasClass("active")||(a.direction=a.currentItem<f?"next":"prev",a.flexAnimate(f,a.vars.pauseOnAction,!1,!0,!0))})});else a.slides.on("click touchend MSPointerUp",function(b){b.preventDefault();
b=d(this);var f=b.index();0>=b.offset().left-d(a).scrollLeft()&&b.hasClass(e+"active-slide")?a.flexAnimate(a.getTarget("prev"),!0):d(a.vars.asNavFor).data("flexslider").animating||b.hasClass(e+"active-slide")||(a.direction=a.currentItem<f?"next":"prev",a.flexAnimate(f,a.vars.pauseOnAction,!1,!0,!0))})}},controlNav:{setup:function(){a.manualControls?c.controlNav.setupManual():c.controlNav.setupPaging()},setupPaging:function(){var b=1,f,k;a.controlNavScaffold=d('<ol class="'+e+"control-nav "+e+("thumbnails"===
a.vars.controlNav?"control-thumbs":"control-paging")+'"></ol>');if(1<a.pagingCount)for(var g=0;g<a.pagingCount;g++)k=a.slides.eq(g),f="thumbnails"===a.vars.controlNav?'<img src="'+k.attr("data-thumb")+'"/>':"<a>"+b+"</a>","thumbnails"===a.vars.controlNav&&!0===a.vars.thumbCaptions&&(k=k.attr("data-thumbcaption"),""!=k&&void 0!=k&&(f+='<span class="'+e+'caption">'+k+"</span>")),a.controlNavScaffold.append("<li>"+f+"</li>"),b++;a.controlsContainer?d(a.controlsContainer).append(a.controlNavScaffold):
a.append(a.controlNavScaffold);c.controlNav.set();c.controlNav.active();a.controlNavScaffold.delegate("a, img","click touchend MSPointerUp",function(b){b.preventDefault();if(""===m||m===b.type){var f=d(this),k=a.controlNav.index(f);f.hasClass(e+"active")||(a.direction=k>a.currentSlide?"next":"prev",a.flexAnimate(k,a.vars.pauseOnAction))}""===m&&(m=b.type);c.setToClearWatchedEvent()})},setupManual:function(){a.controlNav=a.manualControls;c.controlNav.active();a.controlNav.bind("click touchend MSPointerUp",
function(b){b.preventDefault();if(""===m||m===b.type){var f=d(this),k=a.controlNav.index(f);f.hasClass(e+"active")||(k>a.currentSlide?a.direction="next":a.direction="prev",a.flexAnimate(k,a.vars.pauseOnAction))}""===m&&(m=b.type);c.setToClearWatchedEvent()})},set:function(){a.controlNav=d("."+e+"control-nav li "+("thumbnails"===a.vars.controlNav?"img":"a"),a.controlsContainer?a.controlsContainer:a)},active:function(){a.controlNav.removeClass(e+"active").eq(a.animatingTo).addClass(e+"active")},update:function(b,
f){1<a.pagingCount&&"add"===b?a.controlNavScaffold.append(d("<li><a>"+a.count+"</a></li>")):1===a.pagingCount?a.controlNavScaffold.find("li").remove():a.controlNav.eq(f).closest("li").remove();c.controlNav.set();1<a.pagingCount&&a.pagingCount!==a.controlNav.length?a.update(f,b):c.controlNav.active()}},directionNav:{setup:function(){var b=d('<ul class="'+e+'direction-nav"><li><a class="'+e+'prev" href="#">'+a.vars.prevText+'</a></li><li><a class="'+e+'next" href="#">'+a.vars.nextText+"</a></li></ul>");
a.controlsContainer?(d(a.controlsContainer).append(b),a.directionNav=d("."+e+"direction-nav li a",a.controlsContainer)):(a.append(b),a.directionNav=d("."+e+"direction-nav li a",a));c.directionNav.update();a.directionNav.bind("click touchend MSPointerUp",function(b){b.preventDefault();var k;if(""===m||m===b.type)k=d(this).hasClass(e+"next")?a.getTarget("next"):a.getTarget("prev"),a.flexAnimate(k,a.vars.pauseOnAction);""===m&&(m=b.type);c.setToClearWatchedEvent()})},update:function(){var b=e+"disabled";
1===a.pagingCount?a.directionNav.addClass(b).attr("tabindex","-1"):a.vars.animationLoop?a.directionNav.removeClass(b).removeAttr("tabindex"):0===a.animatingTo?a.directionNav.removeClass(b).filter("."+e+"prev").addClass(b).attr("tabindex","-1"):a.animatingTo===a.last?a.directionNav.removeClass(b).filter("."+e+"next").addClass(b).attr("tabindex","-1"):a.directionNav.removeClass(b).removeAttr("tabindex")}},pausePlay:{setup:function(){var b=d('<div class="'+e+'pauseplay"><a></a></div>');a.controlsContainer?
(a.controlsContainer.append(b),a.pausePlay=d("."+e+"pauseplay a",a.controlsContainer)):(a.append(b),a.pausePlay=d("."+e+"pauseplay a",a));c.pausePlay.update(a.vars.slideshow?e+"pause":e+"play");a.pausePlay.bind("click touchend MSPointerUp",function(b){b.preventDefault();if(""===m||m===b.type)d(this).hasClass(e+"pause")?(a.manualPause=!0,a.manualPlay=!1,a.pause()):(a.manualPause=!1,a.manualPlay=!0,a.play());""===m&&(m=b.type);c.setToClearWatchedEvent()})},update:function(b){"play"===b?a.pausePlay.removeClass(e+
"pause").addClass(e+"play").html(a.vars.playText):a.pausePlay.removeClass(e+"play").addClass(e+"pause").html(a.vars.pauseText)}},touch:function(){var b,f,k,d,c,e,m=!1,l=0,q=0,s=0;if(v){g.style.msTouchAction="none";g._gesture=new MSGesture;g._gesture.target=g;g.addEventListener("MSPointerDown",t,!1);g._slider=a;g.addEventListener("MSGestureChange",u,!1);g.addEventListener("MSGestureEnd",y,!1);var t=function(b){b.stopPropagation();a.animating?b.preventDefault():(a.pause(),g._gesture.addPointer(b.pointerId),
s=0,d=p?a.h:a.w,e=Number(new Date),k=h&&n&&a.animatingTo===a.last?0:h&&n?a.limit-(a.itemW+a.vars.itemMargin)*a.move*a.animatingTo:h&&a.currentSlide===a.last?a.limit:h?(a.itemW+a.vars.itemMargin)*a.move*a.currentSlide:n?(a.last-a.currentSlide+a.cloneOffset)*d:(a.currentSlide+a.cloneOffset)*d)},u=function(a){a.stopPropagation();var b=a.target._slider;if(b){var f=-a.translationX,h=-a.translationY;c=s+=p?h:f;m=p?Math.abs(s)<Math.abs(-f):Math.abs(s)<Math.abs(-h);if(a.detail===a.MSGESTURE_FLAG_INERTIA)setImmediate(function(){g._gesture.stop()});
else if(!m||500<Number(new Date)-e)a.preventDefault(),!r&&b.transitions&&(b.vars.animationLoop||(c=s/(0===b.currentSlide&&0>s||b.currentSlide===b.last&&0<s?Math.abs(s)/d+2:1)),b.setProps(k+c,"setTouch"))}},y=function(a){a.stopPropagation();if(a=a.target._slider){if(a.animatingTo===a.currentSlide&&!m&&null!==c){var g=n?-c:c,h=0<g?a.getTarget("next"):a.getTarget("prev");a.canAdvance(h)&&(550>Number(new Date)-e&&50<Math.abs(g)||Math.abs(g)>d/2)?a.flexAnimate(h,a.vars.pauseOnAction):r||a.flexAnimate(a.currentSlide,
a.vars.pauseOnAction,!0)}k=c=f=b=null;s=0}}}else{g.addEventListener("touchstart",z,!1);var z=function(c){if(a.animating)c.preventDefault();else if(window.navigator.msPointerEnabled||1===c.touches.length)a.pause(),d=p?a.h:a.w,e=Number(new Date),l=c.touches[0].pageX,q=c.touches[0].pageY,k=h&&n&&a.animatingTo===a.last?0:h&&n?a.limit-(a.itemW+a.vars.itemMargin)*a.move*a.animatingTo:h&&a.currentSlide===a.last?a.limit:h?(a.itemW+a.vars.itemMargin)*a.move*a.currentSlide:n?(a.last-a.currentSlide+a.cloneOffset)*
d:(a.currentSlide+a.cloneOffset)*d,b=p?q:l,f=p?l:q,g.addEventListener("touchmove",w,!1),g.addEventListener("touchend",x,!1)},w=function(g){l=g.touches[0].pageX;q=g.touches[0].pageY;c=p?b-q:b-l;m=p?Math.abs(c)<Math.abs(l-f):Math.abs(c)<Math.abs(q-f);if(!m||500<Number(new Date)-e)g.preventDefault(),!r&&a.transitions&&(a.vars.animationLoop||(c/=0===a.currentSlide&&0>c||a.currentSlide===a.last&&0<c?Math.abs(c)/d+2:1),a.setProps(k+c,"setTouch"))},x=function(h){g.removeEventListener("touchmove",w,!1);if(a.animatingTo===
a.currentSlide&&!m&&null!==c){h=n?-c:c;var l=0<h?a.getTarget("next"):a.getTarget("prev");a.canAdvance(l)&&(550>Number(new Date)-e&&50<Math.abs(h)||Math.abs(h)>d/2)?a.flexAnimate(l,a.vars.pauseOnAction):r||a.flexAnimate(a.currentSlide,a.vars.pauseOnAction,!0)}g.removeEventListener("touchend",x,!1);k=c=f=b=null}}},resize:function(){!a.animating&&a.is(":visible")&&(h||a.doMath(),r?c.smoothHeight():h?(a.slides.width(a.computedW),a.update(a.pagingCount),a.setProps()):p?(a.viewport.height(a.h),a.setProps(a.h,
"setTotal")):(a.vars.smoothHeight&&c.smoothHeight(),a.newSlides.width(a.computedW),a.setProps(a.computedW,"setTotal")))},smoothHeight:function(b){if(!p||r){var f=r?a:a.viewport;b?f.animate({height:a.slides.eq(a.animatingTo).height()},b):f.height(a.slides.eq(a.animatingTo).height())}},sync:function(b){var f=d(a.vars.sync).data("flexslider"),c=a.animatingTo;switch(b){case "animate":f.flexAnimate(c,a.vars.pauseOnAction,!1,!0);break;case "play":f.playing||f.asNav||f.play();break;case "pause":f.pause()}},
uniqueID:function(a){a.find("[id]").each(function(){var a=d(this);a.attr("id",a.attr("id")+"_clone")});return a},pauseInvisible:{visProp:null,init:function(){var b=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var f=0;f<b.length;f++)b[f]+"Hidden"in document&&(c.pauseInvisible.visProp=b[f]+"Hidden");c.pauseInvisible.visProp&&(b=c.pauseInvisible.visProp.replace(/[H|h]idden/,"")+"visibilitychange",document.addEventListener(b,function(){c.pauseInvisible.isHidden()?a.startTimeout?
clearTimeout(a.startTimeout):a.pause():a.started?a.play():0<a.vars.initDelay?setTimeout(a.play,a.vars.initDelay):a.play()}))},isHidden:function(){return document[c.pauseInvisible.visProp]||!1}},setToClearWatchedEvent:function(){clearTimeout(u);u=setTimeout(function(){m=""},3E3)}};a.flexAnimate=function(b,f,k,g,m){a.vars.animationLoop||b===a.currentSlide||(a.direction=b>a.currentSlide?"next":"prev");q&&1===a.pagingCount&&(a.direction=a.currentItem<b?"next":"prev");if(!a.animating&&(a.canAdvance(b,
m)||k)&&a.is(":visible")){if(q&&g)if(k=d(a.vars.asNavFor).data("flexslider"),a.atEnd=0===b||b===a.count-1,k.flexAnimate(b,!0,!1,!0,m),a.direction=a.currentItem<b?"next":"prev",k.direction=a.direction,Math.ceil((b+1)/a.visible)-1!==a.currentSlide&&0!==b)a.currentItem=b,a.slides.removeClass(e+"active-slide").eq(b).addClass(e+"active-slide"),b=Math.floor(b/a.visible);else return a.currentItem=b,a.slides.removeClass(e+"active-slide").eq(b).addClass(e+"active-slide"),!1;a.animating=!0;a.animatingTo=b;
f&&a.pause();a.vars.before(a);a.syncExists&&!m&&c.sync("animate");a.vars.controlNav&&c.controlNav.active();h||a.slides.removeClass(e+"active-slide").eq(b).addClass(e+"active-slide");a.atEnd=0===b||b===a.last;a.vars.directionNav&&c.directionNav.update();b===a.last&&(a.vars.end(a),a.vars.animationLoop||a.pause());if(r)t?(a.slides.eq(a.currentSlide).css({opacity:0,zIndex:1}),a.slides.eq(b).css({opacity:1,zIndex:2}),a.wrapup(l)):(a.slides.eq(a.currentSlide).css({zIndex:1}).animate({opacity:0},a.vars.animationSpeed,
a.vars.easing),a.slides.eq(b).css({zIndex:2}).animate({opacity:1},a.vars.animationSpeed,a.vars.easing,a.wrapup));else{var l=p?a.slides.filter(":first").height():a.computedW;h?(b=a.vars.itemMargin,b=(a.itemW+b)*a.move*a.animatingTo,b=b>a.limit&&1!==a.visible?a.limit:b):b=0===a.currentSlide&&b===a.count-1&&a.vars.animationLoop&&"next"!==a.direction?n?(a.count+a.cloneOffset)*l:0:a.currentSlide===a.last&&0===b&&a.vars.animationLoop&&"prev"!==a.direction?n?0:(a.count+1)*l:n?(a.count-1-b+a.cloneOffset)*
l:(b+a.cloneOffset)*l;a.setProps(b,"",a.vars.animationSpeed);a.transitions?(a.vars.animationLoop&&a.atEnd||(a.animating=!1,a.currentSlide=a.animatingTo),a.container.unbind("webkitTransitionEnd transitionend"),a.container.bind("webkitTransitionEnd transitionend",function(){a.wrapup(l)})):a.container.animate(a.args,a.vars.animationSpeed,a.vars.easing,function(){a.wrapup(l)})}a.vars.smoothHeight&&c.smoothHeight(a.vars.animationSpeed)}};a.wrapup=function(b){r||h||(0===a.currentSlide&&a.animatingTo===
a.last&&a.vars.animationLoop?a.setProps(b,"jumpEnd"):a.currentSlide===a.last&&0===a.animatingTo&&a.vars.animationLoop&&a.setProps(b,"jumpStart"));a.animating=!1;a.currentSlide=a.animatingTo;a.vars.after(a)};a.animateSlides=function(){a.animating||a.flexAnimate(a.getTarget("next"))};a.pause=function(){clearInterval(a.animatedSlides);a.animatedSlides=null;a.playing=!1;a.vars.pausePlay&&c.pausePlay.update("play");a.syncExists&&c.sync("pause")};a.play=function(){a.playing&&clearInterval(a.animatedSlides);
a.animatedSlides=a.animatedSlides||setInterval(a.animateSlides,a.vars.slideshowSpeed);a.started=a.playing=!0;a.vars.pausePlay&&c.pausePlay.update("pause");a.syncExists&&c.sync("play")};a.stop=function(){a.pause();a.stopped=!0};a.canAdvance=function(b,f){var c=q?a.pagingCount-1:a.last;return f?!0:q&&a.currentItem===a.count-1&&0===b&&"prev"===a.direction?!0:q&&0===a.currentItem&&b===a.pagingCount-1&&"next"!==a.direction?!1:b!==a.currentSlide||q?a.vars.animationLoop?!0:a.atEnd&&0===a.currentSlide&&b===
c&&"next"!==a.direction?!1:a.atEnd&&a.currentSlide===c&&0===b&&"next"===a.direction?!1:!0:!1};a.getTarget=function(b){a.direction=b;return"next"===b?a.currentSlide===a.last?0:a.currentSlide+1:0===a.currentSlide?a.last:a.currentSlide-1};a.setProps=function(b,f,c){var d=function(){var c=b?b:(a.itemW+a.vars.itemMargin)*a.move*a.animatingTo;return-1*function(){if(h)return"setTouch"===f?b:n&&a.animatingTo===a.last?0:n?a.limit-(a.itemW+a.vars.itemMargin)*a.move*a.animatingTo:a.animatingTo===a.last?a.limit:
c;switch(f){case "setTotal":return n?(a.count-1-a.currentSlide+a.cloneOffset)*b:(a.currentSlide+a.cloneOffset)*b;case "setTouch":return b;case "jumpEnd":return n?b:a.count*b;case "jumpStart":return n?a.count*b:b;default:return b}}()+"px"}();a.transitions&&(d=p?"translate3d(0,"+d+",0)":"translate3d("+d+",0,0)",c=void 0!==c?c/1E3+"s":"0s",a.container.css("-"+a.pfx+"-transition-duration",c),a.container.css("transition-duration",c));a.args[a.prop]=d;(a.transitions||void 0===c)&&a.container.css(a.args);
a.container.css("transform",d)};a.setup=function(b){if(r)a.slides.css({width:"100%","float":"left",marginRight:"-100%",position:"relative"}),"init"===b&&(t?a.slides.css({opacity:0,display:"block",webkitTransition:"opacity "+a.vars.animationSpeed/1E3+"s ease",zIndex:1}).eq(a.currentSlide).css({opacity:1,zIndex:2}):a.slides.css({opacity:0,display:"block",zIndex:1}).eq(a.currentSlide).css({zIndex:2}).animate({opacity:1},a.vars.animationSpeed,a.vars.easing)),a.vars.smoothHeight&&c.smoothHeight();else{var f,
g;"init"===b&&(a.viewport=d('<div class="'+e+'viewport"></div>').css({overflow:"hidden",position:"relative"}).appendTo(a).append(a.container),a.cloneCount=0,a.cloneOffset=0,n&&(g=d.makeArray(a.slides).reverse(),a.slides=d(g),a.container.empty().append(a.slides)));a.vars.animationLoop&&!h&&(a.cloneCount=2,a.cloneOffset=1,"init"!==b&&a.container.find(".clone").remove(),c.uniqueID(a.slides.first().clone().addClass("clone").attr("aria-hidden","true")).appendTo(a.container),c.uniqueID(a.slides.last().clone().addClass("clone").attr("aria-hidden",
"true")).prependTo(a.container));a.newSlides=d(a.vars.selector,a);f=n?a.count-1-a.currentSlide+a.cloneOffset:a.currentSlide+a.cloneOffset;p&&!h?(a.container.height(200*(a.count+a.cloneCount)+"%").css("position","absolute").width("100%"),setTimeout(function(){a.newSlides.css({display:"block"});a.doMath();a.viewport.height(a.h);a.setProps(f*a.h,"init")},"init"===b?100:0)):(a.container.width(200*(a.count+a.cloneCount)+"%"),a.setProps(f*a.computedW,"init"),setTimeout(function(){a.doMath();a.newSlides.css({width:a.computedW,
"float":"left",display:"block"});a.vars.smoothHeight&&c.smoothHeight()},"init"===b?100:0))}h||a.slides.removeClass(e+"active-slide").eq(a.currentSlide).addClass(e+"active-slide");a.vars.init(a)};a.doMath=function(){var b=a.slides.first(),c=a.vars.itemMargin,d=a.vars.minItems,e=a.vars.maxItems;a.w=void 0===a.viewport?a.width():a.viewport.width();a.h=b.height();a.boxPadding=b.outerWidth()-b.width();h?(a.itemT=a.vars.itemWidth+c,a.minW=d?d*a.itemT:a.w,a.maxW=e?e*a.itemT-c:a.w,a.itemW=a.minW>a.w?(a.w-
c*(d-1))/d:a.maxW<a.w?(a.w-c*(e-1))/e:a.vars.itemWidth>a.w?a.w:a.vars.itemWidth,a.visible=Math.floor(a.w/a.itemW),a.move=0<a.vars.move&&a.vars.move<a.visible?a.vars.move:a.visible,a.pagingCount=Math.ceil((a.count-a.visible)/a.move+1),a.last=a.pagingCount-1,a.limit=1===a.pagingCount?0:a.vars.itemWidth>a.w?a.itemW*(a.count-1)+c*(a.count-1):(a.itemW+c)*a.count-a.w-c):(a.itemW=a.w,a.pagingCount=a.count,a.last=a.count-1);a.computedW=a.itemW-a.boxPadding};a.update=function(b,d){a.doMath();h||(b<a.currentSlide?
a.currentSlide+=1:b<=a.currentSlide&&0!==b&&(a.currentSlide-=1),a.animatingTo=a.currentSlide);if(a.vars.controlNav&&!a.manualControls)if("add"===d&&!h||a.pagingCount>a.controlNav.length)c.controlNav.update("add");else if("remove"===d&&!h||a.pagingCount<a.controlNav.length)h&&a.currentSlide>a.last&&(a.currentSlide-=1,a.animatingTo-=1),c.controlNav.update("remove",a.last);a.vars.directionNav&&c.directionNav.update()};a.addSlide=function(b,c){var e=d(b);a.count+=1;a.last=a.count-1;p&&n?void 0!==c?a.slides.eq(a.count-
c).after(e):a.container.prepend(e):void 0!==c?a.slides.eq(c).before(e):a.container.append(e);a.update(c,"add");a.slides=d(a.vars.selector+":not(.clone)",a);a.setup();a.vars.added(a)};a.removeSlide=function(b){var c=isNaN(b)?a.slides.index(d(b)):b;a.count-=1;a.last=a.count-1;isNaN(b)?d(b,a.slides).remove():p&&n?a.slides.eq(a.last).remove():a.slides.eq(b).remove();a.doMath();a.update(c,"remove");a.slides=d(a.vars.selector+":not(.clone)",a);a.setup();a.vars.removed(a)};c.init()};d(window).blur(function(d){focused=
!1}).focus(function(d){focused=!0});d.flexslider.defaults={namespace:"flex-",selector:".slides > li",animation:"fade",easing:"swing",direction:"horizontal",reverse:!1,animationLoop:!0,smoothHeight:!1,startAt:0,slideshow:!0,slideshowSpeed:7E3,animationSpeed:600,initDelay:0,randomize:!1,thumbCaptions:!1,pauseOnAction:!0,pauseOnHover:!1,pauseInvisible:!0,useCSS:!0,touch:!0,video:!1,controlNav:!0,directionNav:!0,prevText:"Previous",nextText:"Next",keyboard:!0,multipleKeyboard:!1,mousewheel:!1,pausePlay:!1,
pauseText:"Pause",playText:"Play",controlsContainer:"",manualControls:"",sync:"",asNavFor:"",itemWidth:0,itemMargin:0,minItems:1,maxItems:0,move:0,allowOneSlide:!0,start:function(){},before:function(){},after:function(){},end:function(){},added:function(){},removed:function(){},init:function(){}};d.fn.flexslider=function(g){void 0===g&&(g={});if("object"===typeof g)return this.each(function(){var a=d(this),e=a.find(g.selector?g.selector:".slides > li");1===e.length&&!0===g.allowOneSlide||0===e.length?
(e.fadeIn(400),g.start&&g.start(a)):void 0===a.data("flexslider")&&new d.flexslider(this,g)});var l=d(this).data("flexslider");switch(g){case "play":l.play();break;case "pause":l.pause();break;case "stop":l.stop();break;case "next":l.flexAnimate(l.getTarget("next"),!0);break;case "prev":case "previous":l.flexAnimate(l.getTarget("prev"),!0);break;default:"number"===typeof g&&l.flexAnimate(g,!0)}}})(jQuery);;
(function($){

$( document ).ready(function() {

	$('.slider.inline').flexslider({
	    animation: "fade",
	    controlNav: false,
	    directionNav: false,
	    slideshow: false,
	    touch: true,
	    controlsContainer: '.flex-container',
	    start: function(slider) {

			sliderEventsHandlers(slider);

          	slider.find('.page_numbers .current').text(slider.currentSlide+1);
          	slider.find('.page_numbers .all').text(slider.count);

          	//var imgContainerHeight = slider.find('.imgContainer').height();
			//slider.find('.prev').height(imgContainerHeight);
          	//slider.find('.next').height(imgContainerHeight);

          	slider.find('.flexslider').show();
        },
        after: function(slider) {
        	slider.find('.page_numbers .current').text(slider.currentSlide+1);
          	slider.find('.page_numbers .all').text(slider.count);
          	slider.find('.inline-prev').show();

          	navigationEventsHandlers(slider);
        }
	});

	fixActiveSliderHeight = function(currentActiveSlide) {
	    // Set fixed height based on the tallest slide
        var sliderHeight = 0;
        var flexSliderContainer = $(document).find('.flex-viewport');
      	flexSliderContainer.css({'height' : currentActiveSlide.height()});
	}

	sliderEventsHandlers = function(sliderContainer){
		sliderContainer.find('.prev').on('click', function(){
		    $(this).parent().parent().flexslider('prev');
		    return false;
		});

		sliderContainer.find('.next').on('click', function(){
		    $(this).parent().parent().flexslider('next');
		    return false;
		});
		sliderContainer.find('li img').on('click', function(){
		   // $(this).parent().parent().parent().parent().flexslider('next');
		    $(document).find('.slider').flexslider('next');
		    return false;
		});
		sliderContainer.find('.full-screen-button').on('click', function(){
		    if (screenfull.enabled) {
		        screenfull.toggle();
		    }
		});
	}

	sliderTouchEventsHandlers = function(sliderSelector){
		$$(sliderSelector + ' ul.slides li').swipeLeft(function() {
			$(this).parent().parent().parent().flexslider("next"); //Go to next slide
			return false;
		});

		$$(sliderSelector + ' ul.slides li').swipeRight(function() { 
			$(this).parent().parent().parent().flexslider("prev"); //Go to previous slide 
			return false;
		});
		// go back for last slide
		$$(sliderSelector + ' ul.slides .last-slide').swipeRight(function() { 
			$(this).parent().parent().parent().flexslider("prev"); //Go to previous slide 
			return false;
		});
	}

	navigationEventsHandlers = function(slider){
      	// hide 'next' button if needed, for last slide
      	if (slider.count == slider.currentSlide+1){
      		slider.find('.next').show();
      		slider.find('.prev').show();
      	// first slideL hinde 'before' button
      	} else if (slider.currentSlide == 0){
      		slider.find('.prev').hide();
      		slider.find('.next').show();

			slider.find('.page_numbers').hide();
      	}
      	// show all buttons
      	else{
      		slider.find('.next').show();
      		slider.find('.prev').show();
      	}
	}

	tishinaNavigationEventsHandlers = function(slider){
      	// hide 'next' button if needed, for last slide
      	if (slider.count == slider.currentSlide+1){
      		slider.find('.next').show();
      		slider.find('.prev').show();
      	// first slideL hinde 'before' button
      	} else if (slider.currentSlide == 0){
      		slider.find('.prev').hide();
      		slider.find('.next').hide();
			slider.find('.page_numbers').hide();
      	}
      	// show all buttons
      	else{
      		slider.find('.next').show();
      		slider.find('.prev').show();
      	}

	}


	$('.slider.fullscreen.photo1').flexslider({
	    animation: "fade",
	    controlNav: false,
	    directionNav: false,
	    slideshow: false,
	    animationLoop: false,
	    animationSpeed: 400,
	    controlsContainer: '.flexslider',
	    start: function(slider) {
	    	var slidesToShowCounter = slider.find('.item').size();

	    	sliderEventsHandlers(slider);
			tishinaNavigationEventsHandlers(slider);
			sliderTouchEventsHandlers('.slider.fullscreen.media');

          	slider.find('.page_numbers .current').text(slider.currentSlide+1);
          	slider.find('.page_numbers .all').text(slidesToShowCounter);
	    	slider.find('.flex-viewport').show();


			//fixActiveSliderHeight();
			//onResizeHandler();

			$( window ).on('resize', function(){
				//fixActiveSliderHeight();
			});
        },
        after: function(slider) {
	    	var slidesToShowCounter = slider.find('.item').size();

          	fixActiveSliderHeight(slider.find('flex-active-slide'));
			navigationEventsHandlers(slider);

        	slider.find('.page_numbers .current').text(slider.currentSlide+1);

          	// case for real last slide : hiding pagination
          	if ((slider.count == slidesToShowCounter+1 && slider.count == slider.currentSlide+1)) {
          		slider.find('.page_numbers').hide();
          		//slider.find('.flex-viewport').css('overflow-y','visible');
          	}
          	// or showing it
          	else {
          		slider.find('.page_numbers').show();
          		//slider.find('.flex-viewport').css('overflow-y','hidden');
          	}


        }
    });
	
	$('.slider.fullscreen.media').flexslider({
	    animation: 'slide',
	    controlNav: false,
	    directionNav: false,
	    slideshow: false,
	    animationLoop: false,
	    animationSpeed: 400,
	    controlsContainer: '.flexslider',
	    start: function(slider) {
	    	var slidesToShowCounter = slider.find('.item').size();

	    	sliderEventsHandlers(slider);
			sliderTouchEventsHandlers('.slider.fullscreen.media');

          	slider.find('.page_numbers .current').text(slider.currentSlide+1);
          	slider.find('.page_numbers .all').text(slidesToShowCounter);
	    	slider.find('.flex-viewport').show();

			//fixActiveSliderHeight();
			//onResizeHandler();

			$( window ).on('resize', function(){
				//fixActiveSliderHeight();
			});
        },
        after: function(slider) {

	    	var slidesToShowCounter = slider.find('.item').size();

          	fixActiveSliderHeight(slider.find('flex-active-slide'));
			navigationEventsHandlers(slider);

        	slider.find('.page_numbers .current').text(slider.currentSlide+1);

          	// case for real last slide : hiding pagination
          	if (slider.count == slidesToShowCounter+1 && slider.count == slider.currentSlide+1) {
          		slider.find('.page_numbers').hide();
          		slider.find('.flex-viewport').css('overflow-y','visible');
          	}
          	// or showing it
          	else {
          		slider.find('.page_numbers').show();
          		slider.find('.flex-viewport').css('overflow-y','hidden');
          	}
        }
    });

});

  // your code here, using jQuery 1.7.1
})(jQuery);
(function(w) {
if (w.fastXDM) return;

var handlers = {};
var onEnvLoad = [];
var env = {};

// Key generation
function genKey() {
  var key = '';
  for (i=0;i<5;i++) key += Math.ceil(Math.random()*15).toString(16);
  return key;
}
function waitFor(obj, prop, func, self,  count) {
  if (obj[prop]) {
     func.apply(self);
  } else {
    count = count || 0;
    if (count < 1000) setTimeout(function() {
      waitFor(obj, prop, func, self, count + 1)
    }, 0);
  }
}
function attachScript(url) {
  setTimeout(function() {
    var newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.src = url || w.fastXDM.helperUrl;
    waitFor(document, 'body', function() {
      document.getElementsByTagName('HEAD')[0].appendChild(newScript);
    });
  }, 0);
}

function walkVar(value, clean) {
  switch (typeof value) {
    case 'string':
      if (clean) {
        return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
      }
      return value.replace(/&#039;/g, '\'').replace(/&quot;/g, '"').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');

    case 'object':
      if (Object.prototype.toString.apply(value) === '[object Array]') {
        newValue = [];
        for (var i = 0; i < value.length; i++) {
          newValue[i] = walkVar(value[i], clean);
        }
      } else {
        for (var k in value) {
          newValue = {};
          if (Object.hasOwnProperty.call(value, k)) {
            newValue[k] = walkVar(value[k], clean);
          }
        }
      }
    default:
      newValue = value;
  }

  return newValue;
}

// Env functions
function getEnv(callback, self) {
  if (env.loaded) {
    callback.apply(self, [env]);
  } else {
    onEnvLoad.push([self, callback]);
  }
}

function envLoaded() {
  env.loaded = true;
  var i = onEnvLoad.length;
  while (i--) {
    onEnvLoad[i][1].apply(onEnvLoad[i][0], [env]);
  }
}

function applyMethod(strData, self) {
  getEnv(function(env) {
    var data = env.json.parse(strData);
    if (data[0]) {
      if (!data[1]) data[1] = [];
      var i = data[1].length;
      while (i--) {
        if (data[1][i]._func) {
          var funcNum = data[1][i]._func;
          data[1][i] = function() {
            var args = Array.prototype.slice.call(arguments);
            args.unshift('_func'+funcNum);
            self.callMethod.apply(self, args);
          }
        } else if (self.options.safe) {
          data[1][i] = walkVar(data[1][i], true);
        }
      }
      setTimeout(function() {
        if (!self.methods[data[0]]) {
          throw Error('fastXDM: Method ' + data[0] + ' is undefined');
        }
        self.methods[data[0]].apply(self, data[1]);
      }, 0);
    }
  });
}

// XDM object
w.fastXDM = {
  _id: 0,
  helperUrl: ((location.protocol === 'https:') ? 'https:' : 'http:') + '//vk.com/js/api/xdmHelper.js',

  Server: function(methods, filter, options) {
    this.methods = methods || {};
    this.id = w.fastXDM._id++;
    this.options = options || {};
    this.filter = filter;
    this.key = genKey();
    this.methods['%init%'] = this.methods.__fxdm_i = function() {
      w.fastXDM.run(this.id);
      if (this.methods.onInit) this.methods.onInit();
    };
    this.frameName = 'fXD'+this.key;
    this.server = true;
    handlers[this.key] = [applyMethod, this];
  },

  Client: function(methods, options) {
    this.methods = methods || {};
    this.id = w.fastXDM._id++;
    this.options = options || {};
    w.fastXDM.run(this.id);
    if (window.name.indexOf('fXD') === 0) {
      this.key = window.name.substr(3);
    } else {
      throw Error('Wrong window.name property.');
    }
    this.caller = window.parent;
    handlers[this.key] = [applyMethod, this];
    this.client = true;

    w.fastXDM.on('helper', function() {
      w.fastXDM.onClientStart(this);
    }, this);

    getEnv(function(env) {
      env.send(this, env.json.stringify(['%init%']));
      var methods = this.methods;
      setTimeout(function() {
        if (methods.onInit) methods.onInit();
      }, 0);
    }, this);
  },

  onMessage: function(e) {
    if (!e.data) return false;
    var data = e.data;
    if (typeof data != 'string' && !(data instanceof String)) return false;
    var key = data.substr(0, 5);
    if (handlers[key]) {
      var self = handlers[key][1];
      if (self && (!self.filter || self.filter(e.origin))) {
        handlers[key][0](e.data.substr(6), self);
      }
    }
  },

  setJSON: function(json) {
    env.json = json;
  },

  getJSON: function(callback) {
    if (!callback) return env.json;
    getEnv(function(env) {
      callback(env.json);
    });
  },

  setEnv: function(exEnv) {
    var i;
    for (i in exEnv) {
      env[i] = exEnv[i];
    }
    envLoaded();
  },

  _q: {},

  on: function(key, act, self) {
    if (!this._q[key]) this._q[key] = [];
    if (this._q[key] == -1) {
      act.apply(self);
    } else {
      this._q[key].push([act, self]);
    }
  },

  run: function(key) {
    var len = (this._q[key] || []).length;
    if (this._q[key] && len > 0) {
      for (var i = 0; i < len; i++) this._q[key][i][0].apply(this._q[key][i][1]);
    }
    this._q[key] = -1;
  },

  waitFor: waitFor
}

w.fastXDM.Server.prototype.start = function(obj, count) {
  if (obj.contentWindow) {
    this.caller = obj.contentWindow;
    this.frame = obj;

    w.fastXDM.on('helper', function() {
      w.fastXDM.onServerStart(this);
    }, this);

  } else { // Opera old versions
    var self = this;
    count = count || 0;
    if (count < 50) setTimeout(function() {
      self.start.apply(self, [obj, count+1]);
    }, 100);
  }
}

w.fastXDM.Server.prototype.destroy = function() {
  handlers.splice(handlers.indexOf(this.key), 1);
}

function extend(obj1, obj2){
  for (var i in obj2) {
    if (obj1[i] && typeof(obj1[i]) == 'object') {
      extend(obj1[i], obj2[i])
    } else {
      obj1[i] = obj2[i];
    }
  }
}

w.fastXDM.Server.prototype.append = function(obj, options) {
  var div = document.createElement('DIV');
  div.innerHTML = '<iframe name="'+this.frameName+'" ></iframe>';
  var frame = div.firstChild;
  var self = this;
  setTimeout(function() {
    frame.frameBorder = '0';
    if (options) extend(frame, options);
    obj.insertBefore(frame, obj.firstChild);
    self.start(frame);
  }, 0);
  return frame;
}

w.fastXDM.Client.prototype.callMethod = w.fastXDM.Server.prototype.callMethod = function() {
  var args = Array.prototype.slice.call(arguments);
  var method = args.shift();
  var i = args.length;
  while (i--) {
    if (typeof(args[i]) == 'function') {
      this.funcsCount = (this.funcsCount || 0) + 1;
      var func = args[i];
      var funcName = '_func' + this.funcsCount;
      this.methods[funcName] = function() {
        func.apply(this, arguments);
        delete this.methods[funcName];
      }
      args[i] = {_func: this.funcsCount};
    } else if (this.options.safe) {
      args[i] = walkVar(args[i], false);
    }
  }
  waitFor(this, 'caller', function() {
    w.fastXDM.on(this.id, function() {
      getEnv(function(env) {
        env.send(this, env.json.stringify([method, args]));
      }, this);
    }, this);
  }, this);
}

if (w.JSON && typeof(w.JSON) == 'object' && w.JSON.parse && w.JSON.stringify && w.JSON.stringify({a:[1,2,3]}).replace(/ /g, '') == '{"a":[1,2,3]}') {
  env.json = {parse: w.JSON.parse, stringify: w.JSON.stringify};
} else {
  w.fastXDM._needJSON = true;
}

// PostMessage cover
if (w.postMessage) {
  env.protocol = 'p';
  env.send = function(xdm, strData) {
    var win = (xdm.frame ? xdm.frame.contentWindow : xdm.caller);
    win.postMessage(xdm.key+':'+strData, "*");
  }
  if (w.addEventListener) {
    w.addEventListener("message", w.fastXDM.onMessage, false);
  } else {
    w.attachEvent("onmessage", w.fastXDM.onMessage);
  }

  if (w.fastXDM._needJSON) {
    w.fastXDM._onlyJSON = true;
    attachScript();
  } else {
    envLoaded();
  }
} else {
  attachScript();
}
})(window);


if (!window.VK) window.VK = {};


/*
 * Based on JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 */
if(!VK.MD5){VK.MD5=function(n){var j=function(o,r){var q=(o&65535)+(r&65535),p=(o>>16)+(r>>16)+(q>>16);return(p<<16)|(q&65535)},g=function(o,p){return(o<<p)|(o>>>(32-p))},k=function(w,r,p,o,v,u){return j(g(j(j(r,w),j(o,u)),v),p)},a=function(q,p,w,v,o,u,r){return k((p&w)|((~p)&v),q,p,o,u,r)},h=function(q,p,w,v,o,u,r){return k((p&v)|(w&(~v)),q,p,o,u,r)},c=function(q,p,w,v,o,u,r){return k(p^w^v,q,p,o,u,r)},m=function(q,p,w,v,o,u,r){return k(w^(p|(~v)),q,p,o,u,r)},b=function(A,u){var z=1732584193,y=-271733879,w=-1732584194,v=271733878,r,q,p,o;A[u>>5]|=128<<((u)%32);A[(((u+64)>>>9)<<4)+14]=u;for(var t=0,s=A.length;t<s;t+=16){r=z;q=y;p=w;o=v;z=a(z,y,w,v,A[t+0],7,-680876936);v=a(v,z,y,w,A[t+1],12,-389564586);w=a(w,v,z,y,A[t+2],17,606105819);y=a(y,w,v,z,A[t+3],22,-1044525330);z=a(z,y,w,v,A[t+4],7,-176418897);v=a(v,z,y,w,A[t+5],12,1200080426);w=a(w,v,z,y,A[t+6],17,-1473231341);y=a(y,w,v,z,A[t+7],22,-45705983);z=a(z,y,w,v,A[t+8],7,1770035416);v=a(v,z,y,w,A[t+9],12,-1958414417);w=a(w,v,z,y,A[t+10],17,-42063);y=a(y,w,v,z,A[t+11],22,-1990404162);z=a(z,y,w,v,A[t+12],7,1804603682);v=a(v,z,y,w,A[t+13],12,-40341101);w=a(w,v,z,y,A[t+14],17,-1502002290);y=a(y,w,v,z,A[t+15],22,1236535329);z=h(z,y,w,v,A[t+1],5,-165796510);v=h(v,z,y,w,A[t+6],9,-1069501632);w=h(w,v,z,y,A[t+11],14,643717713);y=h(y,w,v,z,A[t+0],20,-373897302);z=h(z,y,w,v,A[t+5],5,-701558691);v=h(v,z,y,w,A[t+10],9,38016083);w=h(w,v,z,y,A[t+15],14,-660478335);y=h(y,w,v,z,A[t+4],20,-405537848);z=h(z,y,w,v,A[t+9],5,568446438);v=h(v,z,y,w,A[t+14],9,-1019803690);w=h(w,v,z,y,A[t+3],14,-187363961);y=h(y,w,v,z,A[t+8],20,1163531501);z=h(z,y,w,v,A[t+13],5,-1444681467);v=h(v,z,y,w,A[t+2],9,-51403784);w=h(w,v,z,y,A[t+7],14,1735328473);y=h(y,w,v,z,A[t+12],20,-1926607734);z=c(z,y,w,v,A[t+5],4,-378558);v=c(v,z,y,w,A[t+8],11,-2022574463);w=c(w,v,z,y,A[t+11],16,1839030562);y=c(y,w,v,z,A[t+14],23,-35309556);z=c(z,y,w,v,A[t+1],4,-1530992060);v=c(v,z,y,w,A[t+4],11,1272893353);w=c(w,v,z,y,A[t+7],16,-155497632);y=c(y,w,v,z,A[t+10],23,-1094730640);z=c(z,y,w,v,A[t+13],4,681279174);v=c(v,z,y,w,A[t+0],11,-358537222);w=c(w,v,z,y,A[t+3],16,-722521979);y=c(y,w,v,z,A[t+6],23,76029189);z=c(z,y,w,v,A[t+9],4,-640364487);v=c(v,z,y,w,A[t+12],11,-421815835);w=c(w,v,z,y,A[t+15],16,530742520);y=c(y,w,v,z,A[t+2],23,-995338651);z=m(z,y,w,v,A[t+0],6,-198630844);v=m(v,z,y,w,A[t+7],10,1126891415);w=m(w,v,z,y,A[t+14],15,-1416354905);y=m(y,w,v,z,A[t+5],21,-57434055);z=m(z,y,w,v,A[t+12],6,1700485571);v=m(v,z,y,w,A[t+3],10,-1894986606);w=m(w,v,z,y,A[t+10],15,-1051523);y=m(y,w,v,z,A[t+1],21,-2054922799);z=m(z,y,w,v,A[t+8],6,1873313359);v=m(v,z,y,w,A[t+15],10,-30611744);w=m(w,v,z,y,A[t+6],15,-1560198380);y=m(y,w,v,z,A[t+13],21,1309151649);z=m(z,y,w,v,A[t+4],6,-145523070);v=m(v,z,y,w,A[t+11],10,-1120210379);w=m(w,v,z,y,A[t+2],15,718787259);y=m(y,w,v,z,A[t+9],21,-343485551);z=j(z,r);y=j(y,q);w=j(w,p);v=j(v,o)}return[z,y,w,v]},f=function(r){var q="",s=-1,p=r.length,o,t;while(++s<p){o=r.charCodeAt(s);t=s+1<p?r.charCodeAt(s+1):0;if(55296<=o&&o<=56319&&56320<=t&&t<=57343){o=65536+((o&1023)<<10)+(t&1023);s++}if(o<=127){q+=String.fromCharCode(o)}else{if(o<=2047){q+=String.fromCharCode(192|((o>>>6)&31),128|(o&63))}else{if(o<=65535){q+=String.fromCharCode(224|((o>>>12)&15),128|((o>>>6)&63),128|(o&63))}else{if(o<=2097151){q+=String.fromCharCode(240|((o>>>18)&7),128|((o>>>12)&63),128|((o>>>6)&63),128|(o&63))}}}}}return q},e=function(p){var o=Array(p.length>>2),r,q;for(r=0,q=o.length;r<q;r++){o[r]=0}for(r=0,q=p.length*8;r<q;r+=8){o[r>>5]|=(p.charCodeAt(r/8)&255)<<(r%32)}return o},l=function(p){var o="";for(var r=0,q=p.length*32;r<q;r+=8){o+=String.fromCharCode((p[r>>5]>>>(r%32))&255)}return o},d=function(o){return l(b(e(o),o.length*8))},i=function(q){var t="0123456789abcdef",p="",o;for(var s=0,r=q.length;s<r;s++){o=q.charCodeAt(s);p+=t.charAt((o>>>4)&15)+t.charAt(o&15)}return p};return i(d(f(n)))}}

/*
 * VKontakte Open API JavaScript library
 * http://vk.com/
 */

VK.extend = function(target, source, overwrite) {
  for (var key in source) {
    if (overwrite || typeof target[key] === 'undefined') {
      target[key] = source[key];
    }
  }
  return target;
};

if (VK._protocol !== 'https:') {
  VK._protocol = ((location.protocol === 'https:') ? 'https:' : 'http:');
}

if (!VK.xdConnectionCallbacks) {

VK.extend(VK, {
  version: 1,
  _apiId: null,
  _session: null,
  _userStatus: 'unknown',
  _domain: {
    main: 'https://oauth.vk.com/',
    api: 'https://api.vk.com/'
  },
  _path: {
    login: 'authorize',
    proxy: 'fxdm_oauth_proxy.html'
  },
  _rootId: 'vk_api_transport',
  _nameTransportPath: '',
  xdReady: false,
  access: {
    FRIENDS:   0x2,
    PHOTOS:    0x4,
    AUDIO:     0x8,
    VIDEO:     0x10,
    MATCHES:   0x20,
    QUESTIONS: 0x40,
    WIKI:      0x80
  }
});

VK.init = function(options) {
  var body, root;

  VK._apiId = null;
  if (!options.apiId) {
    throw Error('VK.init() called without an apiId');
  }
  VK._apiId = options.apiId;

  if (options.onlyWidgets) return true;

  if (options.nameTransportPath && options.nameTransportPath !== '') {
    VK._nameTransportPath = options.nameTransportPath;
  }

  root = document.getElementById(VK._rootId);
  if (!root) {
    root = document.createElement('div');
    root.id = VK._rootId;
    body = document.getElementsByTagName('body')[0];
    body.insertBefore(root, body.childNodes[0]);
  }
  root.style.position = 'absolute';
  root.style.top = '-10000px';

  var session = VK.Cookie.load();
  if (session) {
    VK.Auth._loadState = 'loaded';
    VK.Auth.setSession(session, session ? 'connected' : 'unknown');
  }
};

if (!VK.Cookie) {
VK.Cookie = {
  _domain: null,
  load: function() {
    var
      cookie = document.cookie.match('\\bvk_app_' + VK._apiId + '=([^;]*)\\b'),
      session;

    if (cookie) {
      session = this.decode(cookie[1]);
      if (session.secret != 'oauth') {
        return false;
      }
      session.expire = parseInt(session.expire, 10);
      VK.Cookie._domain = '.' + window.location.hostname;//session.base_domain;
    }

    return session;
  },
  setRaw: function(val, ts, domain, time) {
    var rawCookie;
    rawCookie = 'vk_app_' + VK._apiId + '=' + val + '';
    var exp = time ? (new Date().getTime() + time * 1000) : ts * 1000;
    rawCookie += (val && ts === 0 ? '' : '; expires=' + new Date(exp).toGMTString());
    rawCookie += '; path=/';
    rawCookie += (domain ? '; domain=.' + domain : '');
    document.cookie = rawCookie;

    this._domain = domain;
  },
  set: function(session, resp) {
    if (session) {
      this.setRaw(this.encode(session), session.expire, window.location.hostname, (resp || {}).time);
    } else {
      this.clear();
    }
  },
  clear: function() {
    this.setRaw('', 0, this._domain, 0);
  },
  encode: function(params) {
    var
      pairs = [],
      key;

    for (key in params) {
      if (key != 'user') pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
    }
    pairs.sort();

    return pairs.join('&');
  },
  decode: function(str) {
    var
      params = {},
      parts = str.split('&'),
      i,
      pair;

    for (i=0; i < parts.length; i++) {
      pair = parts[i].split('=', 2);
      if (pair && pair[0]) {
        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
      }
    }

    return params;
  }
};
}

if (!VK.Api) {
VK.Api = {
  _headId: null,
  _callbacks: {},
  ie6_7: function() {
    if (!VK.Api.ieTested) {
      VK.Api.isIE6_7 = navigator.userAgent.match(/MSIE [6|7]/i);
      VK.Api.ieTested = true;
    }
    return VK.Api.isIE6_7;
  },
  attachScript: function(url) {
    if (!VK.Api._headId) VK.Api._headId = document.getElementsByTagName("head")[0];
    var newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.setAttribute('encoding', 'UTF-8');
    newScript.src = url;
    VK.Api._headId.appendChild(newScript);
  },
  checkMethod: function(method, params, cb, queryTry) {
    var m = method.toLowerCase();
    if (m == 'wall.post' || m == 'activity.set') {
      var text = (m == 'activity.set') ? params.text : params.message;
      if (!text) {
        text = '';
      }
      var query =  VK._protocol + '//vk.com/al_apps.php?act=wall_post_box&widget=1&method='+m+'&aid=' + parseInt(VK._apiId, 10) + '&text=' + encodeURIComponent(text);
      if (m == 'wall.post') {
        query += '&owner_id=' + parseInt(params.owner_id || 0, 10) + '&attachments=' + (params.attachments || params.attachment || '') + '&publish_date=' + (params.publish_date || '');
      }
      var method_access = '_'+(Math.random()).toString(16).substr(2);
      query += '&method_access='+method_access;
      var popup = VK.UI.popup({
        url: query,
        width: 460,
        height: 249
      });
      var timer = setInterval(function() {
        if (VK.UI.active.closed) {
          clearInterval(timer);
          params.method_access = method_access;
          VK.Api.call(method, params, cb, queryTry);
        }
      }, 500);
      return false;
    }
    return true;
  },
  call: function(method, params, cb, queryTry) {
    var
      query = params || {},
      qs,
      responseCb;

    if (typeof query != 'object' || typeof cb != 'function') {
      return false;
    }
    if (!params.method_access && !params.method_force && !VK.Api.checkMethod(method, params, cb, queryTry)) {
      return;
    }

    if (!queryTry) queryTry = 0;

    if (VK.Auth._loadState != 'loaded') {
      var authFunc = function(result) {
        if (result && result.session) {
          VK.Observer.unsubscribe('auth.loginStatus', authFunc);
          VK.Api.call(method, params, cb);
        }
      };
      VK.Observer.subscribe('auth.loginStatus', authFunc);
      VK.Auth.getLoginStatus();
      return;
    }

    if (VK.Api.queryLength(query) < 1500 && !VK.Api.ie6_7()) {
      var useXDM = false;
      var rnd = parseInt(Math.random() * 10000000, 10);
      while (VK.Api._callbacks[rnd]) {
        rnd = parseInt(Math.random() * 10000000, 10)
      }
      query.callback = 'VK.Api._callbacks['+rnd+']';
    } else {
      var useXDM = true;
    }

    if (VK._session && VK._session.sid) {
      query.access_token = VK._session.sid;
    }

    qs = VK.Cookie.encode(query);

    responseCb = function(response) {
      if (response.error && (response.error.error_code == 3 || response.error.error_code == 4 || response.error.error_code == 5)) {
        if (queryTry > 3) return false;
        var repeatCall = function(resp) {
          VK.Observer.unsubscribe('auth.sessionChange', repeatCall);
          delete params.access_token;
          if (resp.session) VK.Api.call(method, params, cb, queryTry + 1);
        }
        VK.Observer.subscribe('auth.sessionChange', repeatCall);
        VK.Auth.getLoginStatus();
      } else {
        cb(response);
      }
      if (!useXDM) delete VK.Api._callbacks[rnd];
    };

    if (useXDM) {
      if (VK.xdReady) {
        VK.XDM.remote.callMethod('apiCall', method, qs, responseCb);
      } else {
        VK.Observer.subscribe('xdm.init', function() {
          VK.XDM.remote.callMethod('apiCall', method, qs, responseCb);
        });
        VK.XDM.init();
      }
    } else {
      VK.Api._callbacks[rnd] = responseCb;
      VK.Api.attachScript(VK._domain.api + 'method/' + method +'?' + qs);
    }
  },
  queryLength: function(query) {
    var len = 100, i; // sid + sig
    for (i in query) {
      len += i.length + encodeURIComponent(query[i]).length + 1;
    }
    return len;
  }
};

// Alias
VK.api = function(method, params, cb) {VK.Api.call(method, params, cb);}
};

if (!VK.Auth) {
VK.Auth = {
  popup: null,
  lsCb: {},
  setSession: function(session, status, settings, resp) {
    var
      login = !VK._session && session,
      logout = VK._session && !session,
      both = VK._session && session && VK._session.mid != session.mid,
      sessionChange = login || logout || (VK._session && session && VK._session.sid != session.sid),
      statusChange = status != VK._userStatus,
      response = {
        'session': session,
        'status': status,
        'settings': settings
      };

    VK._session = session;

    VK._userStatus = status;

    VK.Cookie.set(session, resp);

    if (sessionChange || statusChange || both) {
      setTimeout(function() {
        if (statusChange) {
          VK.Observer.publish('auth.statusChange', response);
        }

        if (logout || both) {
          VK.Observer.publish('auth.logout', response);
        }

        if (login || both) {
          VK.Observer.publish('auth.login', response);
        }

        if (sessionChange) {
          VK.Observer.publish('auth.sessionChange', response);
        }
      }, 0);
    }

    return response;
  },
  // Public VK.Auth methods
  login: function(cb, settings) {
    var channel, url;
    if (!VK._apiId) {
      return false;
    }
    channel = window.location.protocol + '//' + window.location.hostname;
    url = VK._domain.main + VK._path.login + '?client_id='+VK._apiId+'&display=popup&redirect_uri=close.html&response_type=token';
    if (settings && parseInt(settings, 10) > 0) {
      url += '&scope=' + settings;
    }
    VK.Observer.unsubscribe('auth.onLogin');
    VK.Observer.subscribe('auth.onLogin', cb);
    VK.UI.popup({
      width: 665,
      height: 370,
      url: url
    });
    var authCallback = function() {
      VK.Auth.getLoginStatus(function(resp) {
        VK.Observer.publish('auth.onLogin', resp);
        VK.Observer.unsubscribe('auth.onLogin');
      }, true);
    }

    VK.UI.popupOpened = true;
    var popupCheck = function() {
      if (!VK.UI.popupOpened) return false;
      try {
        if (!VK.UI.active.top || VK.UI.active.closed) {
          VK.UI.popupOpened = false;
          authCallback();
          return true;
        }
      } catch(e) {
        VK.UI.popupOpened = false;
        authCallback();
        return true;
      }
      setTimeout(popupCheck, 100);
    };

    setTimeout(popupCheck, 100);
  },
  // Logout user from app, vk.com & login.vk.com
  logout: function(cb) {
    VK.Auth.revokeGrants(cb);
  },
  revokeGrants: function(cb) {
    var onLogout = function(resp) {
      VK.Observer.unsubscribe('auth.statusChange', onLogout);
      if (cb) cb(resp);
    }
    VK.Observer.subscribe('auth.statusChange', onLogout);
    if (VK._session && VK._session.sid) VK.Api.attachScript('https://login.vk.com/?act=openapi&oauth=1&aid=' + parseInt(VK._apiId, 10) + '&location=' + encodeURIComponent(window.location.hostname)+'&do_logout=1&token='+VK._session.sid);
    VK.Cookie.clear();
  },
  // Get current login status from session (sync) (not use on load time)
  getSession: function() {
    return VK._session;
  },
  // Get current login status from vk.com (async)
  getLoginStatus: function(cb, force) {
    if (!VK._apiId) {
      return;
    }

    if (cb) {
      if (!force && VK.Auth._loadState == 'loaded') {
        cb({status: VK._userStatus, session: VK._session});
        return;
      } else {
        VK.Observer.subscribe('auth.loginStatus', cb);
      }
    }

    if (!force && VK.Auth._loadState == 'loading') {
      return;
    }

    VK.Auth._loadState = 'loading';
    var rnd = parseInt(Math.random() * 10000000, 10);
    while (VK.Auth.lsCb[rnd]) {
      rnd = parseInt(Math.random() * 10000000, 10)
    }
    VK.Auth.lsCb[rnd] = function(response) {
      delete VK.Auth.lsCb[rnd];
      VK.Auth._loadState = 'loaded';
      if (response && response.auth) {
        var session = {
          mid: response.user.id,
          sid: response.access_token,
          sig: response.sig,
          secret: response.secret,
          expire: response.expire
        };
        if (force) session.user = response.user;
        var status = 'connected';
      } else {
        var session = null;
        var status = response.user ? 'logined' : 'unknown';
        VK.Cookie.clear();
      }
      VK.Auth.setSession(session, status, false, response);
      VK.Observer.publish('auth.loginStatus', {session: session, status: status});
      VK.Observer.unsubscribe('auth.loginStatus');
    };
    // AttachScript here
    VK.Api.attachScript('https://login.vk.com/?act=openapi&oauth=1&aid=' + parseInt(VK._apiId, 10) + '&location=' + encodeURIComponent(window.location.hostname)+'&rnd='+rnd);
  }
};
}

} else { // if VK.xdConnectionCallbacks
  setTimeout(function() {
    var callback;
    while (callback = VK.xdConnectionCallbacks.pop()) {
      callback();
    }
  }, 0);
  if (VK.Widgets && !VK.Widgets._constructor) {
    VK.Widgets = false;
  }
}

if (!VK.UI) {
VK.UI = {
  active: null,
  _buttons: [],
  popup: function(options) {
    var
      screenX = typeof window.screenX != 'undefined' ? window.screenX : window.screenLeft,
      screenY = typeof window.screenY != 'undefined' ? window.screenY : window.screenTop,
      outerWidth = typeof window.outerWidth != 'undefined' ? window.outerWidth : document.body.clientWidth,
      outerHeight = typeof window.outerHeight != 'undefined' ? window.outerHeight : (document.body.clientHeight - 22),
      width = options.width,
      height = options.height,
      left = parseInt(screenX + ((outerWidth - width) / 2), 10),
      top = parseInt(screenY + ((outerHeight - height) / 2.5), 10),
      features = (
        'width=' + width +
        ',height=' + height +
        ',left=' + left +
        ',top=' + top
      );
      this.active = window.open(options.url, 'vk_openapi', features);
  },
  button: function(el, handler) {
    var html = '';

    if (typeof el == 'string') {
      el = document.getElementById(el);
    }


    this._buttons.push(el);
    index = this._buttons.length - 1;

    html = (
      '<table cellspacing="0" cellpadding="0" id="openapi_UI_' + index + '" onmouseover="VK.UI._change(1, ' + index + ');" onmouseout="VK.UI._change(0, ' + index + ');" onmousedown="VK.UI._change(2, ' + index + ');" onmouseup="VK.UI._change(1, ' + index + ');" style="cursor: pointer; border: 0px; font-family: tahoma, arial, verdana, sans-serif, Lucida Sans; font-size: 10px;"><tr style="vertical-align: middle">' +
      '<td><div style="border: 1px solid #3b6798;border-radius: 2px 0px 0px 2px;-moz-border-radius: 2px 0px 0px 2px;-webkit-border-radius: 2px 0px 0px 2px;"><div style="border: 1px solid #5c82ab; border-top-color: #7e9cbc; background-color: #6D8DB1; color: #fff; text-shadow: 0px 1px #45688E; height: 15px; padding: 2px 4px 0px 6px;line-height: 13px;">&#1042;&#1086;&#1081;&#1090;&#1080;</div></div></td>' +
      '<td><div style="background: url(' + VK._protocol + '//vk.com/images/btns.png) 0px -42px no-repeat; width: 21px; height: 21px"></div></td>' +
      '<td><div style="border: 1px solid #3b6798;border-radius: 0px 2px 2px 0px;-moz-border-radius: 0px 2px 2px 0px;-webkit-border-radius: 0px 2px 2px 0px;"><div style="border: 1px solid #5c82ab; border-top-color: #7e9cbc; background-color: #6D8DB1; color: #fff; text-shadow: 0px 1px #45688E; height: 15px; padding: 2px 6px 0px 4px;line-height: 13px;">&#1050;&#1086;&#1085;&#1090;&#1072;&#1082;&#1090;&#1077;</div></div></td>' +
      '</tr></table>'
    );
    el.innerHTML = html;
    el.style.width = el.childNodes[0].offsetWidth + 'px';
  },
  _change: function(state, index) {
    var row = document.getElementById('openapi_UI_' + index).rows[0];
    var elems = [row.cells[0].firstChild.firstChild, row.cells[2].firstChild.firstChild];
    for (var i = 0; i < 2; ++i) {
       var elem = elems[i];
      if (state === 0) {
        elem.style.backgroundColor = '#6D8DB1';
        elem.style.borderTopColor = '#7E9CBC';
        elem.style.borderLeftColor = elem.style.borderRightColor = elem.style.borderBottomColor = '#5C82AB';
      } else if (state == 1) {
        elem.style.backgroundColor = '#7693B6';
        elem.style.borderTopColor = '#88A4C4';
        elem.style.borderLeftColor = elem.style.borderRightColor = elem.style.borderBottomColor = '#6088B4';
      } else if (state == 2) {
        elem.style.backgroundColor = '#6688AD';
        elem.style.borderBottomColor = '#7495B8';
        elem.style.borderLeftColor = elem.style.borderRightColor = elem.style.borderTopColor = '#51779F';
      }
    }
    if (state === 0 || state == 2) {
      row.cells[2].firstChild.style.backgroundPosition = '0px -42px';
    } else if (state == 1) {
      row.cells[2].firstChild.style.backgroundPosition = '0px -63px';
    }
  }
};
}

if (!VK.XDM) {
VK.XDM = {
  remote: null,
  init: function() {
    if (this.remote) return false;
    var url = VK._domain.api + VK._path.proxy;
    this.remote = new fastXDM.Server({
      onInit: function() {
        VK.xdReady = true;
        VK.Observer.publish('xdm.init');
      }
    });

    this.remote.append(document.getElementById(VK._rootId), {
      src: url
    });
  },
  xdHandler: function(code) {
    try {
      eval('VK.' + code);
    } catch(e) {}
  }
};
}

if (!VK.Observer) {
VK.Observer = {
  _subscribers: function() {
    if (!this._subscribersMap) {
      this._subscribersMap = {};
    }
    return this._subscribersMap;
  },
  publish: function(eventName) {
    var
      args = Array.prototype.slice.call(arguments),
      eventName = args.shift(),
      subscribers = this._subscribers()[eventName],
      i, j;

    if (!subscribers) return;

    for (i = 0, j = subscribers.length; i < j; i++) {
      if (subscribers[i] != null) {
        subscribers[i].apply(this, args);
      }
    }
  },
  subscribe: function(eventName, handler) {
    var
      subscribers = this._subscribers();

    if (typeof handler != 'function') return false;

    if (!subscribers[eventName]) {
      subscribers[eventName] = [handler];
    } else {
      subscribers[eventName].push(handler);
    }
  },
  unsubscribe: function(eventName, handler) {
    var
      subscribers = this._subscribers()[eventName],
      i, j;

    if (!subscribers) return false;
    if (typeof handler == 'function') {
      for (i = 0, j = subscribers.length; i < j; i++) {
        if (subscribers[i] == handler) {
          subscribers[i] = null;
        }
      }
    } else {
      delete this._subscribers()[eventName];
    }
  }
};
}

if (!VK.Widgets) {
  VK.Widgets = {};

  VK.Widgets.count = 0;
  VK.Widgets.RPC = {};

  VK.Widgets.loading = function(obj, enabled) {
    obj.style.background = enabled ? 'url("' + VK._protocol + '//vk.com/images/upload.gif") center center no-repeat transparent' : 'none';
  };

  VK.Widgets.Comments = function(objId, options, page) {
    var pData = VK.Util.getPageData();
    if (!VK._apiId) throw Error('VK not initialized. Please use VK.init');
    options = options || {};
    var params = {
      limit: options.limit || 10,
      height: options.height || 0,
      mini: options.mini === undefined ? 'auto' : options.mini,
      norealtime: options.norealtime ? 1 : 0
    }, mouseup = function() {
      rpc.callMethod('mouseUp');
      return false;
    }, move = function(event) {
      rpc.callMethod('mouseMove', {screenY: event.screenY});
    }, iframe, rpc;

    if (options.browse) { // browse all comments
      params.browse = 1;
      params.replies = options.replies || 0;
    } else { // page
      var url = options.pageUrl || pData.url;
      if (url.substr(0, 1) == '/') {
        url = (location.protocol + '//' + location.host) + url;
      }
      VK.extend(params, {
        page: page || 0,
        status_publish: options.autoPublish === undefined ? 1 : options.autoPublish,
        attach: options.attach === undefined ? '*' : (options.attach ? options.attach : ''),
        url: url,
        title: options.pageTitle || pData.title,
        description: options.pageDescription || pData.description,
        image: options.pageImage || pData.image
      });
    }
    if (options.onChange) { // DEPRECATED
      VK.Observer.subscribe('widgets.comments.new_comment', options.onChange);
      VK.Observer.subscribe('widgets.comments.delete_comment', options.onChange);
    }

    return VK.Widgets._constructor('widget_comments.php', objId, options, params, {
      showBox: function(url, props) {
        var box = VK.Util.Box((options.base_domain || VK._protocol + '//vk.com') + '/' + url, [], {
          proxy: function() {
            rpc.callMethod.apply(rpc, arguments);
          }
        });
        box.show();
      },
      startDrag: function() {
        cursorBack = window.document.body.style.cursor;
        window.document.body.style.cursor = 'pointer';
        VK.Util.addEvent('mousemove', move);
        VK.Util.addEvent('mouseup', mouseup);
      },
      stopDrag: function() {
        window.document.body.style.cursor = cursorBack;
        VK.Util.removeEvent('mousemove', move);
        VK.Util.removeEvent('mouseup', mouseup);
      }
    }, {
      startHeight: 133,
      minWidth: 300,
      width: '100%'
    }, function(o, i, r) {iframe = i; rpc = r;});
  };

  VK.Widgets.CommentsBrowse = function(objId, options) {
    options = options || {};
    options.browse = 1;
    return VK.Widgets.Comments(objId, options);
  };

  VK.Widgets.Recommended = function(objId, options) {
    var pData = VK.Util.getPageData();
    if (!VK._apiId) throw Error('VK not initialized. Please use VK.init');
    options = options || {};
    var params = {
      limit: options.limit || 5,
      max: options.max || 0,
      sort: options.sort || 'friend_likes',
      verb: options.verb || 0,
      period: options.period || 'week',
      target: options.target || 'parent'
    };
    return VK.Widgets._constructor('widget_recommended.php', objId, options, params, {}, {
      startHeight: (90 + params.limit * 30),
      minWidth: 150,
      width: '100%'
    });
  };

  VK.Widgets.Post = function(objId, ownerId, postId, hash, options) {
    options = options || {};
    var params = {
      owner_id: ownerId,
      post_id: postId,
      hash: hash || '',
      width: options.width || 500
    }, iframe, rpc, cursorBack;
    return VK.Widgets._constructor('widget_post.php', objId, options, params, {
      showBox: function(url, props) {
        var box = VK.Util.Box((options.base_domain || VK._protocol + '//vk.com') + '/' + url, [], {
          proxy: function() {
            rpc.callMethod.apply(rpc, arguments);
          }
        });
        box.show();
      },
      startDrag: function() {
        cursorBack = window.document.body.style.cursor;
        window.document.body.style.cursor = 'pointer';
      },
      stopDrag: function() {
        window.document.body.style.cursor = cursorBack;
      }
    }, {
      startHeight: 90,
      minWidth: 250,
      width: '100%'
    }, function(o, i, r) {iframe = i; rpc = r;});
  };

  VK.Widgets.Like = function(objId, options, page) {
    var pData = VK.Util.getPageData();
    if (!VK._apiId) throw Error('VK not initialized. Please use VK.init');
    options = VK.extend(options || {}, {allowTransparency: true});
    if (options.type == 'button' || options.type == 'vertical' || options.type == 'mini') delete options.width;
    var
      type = (options.type == 'full' || options.type == 'button' || options.type == 'vertical' || options.type == 'mini') ? options.type : 'full',
      width = type == 'full' ? Math.max(200, options.width || 350) : (type == 'button' ? 180 : (type == 'mini' ? 100 : 41)),
      btnHeight = parseInt(options.height, 10) || 22,
      height = type == 'vertical' ? (2 * btnHeight + 7) : (type == 'full' ? btnHeight + 1 : btnHeight),
      params = {
        page: page || 0,
        url: options.pageUrl || pData.url,
        type: type,
        verb: options.verb == 1 ? 1 : 0,
        color: options.color || '',
        title: options.pageTitle || pData.title,
        description: options.pageDescription || pData.description,
        image: options.pageImage || pData.image,
        text: (options.text || '').substr(0, 140),
        h: btnHeight
      },
      ttHere = options.ttHere || false,
      isOver = false,
      obj, buttonIfr, buttonRpc, tooltipIfr, tooltipRpc, checkTO, statsBox;

    function showTooltip(force) {
      if ((!isOver && !force) || !tooltipRpc) return;
      if (!tooltipIfr || !tooltipRpc || tooltipIfr.style.display != 'none' && tooltipIfr.getAttribute('vkhidden') != 'yes') return;
      var scrollTop = options.getScrollTop ? options.getScrollTop() : (document.body.scrollTop || document.documentElement.scrollTop || 0);
      var objPos = VK.Util.getXY(obj, options.fixed);
      var startY = ttHere ? 0 : objPos[1];
      if (scrollTop > objPos[1] - 120 && options.tooltipPos != 'top' || type == 'vertical' || options.tooltipPos == 'bottom') {
        tooltipIfr.style.top = (startY + height + 2) + 'px';
        tooltipRpc.callMethod('show', false);
      } else {
        tooltipIfr.style.top = (startY - 125) + 'px';
        tooltipRpc.callMethod('show', true);
      }
      VK.Util.ss(tooltipIfr, {left: ((ttHere ? 0 : objPos[0]) - (type == 'vertical' || type == 'mini' ? 36 : 2)) + 'px', display: 'block', opacity: 1, filter: 'none'});
      tooltipIfr.setAttribute('vkhidden', 'no');
      isOver = true;
    }

    function hideTooltip(force) {
      if ((isOver && !force) || !tooltipRpc) return;
      tooltipRpc.callMethod('hide');
      buttonRpc.callMethod('hide');
      setTimeout(function() {
        tooltipIfr.style.display = 'none'
      }, 400);
    }

    function handleStatsBox(act) {
      hideTooltip(true);
      statsBox = VK.Util.Box(buttonIfr.src + '&act=a_stats_box&widget_width=620');
      statsBox.show();
    }

    return VK.Widgets._constructor('widget_like.php', objId, options, params, {
      initTooltip: function(counter) {
        tooltipRpc = new fastXDM.Server({
          onInit: counter ? function() {showTooltip(true)} : function() {},
          proxy: function() {
             buttonRpc.callMethod.apply(buttonRpc, arguments);
          },
          showBox: function(url, props) {
            var box = VK.Util.Box((options.base_domain || VK._protocol + '//vk.com/') + url, [props.width, props.height], {
              proxy: function() {
                tooltipRpc.callMethod.apply(tooltipRpc, arguments);
              }
            });
            box.show();
          },
          statsBox: handleStatsBox
        }, false, {safe: true});
        tooltipIfr = tooltipRpc.append(ttHere ? obj : document.body, {
          src: buttonIfr.src + '&act=a_like_tooltip',
          scrolling: 'no',
          allowTransparency: true,
          id: buttonIfr.id + '_tt',
          style: {position: 'absolute', padding: 0, display: 'block', opacity: 0.01, filter: 'alpha(opacity=1)', border: '0', width: '238px', height: '124px', zIndex: 5000, overflow: 'hidden'}
        });
        tooltipIfr.setAttribute('vkhidden', 'yes');

        obj.onmouseover = tooltipIfr.onmouseover = function() {
          clearTimeout(checkTO);
          isOver = true;
        };
        obj.onmouseout = tooltipIfr.onmouseout = function() {
          clearTimeout(checkTO);
          isOver = false;
          checkTO = setTimeout(function() {hideTooltip(); }, 200);
        };
      },
      statsBox: handleStatsBox,
      showTooltip: showTooltip,
      hideTooltip: hideTooltip,
      showBox: function(url, props) {
        var box = VK.Util.Box((options.base_domain || VK._protocol + '//vk.com/') + url, [], {
          proxy: function() {
            buttonRpc.callMethod.apply(buttonRpc, arguments);
          }
        });
        box.show();
      },
      proxy: function() {if (tooltipRpc) tooltipRpc.callMethod.apply(tooltipRpc, arguments);}
    }, {
      startHeight: height,
      minWidth: width
    }, function(o, i, r) {
      buttonRpc = r;
      VK.Util.ss(obj = o, {height: height + 'px', width: width + 'px', position: 'relative', clear: 'both'});
      VK.Util.ss(buttonIfr = i, {height: height + 'px', width: width + 'px', overflow: 'hidden', zIndex: 150});
    });
  };

  VK.Widgets.Poll = function(objId, options, pollId) {
    var pData = VK.Util.getPageData();
    // if (!VK._apiId) throw Error('VK not initialized. Please use VK.init');
    if (!pollId) throw Error('No poll id passed');
    options = options || {};
    var params = {
      poll_id: pollId,
      url: options.pageUrl || pData.url || location.href,
      title: options.pageTitle || pData.title,
      description: options.pageDescription || pData.description
    };
    return VK.Widgets._constructor('widget_poll.php', objId, options, params, {}, {
      startHeight: 133,
      minWidth: 300,
      width: '100%'
    });
  };

  VK.Widgets.PagePoll = function(objId, options, page) {
    var pData = VK.Util.getPageData();
    // if (!VK._apiId) throw Error('VK not initialized. Please use VK.init');
    options = options || {};
    var params = {
      page: page || 0,
      norealtime: options.norealtime ? 1 : 0,
      poll_id: options.pollId || '',
      url: options.pageUrl || pData.url || location.href,
      title: options.pageTitle || pData.title,
      description: options.pageDescription || pData.description
    };
    return VK.Widgets._constructor('al_widget_poll.php', objId, options, params, {}, {
      startHeight: 133,
      minWidth: 300,
      width: '100%'
    });
  };

  VK.Widgets.Community = VK.Widgets.Group = function(objId, options, gid) {
    gid = parseInt(gid, 10);
    var RPC;
    if (!gid) {
      throw Error('No group_id passed');
    }
    options.mode = parseInt(options.mode, 10).toString();
    var params = {
      gid: gid,
      mode: (options.mode) ? options.mode : '0'
    };
    if (!options.width) options.width = 200;
    if (options.wall) params.wall = options.wall;
    params.color1 = options.color1 || '';
    params.color2 = options.color2 || '';
    params.color3 = options.color3 || '';
    params.class_name = options.class_name || '';
    if (options.no_head) params.no_head = 1;
    if (!options.height) options.height = 290;
    if (options.wide) {
      params.wide = 1;
      if (options.width < 300) {
        options.width = 300;
      }
    }

    var cursorBack;

    function mouseup() {
      RPC.callMethod('mouseUp');
      return false;
    }

    function move(event) {
      RPC.callMethod('mouseMove', {screenY: event.screenY});
      return false;
    }

    return VK.Widgets._constructor('widget_community.php', objId, options, params, {
      showBox: function(url, props) {
        var box = VK.Util.Box((options.base_domain || VK._protocol + '//vk.com/') + url, [], {
          proxy: function() {
            rpc.callMethod.apply(rpc, arguments);
          }
        });
        box.show();
      },
      startDrag: function() {
        cursorBack = window.document.body.style.cursor;
        window.document.body.style.cursor = 'pointer';
        VK.Util.addEvent('mousemove', move);
        VK.Util.addEvent('mouseup', mouseup);
      },
      stopDrag: function() {
        window.document.body.style.cursor = cursorBack;
        VK.Util.removeEvent('mousemove', move);
        VK.Util.removeEvent('mouseup', mouseup);
      },
      auth: function() {
        VK.Auth.login(null, 1);
      }
    }, {
      minWidth: 120,
      width: '200',
      height: '290',
      startHeight: 200
    }, function(o, i, r) {
      RPC = r;
    });
  };

  VK.Widgets.Auth = function(objId, options) {
    var pData = VK.Util.getPageData();
    if (!VK._apiId) throw Error('VK not initialized. Please use VK.init');
    if (!options.width) {
      options.width = 200;
    }
    if (options.type) {
      type = 1;
    } else {
      type = 0;
    }
    return VK.Widgets._constructor('widget_auth.php', objId, options, {}, {makeAuth: function(data) {
      if (data.session) {
        VK.Auth._loadState = 'loaded';
        VK.Auth.setSession(data.session, 'connected');
        VK.Observer.publish('auth.loginStatus', {session: data.session, status: 'connected'});
        VK.Observer.unsubscribe('auth.loginStatus');
      }
      if (options.onAuth) {
        options.onAuth(data);
      } else {
        if (options.authUrl) {
          var href = options.authUrl;
        } else {
          var href = window.location.href;
        }
        if (href.indexOf('?') == -1) {
          href+='?';
        } else {
          href+='&';
        }
        var vars = [];

        for (var i in data) {
          if (i != 'session') vars.push(i+'='+decodeURIComponent(data[i]).replace(/&/g, '%26').replace(/\?/, '%3F'));
        }
        window.location.href = href + vars.join('&');
      }
    }}, {startHeight: 80});
  };

  VK.Widgets.Subscribe = function(objId, options, oid) {
    oid = parseInt(oid, 10);
    var RPC;
    if (!oid) {
      throw Error('No owner_id passed');
    }
    var params = {
      oid: oid
    };
    if (options.mode) {
      params.mode = options.mode;
    }
    if (options.soft) {
      params.soft = options.soft;
    }

    return VK.Widgets._constructor('widget_subscribe.php', objId, options, params, {
      showBox: function(url, props) {
        var box = VK.Util.Box((options.base_domain || VK._protocol + '//vk.com/') + url, [], {
          proxy: function() {
            rpc.callMethod.apply(rpc, arguments);
          }
        });
        box.show();
      },
      auth: function() {
        VK.Auth.login(null, 1);
      }
    }, {
      minWidth: 220,
      startHeight: 22,
      height: options.height || 22
    }, function(o, i, r) {
      RPC = r;
    });
  };

  VK.Widgets.Ads = function(objId, options, paramsExtra) {
    options = options || {};
    paramsExtra = paramsExtra || {};
    var params = {};
    var defaults = {};
    var funcs = {};
    var obj = document.getElementById(objId);
    var iframe;
    var rpc;

    var adsParams = {};
    var adsParamsLocal = {};
    var adsParamsDefault = {};
    for (var key in paramsExtra) {
      var keyFix = (inArray(key, ['hash']) ? key : 'ads_' + key);
      adsParams[keyFix] = paramsExtra[key];
    }

    if (obj && obj.getBoundingClientRect) {
      obj.style.width  = '100%';
      obj.style.height = '100%';
      var rect = obj.getBoundingClientRect();
      obj.style.width  = '';
      obj.style.height = '';
      adsParams.ads_ad_unit_width_auto  = Math.floor(rect.right - rect.left);
      adsParams.ads_ad_unit_height_auto = Math.floor(rect.bottom - rect.top);
    }

    adsParamsDefault.ads_ad_unit_width  = 100;
    adsParamsDefault.ads_ad_unit_height = 100;

    adsParamsLocal.ads_ad_unit_width  = (parseInt(adsParams.ads_ad_unit_width)  || adsParams.ads_ad_unit_width === 'auto'  && adsParams.ads_ad_unit_width_auto  || adsParamsDefault.ads_ad_unit_width);
    adsParamsLocal.ads_ad_unit_height = (parseInt(adsParams.ads_ad_unit_height) || adsParams.ads_ad_unit_height === 'auto' && adsParams.ads_ad_unit_height_auto || adsParamsDefault.ads_ad_unit_height);
    if (adsParams.ads_handler) {
      adsParamsLocal.ads_handler = adsParams.ads_handler;
    }
    if (adsParams.ads_handler_empty_html) {
      adsParamsLocal.ads_handler_empty_html = adsParams.ads_handler_empty_html;
    }

    delete adsParams.ads_handler;
    delete adsParams.ads_handler_empty_html;

    params.act = 'ads_web';
    params.url = location.href;
    VK.extend(params, adsParams);

    options.noDefaultParams   = true;
    options.width             = adsParamsLocal.ads_ad_unit_width;
    options.allowTransparency = true;
    defaults.startHeight = adsParamsLocal.ads_ad_unit_height;
    defaults.minWidth    = adsParamsLocal.ads_ad_unit_width;
    funcs.adsOnInitLoader = adsOnInitLoader;
    funcs.adsOnInit       = adsOnInit;

    return VK.Widgets._constructor('ads_rotate.php', objId, options, params, funcs, defaults, onDone);

    function adsOnInitLoader(adsScriptVersion) {
      VK.Widgets.loading(obj, true);
      adsAttachScript(adsScriptVersion);
    }
    function adsOnInit(errorCode, adsParamsExport) {
      VK.Widgets.loading(obj, false);
      adsProcessParams(adsParamsExport);
      if (options.onAdsReady) options.onAdsReady.apply(options.onAdsReady, Array.prototype.slice.call(arguments));
      adsProcessHandler(errorCode);
    }
    function adsAttachScript(adsScriptVersion) {
      if (!('vk__adsLight' in window)) {
        window.vk__adsLight = false;
        adsScriptVersion = parseInt(adsScriptVersion);
        var attachScriptFunc = (VK.Api && VK.Api.attachScript || VK.addScript);
        var base_domain = (options.base_domain || VK._protocol + '//vk.com');
        attachScriptFunc(base_domain + '/js/al/aes_light.js?' + adsScriptVersion);
      } else if (window.vk__adsLight && vk__adsLight.userHandlers && vk__adsLight.userHandlers.onInit) {
        vk__adsLight.userHandlers.onInit(false); // false - do not publish initial onInit
      }
    }
    function adsProcessParams(adsParamsExport) {
      if (!adsParamsExport) {
        return;
      }
      for (var paramName in adsParamsExport) {
        var paramValue = adsParamsExport[paramName];
        if (paramName === 'ads_ad_unit_width' || paramName === 'ads_ad_unit_height') {
          if (!(paramName in adsParams)) {
            adsParamsLocal[paramName] = (parseInt(paramValue) || paramValue === 'auto' && adsParams[paramName + '_auto'] || adsParamsDefault[paramName]);
          }
        } else {
          if (!(paramName in adsParamsLocal)) {
            adsParamsLocal[paramName] = paramValue;
          }
        }
      }
    }
    function adsProcessHandler(errorCode) {
      var handlerResult = adsEvalHandler(adsParamsLocal.ads_handler, errorCode);
      if (errorCode <= 0 && handlerResult !== true) {
        try { console.log('VK: ad_unit_id = ' + adsParams.ads_ad_unit_id, ', errorCode = ', errorCode); } catch (e) {}
        adsInsertHtmlHandler(adsParamsLocal.ads_handler_empty_html, adsParamsLocal.ads_ad_unit_width, adsParamsLocal.ads_ad_unit_height);
      }
    }
    function adsEvalHandler(handler) {
      var result = false;
      try {
        if (!handler) {
          return false;
        }
        var func = false;
        if (isFunction(handler)) {
          func = handler;
        } else if (isString(handler)) {
          var handlerFuncs = handler.split('.');
          func = window;
          for (var i = 0, len = handlerFuncs.length; i < len; i++) {
            func = func[handlerFuncs[i]];
            if (!func) {
              break;
            }
          }
          if (!func) {
            if (handler.substr(0, 8) === 'function') {
              handler = 'return ' + handler + ';';
            }
            var handlerResult = (new Function(handler))();
            if (isFunction(handlerResult)) {
              func = handlerResult;
            } else {
              result = handlerResult;
            }
          }
        }
        if (func) {
          var args = Array.prototype.slice.call(arguments, 1);
          result = func.apply(func, args);
        }
      } catch (e) {
        try {
          console.error(e);
        } catch (e2) {}
      }

      return result;

      function isFunction(obj) {
        return Object.prototype.toString.call(obj) === '[object Function]';
      }
      function isString(obj) {
        return Object.prototype.toString.call(obj) === '[object String]';
      }
    }
    function adsInsertHtmlHandler(handlerHtml, width, height) {
      if (!handlerHtml) {
        return;
      }
      if (!obj) {
        return;
      }

      width  = (width  ? width  + 'px' : '');
      height = (height ? height + 'px' : '');

      var iframeHandlerHtml = '<html><head></head><body style="padding: 0; margin: 0;"><div>' + handlerHtml + '</div></body></html>';

      var iframeHandler = document.createElement('iframe');
      iframeHandler.onload            = fixIframeHeight;
      iframeHandler.id                = (iframe ? iframe.id : ('vkwidget-' + Math.round(Math.random() * 1000000))) + '_ads_html_handler';
      iframeHandler.src               = 'about:blank';
      iframeHandler.width             = '100%';
      iframeHandler.height            = '100%';
      iframeHandler.scrolling         = 'no';
      iframeHandler.frameBorder       = '0';
      iframeHandler.allowTransparency = true;
      iframeHandler.style.overflow    = 'hidden';
      iframeHandler.style.width       = width;
      iframeHandler.style.height      = height;

      obj.style.width                 = width;
      obj.style.height                = height;

      obj.appendChild(iframeHandler);

      iframeHandler.contentWindow.vk_ads_html_handler = iframeHandlerHtml;
      iframeHandler.src = 'javascript:window["vk_ads_html_handler"]';

      function fixIframeHeight() {
        if (height) {
          return;
        }
        try {
          var rect = iframeHandler.contentWindow.document.body.firstChild.getBoundingClientRect();
          var heightFix = Math.ceil(rect.bottom - rect.top);
          if (heightFix) {
            iframeHandler.style.height = heightFix;
            obj.style.height           = heightFix;
          }
        } catch (e) {}
      }
    }
    function indexOf(arr, value, from) {
      for (var i = from || 0, l = (arr || []).length; i < l; i++) {
        if (arr[i] == value) return i;
      }
      return -1;
    }
    function inArray(value, arr) {
      return indexOf(arr, value) != -1;
    }
    function onDone(o, i, r) {
      obj = o;
      iframe = i;
      rpc = r;
    }
  };

  VK.Widgets._constructor = function(widgetUrl, objId, options, params, funcs, defaults, onDone, widgetId, iter) {
    var obj = document.getElementById(objId);
    widgetId = widgetId || (++VK.Widgets.count);

    if (!obj) {
      iter = iter || 0;
      if (iter > 10) {
        throw Error('VK.Widgets: object #' + objId + ' not found.');
      }
      setTimeout(function() {
        VK.Widgets._constructor(widgetUrl, objId, options, params, funcs, defaults, onDone, widgetId, iter + 1);
      }, 500);
      return widgetId;
    }

    var ifr, base_domain, width, url, urlQueryString, encodedParam, rpc, iframe, i;
    options = options || {};
    defaults = defaults || {};
    funcs = funcs || {};

    base_domain = options.base_domain || VK._protocol + '//vk.com';
    width = (options.width == 'auto') ? obj.clientWidth || '100%' : parseInt(options.width, 10);

    if (options.height) {
      params.height = options.height;
      obj.style.height = options.height + 'px';
    } else {
      obj.style.height = (defaults.startHeight || 200) + 'px';
    }

    width = width ? (Math.max(defaults.minWidth || 200, Math.min(10000, width)) + 'px') : '100%';

    if (!params.url) {
      params.url = options.pageUrl || location.href.replace(/#.*$/, '');
    }
    url = base_domain + '/' + widgetUrl;
    urlQueryString = '';
    if (!options.noDefaultParams) {
      urlQueryString += '&app=' + (VK._apiId || '0') + '&width=' + width
    }
    urlQueryString += '&_ver=' + VK.version
    if (VK._iframeAppWidget) {
      params.iframe_app = 1;
    }
    for (i in params) {
      if (i == 'title' && params[i].length > 80) params[i] = params[i].substr(0, 80)+'...';
      if (i == 'description' && params[i].length > 160) params[i] = params[i].substr(0, 160)+'...';
      if (typeof(params[i]) == 'number') {
        encodedParam = params[i];
      } else {
        try {
          encodedParam = encodeURIComponent(params[i]);
        } catch (e) {
          encodedParam = '';
        }
      }
      urlQueryString += '&' + i + '=' + encodedParam;
    }
    urlQueryString += '&' + (+new Date()).toString(16);
    url += '?' + urlQueryString.substr(1);

    obj.style.width = width;
    VK.Widgets.loading(obj, true);

    funcs.publish = function() {
      var args = Array.prototype.slice.call(arguments);
      args.push(widgetId);
      VK.Observer.publish.apply(VK.Observer, args);
    };
    funcs.onInit = function() {
      VK.Widgets.loading(obj, false);
      if (funcs.onReady) funcs.onReady();
      if (options.onReady) options.onReady();
    }
    funcs.resize = function(e, cb) {
      obj.style.height = e + 'px';
      var el = document.getElementById('vkwidget' + widgetId);
      if (el) {
        el.style.height = e + 'px';
      }
    }
    funcs.resizeWidget = function(newWidth, newHeight) {
      newWidth  = parseInt(newWidth);
      newHeight = parseInt(newHeight);
      var widgetElem = document.getElementById('vkwidget' + widgetId);
      if (isFinite(newWidth)) {
        obj.style.width = newWidth + 'px';
        if (widgetElem) {
          widgetElem.style.width = newWidth + 'px';
        }
      }
      if (isFinite(newHeight)) {
        obj.style.height = newHeight + 'px';
        if (widgetElem) {
          widgetElem.style.height = newHeight + 'px';
        }
      }
      if (options.onResizeWidget) options.onResizeWidget();
    }
    funcs.updateVersion = function(ver) {
      if (ver > 1) {
        VK.Api.attachScript('//vk.com/js/api/openapi_update.js?'+parseInt(ver));
      }
    }
    rpc = VK.Widgets.RPC[widgetId] = new fastXDM.Server(funcs, function(origin) {
      if (!origin) return true;
      origin = origin.toLowerCase();
      return (origin.match(/(\.|\/)vk\.com($|\/|\?)/));
    }, {safe: true});
    iframe = VK.Widgets.RPC[widgetId].append(obj, {
      src: url,
      width: (width.indexOf('%') != -1) ? width : (parseInt(width) || width),
      height: defaults.startHeight || '100%',
      scrolling: 'no',
      id: 'vkwidget' + widgetId,
      allowTransparency: options.allowTransparency || false,
      style: {
        overflow: 'hidden'
      }
    });
    onDone && setTimeout(function() {onDone(obj, iframe || obj.firstChild, rpc);}, 10);
    return widgetId;
  };
}

if (!VK.Util) {
VK.Util = {
  getPageData: function() {
    if (!VK._pData) {
      var metas = document.getElementsByTagName('meta'), pData = {}, keys = ['description', 'title', 'url', 'image', 'app_id'], metaName;
      for (var i in metas) {
        if (!metas[i].getAttribute) continue;
        if (metas[i].getAttribute && ((metaName = metas[i].getAttribute('name')) || (metaName = metas[i].getAttribute('property')))) {
          for (var j in keys) {
            if (metaName == keys[j] || metaName == 'og:'+keys[j] || metaName == 'vk:'+keys[j]) {
              pData[keys[j]] = metas[i].content;
            }
          }
        }
      }
      if (pData.app_id && !VK._apiId) {
        VK._apiId = pData.app_id;
      }
      pData.title = pData.title || document.title || '';
      pData.description = pData.description || '';
      pData.image = pData.image || '';
      if (!pData.url && VK._iframeAppWidget && VK._apiId) {
        pData.url = '/app' + VK._apiId;
        if (VK._browserHash) {
          pData.url += VK._browserHash
        }
      }
      var loc = location.href.replace(/#.*$/, '');
      if (!pData.url || !pData.url.indexOf(loc)) {
        pData.url = loc;
      }
      VK._pData = pData;
    }
    return VK._pData;
  },
  getStyle: function(elem, name) {
    var ret, defaultView = document.defaultView || window;
    if (defaultView.getComputedStyle) {
      name = name.replace(/([A-Z])/g, '-$1').toLowerCase();
      var computedStyle = defaultView.getComputedStyle(elem, null);
      if (computedStyle) {
        ret = computedStyle.getPropertyValue(name);
      }
    } else if (elem.currentStyle) {
      var camelCase = name.replace(/\-(\w)/g, function(all, letter){
        return letter.toUpperCase();
      });
      ret = elem.currentStyle[name] || elem.currentStyle[camelCase];
    }

    return ret;
  },
  getXY: function(obj, fixed) {
    if (!obj || obj === undefined) return;

    var left = 0, top = 0;
    if (obj.getBoundingClientRect !== undefined) {
      var rect = obj.getBoundingClientRect();
      left = rect.left;
      top = rect.top;
      fixed = true;
    } else if (obj.offsetParent) {
      do {
        left += obj.offsetLeft;
        top += obj.offsetTop;
        if (fixed) {
          left -= obj.scrollLeft;
          top -= obj.scrollTop;
        }
      } while (obj = obj.offsetParent);
    }
    if (fixed) {
      top += window.pageYOffset || window.scrollNode && scrollNode.scrollTop || document.documentElement.scrollTop;
      left += window.pageXOffset || window.scrollNode && scrollNode.scrollLeft || document.documentElement.scrollLeft;
    }

    return [left, top];
  },
  Box: function(src, sizes, fnc, options) {
    fnc = fnc || {};
    var overflowB = document.body.style.overflow;
    var loader = document.createElement('DIV');
    var rpc = new fastXDM.Server(VK.extend(fnc, {
      onInit: function() {
        iframe.style.background = 'transparent';
        iframe.style.visibility = 'visible';
        document.body.style.overflow = 'hidden';
        document.body.removeChild(loader);
      },
      hide: function() {
        iframe.style.display = 'none';
      },
      tempHide: function() {
        iframe.style.left = '-10000px';
        iframe.style.top = '-10000px';
        iframe.style.width = '10px';
        iframe.style.height = '10px';
        document.body.style.overflow = overflowB;
      },
      destroy: function() {
        try {
          iframe.src = 'about: blank;';
        } catch (e) {}
        iframe.parentNode.removeChild(iframe);
        document.body.style.overflow = overflowB;
      },
      resize: function(w, h) {
      }
    }, true), false, {safe: true}),
    iframe = rpc.append(document.body, {
      src: src.replace(/&amp;/g, '&'),
      scrolling: 'no',
      allowTransparency: true,
      style: {position: 'fixed', left: 0, top: 0, zIndex: 1002, background: VK._protocol + '//vk.com/images/upload.gif center center no-repeat transparent', padding: '0', border: '0', width: '100%', height: '100%', overflow: 'hidden', visibility: 'hidden'}
    });
    loader.innerHTML = '<div style="position: fixed;left: 50%;top: 50%;margin: 0px auto 0px -60px;z-index: 1002;width: 100px;"><div style="background: url(//vk.com/images/upload_inv_mono'+(window.devicePixelRatio >= 2 ? '_2x' : '')+'.gif) no-repeat 50% 50%;background-size: 64px 16px;height: 50px;position: absolute;width: 100%;z-index: 100;"></div><div style="background-color: #000;opacity: 0.7;filter: alpha(opacity=70);height: 50px;-webkit-border-radius: 5px;-khtml-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;-webkit-box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.35);-moz-box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.35);box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.35);"></div></div>';
    document.body.insertBefore(loader, document.body.firstChild);
    return {
      show: function(scrollTop, height) {
        iframe.style.display = 'block';
        document.body.style.overflow = 'hidden';
      },
      hide: function() {
        iframe.style.display = 'none';
        document.body.style.overflow = overflowB;
      },
      iframe: iframe,
      rpc: rpc
    }
  },
  addEvent: function(type, func) {
    if (window.document.addEventListener) {
      window.document.addEventListener(type, func, false);
    } else if (window.document.attachEvent) {
      window.document.attachEvent('on'+type, func);
    }
  },
  removeEvent: function(type, func) {
    if (window.document.removeEventListener) {
      window.document.removeEventListener(type, func, false);
    } else if (window.document.detachEvent) {
      window.document.detachEvent('on'+type, func);
    }
  },
  ss: function(el, styles) {VK.extend(el.style, styles, true);}
};
}

// Init asynchronous library loading
window.vkAsyncInit && setTimeout(vkAsyncInit, 0);

if (window.vkAsyncInitCallbacks && vkAsyncInitCallbacks.length) {
  setTimeout(function() {
    var callback;
    while (callback = vkAsyncInitCallbacks.pop()) {
      try {
        callback();
      } catch(e) {
        try {
          console.error(e);
        } catch (e2) {}
      }
    }
  }, 0);
}
try{if (window.stManager) stManager.done('api/openapi.js');}catch(e){}
;
/**
 * @file
 * JavaScript for the Disqus Drupal module.
 */

// The Disqus global variables.
var disqus_shortname = '';
var disqus_url = '';
var disqus_title = '';
var disqus_identifier = '';
var disqus_developer = 0;
var disqus_def_name = '';
var disqus_def_email = '';
var disqus_config;

(function ($) {

/**
 * Drupal Disqus behavior.
 */
Drupal.behaviors.disqus = {
  attach: function (context, settings) {
    $('body').once('disqus', function() {
      // Load the Disqus comments.
      if (settings.disqus || false) {
        // Setup the global JavaScript variables for Disqus.
        disqus_shortname = settings.disqus.domain;
        disqus_url = settings.disqus.url;
        disqus_title = settings.disqus.title;
        disqus_identifier = settings.disqus.identifier;
        disqus_developer = settings.disqus.developer || 0;
        disqus_def_name = settings.disqus.name || '';
        disqus_def_email = settings.disqus.email || '';

        // Language and SSO settings are passed in through disqus_config().
        disqus_config = function() {
          if (settings.disqus.language || false) {
            this.language = settings.disqus.language;
          }
          if (settings.disqus.remote_auth_s3 || false) {
            this.page.remote_auth_s3 = settings.disqus.remote_auth_s3;
          }
          if (settings.disqus.api_key || false) {
            this.page.api_key = settings.disqus.api_key;
          }
          if (settings.disqus.sso || false) {
            this.sso = settings.disqus.sso;
          }
          if (settings.disqus.callbacks || false) {
            for (var key in settings.disqus.callbacks) {
              for (var i = 0; i < settings.disqus.callbacks[key].length; i++) {
                var callback = settings.disqus.callbacks[key][i].split('.');
                var fn = window;
                for (var j = 0; j < callback.length; j++) {
                  fn = fn[callback[j]];
                }
                if(typeof fn === 'function') {
                  this.callbacks[key].push(fn);
                }
              }
            }
          }
        };

        // Make the AJAX call to get the Disqus comments.
        jQuery.ajax({
          type: 'GET',
          url: '//' + disqus_shortname + '.disqus.com/embed.js',
          dataType: 'script',
          cache: false
        });
      }

      // Load the comment numbers JavaScript.
      if (settings.disqusComments || false) {
        disqus_shortname = settings.disqusComments;
        // Make the AJAX call to get the number of comments.
        jQuery.ajax({
          type: 'GET',
          url: '//' + disqus_shortname + '.disqus.com/count.js',
          dataType: 'script',
          cache: false
        });
      }
    });
  }
};

})(jQuery);
;
/*! Lazy Load 1.9.3 - MIT license - Copyright 2010-2013 Mika Tuupola */
!function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function g(){var b=0;i.each(function(){var c=a(this);if(!j.skip_invisible||c.is(":visible"))if(a.abovethetop(this,j)||a.leftofbegin(this,j));else if(a.belowthefold(this,j)||a.rightoffold(this,j)){if(++b>j.failure_limit)return!1}else c.trigger("appear"),b=0})}var h,i=this,j={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!0,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(j,f)),h=j.container===d||j.container===b?e:a(j.container),0===j.event.indexOf("scroll")&&h.bind(j.event,function(){return g()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,(c.attr("src")===d||c.attr("src")===!1)&&c.is("img")&&c.attr("src",j.placeholder),c.one("appear",function(){if(!this.loaded){if(j.appear){var d=i.length;j.appear.call(b,d,j)}a("<img />").bind("load",function(){var d=c.attr("data-"+j.data_attribute);c.hide(),c.is("img")?c.attr("src",d):c.css("background-image","url('"+d+"')"),c[j.effect](j.effect_speed),b.loaded=!0;var e=a.grep(i,function(a){return!a.loaded});if(i=a(e),j.load){var f=i.length;j.load.call(b,f,j)}}).attr("src",c.attr("data-"+j.data_attribute))}}),0!==j.event.indexOf("scroll")&&c.bind(j.event,function(){b.loaded||c.trigger("appear")})}),e.bind("resize",function(){g()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent&&b.originalEvent.persisted&&i.each(function(){a(this).trigger("appear")})}),a(c).ready(function(){g()}),this},a.belowthefold=function(c,f){var g;return g=f.container===d||f.container===b?(b.innerHeight?b.innerHeight:e.height())+e.scrollTop():a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return g=f.container===d||f.container===b?e.width()+e.scrollLeft():a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollTop():a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollLeft():a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!(a.rightoffold(b,c)||a.leftofbegin(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})}(jQuery,window,document);;
/*! jQuery UI - v1.11.0 - 2014-07-16
* http://jqueryui.com
* Includes: core.js, effect.js, effect-fade.js, effect-slide.js
* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */

(function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){function t(t,s){var a,n,o,r=t.nodeName.toLowerCase();return"area"===r?(a=t.parentNode,n=a.name,t.href&&n&&"map"===a.nodeName.toLowerCase()?(o=e("img[usemap=#"+n+"]")[0],!!o&&i(o)):!1):(/input|select|textarea|button|object/.test(r)?!t.disabled:"a"===r?t.href||s:s)&&i(t)}function i(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return"hidden"===e.css(this,"visibility")}).length}e.ui=e.ui||{},e.extend(e.ui,{version:"1.11.0",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({scrollParent:function(){var t=this.css("position"),i="absolute"===t,s=this.parents().filter(function(){var t=e(this);return i&&"static"===t.css("position")?!1:/(auto|scroll)/.test(t.css("overflow")+t.css("overflow-y")+t.css("overflow-x"))}).eq(0);return"fixed"!==t&&s.length?s:e(this[0].ownerDocument||document)},uniqueId:function(){var e=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++e)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return!!e.data(i,t)}}):function(t,i,s){return!!e.data(t,s[3])},focusable:function(i){return t(i,!isNaN(e.attr(i,"tabindex")))},tabbable:function(i){var s=e.attr(i,"tabindex"),a=isNaN(s);return(a||s>=0)&&t(i,!a)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(t,i){function s(t,i,s,n){return e.each(a,function(){i-=parseFloat(e.css(t,"padding"+this))||0,s&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),n&&(i-=parseFloat(e.css(t,"margin"+this))||0)}),i}var a="Width"===i?["Left","Right"]:["Top","Bottom"],n=i.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+i]=function(t){return void 0===t?o["inner"+i].call(this):this.each(function(){e(this).css(n,s(this,t)+"px")})},e.fn["outer"+i]=function(t,a){return"number"!=typeof t?o["outer"+i].call(this,t):this.each(function(){e(this).css(n,s(this,t,!0,a)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(i){return arguments.length?t.call(this,e.camelCase(i)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.fn.extend({focus:function(t){return function(i,s){return"number"==typeof i?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),s&&s.call(t)},i)}):t.apply(this,arguments)}}(e.fn.focus),disableSelection:function(){var e="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.bind(e+".ui-disableSelection",function(e){e.preventDefault()})}}(),enableSelection:function(){return this.unbind(".ui-disableSelection")},zIndex:function(t){if(void 0!==t)return this.css("zIndex",t);if(this.length)for(var i,s,a=e(this[0]);a.length&&a[0]!==document;){if(i=a.css("position"),("absolute"===i||"relative"===i||"fixed"===i)&&(s=parseInt(a.css("zIndex"),10),!isNaN(s)&&0!==s))return s;a=a.parent()}return 0}}),e.ui.plugin={add:function(t,i,s){var a,n=e.ui[t].prototype;for(a in s)n.plugins[a]=n.plugins[a]||[],n.plugins[a].push([i,s[a]])},call:function(e,t,i,s){var a,n=e.plugins[t];if(n&&(s||e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType))for(a=0;n.length>a;a++)e.options[n[a][0]]&&n[a][1].apply(e.element,i)}};var s="ui-effects-";e.effects={effect:{}},function(e,t){function i(e,t,i){var s=d[t.type]||{};return null==e?i||!t.def?null:t.def:(e=s.floor?~~e:parseFloat(e),isNaN(e)?t.def:s.mod?(e+s.mod)%s.mod:0>e?0:e>s.max?s.max:e)}function s(i){var s=l(),a=s._rgba=[];return i=i.toLowerCase(),f(h,function(e,n){var o,r=n.re.exec(i),h=r&&n.parse(r),l=n.space||"rgba";return h?(o=s[l](h),s[u[l].cache]=o[u[l].cache],a=s._rgba=o._rgba,!1):t}),a.length?("0,0,0,0"===a.join()&&e.extend(a,n.transparent),s):n[i]}function a(e,t,i){return i=(i+1)%1,1>6*i?e+6*(t-e)*i:1>2*i?t:2>3*i?e+6*(t-e)*(2/3-i):e}var n,o="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",r=/^([\-+])=\s*(\d+\.?\d*)/,h=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(e){return[e[1],e[2],e[3],e[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(e){return[2.55*e[1],2.55*e[2],2.55*e[3],e[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(e){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(e){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(e){return[e[1],e[2]/100,e[3]/100,e[4]]}}],l=e.Color=function(t,i,s,a){return new e.Color.fn.parse(t,i,s,a)},u={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},d={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},c=l.support={},p=e("<p>")[0],f=e.each;p.style.cssText="background-color:rgba(1,1,1,.5)",c.rgba=p.style.backgroundColor.indexOf("rgba")>-1,f(u,function(e,t){t.cache="_"+e,t.props.alpha={idx:3,type:"percent",def:1}}),l.fn=e.extend(l.prototype,{parse:function(a,o,r,h){if(a===t)return this._rgba=[null,null,null,null],this;(a.jquery||a.nodeType)&&(a=e(a).css(o),o=t);var d=this,c=e.type(a),p=this._rgba=[];return o!==t&&(a=[a,o,r,h],c="array"),"string"===c?this.parse(s(a)||n._default):"array"===c?(f(u.rgba.props,function(e,t){p[t.idx]=i(a[t.idx],t)}),this):"object"===c?(a instanceof l?f(u,function(e,t){a[t.cache]&&(d[t.cache]=a[t.cache].slice())}):f(u,function(t,s){var n=s.cache;f(s.props,function(e,t){if(!d[n]&&s.to){if("alpha"===e||null==a[e])return;d[n]=s.to(d._rgba)}d[n][t.idx]=i(a[e],t,!0)}),d[n]&&0>e.inArray(null,d[n].slice(0,3))&&(d[n][3]=1,s.from&&(d._rgba=s.from(d[n])))}),this):t},is:function(e){var i=l(e),s=!0,a=this;return f(u,function(e,n){var o,r=i[n.cache];return r&&(o=a[n.cache]||n.to&&n.to(a._rgba)||[],f(n.props,function(e,i){return null!=r[i.idx]?s=r[i.idx]===o[i.idx]:t})),s}),s},_space:function(){var e=[],t=this;return f(u,function(i,s){t[s.cache]&&e.push(i)}),e.pop()},transition:function(e,t){var s=l(e),a=s._space(),n=u[a],o=0===this.alpha()?l("transparent"):this,r=o[n.cache]||n.to(o._rgba),h=r.slice();return s=s[n.cache],f(n.props,function(e,a){var n=a.idx,o=r[n],l=s[n],u=d[a.type]||{};null!==l&&(null===o?h[n]=l:(u.mod&&(l-o>u.mod/2?o+=u.mod:o-l>u.mod/2&&(o-=u.mod)),h[n]=i((l-o)*t+o,a)))}),this[a](h)},blend:function(t){if(1===this._rgba[3])return this;var i=this._rgba.slice(),s=i.pop(),a=l(t)._rgba;return l(e.map(i,function(e,t){return(1-s)*a[t]+s*e}))},toRgbaString:function(){var t="rgba(",i=e.map(this._rgba,function(e,t){return null==e?t>2?1:0:e});return 1===i[3]&&(i.pop(),t="rgb("),t+i.join()+")"},toHslaString:function(){var t="hsla(",i=e.map(this.hsla(),function(e,t){return null==e&&(e=t>2?1:0),t&&3>t&&(e=Math.round(100*e)+"%"),e});return 1===i[3]&&(i.pop(),t="hsl("),t+i.join()+")"},toHexString:function(t){var i=this._rgba.slice(),s=i.pop();return t&&i.push(~~(255*s)),"#"+e.map(i,function(e){return e=(e||0).toString(16),1===e.length?"0"+e:e}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),l.fn.parse.prototype=l.fn,u.hsla.to=function(e){if(null==e[0]||null==e[1]||null==e[2])return[null,null,null,e[3]];var t,i,s=e[0]/255,a=e[1]/255,n=e[2]/255,o=e[3],r=Math.max(s,a,n),h=Math.min(s,a,n),l=r-h,u=r+h,d=.5*u;return t=h===r?0:s===r?60*(a-n)/l+360:a===r?60*(n-s)/l+120:60*(s-a)/l+240,i=0===l?0:.5>=d?l/u:l/(2-u),[Math.round(t)%360,i,d,null==o?1:o]},u.hsla.from=function(e){if(null==e[0]||null==e[1]||null==e[2])return[null,null,null,e[3]];var t=e[0]/360,i=e[1],s=e[2],n=e[3],o=.5>=s?s*(1+i):s+i-s*i,r=2*s-o;return[Math.round(255*a(r,o,t+1/3)),Math.round(255*a(r,o,t)),Math.round(255*a(r,o,t-1/3)),n]},f(u,function(s,a){var n=a.props,o=a.cache,h=a.to,u=a.from;l.fn[s]=function(s){if(h&&!this[o]&&(this[o]=h(this._rgba)),s===t)return this[o].slice();var a,r=e.type(s),d="array"===r||"object"===r?s:arguments,c=this[o].slice();return f(n,function(e,t){var s=d["object"===r?e:t.idx];null==s&&(s=c[t.idx]),c[t.idx]=i(s,t)}),u?(a=l(u(c)),a[o]=c,a):l(c)},f(n,function(t,i){l.fn[t]||(l.fn[t]=function(a){var n,o=e.type(a),h="alpha"===t?this._hsla?"hsla":"rgba":s,l=this[h](),u=l[i.idx];return"undefined"===o?u:("function"===o&&(a=a.call(this,u),o=e.type(a)),null==a&&i.empty?this:("string"===o&&(n=r.exec(a),n&&(a=u+parseFloat(n[2])*("+"===n[1]?1:-1))),l[i.idx]=a,this[h](l)))})})}),l.hook=function(t){var i=t.split(" ");f(i,function(t,i){e.cssHooks[i]={set:function(t,a){var n,o,r="";if("transparent"!==a&&("string"!==e.type(a)||(n=s(a)))){if(a=l(n||a),!c.rgba&&1!==a._rgba[3]){for(o="backgroundColor"===i?t.parentNode:t;(""===r||"transparent"===r)&&o&&o.style;)try{r=e.css(o,"backgroundColor"),o=o.parentNode}catch(h){}a=a.blend(r&&"transparent"!==r?r:"_default")}a=a.toRgbaString()}try{t.style[i]=a}catch(h){}}},e.fx.step[i]=function(t){t.colorInit||(t.start=l(t.elem,i),t.end=l(t.end),t.colorInit=!0),e.cssHooks[i].set(t.elem,t.start.transition(t.end,t.pos))}})},l.hook(o),e.cssHooks.borderColor={expand:function(e){var t={};return f(["Top","Right","Bottom","Left"],function(i,s){t["border"+s+"Color"]=e}),t}},n=e.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(jQuery),function(){function t(t){var i,s,a=t.ownerDocument.defaultView?t.ownerDocument.defaultView.getComputedStyle(t,null):t.currentStyle,n={};if(a&&a.length&&a[0]&&a[a[0]])for(s=a.length;s--;)i=a[s],"string"==typeof a[i]&&(n[e.camelCase(i)]=a[i]);else for(i in a)"string"==typeof a[i]&&(n[i]=a[i]);return n}function i(t,i){var s,n,o={};for(s in i)n=i[s],t[s]!==n&&(a[s]||(e.fx.step[s]||!isNaN(parseFloat(n)))&&(o[s]=n));return o}var s=["add","remove","toggle"],a={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};e.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(t,i){e.fx.step[i]=function(e){("none"!==e.end&&!e.setAttr||1===e.pos&&!e.setAttr)&&(jQuery.style(e.elem,i,e.end),e.setAttr=!0)}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e.effects.animateClass=function(a,n,o,r){var h=e.speed(n,o,r);return this.queue(function(){var n,o=e(this),r=o.attr("class")||"",l=h.children?o.find("*").addBack():o;l=l.map(function(){var i=e(this);return{el:i,start:t(this)}}),n=function(){e.each(s,function(e,t){a[t]&&o[t+"Class"](a[t])})},n(),l=l.map(function(){return this.end=t(this.el[0]),this.diff=i(this.start,this.end),this}),o.attr("class",r),l=l.map(function(){var t=this,i=e.Deferred(),s=e.extend({},h,{queue:!1,complete:function(){i.resolve(t)}});return this.el.animate(this.diff,s),i.promise()}),e.when.apply(e,l.get()).done(function(){n(),e.each(arguments,function(){var t=this.el;e.each(this.diff,function(e){t.css(e,"")})}),h.complete.call(o[0])})})},e.fn.extend({addClass:function(t){return function(i,s,a,n){return s?e.effects.animateClass.call(this,{add:i},s,a,n):t.apply(this,arguments)}}(e.fn.addClass),removeClass:function(t){return function(i,s,a,n){return arguments.length>1?e.effects.animateClass.call(this,{remove:i},s,a,n):t.apply(this,arguments)}}(e.fn.removeClass),toggleClass:function(t){return function(i,s,a,n,o){return"boolean"==typeof s||void 0===s?a?e.effects.animateClass.call(this,s?{add:i}:{remove:i},a,n,o):t.apply(this,arguments):e.effects.animateClass.call(this,{toggle:i},s,a,n)}}(e.fn.toggleClass),switchClass:function(t,i,s,a,n){return e.effects.animateClass.call(this,{add:i,remove:t},s,a,n)}})}(),function(){function t(t,i,s,a){return e.isPlainObject(t)&&(i=t,t=t.effect),t={effect:t},null==i&&(i={}),e.isFunction(i)&&(a=i,s=null,i={}),("number"==typeof i||e.fx.speeds[i])&&(a=s,s=i,i={}),e.isFunction(s)&&(a=s,s=null),i&&e.extend(t,i),s=s||i.duration,t.duration=e.fx.off?0:"number"==typeof s?s:s in e.fx.speeds?e.fx.speeds[s]:e.fx.speeds._default,t.complete=a||i.complete,t}function i(t){return!t||"number"==typeof t||e.fx.speeds[t]?!0:"string"!=typeof t||e.effects.effect[t]?e.isFunction(t)?!0:"object"!=typeof t||t.effect?!1:!0:!0}e.extend(e.effects,{version:"1.11.0",save:function(e,t){for(var i=0;t.length>i;i++)null!==t[i]&&e.data(s+t[i],e[0].style[t[i]])},restore:function(e,t){var i,a;for(a=0;t.length>a;a++)null!==t[a]&&(i=e.data(s+t[a]),void 0===i&&(i=""),e.css(t[a],i))},setMode:function(e,t){return"toggle"===t&&(t=e.is(":hidden")?"show":"hide"),t},getBaseline:function(e,t){var i,s;switch(e[0]){case"top":i=0;break;case"middle":i=.5;break;case"bottom":i=1;break;default:i=e[0]/t.height}switch(e[1]){case"left":s=0;break;case"center":s=.5;break;case"right":s=1;break;default:s=e[1]/t.width}return{x:s,y:i}},createWrapper:function(t){if(t.parent().is(".ui-effects-wrapper"))return t.parent();var i={width:t.outerWidth(!0),height:t.outerHeight(!0),"float":t.css("float")},s=e("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),a={width:t.width(),height:t.height()},n=document.activeElement;try{n.id}catch(o){n=document.body}return t.wrap(s),(t[0]===n||e.contains(t[0],n))&&e(n).focus(),s=t.parent(),"static"===t.css("position")?(s.css({position:"relative"}),t.css({position:"relative"})):(e.extend(i,{position:t.css("position"),zIndex:t.css("z-index")}),e.each(["top","left","bottom","right"],function(e,s){i[s]=t.css(s),isNaN(parseInt(i[s],10))&&(i[s]="auto")}),t.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),t.css(a),s.css(i).show()},removeWrapper:function(t){var i=document.activeElement;return t.parent().is(".ui-effects-wrapper")&&(t.parent().replaceWith(t),(t[0]===i||e.contains(t[0],i))&&e(i).focus()),t},setTransition:function(t,i,s,a){return a=a||{},e.each(i,function(e,i){var n=t.cssUnit(i);n[0]>0&&(a[i]=n[0]*s+n[1])}),a}}),e.fn.extend({effect:function(){function i(t){function i(){e.isFunction(n)&&n.call(a[0]),e.isFunction(t)&&t()}var a=e(this),n=s.complete,r=s.mode;(a.is(":hidden")?"hide"===r:"show"===r)?(a[r](),i()):o.call(a[0],s,i)}var s=t.apply(this,arguments),a=s.mode,n=s.queue,o=e.effects.effect[s.effect];return e.fx.off||!o?a?this[a](s.duration,s.complete):this.each(function(){s.complete&&s.complete.call(this)}):n===!1?this.each(i):this.queue(n||"fx",i)},show:function(e){return function(s){if(i(s))return e.apply(this,arguments);var a=t.apply(this,arguments);return a.mode="show",this.effect.call(this,a)}}(e.fn.show),hide:function(e){return function(s){if(i(s))return e.apply(this,arguments);var a=t.apply(this,arguments);return a.mode="hide",this.effect.call(this,a)}}(e.fn.hide),toggle:function(e){return function(s){if(i(s)||"boolean"==typeof s)return e.apply(this,arguments);var a=t.apply(this,arguments);return a.mode="toggle",this.effect.call(this,a)}}(e.fn.toggle),cssUnit:function(t){var i=this.css(t),s=[];return e.each(["em","px","%","pt"],function(e,t){i.indexOf(t)>0&&(s=[parseFloat(i),t])}),s}})}(),function(){var t={};e.each(["Quad","Cubic","Quart","Quint","Expo"],function(e,i){t[i]=function(t){return Math.pow(t,e+2)}}),e.extend(t,{Sine:function(e){return 1-Math.cos(e*Math.PI/2)},Circ:function(e){return 1-Math.sqrt(1-e*e)},Elastic:function(e){return 0===e||1===e?e:-Math.pow(2,8*(e-1))*Math.sin((80*(e-1)-7.5)*Math.PI/15)},Back:function(e){return e*e*(3*e-2)},Bounce:function(e){for(var t,i=4;((t=Math.pow(2,--i))-1)/11>e;);return 1/Math.pow(4,3-i)-7.5625*Math.pow((3*t-2)/22-e,2)}}),e.each(t,function(t,i){e.easing["easeIn"+t]=i,e.easing["easeOut"+t]=function(e){return 1-i(1-e)},e.easing["easeInOut"+t]=function(e){return.5>e?i(2*e)/2:1-i(-2*e+2)/2}})}(),e.effects,e.effects.effect.fade=function(t,i){var s=e(this),a=e.effects.setMode(s,t.mode||"toggle");s.animate({opacity:a},{queue:!1,duration:t.duration,easing:t.easing,complete:i})},e.effects.effect.slide=function(t,i){var s,a=e(this),n=["position","top","bottom","left","right","width","height"],o=e.effects.setMode(a,t.mode||"show"),r="show"===o,h=t.direction||"left",l="up"===h||"down"===h?"top":"left",u="up"===h||"left"===h,d={};e.effects.save(a,n),a.show(),s=t.distance||a["top"===l?"outerHeight":"outerWidth"](!0),e.effects.createWrapper(a).css({overflow:"hidden"}),r&&a.css(l,u?isNaN(s)?"-"+s:-s:s),d[l]=(r?u?"+=":"-=":u?"-=":"+=")+s,a.animate(d,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){"hide"===o&&a.hide(),e.effects.restore(a,n),e.effects.removeWrapper(a),i()}})}});;
/**
 * Copyright (c) 2007-2014 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 1.4.11
 */
;(function(a){if(typeof define==='function'&&define.amd){define(['jquery'],a)}else{a(jQuery)}}(function($){var j=$.scrollTo=function(a,b,c){return $(window).scrollTo(a,b,c)};j.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};j.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(f,g,h){if(typeof g=='object'){h=g;g=0}if(typeof h=='function')h={onAfter:h};if(f=='max')f=9e9;h=$.extend({},j.defaults,h);g=g||h.duration;h.queue=h.queue&&h.axis.length>1;if(h.queue)g/=2;h.offset=both(h.offset);h.over=both(h.over);return this._scrollable().each(function(){if(f==null)return;var d=this,$elem=$(d),targ=f,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}var e=$.isFunction(h.offset)&&h.offset(d,targ)||h.offset;$.each(h.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=j.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(h.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=e[pos]||0;if(h.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*h.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(h.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&h.queue){if(old!=attr[key])animate(h.onAfterFirst);delete attr[key]}});animate(h.onAfter);function animate(a){$elem.animate(attr,g,h.easing,a&&function(){a.call(this,targ,h)})}}).end()};j.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return $.isFunction(a)||typeof a=='object'?a:{top:a,left:a}};return j}));
;
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    root.fluidvids = factory();
  }
})(this, function () {

  'use strict';

  var exports = {
    selector: 'iframe',
    players: ['www.youtube.com', 'player.vimeo.com']
  };

  var head = document.head || document.getElementsByTagName('head')[0];
  var css = '.fluidvids{width:100%;position:relative;}' +
            '.fluidvids iframe{position:absolute;top:0px;left:0px;width:100%;height:100%;}';

  var _matches = function (source) {
    var regexp = new RegExp('^(https?:)?\/\/(?:' + exports.players.join('|') + ').*$', 'i');
    return regexp.test(source);
  };

  var _render = function (elem) {
    if (!!elem.getAttribute('data-fluidvids')) {
      return;
    }
    var wrap = document.createElement('div');
    var ratio = (parseInt(elem.height ? elem.height : elem.offsetHeight, 10) / (parseInt(elem.width ? elem.width : elem.offsetWidth, 10)) * 100);
    elem.parentNode.insertBefore(wrap, elem);
    elem.setAttribute('data-fluidvids', 'loaded');
    wrap.className += 'fluidvids';
    wrap.style.paddingTop = ratio + '%';
    wrap.appendChild(elem);
  };

  var _addStyles = function () {
    var div = document.createElement('div');
    div.innerHTML = '<p>x</p><style>' + css + '</style>';
    head.appendChild(div.childNodes[1]);
  };

  exports.apply = function () {
    var nodes = document.querySelectorAll(exports.selector);
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (_matches(node.src)) {
        _render(node);
      }
    }
  };

  exports.init = function (obj) {
    for (var key in obj) {
      exports[key] = obj[key];
    }
    exports.apply();
    _addStyles();
  };

  return exports;

});
;
