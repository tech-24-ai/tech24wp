<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package BuddyBoss_Theme
 */
global $post;
?>
<?php 
?>
<!doctype html>
<html <?php language_attributes(); ?>>
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<link rel="profile" href="http://gmpg.org/xfn/11">
		<?php wp_head(); ?>

	</head>

	<body <?php body_class(); ?>>

        <?php wp_body_open(); ?>

		<?php if (!is_singular('llms_my_certificate')):
		 
			do_action( THEME_HOOK_PREFIX . 'before_page' ); 
	
		endif; ?>

		<div id="page" class="site">

			<?php do_action( THEME_HOOK_PREFIX . 'before_header' ); ?>

			<header id="masthead" class="<?php echo apply_filters( 'buddyboss_site_header_class', 'site-header site-header--bb' ); ?>">
				<?php do_action( THEME_HOOK_PREFIX . 'header' ); ?>
			</header>

			<?php do_action( THEME_HOOK_PREFIX . 'after_header' ); ?>

			<?php do_action( THEME_HOOK_PREFIX . 'before_content' ); ?>

			<div id="content" class="site-content group-main">
				<?php if( bp_is_groups_directory() || $post->ID == 43) {
					echo do_shortcode('[elementor-template id="336"]'); 
				} ?>

				<?php 

if ( function_exists( 'bp_is_group' ) && bp_is_group()  ) {
	

	if ( bp_has_groups() ) :
		while ( bp_groups() ) :
			bp_the_group();
	
			?>
	
			<div class="banner-header">
				
			</div>
			<?php
		endwhile;
endif;
}
				?>


				<?php do_action( THEME_HOOK_PREFIX . 'begin_content' ); ?>


<?php 

$current_url = rtrim( $_SERVER['REQUEST_URI'], '/' );
  $last_part = substr( $current_url, strrpos( $current_url, '/' ) + 1 );

  if ( function_exists( 'bp_is_groups_component' ) && bp_is_groups_component() && bp_is_current_action( 'forum' )  && $last_part !== 'forum') { 
	$class_name = "container-data-discussion";
  } else {
	$class_name = "";
  }

	?>
				<div class="container">
					<div class="<?php echo apply_filters( 'buddyboss_site_content_grid_class', 'bb-grid site-content-grid '.$class_name ); ?>">