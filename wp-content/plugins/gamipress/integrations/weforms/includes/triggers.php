<?php
/**
 * Triggers
 *
 * @package GamiPress\WeForms\Triggers
 * @since 1.0.0
 */

// Exit if accessed directly
if( !defined( 'ABSPATH' ) ) exit;

/**
 * Register plugin specific triggers
 *
 * @since 1.0.0
 *
 * @param array $triggers
 * @return mixed
 */
function gamipress_weforms_activity_triggers( $triggers ) {

    $triggers[__( 'WP WeForms', 'gamipress' )] = array(
        'gamipress_weforms_new_form_submission'             => __( 'Submit a form', 'gamipress' ),
        'gamipress_weforms_specific_new_form_submission'    => __( 'Submit a specific form', 'gamipress' ),
        'gamipress_weforms_field_value_submission'          => __( 'Submit a specific field value', 'gamipress' ),
        'gamipress_weforms_specific_field_value_submission' => __( 'Submit a specific field value on a specific form', 'gamipress' ),
    );

    return $triggers;

}
add_filter( 'gamipress_activity_triggers', 'gamipress_weforms_activity_triggers' );

/**
 * Register plugin specific activity triggers
 *
 * @since  1.0.0
 *
 * @param  array $specific_activity_triggers
 * @return array
 */
function gamipress_weforms_specific_activity_triggers( $specific_activity_triggers ) {

    $specific_activity_triggers['gamipress_weforms_specific_new_form_submission'] = array( 'wpuf_contact_form' );
    $specific_activity_triggers['gamipress_weforms_specific_field_value_submission'] = array( 'wpuf_contact_form' );

    return $specific_activity_triggers;

}
add_filter( 'gamipress_specific_activity_triggers', 'gamipress_weforms_specific_activity_triggers' );

/**
 * Build custom activity trigger label
 *
 * @since  1.0.0
 *
 * @param string    $title
 * @param integer   $requirement_id
 * @param array     $requirement
 *
 * @return string
 */
function gamipress_weforms_activity_trigger_label( $title, $requirement_id, $requirement ) {

    $field_name = ( isset( $requirement['weforms_field_name'] ) ) ? $requirement['weforms_field_name'] : '';
    $field_value = ( isset( $requirement['weforms_field_value'] ) ) ? $requirement['weforms_field_value'] : '';

    switch( $requirement['trigger_type'] ) {
        // Specific field value
        case 'gamipress_weforms_field_value_submission':
            return sprintf( __( 'Submit a form setting field %s to %s value', 'gamipress' ), $field_name, $field_value );
            break;
        // Specific field value on a specific form
        case 'gamipress_weforms_specific_field_value_submission':
            $achievement_post_id = absint( $requirement['achievement_post'] );
            $form_title = gamipress_get_specific_activity_trigger_post_title( $achievement_post_id, $requirement['trigger_type'], get_current_blog_id() );
            return sprintf( __( 'Submit %s form setting field "%s" to "%s" value' ), $form_title, $field_name, $field_value );
            break;
    }

    return $title;
}
add_filter( 'gamipress_activity_trigger_label', 'gamipress_weforms_activity_trigger_label', 10, 3 );

/**
 * Register plugin specific activity triggers labels
 *
 * @since  1.0.0
 *
 * @param  array $specific_activity_trigger_labels
 * @return array
 */
function gamipress_weforms_specific_activity_trigger_label( $specific_activity_trigger_labels ) {

    $specific_activity_trigger_labels['gamipress_weforms_specific_new_form_submission'] = __( 'Submit %s', 'gamipress' );
    $specific_activity_trigger_labels['gamipress_weforms_specific_field_value_submission'] = __( 'Submit a specific field value on %s', 'gamipress' );
    
    return $specific_activity_trigger_labels;

}
add_filter( 'gamipress_specific_activity_trigger_label', 'gamipress_weforms_specific_activity_trigger_label' );

/**
 * Get user for a given trigger action.
 *
 * @since  1.0.0
 *
 * @param  integer $user_id user ID to override.
 * @param  string  $trigger Trigger name.
 * @param  array   $args    Passed trigger args.
 * @return integer          User ID.
 */
function gamipress_weforms_trigger_get_user_id( $user_id, $trigger, $args ) {

    switch ( $trigger ) {
        case 'gamipress_weforms_new_form_submission':
        case 'gamipress_weforms_specific_new_form_submission':
        case 'gamipress_weforms_field_value_submission':
        case 'gamipress_weforms_specific_field_value_submission':
            $user_id = $args[1];
            break;
    }

    return $user_id;

}
add_filter( 'gamipress_trigger_get_user_id', 'gamipress_weforms_trigger_get_user_id', 10, 3 );

/**
 * Get the id for a given specific trigger action.
 *
 * @since  1.0.0
 *
 * @param  integer  $specific_id Specific ID.
 * @param  string  $trigger Trigger name.
 * @param  array   $args    Passed trigger args.
 *
 * @return integer          Specific ID.
 */
function gamipress_weforms_specific_trigger_get_id( $specific_id, $trigger = '', $args = array() ) {

    switch ( $trigger ) {
        case 'gamipress_weforms_specific_new_form_submission':
        case 'gamipress_weforms_specific_field_value_submission':
            $specific_id = $args[0];
    }

    return $specific_id;

}
add_filter( 'gamipress_specific_trigger_get_id', 'gamipress_weforms_specific_trigger_get_id', 10, 3 );

/**
 * Extended meta data for event trigger logging
 *
 * @since 1.0.0
 *
 * @param array 	$log_meta
 * @param integer 	$user_id
 * @param string 	$trigger
 * @param integer 	$site_id
 * @param array 	$args
 *
 * @return array
 */
function gamipress_weforms_log_event_trigger_meta_data( $log_meta, $user_id, $trigger, $site_id, $args ) {

    switch ( $trigger ) {
        case 'gamipress_weforms_new_form_submission':
        case 'gamipress_weforms_specific_new_form_submission':
            // Add the form ID
            $log_meta['form_id'] = $args[0];
            break;
        case 'gamipress_weforms_field_value_submission':
        case 'gamipress_weforms_specific_field_value_submission':
            $log_meta['form_id'] = $args[0];
            $log_meta['field_name'] = $args[2];
            $log_meta['field_value'] = $args[3];
            break;
    }

    return $log_meta;

}
add_filter( 'gamipress_log_event_trigger_meta_data', 'gamipress_weforms_log_event_trigger_meta_data', 10, 5 );

/**
 * Extra data fields
 *
 * @since 1.0.0
 *
 * @param array     $fields
 * @param int       $log_id
 * @param string    $type
 *
 * @return array
 */
function gamipress_weforms_log_extra_data_fields( $fields, $log_id, $type ) {

    $prefix = '_gamipress_';

    $log = ct_get_object( $log_id );
    $trigger = $log->trigger_type;

    if( $type !== 'event_trigger' ) {
        return $fields;
    }

    switch( $trigger ) {
        case 'gamipress_weforms_field_value_submission':
        case 'gamipress_weforms_specific_field_value_submission':

            $field_value = ct_get_object_meta( $log_id, $prefix . 'field_value', true );

            $fields[] = array(
                'name'      => __( 'Field name', 'gamipress' ),
                'desc'      => __( 'Field name attached to this log.', 'gamipress' ),
                'id'        => $prefix . 'field_name',
                'type'      => 'text',
            );
            $fields[] = array(
                'name'      => __( 'Field value', 'gamipress' ),
                'desc'      => __( 'Field value attached to this log.', 'gamipress' ),
                'id'        => $prefix . 'field_value',
                'type'      => ( is_array( $field_value ) ? 'advanced_select' : 'text' ),
                'multiple'  => ( is_array( $field_value ) && count( $field_value ) > 1 ? true : false ),
                'options'   => ( is_array( $field_value ) ? $field_value : array() ),
            );
            break;
    }

    return $fields;

}
add_filter( 'gamipress_log_extra_data_fields', 'gamipress_weforms_log_extra_data_fields', 10, 3 );