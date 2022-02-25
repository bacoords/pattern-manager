<?php
/**
 * Frost: Pricing table with list, buttons.
 *
 * @package fse-studio
 */

return array(
	'type'          => 'default',
	'title'         => __( 'Pricing table with list, buttons.', 'fse-studio' ),
	'name'          => 'frost-pricing-table-four-columns-black-background',
	'categories'    => array( 'frost-pricing-table' ),
	'viewportWidth' => 1280,
	'content'       => '<!-- wp:group {"align":"full","backgroundColor":"black","textColor":"white","layout":{"inherit":true}} -->
<div class="wp-block-group alignfull has-white-color has-black-background-color has-text-color has-background"><!-- wp:spacer -->
<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:heading {"textAlign":"center","fontSize":"x-large"} -->
<h2 class="has-text-align-center has-x-large-font-size" id="pricing-table">Pricing Table</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Create a four-column table, wide-width (1200px).</p>
<!-- /wp:paragraph -->

<!-- wp:columns {"align":"wide","className":"has-smaller-left-margin"} -->
<div class="wp-block-columns alignwide has-smaller-left-margin"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"style":{"border":{"width":"1px","style":"solid"}},"borderColor":"white","className":"has-white-border"} -->
<div class="wp-block-group has-white-border has-border-color has-white-border-color" style="border-style:solid;border-width:1px"><!-- wp:heading {"textAlign":"center","level":4,"style":{"spacing":{"margin":{"bottom":"0px"}}},"backgroundColor":"white","textColor":"black"} -->
<h4 class="has-text-align-center has-black-color has-white-background-color has-text-color has-background" id="personal-95" style="margin-bottom:0px">Personal - $95</h4>
<!-- /wp:heading -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"30px","right":"40px","bottom":"40px","left":"40px"}}}} -->
<div class="wp-block-group" style="padding-top:30px;padding-right:40px;padding-bottom:40px;padding-left:40px"><!-- wp:list {"className":"pricing-table","fontSize":"small"} -->
<ul class="pricing-table has-small-font-size"><li>Feature Item</li><li>Feature Item</li><li>Feature Item</li><li>Feature Item</li><li>Feature Item</li></ul>
<!-- /wp:list -->

<!-- wp:spacer {"height":"30px"} -->
<div style="height:30px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center","orientation":"horizontal"}} -->
<div class="wp-block-buttons"><!-- wp:button {"style":{"border":{"radius":0}},"className":"is-style-fill-white"} -->
<div class="wp-block-button is-style-fill-white"><a class="wp-block-button__link no-border-radius">Sign Up Now</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"style":{"border":{"width":"1px","style":"solid"}},"borderColor":"white","className":"has-white-border"} -->
<div class="wp-block-group has-white-border has-border-color has-white-border-color" style="border-style:solid;border-width:1px"><!-- wp:heading {"textAlign":"center","level":4,"style":{"spacing":{"margin":{"bottom":"0px"}}},"backgroundColor":"white","textColor":"black"} -->
<h4 class="has-text-align-center has-black-color has-white-background-color has-text-color has-background" id="professional-295" style="margin-bottom:0px">Professional - $295</h4>
<!-- /wp:heading -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"30px","right":"40px","bottom":"40px","left":"40px"}}}} -->
<div class="wp-block-group" style="padding-top:30px;padding-right:40px;padding-bottom:40px;padding-left:40px"><!-- wp:list {"className":"pricing-table","fontSize":"small"} -->
<ul class="pricing-table has-small-font-size"><li>Feature Item</li><li>Feature Item</li><li>Feature Item</li><li>Feature Item</li><li>Feature Item</li></ul>
<!-- /wp:list -->

<!-- wp:spacer {"height":"30px"} -->
<div style="height:30px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center","orientation":"horizontal"}} -->
<div class="wp-block-buttons"><!-- wp:button {"style":{"border":{"radius":0}},"className":"is-style-fill-white"} -->
<div class="wp-block-button is-style-fill-white"><a class="wp-block-button__link no-border-radius">Sign Up Now</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"style":{"border":{"width":"1px","style":"solid"}},"borderColor":"white","className":"has-white-border"} -->
<div class="wp-block-group has-white-border has-border-color has-white-border-color" style="border-style:solid;border-width:1px"><!-- wp:heading {"textAlign":"center","level":4,"style":{"spacing":{"margin":{"bottom":"0px"}}},"backgroundColor":"white","textColor":"black"} -->
<h4 class="has-text-align-center has-black-color has-white-background-color has-text-color has-background" id="enterprise-495" style="margin-bottom:0px">Enterprise - $495</h4>
<!-- /wp:heading -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"30px","right":"40px","bottom":"40px","left":"40px"}}}} -->
<div class="wp-block-group" style="padding-top:30px;padding-right:40px;padding-bottom:40px;padding-left:40px"><!-- wp:list {"className":"pricing-table","fontSize":"small"} -->
<ul class="pricing-table has-small-font-size"><li>Feature Item</li><li>Feature Item</li><li>Feature Item</li><li>Feature Item</li><li>Feature Item</li></ul>
<!-- /wp:list -->

<!-- wp:spacer {"height":"30px"} -->
<div style="height:30px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center","orientation":"horizontal"}} -->
<div class="wp-block-buttons"><!-- wp:button {"style":{"border":{"radius":0}},"className":"is-style-fill-white"} -->
<div class="wp-block-button is-style-fill-white"><a class="wp-block-button__link no-border-radius">Sign Up Now</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"style":{"border":{"width":"1px","style":"solid"}},"borderColor":"white","className":"has-white-border"} -->
<div class="wp-block-group has-white-border has-border-color has-white-border-color" style="border-style:solid;border-width:1px"><!-- wp:heading {"textAlign":"center","level":4,"style":{"spacing":{"margin":{"bottom":"0px"}}},"backgroundColor":"white","textColor":"black"} -->
<h4 class="has-text-align-center has-black-color has-white-background-color has-text-color has-background" id="ultimate-995" style="margin-bottom:0px">Ultimate - $995</h4>
<!-- /wp:heading -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"30px","right":"40px","bottom":"40px","left":"40px"}}}} -->
<div class="wp-block-group" style="padding-top:30px;padding-right:40px;padding-bottom:40px;padding-left:40px"><!-- wp:list {"className":"pricing-table","fontSize":"small"} -->
<ul class="pricing-table has-small-font-size"><li>Feature Item</li><li>Feature Item</li><li>Feature Item</li><li>Feature Item</li><li>Feature Item</li></ul>
<!-- /wp:list -->

<!-- wp:spacer {"height":"30px"} -->
<div style="height:30px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center","orientation":"horizontal"}} -->
<div class="wp-block-buttons"><!-- wp:button {"style":{"border":{"radius":0}},"className":"is-style-fill-white"} -->
<div class="wp-block-button is-style-fill-white"><a class="wp-block-button__link no-border-radius">Sign Up Now</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group --></div>
<!-- /wp:group --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:spacer {"height":"70px"} -->
<div style="height:70px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer --></div>
<!-- /wp:group -->',
);
