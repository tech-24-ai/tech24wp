<?php
/**
 * Back-end AJAX Functionalities
 * 
 * @package    wp-ulike
 * @author     TechnoWich 2024
 * @link       https://wpulike.com
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
    die('No Naughty Business Please !');
}

/*******************************************************
  Start AJAX From Here
*******************************************************/

/**
 * AJAX handler to store the state of dismissible notices.
 *
 * @return			Void
 */
function wp_ulike_ajax_notice_handler() {
    // Store it in the options table
	if ( ! isset( $_POST['id'] ) ||  ! isset( $_POST['nonce'] ) || ! wp_verify_nonce( sanitize_text_field( $_POST['nonce'] ), '_notice_nonce' ) ) {
		wp_send_json_error(  esc_html__( 'Token Error.', 'wp-ulike' ) );
	} else {
		wp_ulike_set_transient( 'wp-ulike-notice-' . sanitize_text_field( $_POST['id' ] ), 1, absint( $_POST['expiration'] ) );
		wp_send_json_success( esc_html__( 'It\'s OK.', 'wp-ulike' ) );
	}
}
add_action( 'wp_ajax_wp_ulike_dismissed_notice', 'wp_ulike_ajax_notice_handler' );


/**
 * Dashboard api
 *
 * @return void
 */
function wp_ulike_stats_api(){
	if( ! current_user_can( wp_ulike_get_user_access_capability('stats') ) ){
		wp_send_json_error( esc_html__( 'Error: You do not have permission to do that.', 'wp-ulike' ) );
	}

    $stats = wp_ulike_stats::get_instance()->get_all_data();
    return wp_send_json($stats);
}
add_action('wp_ajax_wp_ulike_stats_api','wp_ulike_stats_api');

/**
 * Engagement history api
 *
 * @return void
 */
function wp_ulike_history_api(){
	if( ! current_user_can( wp_ulike_get_user_access_capability('stats') ) ){
		wp_send_json_error( esc_html__( 'Error: You do not have permission to do that.', 'wp-ulike' ) );
	}

	$type    = isset( $_GET['type'] ) ? sanitize_text_field( $_GET['type'] ) : 'post';
	$page    = isset( $_GET['page'] ) ? absint( $_GET['page'] ) : 1;
	$perPage = isset( $_GET['perPage'] ) ? absint( $_GET['perPage'] ) : 15;

	$settings = new wp_ulike_setting_type( $type );
	$instance = new wp_ulike_logs( $settings->getTableName(), $page, $perPage  );
	$output   = $instance->get_rows();

	wp_send_json( $output );
}
add_action('wp_ajax_wp_ulike_history_api','wp_ulike_history_api');

/**
 * Engagement history api
 *
 * @return void
 */
function wp_ulike_delete_history_api(){
	if( ! current_user_can( wp_ulike_get_user_access_capability('stats') ) ){
		wp_send_json_error( esc_html__( 'Error: You do not have permission to do that.', 'wp-ulike' ) );
	}

	$item_id = isset( $_GET['id'] ) ? absint( $_GET['id'] ) : 0;
	$type    = isset( $_GET['type'] ) ? sanitize_text_field( $_GET['type'] ) : '';

	if( empty( $item_id ) || empty( $type ) ){
		wp_send_json_error( esc_html__( 'Error: You do not have permission to do that.', 'wp-ulike' ) );
	}

	$settings = new wp_ulike_setting_type( $type );
	$instance = new wp_ulike_logs( $settings->getTableName()  );

	if( ! $instance->delete_row( $item_id ) ){
		wp_send_json_error( esc_html__( 'Error: You do not have permission to do that.', 'wp-ulike' ) );
	}

	wp_send_json_success();
}
add_action('wp_ajax_wp_ulike_delete_history_api','wp_ulike_delete_history_api');

/**
 * Localization api
 *
 * @return void
 */
function wp_ulike_localization_api(){
	wp_send_json( [
		'Dashboard'                       => esc_html__( 'Dashboard', 'wp-ulike' ),
		'Engagement History'              => esc_html__( 'Engagement History', 'wp-ulike' ),
		'View Full History'               => esc_html__( 'View Full History', 'wp-ulike' ),
		'Total Interactions To Date'      => esc_html__( 'Total Interactions To Date', 'wp-ulike' ),
		'Today\'s Engagement Overview'    => esc_html__( 'Today\'s Engagement Overview', 'wp-ulike' ),
		'Yesterday\'s Engagement Summary' => esc_html__( 'Yesterday\'s Engagement Summary', 'wp-ulike' ),
		'Engagement This Week'            => esc_html__( 'Engagement This Week', 'wp-ulike' ),
		'Monthly Engagement Overview'     => esc_html__( 'Monthly Engagement Overview', 'wp-ulike' ),
		'Yearly Engagement Trends'        => esc_html__( 'Yearly Engagement Trends', 'wp-ulike' ),
		'Overall Performance'             => esc_html__( 'Overall Performance', 'wp-ulike' ),
		'Daily Interaction Overview'      => esc_html__( 'Daily Interaction Overview', 'wp-ulike' ),
		'Engagement Statistics'           => esc_html__( 'Engagement Statistics', 'wp-ulike' ),
		'Top'                             => esc_html__( 'Top', 'wp-ulike' ),
		'for'                             => esc_html__( 'for', 'wp-ulike' ),

		// Filters
		'Like'          => esc_html__( 'Like', 'wp-ulike' ),
		'Unlike'        => esc_html__( 'Unlike', 'wp-ulike' ),
		'Dislike'       => esc_html__( 'Dislike', 'wp-ulike' ),
		'Undislike'     => esc_html__( 'Undislike', 'wp-ulike' ),
		'Select...'     => esc_html__( 'Select...', 'wp-ulike' ),
		'Start Date'    => esc_html__( 'Start Date', 'wp-ulike' ),
		'End Date'      => esc_html__( 'End Date', 'wp-ulike' ),
		'Status Filter' => esc_html__( 'Status Filter', 'wp-ulike' ),
		'Post Types'    => esc_html__( 'Post Types', 'wp-ulike' ),
		'Show Filters'  => esc_html__( 'Show Filters', 'wp-ulike' ),
		'Hide Filters'  => esc_html__( 'Hide Filters', 'wp-ulike' ),
		'Clear all'     => esc_html__( 'Clear all', 'wp-ulike' ),
		'Apply'         => esc_html__( 'Apply', 'wp-ulike' ),

		// Charts
		'Dates'                                    => esc_html__( 'Dates', 'wp-ulike' ),
		'Totals'                                   => esc_html__( 'Totals', 'wp-ulike' ),
		'No data to display'                       => esc_html__( 'No data to display', 'wp-ulike' ),
		'Daily Interactions'                       => esc_html__( 'Daily Interactions', 'wp-ulike' ),
		'Monthly Interactions'                     => esc_html__( 'Monthly Interactions', 'wp-ulike' ),
		'User Role Engagement'                     => esc_html__( 'User Role Engagement', 'wp-ulike' ),
		'Insights from the Last {{months}} Months' => esc_html__( 'Insights from the Last {{months}} Months', 'wp-ulike' ),

		// History
		'Date'            => esc_html__( 'Date', 'wp-ulike' ),
		'User'            => esc_html__( 'User', 'wp-ulike' ),
		'IP'              => esc_html__( 'IP', 'wp-ulike' ),
		'Status'          => esc_html__( 'Status', 'wp-ulike' ),
		'Comment Author'  => esc_html__( 'Comment Author', 'wp-ulike' ),
		'Comment Content' => esc_html__( 'Comment Content', 'wp-ulike' ),
		'Activity Title'  => esc_html__( 'Activity Title', 'wp-ulike' ),
		'Topic Title'     => esc_html__( 'Topic Title', 'wp-ulike' ),
		'Post Title'      => esc_html__( 'Post Title', 'wp-ulike' ),
		'Category'        => esc_html__( 'Category', 'wp-ulike' ),
		'Showing'         => esc_html__( 'Showing', 'wp-ulike' ),
		'to'              => esc_html__( 'to', 'wp-ulike' ),
		'of'              => esc_html__( 'of', 'wp-ulike' ),
		'results'         => esc_html__( 'results', 'wp-ulike' ),
		'Back'            => esc_html__( 'Back', 'wp-ulike' ),
		'Search'          => esc_html__( 'Search', 'wp-ulike' ),
		'Loading...'      => esc_html__( 'Loading...', 'wp-ulike' ),
		'Download CSV'    => esc_html__( 'Download CSV', 'wp-ulike' ),
		'Delete Selected' => esc_html__( 'Delete Selected', 'wp-ulike' ),

		// Types
		'Posts'      => esc_html__('Posts', 'wp-ulike'),
		'Comments'   => esc_html__('Comments', 'wp-ulike'),
		'Activities' => esc_html__('Activities', 'wp-ulike'),
		'Topics'     => esc_html__('Topics', 'wp-ulike'),
		'Engagers'   => esc_html__('Engagers', 'wp-ulike'),

		// 404
		'No data found!'                                           => esc_html__( 'No data found!', 'wp-ulike' ),
		'This is because there is still no data in your database.' => esc_html__( 'This is because there is still no data in your database.', 'wp-ulike' ),

		// Banners
		'Discover Key Insights, Identify Top Fans & Boost Your Best Content' => esc_html__( 'Discover Key Insights, Identify Top Fans & Boost Your Best Content', 'wp-ulike'),
		'Unlock WP ULike Pro—Turn Your Data into Actionable Insights. Instantly find out what your users love and fine-tune your content for maximum engagement. Elevate your performance with detailed reports and real-time analysis.' => esc_html__( 'Unlock WP ULike Pro—Turn Your Data into Actionable Insights. Instantly find out what your users love and fine-tune your content for maximum engagement. Elevate your performance with detailed reports and real-time analysis.', 'wp-ulike'),
		'Unlock WP ULike Pro'  => esc_html__('Unlock WP ULike Pro', 'wp-ulike'),
		'Discover More Features' => esc_html__('Discover More Features', 'wp-ulike'),

	] );
}
add_action('wp_ajax_wp_ulike_localization','wp_ulike_localization_api');

