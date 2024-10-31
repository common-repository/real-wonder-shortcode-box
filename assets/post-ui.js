jQuery(function($){
	$('#real_shortcodes_dialog_open').click(function(event) {
		$('#real_shortcodes_dialog').fadeIn(500);
	});
	$('#real_shortcodes_dialog .closebtn').click(function(event) {
		event.stopPropagation();
		$('#real_shortcodes_dialog').fadeOut(500);
	});
	$('#real_shortcodes_dialog .rtabs>span').not('.rtabs-selector').click(function(event) {
		$('#real_shortcodes_dialog .rheader .box_tabs').remove();
		$('#real_shortcodes_dialog #sc_params .raccordion').next().show();
		$('#real_shortcodes_dialog #sc_params .raccordion').remove();
		$('#real_shortcodes_dialog #sc_params .sizes_section, #real_shortcodes_dialog #sc_params .color_section').show();
		$('#real_shortcodes_dialog .rgeneral_section, #real_shortcodes_dialog .rcss_section, #real_shortcodes_dialog .css_include_section').css('display','block');
		$(this).parent().find('>span').removeClass('active');
		$(this).addClass('active');
		$('#real_shortcodes_dialog .tab').hide();
		$('#dialog_preview_shortcode').hide();
		$('#real_shortcodes_dialog #real_shortcode').html('');
		$('#real_shortcodes_dialog .tab[id="'+$(this).attr('rtab')+'"]').show();
		$('#real_shortcodes_dialog #rtab_filter').keyup();
		$('#real_shortcodes_dialog .saved_codes .codes_container>div.codetype').hide();
		$('#real_shortcodes_dialog .saved_codes .saved_'+($(this).attr('rtab').replace('r-tabs-',''))).fadeIn(500);
	});
	$('#real_shortcodes_dialog #rtab_filter_button').click(function(event) {
		$('#real_shortcodes_dialog #rtab_filter').toggle(800,function(){
			$('#real_shortcodes_dialog #rtab_filter').focus();
		});
	});
	function real_shortcodes_groups_refresh(){

		$('#real_shortcodes_dialog .saved_group').unbind('click');
		$('#real_shortcodes_dialog .saved_group').click(function(event) {
			var codes = $(this).nextUntil('.saved_group,.group_separator');
			codes.toggle(500);
		});
		$('#real_shortcodes_dialog .saved_group').each(function(index, el) {
			var codes = $(this).nextUntil('.saved_group,.group_separator');
			if(codes.length == 0){
				$(this).hide();
			}else{
				$(this).show();
			}
		});
	}
	real_shortcodes_groups_refresh();
	$('#real_shortcodes_dialog #rtab_filter').focusout(function(event) {
		if($(this).val() == ''){
			$(this).toggle(800);
		}
	});
	$('#real_shortcodes_dialog #real_manage_groups_remove').click(function(event) {
		var selected = $('#real_shortcodes_dialog #real_shortcode_groups option:selected');
		if(selected.length){
			if(confirm('Do you really want to delete `'+selected.html()+'` group')){
				selected.remove();
			}
		}
	});
	$('#real_shortcodes_dialog #real_shortcode_manage_groups').click(function(event) {
		$('#real_shortcodes_dialog #manage_groups_dialog').show();
		$('#real_shortcodes_dialog #real_shortcode_groups').html($('#real_shortcodes_dialog #real_shortcode_save_group').html());
		$('#real_shortcodes_dialog #real_shortcode_groups option[value="0"]').remove();
	});
	$('#real_manage_groups_save').click(function(event) {
		var obj = new Array();
		$('#real_shortcodes_dialog #real_shortcode_groups option').each(function(index, el) {
			obj.push( {'id' : $(this).attr('value'), 'name' : $(this).html()});
		});
		$.post(ajaxurl, {'r_action': 'save_sc_groups', 'groups':JSON.stringify(obj) , 'action' : 'real_shorcodes_backend_ajax'}, function(data, textStatus, xhr) {
			$('#real_shortcodes_dialog #real_shortcode_save_group').html('<option value="0">None</option>'+data);
			var current_options = new Array();
			var current_ids = new Array();
			$('#real_shortcodes_dialog #real_shortcode_save_group option').each(function(index, el) {
				if($(this).attr('value') != 0){
					current_options.push({'id' : $(this).attr('value'), 'name' : $(this).html()});
					current_ids.push($(this).attr('value'));
				}
			});
			$.each(current_options, function(index, val) {
				if($('#real_shortcodes_dialog .saved_group[grid="'+this.id+'"]').length == 0){
					$('#real_shortcodes_dialog .codes_container>div').prepend('<div class="saved_group" grid="'+this.id+'"><span class="sgname">'+this.name+'</span></div>');

				}else if($('#real_shortcodes_dialog .saved_group[grid="'+this.id+'"]').length > 0){
					$('#real_shortcodes_dialog .saved_group[grid="'+this.id+'"] .sgname').html(this.name);
				}
			});
			$('#real_shortcodes_dialog .saved_group').each(function(index, el) {
				var group = $(this).attr('grid');
				if(current_ids.indexOf(group) == -1){
					$('#real_shortcodes_dialog .saved_group[grid="'+group+'"]').remove();
					var code_container = $('#real_shortcodes_dialog .saved_srotcode[sgroup="'+group+'"]');
					code_container.attr('sgroup','0');
					code_container.show();
					var pref = $('#dialog_preview_shortcode').attr('codetype');
					if(pref == 'box'){
						pref+='es';
					}else{
						pref+='s';
					}	
					$('#real_shortcodes_dialog .saved_codes .saved_'+pref).append(code_container);

				}
			});
			real_shortcodes_groups_refresh();
			$('#real_manage_groups_cancel').click();
		});
	});
	$('#real_manage_groups_edit').click(function(event) {
		var selected = $('#real_shortcodes_dialog #real_shortcode_groups option:selected');
		if(selected.length){
			var name = prompt('Enter wew group name:',selected.html());
			if(name.length>0){
				selected.html(name);
			}			
		}
	});
	$('#real_shortcodes_dialog #real_manage_groups_add').click(function(event){
		var name = prompt('Enter wew group name:');
		if(name.length>0){
			if($('#real_shortcodes_dialog #real_shortcode_groups option[name="'+name+'"]').length){
				alert('this name is already exists, please choose another name');
			}else{
				$('#real_shortcodes_dialog #real_shortcode_groups').append('<option value="" name="'+name+'">'+name+'</option>')
			}
		}
	});
	$('#real_manage_groups_cancel').click(function(event) {
		$('#real_shortcodes_dialog #manage_groups_dialog').hide();
	});
	$('#real_shortcodes_dialog #rtab_filter').keyup(function(event) {
		var activeTab = $('#real_shortcodes_dialog .tab[id="'+$('#real_shortcodes_dialog .rtabs>span.active').attr('rtab')+'"]');
		var filter = $(this).val();
		if (filter != ''){
			activeTab.find('>span,>img').hide();
			activeTab.find('>span,>img').filter(function() {
        		if($(this).attr('title').toLowerCase().indexOf(filter.toLowerCase()) != -1){
        			return true;
        		}else{
        			return false;
        		}
    		}).fadeIn();
		}else{
			activeTab.find('>span,>img').fadeIn();
		}
	});
	$('#real_shortcodes_dialog #r-tabs-icons .icon').click(function(event) {
		$('label[for="sc_header_height"]').html('Header Height:');
		$('label[for="sc_height"]').html('Height:');
		$('label[for="sc_footer_height"]').html('Footer Height:');		
		$('#dialog_preview_shortcode .sc_preview').html('<span class="'+$(this).attr('class')+'"></span>')
		$('#dialog_preview_shortcode').attr('codetype','icon');
		var params = new Array('sc_fontsize','sc_color','sc_link','sc_link_type','sc_title','sc_bg','sc_transition','sc_rollover','sc_clear_color','sc_clear_bg','sc_circle_bg',
			'sc_bg_padding');
		$('#real_shortcodes_dialog #dialog_preview_shortcode input,#real_shortcodes_dialog #dialog_preview_shortcode select,#dialog_preview_shortcode .button,#real_shortcodes_dialog #dialog_preview_shortcode textarea').each(function(index, el) {
			var ctrl = $(this);
			if(params.indexOf(ctrl.attr('id')) != -1)
			{  
				ctrl.show();
				ctrl.parent().find('label[for="'+ctrl.attr('id')+'"]').show();
				$(this).change();
			}else{
				ctrl.hide();
				ctrl.parent().find('label[for="'+ctrl.attr('id')+'"]').hide();
			}
		});
		$('#dialog_preview_shortcode').fadeIn(500);
	}); 
	$('#real_shortcodes_dialog #r-tabs-buttons #rcreate_button').click(function(event) {
		$('label[for="sc_header_height"]').html('Header Height:');
		$('label[for="sc_height"]').html('Height:');
		$('label[for="sc_footer_height"]').html('Footer Height:');		
		$('#dialog_preview_shortcode .sc_preview').html('<span class="btn_prev">Button</span><span class="css_container"></span>');
		$('#dialog_preview_shortcode').attr('codetype','button');
		var params = new Array('sc_title','sc_css_include','sc_link','sc_link_type','sc_shadow');
		$('#real_shortcodes_dialog #dialog_preview_shortcode input,#real_shortcodes_dialog #dialog_preview_shortcode select,#dialog_preview_shortcode .button,#real_shortcodes_dialog #dialog_preview_shortcode textarea').each(function(index, el) {
			var ctrl = $(this);
			if(params.indexOf(ctrl.attr('id')) != -1)
			{  
				ctrl.show();
				ctrl.parent().find('label[for="'+ctrl.attr('id')+'"]').show();
				$(this).change();
			}else{
				ctrl.hide();
				ctrl.parent().find('label[for="'+ctrl.attr('id')+'"]').hide();
			}
		});
		$('#dialog_preview_shortcode').fadeIn(500);
	}); 	
	$('#real_shortcodes_dialog #r-tabs-images img').click(function(event) {
		$('label[for="sc_header_height"]').html('Header Height:');
		$('label[for="sc_height"]').html('Height:');
		$('label[for="sc_footer_height"]').html('Footer Height:');		
		$('#dialog_preview_shortcode .sc_preview').html('<img src="'+$(this).attr('src').replace('/64','')+'"/>');
		$('#dialog_preview_shortcode .sc_preview').css('font-size','64px');
		$('#dialog_preview_shortcode').attr('codetype','image');
		var params = new Array('sc_width','sc_height','sc_link','sc_link_type','sc_title','sc_bg','sc_transition','sc_rollover','real_sc_imagefromlib','sc_clear_bg','sc_circle_bg',
			'sc_bg_padding');
		$('#real_shortcodes_dialog #dialog_preview_shortcode input,#real_shortcodes_dialog #dialog_preview_shortcode select,#dialog_preview_shortcode .button,#real_shortcodes_dialog #dialog_preview_shortcode textarea').each(function(index, el) {
			var ctrl = $(this);
			if(params.indexOf(ctrl.attr('id')) != -1)
			{  
				ctrl.show();
				ctrl.parent().find('label[for="'+ctrl.attr('id')+'"]').show();
				$(this).change();  
			}else{
				ctrl.parent().find('label[for="'+ctrl.attr('id')+'"]').hide();
				ctrl.hide();
			}
		});
		$('#dialog_preview_shortcode').fadeIn(500);
	});
	$('#real_shortcodes_dialog #r-tabs-boxes').click(function(event) {
		$('#real_shortcodes_dialog .rheader:first').prepend('<div class="box_tabs"><span class="rbox_sizes">General</span><span class="rbox_css">CSS</span><span class="rbox_content">Content</span></div>');
		$('<div class="raccordion">Sizes</div>').insertBefore('#real_shortcodes_dialog .sizes_section');
		$('<div class="raccordion">Background by Color</div>').insertBefore('#real_shortcodes_dialog .color_section');
		$('<div class="raccordion">Background by Image</div>').insertBefore('#real_shortcodes_dialog .image_section');
		$('<div class="raccordion">CSS Include</div>').insertBefore('#real_shortcodes_dialog .css_include_section');
		$('#real_shortcodes_dialog #sc_params .raccordion').each(function(index, el) {
			$(this).next().css('display','none');
			$(this).click(function(event) {
				$('#real_shortcodes_dialog #sc_params').find('.raccordion').next().hide();
				$(this).next().show('slow');
			});
		});
		$('#real_shortcodes_dialog .rheader .box_tabs .rbox_content').click(function(event) {
			$(this).parent().find('.active').removeClass('active');
			$(this).addClass('active');
			$('#real_shortcodes_dialog .rgeneral_section').css('display','none');
			$('#real_shortcodes_dialog .rcss_section').css('display','none');
			$('#real_shortcodes_dialog .css_include_section').css('display','none');
			$('#real_shortcodes_dialog .css_include_section').prev('.raccordion').css('display','none');
			$('#real_shortcodes_dialog .rcontent_section').css('display','block');

		});
		$('#real_shortcodes_dialog .rheader .box_tabs .rbox_sizes').click(function(event) {
			$(this).parent().find('.active').removeClass('active');
			$(this).addClass('active');
			$('#real_shortcodes_dialog .rgeneral_section').css('display','block');
			$('#real_shortcodes_dialog .rcss_section').css('display','none');
			$('#real_shortcodes_dialog .css_include_section').css('display','none');
			$('#real_shortcodes_dialog .rcontent_section').css('display','none');
			$('#real_shortcodes_dialog .css_include_section').prev('.raccordion').css('display','block');
		});
		$('#real_shortcodes_dialog .rheader .box_tabs .rbox_css').click(function(event) {
			$(this).parent().find('.active').removeClass('active');
			$(this).addClass('active');
			$('#real_shortcodes_dialog .rgeneral_section').css('display','none');
			$('#real_shortcodes_dialog .rcontent_section').css('display','none');
			$('#real_shortcodes_dialog .rcss_section').css('display','block');
			$('#real_shortcodes_dialog .css_include_section').prev('.raccordion').css('display','none');
			$('#real_shortcodes_dialog .css_include_section').css('display','none');
		});
		$('#real_shortcodes_dialog .box_tabs>span:first').click();
	});
	$('#real_shortcodes_dialog #r-tabs-boxes .box').click(function(event) {
		$('label[for="sc_header_height"]').html('Header:');
		$('label[for="sc_height"]').html('Body:');
		$('label[for="sc_footer_height"]').html('Footer:');
		$('#dialog_preview_shortcode #sc_bg_padding').val(0);
		$('#dialog_preview_shortcode .sc_preview').html('<span class="real_box_preview"><div class="real_box_header_preview">header</div><div class="real_box_stage_preview">body</div><div class="real_box_footer_preview">footer</div></span><span class="css_container"></span><span class="css_header_container"></span><span class="css_footer_container"></span>');
		var params = null;
		$('#dialog_preview_shortcode').attr('codetype','box');
		params = new Array('sc_height','sc_width','sc_header_height','sc_footer_height','sc_color_header','sc_color_footer','sc_clear_color_header',
		'sc_clear_color_footer','sc_color','sc_clear_color','sc_transition','sc_round_corner','sc_shadow','real_sc_imageheader','real_sc_imageheader_clear','real_sc_imagestage',
			'real_sc_imagestage_clear','real_sc_imagefooter','real_sc_imagefooter_clear','sc_css_include','sc_css_include_header','sc_css_include_footer',
			'sc_headline_text','sc_content_text');
		if(parseInt($('#real_shortcodes_dialog #sc_width').val()) == 64){
			$('#real_shortcodes_dialog #sc_width').val('250');
		}
		if(parseInt($('#real_shortcodes_dialog #sc_height').val()) == 64){
			$('#real_shortcodes_dialog #sc_height').val('250');	
		}		
		$('#real_shortcodes_dialog #dialog_preview_shortcode input,#real_shortcodes_dialog #dialog_preview_shortcode select,#dialog_preview_shortcode .button,#real_shortcodes_dialog #dialog_preview_shortcode textarea').each(function(index, el) {
			var ctrl = $(this);
			if(params.indexOf(ctrl.attr('id')) != -1)
			{  
				ctrl.show();
				ctrl.parent().find('label[for="'+ctrl.attr('id')+'"]').show();
				$(this).change();
			}else{
				ctrl.hide();
				ctrl.parent().find('label[for="'+ctrl.attr('id')+'"]').hide();
			}
		});
		$('#dialog_preview_shortcode').fadeIn(500);
	}); 	
	$('#real_shortcodes_dialog  .real_img_button').click(function(event) {
		event.preventDefault();
		$('#dialog_preview_shortcode').attr('picktype',$(this).attr('ptype'));
	    shortcode_frame.open();		
	});
	$('#real_shortcodes_dialog .scolorpicker').ColorPicker({
		onSubmit: function(hsb, hex, rgb, el) {
			$(el).val('#'+hex);
			$(el).css('background-color','#'+hex);
			$(el).ColorPickerHide();
			$(el).change();
		},
		onBeforeShow: function () {
			$(this).ColorPickerSetColor(this.value);
		}
	})
	.bind('keyup', function(){
		$(this).ColorPickerSetColor(this.value);
	});	
	var preview = $('#dialog_preview_shortcode .sc_preview');
	$('#real_shortcodes_dialog #sc_fontsize').keyup(function(event){
		preview.css('font-size',$(this).val()+'px');
		var elem = preview.find('.icon');
		//centering element
		if(elem.outerHeight()>preview.height()){
			elem.css({'margin-top':-(parseInt(elem.outerHeight()-preview.height())/2)+'px'});
		}else{
			elem.css({'margin-top':'initial'});
		}
		if(elem.outerWidth()>preview.width()){
			elem.css({'margin-left':-(parseInt(elem.outerWidth()-preview.width())/2)+'px'});
		}else{
			elem.css({'margin-left':'initial'});
		}	
		//-----------------
		$('#real_shortcodes_dialog #generate_shortcode').click();
	});
	$('#real_shortcodes_dialog #sc_fontsize').change(function(event) {
		$(this).keyup();
	});
	$('#real_shortcodes_dialog #sc_title').keyup(function(event){
		preview.attr('title',$(this).val());
		if($(this).val() != ''){
			preview.find('.btn_prev').html($(this).val());
		}
		$('#real_shortcodes_dialog #generate_shortcode').click();
	});
	$('#real_shortcodes_dialog #sc_title').change(function(){
		$(this).keyup();
	});
	$('#real_shortcodes_dialog #sc_color').change(function(event){
		if($(this).val() != ''){
			if(!preview.find('.real_box_preview').length){
				preview.css('color',$(this).val()+' !important');
			}else{
				preview.find('.real_box_stage_preview').css('background-color',$(this).val())
				preview.css('color','initial');
			}
		}else{
			if(!preview.find('.real_box_preview').length){
				preview.css('color','initial');
			}else{
				preview.find('.real_box_stage_preview').css('background-color','none');
			}
		}
		$('#real_shortcodes_dialog #generate_shortcode').click();
	});
	$('#real_shortcodes_dialog #sc_color_header').change(function(event) {
		if($(this).val() != ''){
			preview.find('.real_box_header_preview').css('background-color',$(this).val())
		}else{
			preview.find('.real_box_header_preview').css('background-color','none');
		}
		$('#real_shortcodes_dialog #generate_shortcode').click();
	});
	$('#real_shortcodes_dialog #sc_color_footer').change(function(event) {
		if($(this).val() != ''){
			preview.find('.real_box_footer_preview').css('background-color',$(this).val())
		}else{
			preview.find('.real_box_footer_preview').css('background-color','none');
		}
		$('#real_shortcodes_dialog #generate_shortcode').click();
	});
	$('#real_shortcodes_dialog #sc_bg').change(function(event){
		preview.find('>span,>img').css('background-color',$(this).val());
		$('#real_shortcodes_dialog #generate_shortcode').click();
	});
	$('#real_shortcodes_dialog .clearcolor').click(function(event) {
		$(this).prev('input').css('background-color','').val('').change();
	});
	$('#real_shortcodes_dialog #sc_link').keyup(function(event){
		var link = $(this).val();
		var target = $('#real_shortcodes_dialog #sc_link_type').val();
		if(link){
			if(link.indexOf('http://') == -1){
				link = 'http://'+link;
			}			
			if(!preview.find('a').length){
				preview.html('<a href="'+link+'" style="color: inherit;">'+preview.html()+'</a>');
			}else{
				preview.find('a').attr('href',link);
			}
		}
		$('#real_shortcodes_dialog #generate_shortcode').click();
	});
	$('#real_shortcodes_dialog #sc_link').change(function(event) {
		$(this).keyup();
	});
	$('#real_shortcodes_dialog #sc_link_type').change(function(event) {
		$('#real_shortcodes_dialog #sc_link').keyup();
	});
	$('#real_shortcodes_dialog #sc_rollover').change(function(event){
		var effect = $(this).val();
		if(effect != 'No Effect'){
			preview.attr('class','sc_preview '+$(this).val());
		}else{
			preview.attr('class','sc_preview');
		}
		$('#real_shortcodes_dialog #generate_shortcode').click();
	});
	$('#real_shortcodes_dialog #sc_transition').change(function(event){
		var effect = $(this).val();
		if(effect != 'No Effect'){
			var old_style = preview.attr('class');
			preview.attr('class','sc_preview '+effect);
			setTimeout(function(){
				preview.attr('class',old_style);
			},2700);
		}
		$('#real_shortcodes_dialog #generate_shortcode').click();
	});
	$('#real_shortcodes_dialog label[for="sc_transition"]').click(function(event) {
		$('#sc_transition').change();
	});
	$('#real_shortcodes_dialog #sc_width').keyup(function(event){
		preview.find('img,.real_box_stage_preview').css('width',$(this).val()+'px');
		var elem = preview.find('img,.real_box_preview');
		//centering element
		if(elem.outerWidth()>preview.width()){
			elem.css({'margin-left':-(parseInt(elem.outerWidth()-preview.width())/2)+'px'});
		}else{
			elem.css({'margin-left':'initial'});
		}
		//-----------------		
		$('#real_shortcodes_dialog #generate_shortcode').click();
	});
	$('#real_shortcodes_dialog #sc_width').change(function(event) {
		$(this).keyup();
	});
	$('#real_shortcodes_dialog #sc_height').keyup(function(event){
		preview.find('img,.real_box_stage_preview').css('height',$(this).val()+'px');
		var elem = preview.find('img,.real_box_preview');
		//centering element
		if(elem.outerHeight()>preview.height()){
			elem.css({'margin-top':-(parseInt(elem.outerHeight()-preview.height())/2)+'px'});
		}else{
			elem.css({'margin-top':'initial'});
		}
		//-----------------			
		$('#real_shortcodes_dialog #generate_shortcode').click();
	});
	$('#real_shortcodes_dialog #sc_height').change(function(event) {
		$(this).keyup();
	});	
	$('#real_shortcodes_dialog #sc_header_height').keyup(function(event){
		preview.find('.real_box_header_preview').css('height',$(this).val()+'px');
		$('#real_shortcodes_dialog #generate_shortcode').click();
	});
	$('#real_shortcodes_dialog #sc_header_height').change(function(event) {
		$(this).keyup();
	});
	$('#real_shortcodes_dialog #sc_footer_height').keyup(function(event){
		preview.find('.real_box_footer_preview').css('height',$(this).val()+'px');
		$('#real_shortcodes_dialog #generate_shortcode').click();
	});
	$('#real_shortcodes_dialog #sc_footer_height').change(function(event) {
		$(this).keyup();
	});
	$('#real_shortcodes_dialog #sc_circle_bg').change(function(event) {
		if ($(this).is(':checked')){
			preview.find('.icon,img').css('border-radius','50%');
		}else{
			preview.find('.icon,img').css('border-radius','initial');
		}
		$('#real_shortcodes_dialog #generate_shortcode').click();
	});
	$('#real_shortcodes_dialog #sc_bg_padding').change(function(event) {
		preview.find('.icon,img').css('padding',$(this).val()+'px');
		$('#real_shortcodes_dialog #generate_shortcode').click();
		$('#real_shortcodes_dialog #sc_width,#real_shortcodes_dialog #sc_height').change();
	});
	$('#real_shortcodes_dialog #sc_bg_padding').keyup(function(event) {
		$(this).change();
	});
	var prev_compressed_button_css = new Object();
	prev_compressed_button_css.orig = '';
	prev_compressed_button_css.compressed = '';
	var prev_compressed_header_css = new Object();
	prev_compressed_header_css.orig = '';
	prev_compressed_header_css.compressed = '';
	var prev_compressed_footer_css = new Object();
	prev_compressed_footer_css.orig = '';
	prev_compressed_footer_css.compressed = '';		
	$('#real_shortcodes_dialog #generate_shortcode').click(function(event) {
		var shortcode = '[real_'+preview.parent().attr('codetype');
		var params = new Object();
		var codeclose = '';
		switch(preview.parent().attr('codetype')){
			case 'icon':
				params = {'sc_fontsize':'size','sc_title':'title','sc_color':'color',
				'sc_bg':'bg','sc_link':'link','sc_rollover':'rollover','sc_transition':'transition','sc_bg_padding':'bg_size'};
				shortcode += ' icon="'+preview.find('span:first').attr('class').replace('icon icon-','')+'"';
				if($('#real_shortcodes_dialog #sc_circle_bg').is(':checked')){
					shortcode += ' circle_bg="1"';
				}
			break;
			case 'image':
				params = {'sc_width':'width','sc_title':'title','sc_height':'height',
				'sc_bg':'bg','sc_link':'link','sc_rollover':'rollover','sc_transition':'transition','sc_bg_padding':'bg_size'};	
				shortcode += ' src="'+preview.find('img:first').attr('src').replace('/64','')+'"';
				if($('#real_shortcodes_dialog #sc_circle_bg').is(':checked')){
					shortcode += ' circle_bg="1"';
				}				
			break;
			case 'box':
				var himage = $('#real_shortcodes_dialog .real_box_header_preview').css('background-image');
				var bimage = $('#real_shortcodes_dialog .real_box_stage_preview').css('background-image');
				var fimage = $('#real_shortcodes_dialog .real_box_footer_preview').css('background-image');
				if((himage != 'none')&&(himage.indexOf('url') != -1)){
					himage = himage.substring(4,himage.length-1);
					shortcode += ' himage="'+himage+'"';
				}
				if((bimage != 'none')&&(bimage.indexOf('url') != -1)){
					bimage = bimage.substring(4,bimage.length-1);
					shortcode += ' bimage="'+bimage+'"';
				}
				if((fimage != 'none')&&(fimage.indexOf('url') != -1)){
					fimage = fimage.substring(4,fimage.length-1);
					shortcode += ' fimage="'+fimage+'"';
				}
				var compressed_code = '';
				if($('#real_shortcodes_dialog #sc_css_include').val() != prev_compressed_button_css.orig){
					prev_compressed_button_css.orig = $('#real_shortcodes_dialog #sc_css_include').val();
					compressed_code = $.ajax({
										        type: "POST",
										        url: ajaxurl,
										        async: false,
										        data: { 
														'r_action': 'get_compressed', 
														'string':$('#real_shortcodes_dialog #sc_css_include').val(), 
														'action' : 'real_shorcodes_backend_ajax'
										        	}
										    }).responseText;
					prev_compressed_button_css.compressed = compressed_code;
				}else{
					compressed_code = prev_compressed_button_css.compressed;
				}
				if(compressed_code != '') shortcode +=" cssinclude=\""+compressed_code+"\" ";
				//HEADER CSS
				var compressed_code_header = '';
				if($('#real_shortcodes_dialog #sc_css_include_header').val() != prev_compressed_header_css.orig){
					prev_compressed_header_css.orig = $('#real_shortcodes_dialog #sc_css_include_header').val();
					compressed_code_header = $.ajax({
										        type: "POST",
										        url: ajaxurl,
										        async: false,
										        data: { 
														'r_action': 'get_compressed', 
														'string':$('#real_shortcodes_dialog #sc_css_include_header').val(), 
														'action' : 'real_shorcodes_backend_ajax'
										        	}
										    }).responseText;
					prev_compressed_header_css.compressed = compressed_code_header;
				}else{
					compressed_code_header = prev_compressed_header_css.compressed;
				}
				if(compressed_code_header != '') shortcode +=" cssinclude_header=\""+compressed_code_header+"\" ";				
				//FOOTER CSS
				var compressed_code_footer = '';
				if($('#real_shortcodes_dialog #sc_css_include_footer').val() != prev_compressed_footer_css.orig){
					prev_compressed_footer_css.orig = $('#real_shortcodes_dialog #sc_css_include_footer').val();
					compressed_code_footer = $.ajax({
										        type: "POST",
										        url: ajaxurl,
										        async: false,
										        data: { 
														'r_action': 'get_compressed', 
														'string':$('#real_shortcodes_dialog #sc_css_include_footer').val(), 
														'action' : 'real_shorcodes_backend_ajax'
										        	}
										    }).responseText;
					prev_compressed_footer_css.compressed = compressed_code_footer;
				}else{
					compressed_code_footer = prev_compressed_footer_css.compressed;
				}
				if(compressed_code_footer != '') shortcode +=" cssinclude_footer=\""+compressed_code_footer+"\" ";
				params = {'sc_width':'width','sc_height':'bheight','sc_header_height':'hheight',
				'sc_footer_height':'fheight', 'sc_round_corner' : 'rcorner','sc_shadow' : 'shadow','sc_transition':'transition',
				'sc_color_header':'hcolor','sc_color':'bcolor','sc_color_footer' : 'fcolor','sc_headline_text' : 'headline'};
				codeclose = '';
				if($('#real_shortcodes_dialog #sc_content_text').val() != ''){
					codeclose = ']'+$('#real_shortcodes_dialog #sc_content_text').val()+'[/real_box';
				}
			break;
			case 'button':
				params = {'sc_title':'title','sc_link':'link','sc_shadow' : 'shadow'};
				var compressed_code = '';
				if(($('#real_shortcodes_dialog #sc_css_include').val() != '')&&($('#real_shortcodes_dialog #sc_css_include').val() != prev_compressed_button_css.orig)){
					prev_compressed_button_css.orig = $('#real_shortcodes_dialog #sc_css_include').val();
					compressed_code = $.ajax({
										        type: "POST",
										        url: ajaxurl,
										        async: false,
										        data: { 
														'r_action': 'get_compressed', 
														'string':$('#real_shortcodes_dialog #sc_css_include').val(), 
														'action' : 'real_shorcodes_backend_ajax'
										        	}
										    }).responseText;
					prev_compressed_button_css.compressed = compressed_code;
				}else{
					compressed_code = prev_compressed_button_css.compressed;
				}
				shortcode +=" cssinclude=\""+compressed_code+"\" ";
			break;
		}
		$.each(params, function(index, val) {
			 var param_value = $('#'+index).val();
			 if((param_value != '')&&(param_value != 'No Effect')&&(param_value != 'No Shadow')){
				 if(index == 'sc_link'){
					if(param_value.indexOf('http://') == -1){
						param_value = 'http://'+param_value;
					}
					shortcode+=' ltarget="'+$('#sc_link_type').val()+'"';
				 }			 	
				 if((val == 'transition')||(val == 'rollover')){
				 	param_value = param_value.replace('effect_', '');
				 }
				 shortcode+=' '+val+'="'+param_value+'"';
			 }
		});
		shortcode += codeclose;
		shortcode += ']';
		$('#real_shortcodes_dialog #real_shortcode').html(shortcode);
	});
	var shortcode_frame;
    shortcode_frame = wp.media.frames.shortcode_frame = wp.media({
      title: jQuery( this ).data( 'uploader_title' ),
      button: {
        text: jQuery( this ).data( 'uploader_button_text' ),
      },
      multiple: false
    });
    shortcode_frame.on( 'select', function() {
    	attachment = shortcode_frame.state().get('selection').first().toJSON();
    	switch($('#dialog_preview_shortcode').attr('picktype')){
    		case 'image':
		      if($('#dialog_preview_shortcode .sc_preview>img').length){
					$('#dialog_preview_shortcode .sc_preview>img').attr('src',attachment.url);
		      }else{
				$('#real_shortcodes_dialog #r-tabs-images>img:first').click();
				$('#dialog_preview_shortcode .sc_preview>img').attr('src',attachment.url);
		      }
		      $('#dialog_preview_shortcode #sc_width').val(attachment.width);
		      $('#dialog_preview_shortcode #sc_height').val(attachment.height);
		      $('#dialog_preview_shortcode #sc_width,#dialog_preview_shortcode #sc_height').keyup();
		   		break;
		   	case 'boxheader':
		   		preview.find('.real_box_header_preview').css('background-image',"url('"+attachment.url+"')");
		   		break;
		   	case 'boxstage':
		   		preview.find('.real_box_stage_preview').css('background-image',"url('"+attachment.url+"')");
		   		break;		   		
		   	case 'boxfooter':
		   		preview.find('.real_box_footer_preview').css('background-image',"url('"+attachment.url+"')");
		   		break;
    	}
    	$('#real_shortcodes_dialog #generate_shortcode').click();
    });	
	$('#real_shortcodes_dialog #real_sc_imagefromlib').live('click', function( event ){
	 		event.preventDefault();
	 		$('#dialog_preview_shortcode').attr('picktype','image')
	    	shortcode_frame.open();
	  });
	$('#real_shortcodes_dialog #real_sc_imageheader_clear').click(function(event) {
		event.preventDefault();
		preview.find('.real_box_header_preview').css('background-image',"");
		$('#real_shortcodes_dialog #generate_shortcode').click();
	});
	$('#real_shortcodes_dialog #real_sc_imagestage_clear').click(function(event) {
		event.preventDefault();
		preview.find('.real_box_stage_preview').css('background-image',"");
		$('#real_shortcodes_dialog #generate_shortcode').click();
	});
	$('#real_shortcodes_dialog #real_sc_imagefooter_clear').click(function(event) {
		event.preventDefault();
		preview.find('.real_box_footer_preview').css('background-image',"");
		$('#real_shortcodes_dialog #generate_shortcode').click();
	});
	$('#real_shortcodes_dialog #sc_round_corner').keyup(function(event) {
		$('#real_shortcodes_dialog .real_box_header_preview').css({'border-top-left-radius':$(this).val()+'px','border-top-right-radius' : $(this).val()+'px'});
		$('#real_shortcodes_dialog .real_box_footer_preview').css({'border-bottom-left-radius':$(this).val()+'px','border-bottom-right-radius' : $(this).val()+'px'});
		$('#real_shortcodes_dialog #generate_shortcode').click();
	});
	$('#real_shortcodes_dialog #sc_round_corner').change(function(event) {
		$(this).keyup();
	});
	$('#real_shortcodes_dialog #sc_shadow').change(function(event) {
		if($(this).val() != 'No Shadow'){
			preview.find('.real_box_preview').attr('class','real_box_preview '+$(this).val());
			preview.find('.btn_prev').attr('class','btn_prev '+$(this).val());
		}else{
			preview.find('.real_box_preview').attr('class','real_box_preview');
			preview.find('.btn_prev').attr('class','btn_prev');
		}
		$('#real_shortcodes_dialog #generate_shortcode').click();
	});
	$('#real_shortcodes_zoom').noUiSlider({
		start: 1,
		step: 0.1,
		range: {
			'min': 0.1,
			'max': 5
		}
	});
	$('#real_shortcodes_zoom').on({
		slide: function(){
			var zoom = parseFloat($(this).val());
			$('#real_shortcodes_zoom_val').html(parseInt(parseFloat($(this).val())*100)+'%');
			  var mlt = parseFloat($(this).val()).toFixed(1);
			  var selector = preview.find('span:first,img:first');
			 /*selector.css({'-webkit-transform' : 'scale('+mlt+')','-webkit-transform-origin':'left top'});
			     selector.css({'-moz-transform' : 'scale('+mlt+')','-moz-transform-origin':'left top'});
			      selector.css({'-ms-transform' : 'scale('+mlt+')','-ms-transform-origin':'left top'});
			       selector.css({'-o-transform' : 'scale('+mlt+')','-o-transform-origin':'left top'});
			          selector.css({'transform' : 'scale('+mlt+')','transform-origin':'left top'});*/
				selector.css({'-webkit-transform' : 'scale('+mlt+')'});
			     selector.css({'-moz-transform' : 'scale('+mlt+')'});
			      selector.css({'-ms-transform' : 'scale('+mlt+')'});
			       selector.css({'-o-transform' : 'scale('+mlt+')'});
			          selector.css({'transform' : 'scale('+mlt+')'});			          
		}
	});
	$('#real_shortcodes_dialog #real_shortcode_save_as').click(function(event) {
		if($('#real_shortcodes_dialog #real_shortcode').val() != ''){
			$('#real_shortcodes_dialog_save').fadeIn(500);
		}else{
			alert('Select some code first');
		}
	});
	$('#real_shortcodes_dialog #real_shortcode_cancel').click(function(event) {
		$('#real_shortcodes_dialog_save').hide();
	});
	$('#real_shortcodes_dialog #real_shortcode_save').click(function(event) {
		var code = $('#real_shortcodes_dialog #real_shortcode_savename').val().trim();
		var nameRegex = /^[a-zA-Z0-9_]+$/;
    	if(code.match(nameRegex) == null){
        	alert("Your code name is not valid. Only characters, numbers and '_' symbol accepted");
	    }else{
	    	var BackendData = new Object();
			$('#real_shortcodes_dialog #dialog_preview_shortcode input,#real_shortcodes_dialog #dialog_preview_shortcode select,#dialog_preview_shortcode .button,#real_shortcodes_dialog #dialog_preview_shortcode textarea').each(function(index, el) {
				if($(this).css('display') != 'none'){
					if($(this).is(':checkbox')){
						BackendData[$(this).attr('id')] = $(this).is(':checked');
					}else{
						BackendData[$(this).attr('id')] = $(this).val();
					}
				}
			});
	    	$.post(ajaxurl, {'r_action': 'is_exists', 'name':code , 'action' : 'real_shorcodes_backend_ajax'}, function(data, textStatus, xhr) {
	    		var fullcode = $('#real_shortcode').val();
	    		/*if($('#dialog_preview_shortcode').attr('codetype') == 'box'){
	    			fullcode = fullcode.substr(0, fullcode.indexOf('Your Text'));
	    		}*/
	    		if(data == 'exists'){
	    			alert('This shortcode name is not avaliable to use.');
	    		}else if(data == 'exists_real'){
	    			if(confirm('This shortcode name is exist into plugin, do you want to rewrite it?')){
	    				$.post(ajaxurl, {'r_action': 'update_shortcode','group':$('#real_shortcode_save_group').attr('value'), 'name':code,'full_code' : fullcode, 'appType' : $('#dialog_preview_shortcode').attr('codetype'),'backendData':JSON.stringify(BackendData), 'action' : 'real_shorcodes_backend_ajax'}, function(data, textStatus, xhr) {
	   						$('#real_shortcodes_dialog_save').hide();
	   						$('#real_shortcodes_dialog .saved_codes .scname').each(function(index, el) {
								if($(this).html() == code){
									var code_container = $(this).parent();
									var group = $('#real_shortcode_save_group').attr('value');
									code_container.attr('sgroup',group);
										var pref = $('#dialog_preview_shortcode').attr('codetype');
										if(pref == 'box'){
											pref+='es';
										}else{
											pref+='s';
										}			
									if((group != "")&&(parseInt(group)>0)){
										code_container.css('display',$('#real_shortcodes_dialog .saved_codes .saved_'+pref+' .saved_group[grid="'+group+'"]').next().css('display'));
										$('#real_shortcodes_dialog .saved_codes .saved_'+pref+' .saved_group[grid="'+group+'"]').after(code_container);
									}else{
										$('#real_shortcodes_dialog .saved_codes .saved_'+pref).append(code_container);
									}
									real_shortcodes_groups_refresh();
								}
								return;
							});
	    				});
	    			}
	    		}else if(data == 'avaliable'){
    				$.post(ajaxurl, {'r_action': 'save_shortcode','group':$('#real_shortcode_save_group').attr('value'),'name':code,'full_code' : fullcode, 'appType' : $('#dialog_preview_shortcode').attr('codetype'),'backendData':JSON.stringify(BackendData), 'action' : 'real_shorcodes_backend_ajax'}, function(data, textStatus, xhr) {
   						var append_html = '<div class="saved_srotcode"><span class="scname">'+code+'</span><span class="shortcode_delete" title="delete">&#8212;</span></div>';
   						var p = null;
   						switch($('#dialog_preview_shortcode').attr('codetype')){
   							case 'box':
   								p = $('#real_shortcodes_dialog .saved_codes .saved_boxes');
   								p.append(append_html);
   							break;
   							case 'icon':
   								p = $('#real_shortcodes_dialog .saved_codes .saved_icons')
   								p.append(append_html);
   							break;
   							case 'image':
   								p = $('#real_shortcodes_dialog .saved_codes .saved_images');
   								p.append(append_html);
   							break;
   							case 'button':
   								p = $('#real_shortcodes_dialog .saved_codes .saved_buttons');
   								p.append(append_html);
   							break;   							
   						}
						p.find('.shortcode_delete:last').click(function(event) {
							var sc = $(this);
							var name = sc.parent().find('.scname').html();
							if(confirm('Do you really want to delete shortcode "'+name+'"?')){
								$.post(ajaxurl, {'r_action': 'delete_shortcode','name':name,'action' : 'real_shorcodes_backend_ajax'}, function(data, textStatus, xhr) {
									if(data == 'deleted'){
										sc.parent().remove();
									}
								});
							}
						});
						p.find('.saved_srotcode:last').click(function(event) {
							var name = $(this).find('.scname').html();
							load_real_shortcode(name);							
						});
   						$('#real_shortcodes_dialog .saved_codes .scname').each(function(index, el) {
							if($(this).html() == code){
								var code_container = $(this).parent();
								var group = $('#real_shortcode_save_group').attr('value');
								code_container.attr('sgroup',group);
									var pref = $('#dialog_preview_shortcode').attr('codetype');
									if(pref == 'box'){
										pref+='es';
									}else{
										pref+='s';
									}			
								if((group != "")&&(parseInt(group)>0)){
									code_container.css('display',$('#real_shortcodes_dialog .saved_codes .saved_'+pref+' .saved_group[grid="'+group+'"]').next().css('display'));
									$('#real_shortcodes_dialog .saved_codes .saved_'+pref+' .saved_group[grid="'+group+'"]').after(code_container);
								}else{
									$('#real_shortcodes_dialog .saved_codes .saved_'+pref).append(code_container);
								}
								real_shortcodes_groups_refresh();
							}
							return;
						});
   						$('#real_shortcodes_dialog_save').hide();
    				});
	    		}
	    	});
	    }
	});
$('#real_shortcodes_dialog .saved_codes .saved_srotcode .shortcode_delete').click(function(event) {
	var sc = $(this);
	var name = sc.parent().find('.scname').html();
	if(confirm('Do you really want to delete shortcode "'+name+'"?')){
		$.post(ajaxurl, {'r_action': 'delete_shortcode','name':name,'action' : 'real_shorcodes_backend_ajax'}, function(data, textStatus, xhr) {
			if(data == 'deleted'){
				sc.parent().remove();
			}
		});
	}
});
function load_real_shortcode(name){
		$.post(ajaxurl, {'r_action': 'get_shortcode','name':name,'action' : 'real_shorcodes_backend_ajax'}, function(data, textStatus, xhr) {
			var obj = jQuery.parseJSON(data);
			var backendData = jQuery.parseJSON(obj.backendData);
			$('#real_shortcodes_dialog #sc_headline_text,#real_shortcodes_dialog #sc_content_text').val('');
			$.each(backendData, function(index, val) {
				var elem = $('#real_shortcodes_dialog').find('#'+index);
				if(elem.is(':checkbox')){
					elem.prop('checked', val);
				}
				else{
					elem.val(val);
				}
				if(elem.hasClass('scolorpicker')){
					elem.css('background-color',val);
				}
			});
			switch(obj.appType){
				case 'icon':
					var iclass = obj.code;
					iclass = iclass.substr(iclass.indexOf('icon="')+6);
					iclass = iclass.substr(0,iclass.indexOf('"'));
					$('#real_shortcodes_dialog #r-tabs-icons .icon.icon-'+iclass).click();
				break;
				case 'image':
					var img = obj.code;
					img = img.substr(img.indexOf('src="')+5);
					img = img.substr(0,img.indexOf('"')).split('/').reverse()[0];
					img = img.substring(0,img.indexOf('.'));
					if($('#real_shortcodes_dialog #r-tabs-images img[title="'+img+'"]').length){
						$('#real_shortcodes_dialog #r-tabs-images img[title="'+img+'"]').click();
					}else{
						$('#real_shortcodes_dialog #r-tabs-images img:first').click();
						var img = obj.code;
						img = img.substr(img.indexOf('src="')+5);
						img = img.substr(0,img.indexOf('"'));
						$('#dialog_preview_shortcode .sc_preview>img').attr('src',img);
					}
				break;
				case 'box':
					$('#real_shortcodes_dialog .rtabs span[rtab="r-tabs-boxes"]').click();
					$('#real_shortcodes_dialog #r-tabs-boxes .box').click();
					/*** images section ***/
					var imageheader = '';
					if(obj.code.indexOf('himage="') != -1){
						imageheader = obj.code;
						imageheader = imageheader.substr(imageheader.indexOf('himage="')+8);
						imageheader = imageheader.substr(0,imageheader.indexOf('"'));
					}
					var imagebody = '';
					if(obj.code.indexOf('bimage="') != -1){
						imagebody = obj.code;
						imagebody = imagebody.substr(imagebody.indexOf('bimage="')+8);
						imagebody = imagebody.substr(0,imagebody.indexOf('"'));
					}
					var imagefooter = '';
					if(obj.code.indexOf('fimage="') != -1){
						imagefooter = obj.code;
						imagefooter = imagefooter.substr(imagefooter.indexOf('fimage="')+8);
						imagefooter = imagefooter.substr(0,imagefooter.indexOf('"'));						
					}
					/**********************/
					if(imageheader != ''){
						preview.find('.real_box_header_preview').css('background-image',"url('"+imageheader+"')");
					}
					if(imagebody != ''){
						preview.find('.real_box_stage_preview').css('background-image',"url('"+imagebody+"')");
					}
					if(imagefooter != ''){
						preview.find('.real_box_footer_preview').css('background-image',"url('"+imagefooter+"')");
					}
					$('#real_shortcodes_dialog #sc_content_text,#real_shortcodes_dialog #sc_headline_text').keyup();
				break;
				case 'button':
					$('#real_shortcodes_dialog #rcreate_button').click();
				break;
			}
			$('#real_shortcodes_dialog #generate_shortcode').click();
			$('#real_shortcodes_dialog #real_shortcode_savename').val(name);
			$('#real_shortcodes_dialog .saved_codes .scname').each(function(index, el) {
				if($(this).html() == name){
					var group = $(this).parent().attr('sgroup');
					if(group == '') group = 0;
					$('#real_shortcode_save_group').val(group);	
				}
			});
		});
	}
	$('#real_shortcodes_dialog .saved_codes .saved_srotcode').click(function(event) {
		var name = $(this).find('.scname').html();
		load_real_shortcode(name);
	});
	$('#real_shortcodes_dialog #sc_css_include').keyup(function(event) {
		var code = $(this).val();
		code = code.replace(/.button/g, ".sc_preview .btn_prev");
		if(preview.find('.real_box_preview').length){
			preview.find('.css_container').html('<style type="text/css">.real_box_stage_preview{'+code+'}</style>');
		}else{
			preview.find('.css_container').html('<style type="text/css">'+code+'</style>');
		}
		$('#real_shortcodes_dialog #generate_shortcode').click();
	});
	$('#real_shortcodes_dialog #sc_css_include').change(function(event) {
		$(this).keyup();
	});
	$('#real_shortcodes_dialog #sc_css_include_header').keyup(function(event) {
		var code = $(this).val();
		code = code.replace(/.button/g, ".sc_preview .btn_prev");
		if(preview.find('.real_box_preview').length){
			preview.find('.css_header_container').html('<style type="text/css">.real_box_header_preview{'+code+'}</style>');
		}else{
			//none
		}
		$('#real_shortcodes_dialog #generate_shortcode').click();
	});
	$('#real_shortcodes_dialog #sc_css_include_header').change(function(event) {
		$(this).keyup();
	});
	$('#real_shortcodes_dialog #sc_css_include_footer').keyup(function(event) {
		var code = $(this).val();
		code = code.replace(/.button/g, ".sc_preview .btn_prev");
		if(preview.find('.real_box_preview').length){
			preview.find('.css_footer_container').html('<style type="text/css">.real_box_footer_preview{'+code+'}</style>');
		}else{
			//none
		}
		$('#real_shortcodes_dialog #generate_shortcode').click();
	});
	$('#real_shortcodes_dialog #sc_css_include_footer').change(function(event) {
		$(this).keyup();
	});	
	$('#real_shortcodes_dialog #sc_headline_text').keyup(function(event) {
		if($(this).val() != ''){
			preview.find('.real_box_header_preview').html($(this).val());
		}else{
			preview.find('.real_box_header_preview').html('header');
		}
		$('#real_shortcodes_dialog #sc_headline_text').click();
	});
	$('#real_shortcodes_dialog #sc_content_text').keyup(function(event) {
		if($(this).val() != ''){
			preview.find('.real_box_stage_preview').html($(this).val());
			preview.find('.real_box_stage_preview').css('text-align','justify');
		}else{
			preview.find('.real_box_stage_preview').html('body');
			preview.find('.real_box_stage_preview').css('text-align','center');
		}
		$('#real_shortcodes_dialog #generate_shortcode').click();
	});	
});