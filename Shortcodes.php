<?
/*
Plugin Name: REAL Wonder Code Box
Plugin URI: http://jb-webs.com/
Description: Shortcodes presets collection
Version: 1.0
Author: clickandsell
*/
ini_set('display_errors', true);

include('codes/image.php');
include('codes/icomoon.php');
include('codes/boxes.php');
include('codes/buttons.php');
include('codes/stored_codes.php');
include('includes/post-ui.php');
include('includes/ajax.php');

function real_sc_init() {
	if (!is_admin()) {
		wp_enqueue_script('jquery');
	}
}
add_action('init', 'real_sc_init');
//--------------------DB TABLE-------------------
function real_table_install() {
	global $wpdb;
	$plugin_db_version = '1.0';
	$table_name = $wpdb->prefix . 'real_shortcodes';
	$charset_collate = '';
	if (!empty($wpdb->charset)) {
	  $charset_collate = "DEFAULT CHARACTER SET {$wpdb->charset}";
	}
	if (!empty($wpdb->collate)) {
	  $charset_collate .= " COLLATE {$wpdb->collate}";
	}
	$sql = "CREATE TABLE $table_name (
		id int(11) NOT NULL AUTO_INCREMENT,
		name varchar(128) NOT NULL,
		code text NOT NULL,
		appType varchar(32) NOT NULL,
		backendData text NOT NULL,
		`group` int(11) NULL,
		UNIQUE KEY `id` (`id`),
		UNIQUE KEY `name` (`name`)
	) $charset_collate;";
	require_once(ABSPATH.'wp-admin/includes/upgrade.php');
	dbDelta($sql);
	$table_name = $wpdb->prefix . 'real_shortcodes_groups';
	$sql = "CREATE TABLE $table_name (
		Id int(11) NOT NULL AUTO_INCREMENT,
		Name varchar(128) NOT NULL,
		UNIQUE KEY `Id` (`Id`),
		UNIQUE KEY `Name` (`Name`)
	) $charset_collate;";
	dbDelta($sql);
	add_option('real_db_version', $plugin_db_version);
}
register_activation_hook(__FILE__, 'real_table_install');
//-----------------------------------------------------
?>
