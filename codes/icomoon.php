<?php

function icomoon_func($atts) {
	wp_enqueue_style('iconmoon', plugin_dir_url(__FILE__).'../assets/iconmoon/icons.css');
	extract(shortcode_atts(array(
		'icon' => '',
		'size' => '',
		'link' => '',
		'ltarget' => '_blank',
		'title' => '',
		'color' => '',
		'bg' => '',
		'transition' => '',
		'rollover' => '',
		'circle_bg' => '',
		'bg_size' => ''
	), $atts));
	$style = "";
	if(!empty($size)) $style.="font-size:${size}px;";
	if(!empty($color)) $style.="color:${color};";
	if(!empty($bg)) $style.="background-color:${bg};";
	if(!empty($link)) $style.="display:inline-block;";
	if(!empty($circle_bg)) $style.="border-radius:50%;";
	if(!empty($bg_size)) $style.="padding:{$bg_size}px;";
	$html = "<span title=\"{$title}\" class=\"icon icon-{$icon}\" style=\"{$style}\"></span>";
	if(!empty($link)){
		$html = "<a href=\"{$link}\" target=\"{$ltarget}\">".$html."</a>";
	}
	if((!empty($rollover))||(!empty($transition))){
		if(!empty($rollover)){
			$rollover = "effect_".$rollover;
			wp_enqueue_style('rollover_styles', plugin_dir_url(__FILE__).'../assets/rollover.css');
		}
		if(!empty($transition)){
			$transition = "effect_".$transition;
			wp_enqueue_style('transition_styles', plugin_dir_url(__FILE__).'../assets/transition.css');
			wp_enqueue_script('appear_js', plugin_dir_url(__FILE__).'../assets/jquery.appear.js');
			wp_enqueue_script('transition_js', plugin_dir_url(__FILE__).'../assets/transitions.js');
		}
		if(!empty($transition)){
			$hide = 'style="visibility:hidden;" ';
		}
		$html = "<span ".$hide."class=\"".$rollover." real_effect\" r_tran=\"".$transition."\">".$html."</span>";
	}
	return $html;
}
add_shortcode('real_icon', 'icomoon_func');

?>