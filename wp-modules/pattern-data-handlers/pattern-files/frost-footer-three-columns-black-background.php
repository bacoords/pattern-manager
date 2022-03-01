<?php
/**
 * Frost: Footer with text, links, buttons.
 *
 * @package fse-studio
 */

return array(
	'type'          => 'default',
	'title'         => __( 'Footer with text, links, buttons.', 'fse-studio' ),
	'name'          => 'frost-footer-three-columns-black-background',
	'categories'    => array( 'frost-footer' ),
	'viewportWidth' => 1280,
	'content'       => '<!-- wp:group {"align":"full","style":{"elements":{"link":{"color":{"text":"var:preset|color|white"}}},"spacing":{"padding":{"top":"40px","bottom":"40px"}}},"backgroundColor":"black","textColor":"white","className":"has-small-font-size","layout":{"inherit":true}} -->
<div class="wp-block-group alignfull has-small-font-size has-white-color has-black-background-color has-text-color has-background has-link-color" style="padding-top:40px;padding-bottom:40px"><!-- wp:group {"align":"wide","layout":{"type":"flex","allowOrientation":false,"justifyContent":"space-between"}} -->
<div class="wp-block-group alignwide"><!-- wp:paragraph -->
<p>© 2022 Your Company LLC</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="#">Privacy Policy</a> · <a href="#">Terms of Service</a> · <a href="#">Contact Us</a></p>
<!-- /wp:paragraph -->

<!-- wp:social-links {"iconColor":"black","iconColorValue":"#000","iconBackgroundColor":"white","iconBackgroundColorValue":"#fff","className":"is-style-default"} -->
<ul class="wp-block-social-links has-icon-color has-icon-background-color is-style-default"><!-- wp:social-link {"url":"#","service":"facebook"} /-->

<!-- wp:social-link {"url":"#","service":"instagram"} /-->

<!-- wp:social-link {"url":"#","service":"twitter"} /--></ul>
<!-- /wp:social-links --></div>
<!-- /wp:group --></div>
<!-- /wp:group -->',
);
