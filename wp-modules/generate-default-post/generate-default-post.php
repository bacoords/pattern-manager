<?php
/**
 * Module Name: Generate Default Post
 * Description: This module generates a default post which we will hijack with our App. This makes it simple to make sure all the same assets are always loaded as a standard WP post for our app.
 * Namespace: GenerateDefaultPost
 *
 * @package fse-studio
 */

declare(strict_types=1);

namespace FseStudio\GenerateDefaultPost;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Generate a "fse_studio" post which we will hijack with our app.
 * This makes it simple to make sure all the same assets are always loaded as a standard WP post for our app.
 */
function generate_default_post() {
	$fse_studio_default_post_id = get_option( 'fse_studio_default_post_id' );

	$post = get_post( $fse_studio_default_post_id );

	if ( $post && $post->ID ) {
		return;
	}

	$new_post_details = array(
		'post_title'   => 'FSE Studio Default Post',
		'post_content' => '',
		'post_type'    => 'fsestudio',
	);

	// Insert the post into the database.
	$post_id = wp_insert_post( $new_post_details );

	update_option( 'fse_studio_default_post_id', $post_id );
}
add_action( 'admin_init', __NAMESPACE__ . '\generate_default_post' );


/**
 * Create a custom post type to be used for our default post.
 */
function fse_studio_post_type() {
	register_post_type(
		'fsestudio',
		array(
			'labels'       => array(
				'name'          => __( 'FSE Studio', 'textdomain' ),
				'singular_name' => __( 'Fse Studio', 'textdomain' ),
			),
			'public'       => true,
			'has_archive'  => false,
			'show_ui'      => true,
			'show_in_menu' => true,
			'show_in_rest' => true,
		)
	);
}
add_action( 'init', __NAMESPACE__ . '\fse_studio_post_type' );
