<?php
class RedditImgur extends Plugin {

	private $link;
	private $host;

	function _about() {
		return array(1.0,
			"Inline image links in Reddit RSS feeds",
			"fox");
	}

	function __construct($host) {
		$this->link = $host->get_link();
		$this->host = $host;

		$host->add_hook($host::HOOK_ARTICLE_FILTER, $this);
	}

	function hook_article_filter($article) {

		if (strpos($article["link"], "reddit.com/r/") !== FALSE) {
			if (strpos($article["content"], "i.imgur.com") !== FALSE) {

				$doc = new DOMDocument();
				@$doc->loadHTML($article["content"]);

				if ($doc) {
					$xpath = new DOMXPath($doc);
					$entries = $xpath->query('(//a[@href]|//img[@src])');

					foreach ($entries as $entry) {
						if ($entry->hasAttribute("href")) {
							if (preg_match("/\.(jpg|jpeg|gif|png)$/i", $entry->getAttribute("href"))) {

							 	$img = $doc->createElement('img');
								$img->setAttribute("src", $entry->getAttribute("href"));

								$entry->parentNode->replaceChild($img, $entry);
							}
						}

						// remove tiny thumbnails
						if ($entry->hasAttribute("src")) {
							if ($entry->parentNode && $entry->parentNode->parentNode) {
								$entry->parentNode->parentNode->removeChild($entry->parentNode);
							}
						}
					}

					$node = $doc->getElementsByTagName('body')->item(0);

					if ($node) {
						$article["content"] = $doc->saveXML($node, LIBXML_NOEMPTYTAG);
					}
				}
			}
		}

		return $article;
	}
}
?>
