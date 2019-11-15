<?php
class mein_fix extends Plugin {
	private $host;

	function about() {
		return array(1.0,
			"fix",
			"meine");
	}

	function init($host) {
		$this->host = $host;
		
		$host->add_hook($host::HOOK_RENDER_ARTICLE, $this);
		$host->add_hook($host::HOOK_RENDER_ARTICLE_CDM, $this);
	}
	
	function hook_render_article($article) {
		return $this->hook_render_article_cdm($article);
	}
	
	function hook_render_article_cdm($article, $api_mode = false) {		
		if (strpos($article["link"], "ignant.com/") !== FALSE) {
			$doc = new DOMDocument();
			if (@$doc->loadHTML($article["content"])) {
				$xpath = new DOMXPath($doc);
				$imgs = $xpath->query("//img[@src]");

				foreach ($imgs as $img) {
					$img->removeAttribute("srcset");
				}
			}
			$article["content"] = $doc->saveHTML();
		}
		
		return $article;
	}
	
	
	
	
	function get_js() {
		return file_get_contents(__DIR__ . "/init.js");
	}
	
	function api_version() {
		return 2;
	}

}