<?php
// Create Slider Custom Post type
function mps_cpt() {
    $args = array(
        'public'   => true,
        'label'    => 'Slider',
        'menu_icon'=> 'dashicons-book',
        'supports' => array('title','editor','thumbnail')
    );
    register_post_type( 'mps_slider', $args );
}
add_action( 'init', 'mps_cpt' );