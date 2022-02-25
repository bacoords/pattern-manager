<?php
/**
 * Module Name: Pattern Data Handlers
 * Description: This module contains functions for getting and saving pattern data.
 * Namespace: PatternDataHandlers
 *
 * @package fse-studio
 */

declare(strict_types=1);

namespace FseStudio\PatternDataHandlers;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * A the data for a single pattern.
 *
 * @param string $pattern_id The name of the pattern to get.
 * @return array
 */
function get_pattern( $pattern_id ) {
	$patterns_data = get_patterns();

	return $patterns_data[ $pattern_id ];
}

/**
 * Get the data for all patterns available.
 *
 * @return array
 */
function get_patterns() {

	$module_dir_path = module_dir_path( __FILE__ );

	/**
	 * Scan Patterns directory and auto require all PHP files, and register them as block patterns.
	 */
	$pattern_file_paths = glob( $module_dir_path . '/pattern-files/*.php' );

	$patterns = array();

	foreach ( $pattern_file_paths as $path ) {
		$pattern_data                          = require $path;
		$pattern_data['name']                  = basename( $path, '.php' );
		$patterns[ basename( $path, '.php' ) ] = $pattern_data;
	}

	// Get the custom patterns (ones created by the user, not included in the plugin).
	$wp_filesystem  = \FseStudio\GetWpFilesystem\get_wp_filesystem_api();
	$wp_content_dir = $wp_filesystem->wp_content_dir();

	$pattern_file_paths = glob( $wp_content_dir . '/fsestudio-custom-patterns/*.php' );

	foreach ( $pattern_file_paths as $path ) {
		$pattern_data                          = require $path;
		$pattern_data['name']                  = basename( $path, '.php' );
		$patterns[ basename( $path, '.php' ) ] = $pattern_data;
	}

	return $patterns;
}

/**
 * Update a single pattern.
 *
 * @param array $pattern Data about the pattern.
 * @return bool
 */
function update_pattern( $pattern ) {

	// Spin up the filesystem api.
	$wp_filesystem = \FseStudio\GetWpFilesystem\get_wp_filesystem_api();

	$wp_content_dir = $wp_filesystem->wp_content_dir();
	$plugin_dir     = $wp_content_dir . 'plugins/fse-studio/';

	if ( ! isset( $pattern['type'] ) || 'default' === $pattern['type'] ) {
		$patterns_dir = $plugin_dir . 'wp-modules/pattern-data-handlers/pattern-files/';
	} else {
		$patterns_dir = $wp_content_dir . 'fsestudio-custom-patterns/';
		// Create the new theme directory.
		if ( ! $wp_filesystem->exists( $patterns_dir ) ) {
			$wp_filesystem->mkdir( $patterns_dir );
		}
	}

	$file_contents = contruct_pattern_php_file_contents( $pattern, 'fse-studio' );

	// Convert the collection array into a file, and place it.
	$pattern_file_created = $wp_filesystem->put_contents(
		$patterns_dir . sanitize_title( $pattern['name'] ) . '.php',
		$file_contents,
		FS_CHMOD_FILE
	);

	return $pattern_file_created;
}

/**
 * Returns a string containing the code for a pattern file.
 *
 * @param array  $pattern Data about the pattern.
 * @param string $text_domain The text domain to use for any localization required.
 * @return bool
 */
function contruct_pattern_php_file_contents( $pattern, $text_domain ) {
	// phpcs:ignore
	$file_contents = "<?php
/**
 * Frost: " . $pattern['title'] . "
 *
 * @package fse-studio
 */

return array(
	'type'          => '" . $pattern['type'] . "',
	'title'         => __( '" . wp_slash( $pattern['title'] ) . "', '" . $text_domain . "' ),
	'name'          => '" . $pattern['name'] . "',
	'categories'    => array( '" . implode( ', ', $pattern['categories'] ) . "' ),
	'viewportWidth' => " . ( $pattern['viewportWidth'] ? $pattern['viewportWidth'] : '1280' ) . ",
	'content'       => '" . prepare_content( $pattern['content'], $text_domain ) . "',
);
";
	return $file_contents;
}

/**
 * Prepare pattern html to be written into a file.
 *
 * @param string $pattern_html The pattern HTML code, generated by Gutenberg functions.
 * @param string $text_domain The text domain to use for any localization required.
 * @return bool
 */
function prepare_content( $pattern_html, $text_domain ) {
	return wp_slash( $pattern_html );
}
