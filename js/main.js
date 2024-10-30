jQuery(document).ready(function(){
		getResize();
		jQuery(window).resize(function(){
			getResize();
		});
	});