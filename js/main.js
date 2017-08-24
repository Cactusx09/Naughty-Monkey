$(document).ready(function(){
	//header menu
	$('.header__bar>a').click(function(e){
		e.preventDefault();
		var btn = $(this),
			name = btn.data('name'),
			body = $('.header__'+name);

		if(!body.hasClass('_active')){
			body.addClass('_active');
			body.siblings('._active').addClass('_back');
			setTimeout(function(){
				body.siblings('._active').removeClass('_active _back');
			},600);
		}else{
			body.addClass('_back');
			setTimeout(function(){
				body.removeClass('_active _back');
			},600);
		}
	});
	$('.header__menu_close,.header__menu_continue').click(function(e){
		var menu = $(this).closest('.header__menu');
		menu.addClass('_back');
		setTimeout(function(){
			menu.removeClass('_active');
		},600);
	});

	//selects
	$('.g_select__head').click(function(){
		var select = $(this).closest('.g_select');
		if(!select.hasClass('_active')){
			select.addClass('_active');
		}else{
			select.addClass('_back');
			setTimeout(function(){
				select.removeClass('_active _back');
			},300);
		}

	});
	$('.g_select__body>a').click(function(e){
		e.preventDefault();
		var el = $(this),
			wrap = el.closest('.g_select'),
			head = wrap.find('.g_select__head');
		head.find('span').text(el.text());
		wrap.removeClass('_active');
		el.addClass('_current').siblings().removeClass('_current');
	})
	$('.s_item__refine_color').click(function(){
		var el = $(this),
			color  =el.data('color'),
			input = el.parent('.s_item__refine_colors').find('input');
		el.addClass('_current').siblings().removeClass('_current');
		input.val(color);
	});
	$('.s_item__refine_size').click(function(){
		var el = $(this),
			size  = el.text(),
			input = el.parent('.s_item__refine_sizes').find('input');
		el.addClass('_current').siblings().removeClass('_current');
		input.val(size);
	});

	//look slider
	if($('.s_look__slider').length){
		var sl_look = $('.s_look__slider').lightSlider({
			item: 1,
			loop: true,
			slideMargin: 0,
			controls: false,
			auto: true,
			pause: 4000
		});
		$('.s_look__arr_left').click(function(){
			sl_look.goToPrevSlide();
		});
		$('.s_look__arr_right').click(function(){
			sl_look.goToNextSlide();
		});
	}

	//item slider
	if($('.s_item__left_slider')){
		$('.s_item__left_slider').each(function(){
			var item = $(this),
				thumbs = item.closest('.s_item__left').find('.s_item__left_thumb'),
				boot_slider = item.lightSlider({
					item:1,
					controls: false,
					pager: false,
					slideMargin: 0,
					loop: true,
					onBeforeSlide: function(){
						var n = boot_slider.getCurrentSlideCount()-1;
						thumbs.eq(n).addClass('_current').siblings().removeClass('_current');
					}
				});
			item.lightGallery({
				selector: '.lslide',
				zoom: true
			});
			thumbs.hover(function(){
				var el = $(this),
					n = el.index()+1;
				boot_slider.goToSlide(n);
			});
		});
	}

	//input number
	$('.g_number__arr_top').click(function(){
		var arr = $(this),
			input = arr.closest('.g_number').find('input');
		input.val(Number(input.val())+1);
	});
	$('.g_number__arr_bot').click(function(){
		var arr = $(this),
			input = arr.closest('.g_number').find('input'),
			val = input.val();
		if(val>1){
			input.val(Number(input.val())-1);
		}
	});
	//prevent only numbers
	$('.g_number__input').on('keydown',function(e){
		-1!==$.inArray(e.keyCode,[46,8,9,27,13,110,190])||/65|67|86|88/.test(e.keyCode)&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&40>=e.keyCode||(e.shiftKey||48>e.keyCode||57<e.keyCode)&&(96>e.keyCode||105<e.keyCode)&&e.preventDefault()
	});

	//submenu header
	var submenu = $('.header__nav_submenu'),
		submenuTrigger = submenu.next('a');
	submenuTrigger.hover(function(){
		submenu.addClass('_active');
	},function(){
		submenu.removeClass('_active');
	});
	submenu.hover(function(){
		submenu.addClass('_active');
	},function(){
		submenu.addClass('_back');
		setTimeout(function(){
			submenu.removeClass('_active _back');
		},600);
	});

	//s_item wishlist
	$('.s_item__item_txt svg,.s_item__right_view svg').click(function(e){
		$(this).toggleClass('_fill');
	});

	//s_us tab on about.html
	$('.s_us__head a').click(function(e){
		e.preventDefault();
		var el = $(this),
			n = el.index(),
			wrap = el.closest('.s_us'),
			item = wrap.find('.s_us__item').eq(n);
		el.addClass('_current').siblings().removeClass('_current');
		item.addClass('_current').siblings().removeClass('_current');
	});

	//s_item item show details
	$('.s_item__item').click(function(e){
		var item = $(this),
			n = item.data('row')-1,
			wrap = item.nextAll('.s_item__wrp').first(),
			row = wrap.find('.s_item__row').eq(n),
			targ = e.target.tagName;
		if(targ!=="svg"&&targ!=="path"){
			$('.s_item__row').removeClass('_active');
			row.addClass('_active');1
			setTimeout(function(){
				$('html, body').stop().animate({scrollTop: row.offset().top}, 500);
			},250);
		}
	});
	$('.s_item__row_close').click(function(){
		$(this).closest('.s_item__row').removeClass('_active');
		$('html, body').stop().animate({scrollTop: $(window).scrollTop()-450}, 500);
	});

	//s_blog item
	$('.s_blog__item_txt, .s_blog__item_read').click(function(e){
		$('html, body').stop().animate({scrollTop:0}, 500);
	});

	//inputs
	$('input,textarea').change(function(){
		if($(this).val()==''){
			$(this).removeClass('_active');
		}else{
			$(this).addClass('_active');
		}
	});



});
