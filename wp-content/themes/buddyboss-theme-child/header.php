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

if($post->ID==43){?>
	<div class="bp-generic-meta" style="display:none;">
	
<?php  echo do_shortcode('[custom_mo_social_sharing]'); // Replace [your_shortcode] with your actual shortcode ?>

</div><?php	
}
?>
<!doctype html>
<html <?php language_attributes(); ?>>
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<link rel="profile" href="http://gmpg.org/xfn/11">
		<?php wp_head(); ?>
		<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MXDBRRNF');</script>
<!-- End Google Tag Manager -->

	</head>

	<body <?php body_class(); ?>>
	<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="ns "
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

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