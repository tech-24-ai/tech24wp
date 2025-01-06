<?php

/**
 * Forum related custom Widgets
 *
 * Contains the forum list, topic list, reply list and login form widgets.
 *
 * @package BuddyBoss\Widgets
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * Forums Forum Widget
 *
 * Adds a widget which displays the forum list
 *
 * @since bbPress (r2653)
 *
 * @uses WP_Widget
 */
class T24_BBP_Forums_Widget extends WP_Widget {

	/**
	 * Forums Forum Widget.
	 *
	 * Registers the forum widget.
	 *
	 * @since bbPress (r2653)
	 *
	 * @uses apply_filters() Calls 'bbp_forums_widget_options' with the
	 *                        widget options.
	 */
	public function __construct() {
		$widget_ops = apply_filters(
			'bbp_forums_widget_options',
			array(
				'classname'                   => 't24_widget_display_forums',
				'description'                 => __( 'A list of forums with an option to set the parent.', 'buddyboss' ),
				'customize_selective_refresh' => true,
			)
		);

		parent::__construct( false, __( '(T24) Forums List', 'buddyboss' ), $widget_ops );
	}

	/**
	 * Register the widget.
	 *
	 * @since bbPress (r3389)
	 *
	 * @uses register_widget()
	 */
	public static function register_widget() {
		register_widget( 'T24_BBP_Forums_Widget' );
	}

	/**
	 * Displays the output, the forum list.
	 *
	 * @since bbPress (r2653)
	 *
	 * @param mixed $args     Arguments.
	 * @param array $instance Instance.
	 *
	 * @uses  apply_filters() Calls 'bbp_forum_widget_title' with the title.
	 * @uses  get_option() To get the forums per page option.
	 * @uses  current_user_can() To check if the current user can read
	 *                           private() To resety name.
	 * @uses  bbp_has_forums() The main forum loop.
	 * @uses  bbp_forums() To check whether there are more forums available
	 *                     in the loop.
	 * @uses  bbp_the_forum() Loads up the current forum in the loop.
	 * @uses  bbp_forum_permalink() To display the forum permalink.
	 * @uses  bbp_forum_title() To display the forum title.
	 */
	public function widget( $args, $instance ) {

		// Get widget settings.
		$settings = $this->parse_settings( $instance );

		// Typical WordPress filter.
		$settings['title'] = apply_filters( 'widget_title', $settings['title'], $instance, $this->id_base );

		// Forums filter.
		$settings['title'] = apply_filters( 'bbp_forum_widget_title', $settings['title'], $instance, $this->id_base );

		$parent_id = ( ! empty( $settings['parent_forum'] ) ? $settings['parent_forum'] : 0 );

		$parent_id = ! is_numeric( $parent_id ) && 'any' !== $parent_id ? 0 : $parent_id;

		// Note: private and hidden forums will be excluded via the
		// bbp_pre_get_posts_normalize_forum_visibility action and function.
		$widget_query = new WP_Query(
			array(
				'post_type'              => bbp_get_forum_post_type(),
				'post_parent'            => 'any' !== $parent_id ? $parent_id : 0,
				'post_status'            => bbp_get_public_status_id(),
				// Order.
				'posts_per_page'         => bbp_get_forums_per_page(),
				'orderby'                => 'menu_order title',
				'order'                  => 'ASC',

				// Performance.
				'ignore_sticky_posts'    => true,
				'no_found_rows'          => true,
				'update_post_term_cache' => false,
				'update_post_meta_cache' => false,
			)
		);

		// Bail if no posts.
		if ( ! $widget_query->have_posts() ) {
			return;
		}

		echo $args['before_widget'];

		if ( ! empty( $settings['title'] ) ) {
			echo $args['before_title'] . $settings['title'] . $args['after_title'];
		}
		?>

		<ul class="bb-sidebar-forums">

			<?php
			while ( $widget_query->have_posts() ) :
				$widget_query->the_post();
				?>

				<li>
					<a class="bbp-forum-title" href="<?php bbp_forum_permalink( $widget_query->post->ID ); ?>"><?php bbp_forum_title( $widget_query->post->ID ); ?></a>
					<span class="topics-count">
						<?php
						echo bbp_get_forum_topic_count( $widget_query->post->ID );
						?>
					</span>
					<?php
					if ( 0 !== $parent_id ) {
						$r = array(
							'before'           => '<ul class="bb-sidebar-forums">',
							'after'            => '</ul>',
							'link_before'      => '<li class="bbp-sub-forum">',
							'link_after'       => '</li>',
							'count_before'     => ' (',
							'count_after'      => ')',
							'count_sep'        => ', ',
							'separator'        => ' ',
							'forum_id'         => $widget_query->post->ID,
							'show_topic_count' => false,
							'show_reply_count' => false,
						);

						echo bb_get_list_forums_recursively( $r );
					}
					?>
				</li>

			<?php endwhile; ?>

		</ul>

		<?php
		echo $args['after_widget'];

		// Reset the $post global.
		wp_reset_postdata();
	}

	/**
	 * Update the forum widget options.
	 *
	 * @since bbPress (r2653)
	 *
	 * @param array $new_instance The new instance options.
	 * @param array $old_instance The old instance options.
	 *
	 * @return array
	 */
	public function update( $new_instance, $old_instance ) {
		$instance                 = $old_instance;
		$instance['title']        = strip_tags( $new_instance['title'] );
		$instance['parent_forum'] = sanitize_text_field( $new_instance['parent_forum'] );

		// Force to any.
		if ( ! empty( $instance['parent_forum'] ) && ! is_numeric( $instance['parent_forum'] ) ) {
			$instance['parent_forum'] = 'any';
		}

		return $instance;
	}

	/**
	 * Output the forum widget options form.
	 *
	 * @since bbPress (r2653)
	 *
	 * @param array $instance Instance.
	 *
	 * @uses  BBP_Forums_Widget::get_field_id() To output the field id.
	 * @uses  BBP_Forums_Widget::get_field_name() To output the field name.
	 */
	public function form( $instance ) {

		// Get widget settings.
		$settings = $this->parse_settings( $instance );
		?>

		<p>
			<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:', 'buddyboss' ); ?>
				<input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr( $settings['title'] ); ?>" />
			</label>
		</p>

		<p>
			<label for="<?php echo $this->get_field_id( 'parent_forum' ); ?>"><?php _e( 'Parent Forum ID:', 'buddyboss' ); ?>
				<input class="widefat" id="<?php echo $this->get_field_id( 'parent_forum' ); ?>" name="<?php echo $this->get_field_name( 'parent_forum' ); ?>" type="text" value="<?php echo esc_attr( $settings['parent_forum'] ); ?>" />
			</label>

			<br />

			<small><?php _e( '"0" to show only root - "any" to show all', 'buddyboss' ); ?></small>
		</p>

		<?php
	}

	/**
	 * Merge the widget settings into defaults array.
	 *
	 * @since bbPress (r4802)
	 *
	 * @param array $instance Instance.
	 *
	 * @uses  bbp_parse_args() To merge widget settings into defaults.
	 *
	 * @return array
	 */
	public function parse_settings( $instance = array() ) {
		return bbp_parse_args(
			$instance,
			array(
				'title'        => __( 'Forums', 'buddyboss' ),
				'parent_forum' => 0,
			),
			'forum_widget_settings'
		);
	}
}

/**
 * Forums Topic Widget.
 *
 * Adds a widget which displays the topic list.
 *
 * @since bbPress (r2653)
 *
 * @uses WP_Widget
 */
class T24_BBP_Topics_Widget extends WP_Widget {

	/**
	 * Forums Topic Widget.
	 *
	 * Registers the topic widget.
	 *
	 * @since bbPress (r2653)
	 *
	 * @uses apply_filters() Calls 'bbp_topics_widget_options' with the
	 *                        widget options.
	 */
	public function __construct() {
		$widget_ops = apply_filters(
			'bbp_topics_widget_options',
			array(
				'classname'                   => 't24_widget_display_topics',
				'description'                 => __( 'A list of recent discussions, sorted by popularity or freshness.', 'buddyboss' ),
				'customize_selective_refresh' => true,
			)
		);

		parent::__construct( false, __( '(T24) Forum discussion list', 'buddyboss' ), $widget_ops );
	}

	/**
	 * Register the widget.
	 *
	 * @since bbPress (r3389)
	 *
	 * @uses register_widget()
	 */
	public static function register_widget() {
		register_widget( 'T24_BBP_Topics_Widget' );
	}

	/**
	 * Displays the output, the topic list.
	 *
	 * @since bbPress (r2653)
	 *
	 * @param mixed $args     Arguments.
	 * @param array $instance Instance.
	 *
	 * @uses  apply_filters() Calls 'bbp_topic_widget_title' with the title.
	 * @uses  bbp_topic_permalink() To display the topic permalink.
	 * @uses  bbp_topic_title() To display the topic title.
	 * @uses  bbp_get_topic_last_active_time() To get the topic last active
	 *                                         time.
	 * @uses  bbp_get_topic_id() To get the topic id.
	 */
	public function widget( $args = array(), $instance = array() ) {

		// Get widget settings.
		$settings = $this->parse_settings( $instance );

		// Typical WordPress filter.
		$settings['title'] = apply_filters( 'widget_title', $settings['title'], $instance, $this->id_base );

		// Forums filter.
		$settings['title'] = apply_filters( 'bbp_topic_widget_title', $settings['title'], $instance, $this->id_base );

		// How do we want to order our results?
		switch ( $settings['order_by'] ) {

			// Order by most recent replies.
			case 'freshness':
				$topics_query = array(
					'post_type'              => bbp_get_topic_post_type(),
					'post_parent'            => $settings['parent_forum'],
					'posts_per_page'         => (int) $settings['max_shown'],
					'post_status'            => array( bbp_get_public_status_id(), bbp_get_closed_status_id() ),
					'meta_query'             => array(
						array(
							'key'  => '_bbp_last_active_time',
							'type' => 'DATETIME',
						),
					),
					// Ordering.
					'orderby'                => 'meta_value',
					'order'                  => 'DESC',
					// Performance.
					'ignore_sticky_posts'    => true,
					'no_found_rows'          => true,
					'update_post_term_cache' => false,
					'update_post_meta_cache' => false,
				);
				break;

			// Order by total number of replies.
			case 'popular':
				$topics_query = array(
					'post_type'              => bbp_get_topic_post_type(),
					'post_parent'            => $settings['parent_forum'],
					'posts_per_page'         => (int) $settings['max_shown'],
					'meta_query'             => array(
						array(
							'key'  => '_bbp_reply_count',
							'type' => 'NUMERIC',
						),
					),
					'post_status'            => array( bbp_get_public_status_id(), bbp_get_closed_status_id() ),
					// Ordering.
					'orderby'                => 'meta_value_num',
					'order'                  => 'DESC',
					// Performance.
					'ignore_sticky_posts'    => true,
					'no_found_rows'          => true,
					'update_post_term_cache' => false,
					'update_post_meta_cache' => false,
				);
				break;

			// Order by which topic was created most recently.
			case 'newness':
				$topics_query = array(
					'post_type'              => bbp_get_topic_post_type(),
					'post_parent'            => $settings['parent_forum'],
					'posts_per_page'         => (int) $settings['max_shown'],
					'post_status'            => array( bbp_get_public_status_id(), bbp_get_closed_status_id() ),
					// Ordering.
					'orderby'                => 'date',
					'order'                  => 'DESC',
					// Performance.
					'ignore_sticky_posts'    => true,
					'no_found_rows'          => true,
					'update_post_term_cache' => false,
					'update_post_meta_cache' => false,
				);
				break;
			// Order by topic views.
			case 'views':
				default:
					$topics_query = array(
						'post_type'              => bbp_get_topic_post_type(),
						'post_parent'            => $settings['parent_forum'],
						'posts_per_page'         => (int) $settings['max_shown'],
						'meta_query'             => array(
							array(
								'key'  => 'views',
								'type' => 'NUMERIC',
							),
						),						
						'post_status'            => array( bbp_get_public_status_id(), bbp_get_closed_status_id() ),
						// Ordering.
						'orderby'                => 'meta_value_num',
						'order'                  => 'DESC',
						// Performance.
						'ignore_sticky_posts'    => true,
						'no_found_rows'          => true,
						'update_post_term_cache' => false,
						'update_post_meta_cache' => false,
					);
					break;				
		}

		// Note: private and hidden forums will be excluded via the
		// bbp_pre_get_posts_normalize_forum_visibility action and function.
		$widget_query = new WP_Query( $topics_query );

		// Bail if no topics are found.
		if ( ! $widget_query->have_posts() ) {
			return;
		}

		// Start an output buffer.
		ob_start();

		echo $args['before_widget'];

		if ( ! empty( $settings['title'] ) ) {
			echo $args['before_title'] . $settings['title'] . $args['after_title'];
		}
		?>

		<ul>

			<?php
			while ( $widget_query->have_posts() ) :

				$widget_query->the_post();
				$topic_id    = bbp_get_topic_id( $widget_query->post->ID );
				$author_link = '';

				// Maybe get the topic author.
				if ( ! empty( $settings['show_user'] ) ) :
					$author_link = bbp_get_topic_author_link(
						array(
							'post_id' => $topic_id,
							'type'    => 'both',
							'size'    => 14,
						)
					);
					$author_related_class = 'bbp-topic-has-avatar';
				else :
					$author_related_class = 'bbp-topic-no-avatar';
				endif;

				$author_url = bbp_get_topic_author_url( $topic_id );
				?>

				<li class="<?php echo $author_related_class; ?>">

					<?php if ( ! empty( $author_link ) ) : ?>

						<a href="<?php echo esc_url( $author_url ); ?>" class="bbp-author-link" rel="nofollow">
							<span class="bbp-author-avatar">
								<?php echo bbp_get_topic_author_avatar( $topic_id ); ?>
							</span>
						</a>

					<?php endif; ?>

					<div class="bbp-topic-info">
						<a class="bbp-forum-title" href="<?php bbp_topic_permalink( $topic_id ); ?>"><?php bbp_topic_title( $topic_id ); ?></a>

						<?php
						if ( ! empty( $author_link ) ) :
							printf( __( 'by %1$s', 'buddyboss' ), '<span class="topic-author"><a href="' . esc_url( $author_url ) . '">' . bbp_get_topic_author_display_name( $topic_id ) . '</a></span>' );
						endif;
						?>

						<?php if ( ! empty( $settings['show_date'] ) ) : ?>

							<div class="time-since"><?php bbp_topic_last_active_time( $topic_id ); ?></div>

						<?php endif; ?>
					</div>
				</li>

			<?php endwhile; ?>

		</ul>

		<?php
		echo $args['after_widget'];

		// Reset the $post global.
		wp_reset_postdata();

		// Output the current buffer.
		echo ob_get_clean();
	}

	/**
	 * Update the topic widget options.
	 *
	 * @since bbPress (r2653)
	 *
	 * @param array $new_instance The new instance options.
	 * @param array $old_instance The old instance options.
	 *
	 * @return array
	 */
	public function update( $new_instance = array(), $old_instance = array() ) {
		$instance                 = $old_instance;
		$instance['title']        = strip_tags( $new_instance['title'] );
		$instance['order_by']     = strip_tags( $new_instance['order_by'] );
		$instance['parent_forum'] = sanitize_text_field( $new_instance['parent_forum'] );
		$instance['max_shown']    = (int) $new_instance['max_shown'];

		// Date.
		$instance['show_date'] = isset( $new_instance['show_date'] )
			? (bool) $new_instance['show_date']
			: false;

		// Author.
		$instance['show_user'] = isset( $new_instance['show_user'] )
			? (bool) $new_instance['show_user']
			: false;

		// last activity.
		$instance['show_last_activity'] = isset( $new_instance['show_last_activity'] )
			? (bool) $new_instance['show_last_activity']
			: false;
		// stats.
		$instance['show_stats'] = isset( $new_instance['show_stats'] )
			? (bool) $new_instance['show_stats']
			: false;

		// Force to any.
		if ( ! empty( $instance['parent_forum'] ) && ! is_numeric( $instance['parent_forum'] ) ) {
			$instance['parent_forum'] = 'any';
		}

		return $instance;
	}

	/**
	 * Output the topic widget options form.
	 *
	 * @since bbPress (r2653)
	 *
	 * @param array $instance Instance.
	 *
	 * @uses  T24_BBP_Topics_Widget::get_field_id() To output the field id.
	 * @uses  T24_BBP_Topics_Widget::get_field_name() To output the field name.
	 */
	public function form( $instance = array() ) {

		// Get widget settings.
		$settings = $this->parse_settings( $instance );
		?>

		<p><label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:', 'buddyboss' ); ?> <input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr( $settings['title'] ); ?>" /></label></p>
		<p><label for="<?php echo $this->get_field_id( 'max_shown' ); ?>"><?php _e( 'Maximum topics to show:', 'buddyboss' ); ?> <input class="widefat" id="<?php echo $this->get_field_id( 'max_shown' ); ?>" name="<?php echo $this->get_field_name( 'max_shown' ); ?>" type="text" value="<?php echo esc_attr( $settings['max_shown'] ); ?>" /></label></p>

		<p>
			<label for="<?php echo $this->get_field_id( 'parent_forum' ); ?>"><?php _e( 'Parent Forum ID:', 'buddyboss' ); ?>
				<input class="widefat" id="<?php echo $this->get_field_id( 'parent_forum' ); ?>" name="<?php echo $this->get_field_name( 'parent_forum' ); ?>" type="text" value="<?php echo esc_attr( $settings['parent_forum'] ); ?>" />
			</label>

			<br />

			<small><?php _e( '"0" to show only root - "any" to show all', 'buddyboss' ); ?></small>
		</p>

		<p><label for="<?php echo $this->get_field_id( 'show_date' ); ?>"><?php _e( 'Show post date:', 'buddyboss' ); ?> <input type="checkbox" id="<?php echo $this->get_field_id( 'show_date' ); ?>" name="<?php echo $this->get_field_name( 'show_date' ); ?>" <?php checked( true, $settings['show_date'] ); ?> value="1" /></label></p>
		<p><label for="<?php echo $this->get_field_id( 'show_user' ); ?>"><?php _e( 'Show discussion author:', 'buddyboss' ); ?> <input type="checkbox" id="<?php echo $this->get_field_id( 'show_user' ); ?>" name="<?php echo $this->get_field_name( 'show_user' ); ?>" <?php checked( true, $settings['show_user'] ); ?> value="1" /></label></p>
		<p><label for="<?php echo $this->get_field_id( 'show_last_activity' ); ?>"><?php _e( 'Show discussion last activity:', 'buddyboss' ); ?> <input type="checkbox" id="<?php echo $this->get_field_id( 'show_last_activity' ); ?>" name="<?php echo $this->get_field_name( 'show_last_activity' ); ?>" <?php checked( true, $settings['show_last_activity'] ); ?> value="1" /></label></p>
		<p><label for="<?php echo $this->get_field_id( 'show_stats' ); ?>"><?php _e( 'Show discussion stats: # of replies, # of views, # of votes:', 'buddyboss' ); ?> <input type="checkbox" id="<?php echo $this->get_field_id( 'show_stats' ); ?>" name="<?php echo $this->get_field_name( 'show_stats' ); ?>" <?php checked( true, $settings['show_stats'] ); ?> value="1" /></label></p>
	
		<p>
			<label for="<?php echo $this->get_field_id( 'order_by' ); ?>"><?php _e( 'Order By:', 'buddyboss' ); ?></label>
			<select name="<?php echo $this->get_field_name( 'order_by' ); ?>" id="<?php echo $this->get_field_name( 'order_by' ); ?>">
				<option <?php selected( $settings['order_by'], 'newness' ); ?> value="newness"><?php _e( 'Newest discussions', 'buddyboss' ); ?></option>
				<option <?php selected( $settings['order_by'], 'popular' ); ?> value="popular"><?php _e( 'Discussions with most replies', 'buddyboss' ); ?></option>
				<option <?php selected( $settings['order_by'], 'freshness' ); ?> value="freshness"><?php _e( 'Discussions with latest Replies', 'buddyboss' ); ?></option>
				<option <?php selected( $settings['order_by'], 'views' ); ?> value="views"><?php _e( 'Discussions with most views', 'buddyboss' ); ?></option>
			</select>
		</p>

		<?php
	}

	/**
	 * Merge the widget settings into defaults array.
	 *
	 * @since bbPress (r4802)
	 *
	 * @param array $instance Instance.
	 *
	 * @uses  bbp_parse_args() To merge widget options into defaults.
	 *
	 * @return array
	 */
	public function parse_settings( $instance = array() ) {
		return bbp_parse_args(
			$instance,
			array(
				'title'        => __( 'Recent Discussions', 'buddyboss' ),
				'max_shown'    => 5,
				'show_date'    => false,
				'show_user'    => false,
				'parent_forum' => 'any',
				'order_by'     => false,
			),
			'topic_widget_settings'
		);
	}
}

/**
 * Forums Stats Widget.
 *
 * Adds a widget which displays the forum statistics.
 *
 * @since bbPress (r4509)
 *
 * @uses WP_Widget
 */
class T24_BBP_Stats_Widget extends WP_Widget {

	/**
	 * Forums Stats Widget.
	 *
	 * Registers the stats widget
	 *
	 * @since bbPress (r4509)
	 *
	 * @uses  apply_filters() Calls 'bbp_stats_widget_options' with the
	 *        widget options.
	 */
	public function __construct() {
		$widget_ops = apply_filters(
			'bbp_stats_widget_options',
			array(
				'classname'                   => 't24_widget_display_stats',
				'description'                 => __( 'Some statistics from your forum.', 'buddyboss' ),
				'customize_selective_refresh' => true,
			)
		);

		parent::__construct( false, __( '(T24) Forum Statistics', 'buddyboss' ), $widget_ops );
	}

	/**
	 * Register the widget.
	 *
	 * @since bbPress (r4509)
	 *
	 * @uses register_widget()
	 */
	public static function register_widget() {
		register_widget( 'T24_BBP_Stats_Widget' );
	}

	/**
	 * Displays the output, the statistics.
	 *
	 * @since bbPress (r4509)
	 *
	 * @param mixed $args     Arguments.
	 * @param array $instance Instance.
	 *
	 * @uses  apply_filters() Calls 'bbp_stats_widget_title' with the title.
	 * @uses  bbp_get_template_part() To get the content-forum-statistics template.
	 */
	public function widget( $args = array(), $instance = array() ) {

		// Get widget settings.
		$settings = $this->parse_settings( $instance );

		// Typical WordPress filter.
		$settings['title'] = apply_filters( 'widget_title', $settings['title'], $instance, $this->id_base );

		// Forums widget title filter.
		$settings['title'] = apply_filters( 'bbp_stats_widget_title', $settings['title'], $instance, $this->id_base );

		echo $args['before_widget'];

		if ( ! empty( $settings['title'] ) ) {
			echo $args['before_title'] . $settings['title'] . $args['after_title'];
		}

		bbp_get_template_part( 'content', 'statistics' );

		echo $args['after_widget'];
	}

	/**
	 * Update the stats widget options.
	 *
	 * @since bbPress (r4509)
	 *
	 * @param array $new_instance The new instance options.
	 * @param array $old_instance The old instance options.
	 *
	 * @return array
	 */
	public function update( $new_instance, $old_instance ) {
		$instance          = $old_instance;
		$instance['title'] = strip_tags( $new_instance['title'] );

		return $instance;
	}

	/**
	 * Output the stats widget options form.
	 *
	 * @since bbPress (r4509)
	 *
	 * @param array $instance Instance.
	 *
	 * @return string|void
	 */
	public function form( $instance ) {

		// Get widget settings.
		$settings = $this->parse_settings( $instance );
		?>

		<p>
			<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:', 'buddyboss' ); ?>
				<input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr( $settings['title'] ); ?>"/>
			</label>
		</p>

		<?php
	}

	/**
	 * Merge the widget settings into defaults array.
	 *
	 * @since bbPress (r4802)
	 *
	 * @param array $instance Instance.
	 *
	 * @uses  bbp_parse_args() To merge widget settings into defaults.
	 *
	 * @return array
	 */
	public function parse_settings( $instance = array() ) {
		return bbp_parse_args(
			$instance,
			array(
				'title' => __( 'Forum Statistics', 'buddyboss' ),
			),
			'stats_widget_settings'
		);
	}
}
