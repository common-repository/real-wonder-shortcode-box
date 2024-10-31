<?php
function real_load_shortcode($atts,$content,$tag) {
	global $wpdb;
	$code = $wpdb->get_row("SELECT `code` FROM `".$wpdb->prefix."real_shortcodes` WHERE `name` = '{$tag}'", ARRAY_A);
	$code = $code['code'].$content.'[/'.str_replace("[","",strtok($code['code'], " ")).']';
	return do_shortcode($code);
}
global $wpdb;
$stored_codes = $wpdb->get_results("SELECT * FROM `".$wpdb->prefix."real_shortcodes`");
foreach ($stored_codes as $code) {
	add_shortcode($code->name,'real_load_shortcode');
}
?>