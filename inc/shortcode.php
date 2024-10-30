<?php
add_shortcode( 'mage-slider', 'mps_slider' );
function mps_slider($atts, $content=null){
     $count =1;
     $args = array (
                'post_type'  => array( 'mps_slider' ),
                'posts_per_page' => -1,
                );
    ob_start();
?>
<div class="mps_slider" id="mps_slider">
    <div class="mps_slider_list">
        <?php 
            $loop = new WP_Query( $args );
            while ($loop->have_posts()) {
                $loop->the_post(); 
        ?>
         <div class="mps_slider_item" style="background-image:url('<?php echo the_post_thumbnail_url('full'); ?>');">
        </div>

    <?php } ?>          
</div>
<div class="slider_buttons">
    <div class="sb_inner">
        <div class="sb_center">
            <?php 
            $loop = new WP_Query( $args );
                while ($loop->have_posts()) {
                $loop->the_post(); 
            ?>
            <div class="sb_item">
                <b><?php the_title(); ?></b>
                <span><?php the_content(); ?></span>
            </div>                     
            <?php } ?>  
            </div>
        </div>
    </div>
</div>
<?php 
$content = ob_get_clean();
return $content;
}