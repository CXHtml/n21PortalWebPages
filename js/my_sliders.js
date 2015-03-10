function my_sliders(slider_id, btn_class){
	var $s_li = jQuery(slider_id+" .ul_sclass li");
	var $s_li_first = jQuery(slider_id+" .ul_sclass li:first");
	var $s_li_last = jQuery(slider_id+" .ul_sclass li:last")
	var $sb_li = jQuery(slider_id+" "+btn_class+" li");
	var $sb_li_first = jQuery(slider_id+" "+btn_class+" li:first");
	var last_index = $s_li.index($s_li_last);
	var _index = 1;
	var e_height = $s_li.height();
	var interval = 4000;

	$s_li.parent().css({"position":"relative", "height":e_height});
	$s_li.css({"position":"absolute", "top":"0", "left":"0", "display":"none"});
	$s_li_first.addClass("show");
	var $show_class = jQuery(slider_id+" .ul_sclass .show");
	$show_class.css({"display":"block"});
	$sb_li_first.addClass("btn_selected");

	var sliders_start = setInterval(function(){
	if (_index > last_index) _index = 0;
	var $s_li_next = $s_li.eq(_index);
	_index++;
	$s_li_next.siblings().fadeOut();
	$s_li_next.fadeIn();

	var $selected = jQuery(slider_id+" .btn_selected");
	var $sb_li_next = $selected.next().length ? $selected.next() : $sb_li_first;
	$sb_li_next.siblings().removeClass("btn_selected");
	$sb_li_next.addClass("btn_selected");
	}, interval);

	$sb_li.hover(function(){
		var $sli_hover = $s_li.eq(jQuery(this).index());
		jQuery(this).siblings().removeClass("btn_selected");
		jQuery(this).addClass("btn_selected");
		$sli_hover.siblings().fadeOut();
		$sli_hover.fadeIn();
		clearInterval(sliders_start);
	}, function(){
		sliders_start = setInterval(function(){
		if (_index > last_index) _index = 0;
		var $s_li_next = $s_li.eq(_index);
		_index++;
		$s_li_next.siblings().fadeOut();
		$s_li_next.fadeIn();
	
		var $selected = jQuery(slider_id+" .btn_selected");
		var $sb_li_next = $selected.next().length ? $selected.next() : $sb_li_first;
		$sb_li_next.siblings().removeClass("btn_selected");
		$sb_li_next.addClass("btn_selected");
		}, interval);
	});
}


