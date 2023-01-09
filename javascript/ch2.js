jQuery(document).ready(function(){
    // .navi 의 li 태그에 mouseover 이벤트 설정
    $('.navi > li').mouseover(function(){
        // $(this) : 현재 선택된 태그(요소)
        // find('.submenu') : 선택된 태그의 자식 태그 중 .submenu와 일치하는
        // 태그를 찾아서 반환함. 만약에, children()를 사용할 경우 직계 자식
        // 태그를 반환함
        // stop() : 현재 동작하고 있는 애니메이션 동작을 즉시 중단함
        // slideDown(), slideUp() : jQuery 라이브러리에서 제공하는 함수로
        // 슬라이딩 애니메이션과 함께 보여주거나 숨김 구현함. 선택한 요소의
        // height값을 낮추거나 높혀가며 슬라이드 업 또는 다운 전환되게 함.
        // 매개변수값(인수) 500은 0.5초를 의미함
        $(this).find('.submenu').stop().slideDown(500);
    }).mouseout(function(){
        $(this).find('.submenu').stop().slideUp(500);
    });


    start(); // start() 함수를 구동시켜줌
    // 전체 이미지의 개수, 첫번째 이미지(인덱스 0번째), 두번째 이미지(인덱스 1번째),
    // 세번째 이미지(인덱스 2번째)까지 총 3개를 imgs 변수에 저장함
    
    var imgs = 4;
    var now = 0; // 첫번째 이미지(인덱스 0번째)부터 시작 초기값을 now 변수에 저장함
    
    function start(){  // start() 함수 생성
        // .slide_box > img의 첫번째 요소의 형제들에게
        // fadeOut() 함수로 이미지를 사라지게 함
        $(".slidebox > img").eq(0).siblings().fadeOut('slow');
        // 3초 간격으로 slide() 함수 호출 실행함
        setInterval(function(){slide();}, 3000);
    }
    
    function slide(){
        // 변수 now와 변수 imgs의 값이 같다면 좌측 now 변수에 0을 대입해 주고,
        // 그렇지 않으면 now의 값에 1을 더한 값을 좌측 now 변수에 대입해 줌
        now = (now === imgs) ? 0 : now+=1;  // now = now+1
        // console.log(now);
    
        // now-1번째 <img>태그에 fadeOut() 함수로 이미지를 사라지게 함
        $(".slidebox > img").eq(now-1).fadeOut('slow');
    
        // now번째 <img>태그에 fadeIn() 함수로 이미지를 불러오게 함
        $(".slidebox > img").eq(now).fadeIn('slow');
    }
    
});



window.onfocus=function(){
}
window.onload=function(){
window.focus(); // 현재 window 즉 익스플러러를 윈도우 최상단에 위치
window.moveTo(0,0); // 웹 페이지의 창 위치를 0,0 (왼쪽 최상단) 으로 고정
window.resizeTo(1280,800); // 웹페이지의 크기를 가로 1280 , 세로 800 으로 고정(확장 및 축소)

}




//----------------↓↓↓↓↓↓쿠키↓↓↓↓↓↓↓--------------//

(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));



//---------------↑↑↑↑↑↑↑↑쿠키↑↑↑↑↑↑↑----------------------//
$(function(){
  //쿠키("popup")의 값이 'none'이면
  //id값이 'notice_wrap'인 요소를 숨깁니다.
  if($.cookie('popup') == 'none'){
      $("#popupWindow").hide();
  }
  //class 값이 'closeBtn'인 요소를 클릭하면
  //체크박스의 체크 유무에 따라 
  //쿠키를 생성하여 3일간만 저장합니다.
  var $expiresChk = $("#expiresChk");
  $(".closeBtn").on("click", closePop );
  function closePop(){
      if($expiresChk.is(":checked")){
          $.cookie("popup","none",{expires:3, path:"/"});
      }
      $("#popupWindow").fadeOut("fast");
  }
});