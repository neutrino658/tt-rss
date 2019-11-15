
	function collapse_hl() {
		try {
			var cIns = $("content-insert");
			if (cIns) {
				if ($('btn_Vm').hasClassName('hl_show')){
					$("btn_Vm").removeClassName("hl_show");	
					$("btn_Vm").addClassName("hl_hide");
					$("btn_Vm").writeAttribute("title", "Schlagzeilen anzeigen");
					
					var headlines = $$("#headlines-wrap-inner")[0];
					if (headlines){
						var splitter = $$("#headlines-wrap-inner > #content-insert_splitter")[0];
						if (splitter){

							var splitter_d = splitter.getDimensions();
							var splitter_h = splitter_d.height;
						} else {
							var splitter_h = 0;
						}
//console.log("nav: splitter_h:" +splitter_h);
						var headlines_d = headlines.getDimensions();
						var headlines_h =  headlines_d.height;
//console.log("nav: headlines_h:" +headlines_h);							
						var activeROW = $$("#headlines-frame > div[id*=RROW].active")[0];
						if (activeROW){
							var activeROW_d = activeROW.getDimensions();
							var activeROW_h =  activeROW_d.height;
//console.log("nav: -activeROW_h:" +activeROW_h);						
							var z = (headlines_h+splitter_h)-activeROW_h-16; // -------------> -16 ???								
//console.log("nav: " +z);									
							dijit.byId("content-insert").domNode.setStyle({height: z+'px'});
						}
					}
				} else {
					$("btn_Vm").removeClassName("hl_hide");
					$("btn_Vm").addClassName("hl_show");
					$("btn_Vm").writeAttribute("title", "Schlagzeilen verstecken");
					dijit.byId("content-insert").domNode.setStyle({height: '50%'});
				}
				dijit.byId("main").resize();
			}
		} catch (e) {
			exception_error("collapse_hl", e);
		}
	}

	function toggle_combined_mode() {
		Notify.progress("toggle_combined, please wait...", true);
		const value = App.isCombinedMode() ? "false" : "true";			
//console.log("nav: App.isCombinedMode(): " + value);
		xhrPost("backend.php", {op: "rpc", method: "setpref", key: "COMBINED_DISPLAY_MODE", value: value}, () => {
			App.setInitParam("combined_display_mode", !App.getInitParam("combined_display_mode"));
//console.log("toggle_combined_mode --getInitParam(combined_display_mode): " + App.getInitParam("combined_display_mode"));
			Article.close();
			Headlines.renderAgain();
			//Feeds.reloadCurrent();
			
			$("btn_Vm").removeClassName("hl_hide");
			$("btn_Vm").removeClassName("hl_show");
			$("btn_Vm").removeClassName("cdm_expandable");
			$("btn_Vm").removeClassName("cdm_expanded");
			
			if (App.getInitParam("combined_display_mode")){	
				$("btn_display_mode").removeClassName("cdmV_false");
				$("btn_display_mode").addClassName("cdmV_true");
				$("btn_display_mode").writeAttribute("title", "Schlagzeilen anzeigen");
				
				$("btn_Vm").removeClassName("hlV");
				$("btn_Vm").addClassName("cdmV");

				if (App.getInitParam("cdm_expanded")){
					$("btn_Vm").removeClassName("cdm_expandable");
					$("btn_Vm").addClassName("cdm_expanded");	
					$("btn_Vm").writeAttribute("title", "Artikelansicht verringern");				
				} else {
					$("btn_Vm").removeClassName("cdm_expanded");
					$("btn_Vm").addClassName("cdm_expandable");
					$("btn_Vm").writeAttribute("title", "Artikelansicht erweitern");
				}
				
				$("btn_Vm").writeAttribute("onclick", "toggle_cdm_expanded()");
			} else {
					$("btn_display_mode").removeClassName("cdmV_true");
					$("btn_display_mode").addClassName("cdmV_false");		
					$("btn_display_mode").writeAttribute("title", "Artikel anzeigen");
					
					$("btn_Vm").removeClassName("cdmV"); 
					$("btn_Vm").addClassName("hlV");
					
					$("btn_Vm").addClassName("hl_show");
					$("btn_Vm").writeAttribute("title", "Schlagzeilen verstecken");
					$("btn_Vm").writeAttribute("onclick", "collapse_hl()");
			}
			Notify.close();				
		});
	};

	function toggle_cdm_expanded() {
		Notify.progress("toggle_cdm_expanded, please wait...", true);
		const value = App.getInitParam("cdm_expanded") ? "false" : "true";
		xhrPost("backend.php", {op: "rpc", method: "setpref", key: "CDM_EXPANDED", value: value}, () => {
			App.setInitParam("cdm_expanded", !App.getInitParam("cdm_expanded"));
			Headlines.renderAgain();
			if (App.getInitParam("cdm_expanded")){
				$("main").removeClassName("expandable");
				$("main").addClassName("expanded");
				$("btn_Vm").removeClassName("cdm_expandable");
				$("btn_Vm").addClassName("cdm_expanded");	
				$("btn_Vm").writeAttribute("title", "Artikelansicht verringern");				
			} else {
				$("main").removeClassName("expanded");
				$("main").addClassName("expandable");
				$("btn_Vm").removeClassName("cdm_expanded");
				$("btn_Vm").addClassName("cdm_expandable");
				$("btn_Vm").writeAttribute("title", "Artikelansicht erweitern");				
			}
			Notify.close();
		});
	};

		

		
