<a href="#" class="button" id="real_sc_imagefromlib">Load Image From Media Gallery</a><br/>
<?php
	$images_path = plugin_dir_path(__FILE__).'/../assets/real_images/64/*.png';
	$basic_url = plugin_dir_url(__FILE__).'../assets/real_images/64/';
	foreach (glob($images_path) as $filename) {
		echo '<img src="'.$basic_url.basename($filename).'" title="'.basename($filename,'.png').'"/>';
	}
?>