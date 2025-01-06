=== BBP Core - Expand bbPress powered forums with useful features ===
Contributors: spiderdevs, mdjwel, delweratjk
Tags: bbPress, Community, Forum, Private Replies, Attachments
Requires at least: 5.0
Tested up to: 6.6.1
Requires PHP: 7.4
Stable tag: 1.2.4
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

BBP Core expands many useful features for the bbPress forums.

== Description ==

BBP Core empowers bbPress forum with useful features. For example - Unified Forum Builder UI, Solved topics, Voting, Private replies, Forum statistics etc.

### Video Overview (Showcased free and premium features)
[youtube https://youtu.be/l2rlT_Qwd60?si=gjBh1VJupitL0Rh8]

## 🔗 USEFUL LINKS ##
- [Get the Pro Version](https://spider-themes.net/bbp-core/pricing)
- [Demo (built with bbPress and BBP Core)](https://wordpress-plugins.spider-themes.net/bbp-core-pro/)
- [Documentation](https://helpdesk.spider-themes.net/docs/bbp-core-wordpress-plugin)
- [Explore More](https://spider-themes.net/bbp-core)

### Reasons to Choose BBP Core ###

- **Lightweight:** Loading only necessary css, javascript assets when necessary, it will not load assets unless necessary.

- **Unified Forum Builder:**  It provides a single, organized view of forums and topics, along with filtering options for various topic statuses, enabling efficient navigation and management. Users can even check trashed topics.

- **Effortless Topic Management:** You can create and delete forums and topics directly from the BBP Core Admin UI, eliminating the need to navigate to the classic forum views for these actions.

- **Private Reply:** Users can post replies to topics that are visible only to forum owners, ensuring privacy and confidentiality in their discussions.

- **Solved Topics:** Allows users to mark forum topics as either solved or unsolved. Solved topics display a 'Resolved' badge at the end of their titles, making it easy to identify resolved issues.

- **Voting On Topic & Replies:**  Allows users to vote on replies to topics, with the highest-voted reply rising to the top. The voting system is powered by AJAX for a seamless and engaging community interaction.

- **Media Attachments:**  Enables users to attach files to their replies, which can be downloaded by other users. The attachments are displayed in a separate section below the Topic and Reply content. This enhances the forum's functionality, allowing for the seamless sharing of relevant files and media within discussions.

- **Elementor Integrated:** BBP Core comes with a set of Elementor widgets that can be used to display forums, topics, and replies on any page of your website. The widgets are highly customizable, allowing you to configure their appearance and functionality to suit your needs.

### PRO Features ###
- **1. Admin Notifications:** Displays real-time updates of the latest forum activity directly on the dashboard area. This offers users a quick and convenient way to stay informed about recent happenings within the forum.

- **2. User Notifications:** Keep the logged-in users informed by providing them with real-time updates on the latest activity within their subscribed forums, topics, and replies. This ensures that users stay engaged and informed about discussions that matter most to them without having to actively monitor each one individually.

- **3. Mini Profile:** Displays a compact version of the user profile, which can be used to quickly view the user's profile information and activity. This is useful for users who wish to quickly view the profile of another user without navigating to their profile page.

- **4. Pre-made Elementor Templates:** BBP Core Pro comes with a set of pre-made Elementor templates that can be imported with a single click. The templates are highly customizable, allowing you to configure their appearance and functionality to suit your needs.

- **5. I've the Same Question Button:** Allows users to quickly indicate that they have a similar question, possibly reducing duplicate threads and encouraging discussions on existing topics.

- **6. Post as Anonymous:** Allows users to post replies to topics anonymously, without revealing their identity. This can be useful for users who wish to discuss sensitive topics without revealing their identity.

- **7. My Profile Link:** Generates a dynamic URL that links directly to the profile page of the currently logged-in user. This convenient URL simplifies the process of users accessing and viewing their own profiles.

- **8. Pending Topic:** Enables admin-controlled approval of forum topics to prevent spam or inappropriate content from being published until a moderator approves them.

- **9. Advanced Attachment Features:** Increases the maximum file size and allows multiple files to be uploaded at once. Provides the option to delete attachments along with forum or topic content.

- **10. Advanced Voting Features:** Options to restrict voting for non-logged-in users, prevent new votes on closed topics, disallow self-voting, allow unlimited voting for administrators, and sort topics and replies based on their voting scores.


== Frequently Asked Questions ==

= Does BBP Core work with any theme? =
Yes, BBP Core works with any bbPress WordPress theme.

= Do I need coding skills to use BBP Core? =
Absolutely not! BBP Core is as easy to use, as you can think of.

= Where can I report bugs or contribute to the project? =
To report bugs or to contribute, head-over to the [GitHub repository](https://github.com/spider-themes/bbp-core/issues)

== Installation ==

= Minimum Requirements =

* PHP 7.3 or greater is recommended
* MySQL 5.6 or greater is recommended

You can install the BBP Core from your WordPress Dashboard or manually upload it through cPanel/FTP.

= OPTION 1: Install the BBP Core Plugin from WordPress Dashboard =

1. Navigate to Plugins -> Add New.
2. Search for 'BBP Core' and click on the Install button to install the plugin.
3. Activate the plugin in the Plugins menu.
4. Optional step: configure the plugin in the Admin menu, in BBP Core -> Settings.

= OPTION 2: Manually Upload Plugin Files =

1. Download the plugin file from the plugin page: bbp-core.zip.
2. Upload the 'bbp-core.zip' file to your '/wp-content/plugins' directory.
2. Unzip the file bbp-core.zip (do not rename the folder).

== Screenshots ==

1. Custom Admin Dashboard
2. BBP Core Settings

== Changelog ==

= v1.2.4 (23 August 2024) =
Fixed: Brand color change issue
Updated: Freemius SDK updated to 2.7.4

= v1.2.3 (25 March 2024) =
Fixed: Resolved elementor free & pro widgets conflict. Free and pro widgets appearing at the same time on the editor.
Fixed: Fixed fatal error while bbpress is not activated
Fixed: Admin script loading issue (attached the scripts with the correct hook)
New: Customizer option added for the brand color
Tweaked: Forum Builder UI improved in the Admin Dashboard
Tweaked: Voting settings option improved in the settings page
Tweaked: Compatibility with the latest BBP Core Pro plugin
Tweaked: Redirection stop after activating the plugin
Tweaked: Plugin's Documentation link added in plugins page (beside the plugin name)

= v1.2.2 (01 January 2024) =
Fixed: Code validation issues fixed in the asking-for-review.php file
Fixed: Create Topic as anonymous issue solved
Fixed: Resolved elementor free & pro widgets conflict
Tweaked: 'BBPC Forum Tabs' and ''BBPC Search' Elementor widgets design improved
Updated: Freemius SDK updated to v2.6.2

= v1.2.1 (28 October 2023) =
New: Brand Color change option added in the Settings page
Fixed: If solved topic exists, some php warning shows in the Forum Builder UI
Fixed: Search Elementor widget's overlay color on focus issue
Tweaked: Ajax Search Results improved for the Search Elementor widget
Tweaked: Search form design improved (made consistent and adjusted with the background) in the Forum Builder UI in the Admin Dashboard
Tweaked: Trashed topics excluded from the Forum Topics count in the Forum Builder UI
Tweaked: Dashicons used instead of some svg icons (solved, unsolved filters) in the Forum Builder UI
Tweaked: Space adjusted if all the filter tabs shown in the Forum Builder UI
Tweaked: Removed some unnecessary files to make the plugin lightweight
Updated: Freemius SDK to v2.6.0

= v1.2.0 (27 October 2023) =
Fixed: BBP Core Search Form widget's overlay color on focus issue fixed
Fixed: PHP Namespace issue
Updated: Freemius SDK to v2.5.12
Tweaked: Re-structured and optimized the codebase
Tweaked: Removed some unnecessary files
Tweaked: Made compatible with the Latest BBP Core Pro plugin
Tweaked: Regenerated the POT file more accurately with the latest strings
Tweaked: Forum Builder UI improved in the Admin Dashboard

= v1.1.0 (13 July 2023) =
New: BBPC Forums Elementor widgets added
New: BBPC Ajax Forums Elementor widgets added (Unlocked in Ama theme and Ama Pro plugin)
New: BBPC Forum Topics Elementor widgets added (Unlocked in Ama theme and Ama Pro plugin)
New: BBPC Forum Tabs Elementor widgets added (Unlocked in Ama theme and Ama Pro plugin)
New: BBPC Forum Search Elementor widgets added (Unlocked in Ama theme and Ama Pro plugin)
New: BBPC Forum Single Forum Elementor widgets added (Unlocked in Ama theme and Ama Pro plugin)
Tweaked: Removed some unnecessary files (Unlocked in Ama theme and Ama Pro plugin)
Tweaked: Improved/redesigned the Unified Forums Builder UI (Admin UI)
Updated: Freemius SDK to v2.5.9

= v1.0.7 (September 26, 2022) =
 * Fix: Filters visibility issues fixed

= v1.0.6 (September 24, 2022) =
 * Fix: Create Forum class warning
 * Fix: Add Forum issues
 * Improved: Forum filter selection persistence, using cookies

= v1.0.5 (September 17, 2022) =
 * Improved: Admin UI filter navigation.
 * New: Adding forum and topics from Admin UI Page

= v1.0.4 (September 10, 2022) =
 * Fix: Add new button disappeared on plugin and theme page solved

= v1.0.3 (September 9, 2022) =
 * Fix: Admin UI forum thumbnail
 * Added support for docly theme

= v1.0.2 (August 21, 2022) =
 * Fix: Admin UI settings
 * Fix: Admin UI CSS

= v1.0.1 (August 21, 2022) =
 * Custom Forum dashboard UI
 * BBPress voting
 * Highly customizable settings options

= v1.0.0 (July 25, 2022) =
 * Initial release