<?php
 function real_shortcodes_plugin_box()
    {
        add_meta_box(
            'real_shortcodes_plugin_box',
            __( 'REAL Shortcodes' ),
            'real_shortcodes_box_cb',
            null,
            'normal',
            'high'
        );
    }
    function real_shortcodes_box_cb( $post )
	{
		ini_set('display_errors', true);
		$out = '<span id="real_shortcodes_dialog_open"><a href="#" class="button" style="">REAL Shortcodes</a></span>';
		include('shortcodes_ui_dialog.php');
		echo $out;
	}	
	add_action('add_meta_boxes','real_shortcodes_plugin_box',20);	

?>