<?php
class mein_preview_image extends Plugin {
	private $host;

	function about() {
		return array(1.0,
			"show  Image in Artikel Preview",
			"meine");
	}

	function init($host) {
		$this->host = $host;
		$host->add_hook($host::HOOK_QUERY_HEADLINES, $this);
	}

	function get_js() {

	}
	
	function HOOK_QUERY_HEADLINES($line) {
		$line["content_preview"] =  truncate_string(strip_tags($line["content"]), 250);
		if (!empty($line["content"])) {	
			$dom = new DOMDocument;
			$dom->strictErrorChecking = FALSE;
			$not_supported_image = array('gif');
			
			if (@$dom->loadHTML($line["content"])) {
				$content_preview_image = "";
				$m_images = $dom->getElementsByTagName('img');	
				if ( 0 < $m_images->length) {
					foreach ($m_images as $m_image) {
						$src = explode(".", $m_image->getAttribute('src'));
						$ext = end($src);
						if (!in_array($ext, $not_supported_image)) {
							$content_preview_image = "<span class='cdmExcerptImage' style='display: none;'><img src='".$m_image->getAttribute('src')."' title='".$m_image->getAttribute('title')."' /></span>";
							break;
						}
					}
				} else {
					$m_enclosures = Article::get_article_enclosures($line["id"]);
					if (!empty($m_enclosures)) {
						foreach ($m_enclosures as $m_image) {
							$url = $m_image["content_url"];
							$ctype = $m_image["content_type"];
							$title = $m_image["title"];
							$width = $m_image["width"];
							$height = $m_image["height"];
							$src = explode(".", $m_image["content_url"]);
							$ext = end($src);
							if (!in_array($ext, $not_supported_image)) {
								$content_preview_image = "<span class='cdmExcerptImage' style='display: none;'><img src='".$m_image["content_url"]."' title='".$m_image["title"]."' /></span>";
								break;
							}
						}
					}
				}
				$line["content_preview"] .=	$content_preview_image;				
			}
		}
		return $line;
	}
	
	function api_version() {
		return 2;
	}

}