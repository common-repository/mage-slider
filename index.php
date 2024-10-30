<?php 
/*
Plugin Name: Mage Slider
Plugin URI: https://wordpress.org/plugins/mage-slider/
Description: An Awesome Slider For your WordPress Website
Author: MagePeople Team
Version: 1.0
Author URI: http://mage-people.com
License: GPLv2 or later
Text Domain: mps
*/

/*
This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

require_once (dirname(__FILE__).'/libs/class.settings-api.php');
require_once (dirname(__FILE__)."/inc/enque_scripts.php");
require_once (dirname(__FILE__)."/inc/custom_cpt.php");
require_once (dirname(__FILE__)."/inc/admin_settings.php");
require_once (dirname(__FILE__)."/inc/shortcode.php");




// Enque Required Style & Scripts For Front End
function mage_mps_libs() {

    wp_enqueue_script('jquery'); 

    wp_enqueue_script( 'mage-mslider-scripts', plugin_dir_url( __FILE__ ) . 'js/mslider.js', array('jquery'), '1', true );

    wp_enqueue_script( 'mage-slider-scripts', plugin_dir_url( __FILE__ ) . 'js/main.js', array('jquery','mage-mslider-scripts'), '1', true );

    wp_enqueue_style('mage-slider-styles',plugin_dir_url( __FILE__ ) .'css/main.css');
}
add_action( 'wp_enqueue_scripts', 'mage_mps_libs' );





function mps_styles(){   
$mps_title_color        = mps_get_option('mps_title_color','mps_slider','#fff');
$mps_text_color         = mps_get_option('mps_text_color','mps_slider','#fff');
$mps_overly_color       = mps_get_option('mps_overly_color','mps_slider','#333');
$mps_overlay_opecity    = mps_get_option('mps_overlay_opecity','mps_slider','0.5');
?>
<style>
.mps_slider_list::after {
  background: <?php echo $mps_overly_color; ?> none repeat scroll 0 0;
  content: "";
  height: 100%;
  opacity: <?php echo $mps_overlay_opecity; ?>;
  position: absolute;
  width: 100%;
}
.mps_slider .sb_item b, .mps_slider .sb_item.active b {
  color: <?php echo $mps_title_color; ?>;
}
.mps_slider .sb_item span {
  color: <?php echo $mps_text_color; ?>;
}
</style>
<?php
}
add_action('wp_head','mps_styles');




function msp_script(){
$autoplay = mps_get_option('mps_autoplay','mps_slider','true');    
$mps_speed = mps_get_option('mps_speed','mps_slider','500');    
$mps_delay = mps_get_option('mps_delay','mps_slider','5000'); 
$mps_width              = mps_get_option('mps_width','mps_slider','100%');    
$mps_height             = mps_get_option('mps_height','mps_slider','400');        
?>
<script>
jQuery(document).ready(function(){
    jQuery('#mps_slider').mSlider({
            mode: 'transfusion',
            autoplay: <?php echo $autoplay; ?>,
            easing: 'linear',
            speed: <?php echo $mps_speed; ?>,
            delay: <?php echo $mps_delay; ?>,
            buttons: jQuery('.slider_buttons .sb_item'),
        });
});
    function getResize() {
        var widthW='<?php echo $mps_width; ?>',
            heightW='<?php echo $mps_height; ?>';
    /*------ Slider resize ------*/
        //if (heightW<minHeight) heightW=minHeight;
        jQuery('.mps_slider, .mps_slider_list, .mps_slider_item, .slider_buttons, .sb_inner').height(heightW).width(widthW);
    /*------  ------*/
    }
</script>
<?php
}
add_action('wp_footer','msp_script');