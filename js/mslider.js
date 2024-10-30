 /*!
  * mageSlider - jQuery Plugin
  * @author: MagePeople
  * @version: 1.0 
  * @requires jQuery v1.6 or later
  */
 (function($) {
    $.fn.mSlider = function(params) {
        var ms = {};
        if (!params) var params = {};
        ms.mode = params.mode || 'slide'; // mode 'fade','slide'
        ms.speed = params.speed || 500; // speed
        ms.loop = params.loop || false; // 
        ms.easing = params.easing || 'swing'; //
        ms.autoplay = params.autoplay || false;
        ms.delay = params.delay || 500;
        ms.slideItems = params.slideItems || 1;
        ms.container = this;
        ms.buttonLeft = params.buttonLeft || $(ms.container).find('.slider_left');
        ms.buttonRight = params.buttonRight || $(ms.container).find('.slider_right');
        ms.buttons = params.buttons || $(ms.container).find('.slider_buttons a');
        ms.text = params.text || $(ms.container).find('.slider_text');
        ms.func_after = params.func_after || 0;
        ms.func_before = params.func_before || 0;
        ms.func_init = params.func_init || 0;
        ms.list = $(ms.container).find('.mps_slider_list');
        ms.count = $(ms.list).find('.mps_slider_item').length;
        ms.listMove;
        ms.interval = 0;
        ms.numImage = 0;
        ms.cloneList = '';
        ms.numCloneRight = 0;
        ms.numCloneLeft = 0;
        ms.numClone = 0;
        ms.loopMoveRight = 0;
        ms.loopMoveLeft = 0;
        var methods = {
            init: function(ms) {
                switch (ms.mode) {
                    case 'transfusion':
                        $(ms.list).css('overflow', 'hidden');
                        $(ms.list).find('.mps_slider_item').css('position', 'absolute').css('top', '0px').css('left', '0px').addClass('sit_hide').hide();
                        var first = $(ms.list).find('.mps_slider_item').eq(0).clone().removeClass('sit_hide').addClass('sit_show').show();
                        $(ms.list).append(first);
                        if (ms.count > 1) {
                            var second = $(ms.list).find('.mps_slider_item').eq(1).clone().removeClass('sit_hide').addClass('sit_show').hide();
                            $(ms.list).find('.sit_show').eq(0).after(second);
                        }
                        $(ms.buttons).eq(0).addClass('active');
                        $(ms.text).find('div').eq(0).attr('class', 'active');
                        $(ms.buttons).click(function() {
                            clearInterval(ms.interval);
                            var i = $(ms.buttons).index($(this));
                            methods.play(i, ms);
                            return false;
                        });
                        $(ms.buttonLeft).click(function() {
                            clearInterval(ms.interval);
                            methods.play('left', ms);
                            return false;
                        });
                        $(ms.buttonRight).click(function() {
                            clearInterval(ms.interval);
                            methods.play('right', ms);
                            return false;
                        });
                        if (ms.autoplay) {
                            ms.interval = setInterval(function() {
                                methods.play('right', ms);
                            }, ms.delay);
                        }
                        if (ms.func_init) ms.func_init();
                        break;
                    case 'fade':
                        $(ms.list).css('overflow', 'hidden');
                        $(ms.list).find('.mps_slider_item').css('position', 'absolute').css('top', '0px').css('left', '0px').hide();
                        $(ms.list).find('.mps_slider_item').eq(0).show();
                        $(ms.buttons).eq(0).addClass('active');
                        $(ms.text).find('div').eq(0).attr('class', 'active');
                        $(ms.buttons).click(function() {
                            clearInterval(ms.interval);
                            var i = $(ms.buttons).index($(this));
                            methods.play(i, ms);
                            return false;
                        });
                        $(ms.buttonLeft).click(function() {
                            clearInterval(ms.interval);
                            methods.play('left', ms);
                            return false;
                        });
                        $(ms.buttonRight).click(function() {
                            clearInterval(ms.interval);
                            methods.play('right', ms);
                            return false;
                        });
                        if (ms.autoplay) {
                            ms.interval = setInterval(function() {
                                methods.play('right', ms);
                            }, ms.delay);
                        }
                        if (ms.func_init) ms.func_init();
                        break;
                    case 'slide':
                        var listMove = $("<div style='position:relative;float:left;top:0;left:0;width:1000000px;'></div>");
                        $(ms.list).find('.mps_slider_item').wrapAll(listMove);
                        ms.listMove = $(ms.list).children('div');
                        $(ms.list).css('overflow', 'hidden');
                        $(ms.buttons).eq(0).addClass('active');
                        $(ms.text).find('div').eq(0).attr('class', 'active');
                        if (ms.loop) {
                            $(ms.list).find('.mps_slider_item').each(function(i, elem) {
                                $(elem).attr('data-num', i + 1);
                            });
                            ms.numCloneRight = $(ms.list).find('.mps_slider_item').last().attr('data-num');
                            ms.numCloneLeft = $(ms.list).find('.mps_slider_item').eq(0).attr('data-num');
                            ms.cloneList = $(ms.list).clone();
                        }
                        $(ms.buttons).click(function() {
                            clearInterval(ms.interval);
                            var i = $(ms.buttons).index($(this)),
                                i_active = $(ms.buttons).index($(ms.buttons).find('[class=active]')),
                                count = $(ms.buttons).find('a').length;
                            if (i < i_active && i >= 0) {
                                var r = i_active - i;
                                while (r > 0) {
                                    r--;
                                    methods.play('left', ms);
                                }
                            }
                            if (i > i_active && i < count) {
                                var r = i - i_active;
                                while (r > 0) {
                                    r--;
                                    methods.play('right', ms);
                                }
                            }
                            $(ms.buttons).removeClass('active');
                            $(ms.buttons).eq(i).addClass('active');
                            $(ms.text).find('div').attr('class', '');
                            $(ms.text).find('div').eq(i).attr('class', 'active');
                            /* buttons Ñ loop Ð¿Ð¾ÐºÐ° Ð½Ðµ Ð´ÐµÐ»Ð°Ð» */
                            return false;
                        });
                        $(ms.buttonLeft).click(function() {
                            clearInterval(ms.interval);
                            methods.play('left', ms);
                            return false;
                        });
                        $(ms.buttonRight).click(function() {
                            clearInterval(ms.interval);
                            methods.play('right', ms);
                            return false;
                        });
                        if (ms.autoplay) {
                            ms.interval = setInterval(function() {
                                methods.play('right', ms);
                            }, ms.delay);
                        }
                        if (ms.func_init) ms.func_init();
                        break;
                }
            },
            play: function(direction, ms) {
                switch (ms.mode) {
                    case 'transfusion':
                        if (ms.count > 1) {
                            var newImage = 0;
                            if (typeof(direction) == "number") {
                                newImage = direction;
                            } else if (direction == 'left') // left
                            {
                                newImage = ms.count - 1;
                                if ((ms.numImage - 1) >= 0) newImage = ms.numImage - 1;
                            } else if (direction == 'right') // right
                            {
                                if ((ms.numImage + 1) < ms.count) newImage = ms.numImage + 1;
                            }
                            if (newImage != ms.numImage) {
                                $(ms.buttons).removeClass('active');
                                $(ms.buttons).eq(newImage).addClass('active');
                                $(ms.text).find('div').attr('class', '');
                                $(ms.text).find('div').eq(newImage).attr('class', 'active');
                                var nowImageBlock = $(ms.list).find('.sit_hide').eq(ms.numImage),
                                    newImageBlock = $(ms.list).find('.sit_hide').eq(newImage);
                                if (ms.func_before) ms.func_before();
                                var newImageShow = newImageBlock.clone().removeClass('sit_hide').addClass('sit_show').show().stop(),
                                    nowImageShow = $(ms.list).find('.sit_show').eq(0);
                                $(ms.list).find('.sit_show').eq(1).remove();
                                $(nowImageShow).before(newImageShow);
                                $(nowImageShow).animate({
                                    'opacity': 0
                                }, ms.speed, function() {
                                    $(this).hide();
                                    if (ms.func_after) ms.func_after();
                                });
                                ms.numImage = newImage;
                            }
                        }
                        break;
                    case 'fade':
                        var newImage = 0;
                        if (typeof(direction) == "number") {
                            newImage = direction;
                        } else if (direction == 'left') // left
                        {
                            newImage = ms.count - 1;
                            if ((ms.numImage - 1) >= 0) newImage = ms.numImage - 1;
                        } else if (direction == 'right') // right
                        {
                            if ((ms.numImage + 1) < ms.count) newImage = ms.numImage + 1;
                        }
                        if (newImage != ms.numImage) {
                            $(ms.buttons).removeClass('active');
                            $(ms.buttons).eq(newImage).addClass('active');
                            $(ms.text).find('div').attr('class', '');
                            $(ms.text).find('div').eq(newImage).attr('class', 'active');
                            var nowImageBlock = $(ms.list).find('.mps_slider_item').eq(ms.numImage),
                                newImageBlock = $(ms.list).find('.mps_slider_item').eq(newImage);
                            $(nowImageBlock).stop();
                            $(newImageBlock).css('opacity', 0).show().stop();
                            if (ms.func_before) ms.func_before();
                            $(nowImageBlock).animate({
                                'opacity': 0
                            }, ms.speed, function() {
                                $(this).hide();
                                if (ms.func_after) ms.func_after();
                            });
                            $(newImageBlock).animate({
                                'opacity': 1
                            }, ms.speed);
                            ms.numImage = newImage;
                        }
                        break;
                    case 'slide':
                        var slide = $(ms.list).find('.mps_slider_item').eq(1),
                            marginRight = $(slide).outerWidth(true) - $(slide).outerWidth(),
                            slideWidth = $(slide).width() + marginRight + ($(slide).innerWidth() - $(slide).width()),
                            countSlideList = Math.ceil($(ms.list).width() / slideWidth),
                            listWidth = countSlideList * $(ms.list).width() - marginRight,
                            leftListMove = 0,
                            slideNow = 0,
                            countClone = 0,
                            count = $(ms.list).find('.mps_slider_item').length;
                        if (direction == 'left') // left
                        {
                            if (ms.loopMoveRight == 0) {
                                ms.loopMoveLeft = 1;
                                if ((ms.numImage - ms.slideItems) >= 0) slideNow = ms.slideItems;
                                else {
                                    if (ms.loop) // loop add clone
                                    {
                                        countClone = ms.slideItems;
                                        var i = 0;
                                        while (i < countClone) {
                                            i++;
                                            if ((ms.numCloneLeft - 1) <= 0) ms.numCloneLeft = $(ms.cloneList).find('.mps_slider_item').length + 1;
                                            ms.numCloneLeft--;
                                            var objClone = $(ms.cloneList).find('.mps_slider_item').eq(ms.numCloneLeft - 1);
                                            ms.numClone++;
                                            $(objClone).clone().prependTo($(ms.listMove));
                                            $(ms.listMove).css('left', $(ms.listMove).position().left - slideWidth + 'px');
                                        }
                                        ms.numImage = 0;
                                        ms.slideNow = 0;
                                    } else slideNow = ms.numImage;
                                }
                                ms.numImage -= slideNow;
                                leftListMove = -(ms.numImage * slideWidth);
                                if (slideNow > 0 || ms.loop) {
                                    if (ms.func_before) ms.func_before();
                                    $(ms.listMove).stop().animate({
                                        'left': leftListMove + 'px'
                                    }, ms.speed, function() {
                                        ms.loopMoveLeft = 0;
                                        if (ms.loop && ms.numClone) // loop remove clone
                                        {
                                            var remove = [],
                                                i = 0;
                                            while (i < ms.numClone) {
                                                i++;
                                                remove.push($(ms.list).find('.mps_slider_item').eq($(ms.list).find('.mps_slider_item').length - i));
                                            }
                                            for (var i in remove) {
                                                $(remove[i]).remove();
                                            }
                                            ms.numClone = 0;
                                            ms.numCloneRight = $(ms.list).find('.mps_slider_item').last().attr('data-num');
                                            ms.numCloneLeft = $(ms.list).find('.mps_slider_item').eq(0).attr('data-num');
                                        }
                                        if (ms.func_after) ms.func_after();
                                    });
                                } else
                                // $(ms.listMove).stop().animate({'left':leftListMove+20+'px'},200)
                                // .animate({'left':leftListMove+'px'},200,function(){
                                //     ms.loopMoveLeft=0;
                                // });
                                    ms.loopMoveLeft = 0;
                                $(ms.buttons).removeClass('active');
                                $(ms.buttons).eq(ms.numImage).addClass('active');
                                $(ms.text).find('div').attr('class', '');
                                $(ms.text).find('div').eq(ms.numImage).attr('class', 'active');
                            }
                        } else if (direction == 'right') // right
                        {
                            if (ms.loopMoveLeft == 0) {
                                ms.loopMoveRight = 1;
                                if ((count - countSlideList - ms.numImage) >= ms.slideItems) slideNow = ms.slideItems;
                                else {
                                    if (ms.loop) // loop add clone
                                    {
                                        countClone = ms.slideItems - (count - countSlideList - ms.numImage);
                                        var i = 0;
                                        while (i < countClone) {
                                            i++;
                                            if ((ms.numCloneRight * 1 + 1) > ms.count) ms.numCloneRight = 0;
                                            ms.numCloneRight++;
                                            var objClone = $(ms.cloneList).find('.mps_slider_item').eq(ms.numCloneRight - 1);
                                            ms.numClone++;
                                            $(objClone).clone().appendTo($(ms.listMove));
                                        }
                                        slideNow = ms.slideItems;
                                    } else slideNow = count - countSlideList - ms.numImage;
                                }
                                ms.numImage += slideNow;
                                leftListMove = -(ms.numImage * slideWidth);
                                if (slideNow > 0) {
                                    if (ms.func_before) ms.func_before();
                                    $(ms.listMove).stop().animate({
                                        'left': leftListMove + 'px'
                                    }, ms.speed, function() {
                                        ms.loopMoveRight = 0;
                                        if (ms.loop && ms.numClone) // loop remove clone
                                        {
                                            var left = leftListMove,
                                                remove = [],
                                                i = 0;
                                            while (i < ms.numClone) {
                                                i++;
                                                left += slideWidth;
                                                remove.push($(ms.list).find('.mps_slider_item').eq(i - 1));
                                            }
                                            for (var i in remove) {
                                                $(remove[i]).remove();
                                            }
                                            $(ms.listMove).css('left', left + 'px');
                                            ms.numImage -= ms.numClone;
                                            ms.numClone = 0;
                                            ms.numCloneRight = $(ms.list).find('.mps_slider_item').last().attr('data-num');
                                            ms.numCloneLeft = $(ms.list).find('.mps_slider_item').eq(0).attr('data-num');
                                        }
                                        if (ms.func_after) ms.func_after();
                                    });
                                } else
                                // $(ms.listMove).stop().animate({'left':leftListMove-20+'px'},200)
                                // .animate({'left':leftListMove+'px'},200,function(){
                                //     ms.loopMoveRight=0;
                                // });
                                    ms.loopMoveRight = 0;
                                $(ms.buttons).removeClass('active');
                                $(ms.buttons).eq(ms.numImage).addClass('active');
                                $(ms.text).find('div').attr('class', '');
                                $(ms.text).find('div').eq(ms.numImage).attr('class', 'active');
                            }
                        }
                        break;
                }
            }
        }
        methods.init(ms);
        return this;
    }
 })(jQuery);