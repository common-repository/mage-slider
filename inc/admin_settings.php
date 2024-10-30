<?php

/**
 * WordPress settings API demo class
 *
 * @author Tareq Hasan
 */
if ( !class_exists('Mage_Slider_Setting' ) ):
class Mage_Slider_Setting {

    private $settings_api;

    function __construct() {
        $this->settings_api = new Mage_Settings_API;

        add_action( 'admin_init', array($this, 'admin_init') );
        add_action( 'admin_menu', array($this, 'admin_menu') );
    }

    function admin_init() {

        //set the settings
        $this->settings_api->set_sections( $this->get_settings_sections() );
        $this->settings_api->set_fields( $this->get_settings_fields() );

        //initialize settings
        $this->settings_api->admin_init();
    }

    function admin_menu() {
        add_options_page( 'Mage Slider', 'Mage Slider', 'delete_posts', 'mage_slider_settings', array($this, 'plugin_page') );
    }

    function get_settings_sections() {
        $sections = array(

            array(
                'id'    => 'mps_slider',
                'title' => __( 'Mage Slider', 'mps' )
            ),                                       
            array(
                'id'    => 'mps_custom_css',
                'title' => __( 'Custom CSS', 'mps' )
            )

        );
        return $sections;
    }

    /**
     * Returns all the settings fields
     *
     * @return array settings fields
     */
    function get_settings_fields() {
        $settings_fields = array(

            'mps_slider' => array(

                array(
                    'name'    => 'mps_autoplay',
                    'label'   => __( 'Auto play', 'mps' ),                    
                    'type'    => 'select',
                    'default' => 'true',
                    'options' => array(
                        'true' => 'Yes',
                        'false' => 'No'
                        )
                ),

                array(
                    'name'    => 'mps_speed',
                    'label'   => __( 'Slider Speed', 'mps' ),
                    'type'    => 'number',
                    'default'    => '500',
                ), 
                
                array(
                    'name'    => 'mps_delay',
                    'label'   => __( 'Slider Delay', 'mps' ),
                    'type'    => 'number',
                    'default'    => '5000',
                ),   
                              
                array(
                    'name'    => 'mps_width',
                    'label'   => __( 'Slider Width', 'mps' ),
                    'type'    => 'text',
                    'default'    => '100%',
                ), 
                array(
                    'name'    => 'mps_height',
                    'label'   => __( 'Slider Height', 'mps' ),
                    'type'    => 'text',
                    'default'    => '400px',
                ),  

                array(
                    'name'    => 'mps_title_color',
                    'label'   => __( 'Slider Title Color', 'mkb' ),
                    'type'    => 'color',
                    'default' => '#fff'
                ),
                array(
                    'name'    => 'mps_text_color',
                    'label'   => __( 'Slider Text Color', 'mkb' ),
                    'type'    => 'color',
                    'default' => '#fff'
                ),   
 

                array(
                    'name'    => 'mps_overly_color',
                    'label'   => __( 'Slider Overlay Color', 'mkb' ),
                    'type'    => 'color',
                    'default' => '#333333'
                ),                                            
                array(
                    'name'    => 'mps_overlay_opecity',
                    'label'   => __( 'Overlay Opecity', 'mps' ),                    
                    'type'    => 'select',
                    'default' => '0.5',
                    'options' => array(
                        '0.1' => '0.1',
                        '0.2' => '0.2',
                        '0.3' => '0.3',
                        '0.4' => '0.4',
                        '0.5' => '0.5',
                        '0.6' => '0.6',
                        '0.7' => '0.7',
                        '0.8' => '0.8',
                        '0.9' => '0.9',
                        '1' => '1',
                        )
                ),

            ),           
            'mps_custom_css' => array(




            )

        );

        return $settings_fields;
    }

    function plugin_page() {
        echo '<div class="wrap">';
                $this->settings_api->show_navigation();
                $this->settings_api->show_forms();
        echo '</div>';
    }

    /**
     * Get all the pages
     *
     * @return array page names with key value pairs
     */
    function get_pages() {
        $pages = get_pages();
        $pages_options = array();
        if ( $pages ) {
            foreach ($pages as $page) {
                $pages_options[$page->ID] = $page->post_title;
            }
        }

        return $pages_options;
    }

}
new Mage_Slider_Setting();
endif;


function mps_get_option( $option, $section, $default = '' ) {

    $options = get_option( $section );

    if ( isset( $options[$option] ) ) {
        return $options[$option];
    }

    return $default;
}