<?php
if ( class_exists( 'CSF' ) ) {

	// Set a unique slug-like ID.
	$prefix = 'bbp_core_settings';

	// Create options.
	CSF::createOptions(
		$prefix,
		[
			'framework_title' => __( 'BBP Core Settings', 'bbp-core' ),
			'framework_class' => 'bbp-core-settings',
			'theme'           => 'dark',

			'menu_title'      => __( 'BBPC Settings', 'bbp-core-pro' ),
			'menu_slug'       => 'bbp-core-settings',
			'menu_type'       => 'submenu',
			'menu_parent'     => 'bbp-core',

			// Footer.
			'footer_text'     => '',
			'footer_after'    => '',
			'footer_credit'   => '',
			// customizer
			'show_in_customizer' =>  bbpc_get_opt( 'customizer_visibility' ),
		]
	);

	// Widgets Settings.
	define( 'BBPC_SETTINGS_PATH', plugin_dir_path( __FILE__ ) );

	include BBPC_SETTINGS_PATH . 'options_admin_ui.php';
	include BBPC_SETTINGS_PATH . 'options_solved_topics.php';
	include BBPC_SETTINGS_PATH . 'options_private_replies.php';
	include BBPC_SETTINGS_PATH . 'options_voting.php';
	include BBPC_SETTINGS_PATH . 'options_customizer.php';
	include BBPC_SETTINGS_PATH . 'options_attachments.php';
	include BBPC_SETTINGS_PATH . 'options_mini_profile.php';
	include BBPC_SETTINGS_PATH . 'options_shortcode.php';
	include BBPC_SETTINGS_PATH . 'options_notification.php';
	include BBPC_SETTINGS_PATH . 'options_appearance.php';

	
	if ( ! class_exists( 'bbPress' ) ) {
		return;
	}
	
}

