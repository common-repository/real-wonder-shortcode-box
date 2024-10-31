<?php

function image_func($atts) {
	extract(shortcode_atts(array(
		'src' => '',
		'width' => '',
		'height' => '',
		'link' => '',
		'ltarget' => '_blank',
		'title' => '',
		'bg' => '',
		'bg_size' => '',
		'circle_bg' => '',
		'transition' => '',
		'rollover' => ''
	), $atts));
	$style = "";
	if(!empty($bg)) $style.="background-color:${bg};";
	if(!empty($link)) $style.="display:inline-block;";	
	if(!empty($circle_bg)) $style.="border-radius:50%;";
	if(!empty($bg_size)) $style.="padding:{$bg_size}px;";
	$html = "<img title=\"{$title}\" width=\"".$width."\" height=\"".$height."\" src=\"{$src}\" style=\"{$style}\"/>";
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
add_shortcode('real_image', 'image_func');

?>