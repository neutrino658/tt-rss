require(['dojo/_base/kernel', 'dojo/ready'], function  (dojo, ready) {
	ready(function () {

		PluginHost.register(PluginHost.HOOK_HEADLINE_RENDERED, function (row) {
			if (row) {
				//console.log("------->HOOK_HEADLINE_RENDERED: " +row.id);
				tw = row.select(".titleWrap")[0];
				if (tw) {
					//console.log("-------> titleWrap gefunden");
					ex = tw.select(".excerpt")[0];
					if (ex) {
						//console.log("-------> excerpt gefunden");
						tw.removeAttribute("onclick");
						ex.setAttribute('onclick', "return Headlines.click(event, " +row.getAttribute('data-article-id')+")");
					}
				}
				
				if (App.isCombinedMode()) {
				//console.log("-------> isCombinedMode");
				//row.innerHTML += '<div id="m-prev" style="display:none" title="Previous Post" onclick="Headlines.move(\'prev\',true)"><span>prev</span></div>';
				//row.innerHTML += '<div id="m-next" style="display:none" title="Next Post"     onclick="Headlines.move(\'next\',true)"><span >next</span></div>';	
				
					var node = document.createElement("div");
					node.setAttribute('id','m-prev');
					node.setAttribute('title', "Previous Post");
					node.setAttribute('onclick', "Headlines.move(\'prev\',true)");
					node.setAttribute("style", "display: none;");
					node.innerHTML = '<span>prev</span>';
					row.appendChild(node);
					
					node = document.createElement("div");
					node.setAttribute('id','m-next');
					node.setAttribute('title', "Next Post");
					node.setAttribute('onclick', "Headlines.move(\'next\',true)");
					node.setAttribute("style", "display: none;");
					node.innerHTML = '<span>next</span>';
					row.appendChild(node);
			
				}
			}
			return true;
		});
		
		
		
		
		PluginHost.register(PluginHost.HOOK_ARTICLE_RENDERED, function (row) {
			if (row) {
				//console.log("------->HOOK_ARTICLE_RENDERED: " +row.id);
				max_height= "unset";
				post = row.select(".post")[0];
				if (post) {
					max_height=post.offsetHeight
				}
				
				//row.innerHTML += '<div id="m-prev" style="display:none; height:'+ max_height +'px;" title="Previous Post" onclick="Headlines.move(\'prev\',true)"><span>prev</span></div>';
				//row.innerHTML += '<div id="m-next" style="display:none; height:'+ max_height +'px;" title="Next Post"     onclick="Headlines.move(\'next\',true)"><span >next</span></div>';
								
					var node = document.createElement("div");
					node.setAttribute('id','m-prev');
					node.setAttribute('title', "Previous Post");
					node.setAttribute('onclick', "Headlines.move(\'prev\',true)");
					node.setAttribute("style", "display: none; height: "+max_height+"px;");
					node.innerHTML = '<span>prev</span>';
					post.appendChild(node);
					
					node = document.createElement("div");
					node.setAttribute('id','m-next');
					node.setAttribute('title', "Next Post");
					node.setAttribute('onclick', "Headlines.move(\'next\',true)");
					node.setAttribute("style", "display: none; height: "+max_height+"px;");
					node.innerHTML = '<span>next</span>';
					post.appendChild(node);
			}
			return true;
		});
	});
});