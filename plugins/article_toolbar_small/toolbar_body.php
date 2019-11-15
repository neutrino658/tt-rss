<?php global $link; ?>
<?php
	echo stylesheet_tag("plugins/article_toolbar_small/toolbar_small.css");
	print_user_stylesheet($link)
?>
			<span  class="toolbar_nav" title="Subscribe To Feed" onclick="CommonDialogs.quickAddFeed()"><span class="hgr_image"></span></span>

			<span class="toolbar_nav" title="Mark feed as read" onclick="Feeds.catchupAll()"><span class="hgr_image"></span></span>

			<span class="toolbar_nav" title="Refresh Feed" onclick="Feeds.reloadCurrent()"><span class="hgr_image"></span></span>
			
			<span class="toolbar_nav" title="Previous Post" onclick="Headlines.move('prev',true)"><span class="hgr_image"></span></span>
			
			<span class="toolbar_nav" title="Next Post" onclick="Headlines.move('next',true)"><span class="hgr_image"></span></span>
			

<?php
	if (get_pref('COMBINED_DISPLAY_MODE')) {
		print '	<span id="btn_display_mode" class="toolbar_nav cdmV_true" title="Schlagzeilen anzeigen" onclick="toggle_combined_mode()"><span class="hgr_image"></span></span>';
		if (get_pref('CDM_EXPANDED')) {
			print '	<span id="btn_Vm" class="toolbar_nav cdm_expanded" title="Artikelansicht verringern" onclick="toggle_cdm_expanded()"><span class="hgr_image"></span></span>';
		} else {
			print '	<span id="btn_Vm" class="toolbar_nav cdm_expandable" title="Artikelansicht erweitern" onclick="toggle_cdm_expanded()"><span class="hgr_image"></span></span>';
		}
	}else{
		print '	<span id="btn_display_mode" class="toolbar_nav cdmV_false" title="Artikel anzeigen" onclick="toggle_combined_mode()"><span class="hgr_image"></span></span>
				<span id="btn_Vm" class="toolbar_nav hlV" title="Schlagzeilen verstecken" onclick="collapse_hl()"><span class="hgr_image"></span></span>';
	}
?>

