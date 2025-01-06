<?php
/*
Plugin Name:       BBP Core
Plugin URI:        https://spider-themes.net/bbp-core
Description:       Expand bbPress powered forums with useful features like - private reply, solved topics ...
Author:            spider-themes
Author URI:        https://spider-themes.net/bbp-core
Text Domain:       bbp-core
Version:           1.2.4
Requires at least: 5.0
Tested up to:      6.6.1
Requires PHP:      7.4
License:           GPLv3 or later
License URI:       https://www.gnu.org/licenses/gpl-3.0.html
*/

defined( 'ABSPATH' ) || exit;

if ( ! function_exists( 'bc_fs' ) ) {
	// Create a helper function for easy SDK access.
	function bc_fs() {
		global $bc_fs;

		if ( ! isset( $bc_fs ) ) {
			// Include Freemius SDK.
			require_once dirname( __FILE__ ) . '/includes/fs/start.php';

			$bc_fs = fs_dynamic_init( array(
				'id'              => '10864',
				'slug'            => 'bbp-core',
				'type'            => 'plugin',
				'public_key'      => 'pk_41277ad11125f6e2a1b4e66f40164',
				'is_premium'      => false,
				'is_premium_only' => false,
				'has_addons'      => false,
				'has_paid_plans'  => true,
				'trial'           => array(
					'days'               => 14,
					'is_require_payment' => true,
				),
				'menu'            => array(
					'slug'       => 'bbp-core',
					'contact'    => false,
					'support'    => false,
					'first-path' => 'admin.php?page=bbp-core',
				),
			) );
		}

		return $bc_fs;
	}

	// Init Freemius.
	bc_fs()->add_filter( 'deactivate_on_activation', '__return_false' );

	// Signal that SDK was initiated.
	do_action( 'bc_fs_loaded' );
}

require_once __DIR__ . '/autoloader.php';


/**
 * Plugin's heart
 */
final class BBP_Core {
	const VERSION = '1.2.4';

	/**
	 * Class constructor.
	 */
	public function __construct() {
		
		$this->define_constants();
		$this->core_includes();

		register_activation_hook( __FILE__, [ $this, 'activate' ] );
		add_action( 'plugins_loaded', [ $this, 'init_plugin' ] );
			
		// Added Documentation links to plugin row meta
		add_filter('plugin_row_meta',[ $this,  'bbpc_row_meta' ], 10, 2);
	}
	
	/**
	 * Define Plugin Constants.
	 *
	 * @return void
	 */
	public function define_constants() {
		define( 'BBPC_VERSION', self::VERSION );
		define( 'BBPC_FILE', __FILE__ );
		define( 'BBPC_DIR', __DIR__ . '/' );
		define( 'BBPC_URL', plugins_url( '/', __FILE__ ) );
		define( 'BBPC_ASSETS', BBPC_URL . 'assets/' );
		define( 'BBPC_IMG', BBPC_ASSETS . 'img/' );
	}

	/**
	 * File includes.
	 */
	public function core_includes() {
		require_once __DIR__ . '/includes/functions.php';
		require_once __DIR__ . '/includes/admin/menu/Approve_Topic.php';
		require_once __DIR__ . '/includes/admin/menu/Create_Forum.php';
		require_once __DIR__ . '/includes/admin/menu/Create_Topic.php';
		require_once __DIR__ . '/includes/admin/menu/Delete_Forum.php';
		require_once __DIR__ . '/includes/admin/menu/Delete_Topic.php';
		require_once __DIR__ . '/includes/Elementor/BBP_Widgets.php';
		require_once __DIR__ . '/includes/ajax_actions.php';
		include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
		require_once __DIR__ . '/includes/Frontend/Assets.php';

		require_once __DIR__ . '/includes/admin/widgets/forum-info/widgets.php';
		require_once __DIR__ . '/includes/Elementor/inc/forum-ajax.php';

		// Core installer notice
		require_once __DIR__ . '/includes/admin/notices/notices.php';
		require_once __DIR__ . '/includes/admin/notices/asking-for-review.php';

		//Register Pro Widgets
		$theme = wp_get_theme();

		if ( $theme != 'Ama' || ! bbpc_is_premium() ) {
			require_once __DIR__ . '/includes/admin/Pro_Widget_Map.php';
			require_once __DIR__ . '/includes/admin/Pro_Widget_Service.php';
		}
		
		// Hooks
		require BBPC_DIR . 'includes/hooks/actions.php';
		require BBPC_DIR . 'includes/hooks/image_sizes.php';

		// Load CSF
		require BBPC_DIR . 'includes/admin/settings/csf/classes/setup.class.php';
		require BBPC_DIR . 'includes/admin/settings/options/settings.php';
	}

	/**
	 *  Initializing Bbp_core class.
	 *
	 * @return \Bbp_core
	 */
	static function init() {
		static $instance = false;

		if ( ! $instance ) {
			$instance = new self();
		}
	}

	/**
	 * Actions on plugin activation.
	 *
	 * @return void
	 */
	public function activate() {
		$installed = get_option( 'bbpc_installed' );
		if ( ! $installed ) {
			update_option( 'bbpc_installed', time() );
		}

		update_option( 'bbpc_version', BBPC_VERSION );
	}

	/**
	 * Initialize the plugin functionality.
	 *
	 * @return void
	 */
	public function init_plugin() {

		$this->load_features();

		if ( is_admin() ) {
			new Admin();
			new admin\Assets();
		}elseif ( ! is_admin() ) {
			new Frontend\Assets();
		}
		
		// If bbPress is not active, don't load assets and widgets.
		if ( ! class_exists( 'bbPress' ) ) {
			return;
		}
		new admin\Elementor\BBP_Widgets();
	}


	/**
	 * Load different features.
	 *
	 * @return void
	 */
	public function load_features() {
		$opt = get_option( 'bbp_core_settings' );
		define( 'BBPC_FEAT_PATH', plugin_dir_path( __FILE__ ) . 'includes/features/' );

		if ( $opt['is_solved_topics'] ?? true ) {
			require BBPC_FEAT_PATH . 'bbp_solved_topic.php';
		}

		if ( $opt['is_private_replies'] ?? true ) {
			require BBPC_FEAT_PATH . 'bbp-private-replies.php';
		}

		if ( $opt['is_votes'] ?? true ) {
			new features\bbp_voting();
		}

		if ( $opt['is_attachment'] ?? true ) {
			new features\bbp_attachments();
		}
	}

	/**
	 * Documentation links to plugin row meta
	 */
	public function bbpc_row_meta($links, $file) {
		// Check if this is your plugin
		if (plugin_basename(__FILE__) === $file) {
			// Add your custom links
			$plugin_links = array(
				'<a href="https://helpdesk.spider-themes.net/docs/bbp-core-wordpress-plugin/" target="_blank">Documentation</a>'
			);		
			// Merge the custom links with the existing links
			$links = array_merge($links, $plugin_links);
		}
		return $links;
	}
	// end
	
}

/**
 * Initialize the bbp core plugin.
 *
 * @return \Bbp_core
 */
function bbp_core() {
	return Bbp_core::init();
}

bbp_core();