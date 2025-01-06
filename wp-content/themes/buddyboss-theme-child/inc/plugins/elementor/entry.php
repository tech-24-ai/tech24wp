<?php

namespace BBElementor;

use BBElementor\Widgets\Header_Bar;

// use BBElementor\Widgets\Ld_Activity;
// use BBElementor\Widgets\Ld_Courses;
use BBElementor\Widgets\BBP_Members;
use BBElementor\Widgets\BBP_Activity;
use BBElementor\Widgets\BBP_Forums;
use BBElementor\Widgets\BBP_Forums_Activity;
use BBElementor\Widgets\BBP_Profile_Completion;
use BBElementor\Widgets\BBP_Dashboard_Intro;
use BBElementor\Widgets\BBP_Dashboard_Grid;
use BBElementor\Widgets\BB_Tabs;
use BBElementor\Widgets\BB_Review;
use BBElementor\Widgets\BB_Gallery;
use BBElementor\Widgets\BB_Lms_Courses;
use BBElementor\Widgets\BB_Lms_Activity;
use BBElementor\Widgets\BB_Groups;


if ( ! defined( 'ABSPATH' ) ) {
	exit;
} // Exit if accessed directly

/**
 * Main BB Elementor Widgets Class
 *
 * Register new elementor widget.
 *
 * @since 1.0.0
 */
class BB_Elementor_Widgets {

	/**
	 * Constructor
	 *
	 * @since  1.0.0
	 *
	 * @access public
	 */
	public function __construct() {
		$this->add_actions();
	}


}

new BB_Elementor_Widgets();
