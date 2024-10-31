<link rel="stylesheet" type="text/css" href="<?php echo plugin_dir_url(__FILE__).'../assets/post-ui.css' ?>">
<link rel="stylesheet" type="text/css" href="<?php echo plugin_dir_url(__FILE__).'../assets/iconmoon/icons.css' ?>">
<link rel="stylesheet" type="text/css" href="<?php echo plugin_dir_url(__FILE__).'../assets/colorpicker.css' ?>">
<link rel="stylesheet" type="text/css" href="<?php echo plugin_dir_url(__FILE__).'../assets/transition.css' ?>">
<link rel="stylesheet" type="text/css" href="<?php echo plugin_dir_url(__FILE__).'../assets/rollover.css' ?>">
<link rel="stylesheet" type="text/css" href="<?php echo plugin_dir_url(__FILE__).'../assets/shadows.css' ?>">
<link rel="stylesheet" type="text/css" href="<?php echo plugin_dir_url(__FILE__).'../assets/nouislider/jquery.nouislider.css' ?>">
<script type="text/javascript" src="<?php echo plugin_dir_url(__FILE__).'../assets/colorpicker.js' ?>"></script>
<script type="text/javascript" src="<?php echo plugin_dir_url(__FILE__).'../assets/post-ui.js' ?>"></script>
<script type="text/javascript" src="<?php echo plugin_dir_url(__FILE__).'../assets/nouislider/jquery.nouislider.min.js' ?>"></script>
<div id="real_shortcodes_dialog" class="postbox">
	<div class="real_service_links">
		<a href="http://jb-webs.com/theme-builder/" target="_blank">WYSIWYG Theme Builder</a>
		<a href="http://www.jb-webs.com/button-maker/" target="_blank">Open Button Maker</a>
		
		<a href="http://www.jb-webs.com/gradient-editor/" target="_blank">Gradient Editor</a>
                <a href="http://jb-webs.com/layout-builder/" target="_blank">WYSIWYG Layout Builder</a>
	</div>
	<div class="rheader"><span>REAL ShortCodes</span>
		<span class="icon icon-search" title="search" id="rtab_filter_button"></span>
		<input type="text" id="rtab_filter" placeholder="Search..."/>
	</div>
	<?php include_once('dialog-preview-shortcode.php'); ?>
	<div class="inside" style="height: 350px;overflow-y:scroll">
		<div id="r-tabs-icons" style="display:block;" class="tab">
			<?php include_once('icons-list.php'); ?>
		</div>
		<div id="r-tabs-images" class="tab">
			<?php include_once('images-list.php'); ?>
		</div>
		<div id="r-tabs-boxes" class="tab">
			<?php include_once('boxes-list.php'); ?>
		</div>
		<div id="r-tabs-buttons" class="tab">
			You can create buttons with our button maker which can be foud <a href="http://www.jb-webs.com/button-maker/" target="_blank">here</a></br>
			Just copy code and past it into code block inside plugin
			<div id="rcreate_button"/>Create Button</div>
		</div>
	</div>
	<div class="saved_codes">
		<div class="rheader">
			<span class="rtabs">
				<span class="rtabs-selector">Select Mode</span>
				<span rtab="r-tabs-icons" class="active">Icons</span>
				<span rtab="r-tabs-images">Images</span>
				<span rtab="r-tabs-boxes">Boxes</span>
				<span rtab="r-tabs-buttons">Buttons</span>
			</span>
		<span class="closebtn">x</span>
		</div>
			<div class="codes_container">
				<?php
					global $wpdb;
					//GROUPS
					$stored_groups = $wpdb->get_results("SELECT * FROM `".$wpdb->prefix."real_shortcodes_groups`");

				?>
				<div class="saved_icons codetype">
					<?php
						foreach ($stored_groups as $group) {
							$group_codes = $wpdb->get_results("SELECT * FROM `".$wpdb->prefix."real_shortcodes` WHERE`appType` = 'icon' AND `group` = '".$group->Id."'");
							echo '<div class="saved_group" grid="'.$group->Id.'"><span class="sgname">'.$group->Name.'</span></div>';
							if(count($group_codes)>0){
								foreach ($group_codes as $gc) {
									echo '<div class="saved_srotcode" sgroup="'.$gc->group.'" style="display:none;"><span class="scname">'.$gc->name.'</span><span class="shortcode_delete" title="delete">&#8212;</span></div>';
								}								
							}
						}
						$stored_codes = $wpdb->get_results("SELECT * FROM `".$wpdb->prefix."real_shortcodes` WHERE `appType` = 'icon' AND (`group` = 0 OR `group` IS NULL)");
						echo '<span class="group_separator"></span>';
						foreach ($stored_codes as $code) {
							echo '<div class="saved_srotcode" sgroup="'.$code->group.'"><span class="scname">'.$code->name.'</span><span class="shortcode_delete" title="delete">&#8212;</span></div>';
						}
					?>
				</div>		
				<div class="saved_images codetype">
					<?php
						$ext_images_loaded = array();
						foreach ($stored_groups as $group) {
							$group_codes = $wpdb->get_results("SELECT * FROM `".$wpdb->prefix."real_shortcodes` WHERE`appType` = 'image' AND `group` = '".$group->Id."'");
							echo '<div class="saved_group" grid="'.$group->Id.'"><span class="sgname">'.$group->Name.'</span></div>';
							if(count($group_codes)>0){
								foreach ($group_codes as $gc) {
									echo '<div class="saved_srotcode" sgroup="'.$gc->group.'" style="display:none;"><span class="scname">'.$gc->name.'</span><span class="shortcode_delete" title="delete">&#8212;</span></div>';
									$src = $gc->code;
									$src = substr($src, strpos($src, 'src="')+5);
									$src = substr($src,0,strpos($src, '"'));
									if((strpos($src, $plugindirname) == FALSE)&&(!in_array($src, $ext_images_loaded))){
										echo '<script type="text/javascript">jQuery("#r-tabs-images").append(\'<img src="'.$src.'" title="'.basename($src).'">\');</script>';
										$ext_images_loaded[] = $src;
									}									
								}								
							}
						}					
						$stored_codes = $wpdb->get_results("SELECT * FROM `".$wpdb->prefix."real_shortcodes` WHERE `appType` = 'image' AND (`group` = 0 OR `group` IS NULL)");
						$plugindirname = plugin_dir_path( __FILE__);
						$plugindirname = basename(substr($plugindirname, 0,strpos($plugindirname, 'includes')));
						echo '<span class="group_separator"></span>';
						foreach ($stored_codes as $code) {
							echo '<div class="saved_srotcode" sgroup="'.$code->group.'"><span class="scname">'.$code->name.'</span><span class="shortcode_delete" title="delete">&#8212;</span></div>';
							$src = $code->code;
							$src = substr($src, strpos($src, 'src="')+5);
							$src = substr($src,0,strpos($src, '"'));
							if((strpos($src, $plugindirname) == FALSE)&&(!in_array($src, $ext_images_loaded))){
								echo '<script type="text/javascript">jQuery("#r-tabs-images").append(\'<img src="'.$src.'" title="'.basename($src).'">\');</script>';
								$ext_images_loaded[] = $src;
							}
						}			
					?>
				</div>
				<div class="saved_boxes codetype">
					<?php
						foreach ($stored_groups as $group) {
							$group_codes = $wpdb->get_results("SELECT * FROM `".$wpdb->prefix."real_shortcodes` WHERE`appType` = 'box' AND `group` = '".$group->Id."'");
							echo '<div class="saved_group" grid="'.$group->Id.'"><span class="sgname">'.$group->Name.'</span></div>';
							if(count($group_codes)>0){
								foreach ($group_codes as $gc) {
									echo '<div class="saved_srotcode" sgroup="'.$gc->group.'" style="display:none;"><span class="scname">'.$gc->name.'</span><span class="shortcode_delete" title="delete">&#8212;</span></div>';
								}								
							}
						}
						$stored_codes = $wpdb->get_results("SELECT * FROM `".$wpdb->prefix."real_shortcodes` WHERE `appType` = 'box' AND (`group` = 0 OR `group` IS NULL)");
						echo '<span class="group_separator"></span>';
						foreach ($stored_codes as $code) {
							echo '<div class="saved_srotcode" sgroup="'.$code->group.'"><span class="scname">'.$code->name.'</span><span class="shortcode_delete" title="delete">&#8212;</span></div>';
						}			
					?>
				</div>
				<div class="saved_buttons codetype">
					<?php
						foreach ($stored_groups as $group) {
							$group_codes = $wpdb->get_results("SELECT * FROM `".$wpdb->prefix."real_shortcodes` WHERE`appType` = 'button' AND `group` = '".$group->Id."'");
							echo '<div class="saved_group" grid="'.$group->Id.'"><span class="sgname">'.$group->Name.'</span></div>';
							if(count($group_codes)>0){
								foreach ($group_codes as $gc) {
									echo '<div class="saved_srotcode" sgroup="'.$gc->group.'" style="display:none;"><span class="scname">'.$gc->name.'</span><span class="shortcode_delete" title="delete">&#8212;</span></div>';
								}								
							}
						}					
						$stored_codes = $wpdb->get_results("SELECT * FROM `".$wpdb->prefix."real_shortcodes` WHERE `appType` = 'button' AND (`group` = 0 OR `group` IS NULL)");
						echo '<span class="group_separator"></span>';
						foreach ($stored_codes as $code) {
							echo '<div class="saved_srotcode" sgroup="'.$code->group.'"><span class="scname">'.$code->name.'</span><span class="shortcode_delete" title="delete">&#8212;</span></div>';
						}			
					?>					
				</div>
		</div>
		<div class="res_container" style="height:52px;">
			<div class="button" id="real_shortcode_save_as">Save Code</div>
		</div>
	</div>
	<div class="res_container">
		Shortcode: <textarea id="real_shortcode" rows="3" readonly="readonly"></textarea>
		<input type="hidden" id="generate_shortcode"/>
	</div>
	<div id="manage_groups_dialog" style="display:none;z-index:100;">
		<select id="real_shortcode_groups" size="4" style="width: 200px;height: 120px;">
		<?php
			$stored_codes_groups = $wpdb->get_results("SELECT `Id`,`Name` FROM `".$wpdb->prefix."real_shortcodes_groups`");
			foreach ($stored_codes_groups as $group) {
				echo '<option value="'.$group->Id.'">'.$group->Name.'</option>';
			}
		?>			
		</select>
		<div class="button edit_right" id="real_manage_groups_add">Add</div>
		<div class="button edit_right" id="real_manage_groups_edit">Edit</div>
		<div class="button edit_right" id="real_manage_groups_remove">Remove</div>
		<br/>
		<div class="button " id="real_manage_groups_save">Save</div>
		<div class="button " id="real_manage_groups_cancel">Cancel</div>
	</div>
	<div id="real_shortcodes_dialog_save" style="display:none;">
		<label for="real_shortcode_save_group">Select Group:</label>
		<select id="real_shortcode_save_group">
			<option value="0">None</option>
		<?php
			$stored_codes_groups = $wpdb->get_results("SELECT `Id`,`Name` FROM `".$wpdb->prefix."real_shortcodes_groups`");
			foreach ($stored_codes_groups as $group) {
				echo '<option value="'.$group->Id.'">'.$group->Name.'</option>';
			}
		?>
		</select><div class="button" id="real_shortcode_manage_groups">Add Group</div><br/>
		<label for="real_shortcode_savename">Enter Name:</label>
		<input id="real_shortcode_savename" /><br/>
		<div class="button" id="real_shortcode_save">Save</div>
		<div class="button" id="real_shortcode_cancel">Cancel</div>
	</div>	
</div>