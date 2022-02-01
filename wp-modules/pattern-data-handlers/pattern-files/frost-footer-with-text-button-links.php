<?php
/**
 * Frost: Footer with text, button, links.
 *
 * @package fse-studio
 */

return array(
	'title'         => __( 'Footer with text, button, links.', 'frost' ),
	'name'          => 'frost-footer-with-text-button-links',
	'categories'    => array( 'frost-call-to-action' ),
	'viewportWidth' => 1280,
	'content'       => '<!-- wp:group {"align":"full","style":{"elements":{"link":{"color":{"text":"var:preset|color|white"}}},"typography":{"fontSize":"18px"}},"backgroundColor":"black","textColor":"white","layout":{"inherit":true}} -->
<div class="wp-block-group alignfull has-white-color has-black-background-color has-text-color has-background has-link-color" style="font-size:18px"><!-- wp:columns {"align":"wide","style":{"elements":{"link":{"color":[]}},"spacing":{"padding":{"top":"100px","bottom":"70px"}}}} -->
<div class="wp-block-columns alignwide has-link-color" style="padding-top:100px;padding-bottom:70px"><!-- wp:column {"width":"50%"} -->
<div class="wp-block-column" style="flex-basis:50%"><!-- wp:heading {"level":4} -->
<h4 id="our-company">Our Company</h4>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Lorem ipsum dolor sit amet, consectetur adipiscing lectus. Vestibulum mi justo, luctus eu pellentesque vitae gravida non.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons -->
<div class="wp-block-buttons"><!-- wp:button {"style":{"border":{"radius":0}},"className":"is-style-fill-white"} -->
<div class="wp-block-button is-style-fill-white"><a class="wp-block-button__link no-border-radius" href="#">Learn More</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"5%"} -->
<div class="wp-block-column" style="flex-basis:5%"></div>
<!-- /wp:column -->

<!-- wp:column {"width":"15%"} -->
<div class="wp-block-column" style="flex-basis:15%"><!-- wp:heading {"level":4} -->
<h4 id="about-us">About Us</h4>
<!-- /wp:heading -->

<!-- wp:list {"fontSize":"small"} -->
<ul class="has-small-font-size"><li><a href="#">Start Here</a></li><li><a href="#">Our Mission</a></li><li><a href="#">Brand Guide</a></li><li><a href="#">Newsletter</a></li><li><a href="#">Accessibility</a></li></ul>
<!-- /wp:list --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"15%"} -->
<div class="wp-block-column" style="flex-basis:15%"><!-- wp:heading {"level":4} -->
<h4 id="services">Services</h4>
<!-- /wp:heading -->

<!-- wp:list {"fontSize":"small"} -->
<ul class="has-small-font-size"><li><a href="#">Web Design</a></li><li><a href="#">Development</a></li><li><a href="#">Copywriting</a></li><li><a href="#">Marketing</a></li><li><a href="#">Social Media</a></li></ul>
<!-- /wp:list --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"15%"} -->
<div class="wp-block-column" style="flex-basis:15%"><!-- wp:heading {"level":4} -->
<h4 id="connect">Connect</h4>
<!-- /wp:heading -->

<!-- wp:list {"fontSize":"small"} -->
<ul class="has-small-font-size"><li><a href="#">Facebook</a></li><li><a href="#">Instagram</a></li><li><a style="font-family: var(--font-family-primary);font-size: var(--font-size-regular);font-weight: var(--font-weight-regular)" href="#">Twitter</a></li><li><a style="font-family: var(--font-family-primary);font-size: var(--font-size-regular);font-weight: var(--font-weight-regular)" href="#">LinkedIn</a></li><li><a href="#">Dribbble</a></li></ul>
<!-- /wp:list --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group -->',
);
