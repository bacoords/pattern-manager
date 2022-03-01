<?php
/**
 * Frost: Section with image, text, buttons.
 *
 * @package fse-studio
 */

return array(
	'type'          => 'default',
	'title'         => __( 'Section with image, text, buttons.', 'fse-studio' ),
	'name'          => 'frost-hero-section-one-column-black-background',
	'categories'    => array( 'frost-hero-section' ),
	'viewportWidth' => 1280,
	'content'       => '<!-- wp:group {"align":"full","backgroundColor":"black","textColor":"white","layout":{"wideSize":"800px"}} -->
<div class="wp-block-group alignfull has-white-color has-black-background-color has-text-color has-background"><!-- wp:spacer -->
<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:image {"id":3482,"sizeSlug":"full","linkDestination":"none"} -->
<figure class="wp-block-image size-full"><img src="https://frostwp.com/wp-content/uploads/2021/12/sample-white_1920x1200.jpg" alt="Sample Image" class="wp-image-3482"/></figure>
<!-- /wp:image -->

<!-- wp:spacer {"height":"30px"} -->
<div style="height:30px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:heading {"textAlign":"center","fontSize":"x-large"} -->
<h2 class="has-text-align-center has-x-large-font-size" id="image-heading-text-buttons">Image, heading, text, buttons.</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Lorem ipsum dolor sit amet, consectetur adipiscing vestibulum. Fringilla nec accumsan eget, facilisis mi justo, luctus eu pellentesque vitae gravida non diam accumsan.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center","orientation":"horizontal"}} -->
<div class="wp-block-buttons"><!-- wp:button {"style":{"border":{"radius":0}},"className":"is-style-fill-white"} -->
<div class="wp-block-button is-style-fill-white"><a class="wp-block-button__link no-border-radius">Get Started</a></div>
<!-- /wp:button -->

<!-- wp:button {"style":{"border":{"radius":0}},"className":"is-style-outline-white"} -->
<div class="wp-block-button is-style-outline-white"><a class="wp-block-button__link no-border-radius">Learn More</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons -->

<!-- wp:spacer -->
<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer --></div>
<!-- /wp:group -->',
);
