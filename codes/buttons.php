<?php
function hextobin($hexstr) 
{ 
    $n = strlen($hexstr); 
    $sbin="";   
    $i=0; 
    while($i<$n) 
    {       
        $a =substr($hexstr,$i,2);           
        $c = pack("H*",$a); 
        if ($i==0){$sbin=$c;} 
        else {$sbin.=$c;} 
        $i+=2; 
    } 
    return $sbin; 
}
$realbtn_classes = array();
function button_func($atts,$content) {
	extract(shortcode_atts(array(
		'title' => '',
		'cssinclude' => '',
		'link' => '',
		'ltarget' => '_blank',
		'shadow' => ''
	), $atts));
	if(!empty($shadow)){
		wp_enqueue_style('real_boxshadows', plugin_dir_url(__FILE__).'../assets/shadows.css');
	}
	global $realbtn_classes;
	$html .= '';
	if(!empty($content)) $title = $content;
	$className = 'real_btn_'.count($realbtn_classes);
	if(false !== $key = array_search($cssinclude, $realbtn_classes)){
		$className = 'real_btn_'.$key;
	}else{
		$realbtn_classes[] = $cssinclude;
		$cssinclude = hextobin($cssinclude);
		$cssinclude = gzinflate($cssinclude);
		$cssinclude = gzinflate($cssinclude);
		$cssinclude = str_replace('.button{', '.button{display:inline-block;cursor:pointer;', $cssinclude);
		$cssinclude = str_replace('.button', '.'.$className, $cssinclude);
		$html = '<style type="text/css">'.$cssinclude.'</style>';		
	}
	$html .= '<span class="'.$className.' '.$shadow.'">'.$title.'</span>';
	if(!empty($link)){
		$html = '<a href="'.$link.'" target="'.$ltarget.'">'.$html.'</a>';
	}
	return $html;
}
add_shortcode('real_button', 'button_func');
?>