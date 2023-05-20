<?php
/**
 * Plugin Name:       Posipa Renderer
 * Description:       A plugin to render posipas 
 * Version:           0.1.0
 * Author:            BuFaK WiWi
 * Text Domain:       https://github.com/bufak-wiwi/posipa-renderer
 */

function posipas_shortcodes_init() {
	function posipas_shortcode($atts = []) {

		$content = '<div id="posipas"><h2>Loading...</h2></div>';

		return $content;
	}
	add_shortcode('posipas', 'posipas_shortcode');
    wp_enqueue_style( 'jobplace-style', plugin_dir_url( __FILE__ ) . 'build/index.css' );
    wp_enqueue_script( 'jobplace-script', plugin_dir_url( __FILE__ ) . 'build/index.js', array( 'wp-element' ), '1.0.0', true );
}

add_action('init', 'posipas_shortcodes_init');
?>
