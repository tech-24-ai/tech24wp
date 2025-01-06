<?php
require 'dompdf/vendor/autoload.php'; // Adjust path if necessary
use Dompdf\Dompdf;

/**
 * @package BuddyBoss Child
 * The parent theme functions are located at /buddyboss-theme/inc/theme/functions.php
 * Add your own functions at the bottom of this file.
 */


/****************************** THEME SETUP ******************************/

/**
 * Sets up theme for translation
 *
 * @since BuddyBoss Child 1.0.0
 */
function buddyboss_theme_child_languages()
{
    /**
     * Makes child theme available for translation.
     * Translations can be added into the /languages/ directory.
     */

    // Translate text from the PARENT theme.
    load_theme_textdomain('buddyboss-theme', get_stylesheet_directory() . '/languages');

    // Translate text from the CHILD theme only.
    // Change 'buddyboss-theme' instances in all child theme files to 'buddyboss-theme-child'.
    // load_theme_textdomain( 'buddyboss-theme-child', get_stylesheet_directory() . '/languages' );

}
add_action('after_setup_theme', 'buddyboss_theme_child_languages');

/**
 * Enqueues scripts and styles for child theme front-end.
 *
 * @since Boss Child Theme  1.0.0
 */
function buddyboss_theme_child_scripts_styles()
{
    /**
     * Scripts and Styles loaded by the parent theme can be unloaded if needed
     * using wp_deregister_script or wp_deregister_style.
     *
     * See the WordPress Codex for more information about those functions:
     * http://codex.wordpress.org/Function_Reference/wp_deregister_script
     * http://codex.wordpress.org/Function_Reference/wp_deregister_style
     **/

    // Enqueue custom CSS
    wp_enqueue_style(
        'buddyboss-child-css', // Handle
        get_stylesheet_directory_uri() . '/assets/css/custom.css', // Path to the CSS file
        array(), // Dependencies
        time(), // Version (use current timestamp)
        'all' // Media
    );

    wp_enqueue_style(
        'common-css', // Handle
        get_stylesheet_directory_uri() . '/assets/css/common.css', // Path to the CSS file
        array(), // Dependencies
        time(), // Version (use current timestamp)
        'all' // Media
      );

    // Enqueue custom JavaScript
    wp_enqueue_script(
        'buddyboss-child-js', // Handle
        get_stylesheet_directory_uri() . '/assets/js/custom.js', // Path to the JS file
        array('jquery'), // Dependencies
        time(), // Version (use current timestamp)
        true // Load in footer
    );


    wp_enqueue_script(
        'common-js', // Handle
        get_stylesheet_directory_uri() . '/assets/js/common.js', // Path to the JS file
        array('jquery'), // Dependencies
        time(), // Version (use current timestamp)
        true // Load in footer
      );


    // calculators scripts
    wp_enqueue_script('backup-capacity-js', get_stylesheet_directory_uri() . '/assets/js/backup_capacity_calculator.js', array('jquery'), time(), true);
    wp_enqueue_script('bandwidth-js', get_stylesheet_directory_uri() . '/assets/js/bandwidth_calculator.js', array('jquery'), time(), true);
    wp_enqueue_script('data-center-js', get_stylesheet_directory_uri() . '/assets/js/data_center_calculator.js', array('jquery'), time(), true);
    wp_enqueue_script('downtime-calculator-js', get_stylesheet_directory_uri() . '/assets/js/downtime_calculator.js', array('jquery'), time(), true);
    wp_enqueue_script('file-transfer-js', get_stylesheet_directory_uri() . '/assets/js/file_transfer_calculator.js', array('jquery'), time(), true);
    wp_enqueue_script('raid-calculator-js', get_stylesheet_directory_uri() . '/assets/js/raid_calculator.js', array('jquery'), time(), true);
    wp_enqueue_script('server-rack_power-js', get_stylesheet_directory_uri() . '/assets/js/server_rack_power_calculator.js', array('jquery'), time(), true);
    wp_enqueue_script('splunk-storage-js', get_stylesheet_directory_uri() . '/assets/js/splunk_storage_calculator.js', array('jquery'), time(), true);
    wp_enqueue_script('video-storage-js', get_stylesheet_directory_uri() . '/assets/js/video_storage_calculator.js', array('jquery'), time(), true);
}
add_action('wp_enqueue_scripts', 'buddyboss_theme_child_scripts_styles', 9999);


/****************************** CUSTOM FUNCTIONS ******************************/

// Add your own custom functions here

// market research custom post type
function create_market_research_post_type()
{
    $labels = array(
        'name'               => __('Market Researches', 'textdomain'),
        'singular_name'      => __('Market Research', 'textdomain'),
        'menu_name'          => __('Market Researches', 'textdomain'),
        'name_admin_bar'     => __('Market Research', 'textdomain'),
        'add_new'            => __('Add New', 'textdomain'),
        'add_new_item'       => __('Add New Market Research', 'textdomain'),
        'new_item'           => __('New Market Research', 'textdomain'),
        'edit_item'          => __('Edit Market Research', 'textdomain'),
        'view_item'          => __('View Market Research', 'textdomain'),
        'all_items'          => __('All Market Researches', 'textdomain'),
        'search_items'       => __('Search Market Researches', 'textdomain'),
        'parent_item_colon'  => __('Parent Market Researches:', 'textdomain'),
        'not_found'          => __('No Market Researches found.', 'textdomain'),
        'not_found_in_trash' => __('No Market Researches found in Trash.', 'textdomain'),
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array('slug' => 'market-research'),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => 5,
        'supports'           => array('title', 'editor', 'thumbnail', 'excerpt', 'comments', 'author'),
        'taxonomies'         => array('research_category', 'research_tag', 'research_type'),
        'show_in_rest'       => true, // For Gutenberg support
    );

    register_post_type('market_research', $args);
}

add_action('init', 'create_market_research_post_type');

function create_market_research_taxonomies()
{
    // Research Category
    $labels = array(
        'name'              => _x('Research Categories', 'taxonomy general name', 'textdomain'),
        'singular_name'     => _x('Research Category', 'taxonomy singular name', 'textdomain'),
        'search_items'      => __('Search Research Categories', 'textdomain'),
        'all_items'         => __('All Research Categories', 'textdomain'),
        'parent_item'       => __('Parent Research Category', 'textdomain'),
        'parent_item_colon' => __('Parent Research Category:', 'textdomain'),
        'edit_item'         => __('Edit Research Category', 'textdomain'),
        'update_item'       => __('Update Research Category', 'textdomain'),
        'add_new_item'      => __('Add New Research Category', 'textdomain'),
        'new_item_name'     => __('New Research Category Name', 'textdomain'),
        'menu_name'         => __('Research Category', 'textdomain'),
    );

    $args = array(
        'hierarchical'      => true,
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'has_archive' => true,
        'query_var'         => true,
        'rewrite'           => array('slug' => 'research-category'),
        'show_in_rest'      => true, // Important: This enables support for the block editor
    );

    register_taxonomy('research_category', array('market_research'), $args);

    // Research Tag
    $labels = array(
        'name'                       => _x('Research Tags', 'taxonomy general name', 'textdomain'),
        'singular_name'              => _x('Research Tag', 'taxonomy singular name', 'textdomain'),
        'search_items'               => __('Search Research Tags', 'textdomain'),
        'popular_items'              => __('Popular Research Tags', 'textdomain'),
        'all_items'                  => __('All Research Tags', 'textdomain'),
        'parent_item'                => null,
        'parent_item_colon'          => null,
        'edit_item'                  => __('Edit Research Tag', 'textdomain'),
        'update_item'                => __('Update Research Tag', 'textdomain'),
        'add_new_item'               => __('Add New Research Tag', 'textdomain'),
        'new_item_name'              => __('New Research Tag Name', 'textdomain'),
        'separate_items_with_commas' => __('Separate research tags with commas', 'textdomain'),
        'add_or_remove_items'        => __('Add or remove research tags', 'textdomain'),
        'choose_from_most_used'      => __('Choose from the most used research tags', 'textdomain'),
        'not_found'                  => __('No research tags found.', 'textdomain'),
        'menu_name'                  => __('Research Tags', 'textdomain'),
    );

    $args = array(
        'hierarchical'          => false,
        'labels'                => $labels,
        'show_ui'               => true,
        'has_archive' => true,
        'show_admin_column'     => true,
        'update_count_callback' => '_update_post_term_count',
        'query_var'             => true,
        'rewrite'               => array('slug' => 'research-tag'),
        'show_in_rest'      => true, // Important: This enables support for the block editor
    );

    register_taxonomy('research_tag', 'market_research', $args);

    // Research Type
    $labels = array(
        'name'              => _x('Research Types', 'taxonomy general name', 'textdomain'),
        'singular_name'     => _x('Research Type', 'taxonomy singular name', 'textdomain'),
        'search_items'      => __('Search Research Types', 'textdomain'),
        'all_items'         => __('All Research Types', 'textdomain'),
        'parent_item'       => __('Parent Research Type', 'textdomain'),
        'parent_item_colon' => __('Parent Research Type:', 'textdomain'),
        'edit_item'         => __('Edit Research Type', 'textdomain'),
        'update_item'       => __('Update Research Type', 'textdomain'),
        'add_new_item'      => __('Add New Research Type', 'textdomain'),
        'new_item_name'     => __('New Research Type Name', 'textdomain'),
        'menu_name'         => __('Research Type', 'textdomain'),
    );

    $args = array(
        'hierarchical'      => true,
        'labels'            => $labels,
        'show_ui'           => true,

        'has_archive' => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array('slug' => 'research-type'),
        'show_in_rest'      => true, // Important: This enables support for the block editor
    );

    register_taxonomy('research_type', array('market_research'), $args);
}

add_action('init', 'create_market_research_taxonomies', 0);

// Add custom columns to the Market Research post type list table
function set_custom_edit_market_research_columns($columns)
{
    // Remove date column if you don't want it
    unset($columns['date']);

    // Add custom columns
    $columns['author'] = __('Author', 'textdomain');

    return $columns;
}
add_filter('manage_market_research_posts_columns', 'set_custom_edit_market_research_columns');

// Populate custom columns with data
function custom_market_research_column($column, $post_id)
{
    switch ($column) {
        case 'author':
            $author = get_the_author_meta('display_name', get_post_field('post_author', $post_id));
            echo esc_html($author);
            break;
    }
}
add_action('manage_market_research_posts_custom_column', 'custom_market_research_column', 10, 2);



// add blog in blog detail page slug

// error_reporting(E_ALL);
// ini_set('display_errors', '1');


function my_custom_elementor_query($query)
{
    // Check if $query is a WP_Query object
    if (is_a($query, 'WP_Query')) {
        $query->set('orderby', 'meta_value_num');
        $query->set('meta_key', 'views');
        $query->set('order', 'DESC');
    }
}
add_action('elementor/query/my_custom_query', 'my_custom_elementor_query');

add_action('elementor/widget/render_content', function ($widget_content, $widget) {
    // Check if the widget is the Posts widget
    if ('Posts' === $widget->get_name()) {
        // Get the post ID
        $post_id = get_the_ID();
        // Get the category list
        $categories = get_the_category($post_id);
        if (!empty($categories)) {
            $category_names = [];
            foreach ($categories as $category) {
                $category_names[] = $category->name;
            }
            $category_list = implode(', ', $category_names);
            // Add the category name before or after the title
            $category_html = '<div class="post-category">' . esc_html($category_list) . '</div>';
            // Inject the category name into the widget content
            $widget_content = $category_html . $widget_content;
        }
    }
    return $widget_content;
}, 10, 2);

function get_total_group_discussions($group_id)
{
    global $wpdb;

    // Get the forum ID associated with the group
    $forum_id = groups_get_groupmeta($group_id, 'forum_id');

    if ($forum_id) {
        // Get the total number of topics in the specified forum (group discussion)
        $total_discussions = $wpdb->get_var($wpdb->prepare(
            "SELECT COUNT(*) FROM {$wpdb->posts} WHERE post_type = 'topic' AND post_parent = %d AND post_status = 'publish'",
            $forum_id
        ));

        return intval($total_discussions);
    }

    return 0; // Return 0 if no forum is associated with the group
}
// add_action('bp_before_group_header_meta', 'show_group_discussion_count', 10);

// function show_group_discussion_count() {
//     $group_id = bp_get_group_id();
//     $discussion_count = get_total_group_discussions($group_id);

//     echo '<div class="group-discussion-count1">';
//     echo '<strong>Discussions:</strong> ' . $discussion_count;
//     echo '</div>';
// }
function get_total_group_replies($group_id)
{
    global $wpdb;

    // Get the forum ID associated with the group
    $forum_id = groups_get_groupmeta($group_id, 'forum_id');

    if ($forum_id) {
        // Get the total number of replies in the specified forum (group discussion)
        $total_replies = $wpdb->get_var($wpdb->prepare(
            "SELECT COUNT(*) FROM {$wpdb->posts} WHERE post_type = 'reply' AND post_parent IN (
              SELECT ID FROM {$wpdb->posts} WHERE post_type = 'topic' AND post_parent = %d AND post_status = 'publish'
          ) AND post_status = 'publish'",
            $forum_id
        ));

        return intval($total_replies);
    }

    return 0; // Return 0 if no forum is associated with the group
}


// add_action('bp_before_group_header_meta', 'show_group_statistics', 10);

function show_group_statistics()
{
    $group_id = bp_get_group_id();
    $discussion_count = get_total_group_discussions($group_id);
    $reply_count = get_total_group_replies($group_id);
    $member_count = get_total_group_members($group_id);

    echo '<div class="group-statistics">';
    echo '<p>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" version="1.1" style="shape-rendering:geometricPrecision;text-rendering:geometricPrecision;image-rendering:optimizeQuality;" viewBox="0 0 333.33 416.66249999999997" x="0px" y="0px" fill-rule="evenodd" clip-rule="evenodd"><defs><style type="text/css">
   
    .fil0 {fill:black;fill-rule:nonzero}
   
  </style></defs><g><path class="fil0" d="M46.04 28.28l134.69 0c11.75,0 22.43,4.8 30.16,12.54 7.74,7.74 12.54,18.41 12.54,30.16l0 70.09c0,11.75 -4.8,22.43 -12.54,30.16 -7.74,7.73 -18.41,12.54 -30.16,12.54l-98.26 0 -36.69 38.2c-2.92,3.04 -7.76,3.13 -10.8,0.21 -1.56,-1.5 -2.34,-3.5 -2.34,-5.5l-0.02 0 0 -35.1c-7.52,-2.51 -14.13,-7.06 -19.15,-12.98 -6.31,-7.45 -10.13,-17.07 -10.13,-27.52l0 -70.09c0,-11.75 4.8,-22.43 12.54,-30.16 7.73,-7.73 18.41,-12.54 30.16,-12.54zm64.72 201.9c-0.83,-4.13 1.85,-8.15 5.98,-8.97 4.13,-0.83 8.15,1.85 8.97,5.98 1.27,6.31 4.74,11.87 9.57,15.83 4.7,3.86 10.74,6.18 17.31,6.18l101.49 0c2.37,0 4.5,1.08 5.9,2.78l25.4 26.44 0 -22.05c0,-3.94 2.98,-7.19 6.82,-7.61 6.35,-1.16 11.95,-4.54 15.98,-9.3 4.04,-4.77 6.48,-10.94 6.48,-17.66l0 -70.08c0,-7.52 -3.09,-14.37 -8.05,-19.34 -4.97,-4.96 -11.81,-8.05 -19.34,-8.05l-18.93 0c-4.23,0 -7.66,-3.43 -7.66,-7.65 0,-4.23 3.43,-7.66 7.66,-7.66l18.93 0c11.75,0 22.43,4.8 30.16,12.54 7.74,7.73 12.54,18.41 12.54,30.16l0 70.08c0,10.46 -3.82,20.07 -10.13,27.53 -5.02,5.92 -11.63,10.47 -19.15,12.98l0 35.1 -0.02 0c0,2 -0.78,4 -2.34,5.5 -3.04,2.93 -7.87,2.83 -10.8,-0.21l-36.69 -38.2 -98.26 0c-10.19,0 -19.61,-3.65 -27,-9.71 -7.48,-6.14 -12.86,-14.78 -14.83,-24.63zm69.96 -186.59l-134.69 0c-7.52,0 -14.37,3.08 -19.34,8.05 -4.96,4.96 -8.05,11.81 -8.05,19.33l0 70.09c0,6.72 2.44,12.89 6.48,17.66 4.03,4.75 9.63,8.13 15.98,9.3 3.83,0.41 6.82,3.67 6.82,7.61l0 22.05 25.4 -26.44c1.41,-1.7 3.53,-2.78 5.9,-2.78l101.49 0c7.52,0 14.37,-3.08 19.33,-8.05 4.97,-4.96 8.05,-11.81 8.05,-19.33l0 -70.09c0,-7.52 -3.08,-14.37 -8.05,-19.33 -4.96,-4.97 -11.81,-8.05 -19.33,-8.05z"/></g></svg>Total Discussions:<span> ' . $discussion_count . '</span>
  </p>';
    echo '<p><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" fill="#000000" d="M51.713,28.607V15.555L23.83,43.725l27.883,28.169V58.248   c15.618,3.439,28.276,14.764,33.586,29.59c3.46-5.85,5.448-12.674,5.448-19.963C90.747,46.266,73.292,28.738,51.713,28.607z"/><polygon fill-rule="evenodd" clip-rule="evenodd" fill="#000000" points="40.287,21.155 40.287,12.163 24.77,27.839 9.253,43.515    24.77,59.193 40.287,74.869 40.287,66.295 17.947,43.725  "/><polygon fill-rule="evenodd" clip-rule="evenodd" fill="#000000" points="51.713,12.163 51.712,12.163 51.713,12.164  "/></g></svg>Total Replies:<span> ' . $reply_count . '</span></p>';
    echo '<p><svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0">
 <path d="m92 95c-1.6602 0-3-1.3398-3-3v-2.8008c0-12.238-9.8711-22.199-22-22.199s-22 9.9609-22 22.199v2.8008c0 1.6602-1.3398 3-3 3s-3-1.3398-3-3v-2.8008c0-15.551 12.559-28.199 28-28.199s28 12.648 28 28.199v2.8008c0 1.6602-1.3398 3-3 3zm-84-26c-1.6602 0-3-1.3398-3-3v-2.75c0-5.9492 2.3203-11.539 6.5391-15.738s9.8203-6.5117 15.789-6.5117c10.121 0 18.988 6.8008 21.57 16.531 0.42187 1.6016-0.53125 3.2383-2.1289 3.6719-1.6016 0.42188-3.2383-0.53125-3.6719-2.1289-1.8789-7.1133-8.3594-12.074-15.77-12.074-4.3711 0-8.4688 1.6914-11.551 4.7617-3.0781 3.0664-4.7773 7.1484-4.7773 11.488v2.75c0 1.6602-1.3398 3-3 3zm59-16c-9.3711 0-17-7.6289-17-17s7.6289-17 17-17 17 7.6289 17 17-7.6289 17-17 17zm0-28c-6.0703 0-11 4.9297-11 11s4.9297 11 11 11 11-4.9297 11-11-4.9297-11-11-11zm-41 8c-7.7188 0-14-6.2812-14-14s6.2812-14 14-14 14 6.2812 14 14-6.2812 14-14 14zm0-22c-4.4102 0-8 3.5898-8 8s3.5898 8 8 8 8-3.5898 8-8-3.5898-8-8-8z"/>
</svg>Total Members:<span> ' . $member_count . '</span>
    </p>';
    echo '</div>';
}



function get_total_group_members($group_id)
{
    // Get the group object
    $group = groups_get_group(array('group_id' => $group_id));

    // Return the member count
    return $group->total_member_count;
}


// Initialize a flag to prevent multiple outputs
function add_shortcode_once_flag()
{
    static $has_output = false;

    if ($has_output) {
        return; // Exit if content has already been output
    }

    // Set the flag to true to prevent further outputs
    $has_output = true;

    // Output the shortcode
    echo do_shortcode('[custom_mo_social_sharing]'); // Replace [your_shortcode] with your actual shortcode
    echo do_shortcode('[buddyboss_breadcrumbs]');
}

add_action('bp_group_header_actions', 'add_shortcode_once_flag', 20);

// function add_shortcode_in_forum_header() {
//     if (bp_is_group_forum()) {
//         // Output the shortcode
//   echo do_shortcode('[miniorange_social_sharing]'); // Replace [your_shortcode] with your actual shortcode
//     }
// }
// add_action('bp_template_content', 'add_shortcode_in_forum_header');


function get_top_members_in_group($group_id, $limit = 5)
{
    global $wpdb;

    // Get forum ID associated with the group
    $forum_id = groups_get_groupmeta($group_id, 'forum_id');

    if (!$forum_id) {
        return array(); // Return empty if no forum is associated with the group
    }

    // Get user IDs from the specified group
    $user_ids = $wpdb->get_col($wpdb->prepare(
        "SELECT user_id FROM {$wpdb->prefix}bp_groups_members WHERE group_id = %d AND is_confirmed = 1",
        $group_id
    ));

    if (empty($user_ids)) {
        return array(); // Return empty if no users are found
    }

    // Prepare SQL to get the top members based on posts and replies count
    $placeholders = implode(',', array_fill(0, count($user_ids), '%d'));
    $sql = $wpdb->prepare(
        "SELECT post_author, 
              SUM(CASE WHEN post_type = 'topic' THEN 1 ELSE 0 END) AS post_count,
              SUM(CASE WHEN post_type = 'reply' THEN 1 ELSE 0 END) AS reply_count
       FROM {$wpdb->posts}
       WHERE post_author IN ($placeholders) AND post_status = 'publish'
       GROUP BY post_author
       ORDER BY (post_count + reply_count) DESC
       LIMIT %d",
        array_merge($user_ids, array($limit))
    );

    // Execute the query and get results
    $top_members = $wpdb->get_results($sql);

    return $top_members;
}





function top_members_shortcode()
{

    // Ensure we have a valid group ID
    $group_id = bp_get_group_id();

    if (!$group_id) {
        return '<p>Group ID is not available.</p>';
    }

    $top_members = get_top_members_in_group($group_id);

    if (!empty($top_members)) {
        ob_start(); // Start output buffering

        echo '<div class="top-members-widget">';
        echo '<h3>Top Members</h3>';

        foreach ($top_members as $member) {
            $user = get_userdata($member->post_author);
            if ($user) {
                echo '<div class="top-member-wrapper">';

                echo '<div class="member-icon">';
                echo '  <img src="' . get_user_avatar_url($member->post_author) . '" alt="">';
                echo '</div>';
                echo '<div class="member-txt">';
                echo '<h4 class="heading-txt">';
                echo bp_core_get_userlink($member->post_author);
                echo '</h4>';
                echo '<p><span class="question">';
                echo esc_html($member->post_count) . ' Posts</span><span class="post-count">' . esc_html($member->reply_count) . ' Replies </span></p>';
                echo '</div>';
                echo '</div>';
            }
        }

        echo '</div>';

        return ob_get_clean(); // Return the buffered content
    } else {
        return '<p>No top members found.</p>';
    }
}


// add_shortcode('top_members', 'top_members_shortcode');

function get_user_avatar_url($user_id)
{
    // Get the avatar HTML
    $avatar_html = bp_core_fetch_avatar(array('item_id' => $user_id, 'html' => true));

    // Extract the URL from the avatar HTML
    preg_match('/src=["\']([^"\']+)["\']/', $avatar_html, $matches);

    // Return the URL if found
    return isset($matches[1]) ? $matches[1] : '';
}



add_shortcode('buddy_boss_profile', 'custom_author_profile_widget');

function custom_author_profile_widget()
{
    global $post;
    $current_url = rtrim($_SERVER['REQUEST_URI'], '/');
    $last_part = substr($current_url, strrpos($current_url, '/') + 1);

    if ($post->post_type == 'topic') {


        // Get the author ID
        $discussion_id = bbp_get_topic_id();

        // Get the author ID
        $author_id = bbp_get_topic_author_id($discussion_id);

        $args = array(
            'author'        => $author_id,
            'post_type'     => 'topic', // Change this if you have a different post type for discussions
            'post_status'   => 'publish',
            'posts_per_page' => -1,
        );
        $author_posts = new WP_Query($args);
        $post_count = $author_posts->found_posts;

        // Get the count of replies authored by the user
        $args_replies = array(
            'author'        => $author_id,
            'post_type'     => 'reply', // Change this if you have a different post type for replies
            'post_status'   => 'publish',
            'posts_per_page' => -1,
        );
        $author_replies = new WP_Query($args_replies);
        $reply_count = $author_replies->found_posts;

        // Get the author's display name
        $author_name = bp_core_get_user_displayname($author_id);

        if (function_exists('bp_get_total_followers')) {
            $follower_count = bp_get_total_followers($author_id);
        } else {
            $follower_count = 0; // BuddyPress followers function might not be available
        }

        if (function_exists('get_user_following_count')) {
            $following_count = get_user_following_count($author_id);
        } else {
            $following_count = 0; // BuddyPress followers function might not be available
        }

        $user_info = get_userdata($author_id);
        $last_joining_date = $user_info->user_registered;
        $profile_url = bp_core_get_user_domain($author_id);

        echo '<div class="profile-card">';
        echo '<A href="' . $profile_url . '">';
        echo get_avatar($author_id, 96); // Display author avatar
        echo "</a>";
        echo '<h2><A href="' . $profile_url . '">' . esc_html($author_name) . '</a></h2>';
        echo '<div class="dis-card">';
        echo '<p><strong>' . esc_html($post_count) . '</strong> Discussions</p>';
        echo '<p><strong>' . esc_html($reply_count) . '</strong> Replies</p>';
        echo '</div>';
        echo '<div class="dis-card follower-card">';
        echo '<p><strong>' . esc_html($follower_count) . '</strong> Followers</p>';
        echo '<p><strong>' . esc_html($following_count) . '</strong> Following</p>';
        echo '</div>';
        echo '<p class="join-para">Joined on: ' . esc_html(date('F j, Y', strtotime($last_joining_date))) . '</p>';
        echo '</div>';
    } else {
?>
        <script>
            jQuery(document).ready(function() {
                jQuery(".widget-area > aside").eq(0).remove();
            });
        </script>
    <?php
    }
}


function custom_add_reply_button()
{
    global $post;
    $current_url = home_url(add_query_arg(array(), $wp->request));

    // Check if the current URL matches the specific discussion page
    if ($post->post_type === 'topic') {


        echo '<div class="custom-button-wrapper"><button data-balloon-pos="up" data-balloon="Reply" id="custom-reply-button" class="custom-reply-btn">
     <span> <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" fill="#000000" d="M51.713,28.607V15.555L23.83,43.725l27.883,28.169V58.248   c15.618,3.439,28.276,14.764,33.586,29.59c3.46-5.85,5.448-12.674,5.448-19.963C90.747,46.266,73.292,28.738,51.713,28.607z"/><polygon fill-rule="evenodd" clip-rule="evenodd" fill="#000000" points="40.287,21.155 40.287,12.163 24.77,27.839 9.253,43.515    24.77,59.193 40.287,74.869 40.287,66.295 17.947,43.725  "/><polygon fill-rule="evenodd" clip-rule="evenodd" fill="#000000" points="51.713,12.163 51.712,12.163 51.713,12.164  "/></g></svg></span>
     <span class="btn-txt"> Reply </span>
      </button> </div>';

        if (function_exists('bbp_is_subscriptions_active') && bbp_is_subscriptions_active()) {
            $topic_id = bbp_get_topic_id(); // Get the current topic ID
            $user_id = get_current_user_id(); // Get the current user ID

            if (bbp_is_user_subscribed($user_id, $topic_id)) {
                echo ' <div class="custom-button-wrapper"> <button data-balloon-pos="up" data-balloon="Subscribed" id="custom-subscribed-button" class="custom-subscribed-btn">
            <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
            <path d="M0.209365 9.96607C2.39306 9.96607 4.44587 10.8191 5.98856 12.3706C7.53408 13.9221 8.38498 15.9887 8.38498 18.1886H11.7501C11.7501 11.7988 6.57276 6.60058 0.209365 6.60058V9.96607ZM0.214657 4.00026C7.99728 4.00026 14.3293 10.3668 14.3293 18.1928H17.6944C17.6944 8.51087 9.85253 0.635117 0.214657 0.635117V4.00026ZM4.86814 15.8419C4.86814 17.1289 3.82427 18.1727 2.53734 18.1727C1.25041 18.1727 0.206543 17.1292 0.206543 15.8419C0.206543 14.5543 1.25006 13.5111 2.53699 13.5111C3.82392 13.5111 4.86814 14.5543 4.86814 15.8419Z" fill="#9B9C9F"/>
            </svg>
            </span><span class="btn-txt">Subscribed</span>
        </button></div>';
            } else {
                echo '<div class="custom-button-wrapper"> <button data-balloon-pos="up" data-balloon="Subscribe" id="custom-subscribed-button" class="custom-subscribe-btn">
            <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M9.87107 18.6886C9.75152 16.5449 8.86447 14.5453 7.3428 13.0177C5.82458 11.491 3.83834 10.6009 1.70937 10.4802V8.11181C7.39889 8.36784 11.9851 12.9708 12.239 18.6886H9.87107ZM1.71466 2.14241C10.6789 2.40422 17.9278 9.68233 18.1872 18.6928H15.8209C15.5634 10.9905 9.38004 4.769 1.71466 4.50873V2.14241ZM5.36814 16.8419C5.36814 17.8527 4.54813 18.6727 3.53734 18.6727C2.5265 18.6727 1.70654 17.853 1.70654 16.8419C1.70654 15.8304 2.5262 15.0111 3.53699 15.0111C4.54798 15.0111 5.36814 15.8306 5.36814 16.8419Z" stroke="#9B9C9F"/>
            </svg>
            </span><span class="btn-txt">Subscribe </span>
        </button></div>';
            }
        }

        if (function_exists('bbp_is_favorites_active') && bbp_is_favorites_active()) {
            $topic_id = bbp_get_topic_id(); // Get the current topic ID
            $user_id = get_current_user_id(); // Get the current user ID

            // Check if the current user has favorited the topic
            if (bbp_is_user_favorite($user_id, $topic_id)) {
                echo '<div class="custom-button-wrapper"><button data-balloon-pos="up" data-balloon="Favorited" id="custom-favorite-button" class="custom-favorited-btn">
            <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M9.99996 3.22L9.38996 2.61999C8.34988 1.63643 6.96731 1.09713 5.53595 1.11665C4.10459 1.13618 2.73724 1.71299 1.72438 2.72455C0.71151 3.73612 0.13294 5.10272 0.111575 6.53405C0.0902106 7.96539 0.627735 9.34865 1.60996 10.39L9.99996 18.78L18.39 10.38C19.3722 9.33865 19.9097 7.95539 19.8883 6.52406C19.867 5.09272 19.2884 3.72612 18.2755 2.71455C17.2627 1.70299 15.8953 1.12618 14.464 1.10665C13.0326 1.08713 11.65 1.62643 10.61 2.61L9.99996 3.22Z" fill="#9B9C9F"/>
            </svg>
            </span> <span class="btn-txt">Favorited</span> 
        </button></div>';
            } else {
                echo '<div class="custom-button-wrapper">  <button data-balloon-pos="up" data-balloon="Favorite" id="custom-favorite-button" class="custom-favorite-btn" >
            <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M9.64934 3.57646L10.0029 3.92419L10.3535 3.57355L10.9585 2.96859C11.9034 2.07742 13.1582 1.58889 14.4572 1.60661C15.7584 1.62435 17.0014 2.14873 17.9222 3.06833C18.843 3.98794 19.369 5.23031 19.3884 6.53152C19.4078 7.8304 18.9209 9.08574 18.031 10.0318L9.99975 18.0727L1.96879 10.0417C1.07897 9.09564 0.592133 7.84035 0.61152 6.54152C0.630942 5.24031 1.15691 3.99794 2.0777 3.07833C2.99849 2.15873 4.24154 1.63435 5.54277 1.61661C6.8424 1.59888 8.0978 2.08793 9.04293 2.97999L9.64934 3.57646Z" stroke="#9B9C9F"/>
            </svg>
            </span><span class="btn-txt">Favorite</span>
        </button></div>';
            }
        }
    }
}
add_shortcode('bp_template_content', 'custom_add_reply_button');




// Loader
function add_custom_page_loader()
{
    ?>
    <div class="page-loader">
        <div class="spinner"></div>
        <div class="txt"></div>
    </div>
<?php
}
add_action('wp_head', 'add_custom_page_loader');

function add_custom_page_loader_script()
{
?>
    <script type="text/javascript">
        jQuery(window).on('load', function() {
            setTimeout(function() { // allowing 100 mili secs to fade out loader
                jQuery('.page-loader').fadeOut('slow');
            }, 100);
        });
    </script>
    <?php
}
add_action('wp_footer', 'add_custom_page_loader_script');


function custom_breadcrumbs()
{
    // Variables
    $separator = ' / ';
    $home_title = 'Home';

    // Get the query & post information
    global $post;
    $category = get_the_category();
    $first_category = !empty($category) ? $category[0] : null;

    // Build the breadcrumbs
    echo '<ul class="custom-breadcrumbs">';

    // Home
    echo '<li><a href="' . get_home_url() . '">' . $home_title . '</a>' . $separator . '</li>';

    // Blogs
    echo '<li><a href="' . get_home_url() . '/blogs' . '">Blogs</a>' . $separator . '</li>';

    // Category
    if ($first_category) {
        echo '<li><a href="' . get_category_link($first_category->term_id) . '">' . $first_category->name . '</a>' . $separator . '</li>';
    }

    // Current Post
    echo '<li>' . get_the_title() . '</li>';

    echo '</ul>';
}

add_shortcode('custom_breadcrumbs', 'custom_breadcrumbs');


function custom_market_research_breadcrumbs()
{
    // Variables
    $separator = ' / ';
    $home_title = 'Home';

    // Get the query & post information
    global $post;
    $post_type = 'market-research';
    $taxonomy = 'research_category';
    $terms = get_the_terms($post->ID, $taxonomy);
    $first_term = !empty($terms) ? $terms[0] : null;

    // Build the breadcrumbs
    echo '<ul class="custom-breadcrumbs">';

    // Home
    echo '<li><a href="' . get_home_url() . '">' . $home_title . '</a>' . $separator . '</li>';

    // Market Research
    echo '<li><a href="' . get_home_url() . '/market-research' . ' ">Market Research</a>' . $separator . '</li>';

    // Research Category
    if ($first_term) {
        echo '<li><a href="' . get_term_link($first_term->term_id, $taxonomy) . '">' . $first_term->name . '</a>' . $separator . '</li>';
    }

    // Current Post
    echo '<li>' . get_the_title() . '</li>';

    echo '</ul>';
}

add_shortcode('market_research_breadcrumbs', 'custom_market_research_breadcrumbs');

function bb_enable_breadcrumbs_forum_topic($param)
{
    return false;
}
add_filter('bbp_no_breadcrumb', 'bb_enable_breadcrumbs_forum_topic', 999);


function custom_buddyboss_breadcrumbs()
{
    // Variables
    $separator = ' / ';
    $home_title = 'Home';

    // Get the global BuddyPress object
    global $bp;

    // Start building the breadcrumb trail
    echo '<ul class="custom-breadcrumbs">';

    // Home
    echo '<li><a href="' . home_url() . '">' . $home_title . '</a>' . $separator . '</li>';

    // Conditional Breadcrumbs based on BuddyPress context
    if (bp_is_groups_component()) {
        // Group Directory or Single Group
        if (bp_is_group_home()) {
            echo '<li><a href="' . bp_get_groups_directory_permalink() . '">Groups</a>' . $separator . '</li>';
            echo '<li>' . bp_get_group_name() . '</li>';
        } else {
            echo '<li>Groups</li>';
        }
    } elseif (bp_is_members_component()) {
        // Member Directory or Single Member
        if (bp_is_user()) {
            echo '<li><a href="' . bp_get_members_directory_permalink() . '">Members</a>' . $separator . '</li>';
            echo '<li>' . bp_get_displayed_user_fullname() . '</li>';
        } else {
            echo '<li>Members</li>';
        }
    } elseif (bp_is_activity_component()) {
        // Activity Directory
        echo '<li>Activity</li>';
    } elseif (bp_is_user_activity()) {
        // Single Member Activity
        echo '<li><a href="' . bp_get_members_directory_permalink() . '">Members</a>' . $separator . '</li>';
        echo '<li><a href="' . bp_get_displayed_user_link() . '">' . bp_get_displayed_user_fullname() . '</a>' . $separator . '</li>';
        echo '<li>Activity</li>';
    } else {
        // Fallback if no specific context is found
        echo '<li>' . bp_current_component() . '</li>';
    }

    echo '</ul>';
}

add_shortcode('buddyboss_breadcrumbs', 'custom_buddyboss_breadcrumbs');

function custom_bbp_topic_tags_with_count_shortcode($atts)
{
    // Parse shortcode attributes and set default values
    $atts = shortcode_atts(array(
        'count' => 5, // Default number of tags to display
    ), $atts, 'bbp_topic_tags_with_count');

    // Get all topic tags with limit
    $tags = get_terms(array(
        'taxonomy' => bbp_get_topic_tag_tax_id(),
        'hide_empty' => true,
        'number' => intval($atts['count']), // Limit the number of tags based on the 'count' attribute
    ));

    if (!empty($tags) && !is_wp_error($tags)) {

        foreach ($tags as $tag) {
            // Get the count for each tag
            $count = $tag->count;

            // Get the tag link
            $link = get_term_link($tag);

            // Generate the list item
            $output .= '<a class="tag-cloud-link tag-link-' . $tag->term_id . ' tag-link-position-' . $count . '" href="' . site_url() . '/forums/topic-tag/' . $term_object->slug . '">' . $tag->name . '</a>';
        }
    } else {
        $output = '<p>No tags found.</p>';
    }

    return $output;
}
add_shortcode('bbp_topic_tags_with_count', 'custom_bbp_topic_tags_with_count_shortcode');


function custom_trending_tags_shortcode($attr)
{


    global $post, $wpdb;
    $atts = shortcode_atts(array(
        'count' => 10, // Default placeholder text
    ), $attr, 'custom_trending_tags');
    $count_test = $atts['count'];
    // For a specific page, return default topic tags shortcode
    if ($post->ID == 43) {
        return do_shortcode('[bbp_topic_tags_with_count count=' . $count_test . ']');
    } else {
        // Get the current forum ID
        $forum_id = bbp_get_forum_id();

        // Check if we are within a BuddyBoss group forum
        if (bp_is_group()) {
            // Get the group ID
            $group_id = bp_get_current_group_id();

            // Get the forum ID associated with the group
            $forum_id = groups_get_groupmeta($group_id, 'forum_id');
        }

        // Query to get trending tags within the specific forum
        $query = $wpdb->prepare(
            "SELECT terms.term_id, terms.name, COUNT(term_relationships.object_id) as tag_count
          FROM {$wpdb->terms} AS terms
          INNER JOIN {$wpdb->term_taxonomy} AS term_taxonomy ON terms.term_id = term_taxonomy.term_id
          INNER JOIN {$wpdb->term_relationships} AS term_relationships ON term_taxonomy.term_taxonomy_id = term_relationships.term_taxonomy_id
          INNER JOIN {$wpdb->posts} AS posts ON posts.ID = term_relationships.object_id
          WHERE term_taxonomy.taxonomy = 'topic-tag'
          AND posts.post_type = 'topic'
          AND posts.post_status = 'publish'
          AND posts.post_parent = %d
          GROUP BY terms.term_id
          ORDER BY tag_count DESC
          LIMIT $count_test",
            $forum_id
        );

        $tags = $wpdb->get_results($query);

        // Handle errors
        if (is_wp_error($tags)) {
            return '<p>An error occurred while fetching the tags.</p>';
        } else {
            // Check if tags are found
            if (!empty($tags)) {
                $output = '';
                $count = 1;
                foreach ($tags as $tag) {
                    if ($count <= $count_test) {

                        $term_object = get_term($tag->term_id);
                        $output .= '<a class="tag-cloud-link tag-link-' . $tag->term_id . ' tag-link-position-' . $count . '" href="' . site_url() . '/forums/topic-tag/' . $term_object->slug . '">' . $tag->name . '</a>';
                    }

                    $count++;
                }
            } else {
                $output = '<p>No trending tags found for this forum.</p>';
            }
        }

        return $output;
    }
}

add_shortcode('custom_trending_tags', 'custom_trending_tags_shortcode');


// add_shortcode('custom_trending_tags', 'custom_trending_tags_shortcode');





function custom_bbp_group_discussions_shortcode($atts)
{

    // Ensure we're on a BuddyPress group page
    if (!bp_is_group()) {
        // return '<p>Not on a BuddyPress group page.</p>';
    }

    // Get the current group ID
    $group_id = bp_get_current_group_id();
    // Retrieve the associated forum ID
    $forum_id = groups_get_groupmeta($group_id, 'forum_id');

    if (!$forum_id) {
        return '<p>No forum associated with this group.</p>';
    }

    // Set default attributes and parse the shortcode attributes
    $atts = shortcode_atts(array(
        'number' => 10, // Default number of discussions to show
    ), $atts, 'custom_bbp_group_discussions');

    // Start output buffering
    ob_start();

    // Custom query to fetch discussions (topics) for the current group
    $args = array(
        'post_type' => 'topic',
        'post_status' => 'publish',
        'meta_query' => array(
            array(
                'key' => '_bbp_forum_id',
                'value' => $forum_id,
                'compare' => '='
            )
        ),
        'orderby' => 'comment_count', // Order by number of replies
        'posts_per_page' => intval($atts['number']) // Use the number from shortcode attributes
    );

    $query = new WP_Query($args);

    if ($query->have_posts()) {
        echo '<div id="bbpress-forums">';
        echo '<ul id="bbp-topics">';
        while ($query->have_posts()) {
            $query->the_post();
    ?>
            <li id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <div class="bbp-topic-title">
                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                </div>
                <div class="bbp-topic-meta">
                    <span class="bbp-topic-replies"><?php echo get_comments_number(); ?> Replies</span>
                </div>
            </li>
        <?php
        }
        echo '</ul>';
        echo '</div>';

        // Reset Post Data
        wp_reset_postdata();
    } else {
        echo '<p>No discussions found for this group.</p>';
    }

    return ob_get_clean();
}

add_shortcode('custom_bbp_single_view_group_discussions', 'custom_bbp_group_discussions_shortcode');


function custom_mo_social_sharing()
{
    // Get the current page URL
    // $current_url = get_permalink();
    $current_url = current_page_url();
    // Return the original shortcode with the dynamic URL (if supported)
    return do_shortcode('[miniorange_social_sharing url="' . esc_url($current_url) . '"]');
}
add_shortcode('custom_mo_social_sharing', 'custom_mo_social_sharing');

// register custom widget
include_once 'inc/plugins/common/widget.php';

function t24_bbp_widgets_init()
{

    register_widget('T24_BBP_Forums_Widget');
    register_widget('T24_BBP_Topics_Widget');
    register_widget('T24_BBP_Stats_Widget');
}


add_action('widgets_init', 't24_bbp_widgets_init', 30);

// forums by # views ==========================

function custom_query_forums_by_views($query)
{
    // Get current meta Query
    $meta_query = $query->get('meta_query');
    // If there is no meta query when this filter runs, it should be initialized as an empty array.
    if (! $meta_query) {
        $meta_query = [];
    }
    // Append our meta query

    $meta_query[] = [
        'key' => 'views',
        'type' => 'NUMERIC',
    ];

    $query->set('post_type', ['forum']);
    $query->set('meta_query', $meta_query);
    $query->set('orderby', 'meta_value_num');
}

add_action('elementor/query/custom_query_forums_by_views', 'custom_query_forums_by_views');


function custom_buddypress_default_profile_tab()
{
    if (bp_is_user() && bp_is_current_action('photos')) {
        bp_core_redirect(bp_displayed_user_domain() . bp_get_profile_slug() . '/');
    }
}
add_action('bp_actions', 'custom_buddypress_default_profile_tab');

function dd($args)
{
    echo '<pre>';
    print_r($args);
    echo '</pre>';
    wp_die();
}

function current_page_url()
{
    $actual_link = (empty($_SERVER['HTTPS']) ? 'http' : 'https') . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
    return $actual_link;
}

function track_post_views($post_id)
{
    global $post;
    if (!is_single() || empty($post_id)) return;
    $postID = $post->ID;
    // Get the current user or IP identifier
    $user_id = get_current_user_id();
    $user_identifier = $user_id ? 'user_' . $user_id : 'ip_' . $_SERVER['REMOTE_ADDR'];

    // Generate a unique key for this user and post
    $key = 'viewed_post_' . $postID . '_' . $user_identifier;

    // Check if the view is already counted for this user/session
    if (!isset($_COOKIE[$key])) {
        // Use a transient to lock the post postID the view count update
        $lock_key = 'view_count_lock_' . $postID;
        if (false === get_transient($lock_key)) {
            set_transient($lock_key, 'locked', 2); // Lock for 10 seconds

            // Update view count for the post using the 'views' meta key
            $views = get_post_meta($postID, 'views', true);
            $views = $views ? intval($views) + 1 : 1;
            update_post_meta($postID, 'views', $views);

            // Unlock after updating
            delete_transient($lock_key);
        }

        // Set a cookie to track this view
        setcookie($key, true, time() + 3600 * 24, '/'); // 24-hour cookie
    }
}
add_action('wp', 'track_post_views');

add_action('update_option_facewp_count', 'sync_blog_pages_show_at_most', 10, 2);

function sync_blog_pages_show_at_most($old_value, $new_value)
{
    // Update the 'posts_per_page' option with the new FaceWP count value
    update_option('posts_per_page', $new_value);
}


function filter_elementor_loop_grid_query($query)
{

    // Ensure this only runs on archive pages
    if (is_archive()) {
        // Get the current archive context (category, tag, author, etc.)
        if (is_category() || is_tag() || is_tax()) {
            $query->set('tax_query', array(
                array(
                    'taxonomy' => get_queried_object()->taxonomy,
                    'field'    => 'term_id',
                    'terms'    => get_queried_object_id(),
                ),
            ));
        } elseif (is_author()) {
            $query->set('author', get_queried_object_id());
        }
    }
}
add_action('elementor/query/current_archive_posts', 'filter_elementor_loop_grid_query');

function modify_facetwp_query($query)
{
    if (! is_admin() && $query->is_main_query()) {
        if (is_post_type_archive() || is_tax() || is_category() || is_tag()) {

            $a = get_option('facetwp_settings');
            $page_count = json_decode($a)->templates[1]->query_obj->posts_per_page;
            $query->set('posts_per_page', $page_count); // Set your desired number of posts per page
        }
    }
}
add_action('pre_get_posts', 'modify_facetwp_query');



function custom_breadcrumbs_market_list()
{
    global $term;
    $full_term = get_term_by('slug', $term, 'research_type');
    $separator = ' / ';
    $home_title = 'Home';
    global $post;
    echo '<ul class="custom-breadcrumbs">';
    echo '<li><a href="' . get_home_url() . '">' . $home_title . '</a>' . $separator . '</li>';
    echo '<li><a href="' . get_home_url() . '/market-research' . '">Market Research</a>' . $separator . '</li>';
    echo '<li>Research Type' . $separator . '</li>';
    echo '<li>' . $full_term->name . '</li>';
    echo '</ul>';
}

add_shortcode('custom_breadcrumbs_market_list', 'custom_breadcrumbs_market_list');

function custom_breadcrumbs_market_category()
{
    global $term;
    $full_term = get_term_by('slug', $term, 'research_category');
    $separator = ' / ';
    $home_title = 'Home';
    global $post;
    echo '<ul class="custom-breadcrumbs">';
    echo '<li><a href="' . esc_url(get_home_url()) . '">' . esc_html($home_title) . '</a>' . $separator . '</li>';
    echo '<li><a href="' . esc_url(get_home_url() . '/market-research') . '">Market Research</a>' . $separator . '</li>';
    echo '<li>Research Category' . $separator . '</li>';
    echo '<li>' . $full_term->name . '</li>';
    echo '</ul>';
}
add_shortcode('custom_breadcrumbs_market_category', 'custom_breadcrumbs_market_category');


function custom_breadcrumbs_blog_category()
{
    $separator = ' / ';
    $home_title = 'Home';
    global $post;
    echo '<ul class="custom-breadcrumbs">';
    echo '<li><a href="' . esc_url(get_home_url()) . '">' . esc_html($home_title) . '</a>' . $separator . '</li>';
    echo '<li><a href="' . esc_url(get_home_url() . '/blogs') . '">Blog</a>' . $separator . '</li>';
    echo '<li>Category' . $separator . '</li>';
    echo '<li>' . get_category_name_from_url(get_current_url()) . '</li>';
    echo '</ul>';
}
add_shortcode('custom_breadcrumbs_blog_category', 'custom_breadcrumbs_blog_category');

function custom_breadcrumbs_blog_category_tag()
{
    $separator = ' / ';
    $home_title = 'Home';
    global $post;
    echo '<ul class="custom-breadcrumbs">';
    echo '<li><a href="' . esc_url(get_home_url()) . '">' . esc_html($home_title) . '</a>' . $separator . '</li>';
    echo '<li><a href="' . esc_url(get_home_url() . '/blogs') . '">Blog</a>' . $separator . '</li>';
    echo '<li>Tag' . $separator . '</li>';
    echo '<li>' . get_tag_name_from_url(get_current_url()) . '</li>';
    echo '</ul>';
}
add_shortcode('custom_breadcrumbs_blog_category_tag', 'custom_breadcrumbs_blog_category_tag');

function custom_breadcrumbs_market_tag()
{
    global $term;
    $full_term = get_term_by('slug', $term, 'research_tag');

    $separator = ' / ';
    $home_title = 'Home';
    global $post;
    echo '<ul class="custom-breadcrumbs">';
    echo '<li><a href="' . esc_url(get_home_url()) . '">' . esc_html($home_title) . '</a>' . $separator . '</li>';
    echo '<li><a href="' . esc_url(get_home_url() . '/market-research') . '">Market Research</a>' . $separator . '</li>';
    echo '<li>Research Tag' . $separator . '</li>';
    echo '<li>' . $full_term->name . '</li>';
    echo '</ul>';
}
add_shortcode('custom_breadcrumbs_market_tag', 'custom_breadcrumbs_market_tag');




// Register the new cloned widget
function register_bb_replies_widget_clone()
{
    class BB_Replies_Widget_Clone extends WP_Widget
    {
        public function __construct()
        {
            $widget_ops = apply_filters(
                'bb_replies_widget_clone_options',
                array(
                    'classname'                   => 'widget_display_replies_clone',
                    'description'                 => __('Modified recent replies from your forum.', 'buddyboss'),
                    'customize_selective_refresh' => true,
                )
            );

            parent::__construct(false, __('Tech24 Recent Discussion'), $widget_ops);
        }

        public function widget($args, $instance)
        {
            $settings = $this->parse_settings($instance);
            $settings['title'] = apply_filters('widget_title', $settings['title'], $instance, $this->id_base);
            $settings['title'] = apply_filters('bbp_replies_widget_clone_title', $settings['title'], $instance, $this->id_base);

            // Use a static variable to hold displayed reply IDs to prevent duplicates
            static $displayed_reply_ids = [];

            if ($settings['order_by'] == 'freshness') {
                $widget_query = new WP_Query(
                    array(
                        'post_type'              => bbp_get_topic_post_type(),
                        'posts_per_page'         => (int) $settings['max_shown'],
                        'post_status'            => array(bbp_get_public_status_id(), bbp_get_closed_status_id()),
                        'meta_query'             => array(
                            array(
                                'key'  => '_bbp_last_active_time',
                                'type' => 'DATETIME',
                            ),
                        ),
                        'orderby'                => 'meta_value',
                        'order'                  => 'DESC',
                        'ignore_sticky_posts'    => true,
                        'no_found_rows'          => true,
                        'update_post_term_cache' => false,
                        'update_post_meta_cache' => false,
                    )
                );
            } else if ($settings['order_by'] == 'popular') {
                $widget_query = new WP_Query(
                    array(
                        'post_type'              => bbp_get_topic_post_type(),
                        'posts_per_page'         => (int) $settings['max_shown'],
                        'post_status'            => array(bbp_get_public_status_id(), bbp_get_closed_status_id()),
                        'meta_key'               => 'views', // Use the meta key for views
                        'orderby'                => 'meta_value_num',
                        'order'                  => 'DESC',
                        'ignore_sticky_posts'    => true,
                        'no_found_rows'          => true,
                        'update_post_term_cache' => false,
                        'update_post_meta_cache' => false,
                    )
                );
            } else {
                $widget_query = new WP_Query(
                    array(
                        'post_type'              => bbp_get_topic_post_type(),
                        'post_status'            => array(bbp_get_public_status_id(), bbp_get_closed_status_id()),
                        'posts_per_page'         => (int) $settings['max_shown'],
                        'ignore_sticky_posts'    => true,
                        'no_found_rows'          => true,
                        'update_post_term_cache' => false,
                        'update_post_meta_cache' => false,
                        'orderby'                => 'date',
                        'order'                  => 'DESC',
                    )
                );
            }


            if (!$widget_query->have_posts()) {
                return;
            }


            ob_start();

            echo $args['before_widget'];

            if (!empty($settings['title'])) {
                echo $args['before_title'] . $settings['title'] . $args['after_title'];
            }
        ?>

            <ul>

                <?php while ($widget_query->have_posts()) : $widget_query->the_post(); ?>
                    <?php
                    $reply_id = bbp_get_topic_id($widget_query->post->ID);
                    $topic_id    = bbp_get_topic_id($widget_query->post->ID);



                    // Check if the reply ID has already been displayed
                    if (in_array($reply_id, $displayed_reply_ids)) {
                        continue; // Skip to the next reply if it's a duplicate
                    }

                    $displayed_reply_ids[] = $reply_id; // Add reply ID to the displayed array
                    $reply_link = '<a class="bbp-reply-topic-title" href="' . esc_url(bbp_get_reply_url($reply_id)) . '" title="' . esc_attr(bbp_get_reply_excerpt($reply_id, 50)) . '">' . bbp_get_reply_topic_title($reply_id) . '</a>';

                    if (!empty($settings['show_user'])) :
                        $author_link = bbp_get_reply_author_link(
                            array(
                                'post_id' => $reply_id,
                                'type'    => 'both',
                                'size'    => 14,
                            )
                        );
                        $author_related_class = 'bbp-reply-topic-has-avatar';
                    else :
                        $author_link = false;
                        $author_related_class = 'bbp-reply-topic-no-avatar';
                    endif;

                    $reply_author_url = bbp_get_reply_author_url($reply_id);

                    ?>

                    <li class="<?php echo $author_related_class; ?>  recent-main">
                        <?php if (!empty($author_link)) : ?>

                            <a href="<?php echo esc_url($reply_author_url); ?>" class="bbp-author-link" rel="nofollow">
                                <span class="bbp-author-avatar">
                                    <?php echo bbp_get_reply_author_avatar($reply_id); ?>
                                </span>
                            </a>

                        <?php endif; ?>

                        <div class="bbp-reply-info">

                            <?php

                            if (!empty($author_link)) :
                            ?> <a class="bbp-forum-title" href="<?php bbp_topic_permalink($topic_id); ?>"><strong><?php bbp_topic_title($topic_id); ?></strong></a>
                                <?php
                                printf(__('by <strong>%1$s</strong>'), '<span class="topic-author"><a href="' . esc_url($reply_author_url) . '">' . bbp_get_topic_author_display_name($topic_id) . '</a></span>');
                            endif;

                            if (!empty($settings['show_date'])) :
                                if ($settings['order_by'] == 'newness' || $settings['order_by'] == 'popular') {
                                    $post_time = get_the_time('U', $reply_id);
                                    $current_time = current_time('timestamp');
                                    $time_difference = human_time_diff($post_time, $current_time); ?>
                                    <div class="time-since"><?php echo esc_html($time_difference . ' ago'); ?></div>
                                <?php } else { ?>
                                    <div class="time-since"><?php bbp_topic_last_active_time($reply_id); ?></div>
                                <?php }
                                ?>
                            <?php endif; ?>
                        </div>
                    </li>

                <?php endwhile; ?>

            </ul>

        <?php
            echo $args['after_widget'];

            // Reset the $post global
            wp_reset_postdata();

            // Output the current buffer
            echo ob_get_clean();
        }

        public function form($instance)
        {
            $title     = !empty($instance['title']) ? $instance['title'] : '';
            $max_shown = !empty($instance['max_shown']) ? $instance['max_shown'] : 5;
            $show_date = !empty($instance['show_date']) ? (bool) $instance['show_date'] : false;
            $show_user = !empty($instance['show_user']) ? (bool) $instance['show_user'] : false;
            $parent_forum = !empty($instance['parent_forum']) ? (bool) $instance['parent_forum'] : '';
            $order_by  = !empty($instance['order_by']) ? $instance['order_by'] : 'newness';
        ?>
            <p>
                <label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Title:'); ?></label>
                <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo esc_attr($title); ?>">
            </p>
            <p>
                <label for="<?php echo $this->get_field_id('max_shown'); ?>"><?php _e('Number of replies to show:'); ?></label>
                <input id="<?php echo $this->get_field_id('max_shown'); ?>" name="<?php echo $this->get_field_name('max_shown'); ?>" type="number" value="<?php echo esc_attr($max_shown); ?>" min="1">
            </p>

            <p>
                <label for="<?php echo $this->get_field_id('parent_forum'); ?>"><?php _e('Parent Forum ID:'); ?></label>
                <input class="widefat" id="<?php echo $this->get_field_id('parent_forum'); ?>" name="<?php echo $this->get_field_name('parent_forum'); ?>" type="text" value="<?php echo esc_attr($parent_forum); ?>" />
                <br />
                <small><?php _e('"0" to show only root - "any" to show all', 'buddyboss'); ?></small>
            </p>

            <p>
                <input class="checkbox" type="checkbox" <?php checked($show_date); ?> id="<?php echo $this->get_field_id('show_date'); ?>" name="<?php echo $this->get_field_name('show_date'); ?>" />
                <label for="<?php echo $this->get_field_id('show_date'); ?>"><?php _e('Show post date:'); ?></label>
            </p>
            <p>
                <input class="checkbox" type="checkbox" <?php checked($show_user); ?> id="<?php echo $this->get_field_id('show_user'); ?>" name="<?php echo $this->get_field_name('show_user'); ?>" />
                <label for="<?php echo $this->get_field_id('show_user'); ?>"><?php _e('Show discussion author:'); ?></label>
            </p>
            <p>
                <label for="<?php echo $this->get_field_id('order_by'); ?>"><?php _e('Order by:'); ?></label>
                <select name="<?php echo $this->get_field_name('order_by'); ?>" id="<?php echo $this->get_field_id('order_by'); ?>">
                    <option <?php selected($order_by, 'newness'); ?> value="newness"><?php _e('Newest Discussions'); ?></option>
                    <option <?php selected($order_by, 'popular'); ?> value="popular"><?php _e('Popular Discussions'); ?></option>
                    <option <?php selected($order_by, 'freshness'); ?> value="freshness"><?php _e('Discussions With Recent Replies'); ?></option>
                </select>
            </p>

    <?php
        }

        public function update($new_instance, $old_instance)
        {
            $instance = array();
            $instance['title']        = (!empty($new_instance['title'])) ? strip_tags($new_instance['title']) : '';
            $instance['max_shown']    = (!empty($new_instance['max_shown'])) ? (int) $new_instance['max_shown'] : 5;
            $instance['show_date']    = !empty($new_instance['show_date']);
            $instance['show_user']    = !empty($new_instance['show_user']);
            $instance['parent_forum'] = (!empty($new_instance['parent_forum'])) ? strip_tags($new_instance['parent_forum']) : 'any';
            $instance['order_by']     = (!empty($new_instance['order_by'])) ? strip_tags($new_instance['order_by']) : 'newness'; // Default value
            return $instance;
        }

        private function parse_settings($instance = array())
        {
            return bbp_parse_args(
                $instance,
                array(
                    'title'        => __('Recent Replies'),
                    'max_shown'    => 5,
                    'show_date'    => false,
                    'show_user'    => false,
                    'parent_forum' => 'any',
                    'order_by'     => 'newness',
                ),
                'replies_widget_settings'
            );
        }
    }

    register_widget('BB_Replies_Widget_Clone');
}
add_action('widgets_init', 'register_bb_replies_widget_clone');

function get_current_url()
{
    $actual_link = (empty($_SERVER['HTTPS']) ? 'http' : 'https') . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
    return $actual_link;
}


function get_category_name_from_url($url)
{
    $site_url = site_url();
    $pattern = '#^' . preg_quote($site_url, '#') . '/category/([^/]+)/?$#';
    if (preg_match($pattern, $url, $matches)) {
        $category_slug = $matches[1];
        $category = get_term_by('slug', $category_slug, 'category');
        if ($category && !is_wp_error($category)) {
            return $category->name;
        } else {
            return '';
        }
    } else {
        return '';
    }
}

function get_tag_name_from_url($url)
{
    $site_url = site_url();
    $pattern = '#^' . preg_quote($site_url, '#') . '/tag/([^/]+)/?$#';
    if (preg_match($pattern, $url, $matches)) {
        $category_slug = $matches[1];
        $category = get_term_by('slug', $category_slug, 'post_tag');
        if ($category && !is_wp_error($category)) {
            return $category->name;
        } else {
            return '';
        }
    } else {
        return '';
    }
}



// debugging by aish
function debugging_by_developer()
{
    $post_id = 467;
    $meta_key = 'views';
    $views = get_post_meta($post_id, $meta_key, true);

    if (!empty($views)) {
        echo 'Views: ' . $views;
    } else {
        echo 'No views found.';
    }
}

/**
 * Register custom REST API endpoint
 */
function register_custom_rest_routes()
{
    register_rest_route('custom-api/v1', '/debugging-by-developer', array(
        'methods' => 'GET',
        'callback' => 'debugging_by_developer',
    ));

    register_rest_route('custom-api/v1', '/update-all-products', array(
        'methods' => 'GET',
        'callback' => 'update_all_published_products',
    ));
}
add_action('rest_api_init', 'register_custom_rest_routes');





// Calculaters

// Bandwidth Calculator

function bandwidth_calculater() {
   ?>
    <div class="bandwidthCalculatorContainer">
        <form onsubmit="handleBandwidthCalcSubmit(event)" id="bandwidth-calc-form">
        <h5 class="heading">Bandwidth Calculator</h5>
        <div class="flexContainer">
          <div>
            <p class="leftFlexBox">Total amount of data to be replicated</p>
            <p class="leftFlexBox">Replication time</p>
            <p class="leftFlexBox deduplicationText">Data deduplication ratio</p>
          </div>
          <div>
            <div class="optionBox">
              <input name="gbInput" class="bandwidthInput" type="number" step="any" />
              <span>GB</span>
            </div>
            <div class="optionBox">
              <input name="timeInput" class="bandwidthInput" type="number" step="any" />
              <span>min</span>
            </div>
            <div>
              <div class="timeBox timeBoxContainer">
                <div class="timeBox">
                  <input name="ratio1Input" class="bandwidthHalfInput" type="number" step="any" />
                  <span>:</span>
                </div>
                <div class="timeBox">
                  <input name="ratio2Input" class="bandwidthHalfInput" type="number" step="any" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div class="resultSection">
          <button type="submit" class="custom-btn with-bg">Calculate</button>
        </div>
    </form>
        <h5 class="result">Required Network Bandwidth : <span id="bandwidth-calc-result"></span> Mbps</h5>
      </div>
   <?php
  }
  
  add_shortcode('bandwidth_calculater', 'bandwidth_calculater');
  

  
   
// Backup Capacity Calculator

function backup_capacity_calculater() {
?>
    <div class="backupCapacityCalculator">
       <h5 class="heading">Backup Capacity Calculator</h5>
       <form onsubmit="handleBackupCapacityCalculatorForm(event)" id="backup-capacity-calculator-form">
         <div class="capacityConatiner">
           <div>
             <div class="capacityInputContainer">
               <p class="capacityInputTitle">Frontend Terabyte (TB):</p>
               <input
                 name="frontendTerabyte"
                 class="capacityInput"
                 type="number"
               />
             </div>
             <div class="capacityInputContainer">
               <p class="capacityInputTitle">
                 Number of full backups to store per week:
               </p>
               <input
                 name="numberOfFullBackupsToStorePerWeek"
                 class="capacityInput"
                 type="number"
               />
             </div>
             <div class="capacityInputContainer">
               <p class="capacityInputTitle">
                 Number of full backups to store per month:
               </p>
               <input
                 name="numberOfFullBackupsToStorePerMonth"
                 class="capacityInput"
                 type="number"
               />
             </div>
             <div class="capacityInputContainer">
               <p class="capacityInputTitle">
                 Total number of full backups to size for:
               </p>
               <input
                 name="numberOfFullBackupsToSizeFor"
                 class="capacityInput"
                 type="number"
               />
             </div>
             <div class="capacityInputContainer">
               <p class="capacityInputTitle">
                 Target full backup window in hrs:
               </p>
               <input
                 name="targetFullBackupWindowInHrs"
                 class="capacityInput"
                 type="number"
               />
             </div>
             <div class="capacityInputContainer">
               <p class="capacityInputTitle">Expected compression ratio:</p>
               <span class="spanContainer">
                 <input
                   name="expectedCompressionRatio"
                   class="capacityInput ratioInput"
                   type="number"
                 />
                 <span class="spanRatio">:</span>
                 <span>1</span>
               </span>
             </div>
             <div class="capacityInputContainer">
               <p class="capacityInputTitle">Storage cost per TB/month:</p>
               <input
                 name="storageCostPerTBPerMonth"
                 class="capacityInput"
                 type="number"
               />
             </div>
           </div>
 
           <div class="dataChangeDiv">
             <div class="capacityInputContainer">
               <p class="capacityInputTitle">
                 Data change rate (between backups) (%):
               </p>
               <input
                 name="dataChangeRateBetweenBackups"
                 class="capacityInput"
                 type="number"
               />
             </div>
             <div class="capacityInputContainer">
               <p class="capacityInputTitle">
                 Number of incremental backups to store per week:
               </p>
               <input
                 name="numberOfIncrementalBackupsToStorePerWeek"
                 class="capacityInput"
                 type="number"
               />
             </div>
             <div class="capacityInputContainer">
               <p class="capacityInputTitle">
                 Number of incremental backups to store per month:
               </p>
               <input
                 name="numberOfIncrementalBackupsToStorePerMonth"
                 class="capacityInput"
                 type="number"
               />
             </div>
             <div class="capacityInputContainer">
               <p class="capacityInputTitle">
                 Total number of incremental backups to store:
               </p>
               <input
                 name="totalNumberOfIncrementalBackupsToStore"
                 class="capacityInput"
                 type="number"
               />
             </div>
             <div class="capacityInputContainer">
               <p class="capacityInputTitle">
                 Target incremental backup windows in hrs:
               </p>
               <input
                 name="targetIncrementalBackupWindowsInHrs"
                 class="capacityInput"
                 type="number"
               />
             </div>
             <div class="capacityInputContainer">
               <p class="capacityInputTitle">Expected de-duplication ratio:</p>
               <span class="spanContainer">
                 <input
                   name="expectedDeDuplicationRatio"
                   class="capacityInput ratioInput"
                   type="number"
                 />
                 <span class="spanRatio">:</span>
                 <span>1</span>
               </span>
             </div>
           </div>
         </div>
 
         <button type="submit" class="custom-btn with-bg" >Calculate</button>
       </form>
       <hr />
       <br />
 
       <div class="backup-capacity-result-table">
       <table class="tableOne" id="backup-capacity-calculator-table">
         
                 </table>
        </div>
     </div>
                 
    <?php

}

add_shortcode('backup_capacity_calculater', 'backup_capacity_calculater');




// Data center Calculator

function data_center_calculator() {
?>
        <div class="DataCenterCalculatorContainer">
      <!-- First screen-->
      <form
        onsubmit="handleDataCenterCalculatorForm(event)"
        id="data-center-calculator-form"
      >
        <h5 class="heading">Data Center Cost Calculator</h5>
        <div class="countryContainer screen active" data-screen="1">
          <div>
            <p class="flexTitle">Select your Country</p>
            <select
              class="react-select-container"
              name="selectYourCountry"
              placeholder="Select Country"
              id="selectYourCountry"
            >
              <option value="" disabled selected>Select Country</option>
              <!-- Add options dynamically here, based on the countryList -->
              <option value="USA">USA</option>
            </select>
          </div>
          <div class="prev-and-next-btn">
          <button class="next">Next</button>
</div>
        </div>

        <!-- Second screen -->
        <div class="second-screen screen" data-screen="2">
          <p class="flexTitle">Colocation facility?</p>
          <select class="react-select-container" name="colocationFacility" id="colocationFacility">
            <option value="" disabled selected>
              Select Colocation Facility
            </option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>

          <div class="prev-and-next-btn">
          <button class="back">Back</button>
          <button class="next">Next</button>
          </div>
          
        </div>

        <!-- Third screen -->
        <div class="questionsContainer screen" data-screen="3">
          <p class="flexTitle">
            How many cabinets are you using in the colocation facility?
          </p>

          <div class="checkBoxContainer">
            <div></div>
            <div>
              <input
                type="checkbox"
                style="margin-left: 305px"
                class="flexTitle cabinet-div"
                name="useRegionalBenchmarks"
                id="useRegionalBenchmarks"
              />
              Use regional benchmarks.
            </div>
          </div>
          <div class="inputBoxContainer">
            <div>
              <label class="placeholder">Number of Cabinets</label>
              <input
                class="cabinet-div"
                type="number"
                placeholder="Number of cabinets"
                name="numberOfCabinets"
                id="numberOfCabinets"
                step="any"
              />
            </div>
            <div style="margin-left: 50px">
              <label class="placeholder">
                Unit cost of each cabinet per year in $
              </label>
              <input
                class="cabinet-div"
                type="number"
                step="any"
                placeholder="unit cost of each cabinet per year in $"
                name="unitCostOfEachCabinet"
                id="unitCostOfEachCabinet"
              />
            </div>
          </div>

          <p class="flexTitle">Select number of racks in your data center.</p>
          <div class="checkBoxContainer">
            <div></div>
            <div>
              <input
                type="checkbox"
                style="margin-left: 305px"
                class="flexTitle rack-div"
                name="useRegionalBenchmarksSelectNumberOf"
                id="useRegionalBenchmarksSelectNumberOf"
              />
              Use regional benchmarks.
            </div>
          </div>
          <div class="inputBoxContainer">
            <div>
              <label class="placeholder">Number of racks</label>
              <input
                class="rack-div"
                type="number"
                step="any"
                placeholder="Number of racks"
                name="numberOfRacks"
                id="numberOfRacks"
              />
            </div>
            <div style="margin-left: 50px">
              <label class="placeholder"> Unit Cost of each rack in $ </label>
              <input
                class="rack-div"
                type="number"
                step="any"
                placeholder="Unit Cost of each rack in $"
                name="unitCostOfEachRack"
                id="unitCostOfEachRack"
              />
            </div>
          </div>
          <div class="prev-and-next-btn">
          <button class="back">Back</button>
          <button class="next">Next</button>
          </div>
        </div>

        <!-- Fourth screen -->
        <div class="questionsContainer screen" data-screen="4">
          <p class="flexTitle">
            Select total memory from all applications (Consider three-year
            growth and node redundancy)
          </p>
          <div class="checkBoxContainer">
            <div></div>
            <div>
              <input
                type="checkbox"
                style="margin-left: 305px"
                class="flexTitle"
                name="selectTotalMemoryFromRegionalBenchmarks"
                id="selectTotalMemoryFromRegionalBenchmarks"
              />
              Use regional benchmarks.
            </div>
          </div>
          <div class="inputBoxContainer">
            <div>
              <label class="placeholder">Total Memory in GB</label>
              <input
                class="greyedOutInActive"
                type="number"
                step="any"
                placeholder="Total Memory in GB"
                name="totalMemoryInGB"
                id="totalMemoryInGB"
              />
            </div>
            <div style="margin-left: 50px">
              <label class="placeholder">Unit Cost per GB in $</label>
              <input
                class="memoryState.isBenchmarksChecked ? 'greyedOut' : 'greyedOutInActive'"
                type="number"
                step="any"
                placeholder="Unit Cost per GB in $"
                name="unitCostPerGBIn"
                id="unitCostPerGBIn"
              />
            </div>
          </div>
          <div class="prev-and-next-btn">
          <button class="back">Back</button>
          <button class="next">Next</button>
          </div>
        </div>

        <!-- 5th screen -->
        <div class="questionsContainer screen" data-screen="5">
          <p class="flexTitle">
            Select number of physical CPUs (Consider three-year growth and node
            redundancy)
          </p>
          <div class="checkBoxContainer">
            <div></div>
            <div>
              <input
                type="checkbox"
                style="margin-left: 305px"
                class="flexTitle"
                name="physicalCPURegionalBenchmarks"
                id="physicalCPURegionalBenchmarks"
              />
              Use regional benchmarks.
            </div>
          </div>
          <div class="inputBoxContainer">
            <div>
              <label class="placeholder">Number of CPUs</label>
              <input
                class="greyedOutInActive"
                type="number"
                step="any"
                placeholder="Number of CPUs 100 - "
                name="numberOfCPU"
                id="numberOfCPU"
              />
            </div>
            <div style="margin-left: 50px">
              <label class="placeholder">Unit cost per CPUs in $</label>
              <input
                class="physicalCUPState.isBenchmarksChecked ? 'greyedOut' : 'greyedOutInActive'"
                type="number"
                step="any"
                placeholder="Unit cost per CPUs in $"
                name="unitCostPerCPUsIn"
                id="unitCostPerCPUsIn"
              />
            </div>
          </div>
          <div class="prev-and-next-btn">
          <button class="back">Back</button>
          <button class="next">Next</button>
          </div>
        </div>

        <!-- 6th screen -->
        <div class="questionsContainer screen" data-screen="6">
          <p class="flexTitle">Select total TB of storage</p>
          <div class="checkBoxContainer">
            <div></div>
            <div>
              <input
                type="checkbox"
                style="margin-left: 305px"
                class="flexTitle"
                name="selectTotalTBOfRegionalBenchmarks"
                id="selectTotalTBOfRegionalBenchmarks"
              />
              Use regional benchmarks.
            </div>
          </div>
          <div class="inputBoxContainer">
            <div>
              <label class="placeholder">Flash storage in TB</label>
              <input
                class="greyedOutInActive"
                type="number"
                step="any"
                placeholder="Flash storage in TB"
                name="flashStorageInTB"
                id="flashStorageInTB"
              />
            </div>
            <div style="margin-left: 50px">
              <label class="placeholder"
                >Unit cost per TB of Flash Storage in $</label
              >
              <input
                class="storageState.isBenchmarksChecked ? 'greyedOut' : 'greyedOutInActive'"
                type="number"
                step="any"
                placeholder="Unit cost per TB of Flash Storage in $"
                name="unitCostPerTBOfFlashStorage"
                id="unitCostPerTBOfFlashStorage"
              />
            </div>
          </div>
          <div class="inputBoxContainer">
            <div>
              <label class="placeholder">HDD storage in TB</label>
              <input
                class="greyedOutInActive"
                type="number"
                step="any"
                placeholder="HDD storage in TB"
                name="hddStorageInTB"
                id="hddStorageInTB"
              />
            </div>
            <div style="margin-left: 50px">
              <label class="placeholder"
                >Unit cost per TB of HDD storage in $</label
              >
              <input
                class="storageState.isBenchmarksChecked ? 'greyedOut' : 'greyedOutInActive'"
                type="number"
                step="any"
                placeholder="Unit cost per TB of HDD storage in $"
                name="unitCostPerTBOfHDDStorage"
                id="unitCostPerTBOfHDDStorage"
              />
            </div>
          </div>
          <div class="prev-and-next-btn">
          <button class="back">Back</button>
          <button class="next">Next</button>
          </div>
        </div>

        <!-- 7th Screen -->
        <div class="questionsContainer screen" data-screen="7">
          <p class="flexTitle">Select total number IP switches</p>
          <div class="checkBoxContainer">
            <div></div>
            <div>
              <input
                type="checkbox"
                style="margin-left: 305px"
                class="flexTitle"
                name="selectTotalNumberIPregionalBenchmarks"
                id="selectTotalNumberIPregionalBenchmarks"
              />
              Use regional benchmarks.
            </div>
          </div>
          <div class="inputBoxContainer">
            <div>
              <label class="placeholder"
                >Number of IP switches (16 ports)</label
              >
              <input
                class="greyedOutInActive"
                type="number"
                step="any"
                placeholder="Number of IP switches (16 ports)"
                name="numberOfIPSwitches16Ports"
                id="numberOfIPSwitches16Ports"
              />
            </div>
            <div style="margin-left: 50px">
              <label class="placeholder">Unit cost per switch in $</label>
              <input
                class="greyedOutInActive"
                type="number"
                step="any"
                placeholder="Unit cost per switch in $"
                name="unitCostPerSwitchIn"
                id="unitCostPerSwitchIn"
              />
            </div>
          </div>
          <div class="inputBoxContainer">
            <div>
              <label class="placeholder"
                >Number of IP switches (32 ports)</label
              >
              <input
                class="greyedOutInActive"
                type="number"
                step="any"
                placeholder="Number of IP switches (32 ports)"
                name="numberOfIPSwitches32Ports"
                id="numberOfIPSwitches32Ports"
              />
            </div>
            <div style="margin-left: 50px">
              <label class="placeholder">Unit cost per switch in $</label>
              <input
                class="greyedOutInActive"
                type="number"
                step="any"
                placeholder="Unit cost per switch in $"
                name="unitCostPerSwitchIn2"
                id="unitCostPerSwitchIn2"
              />
            </div>
          </div>
          <div class="inputBoxContainer">
            <div>
              <label class="placeholder"
                >Number of IP switches (48 ports)</label
              >
              <input
                class="greyedOutInActive"
                type="number"
                step="any"
                placeholder="Number of IP switches (48 ports)"
                name="numberOfIPSwitches48Ports"
                id="numberOfIPSwitches48Ports"
              />
            </div>
            <div style="margin-left: 50px">
              <label class="placeholder">Unit cost per switch in $</label>
              <input
                class="greyedOutInActive"
                type="number"
                step="any"
                placeholder="Unit cost per switch in $"
                name="unitCostPerSwitchIn3"
                id="unitCostPerSwitchIn3"
              />
            </div>
          </div>
          <div class="inputBoxContainer">
            <div>
              <label class="placeholder"
                >Number of IP switches (64 ports)</label
              >
              <input
                class="greyedOutInActive"
                type="number"
                step="any"
                placeholder="Number of IP switches (64 ports)"
                name="numberOfIPSwitches64Ports"
                id="numberOfIPSwitches64Ports"
              />
            </div>
            <div style="margin-left: 50px">
              <label class="placeholder">Unit cost per switch in $</label>
              <input
                class="greyedOutInActive"
                type="number"
                step="any"
                placeholder="Unit cost per switch in $"
                name="unitCostPerSwitchIn4"
                id="unitCostPerSwitchIn4"
              />
            </div>
          </div>
          <div class="inputBoxContainer">
            <div>
              <label class="placeholder"
                >Number of IP switches (96 ports)</label
              >
              <input
                class="greyedOutInActive"
                type="number"
                step="any"
                placeholder=""
                name="numberOfIPSwitches96Ports"
                id="numberOfIPSwitches96Ports"
              />
            </div>
            <div style="margin-left: 50px">
              <label class="placeholder">Unit cost per switch in $</label>
              <input
                class="greyedOutInActive"
                type="number"
                step="any"
                placeholder="Unit cost per switch in $"
                name="unitCostPerSwitchIn5"
                id="unitCostPerSwitchIn5"
              />
            </div>
          </div>
          <div class="prev-and-next-btn">
          <button class="back">Back</button>
          <button class="next">Next</button>
          </div>
        </div>

        <!-- 8th screen -->
        <div class="questionsContainer screen" data-screen="8">
          <p class="flexTitle">Select total number SAN fabric switches</p>
          <div class="checkBoxContainer">
            <div></div>
            <div>
              <input
                type="checkbox"
                style="margin-left: 305px"
                class="flexTitle"
                name="selectTotalNumberSANRegionalBenchmarks"
                id="selectTotalNumberSANRegionalBenchmarks"
              />
              <label for="isBenchmarksChecked">Use regional benchmarks.</label>
            </div>
          </div>
          <div class="inputBoxContainer">
            <div>
              <label class="placeholder"
                >Number of FC switches (16 ports)</label
              >
              <input
                class="greyedOutInActive"
                type="number"
                step="any"
                placeholder="Number of FC switches (16 ports)"
                name="numberOfFCSwitches16Ports"
                id="numberOfFCSwitches16Ports"
              />
            </div>
            <div style="margin-left: 50px">
              <label class="placeholder">Unit cost per switch in $</label>
              <input
                class="greyedOutInActive"
                type="number"
                step="any"
                placeholder="Unit cost per switch in $"
                name="unitCostPerSwitchIn6"
                id="unitCostPerSwitchIn6"
              />
            </div>
          </div>
          <div class="inputBoxContainer">
            <div>
              <label class="placeholder"
                >Number of FC switches (32 ports)</label
              >
              <input
                class="greyedOutInActive"
                type="number"
                step="any"
                placeholder="Number of FC switches (32 ports)"
                name="numberOfFCSwitches32Ports"
                id="numberOfFCSwitches32Ports"
              />
            </div>
            <div style="margin-left: 50px">
              <label class="placeholder">Unit cost per switch in $</label>
              <input
                class="greyedOutInActive"
                type="number"
                step="any"
                placeholder="Unit cost per switch in $"
                name="unitCostPerSwitchIn7"
                id="unitCostPerSwitchIn7"
              />
            </div>
          </div>
          <div class="prev-and-next-btn">
          <button class="back">Back</button>
          <button class="next">Next</button>
          </div>
        </div>

        <!-- 9th screen -->
        <div class="questionsContainer screen" data-screen="9">
          <p class="flexTitle">
            Select number of hypervisor socket licenses required?
          </p>
          <div class="checkBoxContainer">
            <div></div>
            <div>
              <input
                type="checkbox"
                style="margin-left: 305px"
                class="flexTitle"
                name="selectNumberOfHypervisorRegionalBenchmarks"
                id="selectNumberOfHypervisorRegionalBenchmarks"
              />
              <label for="isBenchmarksChecked">Use regional benchmarks.</label>
            </div>
          </div>
          <div class="inputBoxContainer">
            <div>
              <label class="placeholder">Number of hypervisor licenses</label>
              <input
                class="greyedOutInActive"
                type="number"
                step="any"
                placeholder="Number of hypervisor licenses"
                name="numberOfHypervisorLicenses"
                id="numberOfHypervisorLicenses"
              />
            </div>
            <div style="margin-left: 50px">
              <label class="placeholder"
                >Unit cost per socket license in $</label
              >
              <input
                class="greyedOutInActive"
                type="number"
                step="any"
                placeholder="Unit cost per socket license in $"
                name="unitCostPerSocketLicenseIn"
                id="unitCostPerSocketLicenseIn"
              />
            </div>
          </div>
          <div class="prev-and-next-btn">
          <button class="back">Back</button>
          <button class="next">Next</button>
          </div>
        </div>

        <!-- 10 th screen -->
        <div class="questionsContainer screen" data-screen="10">
          <p class="flexTitle">
            How many Terabytes of backup storage do you require? It is
            recommended to have at least three copies of your data, two local
            (on-site) but on different media (read: devices), and at least one
            copy off-site
          </p>
          <div class="checkBoxContainer">
            <div></div>
            <div>
              <input
                type="checkbox"
                style="margin-left: 305px"
                class="flexTitle"
                name="terabytesOfBackupStorageRegionalBenchmarks"
                id="terabytesOfBackupStorageRegionalBenchmarks"
              />
              <label for="isBenchmarksChecked">Use regional benchmarks.</label>
            </div>
          </div>
          <div class="inputBoxContainer">
            <div>
              <label class="placeholder"
                >Total deduplicated storage (in TB) stored in HDD media</label
              >
              <input
                class="greyedOutInActive"
                type="number"
                step="any"
                placeholder="Total deduplicated storage (in TB) stored in HDD media"
                name="totalDeduplicatedStorageInTB"
                id="totalDeduplicatedStorageInTB"
              />
            </div>
            <div style="margin-left: 50px">
              <label class="placeholder">Unit cost per TB in $</label>
              <input
                class="greyedOutInActive"
                type="number"
                step="any"
                placeholder="Unit cost per TB in $"
                name="unitCostPerTBIn"
                id="unitCostPerTBIn"
              />
            </div>
          </div>
          <div class="inputBoxContainer">
            <div>
              <label class="placeholder"
                >Total deduplicated storage (in TB) stored in cloud.</label
              >
              <input
                class="greyedOutInActive"
                type="number"
                step="any"
                placeholder="Total deduplicated storage (in TB) stored in cloud."
                name="totalDeduplicatedStorageCloud"
                id="totalDeduplicatedStorageCloud"
              />
            </div>
            <div style="margin-left: 50px">
              <label class="placeholder">Unit cost per TB in $ per month</label>
              <input
                class="greyedOutInActive"
                type="number"
                step="any"
                placeholder="Unit cost per TB in $ per month"
                name="unitCostPerTBIn2"
                id="unitCostPerTBIn2"
              />
            </div>
          </div>
          <div class="inputBoxContainer">
            <div>
              <label class="placeholder"
                >Total deduplicated storage (in TB) stored in tape.</label
              >
              <input
                class="greyedOutInActive"
                type="number"
                step="any"
                placeholder="Total deduplicated storage (in TB) stored in tape."
                name="totalDeduplicatedStorageTape"
                id="totalDeduplicatedStorageTape"
              />
            </div>
            <div style="margin-left: 50px">
              <label class="placeholder">Unit Cost per TB in $</label>
              <input
                class="greyedOutInActive"
                type="number"
                step="any"
                placeholder="Unit Cost per TB in $"
                name="unitCostPerTBIn3"
                id="unitCostPerTBIn3"
              />
            </div>
          </div>
          <div class="prev-and-next-btn">
          <button class="back">Back</button>
          <button class="next">Next</button>
          </div>
        </div>

        <!-- 11th screen -->
        <div class="questionsContainer screen" data-screen="11">
          <p class="flexTitle">
            Select number of replication copies for the purpose of disaster
            recovery?
          </p>
          <div class="inputDiv">
            <div class="checkBox">
              <select
                style="margin-top: 20px"
                class="flexInput greyedOutInActive"
                name="selectNumberOfReplicationCopies"
              >
                <option value="0" selected>0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>
          <div class="prev-and-next-btn">
          <button class="back">Back</button>
          <button class="next">Next</button>
          </div>
        </div>

        <!-- 12th screen -->
        <div class="questionsContainer screen" data-screen="12">
          <p class="flexTitle">
            At what percentage of compute capacity will disaster recover site
            run relative to the primary data center?
          </p>
          <div class="inputDiv">
            <div class="checkBox" style="width: 100%">
              <input
                type="range"
                style="margin-top: 20px; width: 100%"
                min="0"
                max="100"
                value="50"
                step="25"
                name="atWhatPercentageOfComputeCapacity"
                id="capacityRange"
                oninput="updateRangeLabel(this.value)"
              />
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  margin-top: 10px;
                "
              >
                <span>0</span>
                <span>25</span>
                <span>50</span>
                <span>75</span>
                <span>100</span>
              </div>
              <div style="margin-top: 10px">
                Selected: <span id="rangeValue">50</span>%
              </div>
            </div>
          </div>
          <div class="prev-and-next-btn">
          <button class="back">Back</button>
          <button class="next">Next</button>
          </div>
        </div>

        <!-- 13th screen -->
        <div class="questionsContainer screen" data-screen="13">
          <p class="flexTitle">
            Number of Full Time Employees. (As a reference, use 50VMs plus 250TB
            managed per FTE infrastructure admin)
          </p>

          <div class="inputDiv">
            <div style="display: unset">
              <label class="placeholder">Number of architects</label>
              <input
                class="greyedOutInActive"
                type="number"
                step="any"
                placeholder="Number of architects"
                name="numberOfArchitects"
              />
            </div>
            <div style="display: unset; margin-left: 50px">
              <label class="placeholder">Price per resource in $</label>
              <input
                class="greyedOutInActive"
                type="number"
                step="any"
                placeholder="Price per resource in $"
                name="pricePerResourceIn"
              />
            </div>
          </div>

          <div class="inputDiv">
            <div style="display: unset">
              <label class="placeholder">Number of infrastructure admins</label>
              <input
                class="greyedOutInActive"
                type="number"
                step="any"
                placeholder="Number of infrastructure admins"
                name="numberOfInfrastructureAdmins"
              />
            </div>
            <div style="display: unset; margin-left: 50px">
              <label class="placeholder">Price per resource in $</label>
              <input
                class="greyedOutInActive"
                type="number"
                step="any"
                placeholder="Price per resource in $"
                name="pricePerResourceIn2"
              />
            </div>
          </div>

          <div class="inputDiv">
            <div style="display: unset">
              <label class="placeholder">Number of system engineers</label>
              <input
                class="greyedOutInActive"
                type="number"
                step="any"
                placeholder="Number of system engineers"
                name="numberOfSystemEngineers"
              />
            </div>
            <div style="display: unset; margin-left: 50px">
              <label class="placeholder">Price per resource in $</label>
              <input
                class="greyedOutInActive"
                type="number"
                step="any"
                placeholder="Price per resource in $"
                name="pricePerResourceIn3"
              />
            </div>
          </div>

          <div class="prev-and-next-btn">
          <button class="back">Back</button>
          <button type="submit" id="submit" class="next">Next</button>
          </div>
        </div>
      </form>

      <!-- Output 14th screen -->
      <div class="screen" data-screen="14">
        <h4 class="resultHeading">Calculation Result</h4>
        <div class="rack-table">
          <div class="heading">
            <h4>On-premise Infrastructure</h4>
          </div>
          <hr style="border: 1px dashed" />
          <div class="common-for-all-tables">
          <table class="responsive" id="on-premise-table">
            
          </table>
        </div>
        </div>

        <div class="colocation-table">
          <div class="heading">
            <br />
            <h4>OR</h4>
            <h4>Colocation</h4>
          </div>
          <hr style="border: 1px dashed" />
          <div class="common-for-all-tables">
          <table class="responsive" id="colocation-table">
          </table>
          </div>
        </div>

        <div class="compute-cost-table">
          <div class="heading">
            <h4>Compute Cost</h4>
          </div>
          <hr style="border: 1px dashed" />
          <div class="common-for-all-tables">
          <table class="responsive" id="compute-cost-table">

          </table>
          </div>
        </div>

        <div class="storage-cost-table">
          <div class="heading">
            <h4>Storage Cost</h4>
          </div>
          <hr style="border: 1px dashed" />
          <div class="common-for-all-tables">
          <table class="responsive" id="storage-cost-table">
          </table>
          </div>
        </div>

        <div class="network-cost-table">
          <div class="heading">
            <h4>Network Cost</h4>
          </div>
          <hr style="border: 1px dashed" />
          <div class="common-for-all-tables">
          <table class="responsive" id="network-cost-table">
          </table>
          </div>
        </div>

        <div class="backup-table">
          <div class="heading">
            <h4>Backup</h4>
          </div>
          <hr style="border: 1px dashed" />
          <div class="common-for-all-tables">
          <table class="responsive" id="backup-table">
          </table>
          </div>
        </div>

        <div class="manpower-table">
          <div class="heading">
            <h4>Total cost of manpower</h4>
          </div>
          <hr style="border: 1px dashed" />
          <div class="common-for-all-tables">
          <table class="responsive" id="manpower-table">
          </table>
          </div>
        </div>

        <div class="total-cost-table">
          <div class="heading">
            <h4>Total Costs</h4>
          </div>
          <hr style="border: 1px dashed" />
          <div class="common-for-all-tables">
          <table class="responsive" id="total-cost-table">
          </table>
          </div>
        </div>
        <button class="back">Back</button>
      </div>
    </div>
                    
    <?php

}
    
add_shortcode('data_center_calculator', 'data_center_calculator');




// Downtime Calculator

function downtime_calculator() {
    ?>
    <div class="downtimeCalculatorContainer">
      <form
        onsubmit="handleDowntimeCalculatorForm(event)"
        id="downtime-calculator-form"
      >
        <div>
          <h1 class="heading">The Cost of Downtime</h1>
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <div class="col-md-6">
              <div class="flexContainer">
                <p class="flexTitle">Annual Revenue (in $):</p>
                <input name="annualRevenue" class="flexInput" type="number" step="any" />
              </div>
              <p class="explaination">
                Enter the annual revenue of your organization or revenue
                generated by a key application.
              </p>
            </div>
            <div class="col-md-5">
              <div class="flexContainer">
                <p class="flexTitle">Duration of Downtime (hours):</p>
                <input name="durationOfDowntime" class="flexInput" type="number" step="any" />
              </div>
              <p class="explaination">
                How long is the downtime expected to last? This could be limited
                to business hours or also include out-of-business hours.
              </p>
            </div>
          </div>

          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <div class="col-md-6">
              <div class="flexContainer">
                <p class="flexTitle">
                  Average Fully Loaded Employee Cost / Hour:
                </p>
                <input name="averageFullyLoadedEmployeeCostPerHour" class="flexInput" type="number" step="any" />
              </div>
              <p class="explaination">
                Enter the average cost of an employee per hour including salary,
                benefits, and office space. $100-$200 is a reasonable figure.
              </p>
            </div>
            <div class="col-md-5">
              <div class="flexContainer">
                <p class="flexTitle">Number of Employees Affected:</p>
                <input name="numberOfEmployeesAffected" class="flexInput" type="number" step="any" />
              </div>
              <p class="explaination">
                Enter the number of employees that can be affected by an IT
                outage.
              </p>
            </div>
          </div>

          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <div class="col-md-6">
              <div>
                <p class="flexTitle">Impact to Sales:</p>
                <div
                  class="antRowContainer"
                  style="display: flex; align-items: center"
                >
                  <input id="impactToSales" name="impactToSales" type="range" min="1" max="100" value="1" />
                  <p id="percentageLabel1" class="flexInput">1%</p>
                  <p class="explaination" style="margin-left: 15px">
                    As a percentage, define a rough estimation of the impact of
                    an IT outage to revenue generation. E.g., downtime of a web
                    store for an online-only business with competitors waiting
                    to take the same orders would be 100%.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-5">
              <div class="flexContainer" style="display: unset; margin-left: 0">
                <p class="flexTitle">Impact to Productivity:</p>
                <div
                  class="antRowContainer"
                  style="display: flex; align-items: center"
                >
                  <input id="impactToProductivity" name="impactToProductivity" type="range" min="1" max="100" value="1" />
                  <p id="percentageLabel" class="flexInput">1%</p>
                  <p class="explaination" style="margin-left: 20px">
                    As a percentage, define the impact to your employees of an
                    IT outage. E.g., if your employees are totally reliant on IT
                    to do their work and cannot be productive without it, enter
                    100%.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button type="submit" class="custom-btn with-bg">Calculate</button>
          </div>
        </div>
      </form>

      <div class="flexDivTwo">
        <p class="heading">Downtime Cost</p>
        <div class="resultContainer">
          <div>
            <p class="flexTitle resultText">Lost Revenue:</p>
            <p>$ <span id="lostRevenueResult"></span></p>
          </div>
          <div>
            <p class="flexTitle resultText">Labour Cost:</p>
            <p>$ <span id="labourCostResult"></span></p>
          </div>
          <div>
            <p class="flexTitle resultText">Total Downtime Cost:</p>
            <p>$ <span id="totalDowntimeCostResult"></span></p>
          </div>
          <div>
            <p class="flexTitle resultText">Hourly Downtime Cost:</p>
            <p>$ <span id="hourlyDowntimeCost"></span></p>
          </div>
        </div>
      </div>
    </div>   
                        
    <?php

}
        
add_shortcode('downtime_calculator', 'downtime_calculator');





// File transfer Calculator

function file_transfer_calculator() {
    ?>
        <div class="FTTcalculatorContainer">
        <h5 class="heading">File Transfer Time Calculator</h5>
        <h5 style="margin-top: 25px">
            Enter <span style="font-weight: bold">File size, Transfer Rate,</span>
            select units, and then click
            <span style="font-weight: bold">Calculate.</span>
        </h5>
        <form
            onsubmit="handleFileTransferCalculatorForm(event)"
            id="file-transfer-calc-form"
        >
            <div class="mainContainer">
            <div>
                <p class="inputHeading">file size :</p>
                <input
                name="fileSize"
                class="fileSizeInput"
                type="number"
                step="any"
                />
                <select name="fileSizeUnit">
                <option value="B">B</option>
                <option value="KB">KB</option>
                <option value="MB">MB</option>
                <option selected="selected" value="GB">GB</option>
                <option value="TB">TB</option>
                <option value="KiB">KiB</option>
                <option value="MiB">MiB</option>
                <option value="GiB">GiB</option>
                <option value="TiB">TiB</option>
                </select>
            </div>
            <div>
                <p class="inputHeading">Transfer Rate :</p>
                <input name="transferRate" type="number" step="any" />
                <select name="transferRateUnit">
                <option value="bps">bps</option>
                <option value="kbps">kbps</option>
                <option selected="selected" value="Mbps">Mbps</option>
                <option value="Gbps">Gbps</option>
                <option value="Tbps">Tbps</option>
                <option value="B/s">B/s</option>
                <option value="KB/s">KB/s</option>
                <option value="MB/s">MB/s</option>
                <option value="GB/s">GB/s</option>
                <option value="TB/s">TB/s</option>
                <option value="KiB/s">KiB/s</option>
                <option value="MiB/s">MiB/s</option>
                <option value="GiB/s">GiB/s</option>
                <option value="TiB/s">TiB/s</option>
                </select>
            </div>
            </div>
            <div class="resultSection">
            <button type="submit" class="custom-btn with-bg">Calculate</button>
            <h5 class="result">
                Transfer Time (d:h:m:s) : &nbsp;<span
                id="file-transfer-calc-result"
                ></span>
            </h5>
            </div>
        </form>
        </div> 
                        
    <?php

}
        
add_shortcode('file_transfer_calculator', 'file_transfer_calculator');




// Raid Calculator

function raid_calculator() {
    ?>
            <div class="calculatorContainer">
        <div class="upperContainer">
            <h5 class="heading">RAID disk space calculator</h5>
            <div style="display: flex;">
                <div style="margin-top: 10px;">
                    <p class="inputTitle">Number of disks</p>
                    <input class="inputStyling" type="number" value="0" oninput="handleNumberOfDiskChange(event)" />
                </div>
                <div class="driveSizeSection">
                    <p class="inputTitle">Size of Each Drive</p>
                    <input class="inputStyling" type="number" value="0" oninput="handleSizeOfEachDriveChange(event)" />
                    <span class="terabytesSpan"> TB </span>
                </div>
            </div>
    
            <p class="leftHeadings">SELECT YOUR CONFIGURATION</p>
    
            <div id="radioBoxContainer" class="radioBox">
                <!-- Assuming `dataOptions` is dynamic, you'll need to loop over dataOptions and insert HTML here -->
            </div>
    
            <p class="readmoreStyling" onclick="handleReadMoreFunction()">Read more about RAID</p>
    
            <div>
                <p class="leftHeadings totalSpace">TOTAL USABLE SPACE</p>
                <h3 class="resultSpace">
                    <span class="resultText" id="raid-calc-result"></span>
                    <sub>TB of total <span id="raid-calc-result-total"></span>TB</sub>
                </h3>
            </div>
        </div>
    
        <div class="description" id="raid-cal-desc" style="display: none;">
            <table>
                <tr>
                    <td>RAID 0</td>
                    <td>
                        A RAID 0 volume distributes data across multiple drives, creating a striped volume that offers improved performance and capacity compared to a single drive. However, RAID 0 provides no data protection.
                    </td>
                </tr>
                <tr>
                    <td>RAID 1</td>
                    <td>
                        RAID 1 is a type of data storage redundancy in which identical copies of data are stored on multiple disks. RAID 1 requires two drives.
                    </td>
                </tr>
                <tr>
                    <td>RAID 5</td>
                    <td>
                        RAID 5 uses disk striping with parity information distributed across all member disks, providing redundancy and improved performance. RAID 5 requires at least three drives.
                    </td>
                </tr>
                <tr>
                    <td>RAID 6</td>
                    <td>
                        RAID 6 provides fault tolerance similar to RAID 5 but with an additional parity block. RAID 6 requires at least four disks.
                    </td>
                </tr>
                <tr>
                    <td>RAID 10</td>
                    <td>
                        RAID 10 combines RAID 1 and RAID 0 for performance and redundancy. It requires at least four disks.
                    </td>
                </tr>
                <tr>
                    <td>RAID 50</td>
                    <td>
                        RAID 50 combines the block-level striping of RAID 0 with the parity of RAID 5. It requires at least six disks.
                    </td>
                </tr>
                <tr>
                    <td>RAID 60</td>
                    <td>
                        RAID 60 combines the striping feature of RAID 0 with dual parity of RAID 6. It requires at least eight disks.
                    </td>
                </tr>
            </table>
        </div>
    </div>
                        
    <?php

}
        
add_shortcode('raid_calculator', 'raid_calculator');



// Server rack power Calculator

function server_rack_power_calculator() {
    ?>
            <div class="SRPCcalculatorContainer">
      <div class="mainContainer">
        <h5 class="heading">Server Rack Power Consumption Calculator</h5>
        <form
          onsubmit="handleServerRackPowerCalculatorForm(event)"
          id="server-rack-power-calculator-form"
        >
          <div>
            <p class="inputHeading">Number of Racks :</p>
            <input
              name="numberOfRacks"
              type="number"
              min="0"
              class="fileSizeInput"
              step="any"
            />
          </div>

          <div>
            <p class="inputHeading">Servers per Rack :</p>
            <input name="serversPerRack" type="number" min="0" step="any" />
          </div>

          <div>
            <p class="inputHeading">
              Power Supply for each Server (in watts) :
            </p>
            <input name="powerSupplyForEachServer" type="number" min="0" step="any" />
          </div>

          <div>
            <p class="inputHeading">Facility Power (VAC/AC Voltage) :</p>
            <input name="facilityPower" type="number" min="0" step="any" />
          </div>

          <div class="calculateSection">
            <button type="submit" class="custom-btn with-bg">Calculate</button>
          </div>
        </form>
      </div>

      <div class="output">
        <h5 class="outputHeading">Results</h5>
        <div class="calculate-result">
          <div class="result">
            <div class="result-label">Amps per Server:</div>
            <div class="amps-val" id="ampsPerServerResult">0</div>
          </div>
          <div class="result">
            <div class="result-label">
              Total Required Supply per Rack in kW:
            </div>
            <div class="total-required-supply-rack-val" id="totalRequiredSupplyPerRackInkW">0</div>
          </div>
          <div class="result">
            <div class="result-label">Total Required Supply in kW:</div>
            <div class="total-required-supplykw-val" id="totalRequiredSupplyInkW">0</div>
          </div>
        </div>
      </div>
    </div>
                        
    <?php

}
        
add_shortcode('server_rack_power_calculator', 'server_rack_power_calculator');




// Splunk storage Calculator

function splunk_storage_calculator() {
    ?>
            <div class="splunk-sizing">
      <h5 class="heading" style="font-size: 20px; padding-bottom: 20px">
        Splunk Storage Sizing
      </h5>

      <form
        onsubmit="handleSplunkStorageForm(event)"
        id="splunk-storage-calculator-form"
      >
        <!-- input-data -->
        <div class="input-data">
          <div class="heading">
            <h5>Input Data</h5>
            <div class="custom-tooltip">
              <input
                type="checkbox"
                id="sizeByEventsSec"
                name="sizeByEventsSec"
                onchange="handleSizeByEvent(event)"
              />
              <label for="sizeByEventsSec">Size by Events/Sec</label>
            </div>
          </div>
          <hr class="divider dashed" />
          <p class="description view1">
            Estimate the amount of data based on a number of events per second -
            this calculates based on a typical event size. The more data you
            send to Splunk Enterprise, the more time Splunk needs to index it
            into results that you can search, report, and generate alerts on.
          </p>
          <p class="description view2">
            Estimate the average daily amount of data to be ingested. The more
            data you send to Splunk Enterprise, the more time Splunk needs to
            index it into results that you can search, report, and generate
            alerts on.
          </p>
          <div class="row slider">
            <!-- Check condition for isSizeByEventsChecked -->
            <div class="col-md-3 view2">
              <!-- If isSizeByEventsChecked is true, display this block: -->
              <div class="slider-component ">
                <label for="eventPerSecond">Events per Second</label>
                <input
                  type="range"
                  name="eventPerSecond"
                  id="eventPerSecond"
                  min="50"
                  max="5000000"
                  step="50"
                  value="50"
                  oninput="updateEventPerSecondValue(this.value)"
                />
                <span id="eventPerSecondValue">50</span>
              </div>
              
            </div>

            <div class="col-md-3 view2">
              <div class="slider-component">
                <label for="averageSize">Average Event Size (Bytes)</label>
                <input
                  type="range"
                  name="averageSize"
                  id="averageSize"
                  min="20"
                  max="1000"
                  step="1"
                  value="20"
                  oninput="updateAverageSizeValue(this.value)"
                />
                <span id="averageSizeValue">20 bytes</span>
              </div>
            </div>

            <!-- Otherwise, display this block: -->
            <div class="col-md-3 view1">
              <div class="slider-component">
                <label for="dailyDataVolume">Daily Data Volume</label>
                <input
                  type="range"
                  name="dailyDataVolume"
                  id="dailyDataVolume"
                  min="1"
                  max="40960"
                  step="1"
                  value="1"
                  oninput="updateValue(this.value)"
                />
                <span id="sliderValue">1 GB</span>
              </div>
            </div>

            <div class="col-md-3">
              <div class="slider-component">
                <label for="rawCompression">Raw Compression Factor</label>
                <input
                  type="range"
                  name="rawCompression"
                  id="rawCompression"
                  min="0.01"
                  max="0.8"
                  step="0.01"
                  value="0.01"
                  oninput="updateCompressionValue(this.value)"
                />
                <span id="compressionValue">0.01</span>
              </div>
            </div>
            <div class="col-md-3">
              <div class="slider-component">
                <label for="metadataSize">Metadata Size Factor</label>
                <input
                  type="range"
                  name="metadataSize"
                  id="metadataSize"
                  min="0.1"
                  max="1.5"
                  step="0.01"
                  value="0.1"
                  oninput="updateMetadataValue(this.value)"
                />
                <span id="metadataValue">0.1</span>
              </div>
            </div>
          </div>

          <!-- Condition for isSizeByEventsChecked -->
          <p class="description view2" style="margin-top: 40px">
            Daily Data Volume:
            <!-- Display logic for values -->
            <!-- if dailyDataVolume > 0, display GB -->
            <span id="daily-data-volume-value">50.0 </span> GB
            <!-- Otherwise, display MB -->
            (<span id="daily-data-volume-events">100</span> events/s * <span id="daily-data-volume-bytes">500</span> bytes avg. event size * 3600 seconds/hour * 24
            hours/day)
          </p>
        </div>

        <!-- Data Retention -->
        <div class="data-retention" style="margin-top: 40px">
          <div class="heading">
            <h6>Data Retention</h6>
          </div>
          <hr class="divider dashed" />
          <p class="description">
            Specify the amount of time to retain data for each category. Data
            will be rolled through each category dependant on its age.
          </p>
          <div class="slider">
            <div class="slider-component">
              <label for="hot">Hot, Warm Retention Period</label>
              <input
                type="range"
                name="hot"
                id="hot"
                min="0"
                max="2555"
                step="1"
                value="1"
                oninput="updateRetentionLabel(this.value)"
              />
              <span id="retentionLabel">1 days</span>
            </div>
            <div class="slider-component">
              <label for="cold">Cold</label>
              <input
                type="range"
                name="cold"
                id="cold"
                min="0"
                max="2555"
                step="1"
                value="1"
                oninput="updateRetentionLabel2(this.value)"
              />
              <span id="retentionLabel2">1 days</span>
            </div>
            <div class="slider-component">
              <label for="archivedFrozen">Archived (Frozen)</label>
              <input
                type="range"
                name="archived"
                id="archived"
                min="0"
                max="2555"
                step="1"
                value="1"
                oninput="updateRetentionLabel3(this.value)"
              />
              <span id="retentionLabel3">1 days</span>
            </div>
            <div class="retention-time">
              <div class="bar-container">
                <h6>Retention Time</h6>
                <div class="bar">
                  <div
                    class="hot"
                    id="retention-time-hot"
                    style="width: 30%"
                  ></div>
                  <div
                    class="cold"
                    id="retention-time-cold"
                    style="width: 40%"
                  ></div>
                  <div
                    class="archived"
                    id="retention-time-archived"
                    style="width: 30%"
                  ></div>
                </div>
                <div class="legend">
                  <div><span class="hot"></span>Hot, Warm</div>
                  <div><span class="cold"></span>Cold</div>
                  <div><span class="archived"></span>Archived</div>
                </div>
              </div>
              <div class="total">
                <p>
                  Total =
                  <span id="retention-time-total">90 days</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Architecture -->
        <div class="architecture" style="margin-top: 40px">
          <div class="heading">
            <h6>Architecture</h6>
            <input
              type="checkbox"
              id="clusterReplication"
              name="clusterReplication"
              onchange="handleClusterReplicationChange(event)"
            />
            <label for="clusterReplication">Cluster Replication</label>
            <input
              type="checkbox"
              id="estimateAutomatically"
              name="estimateAutomatically"
              onchange="handleEstimateAutomaticallyChange(event)"
            />
            <label for="estimateAutomatically">Estimate automatically</label>
          </div>
          <hr class="divider dashed" />
          <p class="description">
            Specify the number of nodes required. The more data to ingest, the
            greater the number of nodes required. Adding more nodes will improve
            indexing throughput and search performance.
          </p>

          <div class="slider">
            <!-- Condition for isEstimateAutomaticallyChecked -->
            <div class="estimateAutomaticallyOpt" id="estimateAutomaticallyOpt">
              <h6>Use Case / App</h6>
              <input
                type="radio"
                id="security"
                name="useCase"
                value="security"
              />
              <label for="security">Splunk Enterprise Security</label>
              <input type="radio" id="vmware" name="useCase" value="vmware" />
              <label for="vmware">Splunk App for VMware</label>
              <input
                type="radio"
                id="intelligence"
                name="useCase"
                value="intelligence"
              />
              <label for="intelligence">Splunk IT Service Intelligence</label>
              <input
                type="radio"
                id="other"
                name="useCase"
                value="other"
                checked
              />
              <label for="other">Other</label>
            </div>
            <div class="slider-component estimateAutomaticallyOpt">
              <label for="maxVolume">Max. Volume per Indexer</label>
              <input
                type="range"
                name="maxVolume"
                id="maxVolume"
                min="1"
                max="600"
                step="1"
                value="1"
                oninput="updateMaxVolumeLabel(this.value)"
              />
              <span id="maxVolumeLabel">1 GB</span>
            </div>
            <div class="slider-component">
              <label for="nodes">Number of Nodes</label>
              <input
                type="range"
                name="nodes"
                id="nodes"
                min="2"
                max="100"
                step="1"
                value="2"
                oninput="updateNodesAndReplication(this.value)"
              />
              <span id="nodesLabel">2 node(s)</span>
            </div>

            <!-- Condition for isClusterReplicationChecked -->
            <div class="clusterReplicationOpt">
              <div class="slider-component">
                <label>Searchability Factor</label>
                <input
                  type="range"
                  name="searchability"
                  id="searchability"
                  min="1"
                  max="1"
                  step="1"
                  value="1"
                  oninput="updateSearchabilityLabel(this.value)"
                />
                <span id="searchabilityLabel">1</span>
              </div>
              <div class="slider-component">
                <label>Replication Factor</label>
                <input
                  type="range"
                  name="replication"
                  id="replication"
                  min="1"
                  max="10"
                  step="1"
                  value="1"
                  oninput="updateReplicationAndSearchability(this.value)"
                />
                <span id="replicationLabel">1</span>
              </div>
            </div>
          </div>
        </div>
      </form>
      <!-- Storage Required -->
      <div class="storage-required" style="margin-top: 40px">
        <div class="heading">
          <h6>Storage Required</h6>
        </div>
        <hr class="divider dashed" />
        <p class="description">
          This is a breakdown of the overall storage requirement.
        </p>

        <table class="table borderless" id="splunk-calculator-table"></table>
      </div>
    </div>
                        
    <?php

}
        
add_shortcode('splunk_storage_calculator', 'splunk_storage_calculator');




// Video storage Calculator

function video_storage_calculator() {
    ?>
            <div class="videoStorageContainer">

<div>
  <h5 class="heading">Video Surveillance Storage Calculator</h5>
  <form onsubmit="handleVideoStorageCalculatorForm(event)" id="video-storage-calculator-form">
  <div class="rowWithFlex">
    <p class="sliderTitle">Number of Cameras</p>
    <div class="col-span-4">
      <input name="numberOfCameras" type="number" min="1" class="antInput" value="1" step="any" />
    </div>
  </div>

  <div class="rowWithFlex">
    <p class="sliderTitle">Frames per second</p>
    <div class="col-span-4">
      <input name="framesPerSecond" type="number" min="1" class="antInput" value="1" step="any" />
    </div>
  </div>

  <div class="rowWithFlex">
    <p class="sliderTitle">Hours per day</p>
    <div class="col-span-4">
      <input name="hoursPerDay" type="number" min="1" class="antInput" value="1" step="any" />
    </div>
  </div>

  <div class="rowWithFlex">
    <p class="sliderTitle">Number of Days Stored</p>
    <div class="col-span-4">
      <input name="numberOfDaysStored" type="number" min="1" class="antInput" value="1" step="any" />
    </div>
  </div>

  <p class="sliderTitle">Resolution</p>


      <div class="space video-calc-resolution">

          
          <label for="720P">
          <input type="radio" id="720P" name="resolution" value="720P HD" checked />
            720P HD
          </label>
          
          <label for="1080P">
          <input
            type="radio"
            id="1080P"
            name="resolution"
            value="1080P HD"
          />
            1080P HD
          </label>
          
          <label for="1.3MP">
          <input
            type="radio"
            id="1.3MP"
            name="resolution"
            value="1.3MP"
          />
            1.3 Megapixel
          </label>
        
          
          <label for="3MP">
          <input type="radio" id="3MP" name="resolution" value="3MP" />
            3 Megapixel
          </label>
          
          <label for="5MP">
          <input type="radio" id="5MP" name="resolution" value="5MP" />
            5 Megapixel
          </label>
          
          <label for="10MP">
          <input type="radio" id="10MP" name="resolution" value="10MP" />
            10 Megapixel
          </label>

      </div>



  <p class="sliderTitle">Video Quality</p>
  <div class="videoContainer">
    <label for="rangeInput">Choose a level:</label>
    <input
      type="range"
      id="rangeInput"
      name="videoQuality"
      min="1"
      max="3"
      value="2"
      step="1"
    />
    <span id="label">Medium</span>
  </div>

  <div class="compressionType">
    <p class="sliderTitle">Compression Type</p>
    <div class="compressionDiv">
      <div>
        <input
          type="radio"
          id="MJPEG"
          name="compressionType"
          value="MJPEG"
          checked
        />
        <label for="MJPEG">MJPEG</label>
      </div>
      <div>
        <input
          type="radio"
          id="H.264"
          name="compressionType"
          value="H.264"
        />
        <label for="H.264">H.264</label>
      </div>
      <div>
        <input
          type="radio"
          id="H.265"
          name="compressionType"
          value="H.265"
        />
        <label for="H.265">H.265</label>
      </div>
    </div>
  </div>

  </form>

  <div class="result">
    <div class="heading">Required Storage Space</div>
    <div class="resultText">
      <span id="video-storage-calculator-result"></span>
    </div>
  </div>
</div>
</div>
                        
    <?php

}
        
add_shortcode('video_storage_calculator', 'video_storage_calculator');


// Add GTM code to the wp-login.php page
add_action('login_head', 'add_gtm_to_login_page');

function add_gtm_to_login_page() {
    ?>
    <!-- Google Tag Manager -->
    <script>
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id=' + i;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-MXDBRRNF'); // Replace GTM-XXXXXX with your GTM ID
    </script>
    <!-- End Google Tag Manager -->
    <?php
}

// Add the <noscript> fallback for GTM
add_action('login_footer', 'add_gtm_noscript_to_login_page');

function add_gtm_noscript_to_login_page() {
    ?>
    <!-- Google Tag Manager (noscript) -->
    <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MXDBRRNF" 
        height="0" width="0" style="display:none;visibility:hidden"></iframe>
    </noscript>
    <!-- End Google Tag Manager (noscript) -->
    <?php
}


//*************************** Start Content restriction for market research and blog content for guest users and not active membership ***************************//

function custom_conditional_post_content( $atts ) {
    ob_start();
	
	global $wpdb;
	
	$post_id = get_the_id();
	$access_code = ($_GET['access_code']) ? $_GET['access_code'] : "";
	$amount = get_post_meta($post_id, 'purchase_price', true);
	$isFreeContent = ($amount > 0) ? false : true;
	
	$isValidCode = false;
	if($access_code != "")
	{
		$checkValid = $wpdb->get_row($wpdb->prepare("SELECT id FROM `user_purchase_orders` WHERE access_code=%s AND payment_status=%s AND post_id=%d", $access_code, 'completed', $post_id));
		
		if(!empty($checkValid))
		{
			$isValidCode = true;
		}	
	}	
    
    if ( (is_user_logged_in() && function_exists('pmpro_hasMembershipLevel') && pmpro_hasMembershipLevel()) || $isValidCode == true || $isFreeContent == true ) 
	{
        // Display full post content for logged-in users
        the_content();
    } 
	else 
	{
        // Display excerpt for non-logged-in users
		
		the_excerpt();
		
		$postData = get_post($post_id);
		$post_url = get_permalink( $post_id );
		$amount = get_post_meta($post_id, 'purchase_price', true);
		?>

		<div id="content-restriction-sec">
			<input type="button" value="Want full access?" id="view-purchase-section"> 
		</div>
		
		<div id="purchase-option-section">
			<input type="button" value="Purchase this article for $<?php echo $amount;?>" id="purchase_article">
			<p class="div_seprator"> OR </p>
			<input type="button" value="Become a Member for Unlimited Access" id="buy_article" onclick="location.href = '<?php echo site_url();?>/memberships-info//'">
		</div>
	
		<div id="custom-registration-form">
			<form action="" method="post" id="purchase_frm" name="purchase_frm" enctype="multipart/form-data" style="overflow: hidden;padding: 2px;margin-left: -2px;margin-right: -2px;">
				<input type="hidden" name="action" value="purchase_article_form">
				<input type="hidden" name="post_id" value="<?php echo get_the_id();?>">
				<?php wp_nonce_field('purchase_frm_nonce_action', 'purchase_frm_nonce'); ?>
				<div class="layout-wrap">
					<div class="register-section default-profile" id="basic-details-section">
						<div class="bb-signup-field signup_email">
							<label for="signup_email">Email </label>
							<input type="email" name="signup_email" id="signup_email" class="registration-fields" value="" aria-required="true">			
							<div id="email-strength-result"></div>
						</div>
					</div>
					<div class="register-section default-profile" id="basic-details-section">
						<div class="bb-signup-field confirm_signup_email">
							<label for="confirm_signup_email">Confirm Email </label>
							<input type="email" name="confirm_signup_email" id="confirm_signup_email" class="registration-fields" value="" aria-required="true">			
							<div id="email-strength-result"></div>
						</div>
					</div>
					<!-- #basic-details-section -->
				</div>

				<div class="custom-registration-error">
					<?php 
					if (isset($_SESSION['form_error'])) 
					{ 
						echo '<div class="error">'.$_SESSION['form_error'].'</div>';
						unset($_SESSION['form_error']);
					} ?>
				</div>
				<input type="submit" value="Submit" name="submit">
			</form>
		</div>
		
		<script src="<?php echo site_url();?>/wp-content/themes/buddyboss-theme-child/assets/js/jquery.validate.min.js"></script>
		<script>
		jQuery(document).ready(function(){
			jQuery("#view-purchase-section").click(function(){
				jQuery("#content-restriction-sec").hide();	
				jQuery("#purchase-option-section").show();	
			});
			
			jQuery("#purchase_article").click(function(){
				jQuery("#purchase-option-section").hide();	
				jQuery("#custom-registration-form").show();	
			});
			
			jQuery(".elementor-widget-post-comments").remove();
		});
		
		jQuery('#purchase_frm').validate({
			rules: {
				'signup_email': {
					required: true,
					minlength: 5
				},
				confirm_signup_email: {
					equalTo: '[name="signup_email"]'
				}
			},
			submitHandler: function(form) { // for demo
				
				jQuery('#purchase_frm').submit();
			}
		});
		</script>
		<?php
    }
    return ob_get_clean();
}
add_shortcode( 'conditional_post_content', 'custom_conditional_post_content' );

add_shortcode( 'payment_status', 'payment_status_shortcode' );
function payment_status_shortcode()
{
	if(!is_admin() && is_page('payment-status'))
	{	
		if($_GET['PayerID'] != "")
		{
			$payload = file_get_contents('php://input');
			$raw_post_array = explode('&', $payload);
			$ipn_data = array();

			foreach ($raw_post_array as $keyval) {
				$keyval = explode('=', $keyval);
				if (count($keyval) == 2) {
					$ipn_data[$keyval[0]] = urldecode($keyval[1]);
				}
			}
			
			if(!empty($ipn_data))
			{	
				if(strtolower($ipn_data['payment_status']) == 'completed')
				{	
					echo "<h3 style='text-align: center;'>Your payment has been successfully processed. You will receive a confirmation email shortly.</h3>";
				}
				else if(strtolower($ipn_data['payment_status']) == 'failed')
				{
					echo "<h3 style='text-align: center;'>Your payment has been declined by PayPal. Please double-check your payment details or contact the site administrator for assistance.</h3>";
				}
				else 
				{
					echo "<h3 style='text-align: center;'>We are processing your payment. You will be notified shortly with further confirmation.</h3>";
				}
			}
			else
			{
				wp_redirect(site_url());
				die;
			}		
		}	
		else
		{
			wp_redirect(site_url());
			die;
		}	
	}
}

function start_session() {
    if (!session_id()) {
        session_start();
    }
}
add_action('init', 'start_session');

add_action('template_redirect', 'handle_paypal_form_submission');
function handle_paypal_form_submission() 
{
    if (isset($_POST['action']) && $_POST['action'] == "purchase_article_form") 
	{
        global $wpdb;
			
		$_SESSION['form_error'] = 'Invalid email address.';
		
		$signup_email = $_POST[ 'signup_email' ];
		$confirm_signup_email = $_POST[ 'confirm_signup_email' ];
		$post_id = $_POST[ 'post_id' ];
		
		if (!isset($_POST['purchase_frm_nonce']) || !wp_verify_nonce($_POST['purchase_frm_nonce'], 'purchase_frm_nonce_action')) 
		{
			$_SESSION['form_error'] = 'Permission denied.';
		}
		else if(empty($signup_email))
		{
			$_SESSION['form_error'] = 'Email field is required.';
		}	
		else if(empty($confirm_signup_email))
		{
			$_SESSION['form_error'] = 'Confirm Email field is required.';
		}	
		else if(!is_email($signup_email))
		{
			$_SESSION['form_error'] = 'Invalid email address.';
		}	
		else if($signup_email != $confirm_signup_email)
		{
			$_SESSION['form_error'] = 'Emails do not match.';
		}	
		else if($post_id < 0)
		{
			$_SESSION['form_error'] = 'Something went wrong, please try again.';
		}	
		else
		{	
			$signup_email = $_POST[ 'signup_email' ];
			$post_id = $_POST[ 'post_id' ];
				
			$postData = get_post($post_id);
			
			$post_url = get_permalink( $post_id );
			$access_code = wp_hash_password(wp_generate_password( 32, false ));
			$article_url = $post_url."?access_code=".$access_code;
			$amount = get_post_meta($post_id, 'purchase_price', true);
			
			$insertData = array(
				"email_id" => $signup_email,
				"post_id" => $post_id,
				"access_code" => $access_code,
				"article_url" => $article_url,
				"amount" => $amount,
				"payment_status" => "pending",
				"created_date" => date("Y-m-d H:i:s"),
				"updated_date" => date("Y-m-d H:i:s"),
			);
			$result = $wpdb->insert('user_purchase_orders', $insertData);
			$insert_order_id = $wpdb->insert_id;
			
			echo '<div style="display: none;">';
				echo '<form id="paypal-form" action="'.PAYPAL_URL.'" method="POST">';
				echo '<input type="hidden" name="cmd" value="_xclick">';
				echo '<input type="hidden" name="business" value="'.PAYPAL_BUSINESS_EMAIL.'">'; // PayPal email
				echo '<input type="hidden" name="item_name" value="Purchase - ' . $postData->post_title . '">';
				echo '<input type="hidden" name="amount" value="' . $amount . '">';
				echo '<input type="hidden" name="item_number" value="' . $insert_order_id . '">'; // Store last inserted ID
				echo '<input type="hidden" name="return" value="'.site_url().'/payment-status/">';
				echo '<input type="hidden" name="cancel_return" value="'.site_url().'/payment-cancel/">';
				echo '<input type="hidden" name="notify_url" value="'.site_url().'/purchase-article-paypal-ipn-listener">';
				echo '<input type="hidden" name="rm" value="2">';
				echo '<input type="submit" value="Pay with PayPal">';
				echo '</form>';
			echo '</div>';
			?>
			
			<h3>Please wait...</h3>
			<h5>Do not click anywhere while processsing.</h5>
			
			<?php
			// Optionally, auto-submit the form with JavaScript
			echo '<script type="text/javascript">
					document.getElementById("paypal-form").submit();
				  </script>';
		} 
    }
}

add_action('init', 'handle_paypal_webhook');
function handle_paypal_webhook() 
{
	global $wpdb;
	
    if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_SERVER['REQUEST_URI'] == '/purchase-article-paypal-ipn-listener')
	{
        $payload = file_get_contents('php://input');
        $raw_post_array = explode('&', $payload);
        $ipn_data = array();

		foreach ($raw_post_array as $keyval) {
			$keyval = explode('=', $keyval);
			if (count($keyval) == 2) {
				$ipn_data[$keyval[0]] = urldecode($keyval[1]);
			}
		}
		
		$data = array(
			"purchase_order_id" => $ipn_data['item_number'],
			"response" => json_encode($ipn_data),
			"created_date" => date("Y-m-d H:i:s"),
		);
		$wpdb->insert("paypal_ipn_logs", $data);
		
		if(strtolower($ipn_data['payment_status']) == 'completed')
		{	
			$order_id = $ipn_data['item_number'];
				
			$orderDetails = $wpdb->get_row($wpdb->prepare("SELECT * FROM `user_purchase_orders` WHERE id=%d AND payment_status != %s", $order_id, 'completed'));
				
			if(!empty($orderDetails))	
			{	
				$updateData = array(
					"payment_status" => strtolower($ipn_data['payment_status']),
					"transaction_id" => $ipn_data['txn_id'],
					"updated_date" => date("Y-m-d H:i:s"),
				);
				$whereData = array(
					"id" => $order_id
				);
				$res = $wpdb->update(
					'user_purchase_orders',
					$updateData,
					$whereData,
				);
				
				$insertData = array(
					"purchase_order_id" => $order_id,
					"created_date" => date("Y-m-d H:i:s"),
					"updated_date" => date("Y-m-d H:i:s"),
				);
				$result = $wpdb->insert('user_purchase_invoices', $insertData);
				$invoice_id = $wpdb->insert_id;
				
				$filename = sprintf('Receipt_%s.pdf', $invoice_id);
				$attachment = purchaseReceipt($order_id, $invoice_id, $filename);
				$emailStatus = sendPurchaseEmail($order_id, 'completed', $attachment); 
			}	
        }
		else if(strtolower($ipn_data['payment_status']) == 'failed')
		{
			$order_id = $ipn_data['item_number'];
			
			$updateData = array(
				"payment_status" => strtolower($ipn_data['payment_status']),
				"updated_date" => date("Y-m-d H:i:s"),
			);
			
			$whereData = array(
				"id" => $ipn_data['item_number']
			);
			
			$res = $wpdb->update(
				'user_purchase_orders',
				$updateData,
				$whereData,
			);
			
			$emailStatus = sendPurchaseEmail($order_id, 'failed', ''); 
		}
		else
		{
			$order_id = $ipn_data['item_number'];
			
			$updateData = array(
				"payment_status" => strtolower($ipn_data['payment_status']),
				"updated_date" => date("Y-m-d H:i:s"),
			);
			
			$whereData = array(
				"id" => $ipn_data['item_number']
			);
			
			$res = $wpdb->update(
				'user_purchase_orders',
				$updateData,
				$whereData,
			);
		}	
		
        status_header(200);
        exit;
    }
}

function sendPurchaseEmail($order_id, $payment_status, $attchamets = null)
{
	global $wpdb;
	$emailAttachmments = array();
	
	$orderDetails = $wpdb->get_row($wpdb->prepare("SELECT * FROM `user_purchase_orders` WHERE id=%d", $order_id));
	
	if(!empty($orderDetails))
	{	
		$to_email = $orderDetails->email_id;
		$article_url = $orderDetails->article_url;
		
		
		if($attchamets != "")
		{
			$emailAttachmments[] = $attchamets;
		}	
		
		if($payment_status == 'completed')
		{	
			$body = "";	
			$body = '
				<div style="font-family: Open Sans, Helvetica, Arial, sans-serif !important; font-size: 16px !important; padding: 0; background-color: #f7f7f7; text-align: center;"> 
					<table style="width: 538px; background-color: #fff; text-align: left; display: inline-flex;">
						<tbody style="margin: 50px 0px; width: 100%;">
							<tr style=" background-color: white; width: 100%; display: inline-table;">
								<td style="text-align: center;">
									<p><img src="' . site_url() . '/wp-content/uploads/2024/08/logo_white.png" alt="Logo" width="130"></p>
								</td>
							</tr>
							<tr style=" background-color: white;">
								<td>
									<p>
										<b style="margin-left: 15px; text-transform: capitalize;">Hi,</b><br>
										<p style="margin-left: 15px; margin-right: 15px; line-height: 25px;">Thank you for your recent purchase. We are pleased to confirm that your order has been successfully processed.</span></p>
										<p style="margin-left: 15px; margin-right: 15px; line-height: 25px;">Please find attached your receipt for the purchase.</span></p>
										<p style="margin-left: 15px; margin-right: 15px; line-height: 25px;">You can access the article by clicking the link below:</p>
										<p style="margin-left: 15px; margin-right: 15px; line-height: 25px;"><a href="' . $article_url . '" style="color: #0099E0;" target="_blank"> Please click here to view full report</a></p>
										<p style="margin-left: 15px; margin-right: 15px; line-height: 25px;">If you have any issues accessing the article or need further assistance, feel free to reach out to us.</p>
									</p>
									<p style="margin-left: 15px; line-height: 30px; padding-top: 10px;">Thanks,
										<br>
										'.get_option('blogname').'<br>
									</p>
								</td>
							</tr>
						</tbody>
					</table>
				</div>';
		}
		else
		{
			$body = "";	
			$body = '
				<div style="font-family: Open Sans, Helvetica, Arial, sans-serif !important; font-size: 16px !important; padding: 0; background-color: #f7f7f7; text-align: center;"> 
					<table style="width: 538px; background-color: #fff; text-align: left; display: inline-flex;">
						<tbody style="margin: 50px 0px; width: 100%;">
							<tr style=" background-color: white; width: 100%; display: inline-table;">
								<td style="text-align: center;">
									<p><img src="' . site_url() . '/wp-content/uploads/2024/08/logo_white.png" alt="Logo" width="130"></p>
								</td>
							</tr>
							<tr style=" background-color: white;">
								<td>
									<p>
										<b style="margin-left: 15px; text-transform: capitalize;">Hi,</b><br>
										<p style="margin-left: 15px; margin-right: 15px; line-height: 25px;">Your payment was not completed. Please check with PayPal or the site administrator for further assistance.</span></p>
										<p style="margin-left: 15px; margin-right: 15px; line-height: 25px;">If you have any issues accessing the article or need further assistance, feel free to reach out to us.</p>
									</p>
									<p style="margin-left: 15px; line-height: 30px; padding-top: 10px;">Thanks,
										<br>
										'.get_option('blogname').'<br>
									</p>
								</td>
							</tr>
						</tbody>
					</table>
				</div>';
		}	
		
		//php mailer variables
		$to = $to_email;
		$subject = get_option('blogname')." Purchase Details";
		$headers = array('Content-Type: text/html; charset=UTF-8');
		
		//Here put your Validation and send mail
		$sent = wp_mail($to, $subject, $body, $headers, $emailAttachmments);		
		return $sent;
	}	
}

function purchaseReceipt($order_id, $invoice_id, $filename)
{
	global $wpdb;
	
	$orderDetails = $wpdb->get_row($wpdb->prepare("SELECT * FROM `user_purchase_orders` WHERE id=%d", $order_id));
	$postData = get_post($orderDetails->post_id);
	
	$args = array(
		'isRemoteEnabled' => true,
	);
	$dompdf = new Dompdf($args);
	
	$html_content = '
		<!DOCTYPE html>
			<html>
				<head>
					<title>Form</title>
					<link rel="stylesheet" href="'.site_url().'/wp-content/themes/buddyboss-theme-child/assets/css/bootstrap.min.css">
					<style>
						@page {
							margin: 20px 0;
						}						
						body {
							font-family: sans-serif !important;
							margin: 10px 0;
						}
						table {
							width: 100%;
						}
						.item-lists {
							border: 1px solid #cccccc;
						}
						.item-lists td {
							border: 1px solid #cccccc;
							padding: 0 5px;
						}
					</style>
				</head>
				<body>
					<section class="py-3">
						<div class="container">
							<table border=0 style="width: 100%;">
								<tr>
									<td style="float: left;">
										<img src="' . site_url() . '/wp-content/uploads/2024/08/logo_white.png" alt="Logo" width="130">
									</td>
									<td style="text-align: center; float: right;">
										<p style="font-size: 10px; text-align: left; font-weight:600; float: right;"></p>
									</td>
								</tr>
							</table>
							<table border=0 style="margin-top: 20px;">
								<tr>
									<td style="text-align: center;">
										<p style="text-align: center; font-size: 25px; font-weight: 700;">Receipt</p>
									</td>
								</tr>
							</table>
							<table border=0 style="margin-top: 10px;">
								<tr>
									<td style="float: left; text-transform: capitalize;">
										<p style="font-size: 14px;"><b>Receipt No. : </b> '.$invoice_id.'</p>
									</td>
									<td style="text-align: center; float: right;">
										<p style="font-size: 14px; float: right; text-align: left;"><b>Date : </b> '.date("d-m-Y").'</p>
									</td>
								</tr>
							</table>
							<table border=0 class="item-lists" style="margin-top: 20px;">
								<thead >
									<tr>
										<th style="background-color: black; color: white; padding: 5px; font-size: 14px; text-align: left;">Description</th>
										<th style="background-color: black; color: white; padding: 5px; font-size: 14px; text-align: right;">Qty</th>
										<th style="background-color: black; color: white; padding: 5px; font-size: 14px; text-align: right;">Total Amount</th>
									</tr>
								</thead>
								<tbody class="">
									<tr>
										<td style="font-size:13px; padding-top: 5px; width: 70%;"><b>Article - '.$postData->post_title.'</b></td>
										<td style="font-size: 15px; text-align: right; padding-top: 5; padding-bottom: 5;"><b>1</b></td>
										<td style="font-size: 15px; text-align: right;"><b>$'.sprintf("%.2f", $orderDetails->amount).'</b></td>
									</tr>
									<tr>
										<td colspan="2" style="font-size: 15px; text-align: right; padding-top: 5; padding-bottom: 5;"><b>Total</b></td>
										<td style="font-size: 15px; text-align: right;"><b>$'.sprintf("%.2f", $orderDetails->amount).'</b></td>
									</tr>
								</tbody>
							</table>
						</div>
					</section>
				</body>
			</html>';
			
	//return $html_content;
		
	$dompdf->loadHtml($html_content);
	$dompdf->setPaper('A4', 'portrait');
	$dompdf->render();
	
	$upload_dir = wp_upload_dir();
	$attachments_dir = $upload_dir['basedir']."/receipts/";
	
	if( !is_dir($attachments_dir) )
	{
		@mkdir($attachments_dir, 0755);
	}	

	$file_content = $dompdf->output();
	
	$file = fopen($attachments_dir.$filename,'w+');
	fwrite($file, $file_content);
	fclose($file);
	return $attachments_dir.$filename;
	
	// header('Content-Type: application/pdf');
	// header('Content-Disposition: inline; filename="preview.pdf"');
	// echo $file_content;	
	// die;
}

function custom_excerpt_length( $length ) {
	global $post;
	
	return 100;
}
add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );

// Generate Purchase Report
function purchase_report_admin_menu() {
    Purchase_Report_List::get_instance();

	if ( current_user_can('administrator') || current_user_can('event_coordinator')) 
	{
		// Add a menu page for the custom table
		add_menu_page(
			'Purchase Report',
			'Purchase Report',
			'read',
			'purchase_report',
			'purchaseReport', // Function that renders the page
			'dashicons-list-view'
		);
	}
}
add_action('admin_menu', 'purchase_report_admin_menu');

function purchaseReport()
{
	$abc = Purchase_Report_List::get_instance();
	?>
	<div class="wrap">
		<h2>Purchase Report</h2>
		<div id="poststuff">
			<div id="post-body" class="metabox-holder columns-2" style="width: 100%;">
				<div id="post-body-content">
					<div class="meta-box-sortables ui-sortable">
							<?php
							$abc->prepare_items();
							$abc->display();
							?>
					</div>
				</div>
			</div>
			<br class="clear">
		</div>
	</div>
	<?php
}

class Purchase_Report_List extends WP_List_Table 
{
    static $instance1;

    /** Class constructor */
    public function __construct() {
        parent::__construct([
            'singular' => __('Customer', 'sp'),
            'plural' => __('Customers', 'sp'),
            'ajax' => false
        ]);
    }

    public function no_items() {
        _e('No data found.', 'sp');
    }

    function column_name($item) {
        $title = '<strong>' . $item['name'] . '</strong>';

        return $title;
    }

    public function column_default($item, $column_name) {
        switch ($column_name) {
            case 'email':
            case 'type':
            case 'article':
            case 'amount':
            case 'payment_status':
            case 'date_time':
                return $item[$column_name];
            default:
                return "-"; // For troubleshooting
        }
    }

    function get_columns() {
        return [
            'email' => __('Email', 'sp'),
            'type' => __('Article Type', 'sp'),
            'article' => __('Article', 'sp'),
            'amount' => __('Amount', 'sp'),
            'payment_status' => __('Payment Status', 'sp'),
            'date_time' => __('Date', 'sp'),
        ];
    }

    public function prepare_items() 
	{	
		global $wpdb;
		
		$columns = $this->get_columns();
		$this->_column_headers = [$columns, [], []];
		$per_page = 10;
        $current_page = $this->get_pagenum();
        $search = ($_REQUEST['s']) ? $_REQUEST['s'] : "";
        $event = ($_REQUEST['event']) ? $_REQUEST['event'] : "";
        $from_date = ($_REQUEST['from_date']) ? $_REQUEST['from_date'] : "";
        $to_date = ($_REQUEST['to_date']) ? $_REQUEST['to_date'] : "";
        $status = ($_REQUEST['status']) ? $_REQUEST['status'] : "";
		
		// Define table names
		
		$sql = "SELECT user_purchase_orders.*, wp_posts.post_title, wp_posts.post_type FROM user_purchase_orders
			JOIN wp_posts ON wp_posts.id = user_purchase_orders.post_id";
			
		if($search != "") 
		{
			$sql .= " AND user_purchase_orders.email_id LIKE '%".$search."%'";
		}			

		if($status != "") 
		{
			$sql .= " AND user_purchase_orders.payment_status = '".$status."'";
		}			

		if (!empty($from_date)) {
			$sql .= " AND DATE(user_purchase_orders.created_date) >= '".$from_date."'";
		}
	 
		if (!empty($to_date)) {
			$sql .= " AND DATE(user_purchase_orders.created_date) <= '".$to_date."'";
		}
		
		$sql .= ' ORDER BY user_purchase_orders.created_date DESC';
		
		$total_items = $wpdb->get_var("SELECT COUNT(1) FROM ($sql) AS combined_table");
		
        $this->set_pagination_args([
            'total_items' => $total_items,
            'per_page' => $per_page
        ]);		
		
        $sql .= " LIMIT $per_page";
        $sql .= ' OFFSET ' . ($current_page - 1) * $per_page;
        $results = $wpdb->get_results($sql, 'ARRAY_A');
		
		$dataArray = array();
		foreach ($results as $key => $val)
		{
			$date_time = date("d-m-Y", strtotime($val['created_date']));
			
			if($val['post_type'] == "market_research") {
				$type = "Market Research";
			} else {
				$type = "Blog";
			}
			
			$tmp_array = array(
				"id" => $val['id'],
				"email" => $val['email_id'],
				"type" => $type,
				"article" => $val['post_title'],
				"amount" => $val['amount'],
				"payment_status" => $val['payment_status'],
				"date_time" => $date_time,
			);
			
			array_push($dataArray, $tmp_array);
		}
		
		return $this->items = $dataArray;
    }

    public static function get_instance() {
        if (!isset(self::$instance1)) {
            self::$instance1 = new self();
        }
        return self::$instance1;
    }
	
	function extra_tablenav( $which )
    {
        switch ( $which )
        {
            case 'top':
			
				$status = ($_REQUEST['status']) ? $_REQUEST['status'] : "";
				?>
				<form method="get">
					<input type="hidden" name="page" value="purchase_report">
					<div class="alignleft actions">
						<select name="status">
							<option value=""><?php _e( 'All Payment Status' ); ?></option>
							<option value="pending" <?php if($status == 'pending'){ ?> selected <?php } ?>>Pending</option>
							<option value="completed" <?php if($status == 'completed'){ ?> selected <?php } ?>>Completed</option>
							<option value="failed" <?php if($status == 'failed'){ ?> selected <?php } ?>>Failed</option>
						</select>
						
						<input type="search" placeholder="Search.." name="s" value="<?php echo ($_REQUEST['s']) ? $_REQUEST['s'] : "";?>">
						
						<label for="from_date">From Date:</label>
						<input type="date" id="from_date" name="from_date" value="<?php echo isset($_REQUEST['from_date']) ? esc_attr($_REQUEST['from_date']) : ''; ?>">
						<label for="to_date">To Date:</label>
						<input type="date" id="to_date" name="to_date" value="<?php echo isset($_REQUEST['to_date']) ? esc_attr($_REQUEST['to_date']) : ''; ?>">
						
						<input type="submit" class="button" value="Filter">
						&nbsp;
						<a href="<?php echo site_url();?>/wp-admin/admin.php?page=purchase_report" class="button">Reset</a>
					</div>
				</form>
				<?php
                break;

            case 'bottom':
                // Your html code to output
                break;
        }
    }
}
//*************************** End Content restriction for market research and blog content for guest users and not active membership ***************************//

//*************************** Start Paid Membership Plugin Changes *******************************//

remove_action( 'bp_actions', 'bp_members_action_activate_account_custom' );
function bp_members_action_activate_account_custom() {
    if ( ! bp_is_current_component( 'activate' ) ) {
        return;
    }
    if ( is_user_logged_in() ) {
        return;
    }
    if ( ! empty( $_POST['key'] ) ) {
        $key = wp_unslash( $_POST['key'] );
        // Backward compatibility with templates using `method="get"` in their activation forms.
    } elseif ( ! empty( $_GET['key'] ) ) {
        $key = wp_unslash( $_GET['key'] );
    }
    if ( empty( $key ) ) {
        return;
    }
    $bp = buddypress();
    $user = apply_filters( 'bp_core_activate_account', bp_core_activate_signup( $key ) );
    // If there were errors, add a message and redirect.
    if ( ! empty( $user->errors ) ) {
        bp_core_add_message( $user->get_error_message(), 'error' );
        bp_core_redirect( trailingslashit( bp_get_root_domain() . '/' . $bp->pages->activate->slug ) );
    }
    bp_core_add_message( __( 'Your account is now active!', 'buddyboss' ) );
    bp_core_redirect( site_url().'/wp-login.php?redirect_to='.site_url().'/memberships-info/' );
}
add_action( 'bp_actions', 'bp_members_action_activate_account_custom' );

/* function my_gettext_membership( $output_text, $input_text, $domain ) {
	if ( ! is_admin() && ( 'paid-memberships-pro' === $domain || strpos( $domain, 'pmpro-' ) !== false ) ) {
		$output_text = str_replace( 'Choose a membership level', 'Upgrade Membership', $output_text );
	}
	return $output_text;
}
add_filter( 'gettext', 'my_gettext_membership', 10, 3 ); */

function custom_redirect() {
    global $wp;

    if( $wp->request == 'membership-account' ) {
		
		$membership_link = trailingslashit( bp_loggedin_user_domain()."membership_account" );
		
        wp_redirect( $membership_link );
        exit;
    }
    if( $wp->request == 'membership-checkout' && !is_user_logged_in() ) 
	{
		$membership_link = trailingslashit(site_url()."/register" );
        wp_redirect( $membership_link );
        exit;
    }
}
add_action ('template_redirect', 'custom_redirect');

function membership_levels_url_shortcode()
{
	return site_url().'/membership-levels/';	
}
add_shortcode('membership_levels_url', 'membership_levels_url_shortcode');
//*************************** End Paid Membership Plugin Changes *******************************//