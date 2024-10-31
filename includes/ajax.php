<?php
add_action( 'wp_ajax_nopriv_real_shorcodes_backend_ajax', 'real_shortcode_backend_ajax' );
	add_action( 'wp_ajax_real_shorcodes_backend_ajax', 'real_shortcode_backend_ajax' );
	function real_shortcode_backend_ajax()
	{
		global $wpdb;
		$action = $_POST['r_action'];
		switch ($action) {
			case 'is_exists':
					$cnt = $wpdb->get_var("SELECT count(*) FROM `wp_real_shortcodes` WHERE `name` = '".$_POST['name']."'");
					if($cnt > 0){
						die('exists_real');
					}else{
						if(!shortcode_exists($_POST['name'])){
							die('avaliable');
						}else{
							die('exists');
						}
					}
				break;
			case 'update_shortcode':
					$name = $_POST['name'];
					$full_code = $_POST['full_code'];
					$appType = $_POST['appType'];
					$backendData = $_POST['backendData'];
					$group = $_POST['group'];
					$wpdb->query("UPDATE `".$wpdb->prefix."real_shortcodes` SET `code` = \"".$full_code."\", `appType`=\"{$appType}\", `backendData`=\"{$backendData}\", `group`=\"{$group}\" WHERE `name` = '{$name}'");
				break;
			case 'save_shortcode':
					$name = $_POST['name'];
					$full_code = $_POST['full_code'];
					$appType = $_POST['appType'];
					$backendData = $_POST['backendData'];					
					$group = $_POST['group'];
					$wpdb->query("INSERT INTO `".$wpdb->prefix."real_shortcodes`(`name`,`code`,`appType`,`backendData`,`group`) VALUES('{$name}',\"".$full_code."\",\"{$appType}\",\"{$backendData}\",'{$group}')");
				break;
			case 'get_shortcode':
				$name = $_POST['name'];
				$stored_codes = $wpdb->get_results("SELECT `code`,`backendData`,`appType` FROM `".$wpdb->prefix."real_shortcodes` WHERE `name` = '{$name}'");
				die(json_encode($stored_codes[0]));
				break;
			case 'delete_shortcode':
				$name = $_POST['name'];
				$wpdb->query("DELETE FROM `".$wpdb->prefix."real_shortcodes` WHERE `name` = '{$name}'");
					echo 'deleted';
			break;
			case 'get_compressed':
				$string = $_POST['string'];
				$compressed = gzdeflate($string, 9);
				$compressed = gzdeflate($compressed, 9);
				echo bin2hex($compressed);
			break;
			case 'save_sc_groups':
				$groups = $_POST['groups'];
				$groups = json_decode(stripslashes($groups),true);
				$exists_names = array();
				foreach ($groups as $g) {
					$exists_names[] = $g['name'];
					if(intval($g['id']) == 0){
						$wpdb->query("INSERT INTO `".$wpdb->prefix."real_shortcodes_groups`(`Name`) VALUES('".$g['name']."')");
					}else{
						$wpdb->query("UPDATE `".$wpdb->prefix."real_shortcodes_groups` SET `Name`= '".$g['name']."' WHERE `Id` = ".intval($g['id'])."");
					}
				}
				$stored_codes_groups = $wpdb->get_results("SELECT `Id`,`Name` FROM `".$wpdb->prefix."real_shortcodes_groups`");
				foreach ($stored_codes_groups as $group) {
					if(!in_array($group->Name,$exists_names)){
						$wpdb->query("DELETE FROM `".$wpdb->prefix."real_shortcodes_groups` WHERE `id` = '".$group->Id."'");
						$wpdb->query("UPDATE `".$wpdb->prefix."real_shortcodes` SET `group` = NULL WHERE `group` = '".$group->Id."'");
					}else{
						echo '<option value="'.$group->Id.'">'.$group->Name.'</option>';
					}
				}
			break;
		}	
		die();
	}
?>