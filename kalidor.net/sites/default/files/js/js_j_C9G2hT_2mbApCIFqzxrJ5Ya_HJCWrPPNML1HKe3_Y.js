
(function($){

$( document ).ready(function() {

	var _isMobile = function() {
		return (/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera);
	};

   // dobavit perenosy
   //$('p').hyphenate();

   // init lazy images for articles
   $(".imgContainer img").lazyload({threshold : 400});
   
	// add 'no-touch' class to prevent on-hover events
	if (_isMobile() === false)
	{
		$('body').addClass('no-touch');

      $(window).bind('scroll', function(e){
         //parallaxScroll();
      });
	}
    
   function parallaxScroll(){
       var scrolled = $(window).scrollTop();
         //$('.no-touch #header .cover').css('margin-top',((scrolled*.4))+'px');
   }

   // init re-scaling of videos
   fluidvids.init({
     selector: 'iframe', // runs querySelectorAll()
     players: ['www.youtube.com', 'player.vimeo.com'] // players to support
   });
	
   // 'additional articles' on home page
   $('.no-touch .view-display-id-block_1').on('mouseover', 'article .image', function(){
   		$(this).parent().parent().find('article').addClass('active');
   }).on('mouseleave', 'article .image', function(){
   		$(this).parent().parent().find('article').removeClass('active');
   });
   	
   $('.no-touch .view-display-id-block_1').on('mouseover', 'article .details .title a', function(){
   		$(this).parent().parent().parent().parent().find('article').addClass('active');
   }).on('mouseleave', 'article .details .title a', function(){
   		$(this).parent().parent().parent().parent().find('article').removeClass('active'); 
   });
   
   // 'additional articles' on internal pags
   $('.no-touch article .image').on('mouseover', function(){
   		$(this).parent().addClass('active');
   }).on('mouseleave', function(){
   		$(this).parent().parent().find('article').removeClass('active');
   });

   $('.no-touch article .details .title a').on('mouseover', function(){
         $(this).parent().parent().parent().addClass('active');
   }).on('mouseleave', function(){
         $(this).parent().parent().parent().removeClass('active');
   });
   

   $('.front .head-block .arrow').on('click', function(){
   		if ($(this).hasClass('opened')) {
   			$(this).removeClass('opened');
   			$('.lid .text-container').hide();
   		}
   		else {
   			$(this).addClass('opened');
   			$('.lid .text-container').show();
   		}
   });

   $('#header .arrow').on('click', function(){
     jQuery.scrollTo('#page-wrapper', 600);
   });

   $('.no-touch .head-block .details').on('mouseover', function(){
      $(this).children('.title').css('border-color', '#cc3300');
      $('.front #header .lid').animate({bottom:0}, 200);
      $('.front #header .main-image-author').hide(200);
   });

   $('.no-touch .head-block .details').on('mouseleave', function(){
      $(this).children('.title').css('border-color', '');
      $('.front #header .lid').animate({bottom:'-'+$('.front #header .lid').height()+'px'}, 200); 
      $('.front #header .main-image-author').show(200);
   });

   // Note container behaviour
   var a = !1;
   $(".note").on('mouseover', function () {
        if (!a) {
            var b = $(this).find("span").html(),
                c = $(this).offset();
            $(this).addClass("active");
            var noteContainer = $('<div class="note-container" style="left:' + (c.left - 19) + "px; top:" + (c.top - 17) + 'px;">' + b + "</div>").appendTo($("body"));
            noteContainer.fadeIn(100);
            var note = $(this);

            var hideNoteContainer = function () {
                a = !0;
                noteContainer.fadeOut(100, function () {
                    a = !1;
                    note.removeClass("active");
                    noteContainer.remove();
                })
            };

            noteContainer.on('mouseleave', hideNoteContainer);
            $(window).on('touchstart', hideNoteContainer);
        }
   });

  var isOpenNavigation = false;

  // Navigation handlers
    var showNavigation = function(){
    $(".navigation.head").css('top',0);
    $(".navigation .title").addClass("open");
    isOpenNavigation = true;
  }

  var hideNavigation = function(){
    $(".navigation.head").css('top','-'+($(".navigation.head").height()-97)+'px');
    $(".navigation .title").removeClass("open");
    isOpenNavigation = false;
  }

  var touchNavigationHandler = function(){
      if (isOpenNavigation == true){
        hideNavigation();
      }
      else{
        showNavigation();
      }
  }
  $(".navigation.head").on('mouseover', showNavigation);
  $(".navigation.head").on('mouseout', hideNavigation);
  $(".navigation .title").on('touchstart', touchNavigationHandler);

  $(window).scroll(function(){                            
    if ( $(window).scrollTop() >= 2600 ){
      // Init navigation 
      $(".navigation.head").css('top','-'+($(".navigation.head").height()-97)+'px');
      $('.navigation.head').show();
    }
    else{
       $('.navigation.head').hide();  
    }
  });
 });
})(jQuery);
