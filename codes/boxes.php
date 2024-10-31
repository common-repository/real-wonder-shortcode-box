<?php
$realbox_classes = 0;
function box_func($atts,$content) {
	wp_enqueue_style('real_boxes', plugin_dir_url(__FILE__).'../assets/real_boxes.css');
	extract(shortcode_atts(array(
		'himage' => '',
		'bimage' => '',
		'fimage' => '',
		'hcolor' => '',
		'bcolor' => '',
		'fcolor' => '',		
		'width' => '',
		'bheight' => '',
		'hheight' => '',
		'fheight' => '',
		'rcorner' => '',
		'shadow' => '',
		'transition' => '',
		'cssinclude' => '',
		'cssinclude_header' => '',
		'headline' => ''
	), $atts));
	$box_style = '';
	$header_style = '';
	$body_style = '';
	$footer_style = '';
	//-----------------//
	$box_style.="width:{$width}px;";
	$header_style.="height:{$hheight}px;line-height:{$hheight}px;";
	if(!empty($himage)){
		$header_style.="background-image:url({$himage});";
	}
	$body_style.="height:{$bheight}px;";
	if(!empty($bimage)){
		$body_style.="background-image:url({$bimage});";
	}
	$footer_style.="height:{$fheight}px;";
	if(!empty($fimage)){
		$footer_style.="background-image:url({$fimage});";
	}
	if(!empty($hcolor)){
		$header_style.="background-color:{$hcolor};";
	}
	if(!empty($bcolor)){
		$body_style.="background-color:{$bcolor};";
	}
	if(!empty($fcolor)){
		$footer_style.="background-color:{$fcolor};";
	}		
	if(!empty($rcorner)){
		$h_add.="border-top-left-radius: {$rcorner}px;border-top-right-radius: {$rcorner}px;";
		$f_add.="border-bottom-left-radius: {$rcorner}px;border-bottom-right-radius: {$rcorner}px;";
		if($hheight > 0){
			$header_style .= $h_add;
		}else{
			$body_style .= $h_add;
		}
		if($fheight > 0){
			$footer_style .= $f_add;
		}else{
			$body_style .= $f_add;	
		}		
	}
	if(!empty($shadow)){
		wp_enqueue_style('real_boxshadows', plugin_dir_url(__FILE__).'../assets/shadows.css');
	}
	global $realbox_classes;
	$html = '';
	if(!empty($content)) $title = $content;
	$className = 'real_box_'.$realbox_classes++;
	$cssinclude = hextobin($cssinclude);
	$cssinclude = gzinflate($cssinclude);
	$cssinclude = gzinflate($cssinclude);
	if(!empty($cssinclude)){
		$cssinclude = '.'.$className.' .rbody {'.$cssinclude.'}';
		$html .= '<style type="text/css">'.$cssinclude.'</style>';		
	}
	$cssinclude_header = hextobin($cssinclude_header);
	$cssinclude_header = gzinflate($cssinclude_header);
	$cssinclude_header = gzinflate($cssinclude_header);
	if(!empty($cssinclude_header)){
		$cssinclude_header = '.'.$className.' .rheader {'.$cssinclude_header.'}';
		$html .= '<style type="text/css">'.$cssinclude_header.'</style>';		
	}
	$cssinclude_footer = hextobin($cssinclude_footer);
	$cssinclude_footer = gzinflate($cssinclude_footer);
	$cssinclude_footer = gzinflate($cssinclude_footer);
	if(!empty($cssinclude_footer)){
		$cssinclude_footer = '.'.$className.' .rfooter {'.$cssinclude_footer.'}';
		$html .= '<style type="text/css">'.$cssinclude_footer.'</style>';		
	}		
	$html .= '<span class="real_box '.$shadow.' '.$className.'" style="'.$box_style.'"><span class="rheader" style="'.$header_style.'">'.$headline.'</span><span class="rbody" style="'.$body_style.'">'.$content.'</span><span class="rfooter" style="'.$footer_style.'"></span></span>';
	if(!empty($transition)){
		$transition = "effect_".$transition;
		wp_enqueue_style('transition_styles', plugin_dir_url(__FILE__).'../assets/transition.css');
		wp_enqueue_script('appear_js', plugin_dir_url(__FILE__).'../assets/jquery.appear.js');
		wp_enqueue_script('transition_js', plugin_dir_url(__FILE__).'../assets/transitions.js');
		$hide = 'style="visibility:hidden;" ';
	}	
	$html = "<span ".$hide."class=\"real_effect\" r_tran=\"".$transition."\"><span>".$html."</span></span>";
	return $html;
}
add_shortcode('real_box', 'box_func');
?>