<div id="dialog_preview_shortcode" class="postbox">
	<div class="sc_preview"></div>
	<div id="sc_params">
            <span class="rgeneral_section">
            <span class="sizes_section">
                  <label for="sc_width">Width:</label><input type="number" value="64" id="sc_width"/>
                  <label for="sc_header_height" style="">Header Height:</label><input type="number" value="25" id="sc_header_height" style=""/>
                  <label for="sc_height">Height:</label><input type="number" value="64" id="sc_height"/>
                  <label for="sc_footer_height" style="">Footer Height:</label><input type="number" value="25" id="sc_footer_height" style=""/>
		</span>
            <label for="sc_fontsize">Size:</label><input type="number" value="32" id="sc_fontsize"/>
		<label for="sc_title">Title:</label><input type="text" id="sc_title"/>            
            <span class="color_section">
                  <label for="sc_color_header" >Color:</label><input type="text" class="scolorpicker" id="sc_color_header" /><span id="sc_clear_color_header" class="clearcolor button">clear</span>
                  <label for="sc_color" >Color:</label><input type="text" class="scolorpicker" id="sc_color" /><span id="sc_clear_color" class="clearcolor button">clear</span>
                  <label for="sc_color_footer" >Color:</label><input type="text" class="scolorpicker" id="sc_color_footer" /><span id="sc_clear_color_footer" class="clearcolor button">clear</span>
      		<label for="sc_bg">BG:</label><input type="text" class="scolorpicker" id="sc_bg"/><span id="sc_clear_bg" class="clearcolor button">clear</span>
      		<label for="sc_link">Link:</label><input type="text" id="sc_link"/>
                  <label for="sc_link_type">Link Type:</label><select id="sc_link_type">
                  <option value="_blank">Blank</option>
                  <option value="_self">Self</option>
                  </select>
            </span>
            <span class="image_section">
                  <a href="#" class="button real_img_button" id="real_sc_imageheader" ptype="boxheader">Header Image</a><a href="#" class="button" id="real_sc_imageheader_clear">Clear</a>
                  <a href="#" class="button real_img_button" id="real_sc_imagestage" ptype="boxstage">Body Image</a><a href="#" class="button" id="real_sc_imagestage_clear">Clear</a>
                  <a href="#" class="button real_img_button" id="real_sc_imagefooter" ptype="boxfooter">Footer Image</a><a href="#" class="button" id="real_sc_imagefooter_clear">Clear</a>                  
            </span>
            </span>
            <span class="rcss_section">
            <label for="sc_rollover">Rollover:</label>
            <select id="sc_rollover">
            <option value="No Effect">No Effect</option>
            <option value="effect_bandw">B&W</option>
		</select>
		<label for="sc_transition" title="Click For Preview">Transition:</label>
		<select id="sc_transition">
            <option value="No Effect">No Effect</option>
            <option value="effect_flip">Flip</option>
            <option value="effect_flipInX">FlipInX</option>
            <option value="effect_flipInY">FlipInY</option>
           
           
            <option value="effect_slideInUp">SlideInUp</option>
		</select>
            <label for="sc_shadow">Shadow:</label>
            <select id="sc_shadow">
            <option value="No Shadow">No Shadow</option>
            <option value="WarpShadow RWLarge RWDark smallBox">Warp</option>
           
            <option value="BottomShadow BSmall BDark">Bottom Dark</option>
            </select>            
            <label for="sc_round_corner">Radius:</label><input type="number" style="margin-left: 4px;" id="sc_round_corner" value="0"/>
            <label for="sc_circle_bg">Circle BG:</label><input type="checkbox" id="sc_circle_bg"/><br/>
            <label for="sc_bg_padding">BG Padding:</label><input type="number" value="10" id="sc_bg_padding"/>
            </span>
            <span class="css_include_section">
            <label for="sc_css_include_header">CSS Header:</label><textarea id="sc_css_include_header"></textarea>
            <label for="sc_css_include">CSS Style:</label><textarea id="sc_css_include"></textarea>
            <label for="sc_css_include_footer">CSS Footer:</label><textarea id="sc_css_include_footer"></textarea>
            </span>
            <span class="rcontent_section">
            <textarea id="sc_headline_text" placeholder="Headline Text" style="width:225px;height:30px;"></textarea>
            <textarea id="sc_content_text" placeholder="Content Text" style="width:225px;height:130px;"></textarea>
            </span>
	</div>
      <span id="real_shortcodes_zoom"></span><span id="real_shortcodes_zoom_val">100%</span>
</div>