function scroll_fix_nav(){
	var win_top    = jQuery(this).scrollTop(),
		$fix_li    = jQuery("#n21_fix_nav li"),
		count = $fix_li.length,
		fix_top    = 280,
		fli_h      = $fix_li.height(),
		fl_array = new Array(count),
		anim_speed = 1;

	for ( var i = 0;i < count;i++ ) {
		fl_array[i] = jQuery(".nav_array"+i).offset().top;
	}
	
	for ( var i = 0;i < count;i++) {
		if ( i == count - 1 ) {
			if ( win_top >= (fl_array[i] - fix_top - fli_h * (i+1)) ){
				$fix_li.removeClass("f_nav_head").find(".fix_arrow").fadeOut(anim_speed);
				break;
			}
		}
		else {
			if ( win_top >= (fl_array[i] - fix_top - fli_h*i) && win_top < (fl_array[i+1] - fix_top - fli_h * (i+1)) ) {
				$fix_li.eq(i).addClass("f_nav_head").find(".fix_arrow").fadeIn(anim_speed)
				.parent().siblings().removeClass("f_nav_head").find(".fix_arrow").fadeOut(anim_speed);
				break;
			}
			else if ( win_top < (fl_array[0] - fix_top) ) {
				$fix_li.removeClass("f_nav_head").find(".fix_arrow").fadeOut(anim_speed);
				break;
			}	
		}		
	}

	side_bar_fix("#n21_sidebar .sbb8, #n21_sidebar .sbb9");
}

function fix_nav_click(click_elem){
	var $win       = jQuery("body, html"),
		$fix_li    = jQuery("#n21_fix_nav li"),
		count = $fix_li.length,
		fli_h      = $fix_li.height(),
		index      = jQuery(click_elem).index(),
		anim_speed = 800,
		offset     = 270,
		fl_arr = new Array(count);

	for ( var i = 0;i < count;i++ ) {
		fl_arr[i] = jQuery(".nav_array"+i).offset().top-offset-fli_h*i;
	}
	if ( index == count-1) {$win.animate({scrollTop:0}, anim_speed,"easeOutCubic");}
	else {
		$win.animate({scrollTop:fl_arr[index]+"px"}, anim_speed,"easeOutCubic");
	}

}
var flag = true;
function side_bar_fix(sbclass){
	var win_top       = jQuery(this).scrollTop(),
		$sb_wrapper   = jQuery("#n21_sidebar"),
		$sb_fix_box   = $sb_wrapper.find(".sb_fix_box"),
		$sb_last_elem = $sb_fix_box.length ? $sb_fix_box.prev() : $sb_wrapper.find(".sbar_box:last"),
		last_top      = $sb_last_elem.offset().top + $sb_last_elem.height() + 30,
		$sb_elem      = jQuery(sbclass);
	
	
	if ( $sb_fix_box.length != 0 && win_top <= last_top )
		$sb_fix_box.fadeOut(200, function(){
			$(this).remove();
		});
	else if ( $sb_fix_box.length == 0 && win_top > last_top ) {
		$sb_wrapper.append("<div class='sb_fix_box'></div>");
		jQuery(".sb_fix_box").css({"position":"fixed", "top":0, "width":"190px", "display":"none", "padding-top":"15px"});
		$sb_elem.clone().appendTo(".sb_fix_box");
		jQuery(".sb_fix_box").fadeIn(500);
	}

	if ( $sb_fix_box.length != 0 && win_top > last_top ) {
		var sb_fb_offset      = $sb_fix_box.offset().top;
		var sb_fb_top         = sb_fb_offset + $sb_fix_box.height();
		var sb_wrapper_offset = $sb_wrapper.offset().top
		var sb_wrapper_top    = sb_wrapper_offset + $sb_wrapper.height();
		var sb_fb_abs_top     = $sb_wrapper.height() - $sb_fix_box.height();
		var sb_fb_end_offset  = sb_wrapper_top - $sb_fix_box.height();

		if ( sb_fb_top > sb_wrapper_top ) {
			$sb_fix_box.css({"position":"absolute","top":sb_fb_abs_top});
			flag = false;
		}
		if ( win_top <= sb_fb_end_offset && !flag) {
			$sb_fix_box.css({"position":"fixed","top":0});
			flag = true;
		}
	}
}
