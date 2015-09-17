var j$ = jQuery;

j$.noConflict();

"use strict";

j$(document).ready(function () {
    j$('body').jpreLoader();
    setInterval(vc_check, 100);
    ie_style_fix();
    set_superfish();
    set_fixednav();
    set_searchform();
    generate_fw_sections();
    generate_fwc_sections();
    fixHeight();
    fixSubMenu();
    woo_fix();
    set_alertbtn();
    set_zillalikes();
    set_thefox_fix();
    toTopBind();
    set_breadcrumbs();
    load_flex();
    load_prettyphoto();
    set_tiptip();
    set_tabs();
    set_progress_bar_chart();
    thefox_animation();
    set_mobilemenu();
    mobile_menu_position();
    set_parallax();
});

j$(window).resize(function () {
    generate_fw_sections();
    generate_fwc_sections();
    fixHeight();
    fixSubMenu();
    woo_fix();
    set_mobilemenu_btn();
    mobile_menu_position();
    set_parallax();
});

j$(window).scroll(function () {
    opacity_scroll();
});


//////////////////////////////
//*** Check Page Padding ***//
//////////////////////////////

function vc_check() {

    var fw_fd = j$('#fw_c > .vc_row:first-child');
    var fw_pt = j$('#fw_c > .vc_row:first-child').css('padding-top');
    if (!j$("#fw_c > .vc_row:first-child").hasClass('full-width-content') && fw_pt == '0px' || fw_pt == '0' || fw_pt == '') {
        fw_fd.css('padding-top', '100px');

    }

    j$('li').next('br').remove();
    j$('ul').next('br').remove();
    j$('ul').prev('br').remove();

    j$("p:empty").css('margin-bottom', '0');

    j$(".wpb_row:empty").remove();
    j$(".wpb_column:empty").remove();
    j$(".wpb_wrapper:empty").remove();


    j$('.vertical').each(function () {

        var ul_height = j$(this).find('.tabs').height();

        j$(this).find('.tab_content').css('min-height', ul_height);

    })

}

//////////////////////////////
//*** IE Style Limit Fix ***//
//////////////////////////////


function isIE() {
    return (navigator.userAgent.toLowerCase().indexOf('msie ') != -1) || (!!navigator.userAgent.match(/Trident.*rv[:]*11\./));
}

function ie_style_fix() {
    if (isIE()) {
        var styles = j$("style").text();
        j$("style").remove();
        j$("head").append("<style>" + styles + "</style>");
    }
};


/////////////////////////////////
//*** FW section height fix ***//
/////////////////////////////////


function fixHeight() {

    j$('.full-width-content').each(function () {
        if (j$(this).find('.vc_column_container').length > 1) {
            var maxHeight = 0;
            j$(this).children('.vc_column_container').css('height', 'auto');
            j$('.full-width-content .vc_column_container').css('min-height', '0');
            j$(this).children('.vc_column_container').each(function () {
                if (j$(this).outerHeight() > maxHeight) {
                    maxHeight = j$(this).outerHeight();
                    j$(this).outerHeight(maxHeight);
                } else {
                    j$(this).outerHeight(maxHeight);
                }
            });
            j$(this).children('.vc_column_container').outerHeight(maxHeight);
            j$(this).find('#map_canvas').outerHeight(maxHeight);

        }
    });
	
	j$('.rd_table_ctn').each(function () {
        if (j$(this).find('.table_line').length > 1) {
            var maxHeight = 0;
            j$(this).find('.table_line').css('height', 'auto');
            j$('.table_line').css('min-height', '0');
            j$(this).find('.table_line').each(function () {
                if (j$(this).outerHeight() > maxHeight) {
                    maxHeight = j$(this).outerHeight();
                    j$(this).outerHeight(maxHeight);
                } else {
                    j$(this).outerHeight(maxHeight);
                }
            });
            j$(this).find('.table_line').outerHeight(maxHeight);

        }
    });

}

/////////////////////////
//*** Superfish box ***//
/////////////////////////


function set_superfish() {


    j$('header nav ul').superfish({
        delay: 700,
        speed: 'fast',
        speedOut: 'fast',
        animation: {opacity: 'show'}
    });


    j$('.fixed_header_left nav ul').superfish({
        delay: 700,
        speed: 'fast',
        speedOut: 'fast',
        animation: {opacity: 'show'}
    });


    j$('.header_bottom_nav nav ul').superfish({
        delay: 700,
        speed: 'fast',
        speedOut: 'fast',
        animation: {opacity: 'show'}
    });


}

//////////////////////////////////////////////////////////
//*** To top effect / Same Page link scroll effect ***///
////////////////////////////////////////////////////////


function toTopBind() {

    var j$scrollTop = j$(window).scrollTop();
    if (j$('#to_top').length > 0 && j$(window).width() > 1020) {

        if (j$scrollTop > 350) {
            j$(window).on('scroll', hideToTop);
        }
        else {
            j$(window).on('scroll', showToTop);
        }
    }

    //scroll up event
    j$('body').on('click', '#to_top, a[href="#top"]', function () {
        j$('body,html').stop().animate({
            scrollTop: 0
        }, 800, 'easeOutQuad')
        return false;
    });

    j$('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = j$(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                j$('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
}

function showToTop() {

    var j$scrollTop = j$(window).scrollTop();
    if (j$scrollTop > 350) {

        j$('#to_top').stop(true, true).animate({
            'bottom': '30px'
        }, 350, 'easeInOutCubic');

        j$(window).off('scroll', showToTop);
        j$(window).on('scroll', hideToTop);
    }

}

function hideToTop() {

    var j$scrollTop = j$(window).scrollTop();
    if (j$scrollTop < 350) {

        j$('#to_top').stop(true, true).animate({
            'bottom': '-30px'
        }, 350, 'easeInOutCubic');

        j$(window).off('scroll', hideToTop);
        j$(window).on('scroll', showToTop);

    }
}


///////////////////////
//*** Search form ***//
///////////////////////

function set_searchform() {

    var searchvisible = 0;

    j$("#search-form").focusout(function () {
        setTimeout(function () {
            j$("#search-form").removeClass('pop_search_form');
            j$('#searchtop_img i').removeClass('fa-times');
            j$('#searchtop_img i').addClass('fa-search');
            searchvisible = 0;
        }, 100);
    })

    j$("#searchtop").click(function (e) {
        //This stops the page scrolling to the top on a # link.
        e.preventDefault();
        if (searchvisible == 0 && j$('#searchtop_img i').hasClass('fa-search')) {
            j$('#searchtop_img i').removeClass('fa-search');
            j$('#searchtop_img i').addClass('fa-times');
            j$("#search-form").addClass('pop_search_form');
            setTimeout(function () {
                j$('#ssform').focus();
            }, 500);
            searchvisible = 1; //Set search visible flag to visible.
        } else {
            //Search is currently showing. Slide it back up and hide it.
            j$('#searchtop_img i').removeClass('fa-times');
            searchvisible = 0;
            j$("#search-form").removeClass('pop_search_form');
            j$('#searchtop_img i').addClass('fa-search');
        }
    });

}

/////////////////////////////////
//*** Sub Menu height fix ***////
/////////////////////////////////


function fixSubMenu() {

    j$('nav > .sf-js-enabled > li:not(.rd_megamenu)').mouseover(function () {

        var wapoMainWindowWidth = j$(window).width();
        // checks if third level menu exist
        var subMenuExist = j$(this).find('.menu-item-has-children').length;
        if (subMenuExist > 0) {
            var subMenuWidth = j$(this).children('.sub-menu').width();
            var subMenuOffset = j$(this).children('.sub-menu').parent().offset().left + subMenuWidth;

            // if sub menu is off screen, give new position
            if ((subMenuOffset + subMenuWidth) > wapoMainWindowWidth) {
                var newSubMenuPosition = subMenuWidth;
                j$(this).addClass('left_side_menu');

            } else {
                var newSubMenuPosition = subMenuWidth;

                j$(this).removeClass('left_side_menu');
            }
        }
    });


    j$('.rd_megamenu a').on('mouseenter mouseleave', function () {

        j$('.rd_megamenu ul').each(function () {
            if (j$(this).find('.mm_widget_area').length > 1) {
                var maxHeight = 0;
                j$(this).children('.mm_widget_area').css('min-height', 'auto');
                j$('.mm_widget_area').css('min-height', '0');
                j$(this).children('.mm_widget_area').each(function () {
                    if (j$(this).height() > maxHeight) {
                        maxHeight = j$(this).height();
                    }
                    j$(this).css("min-height", maxHeight);
                })
                j$(this).children('.mm_widget_area').css("min-height", maxHeight);
            }

        });


    });

}

/////////////////////////////////////
//*** Create full width section ***//
/////////////////////////////////////

function generate_fw_sections() {
    var j$fw_width;
    var j$width = j$(window).width();
    var j$padding_left = '40px';
    var j$padding_right = '40px';
    var j$margin_left = '-35px';

    if (j$('#boxed_layout').hasClass('menu_slide')) {
        j$fw_width = parseInt(j$('.menu_slide').width());

        if (j$width < 1200) {
            var j$margin_left = '-30px';
            var j$padding_left = '30px';
            var j$padding_right = '30px';
            var j$fw_width = j$fw_width + 20;
        }

        if (j$width < 738) {
            var j$margin_left = '-10px';
            var j$padding_left = '10px';
            var j$padding_right = '10px';
            var j$fw_width = j$fw_width + 40;
        }
        j$('.full-width-section').each(function () {
            j$(this).css({
                'margin-left': j$margin_left,
                'padding-left': j$padding_left,
                'padding-right': j$padding_right,
                'margin-right': '0px',
                'width': j$fw_width - 80,
                'visibility': 'visible'
            });

        });
    } else if (j$('header').hasClass('fixed_header_left')) {
        j$fw_width = ((j$('.menu_slide').width() - parseInt(j$('.section_wrapper').width())) / 2) + 1;

        j$('.full-width-section').each(function () {
            j$(this).css({
                'margin-left': -j$fw_width,
                'padding-left': j$fw_width,
                'padding-right': j$fw_width,
                'visibility': 'visible',
                'width': '100%',
                'margin-right': '0px'
            });

        });
    }
    else {
        j$fw_width = ((j$(window).width() - parseInt(j$('.section_wrapper').width())) / 2) + 1;
        var j$width = j$(window).width();


        j$('.full-width-section').each(function () {
            j$(this).css({
                'margin-left': -j$fw_width,
                'padding-left': j$fw_width,
                'padding-right': j$fw_width,
                'visibility': 'visible',
                'width': '100%',
                'margin-right': '0px'
            });
        });
    }
}


function generate_fwc_sections() {
    var j$fw_width;
    var j$width = j$(window).width();
    var j$padding_left = '0px';
    var j$padding_right = '0px';
    var j$margin_left = '-35px';

    if (j$('#boxed_layout').hasClass('menu_slide')) {
        j$fw_width = parseInt(j$('.menu_slide').width());

        if (j$width < 1200) {
            var j$margin_left = '-30px';
            ;
        }

        if (j$width < 738) {
            var j$margin_left = '-10px';
        }

        j$('.full-width-content').each(function () {
            j$(this).css({
                'margin-left': j$margin_left,
                'padding-left': j$padding_left,
                'padding-right': j$padding_right,
                'margin-right': '0px',
                'width': j$fw_width,
                'visibility': 'visible'
            });
        });
    } else if (j$('header').hasClass('fixed_header_left')) {
        j$fw_width = ((j$('.menu_slide').width() - parseInt(j$('.section_wrapper').width())) / 2) + 1;
        j$width = j$('.menu_slide').width();

        j$('.full-width-content').each(function () {
            j$(this).css({
                'margin-left': -j$fw_width,
                'padding-left': 0,
                'padding-right': 0,
                'visibility': 'visible',
                'width': j$width,
                'margin-right': '0px'
            });

        });
    }
    else {
        j$fw_width = ((j$(window).width() - parseInt(j$('.section_wrapper').width())) / 2) + 1;
        var j$width = j$(window).width();


        j$('.full-width-content').each(function () {
            j$(this).css({
                'margin-left': -j$fw_width,
                'padding-left': 0,
                'padding-right': 0,
                'visibility': 'visible',
                'width': j$width,
                'margin-right': '0px'
            });
        });
    }

    j$('.row_top_icon').each(function () {
        j$(this).parent('.vc_row-fluid').css('overflow', 'visible');
    });
    j$('.row_bottom_arrow').each(function () {
        j$(this).parent('.vc_row-fluid').css('overflow', 'visible');
    });
}


///////////////////////
//*** Parallax ef ***//
///////////////////////


function parallaxRowsBGSet() {
    j$('.rd_parallax_section').each(function () {
        var bg = j$(this).css('background-image');
        j$(this).find('.parallax_bg').css({'background-image': bg});
    });
}


function parallaxRowsBGCals() {
    j$('.rd_parallax_section').each(function () {
        j$(this).find('.parallax_bg').css({
            'height': j$(this).outerHeight(true) * 2.5,
            'margin-top': '-' + (j$(this).outerHeight(true) * 2.5) / 2 + 'px'
        });
    });
}

// Create cross browser requestAnimationFrame method:
window.requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function (f) {
        setTimeout(f, 1000 / 60)
    }


var j$window = j$(window);
var windowHeight = j$window.height();

j$window.unbind('scroll.parallaxSections').unbind('resize.parallaxSections');
j$window.unbind('resize.parallaxSectionsUpdateHeight');
j$window.unbind('load.parallaxSectionsOffsetL');
j$window.unbind('resize.parallaxSectionsOffsetR');

j$window.on('resize.parallaxSectionsUpdateHeight', psUpdateWindowHeight);

function psUpdateWindowHeight() {
    windowHeight = j$window.height();
}

function psUpdateOffset(j$this) {
    j$this.each(function () {
        firstTop = j$this.offset().top;
    });
}

j$.fn.parallaxScroll = function (xpos, speedFactor, outerHeight) {
    var j$this = j$(this);
    var getHeight;
    var firstTop;
    var paddingTop = 0;

    //get the starting position of each element to have parallax applied to it
    j$this.each(function () {
        firstTop = j$this.offset().top;
    });


    j$window.on('resize.parallaxSectionsOffsetR', psUpdateOffset(j$this));
    j$window.on('load.parallaxSectionsOffsetL', psUpdateOffset(j$this));

    getHeight = function (jqo) {
        return jqo.outerHeight(true);
    };


    // setup defaults if arguments aren't specified
    if (arguments.length < 1 || xpos === null) xpos = "50%";
    if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
    if (arguments.length < 3 || outerHeight === null) outerHeight = true;

    // function to be called whenever the window is scrolled or resized

    var j$element, top, height, pos;

    function update() {

        pos = j$window.scrollTop();

        j$this.each(function () {

            firstTop = j$this.offset().top;
            j$element = j$(this);
            top = j$element.offset().top;
            height = getHeight(j$element);

            // Check if totally above or totally below viewport
            if (top + height < pos || top > pos + windowHeight) {
                return;
            }

            var ua = window.navigator.userAgent;
            var msie = ua.indexOf("MSIE ");

            //for IE, Safari or any setup using the styled scrollbar default to animating the BG pos
            if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) || navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
                j$this.find('.parallax_bg').css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px", 0);
            }
            //for Firefox/Chrome use a higher performing method
            else {
                j$this.find('.parallax_bg').transition({'y': Math.round((firstTop - pos) * speedFactor) + "px"}, 0);


            }

        });
    }

    window.addEventListener('scroll', function () {
        requestAnimationFrame(update);
    }, false)

    j$window.on('resize.parallaxSections', update);

    update();
};

function set_parallax() {
    j$('.rd_parallax_section .parallax_wrap').each(function () {
        var id = j$(this).attr('id');
        $("#" + id + ".parallax_wrap").parallaxScroll("50%", 0.2);
        parallaxRowsBGSet();
        parallaxRowsBGCals();
    });
}


////////////////////////////
//*** Load Flexsliders ***//
////////////////////////////

function load_flex() {

    j$('.flexslider').flexslider({

        animation: "slide",              //String: Select your animation type, "fade" or "slide"

        slideDirection: "horizontal",

        directionNav: true,

        start: function (slider) { // init the height of the first item on start

            var j$new_height = slider.slides.eq().height();

            slider.height(j$new_height);

        },

        before: function (slider) { // init the height of the next item before slide

            var j$new_height = slider.slides.eq(slider.animatingTo).height();

            if (j$new_height != slider.height()) {

                slider.animate({height: j$new_height}, 400);

            }

        }

    });

}


////////////////////////////
//*** Alert remove btn ***//
////////////////////////////

function set_alertbtn() {

    j$('.alert_del_btn').click(function () {


        j$(this).parents('div[class^="alert"]').fadeOut(500);

    });

    j$('.woocommerce-error:before').click(function () {


        j$(this).parents('.woocommerce-error').fadeOut(500);

    });

}

function woo_fix() {

    j$('.products').css('opacity', '1');

    j$('.product_list_widget').each(function () {

        var rightmargin = j$(this).width() - 184;

        j$(this).find('.star-rating').css('margin-right', rightmargin);

    });

}


/////////////////////////////
//*** Setup prettyPhoto ***//
/////////////////////////////

function load_prettyphoto() {
    j$("a[class^='prettyPhoto']").prettyPhoto();


}


//////////////////////////
//*** Opacity Scroll ***//
//////////////////////////


function opacity_scroll() {
    var st = j$(this).scrollTop();
    j$('.opacity_scroll').each(function (index) {
        $(this).css({'opacity': (1 - st / $(this).offset().top)});
    })
}

///////////////////////
//*** Load TipTip ***//
///////////////////////


function set_tiptip() {
    j$(".tagcloud a,.post-title h2 a,.star-rating,.show_review_form.button,.remove,.filter_param_desc,.comments-link,.zilla-likes,.product_list_widget li a").addClass("tiptip");
    j$(".tiptip").tipTip({maxWidth: "auto", edgeOffset: 5});
}


//////////////////////////////////
//*** Breadcrumbs child page ***//
//////////////////////////////////

function set_breadcrumbs() {
    if (j$(".child_pages_ctn").children('li').length === 0) {
        j$("#rd_child_pages").hide();

    }


    var childvisible = 0;
    var title_width = j$('.page_title_ctn h1').width() + 80;
    j$(document).on('click', function (e) {
        if (childvisible !== 0 && j$('.rd_child_pages').hasClass('child_icon_close')) {
            if (!(e.target.id == 'rd_child_pages' || $(e.target).parents('#rd_child_pages').length > 0)) {
                j$('.rd_child_pages').removeClass('child_icon_close');
                childvisible = 0;
                j$(".child_pages_ctn").removeClass('pop_child_pages');
                j$('.rd_child_pages').addClass('child_closed');
            }

        }
    });
    j$(".child_pages_ctn").css('width', title_width);
    j$(".rd_child_pages").click(function (e) {
        //This stops the page scrolling to the top on a # link.
        if (childvisible == 0 && j$('.rd_child_pages').hasClass('child_closed')) {
            j$(".child_pages_ctn").css('width', title_width);
            j$('.rd_child_pages').removeClass('child_closed');
            j$('.rd_child_pages').addClass('child_icon_close');
            j$(".child_pages_ctn").addClass('pop_child_pages');
            setTimeout(function () {
                j$('.child_pages_ctn').focus();
            }, 1500);
            childvisible = 1; //Set search visible flag to visible.
        } else {
            //Search is currently showing. Slide it back up and hide it.
            j$('.rd_child_pages').removeClass('child_icon_close');
            childvisible = 0;
            j$(".child_pages_ctn").removeClass('pop_child_pages');
            j$('.rd_child_pages').addClass('child_closed');
        }

    });

}


////////////////////////////
//*** Sidebar category ***//
////////////////////////////

function set_thefox_fix() {


    j$(".post-attachement").fitVids();
    j$(".entry").fitVids();
    j$(".video_sc").fitVids();

    j$('.rd_list_4').each(function () {
        var n = j$(this).children("div").length;
        var width = 100 / n;
        j$(this).children("div").css("width", width + "%");
        j$(this).children("div").addClass("rda_flipInY");

    });

    j$('.footer_type_3 .widget h2').each(function () {
        var me = j$(this);
        me.html(me.text().replace(/(^\w+|\s+\w+)/, '<strong>$1</strong>'));
    });


    j$(".cat-item").has("ul").addClass("cat-got-children");

    j$(".children .cat-item").has("ul").addClass("subcat-got-children");


    var children = j$(".cat-item .children");

    children.prev('a').click(function (event) {

            event.preventDefault();
            j$(this).next('.children').slideToggle();


        }
    )

    j$('.cat-got-children a').click(function (event) {
        if (j$(this).parent('li').hasClass('cat-open')) {
            j$(this).parent('li').removeClass('cat-open');
        } else {
            j$(this).parent('li').addClass('cat-open');
        }

    })

    j$('.subcat-got-children a').click(function (event) {
        if (j$(this).parent('li').hasClass('subcat-open')) {
            j$(this).parent('li').removeClass('subcat-open');
        } else {
            j$(this).parent('li').addClass('subcat-open');
        }

    })

    j$('.subcat-got-children').click(function (event) {
    })


}

////////////////////////
//*** Zilla likes ***//
//////////////////////

function set_zillalikes(){

j$('.zilla-likes').live('click',
    function() {
        var link = j$(this);
        if(link.hasClass('active')) return false;

        var id = j$(this).attr('id'),
            postfix = link.find('.zilla-likes-postfix').text();

        j$.post(zilla_likes.ajaxurl, { action:'zilla-likes', likes_id:id, postfix:postfix }, function(data){
            link.html(data).addClass('active').attr('title','You already like this');
        });

        return false;
    });

if( j$('body.ajax-zilla-likes').length ) {
    j$('.zilla-likes').each(function(){
        var id = j$(this).attr('id');
        j$(this).load(zilla_likes.ajaxurl, { action:'zilla-likes', post_id:id });
    });
}

}

////////////////
//*** Tabs ***//
////////////////


function set_tabs() {

    j$('.tabs-wrapper').each(function () {
        var t = 1;

        j$(this).find('.tabli').each(function () {
            j$(this).find('a').attr('href', '#tab' + t);
            j$(this).parents('.tabs-wrapper').find('.tabs').append(this);
            t++;
        });
        /* GET ALL BODY */
        var t = 1;
        j$(this).find('.tab_content').each(function () {
            j$(this).attr('id', 'tab' + t);
            j$(this).parents('.tabs-wrapper').find('.tabs-container').append(this);
            t++;
        });
        j$(this).find(".tab_content").hide(); //Hide all content

        j$(this).find("ul.tabs li:first").addClass("active").show(); //Activate first tab

        j$(this).find(".tab_content:first").show(); //Show first tab content

    });

    //On Click Event

    j$("ul.tabs li").click(function (e) {

        j$(this).parents('.tabs-wrapper').find("ul.tabs li").removeClass("active"); //Remove any "active" class
        j$(this).addClass("active"); //Add "active" class to selected tab
        j$(this).parents('.tabs-wrapper').find(".tab_content").hide(); //Hide all tab content
        var activeTab = j$(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
        j$(this).parents('.tabs-wrapper').find(activeTab).fadeIn(); //Fade in the active ID content
        e.preventDefault();
    });

    j$("ul.tabs li a").click(function (e) {
        e.preventDefault();
    });

}

/////////////////////////////
//*** Change nav button ***//
/////////////////////////////


function mobile_menu_position() {


    if (j$(window).width() < 1020) {
        var mobilenav = 0;
        j$("header nav ul,.header_bottom_nav nav ul").hide();
        j$("#nav_button").show();
    }


    if (j$('header').hasClass('fixed_header_left')) {
        if (j$(window).width() < 1035) {
            var top_value = 0;
            if (j$('#wpadminbar').length >= 1) {
                top_value = j$('#wpadminbar').outerHeight() + "px";
            }
            j$('.mt_menu.sticky_header.menu_slide').css({
                'position': 'fixed',
                'top': top_value,
                'left': 0,
                'width': '100%'
            });
        } else {
            j$('.mt_menu.sticky_header.menu_slide').css({
                'position': 'relative',
                'top': top_value,
                'left': 0,
                'width': '100%'
            });
        }
    }
    else {
        if (j$(window).width() < 768) {
            var top_value = 0;
            if (j$('#wpadminbar').length >= 1) {
                top_value = j$('#wpadminbar').outerHeight() + "px";
            }
            j$('.mt_menu.sticky_header.menu_slide').css({
                'position': 'fixed',
                'top': top_value,
                'left': 0,
                'width': '100%'
            });
        } else {
            j$('.mt_menu.sticky_header.menu_slide').css({
                'position': 'relative',
                'top': top_value,
                'left': 0,
                'width': '100%'
            });
        }
    }

}


function set_mobilemenu_btn() {

    if (j$(window).width() > 1020) {

        j$("#mobile-menu").removeClass('mm_open');
        j$(".menu_slide").removeClass('slided_body');
        j$("header nav ul,.header_bottom_nav nav ul").show();
        j$("header nav ul a,.header_bottom_nav nav ul a").click(function () {
            j$("header nav ul,.header_bottom_nav nav ul").show();

        })

    }

    if (j$(window).width() < 1020) {
        j$("header nav ul,.header_bottom_nav nav ul").hide();
        j$("#nav_button").show();
    }

    if (j$(window).width() < 1020 && !j$('header').hasClass('fixed_header_left')) {

        j$("header").css("position", "relative");

    }

    var m_height = j$("#sidebar").height();

    j$("#posts").css({
        minHeight: m_height
    });

}

function set_mobilemenu() {

    j$("<div id='nav_button' />").appendTo("header nav");
    j$("<div id='nav_button' />").appendTo(".header_bottom_nav nav");

    j$(document).on("mousedown touchstart", function (e) {
        var container = j$(".mm_open");

        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {

            j$("#mobile-menu").removeClass('mm_open');
            j$(".menu_slide").removeClass('slided_body');

        }
    });


    j$("#nav_button").click(function (e) {
        if (j$("#mobile-menu").hasClass('mm_open')) {

            j$("#mobile-menu").removeClass('mm_open');
            j$(".menu_slide").removeClass('slided_body');

        } else {

            j$("#mobile-menu").addClass('mm_open');
            j$(".menu_slide").addClass('slided_body');
        }


    });
    j$("#close_mm").click(function (e) {


        j$("#mobile-menu").removeClass('mm_open');
        j$(".menu_slide").removeClass('slided_body');


    });
    j$("#nav_button_alt").click(function (e) {
        if (j$("#mobile-menu").hasClass('mm_open')) {

            j$("#mobile-menu").removeClass('mm_open');
            j$(".menu_slide").removeClass('slided_body');

        } else {

            j$("#mobile-menu").addClass('mm_open');
            j$(".menu_slide").addClass('slided_body');
        }


    });


    j$('#mobile-menu .menu-item-has-children ').click(function (ev) {
            $(this).find('>ul').slideToggle();
            if ($(this).hasClass('mobile-ul-open')) {
                $(this).removeClass('mobile-ul-open');
            } else {
                $(this).addClass('mobile-ul-open');

            }
            ev.stopPropagation();

        }
    )

}


/////////////////////////////////
//***    Sticky Header    ***////
/////////////////////////////////


function set_fixednav() {
    var sticky_navigation_offset_top = j$('.sticky_header').offset().top;
    var sticky_navigation = function () {
        var scroll_top = j$(window).scrollTop();

        if (scroll_top > sticky_navigation_offset_top && j$('header').hasClass('fixed_header_left')) {
            var top_value = 0;
            if (j$('#wpadminbar').length >= 1) {
                var top_value = j$('#wpadminbar').outerHeight() + "px";
            }
            j$('.mt_menu.sticky_header.menu_slide').css({
                'position': 'fixed',
                'top': top_value,
                'left': 0,
                'width': '100%'
            });

        }
        else if (scroll_top > sticky_navigation_offset_top && j$('#fixed_body_left').length < 1) {
            var top_value = 0;
            if (j$('#wpadminbar').length >= 1) {
                var top_value = j$('#wpadminbar').outerHeight() + "px";
            }

            j$('header').addClass('opaque_header');
            j$('header').addClass('shrinked_header');
            j$('.header_bottom_nav').addClass('opaque_header');
            j$('header').addClass('shrinked_header');
            j$('header.sticky_header').css({
                'position': 'fixed',
                'top': top_value,
                'left': 0,
                'width': '100%',
                "-moz-box-shadow": "0 2px 6px rgba(0,0,0,0.05) !important",
                "-webkit-box-shadow": "0 2px 6px rgba(0,0,0,0.05) !important",
                "box-shadow": "0 2px 6px rgba(0,0,0,0.05) !important"
            });
            j$('.header_bottom_nav.sticky_header').css({
                'position': 'fixed',
                'top': top_value,
                'left': 0,
                'width': '100%'
            });
            j$('.mt_menu.sticky_header.menu_slide').css({
                'position': 'fixed',
                'top': top_value,
                'left': 0,
                'width': '100%'
            });
            if (j$(window).width() < 1020) {
                j$("header.sticky_header").css("position", "relative");
                j$(".header_bottom_nav.sticky_header").css("position", "relative");
            }
        } else {
            j$('header').removeClass('opaque_header');
            j$('header').removeClass('shrinked_header');
            j$('.header_bottom_nav').removeClass('opaque_header');
            j$('header.sticky_header').css({
                'top': 0,
                'position': 'relative',
                "-moz-box-shadow": "0 2px 6px rgba(0,0,0,0.05) !important",
                "-webkit-box-shadow": "0 2px 6px rgba(0,0,0,0.05) !important",
                "box-shadow": "0 2px 6px rgba(0,0,0,0.05) !important"
            });
            j$('.header_bottom_nav.sticky_header').css({'position': 'relative', 'top': 0});
            if (j$(window).width() > 766) {
                j$('.mt_menu.sticky_header.menu_slide').css({
                    'position': 'relative',
                    'top': top_value,
                    'left': 0,
                    'width': '100%'
                });
            }
        }


    };

    sticky_navigation();

    j$(window).scroll(function () {
        sticky_navigation();
    });


}


if (j$(window).width() < 1020 && !j$('header').hasClass('fixed_header_left')) {

    j$("header").css("position", "relative");

}


////////////////////////////////////////////
//*** Progress bar / Chart / Count To ***//
//////////////////////////////////////////

function set_progress_bar_chart() {

    j$('.rd_pb_holder').waypoint(function () {
        j$(this).find('.progress_bar_sc').each(function (index) {
            var j$this = j$(this),
                bar = j$this.find('.pb_bg'),
                bar_stripe = j$this.find('.pb_stripe'),
                val = bar.data('percentage-value');

            setTimeout(function () {
                bar.css({"width": val + '%'});
                bar_stripe.css({"width": val + '%'});
            }, index * 200);
        });
    }, {offset: '85%'});


    j$('.rd_pie_01').waypoint(function () {


        var x = 260;//set the x - center here
        var y = 200;//set the y - center here
        var r = 154;//set the radius here
        var linewidth = 22;//set the line width here
        var SET_PERCENTAGE = j$(this).children('.rd_pc_01').data('percentage-value');
        var bar_color = j$(this).children('.rd_pc_01').data('bar-color');
        var alt_color = j$(this).children('.rd_pc_01').data('bar-alt-color');

//========
        var c = j$(this).children('.rd_pc_01').get(0);
        var id = j$(this).attr('id');
        var status = j$('#' + id + '.rd_pc_status');
        var loaded = false;

        window.onload = function () {

            loaded = true;
        }


        var ROTATION = 0;

        function setcanvas() {
            var ctx = c.getContext("2d");

            ctx.translate(x, y);
            ctx.rotate((Math.PI / 180) * (-ROTATION));
            ctx.translate(-x, -y);


            ctx.clearRect(0, 0, c.width, c.height);


        }

        function getPoint(c1, c2, radius, angle) {
            return [c1 + Math.cos(angle) * radius, c2 + Math.sin(angle) * radius];
        }

        function setPercent(uplimit) {
            var ctx = c.getContext("2d");
            ctx.beginPath();
            ctx.translate(x, y);
            ROTATION = 270;
            ctx.rotate((Math.PI / 180) * ROTATION);
            ctx.translate(-x, -y);
            ctx.lineWidth = linewidth;//40
            ctx.lineCap = "round";
            var my_gradient = ctx.createLinearGradient(-0, 0, 0, 520);
            my_gradient.addColorStop(0, bar_color);
            my_gradient.addColorStop(1, alt_color);

            ctx.strokeStyle = my_gradient;
            ctx.arc(x, y, r, (Math.PI / 180) * (uplimit), 0);
            ctx.globalAlpha = 1;
            ctx.stroke();


        }

        function callcanvas(degree) {
            setcanvas();
            setPercent(360 - degree);
        }

        var degree = parseInt((SET_PERCENTAGE * 360) / 100);
        var start = 0;
        var it = window.setInterval(function () {
            callcanvas(start);
            start++;
            if (start == degree) {
                start = degree;
                window.clearInterval(it);
            }
            if (loaded) status.html(parseInt((start * 100) / 360) + '%');
        }, 1);
        j$(this).children('.rd_pc_01').removeClass('rd_pc_01');

    }, {offset: '85%'});


    j$('.rd_pie_02').waypoint(function () {


        var x = 260;//set the x - center here
        var y = 200;//set the y - center here
        var r = 194;//set the radius here
        var linewidth = 12;//set the line width here
        var SET_PERCENTAGE = j$(this).children('.rd_pc_02').data('percentage-value');
        var bar_color = j$(this).children('.rd_pc_02').data('bar-color');
        var alt_color = j$(this).children('.rd_pc_02').data('bar-alt-color');
        var track_color = j$(this).children('.rd_pc_02').data('track-color');
        var p_color = j$(this).children('.rd_pc_02').data('percentage-color');
        var bg_color = j$(this).children('.rd_pc_02').data('background-color');

        var c = j$(this).children('.rd_pc_02').get(0);
        var id = j$(this).attr('id');
        var status = j$('#' + id + '.rd_pc_status');
        var loaded = false;

        window.onload = function () {

            loaded = true;
        }


        var ROTATION = 0;

        function setcanvas() {
            var ctx = c.getContext("2d");

            ctx.translate(x, y);
            ctx.rotate((Math.PI / 180) * (-ROTATION));
            ctx.translate(-x, -y);


            ctx.clearRect(0, 0, c.width, c.height);


            ctx.beginPath();
            ctx.lineWidth = 170;
            ctx.strokeStyle = bg_color;
            ctx.arc(x, y, 98 + (linewidth / 2), 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fillStyle = p_color;
            ctx.fill();

        }

        function getPoint(c1, c2, radius, angle) {
            return [c1 + Math.cos(angle) * radius, c2 + Math.sin(angle) * radius];
        }

        function setPercent(uplimit) {
            var ctx = c.getContext("2d");
            ctx.beginPath();
            ctx.translate(x, y);
            ROTATION = 270;
            ctx.rotate((Math.PI / 180) * ROTATION);
            ctx.translate(-x, -y);
            ctx.lineWidth = linewidth;//40
            var my_gradient = ctx.createLinearGradient(-0, 0, 0, 520);
            my_gradient.addColorStop(0, bar_color);
            my_gradient.addColorStop(1, alt_color);

            ctx.strokeStyle = my_gradient;
            ctx.arc(x, y, r, (Math.PI / 180) * (uplimit), 0);
            ctx.globalAlpha = 1;
            ctx.stroke();


        }

        function callcanvas(degree) {
            setcanvas();
            setPercent(360 - degree);
        }

        var degree = parseInt((SET_PERCENTAGE * 360) / 100);
        var start = 0;
        var it = window.setInterval(function () {
            callcanvas(start);
            start++;
            if (start == degree) {
                start = degree;
                window.clearInterval(it);
            }
            if (loaded) status.html(parseInt((start * 100) / 360) + '%');
        }, 1);
        j$(this).children('.rd_pc_02').removeClass('rd_pc_02');

    }, {offset: '85%'});


    j$('.rd_pie_03').waypoint(function () {


        var x = 260;//set the x - center here
        var y = 200;//set the y - center here
        var r = 190;//set the radius here
        var linewidth = 16;//set the line width here
        var SET_PERCENTAGE = j$(this).children('.rd_pc_03').data('percentage-value');
        var bar_color = j$(this).children('.rd_pc_03').data('bar-color');
        var alt_color = j$(this).children('.rd_pc_03').data('bar-alt-color');
        var track_color = j$(this).children('.rd_pc_03').data('track-color');
        var p_color = j$(this).children('.rd_pc_03').data('percentage-color');
        var bg_color = j$(this).children('.rd_pc_03').data('background-color');

        var c = j$(this).children('.rd_pc_03').get(0);
        var id = j$(this).attr('id');
        var status = j$('#' + id + '.rd_pc_status');
        var loaded = false;

        window.onload = function () {

            loaded = true;
        }


        var ROTATION = 0;

        function setcanvas() {
            var ctx = c.getContext("2d");

            ctx.translate(x, y);
            ctx.rotate((Math.PI / 180) * (-ROTATION));
            ctx.translate(-x, -y);


            ctx.clearRect(0, 0, c.width, c.height);


            ctx.beginPath();
            ctx.lineWidth = 16;
            ctx.strokeStyle = track_color;
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.stroke();


            ctx.beginPath();
            ctx.lineWidth = 20;
            ctx.strokeStyle = p_color;
            ctx.arc(x, y, 42 + (linewidth / 2), 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fillStyle = p_color;
            ctx.fill();

            ctx.beginPath();
            ctx.lineWidth = 16;
            ctx.strokeStyle = bg_color;
            ctx.arc(x, y, 178 - (linewidth / 2), 0, 2 * Math.PI);
            ctx.stroke();
        }

        function getPoint(c1, c2, radius, angle) {
            return [c1 + Math.cos(angle) * radius, c2 + Math.sin(angle) * radius];
        }

        function setPercent(uplimit) {
            var ctx = c.getContext("2d");
            ctx.beginPath();
            ctx.translate(x, y);
            ROTATION = 270;
            ctx.rotate((Math.PI / 180) * ROTATION);
            ctx.translate(-x, -y);
            ctx.lineWidth = linewidth;//40
            var my_gradient = ctx.createLinearGradient(-0, 0, 0, 520);
            my_gradient.addColorStop(0, bar_color);
            my_gradient.addColorStop(1, alt_color);

            ctx.strokeStyle = my_gradient;
            ctx.arc(x, y, r, (Math.PI / 180) * (uplimit), 0);
            ctx.globalAlpha = 1;
            ctx.stroke();


        }

        function callcanvas(degree) {
            setcanvas();
            setPercent(360 - degree);
        }

        var degree = parseInt((SET_PERCENTAGE * 360) / 100);
        var start = 0;
        var it = window.setInterval(function () {
            callcanvas(start);
            start++;
            if (start == degree) {
                start = degree;
                window.clearInterval(it);
            }
            if (loaded) status.html(parseInt((start * 100) / 360) + '%');
        }, 1);
        j$(this).children('.rd_pc_03').removeClass('rd_pc_03');

    }, {offset: '85%'});


    j$('.rd_pie_04').waypoint(function () {


        var x = 170;//set the x - center here
        var y = 100;//set the y - center here
        var r = 84;//set the radius here
        var SET_PERCENTAGE = j$(this).children('.rd_pc_04').data('percentage-value');
        var bar_color = j$(this).children('.rd_pc_04').data('bar-color');
        var alt_color = j$(this).children('.rd_pc_04').data('bar-alt-color');
        var track_color = j$(this).children('.rd_pc_04').data('track-color');

        var c = j$(this).children('.rd_pc_04').get(0);
        var id = j$(this).attr('id');
        var status = j$('#' + id + '.rd_pc_status');
        var loaded = false;

        window.onload = function () {

            loaded = true;
        }


        var ROTATION = 0;

        function setcanvas() {
            var ctx = c.getContext("2d");

            ctx.translate(x, y);
            ctx.rotate((Math.PI / 180) * (-ROTATION));
            ctx.translate(-x, -y);

            ctx.clearRect(0, 0, c.width, c.height);
            ctx.beginPath();
            ctx.lineWidth = 4;
            ctx.strokeStyle = track_color;
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.stroke();
        }

        function getPoint(c1, c2, radius, angle) {
            return [c1 + Math.cos(angle) * radius, c2 + Math.sin(angle) * radius];
        }

        function setPercent(uplimit) {
            var ctx = c.getContext("2d");
            ctx.beginPath();
            ctx.translate(x, y);
            ROTATION = 270;
            ctx.rotate((Math.PI / 180) * ROTATION);
            ctx.translate(-x, -y);
            ctx.lineWidth = 4;

            var my_gradient = ctx.createLinearGradient(-0, 0, 0, 340);
            my_gradient.addColorStop(0, bar_color);
            my_gradient.addColorStop(1, alt_color);
            ctx.strokeStyle = my_gradient;
            ctx.arc(x, y, r, (Math.PI / 180) * (uplimit), 0);
            ctx.stroke();


            ctx.beginPath();
            var a = getPoint(x, y, r, (Math.PI / 180) * (uplimit))[0];
            var b = getPoint(x, y, r, (Math.PI / 180) * (uplimit))[1];
            nr = 7;
            ctx.arc(a, b, nr, 0, 2 * Math.PI);
            ctx.lineWidth = 4;
            ctx.fillStyle = track_color;
            ctx.fill();
            ctx.fillStyle = bar_color;
            ctx.stroke();

        }

        function callcanvas(degree) {
            setcanvas();
            setPercent(360 - degree);
        }

        var degree = parseInt((SET_PERCENTAGE * 360) / 100);
        var start = 0;
        var it = window.setInterval(function () {
            callcanvas(start);
            start++;
            if (start == degree) {
                start = degree;
                window.clearInterval(it);
            }
            if (loaded) status.html(parseInt((start * 100) / 360) + '%');
        }, 1);

        j$(this).children('.rd_pc_04').removeClass('rd_pc_04');

    }, {offset: '85%'});


    j$('.rd_pie_05').waypoint(function () {

        var x = 260;//set the x - center here
        var y = 200;//set the y - center here
        var r = 160;//set the radius here
        var linewidth = 80;//set the line width here
        var SET_PERCENTAGE = j$(this).children('.rd_pc_05').data('percentage-value');
        var bar_color = j$(this).children('.rd_pc_05').data('bar-color');
        var alt_color = j$(this).children('.rd_pc_05').data('bar-alt-color');
        var track_color = j$(this).children('.rd_pc_05').data('track-color');
        var ball_color = j$(this).children('.rd_pc_05').data('ball-color');

        var c = j$(this).children('.rd_pc_05').get(0);
        var id = j$(this).attr('id');
        var status = j$('#' + id + '.rd_pc_status');
        var loaded = false;

        var ctx = c.getContext("2d");
        window.onload = function () {

            loaded = true;
        }


        var ROTATION = 0;

        function setcanvas() {

            ctx.translate(x, y);
            ctx.rotate((Math.PI / 180) * (-ROTATION));
            ctx.translate(-x, -y);


            ctx.clearRect(0, 0, c.width, c.height);


            ctx.beginPath();
            ctx.lineWidth = 80;
            ctx.strokeStyle = track_color;
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.stroke();


            ctx.beginPath();
            ctx.lineWidth = 4;
            ctx.strokeStyle = "black";
            ctx.arc(x, y, r + (linewidth / 2), 0, 2 * Math.PI);
            ctx.globalAlpha = 0.02;
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 4;
            ctx.strokeStyle = "black";
            ctx.arc(x, y, r - (linewidth / 2), 0, 2 * Math.PI);
            ctx.stroke();
        }

        function getPoint(c1, c2, radius, angle) {
            return [c1 + Math.cos(angle) * radius, c2 + Math.sin(angle) * radius];
        }

        function setPercent(uplimit) {
            ctx.beginPath();
            ctx.translate(x, y);
            ROTATION = 270;
            ctx.rotate((Math.PI / 180) * ROTATION);
            ctx.translate(-x, -y);
            ctx.lineWidth = linewidth;//40
            var my_gradient = ctx.createLinearGradient(-0, 0, 0, 520);
            my_gradient.addColorStop(0, bar_color);
            my_gradient.addColorStop(1, alt_color);

            ctx.strokeStyle = my_gradient;
            ctx.arc(x, y, r, (Math.PI / 180) * (uplimit), 0);
            ctx.globalAlpha = 1;
            ctx.stroke();


            ctx.beginPath();
            var a = getPoint(x, y, r, (Math.PI / 180) * (uplimit))[0];
            var b = getPoint(x, y, r, (Math.PI / 180) * (uplimit))[1];
            nr = linewidth / 2;
            ctx.lineWidth = 2;
            ctx.strokeStyle = track_color;
            ctx.arc(a, b, nr, 0, 2 * Math.PI);
            ctx.fillStyle = track_color;
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            var a = getPoint(x, y, r, (Math.PI / 180) * (uplimit))[0];
            var b = getPoint(x, y, r, (Math.PI / 180) * (uplimit))[1];
            nr = linewidth / 2 - 6;
            ctx.lineWidth = 14;
            ctx.strokeStyle = track_color;
            ctx.arc(a, b, nr, 0, 2 * Math.PI);
            ctx.fillStyle = ball_color;
            ctx.fill();
            ctx.stroke();

        }

        function callcanvas(degree) {
            setcanvas();
            setPercent(360 - degree);
        }

        var degree = parseInt((SET_PERCENTAGE * 360) / 100);
        var start = 0;
        var it = window.setInterval(function () {
            callcanvas(start);
            start++;
            if (start == degree) {
                start = degree;
                window.clearInterval(it);
            }
            if (loaded) status.html(parseInt((start * 100) / 360) + '%');
        }, 1);
        j$(this).children('.rd_pc_05').removeClass('rd_pc_05');

    }, {offset: '85%'});


    j$('.count_sc').each(function () {

        var countAsset = j$(this),
            countNumber = countAsset.find('.count_number'),
            countDivider = countAsset.find('.count_line').find('span'),
            countSubject = countAsset.find('.count_title');

        countNumber.countTo({
            onComplete: function () {
                countDivider.animate({
                    'width': 50
                }, 400, 'easeOutCubic');
                countSubject.delay(100).animate({
                    'opacity': 1,
                    'bottom': '0px'
                }, 600, 'easeOutCubic');
            }
        });


    });

}


/////////////////////////////
//***  Module animation ***//
/////////////////////////////


function thefox_animation() {

    (function (j$) {

        j$.fn.visible = function (partial) {

            var j$t = j$(this),
                j$w = j$(window),
                viewTop = j$w.scrollTop(),
                viewBottom = viewTop + j$w.height(),
                _top = j$t.offset().top + 100,
                _bottom = _top + j$t.height(),
                compareTop = partial === true ? _bottom : _top,
                compareBottom = partial === true ? _top : _bottom;

            return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

        };

    })(jQuery);

    var win = j$(window);
    var allMods = j$(".rda_opacity,.rda_toleft,.rda_toright,.rda_totop,.rda_tobottom,.rd_chart_black,.rd_chart_white,.rda_fadeIn,.rda_fadeInDown,.rda_fadeInUp,.rda_fadeInLeft,.rda_fadeInRight,.rda_bounceIn,.rda_bounceInDown,.rda_bounceInUp,.rda_bounceInLeft,.rda_bounceInRight,.rda_zoomIn,.rda_flipInX,.rda_flipInY,.rda_bounce,.rda_flash,.rda_shake,.rda_pulse,.rda_swing,.rda_rubberBand,.rda_wobble,.rda_tada");
    var count = j$(".rd_count_to");


    allMods.each(function (i, el) {
        var el = j$(el);
        if (el.visible(true)) {
            el.addClass("already-visible");
        }
    });

    count.each(function (i, el) {
        var el = j$(el);
        if (el.visible(true)) {


            var countAsset = j$(this),
                countNumber = countAsset.find('.count_number'),
                countDivider = countAsset.find('.count_line').find('span'),
                countSubject = countAsset.find('.count_title');

            el.removeClass("rd_count_to");
            el.addClass("rd_count_to_over");
            countNumber.countTo({
                onComplete: function () {
                    countDivider.animate({
                        'width': 50
                    }, 400, 'easeOutCubic');
                    countSubject.delay(100).animate({
                        'opacity': 1,
                        'bottom': '0px'
                    }, 600, 'easeOutCubic');

                }
            });
        }
    });


    win.scroll(function (event) {

        j$(".rda_opacity").each(function (i, el) {

            var el = j$(el);
            if (el.visible(true)) {

                setTimeout(function () {
                    el.addClass('opacity_ani');
                }, 50 * i);
            }

        });
        j$(".rda_toleft").each(function (i, el) {
            var el = j$(el);
            if (el.visible(true)) {
                el.addClass("toleft_ani");
            }
        });
        j$(".rda_toright").each(function (i, el) {
            var el = j$(el);
            if (el.visible(true)) {
                el.addClass("toright_ani");
            }
        });
        j$(".rda_totop").each(function (i, el) {
            var el = j$(el);
            if (el.visible(true)) {

                setTimeout(function () {
                    el.addClass('totop_ani');
                }, 50 * i);
            }
        });
        j$(".rda_tobottom").each(function (i, el) {
            var el = j$(el);
            if (el.visible(true)) {
                el.addClass("tobottom_ani");
            }
        });


        j$(".rda_fadeIn").each(function (i, el) {
            var el = j$(el);
            if (el.visible(true)) {

                setTimeout(function () {
                    el.addClass('animated fadeIn');
                }, 50 * i);
            }
        });
        j$(".rda_fadeInDown").each(function (i, el) {
            var el = j$(el);
            if (el.visible(true)) {

                setTimeout(function () {
                    el.addClass('animated fadeInDown');
                }, 50 * i);
            }
        });
        j$(".rda_fadeInUp").each(function (i, el) {
            var el = j$(el);
            if (el.visible(true)) {

                setTimeout(function () {
                    el.addClass('animated fadeInUp');
                }, 50 * i);
            }
        });
        j$(".rda_fadeInLeft").each(function (i, el) {
            var el = j$(el);
            if (el.visible(true)) {

                setTimeout(function () {
                    el.addClass('animated fadeInLeft');
                }, 50 * i);
            }
        });
        j$(".rda_fadeInRight").each(function (i, el) {
            var el = j$(el);
            if (el.visible(true)) {

                setTimeout(function () {
                    el.addClass('animated fadeInRight');
                }, 50 * i);
            }
        });
        j$(".rda_bounceIn").each(function (i, el) {
            var el = j$(el);
            if (el.visible(true)) {

                setTimeout(function () {
                    el.addClass('animated bounceIn');
                }, 50 * i);
            }
        });
        j$(".rda_bounceInDown").each(function (i, el) {
            var el = j$(el);
            if (el.visible(true)) {

                setTimeout(function () {
                    el.addClass('animated bounceInDown');
                }, 50 * i);
            }
        });
        j$(".rda_bounceInUp").each(function (i, el) {
            var el = j$(el);
            if (el.visible(true)) {

                setTimeout(function () {
                    el.addClass('animated bounceInUp');
                }, 50 * i);
            }
        });
        j$(".rda_bounceInLeft").each(function (i, el) {
            var el = j$(el);
            if (el.visible(true)) {

                setTimeout(function () {
                    el.addClass('animated bounceInLeft');
                }, 50 * i);
            }
        });
        j$(".rda_bounceInRight").each(function (i, el) {
            var el = j$(el);
            if (el.visible(true)) {

                setTimeout(function () {
                    el.addClass('animated bounceInRight');
                }, 50 * i);
            }
        });
        j$(".rda_zoomIn").each(function (i, el) {
            var el = j$(el);
            if (el.visible(true)) {

                setTimeout(function () {
                    el.addClass('animated zoomIn');
                }, 50 * i);
            }
        });
        j$(".rda_flipInX").each(function (i, el) {
            var el = j$(el);
            if (el.visible(true)) {

                setTimeout(function () {
                    el.addClass('animated flipInX');
                }, 50 * i);
            }
        });
        j$(".rda_flipInY").each(function (i, el) {
            var el = j$(el);
            if (el.visible(true)) {

                setTimeout(function () {
                    el.addClass('animated flipInY');
                }, 50 * i);
            }
        });

        j$(".rda_bounce").each(function (i, el) {
            var el = j$(el);
            if (el.visible(true)) {

                setTimeout(function () {
                    el.addClass('animated bounce');
                }, 50 * i);
            }
        });
        j$(".rda_flash").each(function (i, el) {
            var el = j$(el);
            if (el.visible(true)) {

                setTimeout(function () {
                    el.addClass('animated flash');
                }, 50 * i);
            }
        });
        j$(".rda_shake").each(function (i, el) {
            var el = j$(el);
            if (el.visible(true)) {

                setTimeout(function () {
                    el.addClass('animated shake');
                }, 50 * i);
            }
        });
        j$(".rda_pulse").each(function (i, el) {
            var el = j$(el);
            if (el.visible(true)) {

                setTimeout(function () {
                    el.addClass('animated pulse');
                }, 50 * i);
            }
        });
        j$(".rda_swing").each(function (i, el) {
            var el = j$(el);
            if (el.visible(true)) {

                setTimeout(function () {
                    el.addClass('animated swing');
                }, 50 * i);
            }
        });
        j$(".rda_rubberBand").each(function (i, el) {
            var el = j$(el);
            if (el.visible(true)) {

                setTimeout(function () {
                    el.addClass('animated rubberBand');
                }, 50 * i);
            }
        });
        j$(".rda_wobble").each(function (i, el) {
            var el = j$(el);
            if (el.visible(true)) {

                setTimeout(function () {
                    el.addClass('animated wobble');
                }, 50 * i);
            }
        });
        j$(".rda_tada").each(function (i, el) {
            var el = j$(el);
            if (el.visible(true)) {

                setTimeout(function () {
                    el.addClass('animated tada');
                }, 50 * i);
            }
        });


        j$(".rd_count_to").each(function (i, el) {
            var el = j$(el);
            if (el.visible(true)) {


                var countAsset = j$(this),
                    countNumber = countAsset.find('.count_number'),
                    countDivider = countAsset.find('.count_line').find('span'),
                    countSubject = countAsset.find('.count_title');
                el.removeClass("rd_count_to");
                el.addClass("rd_count_to_over");
                countNumber.countTo({
                    onComplete: function () {
                        countDivider.animate({
                            'width': 50
                        }, 400, 'easeOutCubic');
                        countSubject.delay(100).animate({
                            'opacity': 1,
                            'bottom': '0px'
                        }, 600, 'easeOutCubic');

                    }
                });
            }
        });

    });

}


/*
 * jPreLoader - jQuery plugin
 * Create a Loading Screen to preload images and content for you website
 *
 * Name:			jPreLoader.js
 * Author:		Kenny Ooi - http://www.inwebson.com
 * Date:			July 11, 2012
 * Version:		2.1
 * Example:		http://www.inwebson.com/demo/jpreloader-v2/
 *
 */

(function($) {


    "use strict";
    var items = new Array(),
        errors = new Array(),
        onComplete = function() {},
        current = 0;

    var jpreOptions = {
        splashVPos: '35%',
        loaderVPos: '0%',
        splashID: '#jpreContent',
        showSplash: true,
        showPercentage: true,
        autoClose: true,
        closeBtnText: 'Start!',
        onetimeLoad: false,
        debugMode: false,
        splashFunction: function() {}
    }

    var jOverlay = $('#jpreOverlay');

    var jBar = $('#jpreBar');

    var jPer = $('#jprePercentage');
    //cookie
    var getCookie = function() {
        if( jpreOptions.onetimeLoad ) {
            var cookies = document.cookie.split('; ');
            for (var i = 0, parts; (parts = cookies[i] && cookies[i].split('=')); i++) {
                if ((parts.shift()) === "jpreLoader") {
                    return (parts.join('='));
                }
            }
            return false;
        } else {
            return false;
        }

    }
    var setCookie = function(expires) {
        if( jpreOptions.onetimeLoad ) {
            var exdate = new Date();
            exdate.setDate( exdate.getDate() + expires );
            var c_value = ((expires==null) ? "" : "expires=" + exdate.toUTCString());
            document.cookie="jpreLoader=loaded; " + c_value;
        }
    }

    //create jpreLoader UI
    var createContainer = function() {

        var jOverlay = $('#jpreOverlay');

        var jBar = $('#jpreBar');

        var jPer = $('#jprePercentage');


    }

    //get all images from css and <img> tag
    var getImages = function(element) {
        $(element).find('*:not(script)').each(function() {
            var url = "";

            if ($(this).css('background-image').indexOf('none') == -1 && $(this).css('background-image').indexOf('-gradient') == -1) {
                url = $(this).css('background-image');
                if(url.indexOf('url') != -1) {
                    var temp = url.match(/url\((.*?)\)/);
                    url = temp[1].replace(/\"/g, '');
                }
            } else if ($(this).get(0).nodeName.toLowerCase() == 'img' && typeof($(this).attr('src')) != 'undefined') {
                url = $(this).attr('src');
            }

            if (url.length > 0) {
                items.push(url);
            }
        });
    }

    //create preloaded image
    var preloading = function() {
        for (var i = 0; i < items.length; i++) {
            if(loadImg(items[i]));
        }
    }
    var loadImg = function(url) {
        var imgLoad = new Image();
        $(imgLoad)
            .load(function() {
                completeLoading();
            })
            .error(function() {
                errors.push($(this).attr('src'));
                completeLoading();
            })
            .attr('src', url);
    }

    //update progress bar once image loaded
    var completeLoading = function() {
        current++;

        var per = Math.round((current / items.length) * 100);
        $(jBar).stop().animate({
            width: per + '%'
        }, 500, 'linear');

        if(jpreOptions.showPercentage) {
            $(jPer).text(per+"%");
        }

        //if all images loaded
        if(current >= items.length) {
            current = items.length;
            setCookie();	//create cookie

            if(jpreOptions.showPercentage) {
                $(jPer).text("100%");
            }

            //fire debug mode
            if (jpreOptions.debugMode) {
                var error = debug();
            }


            //max progress bar
            $(jBar).stop().animate({
                width: '100%'
            }, 500, 'linear', function() {
                //autoclose on
                if( jpreOptions.autoClose )
                    loadComplete();
                else
                    $(jButton).fadeIn(1000);
            });
        }
    }

    //triggered when all images are loaded
    var loadComplete = function() {
        $(jOverlay).fadeOut(800, function() {
            $(jOverlay).remove();

            onComplete();	//callback function

        });
    }

    //debug mode
    var debug = function() {
        if(errors.length > 0) {
            var str = 'ERROR - IMAGE FILES MISSING!!!\n\r'
            str	+= errors.length + ' image files cound not be found. \n\r';
            str += 'Please check your image paths and filenames:\n\r';
            for (var i = 0; i < errors.length; i++) {
                str += '- ' + errors[i] + '\n\r';
            }
            return true;
        } else {
            return false;
        }
    }

    $.fn.jpreLoader = function(options, callback) {
        if(options) {
            $.extend(jpreOptions, options );
        }
        if(typeof callback == 'function') {
            onComplete = callback;
        }

        //show preloader once JS loaded
        $('body').css({
            'display': 'block'
        });

        return this.each(function() {
            if( !(getCookie()) ) {
                createContainer();
                getImages(this);
                preloading();
            }
            else {	//onetime load / cookie is set
                $(jpreOptions.splashID).remove();
                onComplete();
            }
        });
    };

})(jQuery);



/*
Count to
 */


(function ($) {
    "use strict";
    $.fn.countTo = function (options) {
        options = options || {};

        return $(this).each(function () {
            // set options for current element
            var settings = $.extend({}, $.fn.countTo.defaults, {
                from:            $(this).data('from'),
                to:              $(this).data('to'),
                speed:           $(this).data('speed'),
                refreshInterval: $(this).data('refresh-interval'),
                decimals:        $(this).data('decimals')
            }, options);

            // how many times to update the value, and how much to increment the value on each update
            var loops = Math.ceil(settings.speed / settings.refreshInterval),
                increment = (settings.to - settings.from) / loops;

            // references & variables that will change with each update
            var self = this,
                $self = $(this),
                loopCount = 0,
                value = settings.from,
                data = $self.data('countTo') || {};

            $self.data('countTo', data);

            // if an existing interval can be found, clear it first
            if (data.interval) {
                clearInterval(data.interval);
            }
            data.interval = setInterval(updateTimer, settings.refreshInterval);

            // initialize the element with the starting value
            render(value);

            function updateTimer() {
                value += increment;
                loopCount++;

                render(value);

                if (typeof(settings.onUpdate) == 'function') {
                    settings.onUpdate.call(self, value);
                }

                if (loopCount >= loops) {
                    // remove the interval
                    $self.removeData('countTo');
                    clearInterval(data.interval);
                    value = settings.to;

                    if (typeof(settings.onComplete) == 'function') {
                        settings.onComplete.call(self, value);
                    }
                }
            }

            function render(value) {
                var formattedValue = settings.formatter.call(self, value, settings);
                $self.text(formattedValue);
            }
        });
    };

    $.fn.countTo.defaults = {
        from: 0,               // the number the element should start at
        to: 0,                 // the number the element should end at
        speed: 1000,           // how long it should take to count between the target numbers
        refreshInterval: 100,  // how often the element should be updated
        decimals: 0,           // the number of decimal places to show
        formatter: formatter,  // handler for formatting the value before rendering
        onUpdate: null,        // callback method for every time the element is updated
        onComplete: null       // callback method for when the element finishes updating
    };

    function formatter(value, settings) {
        return value.toFixed(settings.decimals);
    }
}(jQuery));

(function ($) {



    //FlexSlider: Object Instance

    $.flexslider = function(el, options) {

        var slider = el;


        slider.init = function() {

            slider.vars = $.extend({}, $.flexslider.defaults, options);

            slider.data('flexslider', true);

            slider.container = $('.slides', slider);

            slider.slides = $('.slides > li', slider);

            slider.count = slider.slides.length;

            slider.animating = false;

            slider.currentSlide = slider.vars.slideToStart;

            slider.animatingTo = slider.currentSlide;

            slider.atEnd = (slider.currentSlide == 0) ? true : false;

            slider.eventType = ('ontouchstart' in document.documentElement) ? 'touchstart' : 'click';

            slider.cloneCount = 0;

            slider.cloneOffset = 0;

            slider.manualPause = false;

            slider.vertical = (slider.vars.slideDirection == "vertical");

            slider.prop = (slider.vertical) ? "top" : "marginLeft";

            slider.args = {};



            //Test for webbkit CSS3 Animations

            slider.transitions = "webkitTransition" in document.body.style;

            if (slider.transitions) slider.prop = "-webkit-transform";



            //Test for controlsContainer

            if (slider.vars.controlsContainer != "") {

                slider.controlsContainer = $(slider.vars.controlsContainer).eq($('.slides').index(slider.container));

                slider.containerExists = slider.controlsContainer.length > 0;

            }

            //Test for manualControls

            if (slider.vars.manualControls != "") {

                slider.manualControls = $(slider.vars.manualControls, ((slider.containerExists) ? slider.controlsContainer : slider));

                slider.manualExists = slider.manualControls.length > 0;

            }



            ///////////////////////////////////////////////////////////////////

            // FlexSlider: Randomize Slides

            if (slider.vars.randomize) {

                slider.slides.sort(function() { return (Math.round(Math.random())-0.5); });

                slider.container.empty().append(slider.slides);

            }

            ///////////////////////////////////////////////////////////////////



            ///////////////////////////////////////////////////////////////////

            // FlexSlider: Slider Animation Initialize

            if (slider.vars.animation.toLowerCase() == "slide") {

                if (slider.transitions) {

                    slider.setTransition(0);

                }

                slider.css({"overflow": "hidden"});

                if (slider.vars.animationLoop) {

                    slider.cloneCount = 2;

                    slider.cloneOffset = 1;

                    slider.container.append(slider.slides.filter(':first').clone().addClass('clone')).prepend(slider.slides.filter(':last').clone().addClass('clone'));

                }

                //create newSlides to capture possible clones

                slider.newSlides = $('.slides > li', slider);

                var sliderOffset = (-1 * (slider.currentSlide + slider.cloneOffset));

                if (slider.vertical) {

                    slider.newSlides.css({"display": "block", "width": "100%", "float": "left"});

                    slider.container.height((slider.count + slider.cloneCount) * 200 + "%").css("position", "absolute").width("100%");

                    //Timeout function to give browser enough time to get proper height initially

                    setTimeout(function() {

                        slider.css({"position": "relative"}).height(slider.slides.filter(':first').height());

                        slider.args[slider.prop] = (slider.transitions) ? "translate3d(0," + sliderOffset * slider.height() + "px,0)" : sliderOffset * slider.height() + "px";

                        slider.container.css(slider.args);

                    }, 100);


                } else {

                    slider.args[slider.prop] = (slider.transitions) ? "translate3d(" + sliderOffset * slider.width() + "px,0,0)" : sliderOffset * slider.width() + "px";

                    slider.container.width((slider.count + slider.cloneCount) * 200 + "%").css(slider.args);

                    //Timeout function to give browser enough time to get proper width initially

                    setTimeout(function() {

                        slider.newSlides.width(slider.width()).css({"float": "left", "display": "block"});

                    }, 100);

                }



            } else { //Default to fade

                //Not supporting fade CSS3 transitions right now

                slider.transitions = false;

                slider.slides.css({"width": "100%", "float": "left", "marginRight": "-100%"}).eq(slider.currentSlide).fadeIn(slider.vars.animationDuration);

            }

            ///////////////////////////////////////////////////////////////////



            ///////////////////////////////////////////////////////////////////

            // FlexSlider: Control Nav

            if (slider.vars.controlNav) {

                if (slider.manualExists) {

                    slider.controlNav = slider.manualControls;

                } else {

                    var controlNavScaffold = $('<ol class="flex-control-nav"></ol>');

                    var j = 1;

                    for (var i = 0; i < slider.count; i++) {

                        controlNavScaffold.append('<li><a>' + j + '</a></li>');

                        j++;

                    }


                    if (slider.containerExists) {

                        $(slider.controlsContainer).append(controlNavScaffold);

                        slider.controlNav = $('.flex-control-nav li a', slider.controlsContainer);

                    } else {

                        slider.append(controlNavScaffold);

                        slider.controlNav = $('.flex-control-nav li a', slider);

                    }

                }


                slider.controlNav.eq(slider.currentSlide).addClass('active');


                slider.controlNav.bind(slider.eventType, function(event) {

                    event.preventDefault();

                    if (!$(this).hasClass('active')) {

                        (slider.controlNav.index($(this)) > slider.currentSlide) ? slider.direction = "next" : slider.direction = "prev";

                        slider.flexAnimate(slider.controlNav.index($(this)), slider.vars.pauseOnAction);

                    }

                });

            }

            ///////////////////////////////////////////////////////////////////



            //////////////////////////////////////////////////////////////////

            //FlexSlider: Direction Nav

            if (slider.vars.directionNav) {

                var directionNavScaffold = $('<ul class="flex-direction-nav"><li><a class="prev" href="#"></a></li><li><a class="next" href="#"></a></li></ul>');



                if (slider.containerExists) {

                    $(slider.controlsContainer).append(directionNavScaffold);

                    slider.directionNav = $('.flex-direction-nav li a', slider.controlsContainer);

                } else {

                    slider.append(directionNavScaffold);

                    slider.directionNav = $('.flex-direction-nav li a', slider);

                }



                //Set initial disable styles if necessary

                if (!slider.vars.animationLoop) {

                    if (slider.currentSlide == 0) {

                        slider.directionNav.filter('.prev').addClass('disabled');

                    } else if (slider.currentSlide == slider.count - 1) {

                        slider.directionNav.filter('.next').addClass('disabled');

                    }

                }



                slider.directionNav.bind(slider.eventType, function(event) {

                    event.preventDefault();

                    var target = ($(this).hasClass('next')) ? slider.getTarget('next') : slider.getTarget('prev');



                    if (slider.canAdvance(target)) {

                        slider.flexAnimate(target, slider.vars.pauseOnAction);

                    }

                });

            }

            //////////////////////////////////////////////////////////////////



            //////////////////////////////////////////////////////////////////

            //FlexSlider: Keyboard Nav

            if (slider.vars.keyboardNav && $('ul.slides').length == 1) {

                function keyboardMove(event) {

                    if (slider.animating) {

                        return;

                    } else if (event.keyCode != 39 && event.keyCode != 37){

                        return;

                    } else {

                        if (event.keyCode == 39) {

                            var target = slider.getTarget('next');

                        } else if (event.keyCode == 37){

                            var target = slider.getTarget('prev');

                        }



                        if (slider.canAdvance(target)) {

                            slider.flexAnimate(target, slider.vars.pauseOnAction);

                        }


                    }

                }

                $(document).bind('keyup', keyboardMove);

            }

            //////////////////////////////////////////////////////////////////



            ///////////////////////////////////////////////////////////////////

            // FlexSlider: Mousewheel interaction

            if (slider.vars.mousewheel) {

                slider.mousewheelEvent = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";

                slider.bind(slider.mousewheelEvent, function(e) {

                    e.preventDefault();

                    e = e ? e : window.event;

                    var wheelData = e.detail ? e.detail * -1 : e.wheelDelta / 40,

                        target = (wheelData < 0) ? slider.getTarget('next') : slider.getTarget('prev');



                    if (slider.canAdvance(target)) {

                        slider.flexAnimate(target, slider.vars.pauseOnAction);

                    }

                });

            }

            ///////////////////////////////////////////////////////////////////



            //////////////////////////////////////////////////////////////////

            //FlexSlider: Slideshow Setup

            if (slider.vars.slideshow) {

                //pauseOnHover

                if (slider.vars.pauseOnHover && slider.vars.slideshow) {

                    slider.hover(function() {

                        slider.pause();

                    }, function() {

                        if (!slider.manualPause) {

                            slider.resume();

                        }

                    });

                }


                //Initialize animation

                slider.animatedSlides = setInterval(slider.animateSlides, slider.vars.slideshowSpeed);

            }

            //////////////////////////////////////////////////////////////////



            //////////////////////////////////////////////////////////////////

            //FlexSlider: Pause/Play

            if (slider.vars.pausePlay) {

                var pausePlayScaffold = $('<div class="flex-pauseplay"><span></span></div>');



                if (slider.containerExists) {

                    slider.controlsContainer.append(pausePlayScaffold);

                    slider.pausePlay = $('.flex-pauseplay span', slider.controlsContainer);

                } else {

                    slider.append(pausePlayScaffold);

                    slider.pausePlay = $('.flex-pauseplay span', slider);

                }



                var pausePlayState = (slider.vars.slideshow) ? 'pause' : 'play';

                slider.pausePlay.addClass(pausePlayState).text((pausePlayState == 'pause') ? slider.vars.pauseText : slider.vars.playText);



                slider.pausePlay.bind(slider.eventType, function(event) {

                    event.preventDefault();

                    if ($(this).hasClass('pause')) {

                        slider.pause();

                        slider.manualPause = true;

                    } else {

                        slider.resume();

                        slider.manualPause = false;

                    }

                });

            }

            //////////////////////////////////////////////////////////////////



            //////////////////////////////////////////////////////////////////

            //FlexSlider:Touch Swip Gestures

            //Some brilliant concepts adapted from the following sources

            //Source: TouchSwipe - http://www.netcu.de/jquery-touchwipe-iphone-ipad-library

            //Source: SwipeJS - http://swipejs.com

            if ('ontouchstart' in document.documentElement) {

                //For brevity, variables are named for x-axis scrolling

                //The variables are then swapped if vertical sliding is applied

                //This reduces redundant code...I think :)

                //If debugging, recognize variables are named for horizontal scrolling

                var startX,

                    startY,

                    offset,

                    cwidth,

                    dx,

                    startT,

                    scrolling = false;



                slider.each(function() {

                    if ('ontouchstart' in document.documentElement) {

                        this.addEventListener('touchstart', onTouchStart, false);

                    }

                });



                function onTouchStart(e) {

                    if (slider.animating) {

                        e.preventDefault();

                    } else if (e.touches.length == 1) {

                        slider.pause();

                        cwidth = (slider.vertical) ? slider.height() : slider.width();

                        startT = Number(new Date());

                        offset = (slider.vertical) ? (slider.currentSlide + slider.cloneOffset) * slider.height() : (slider.currentSlide + slider.cloneOffset) * slider.width();

                        startX = (slider.vertical) ? e.touches[0].pageY : e.touches[0].pageX;

                        startY = (slider.vertical) ? e.touches[0].pageX : e.touches[0].pageY;

                        slider.setTransition(0);


                        this.addEventListener('touchmove', onTouchMove, false);

                        this.addEventListener('touchend', onTouchEnd, false);

                    }

                }


                function onTouchMove(e) {

                    dx = (slider.vertical) ? startX - e.touches[0].pageY : startX - e.touches[0].pageX;

                    scrolling = (slider.vertical) ? (Math.abs(dx) < Math.abs(e.touches[0].pageX - startY)) : (Math.abs(dx) < Math.abs(e.touches[0].pageY - startY));


                    if (!scrolling) {

                        e.preventDefault();

                        if (slider.vars.animation == "slide" && slider.transitions) {

                            if (!slider.vars.animationLoop) {

                                dx = dx/((slider.currentSlide == 0 && dx < 0 || slider.currentSlide == slider.count - 1 && dx > 0) ? (Math.abs(dx)/cwidth+2) : 1);

                            }

                            slider.args[slider.prop] = (slider.vertical) ? "translate3d(0," + (-offset - dx) + "px,0)": "translate3d(" + (-offset - dx) + "px,0,0)";

                            slider.container.css(slider.args);

                        }

                    }

                }



                function onTouchEnd(e) {

                    slider.animating = false;

                    if (slider.animatingTo == slider.currentSlide && !scrolling && !(dx == null)) {

                        var target = (dx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                        if (slider.canAdvance(target) && Number(new Date()) - startT < 550 && Math.abs(dx) > 20 || Math.abs(dx) > cwidth/2) {

                            slider.flexAnimate(target, slider.vars.pauseOnAction);

                        } else {

                            slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction);

                        }

                    }



                    //Finish the touch by undoing the touch session

                    this.removeEventListener('touchmove', onTouchMove, false);

                    this.removeEventListener('touchend', onTouchEnd, false);

                    startX = null;

                    startY = null;

                    dx = null;

                    offset = null;

                }

            }

            //////////////////////////////////////////////////////////////////



            //////////////////////////////////////////////////////////////////

            //FlexSlider: Resize Functions (If necessary)

            if (slider.vars.animation.toLowerCase() == "slide") {

                $(window).resize(function(){

                    if (!slider.animating) {

                        if (slider.vertical) {

                            slider.height(slider.slides.filter(':first').height());

                            slider.args[slider.prop] = (-1 * (slider.currentSlide + slider.cloneOffset))* slider.slides.filter(':first').height() + "px";

                            if (slider.transitions) {

                                slider.setTransition(0);

                                slider.args[slider.prop] = (slider.vertical) ? "translate3d(0," + slider.args[slider.prop] + ",0)" : "translate3d(" + slider.args[slider.prop] + ",0,0)";

                            }

                            slider.container.css(slider.args);

                        } else {

                            slider.newSlides.width(slider.width());

                            slider.args[slider.prop] = (-1 * (slider.currentSlide + slider.cloneOffset))* slider.width() + "px";
                            if (slider.transitions) {

                                slider.setTransition(0);

                                slider.args[slider.prop] = (slider.vertical) ? "translate3d(0," + slider.args[slider.prop] + ",0)" : "translate3d(" + slider.args[slider.prop] + ",0,0)";

                            }

                            slider.container.css(slider.args);

                        }

                    }

                });

            }

            //////////////////////////////////////////////////////////////////



            //////////////////////////////////////////////////////////////////

            //FlexSlider: Destroy the slider entity

            //Destory is not included in the minified version right now, but this is a working function for anyone who wants to include it.

            //Simply bind the actions you need from this function into a function in the start() callback to the event of your chosing

            /*

             slider.destroy = function() {

             slider.pause();

             if (slider.controlNav && slider.vars.manualControls == "") slider.controlNav.closest('.flex-control-nav').remove();

             if (slider.directionNav) slider.directionNav.closest('.flex-direction-nav').remove();

             if (slider.vars.pausePlay) slider.pausePlay.closest('.flex-pauseplay').remove();

             if (slider.vars.keyboardNav && $('ul.slides').length == 1) $(document).unbind('keyup', keyboardMove);

             if (slider.vars.mousewheel) slider.unbind(slider.mousewheelEvent);

             if (slider.transitions) slider.each(function(){this.removeEventListener('touchstart', onTouchStart, false);});

             if (slider.vars.animation == "slide" && slider.vars.animationLoop) slider.newSlides.filter('.clone').remove();

             if (slider.vertical) slider.height("auto");

             slider.slides.hide();

             slider.removeData('flexslider');

             }

             */

            //////////////////////////////////////////////////////////////////



            //FlexSlider: start() Callback

            slider.vars.start(slider);

        }



        //FlexSlider: Animation Actions

        slider.flexAnimate = function(target, pause) {

            if (!slider.animating) {

                //Animating flag

                slider.animating = true;



                //FlexSlider: before() animation Callback

                slider.animatingTo = target;

                slider.vars.before(slider);



                //Optional paramter to pause slider when making an anmiation call

                if (pause) {

                    slider.pause();

                }



                //Update controlNav

                if (slider.vars.controlNav) {

                    slider.controlNav.removeClass('active').eq(target).addClass('active');

                }





                //Is the slider at either end

                slider.atEnd = (target == 0 || target == slider.count - 1) ? true : false;

                if (!slider.vars.animationLoop && slider.vars.directionNav) {

                    if (target == 0) {

                        slider.directionNav.removeClass('disabled').filter('.prev').addClass('disabled');

                    } else if (target == slider.count - 1) {

                        slider.directionNav.removeClass('disabled').filter('.next').addClass('disabled');

                    } else {

                        slider.directionNav.removeClass('disabled');

                    }

                }



                if (!slider.vars.animationLoop && target == slider.count - 1) {

                    slider.pause();

                    //FlexSlider: end() of cycle Callback

                    slider.vars.end(slider);

                }



                if (slider.vars.animation.toLowerCase() == "slide") {

                    var dimension = (slider.vertical) ? slider.slides.filter(':first').height() : slider.slides.filter(':first').width();



                    if (slider.currentSlide == 0 && target == slider.count - 1 && slider.vars.animationLoop && slider.direction != "next") {

                        slider.slideString = "0px";

                    } else if (slider.currentSlide == slider.count - 1 && target == 0 && slider.vars.animationLoop && slider.direction != "prev") {

                        slider.slideString = (-1 * (slider.count + 1)) * dimension + "px";

                    } else {

                        slider.slideString = (-1 * (target + slider.cloneOffset)) * dimension + "px";

                    }

                    slider.args[slider.prop] = slider.slideString;


                    if (slider.transitions) {

                        slider.setTransition(slider.vars.animationDuration);

                        slider.args[slider.prop] = (slider.vertical) ? "translate3d(0," + slider.slideString + ",0)" : "translate3d(" + slider.slideString + ",0,0)";

                        slider.container.css(slider.args).one("webkitTransitionEnd transitionend", function(){

                            slider.wrapup(dimension);

                        });

                    } else {

                        slider.container.animate(slider.args, slider.vars.animationDuration, function(){

                            slider.wrapup(dimension);

                        });

                    }

                } else { //Default to Fade

                    slider.slides.eq(slider.currentSlide).fadeOut(slider.vars.animationDuration);

                    slider.slides.eq(target).fadeIn(slider.vars.animationDuration, function() {

                        slider.wrapup();

                    });

                }

            }

        }



        //FlexSlider: Function to minify redundant animation actions

        slider.wrapup = function(dimension) {

            if (slider.vars.animation == "slide") {

                //Jump the slider if necessary

                if (slider.currentSlide == 0 && slider.animatingTo == slider.count - 1 && slider.vars.animationLoop) {

                    slider.args[slider.prop] = (-1 * slider.count) * dimension + "px";

                    if (slider.transitions) {

                        slider.setTransition(0);

                        slider.args[slider.prop] = (slider.vertical) ? "translate3d(0," + slider.args[slider.prop] + ",0)" : "translate3d(" + slider.args[slider.prop] + ",0,0)";

                    }

                    slider.container.css(slider.args);

                } else if (slider.currentSlide == slider.count - 1 && slider.animatingTo == 0 && slider.vars.animationLoop) {

                    slider.args[slider.prop] = -1 * dimension + "px";

                    if (slider.transitions) {

                        slider.setTransition(0);

                        slider.args[slider.prop] = (slider.vertical) ? "translate3d(0," + slider.args[slider.prop] + ",0)" : "translate3d(" + slider.args[slider.prop] + ",0,0)";

                    }

                    slider.container.css(slider.args);

                }

            }

            slider.animating = false;

            slider.currentSlide = slider.animatingTo;

            //FlexSlider: after() animation Callback

            slider.vars.after(slider);

        }



        //FlexSlider: Automatic Slideshow

        slider.animateSlides = function() {

            if (!slider.animating) {

                slider.flexAnimate(slider.getTarget("next"));

            }

        }



        //FlexSlider: Automatic Slideshow Pause

        slider.pause = function() {

            clearInterval(slider.animatedSlides);

            if (slider.vars.pausePlay) {

                slider.pausePlay.removeClass('pause').addClass('play').text(slider.vars.playText);

            }

        }



        //FlexSlider: Automatic Slideshow Start/Resume

        slider.resume = function() {

            slider.animatedSlides = setInterval(slider.animateSlides, slider.vars.slideshowSpeed);

            if (slider.vars.pausePlay) {

                slider.pausePlay.removeClass('play').addClass('pause').text(slider.vars.pauseText);

            }

        }



        //FlexSlider: Helper function for non-looping sliders

        slider.canAdvance = function(target) {

            if (!slider.vars.animationLoop && slider.atEnd) {

                if (slider.currentSlide == 0 && target == slider.count - 1 && slider.direction != "next") {

                    return false;

                } else if (slider.currentSlide == slider.count - 1 && target == 0 && slider.direction == "next") {

                    return false;

                } else {

                    return true;

                }

            } else {

                return true;

            }

        }



        //FlexSlider: Helper function to determine animation target

        slider.getTarget = function(dir) {

            slider.direction = dir;

            if (dir == "next") {

                return (slider.currentSlide == slider.count - 1) ? 0 : slider.currentSlide + 1;

            } else {

                return (slider.currentSlide == 0) ? slider.count - 1 : slider.currentSlide - 1;

            }

        }



        //FlexSlider: Helper function to set CSS3 transitions

        slider.setTransition = function(dur) {

            slider.container.css({'-webkit-transition-duration': (dur/1000) + "s"});

        }


        //FlexSlider: Initialize

        slider.init();

    }



    //FlexSlider: Default Settings

    $.flexslider.defaults = {

        animation: "slide",              //String: Select your animation type, "fade" or "slide"

        slideDirection: "horizontal",   //String: Select the sliding direction, "horizontal" or "vertical"

        slideshow: true,                //Boolean: Animate slider automatically

        slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds

        animationDuration: 600,         //Integer: Set the speed of animations, in milliseconds

        directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)

        controlNav: false,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage

        keyboardNav: true,              //Boolean: Allow slider navigating via keyboard left/right keys

        mousewheel: false,              //Boolean: Allow slider navigating via mousewheel

        prevText: "Previous",           //String: Set the text for the "previous" directionNav item

        nextText: "Next",               //String: Set the text for the "next" directionNav item

        pausePlay: false,               //Boolean: Create pause/play dynamic element

        pauseText: 'Pause',             //String: Set the text for the "pause" pausePlay item

        playText: 'Play',               //String: Set the text for the "play" pausePlay item

        randomize: false,               //Boolean: Randomize slide order

        slideToStart: 0,                //Integer: The slide that the slider should start on. Array notation (0 = first slide)

        animationLoop: true,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end

        pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.

        pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering

        controlsContainer: "",          //Selector: Declare which container the navigation elements should be appended too. Default container is the flexSlider element. Example use would be ".flexslider-container", "#container", etc. If the given element is not found, the default action will be taken.

        manualControls: "",             //Selector: Declare custom control navigation. Example would be ".flex-control-nav li" or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.

        start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide

        before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation

        after: function(){},            //Callback: function(slider) - Fires after each slider animation completes

        end: function(){}               //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)

    }



    //FlexSlider: Plugin Function

    $.fn.flexslider = function(options) {

        return this.each(function() {

            if ($(this).find('.slides li').length == 1) {

                $(this).find('.slides li').fadeIn(400);

            }

            else if ($(this).data('flexslider') != true) {

                new $.flexslider($(this), options);

            }

        });

    }


})(jQuery);

/*
 * Tip Tip
 */

!function(t){"use strict";t.fn.tipTip=function(e){var o={activation:"hover",keepAlive:!1,maxWidth:"200px",edgeOffset:3,defaultPosition:"bottom",delay:400,fadeIn:200,fadeOut:200,attribute:"title",content:!1,enter:function(){},exit:function(){}},i=t.extend(o,e);if(t("#tiptip_holder").length<=0){var n=t('<div id="tiptip_holder" style="max-width:'+i.maxWidth+';"></div>'),r=t('<div id="tiptip_content"></div>'),a=t('<div id="tiptip_arrow"></div>');t("body").append(n.html(r).prepend(a.html('<div id="tiptip_arrow_inner"></div>')))}else var n=t("#tiptip_holder"),r=t("#tiptip_content"),a=t("#tiptip_arrow");return this.each(function(){function e(){i.enter.call(this),r.html(d),n.hide().removeAttr("class").css("margin","0"),a.removeAttr("style");var e=parseInt(f.offset().top),o=parseInt(f.offset().left),p=parseInt(f.outerWidth()),l=parseInt(f.outerHeight()),h=n.outerWidth(),s=n.outerHeight(),c=Math.round((p-h)/2),_=Math.round((l-s)/2),v=Math.round(o+c),m=Math.round(e+l+i.edgeOffset),g="",b="",M=Math.round(h-12)/2;"bottom"==i.defaultPosition?g="_bottom":"top"==i.defaultPosition?g="_top":"left"==i.defaultPosition?g="_left":"right"==i.defaultPosition&&(g="_right");var w=c+o<parseInt(t(window).scrollLeft()),O=h+o>parseInt(t(window).width());w&&0>c||"_right"==g&&!O||"_left"==g&&o<h+i.edgeOffset+5?(g="_right",b=Math.round(s-13)/2,M=-12,v=Math.round(o+p+i.edgeOffset),m=Math.round(e+_)):(O&&0>c||"_left"==g&&!w)&&(g="_left",b=Math.round(s-13)/2,M=Math.round(h),v=Math.round(o-(h+i.edgeOffset+5)),m=Math.round(e+_));var x=e+l+i.edgeOffset+s+8>parseInt(t(window).height()+t(window).scrollTop()),I=e+l-(i.edgeOffset+s+8)<0;x||"_bottom"==g&&x||"_top"==g&&!I?("_top"==g||"_bottom"==g?g="_top":g+="_top",b=s,m=Math.round(e-(s+5+i.edgeOffset))):(I|("_top"==g&&I)||"_bottom"==g&&!x)&&("_top"==g||"_bottom"==g?g="_bottom":g+="_bottom",b=-12,m=Math.round(e+l+i.edgeOffset)),"_right_top"==g||"_left_top"==g?m+=5:("_right_bottom"==g||"_left_bottom"==g)&&(m-=5),("_left_top"==g||"_left_bottom"==g)&&(v+=5),a.css({"margin-left":M+"px","margin-top":b+"px"}),n.css({"margin-left":v+"px","margin-top":m+"px"}).attr("class","tip"+g),u&&clearTimeout(u),u=setTimeout(function(){n.stop(!0,!0).fadeIn(i.fadeIn)},i.delay)}function o(){i.exit.call(this),u&&clearTimeout(u),n.fadeOut(i.fadeOut)}var f=t(this);if(i.content)var d=i.content;else var d=f.attr(i.attribute);if(""!=d){i.content||f.removeAttr(i.attribute);var u=!1;"hover"==i.activation?(f.hover(function(){e()},function(){i.keepAlive||o()}),i.keepAlive&&n.hover(function(){},function(){o()})):"focus"==i.activation?f.focus(function(){e()}).blur(function(){o()}):"click"==i.activation&&(f.click(function(){return e(),!1}).hover(function(){},function(){i.keepAlive||o()}),i.keepAlive&&n.hover(function(){},function(){o()}))}})}}(jQuery);
/*
 *	jQuery carouFredSel 6.2.1
 *	Demo's and documentation:
 *	caroufredsel.dev7studios.com
 *
 *	Copyright (c) 2013 Fred Heusschen
 *	www.frebsite.nl
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */


/* ------------------------------------------------------------------------

 Transit

 ------------------------------------------------------------------------- */

(function(t,e){if(typeof define==="function"&&define.amd){define(["jquery"],e)}else if(typeof exports==="object"){module.exports=e(require("jquery"))}else{e(t.jQuery)}})(this,function(t){t.transit={version:"0.9.12",propertyMap:{marginLeft:"margin",marginRight:"margin",marginBottom:"margin",marginTop:"margin",paddingLeft:"padding",paddingRight:"padding",paddingBottom:"padding",paddingTop:"padding"},enabled:true,useTransitionEnd:false};var e=document.createElement("div");var n={};function i(t){if(t in e.style)return t;var n=["Moz","Webkit","O","ms"];var i=t.charAt(0).toUpperCase()+t.substr(1);for(var r=0;r<n.length;++r){var s=n[r]+i;if(s in e.style){return s}}}function r(){e.style[n.transform]="";e.style[n.transform]="rotateY(90deg)";return e.style[n.transform]!==""}var s=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;n.transition=i("transition");n.transitionDelay=i("transitionDelay");n.transform=i("transform");n.transformOrigin=i("transformOrigin");n.filter=i("Filter");n.transform3d=r();var a={transition:"transitionend",MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd"};var o=n.transitionEnd=a[n.transition]||null;for(var u in n){if(n.hasOwnProperty(u)&&typeof t.support[u]==="undefined"){t.support[u]=n[u]}}e=null;t.cssEase={_default:"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",easeInCubic:"cubic-bezier(.550,.055,.675,.190)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"};t.cssHooks["transit:transform"]={get:function(e){return t(e).data("transform")||new f},set:function(e,i){var r=i;if(!(r instanceof f)){r=new f(r)}if(n.transform==="WebkitTransform"&&!s){e.style[n.transform]=r.toString(true)}else{e.style[n.transform]=r.toString()}t(e).data("transform",r)}};t.cssHooks.transform={set:t.cssHooks["transit:transform"].set};t.cssHooks.filter={get:function(t){return t.style[n.filter]},set:function(t,e){t.style[n.filter]=e}};if(t.fn.jquery<"1.8"){t.cssHooks.transformOrigin={get:function(t){return t.style[n.transformOrigin]},set:function(t,e){t.style[n.transformOrigin]=e}};t.cssHooks.transition={get:function(t){return t.style[n.transition]},set:function(t,e){t.style[n.transition]=e}}}p("scale");p("scaleX");p("scaleY");p("translate");p("rotate");p("rotateX");p("rotateY");p("rotate3d");p("perspective");p("skewX");p("skewY");p("x",true);p("y",true);function f(t){if(typeof t==="string"){this.parse(t)}return this}f.prototype={setFromString:function(t,e){var n=typeof e==="string"?e.split(","):e.constructor===Array?e:[e];n.unshift(t);f.prototype.set.apply(this,n)},set:function(t){var e=Array.prototype.slice.apply(arguments,[1]);if(this.setter[t]){this.setter[t].apply(this,e)}else{this[t]=e.join(",")}},get:function(t){if(this.getter[t]){return this.getter[t].apply(this)}else{return this[t]||0}},setter:{rotate:function(t){this.rotate=b(t,"deg")},rotateX:function(t){this.rotateX=b(t,"deg")},rotateY:function(t){this.rotateY=b(t,"deg")},scale:function(t,e){if(e===undefined){e=t}this.scale=t+","+e},skewX:function(t){this.skewX=b(t,"deg")},skewY:function(t){this.skewY=b(t,"deg")},perspective:function(t){this.perspective=b(t,"px")},x:function(t){this.set("translate",t,null)},y:function(t){this.set("translate",null,t)},translate:function(t,e){if(this._translateX===undefined){this._translateX=0}if(this._translateY===undefined){this._translateY=0}if(t!==null&&t!==undefined){this._translateX=b(t,"px")}if(e!==null&&e!==undefined){this._translateY=b(e,"px")}this.translate=this._translateX+","+this._translateY}},getter:{x:function(){return this._translateX||0},y:function(){return this._translateY||0},scale:function(){var t=(this.scale||"1,1").split(",");if(t[0]){t[0]=parseFloat(t[0])}if(t[1]){t[1]=parseFloat(t[1])}return t[0]===t[1]?t[0]:t},rotate3d:function(){var t=(this.rotate3d||"0,0,0,0deg").split(",");for(var e=0;e<=3;++e){if(t[e]){t[e]=parseFloat(t[e])}}if(t[3]){t[3]=b(t[3],"deg")}return t}},parse:function(t){var e=this;t.replace(/([a-zA-Z0-9]+)\((.*?)\)/g,function(t,n,i){e.setFromString(n,i)})},toString:function(t){var e=[];for(var i in this){if(this.hasOwnProperty(i)){if(!n.transform3d&&(i==="rotateX"||i==="rotateY"||i==="perspective"||i==="transformOrigin")){continue}if(i[0]!=="_"){if(t&&i==="scale"){e.push(i+"3d("+this[i]+",1)")}else if(t&&i==="translate"){e.push(i+"3d("+this[i]+",0)")}else{e.push(i+"("+this[i]+")")}}}}return e.join(" ")}};function c(t,e,n){if(e===true){t.queue(n)}else if(e){t.queue(e,n)}else{t.each(function(){n.call(this)})}}function l(e){var i=[];t.each(e,function(e){e=t.camelCase(e);e=t.transit.propertyMap[e]||t.cssProps[e]||e;e=h(e);if(n[e])e=h(n[e]);if(t.inArray(e,i)===-1){i.push(e)}});return i}function d(e,n,i,r){var s=l(e);if(t.cssEase[i]){i=t.cssEase[i]}var a=""+y(n)+" "+i;if(parseInt(r,10)>0){a+=" "+y(r)}var o=[];t.each(s,function(t,e){o.push(e+" "+a)});return o.join(", ")}t.fn.transition=t.fn.transit=function(e,i,r,s){var a=this;var u=0;var f=true;var l=t.extend(true,{},e);if(typeof i==="function"){s=i;i=undefined}if(typeof i==="object"){r=i.easing;u=i.delay||0;f=typeof i.queue==="undefined"?true:i.queue;s=i.complete;i=i.duration}if(typeof r==="function"){s=r;r=undefined}if(typeof l.easing!=="undefined"){r=l.easing;delete l.easing}if(typeof l.duration!=="undefined"){i=l.duration;delete l.duration}if(typeof l.complete!=="undefined"){s=l.complete;delete l.complete}if(typeof l.queue!=="undefined"){f=l.queue;delete l.queue}if(typeof l.delay!=="undefined"){u=l.delay;delete l.delay}if(typeof i==="undefined"){i=t.fx.speeds._default}if(typeof r==="undefined"){r=t.cssEase._default}i=y(i);var p=d(l,i,r,u);var h=t.transit.enabled&&n.transition;var b=h?parseInt(i,10)+parseInt(u,10):0;if(b===0){var g=function(t){a.css(l);if(s){s.apply(a)}if(t){t()}};c(a,f,g);return a}var m={};var v=function(e){var i=false;var r=function(){if(i){a.unbind(o,r)}if(b>0){a.each(function(){this.style[n.transition]=m[this]||null})}if(typeof s==="function"){s.apply(a)}if(typeof e==="function"){e()}};if(b>0&&o&&t.transit.useTransitionEnd){i=true;a.bind(o,r)}else{window.setTimeout(r,b)}a.each(function(){if(b>0){this.style[n.transition]=p}t(this).css(l)})};var z=function(t){this.offsetWidth;v(t)};c(a,f,z);return this};function p(e,i){if(!i){t.cssNumber[e]=true}t.transit.propertyMap[e]=n.transform;t.cssHooks[e]={get:function(n){var i=t(n).css("transit:transform");return i.get(e)},set:function(n,i){var r=t(n).css("transit:transform");r.setFromString(e,i);t(n).css({"transit:transform":r})}}}function h(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}function b(t,e){if(typeof t==="string"&&!t.match(/^[\-0-9\.]+$/)){return t}else{return""+t+e}}function y(e){var n=e;if(typeof n==="string"&&!n.match(/^[\-0-9\.]+/)){n=t.fx.speeds[n]||t.fx.speeds._default}return b(n,"ms")}t.transit.getTransitionValue=d;return t});

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright ? 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing.jswing=jQuery.easing.swing,jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(n,e,t,u,a){return jQuery.easing[jQuery.easing.def](n,e,t,u,a)},easeInQuad:function(n,e,t,u,a){return u*(e/=a)*e+t},easeOutQuad:function(n,e,t,u,a){return-u*(e/=a)*(e-2)+t},easeInOutQuad:function(n,e,t,u,a){return(e/=a/2)<1?u/2*e*e+t:-u/2*(--e*(e-2)-1)+t},easeInCubic:function(n,e,t,u,a){return u*(e/=a)*e*e+t},easeOutCubic:function(n,e,t,u,a){return u*((e=e/a-1)*e*e+1)+t},easeInOutCubic:function(n,e,t,u,a){return(e/=a/2)<1?u/2*e*e*e+t:u/2*((e-=2)*e*e+2)+t},easeInQuart:function(n,e,t,u,a){return u*(e/=a)*e*e*e+t},easeOutQuart:function(n,e,t,u,a){return-u*((e=e/a-1)*e*e*e-1)+t},easeInOutQuart:function(n,e,t,u,a){return(e/=a/2)<1?u/2*e*e*e*e+t:-u/2*((e-=2)*e*e*e-2)+t},easeInQuint:function(n,e,t,u,a){return u*(e/=a)*e*e*e*e+t},easeOutQuint:function(n,e,t,u,a){return u*((e=e/a-1)*e*e*e*e+1)+t},easeInOutQuint:function(n,e,t,u,a){return(e/=a/2)<1?u/2*e*e*e*e*e+t:u/2*((e-=2)*e*e*e*e+2)+t},easeInSine:function(n,e,t,u,a){return-u*Math.cos(e/a*(Math.PI/2))+u+t},easeOutSine:function(n,e,t,u,a){return u*Math.sin(e/a*(Math.PI/2))+t},easeInOutSine:function(n,e,t,u,a){return-u/2*(Math.cos(Math.PI*e/a)-1)+t},easeInExpo:function(n,e,t,u,a){return 0==e?t:u*Math.pow(2,10*(e/a-1))+t},easeOutExpo:function(n,e,t,u,a){return e==a?t+u:u*(-Math.pow(2,-10*e/a)+1)+t},easeInOutExpo:function(n,e,t,u,a){return 0==e?t:e==a?t+u:(e/=a/2)<1?u/2*Math.pow(2,10*(e-1))+t:u/2*(-Math.pow(2,-10*--e)+2)+t},easeInCirc:function(n,e,t,u,a){return-u*(Math.sqrt(1-(e/=a)*e)-1)+t},easeOutCirc:function(n,e,t,u,a){return u*Math.sqrt(1-(e=e/a-1)*e)+t},easeInOutCirc:function(n,e,t,u,a){return(e/=a/2)<1?-u/2*(Math.sqrt(1-e*e)-1)+t:u/2*(Math.sqrt(1-(e-=2)*e)+1)+t},easeInElastic:function(n,e,t,u,a){var r=1.70158,i=0,s=u;if(0==e)return t;if(1==(e/=a))return t+u;if(i||(i=.3*a),s<Math.abs(u)){s=u;var r=i/4}else var r=i/(2*Math.PI)*Math.asin(u/s);return-(s*Math.pow(2,10*(e-=1))*Math.sin(2*(e*a-r)*Math.PI/i))+t},easeOutElastic:function(n,e,t,u,a){var r=1.70158,i=0,s=u;if(0==e)return t;if(1==(e/=a))return t+u;if(i||(i=.3*a),s<Math.abs(u)){s=u;var r=i/4}else var r=i/(2*Math.PI)*Math.asin(u/s);return s*Math.pow(2,-10*e)*Math.sin(2*(e*a-r)*Math.PI/i)+u+t},easeInOutElastic:function(n,e,t,u,a){var r=1.70158,i=0,s=u;if(0==e)return t;if(2==(e/=a/2))return t+u;if(i||(i=.3*a*1.5),s<Math.abs(u)){s=u;var r=i/4}else var r=i/(2*Math.PI)*Math.asin(u/s);return 1>e?-.5*s*Math.pow(2,10*(e-=1))*Math.sin(2*(e*a-r)*Math.PI/i)+t:s*Math.pow(2,-10*(e-=1))*Math.sin(2*(e*a-r)*Math.PI/i)*.5+u+t},easeInBack:function(n,e,t,u,a,r){return void 0==r&&(r=1.70158),u*(e/=a)*e*((r+1)*e-r)+t},easeOutBack:function(n,e,t,u,a,r){return void 0==r&&(r=1.70158),u*((e=e/a-1)*e*((r+1)*e+r)+1)+t},easeInOutBack:function(n,e,t,u,a,r){return void 0==r&&(r=1.70158),(e/=a/2)<1?u/2*e*e*(((r*=1.525)+1)*e-r)+t:u/2*((e-=2)*e*(((r*=1.525)+1)*e+r)+2)+t},easeInBounce:function(n,e,t,u,a){return u-jQuery.easing.easeOutBounce(n,a-e,0,u,a)+t},easeOutBounce:function(n,e,t,u,a){return(e/=a)<1/2.75?7.5625*u*e*e+t:2/2.75>e?u*(7.5625*(e-=1.5/2.75)*e+.75)+t:2.5/2.75>e?u*(7.5625*(e-=2.25/2.75)*e+.9375)+t:u*(7.5625*(e-=2.625/2.75)*e+.984375)+t},easeInOutBounce:function(n,e,t,u,a){return a/2>e?.5*jQuery.easing.easeInBounce(n,2*e,0,u,a)+t:.5*jQuery.easing.easeOutBounce(n,2*e-a,0,u,a)+.5*u+t}});


/*
 *
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright ? 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */





(function($){function sc_setScroll(a,b,c){return"transition"==c.transition&&"swing"==b&&(b="ease"),{anims:[],duration:a,orgDuration:a,easing:b,startTime:getTime()}}function sc_startScroll(a,b){for(var c=0,d=a.anims.length;d>c;c++){var e=a.anims[c];e&&e[0][b.transition](e[1],a.duration,a.easing,e[2])}}function sc_stopScroll(a,b){is_boolean(b)||(b=!0),is_object(a.pre)&&sc_stopScroll(a.pre,b);for(var c=0,d=a.anims.length;d>c;c++){var e=a.anims[c];e[0].stop(!0),b&&(e[0].css(e[1]),is_function(e[2])&&e[2]())}is_object(a.post)&&sc_stopScroll(a.post,b)}function sc_afterScroll(a,b,c){switch(b&&b.remove(),c.fx){case"fade":case"crossfade":case"cover-fade":case"uncover-fade":a.css("opacity",1),a.css("filter","")}}function sc_fireCallbacks(a,b,c,d,e){if(b[c]&&b[c].call(a,d),e[c].length)for(var f=0,g=e[c].length;g>f;f++)e[c][f].call(a,d);return[]}function sc_fireQueue(a,b,c){return b.length&&(a.trigger(cf_e(b[0][0],c),b[0][1]),b.shift()),b}function sc_hideHiddenItems(a){a.each(function(){var a=$(this);a.data("_cfs_isHidden",a.is(":hidden")).hide()})}function sc_showHiddenItems(a){a&&a.each(function(){var a=$(this);a.data("_cfs_isHidden")||a.show()})}function sc_clearTimers(a){return a.auto&&clearTimeout(a.auto),a.progress&&clearInterval(a.progress),a}function sc_mapCallbackArguments(a,b,c,d,e,f,g){return{width:g.width,height:g.height,items:{old:a,skipped:b,visible:c},scroll:{items:d,direction:e,duration:f}}}function sc_getDuration(a,b,c,d){var e=a.duration;return"none"==a.fx?0:("auto"==e?e=b.scroll.duration/b.scroll.items*c:10>e&&(e=d/e),1>e?0:("fade"==a.fx&&(e/=2),Math.round(e)))}function nv_showNavi(a,b,c){var d=is_number(a.items.minimum)?a.items.minimum:a.items.visible+1;if("show"==b||"hide"==b)var e=b;else if(d>b){debug(c,"Not enough items ("+b+" total, "+d+" needed): Hiding navigation.");var e="hide"}else var e="show";var f="show"==e?"removeClass":"addClass",g=cf_c("hidden",c);a.auto.button&&a.auto.button[e]()[f](g),a.prev.button&&a.prev.button[e]()[f](g),a.next.button&&a.next.button[e]()[f](g),a.pagination.container&&a.pagination.container[e]()[f](g)}function nv_enableNavi(a,b,c){if(!a.circular&&!a.infinite){var d="removeClass"==b||"addClass"==b?b:!1,e=cf_c("disabled",c);if(a.auto.button&&d&&a.auto.button[d](e),a.prev.button){var f=d||0==b?"addClass":"removeClass";a.prev.button[f](e)}if(a.next.button){var f=d||b==a.items.visible?"addClass":"removeClass";a.next.button[f](e)}}}function go_getObject(a,b){return is_function(b)?b=b.call(a):is_undefined(b)&&(b={}),b}function go_getItemsObject(a,b){return b=go_getObject(a,b),is_number(b)?b={visible:b}:"variable"==b?b={visible:b,width:b,height:b}:is_object(b)||(b={}),b}function go_getScrollObject(a,b){return b=go_getObject(a,b),is_number(b)?b=50>=b?{items:b}:{duration:b}:is_string(b)?b={easing:b}:is_object(b)||(b={}),b}function go_getNaviObject(a,b){if(b=go_getObject(a,b),is_string(b)){var c=cf_getKeyCode(b);b=-1==c?$(b):c}return b}function go_getAutoObject(a,b){return b=go_getNaviObject(a,b),is_jquery(b)?b={button:b}:is_boolean(b)?b={play:b}:is_number(b)&&(b={timeoutDuration:b}),b.progress&&(is_string(b.progress)||is_jquery(b.progress))&&(b.progress={bar:b.progress}),b}function go_complementAutoObject(a,b){return is_function(b.button)&&(b.button=b.button.call(a)),is_string(b.button)&&(b.button=$(b.button)),is_boolean(b.play)||(b.play=!0),is_number(b.delay)||(b.delay=0),is_undefined(b.pauseOnEvent)&&(b.pauseOnEvent=!0),is_boolean(b.pauseOnResize)||(b.pauseOnResize=!0),is_number(b.timeoutDuration)||(b.timeoutDuration=10>b.duration?2500:5*b.duration),b.progress&&(is_function(b.progress.bar)&&(b.progress.bar=b.progress.bar.call(a)),is_string(b.progress.bar)&&(b.progress.bar=$(b.progress.bar)),b.progress.bar?(is_function(b.progress.updater)||(b.progress.updater=$.fn.carouFredSel.progressbarUpdater),is_number(b.progress.interval)||(b.progress.interval=50)):b.progress=!1),b}function go_getPrevNextObject(a,b){return b=go_getNaviObject(a,b),is_jquery(b)?b={button:b}:is_number(b)&&(b={key:b}),b}function go_complementPrevNextObject(a,b){return is_function(b.button)&&(b.button=b.button.call(a)),is_string(b.button)&&(b.button=$(b.button)),is_string(b.key)&&(b.key=cf_getKeyCode(b.key)),b}function go_getPaginationObject(a,b){return b=go_getNaviObject(a,b),is_jquery(b)?b={container:b}:is_boolean(b)&&(b={keys:b}),b}function go_complementPaginationObject(a,b){return is_function(b.container)&&(b.container=b.container.call(a)),is_string(b.container)&&(b.container=$(b.container)),is_number(b.items)||(b.items=!1),is_boolean(b.keys)||(b.keys=!1),is_function(b.anchorBuilder)||is_false(b.anchorBuilder)||(b.anchorBuilder=$.fn.carouFredSel.pageAnchorBuilder),is_number(b.deviation)||(b.deviation=0),b}function go_getSwipeObject(a,b){return is_function(b)&&(b=b.call(a)),is_undefined(b)&&(b={onTouch:!1}),is_true(b)?b={onTouch:b}:is_number(b)&&(b={items:b}),b}function go_complementSwipeObject(a,b){return is_boolean(b.onTouch)||(b.onTouch=!0),is_boolean(b.onMouse)||(b.onMouse=!1),is_object(b.options)||(b.options={}),is_boolean(b.options.triggerOnTouchEnd)||(b.options.triggerOnTouchEnd=!1),b}function go_getMousewheelObject(a,b){return is_function(b)&&(b=b.call(a)),is_true(b)?b={}:is_number(b)?b={items:b}:is_undefined(b)&&(b=!1),b}function go_complementMousewheelObject(a,b){return b}function gn_getItemIndex(a,b,c,d,e){if(is_string(a)&&(a=$(a,e)),is_object(a)&&(a=$(a,e)),is_jquery(a)?(a=e.children().index(a),is_boolean(c)||(c=!1)):is_boolean(c)||(c=!0),is_number(a)||(a=0),is_number(b)||(b=0),c&&(a+=d.first),a+=b,d.total>0){for(;a>=d.total;)a-=d.total;for(;0>a;)a+=d.total}return a}function gn_getVisibleItemsPrev(a,b,c){for(var d=0,e=0,f=c;f>=0;f--){var g=a.eq(f);if(d+=g.is(":visible")?g[b.d.outerWidth](!0):0,d>b.maxDimension)return e;0==f&&(f=a.length),e++}}function gn_getVisibleItemsPrevFilter(a,b,c){return gn_getItemsPrevFilter(a,b.items.filter,b.items.visibleConf.org,c)}function gn_getScrollItemsPrevFilter(a,b,c,d){return gn_getItemsPrevFilter(a,b.items.filter,d,c)}function gn_getItemsPrevFilter(a,b,c,d){for(var e=0,f=0,g=d,h=a.length;g>=0;g--){if(f++,f==h)return f;var i=a.eq(g);if(i.is(b)&&(e++,e==c))return f;0==g&&(g=h)}}function gn_getVisibleOrg(a,b){return b.items.visibleConf.org||a.children().slice(0,b.items.visible).filter(b.items.filter).length}function gn_getVisibleItemsNext(a,b,c){for(var d=0,e=0,f=c,g=a.length-1;g>=f;f++){var h=a.eq(f);if(d+=h.is(":visible")?h[b.d.outerWidth](!0):0,d>b.maxDimension)return e;if(e++,e==g+1)return e;f==g&&(f=-1)}}function gn_getVisibleItemsNextTestCircular(a,b,c,d){var e=gn_getVisibleItemsNext(a,b,c);return b.circular||c+e>d&&(e=d-c),e}function gn_getVisibleItemsNextFilter(a,b,c){return gn_getItemsNextFilter(a,b.items.filter,b.items.visibleConf.org,c,b.circular)}function gn_getScrollItemsNextFilter(a,b,c,d){return gn_getItemsNextFilter(a,b.items.filter,d+1,c,b.circular)-1}function gn_getItemsNextFilter(a,b,c,d){for(var f=0,g=0,h=d,i=a.length-1;i>=h;h++){if(g++,g>=i)return g;var j=a.eq(h);if(j.is(b)&&(f++,f==c))return g;h==i&&(h=-1)}}function gi_getCurrentItems(a,b){return a.slice(0,b.items.visible)}function gi_getOldItemsPrev(a,b,c){return a.slice(c,b.items.visibleConf.old+c)}function gi_getNewItemsPrev(a,b){return a.slice(0,b.items.visible)}function gi_getOldItemsNext(a,b){return a.slice(0,b.items.visibleConf.old)}function gi_getNewItemsNext(a,b,c){return a.slice(c,b.items.visible+c)}function sz_storeMargin(a,b,c){b.usePadding&&(is_string(c)||(c="_cfs_origCssMargin"),a.each(function(){var a=$(this),d=parseInt(a.css(b.d.marginRight),10);is_number(d)||(d=0),a.data(c,d)}))}function sz_resetMargin(a,b,c){if(b.usePadding){var d=is_boolean(c)?c:!1;is_number(c)||(c=0),sz_storeMargin(a,b,"_cfs_tempCssMargin"),a.each(function(){var a=$(this);a.css(b.d.marginRight,d?a.data("_cfs_tempCssMargin"):c+a.data("_cfs_origCssMargin"))})}}function sz_storeOrigCss(a){a.each(function(){var a=$(this);a.data("_cfs_origCss",a.attr("style")||"")})}function sz_restoreOrigCss(a){a.each(function(){var a=$(this);a.attr("style",a.data("_cfs_origCss")||"")})}function sz_setResponsiveSizes(a,b){var d=(a.items.visible,a.items[a.d.width]),e=a[a.d.height],f=is_percentage(e);b.each(function(){var b=$(this),c=d-ms_getPaddingBorderMargin(b,a,"Width");b[a.d.width](c),f&&b[a.d.height](ms_getPercentage(c,e))})}function sz_setSizes(a,b){var c=a.parent(),d=a.children(),e=gi_getCurrentItems(d,b),f=cf_mapWrapperSizes(ms_getSizes(e,b,!0),b,!1);if(c.css(f),b.usePadding){var g=b.padding,h=g[b.d[1]];b.align&&0>h&&(h=0);var i=e.last();i.css(b.d.marginRight,i.data("_cfs_origCssMargin")+h),a.css(b.d.top,g[b.d[0]]),a.css(b.d.left,g[b.d[3]])}return a.css(b.d.width,f[b.d.width]+2*ms_getTotalSize(d,b,"width")),a.css(b.d.height,ms_getLargestSize(d,b,"height")),f}function ms_getSizes(a,b,c){return[ms_getTotalSize(a,b,"width",c),ms_getLargestSize(a,b,"height",c)]}function ms_getLargestSize(a,b,c,d){return is_boolean(d)||(d=!1),is_number(b[b.d[c]])&&d?b[b.d[c]]:is_number(b.items[b.d[c]])?b.items[b.d[c]]:(c=c.toLowerCase().indexOf("width")>-1?"outerWidth":"outerHeight",ms_getTrueLargestSize(a,b,c))}function ms_getTrueLargestSize(a,b,c){for(var d=0,e=0,f=a.length;f>e;e++){var g=a.eq(e),h=g.is(":visible")?g[b.d[c]](!0):0;h>d&&(d=h)}return d}function ms_getTotalSize(a,b,c,d){if(is_boolean(d)||(d=!1),is_number(b[b.d[c]])&&d)return b[b.d[c]];if(is_number(b.items[b.d[c]]))return b.items[b.d[c]]*a.length;for(var e=c.toLowerCase().indexOf("width")>-1?"outerWidth":"outerHeight",f=0,g=0,h=a.length;h>g;g++){var i=a.eq(g);f+=i.is(":visible")?i[b.d[e]](!0):0}return f}function ms_getParentSize(a,b,c){var d=a.is(":visible");d&&a.hide();var e=a.parent()[b.d[c]]();return d&&a.show(),e}function ms_getMaxDimension(a,b){return is_number(a[a.d.width])?a[a.d.width]:b}function ms_hasVariableSizes(a,b,c){for(var d=!1,e=!1,f=0,g=a.length;g>f;f++){var h=a.eq(f),i=h.is(":visible")?h[b.d[c]](!0):0;d===!1?d=i:d!=i&&(e=!0),0==d&&(e=!0)}return e}function ms_getPaddingBorderMargin(a,b,c){return a[b.d["outer"+c]](!0)-a[b.d[c.toLowerCase()]]()}function ms_getPercentage(a,b){if(is_percentage(b)){if(b=parseInt(b.slice(0,-1),10),!is_number(b))return a;a*=b/100}return a}function cf_e(a,b,c,d,e){return is_boolean(c)||(c=!0),is_boolean(d)||(d=!0),is_boolean(e)||(e=!1),c&&(a=b.events.prefix+a),d&&(a=a+"."+b.events.namespace),d&&e&&(a+=b.serialNumber),a}function cf_c(a,b){return is_string(b.classnames[a])?b.classnames[a]:a}function cf_mapWrapperSizes(a,b,c){is_boolean(c)||(c=!0);var d=b.usePadding&&c?b.padding:[0,0,0,0],e={};return e[b.d.width]=a[0]+d[1]+d[3],e[b.d.height]=a[1]+d[0]+d[2],e}function cf_sortParams(a,b){for(var c=[],d=0,e=a.length;e>d;d++)for(var f=0,g=b.length;g>f;f++)if(b[f].indexOf(typeof a[d])>-1&&is_undefined(c[f])){c[f]=a[d];break}return c}function cf_getPadding(a){if(is_undefined(a))return[0,0,0,0];if(is_number(a))return[a,a,a,a];if(is_string(a)&&(a=a.split("px").join("").split("em").join("").split(" ")),!is_array(a))return[0,0,0,0];for(var b=0;4>b;b++)a[b]=parseInt(a[b],10);switch(a.length){case 0:return[0,0,0,0];case 1:return[a[0],a[0],a[0],a[0]];case 2:return[a[0],a[1],a[0],a[1]];case 3:return[a[0],a[1],a[2],a[1]];default:return[a[0],a[1],a[2],a[3]]}}function cf_getAlignPadding(a,b){var c=is_number(b[b.d.width])?Math.ceil(b[b.d.width]-ms_getTotalSize(a,b,"width")):0;switch(b.align){case"left":return[0,c];case"right":return[c,0];case"center":default:return[Math.ceil(c/2),Math.floor(c/2)]}}function cf_getDimensions(a){for(var b=[["width","innerWidth","outerWidth","height","innerHeight","outerHeight","left","top","marginRight",0,1,2,3],["height","innerHeight","outerHeight","width","innerWidth","outerWidth","top","left","marginBottom",3,2,1,0]],c=b[0].length,d="right"==a.direction||"left"==a.direction?0:1,e={},f=0;c>f;f++)e[b[0][f]]=b[d][f];return e}function cf_getAdjust(a,b,c,d){var e=a;if(is_function(c))e=c.call(d,e);else if(is_string(c)){var f=c.split("+"),g=c.split("-");if(g.length>f.length)var h=!0,i=g[0],j=g[1];else var h=!1,i=f[0],j=f[1];switch(i){case"even":e=1==a%2?a-1:a;break;case"odd":e=0==a%2?a-1:a;break;default:e=a}j=parseInt(j,10),is_number(j)&&(h&&(j=-j),e+=j)}return(!is_number(e)||1>e)&&(e=1),e}function cf_getItemsAdjust(a,b,c,d){return cf_getItemAdjustMinMax(cf_getAdjust(a,b,c,d),b.items.visibleConf)}function cf_getItemAdjustMinMax(a,b){return is_number(b.min)&&b.min>a&&(a=b.min),is_number(b.max)&&a>b.max&&(a=b.max),1>a&&(a=1),a}function cf_getSynchArr(a){is_array(a)||(a=[[a]]),is_array(a[0])||(a=[a]);for(var b=0,c=a.length;c>b;b++)is_string(a[b][0])&&(a[b][0]=$(a[b][0])),is_boolean(a[b][1])||(a[b][1]=!0),is_boolean(a[b][2])||(a[b][2]=!0),is_number(a[b][3])||(a[b][3]=0);return a}function cf_getKeyCode(a){return"right"==a?39:"left"==a?37:"up"==a?38:"down"==a?40:-1}function cf_setCookie(a,b,c){if(a){var d=b.triggerHandler(cf_e("currentPosition",c));$.fn.carouFredSel.cookie.set(a,d)}}function cf_getCookie(a){var b=$.fn.carouFredSel.cookie.get(a);return""==b?0:b}function in_mapCss(a,b){for(var c={},d=0,e=b.length;e>d;d++)c[b[d]]=a.css(b[d]);return c}function in_complementItems(a,b,c,d){return is_object(a.visibleConf)||(a.visibleConf={}),is_object(a.sizesConf)||(a.sizesConf={}),0==a.start&&is_number(d)&&(a.start=d),is_object(a.visible)?(a.visibleConf.min=a.visible.min,a.visibleConf.max=a.visible.max,a.visible=!1):is_string(a.visible)?("variable"==a.visible?a.visibleConf.variable=!0:a.visibleConf.adjust=a.visible,a.visible=!1):is_function(a.visible)&&(a.visibleConf.adjust=a.visible,a.visible=!1),is_string(a.filter)||(a.filter=c.filter(":hidden").length>0?":visible":"*"),a[b.d.width]||(b.responsive?(debug(!0,"Set a "+b.d.width+" for the items!"),a[b.d.width]=ms_getTrueLargestSize(c,b,"outerWidth")):a[b.d.width]=ms_hasVariableSizes(c,b,"outerWidth")?"variable":c[b.d.outerWidth](!0)),a[b.d.height]||(a[b.d.height]=ms_hasVariableSizes(c,b,"outerHeight")?"variable":c[b.d.outerHeight](!0)),a.sizesConf.width=a.width,a.sizesConf.height=a.height,a}function in_complementVisibleItems(a,b){return"variable"==a.items[a.d.width]&&(a.items.visibleConf.variable=!0),a.items.visibleConf.variable||(is_number(a[a.d.width])?a.items.visible=Math.floor(a[a.d.width]/a.items[a.d.width]):(a.items.visible=Math.floor(b/a.items[a.d.width]),a[a.d.width]=a.items.visible*a.items[a.d.width],a.items.visibleConf.adjust||(a.align=!1)),("Infinity"==a.items.visible||1>a.items.visible)&&(debug(!0,'Not a valid number of visible items: Set to "variable".'),a.items.visibleConf.variable=!0)),a}function in_complementPrimarySize(a,b,c){return"auto"==a&&(a=ms_getTrueLargestSize(c,b,"outerWidth")),a}function in_complementSecondarySize(a,b,c){return"auto"==a&&(a=ms_getTrueLargestSize(c,b,"outerHeight")),a||(a=b.items[b.d.height]),a}function in_getAlignPadding(a,b){var c=cf_getAlignPadding(gi_getCurrentItems(b,a),a);return a.padding[a.d[1]]=c[1],a.padding[a.d[3]]=c[0],a}function in_getResponsiveValues(a,b){var d=cf_getItemAdjustMinMax(Math.ceil(a[a.d.width]/a.items[a.d.width]),a.items.visibleConf);d>b.length&&(d=b.length);var e=Math.floor(a[a.d.width]/d);return a.items.visible=d,a.items[a.d.width]=e,a[a.d.width]=d*e,a}function bt_pauseOnHoverConfig(a){if(is_string(a))var b=a.indexOf("immediate")>-1?!0:!1,c=a.indexOf("resume")>-1?!0:!1;else var b=c=!1;return[b,c]}function bt_mousesheelNumber(a){return is_number(a)?a:null}function is_null(a){return null===a}function is_undefined(a){return is_null(a)||a===void 0||""===a||"undefined"===a}function is_array(a){return a instanceof Array}function is_jquery(a){return a instanceof jQuery}function is_object(a){return(a instanceof Object||"object"==typeof a)&&!is_null(a)&&!is_jquery(a)&&!is_array(a)&&!is_function(a)}function is_number(a){return(a instanceof Number||"number"==typeof a)&&!isNaN(a)}function is_string(a){return(a instanceof String||"string"==typeof a)&&!is_undefined(a)&&!is_true(a)&&!is_false(a)}function is_function(a){return a instanceof Function||"function"==typeof a}function is_boolean(a){return a instanceof Boolean||"boolean"==typeof a||is_true(a)||is_false(a)}function is_true(a){return a===!0||"true"===a}function is_false(a){return a===!1||"false"===a}function is_percentage(a){return is_string(a)&&"%"==a.slice(-1)}function getTime(){return(new Date).getTime()}function deprecated(a,b){debug(!0,a+" is DEPRECATED, support for it will be removed. Use "+b+" instead.")}function debug(a,b){if(!is_undefined(window.console)&&!is_undefined(window.console.log)){if(is_object(a)){var c=" ("+a.selector+")";a=a.debug}else var c="";if(!a)return!1;b=is_string(b)?"carouFredSel"+c+": "+b:["carouFredSel"+c+":",b],window.console.log(b)}return!1}$.fn.carouFredSel||($.fn.caroufredsel=$.fn.carouFredSel=function(options,configs){if(0==this.length)return debug(!0,'No element found for "'+this.selector+'".'),this;if(this.length>1)return this.each(function(){$(this).carouFredSel(options,configs)});var $cfs=this,$tt0=this[0],starting_position=!1;$cfs.data("_cfs_isCarousel")&&(starting_position=$cfs.triggerHandler("_cfs_triggerEvent","currentPosition"),$cfs.trigger("_cfs_triggerEvent",["destroy",!0]));var FN={};FN._init=function(a,b,c){a=go_getObject($tt0,a),a.items=go_getItemsObject($tt0,a.items),a.scroll=go_getScrollObject($tt0,a.scroll),a.auto=go_getAutoObject($tt0,a.auto),a.prev=go_getPrevNextObject($tt0,a.prev),a.next=go_getPrevNextObject($tt0,a.next),a.pagination=go_getPaginationObject($tt0,a.pagination),a.swipe=go_getSwipeObject($tt0,a.swipe),a.mousewheel=go_getMousewheelObject($tt0,a.mousewheel),b&&(opts_orig=$.extend(!0,{},$.fn.carouFredSel.defaults,a)),opts=$.extend(!0,{},$.fn.carouFredSel.defaults,a),opts.d=cf_getDimensions(opts),crsl.direction="up"==opts.direction||"left"==opts.direction?"next":"prev";var d=$cfs.children(),e=ms_getParentSize($wrp,opts,"width");if(is_true(opts.cookie)&&(opts.cookie="caroufredsel_cookie_"+conf.serialNumber),opts.maxDimension=ms_getMaxDimension(opts,e),opts.items=in_complementItems(opts.items,opts,d,c),opts[opts.d.width]=in_complementPrimarySize(opts[opts.d.width],opts,d),opts[opts.d.height]=in_complementSecondarySize(opts[opts.d.height],opts,d),opts.responsive&&(is_percentage(opts[opts.d.width])||(opts[opts.d.width]="100%")),is_percentage(opts[opts.d.width])&&(crsl.upDateOnWindowResize=!0,crsl.primarySizePercentage=opts[opts.d.width],opts[opts.d.width]=ms_getPercentage(e,crsl.primarySizePercentage),opts.items.visible||(opts.items.visibleConf.variable=!0)),opts.responsive?(opts.usePadding=!1,opts.padding=[0,0,0,0],opts.align=!1,opts.items.visibleConf.variable=!1):(opts.items.visible||(opts=in_complementVisibleItems(opts,e)),opts[opts.d.width]||(!opts.items.visibleConf.variable&&is_number(opts.items[opts.d.width])&&"*"==opts.items.filter?(opts[opts.d.width]=opts.items.visible*opts.items[opts.d.width],opts.align=!1):opts[opts.d.width]="variable"),is_undefined(opts.align)&&(opts.align=is_number(opts[opts.d.width])?"center":!1),opts.items.visibleConf.variable&&(opts.items.visible=gn_getVisibleItemsNext(d,opts,0))),"*"==opts.items.filter||opts.items.visibleConf.variable||(opts.items.visibleConf.org=opts.items.visible,opts.items.visible=gn_getVisibleItemsNextFilter(d,opts,0)),opts.items.visible=cf_getItemsAdjust(opts.items.visible,opts,opts.items.visibleConf.adjust,$tt0),opts.items.visibleConf.old=opts.items.visible,opts.responsive)opts.items.visibleConf.min||(opts.items.visibleConf.min=opts.items.visible),opts.items.visibleConf.max||(opts.items.visibleConf.max=opts.items.visible),opts=in_getResponsiveValues(opts,d,e);else switch(opts.padding=cf_getPadding(opts.padding),"top"==opts.align?opts.align="left":"bottom"==opts.align&&(opts.align="right"),opts.align){case"center":case"left":case"right":"variable"!=opts[opts.d.width]&&(opts=in_getAlignPadding(opts,d),opts.usePadding=!0);break;default:opts.align=!1,opts.usePadding=0==opts.padding[0]&&0==opts.padding[1]&&0==opts.padding[2]&&0==opts.padding[3]?!1:!0}is_number(opts.scroll.duration)||(opts.scroll.duration=500),is_undefined(opts.scroll.items)&&(opts.scroll.items=opts.responsive||opts.items.visibleConf.variable||"*"!=opts.items.filter?"visible":opts.items.visible),opts.auto=$.extend(!0,{},opts.scroll,opts.auto),opts.prev=$.extend(!0,{},opts.scroll,opts.prev),opts.next=$.extend(!0,{},opts.scroll,opts.next),opts.pagination=$.extend(!0,{},opts.scroll,opts.pagination),opts.auto=go_complementAutoObject($tt0,opts.auto),opts.prev=go_complementPrevNextObject($tt0,opts.prev),opts.next=go_complementPrevNextObject($tt0,opts.next),opts.pagination=go_complementPaginationObject($tt0,opts.pagination),opts.swipe=go_complementSwipeObject($tt0,opts.swipe),opts.mousewheel=go_complementMousewheelObject($tt0,opts.mousewheel),opts.synchronise&&(opts.synchronise=cf_getSynchArr(opts.synchronise)),opts.auto.onPauseStart&&(opts.auto.onTimeoutStart=opts.auto.onPauseStart,deprecated("auto.onPauseStart","auto.onTimeoutStart")),opts.auto.onPausePause&&(opts.auto.onTimeoutPause=opts.auto.onPausePause,deprecated("auto.onPausePause","auto.onTimeoutPause")),opts.auto.onPauseEnd&&(opts.auto.onTimeoutEnd=opts.auto.onPauseEnd,deprecated("auto.onPauseEnd","auto.onTimeoutEnd")),opts.auto.pauseDuration&&(opts.auto.timeoutDuration=opts.auto.pauseDuration,deprecated("auto.pauseDuration","auto.timeoutDuration"))},FN._build=function(){$cfs.data("_cfs_isCarousel",!0);var a=$cfs.children(),b=in_mapCss($cfs,["textAlign","float","position","top","right","bottom","left","zIndex","width","height","marginTop","marginRight","marginBottom","marginLeft"]),c="relative";switch(b.position){case"absolute":case"fixed":c=b.position}"parent"==conf.wrapper?sz_storeOrigCss($wrp):$wrp.css(b),$wrp.css({overflow:"hidden",position:c}),sz_storeOrigCss($cfs),$cfs.data("_cfs_origCssZindex",b.zIndex),$cfs.css({textAlign:"left","float":"none",position:"absolute",top:0,right:"auto",bottom:"auto",left:0,marginTop:0,marginRight:0,marginBottom:0,marginLeft:0}),sz_storeMargin(a,opts),sz_storeOrigCss(a),opts.responsive&&sz_setResponsiveSizes(opts,a)},FN._bind_events=function(){FN._unbind_events(),$cfs.bind(cf_e("stop",conf),function(a,b){return a.stopPropagation(),crsl.isStopped||opts.auto.button&&opts.auto.button.addClass(cf_c("stopped",conf)),crsl.isStopped=!0,opts.auto.play&&(opts.auto.play=!1,$cfs.trigger(cf_e("pause",conf),b)),!0}),$cfs.bind(cf_e("finish",conf),function(a){return a.stopPropagation(),crsl.isScrolling&&sc_stopScroll(scrl),!0}),$cfs.bind(cf_e("pause",conf),function(a,b,c){if(a.stopPropagation(),tmrs=sc_clearTimers(tmrs),b&&crsl.isScrolling){scrl.isStopped=!0;var d=getTime()-scrl.startTime;scrl.duration-=d,scrl.pre&&(scrl.pre.duration-=d),scrl.post&&(scrl.post.duration-=d),sc_stopScroll(scrl,!1)}if(crsl.isPaused||crsl.isScrolling||c&&(tmrs.timePassed+=getTime()-tmrs.startTime),crsl.isPaused||opts.auto.button&&opts.auto.button.addClass(cf_c("paused",conf)),crsl.isPaused=!0,opts.auto.onTimeoutPause){var e=opts.auto.timeoutDuration-tmrs.timePassed,f=100-Math.ceil(100*e/opts.auto.timeoutDuration);opts.auto.onTimeoutPause.call($tt0,f,e)}return!0}),$cfs.bind(cf_e("play",conf),function(a,b,c,d){a.stopPropagation(),tmrs=sc_clearTimers(tmrs);var e=[b,c,d],f=["string","number","boolean"],g=cf_sortParams(e,f);if(b=g[0],c=g[1],d=g[2],"prev"!=b&&"next"!=b&&(b=crsl.direction),is_number(c)||(c=0),is_boolean(d)||(d=!1),d&&(crsl.isStopped=!1,opts.auto.play=!0),!opts.auto.play)return a.stopImmediatePropagation(),debug(conf,"Carousel stopped: Not scrolling.");crsl.isPaused&&opts.auto.button&&(opts.auto.button.removeClass(cf_c("stopped",conf)),opts.auto.button.removeClass(cf_c("paused",conf))),crsl.isPaused=!1,tmrs.startTime=getTime();var h=opts.auto.timeoutDuration+c;return dur2=h-tmrs.timePassed,perc=100-Math.ceil(100*dur2/h),opts.auto.progress&&(tmrs.progress=setInterval(function(){var a=getTime()-tmrs.startTime+tmrs.timePassed,b=Math.ceil(100*a/h);opts.auto.progress.updater.call(opts.auto.progress.bar[0],b)},opts.auto.progress.interval)),tmrs.auto=setTimeout(function(){opts.auto.progress&&opts.auto.progress.updater.call(opts.auto.progress.bar[0],100),opts.auto.onTimeoutEnd&&opts.auto.onTimeoutEnd.call($tt0,perc,dur2),crsl.isScrolling?$cfs.trigger(cf_e("play",conf),b):$cfs.trigger(cf_e(b,conf),opts.auto)},dur2),opts.auto.onTimeoutStart&&opts.auto.onTimeoutStart.call($tt0,perc,dur2),!0}),$cfs.bind(cf_e("resume",conf),function(a){return a.stopPropagation(),scrl.isStopped?(scrl.isStopped=!1,crsl.isPaused=!1,crsl.isScrolling=!0,scrl.startTime=getTime(),sc_startScroll(scrl,conf)):$cfs.trigger(cf_e("play",conf)),!0}),$cfs.bind(cf_e("prev",conf)+" "+cf_e("next",conf),function(a,b,c,d,e){if(a.stopPropagation(),crsl.isStopped||$cfs.is(":hidden"))return a.stopImmediatePropagation(),debug(conf,"Carousel stopped or hidden: Not scrolling.");var f=is_number(opts.items.minimum)?opts.items.minimum:opts.items.visible+1;if(f>itms.total)return a.stopImmediatePropagation(),debug(conf,"Not enough items ("+itms.total+" total, "+f+" needed): Not scrolling.");var g=[b,c,d,e],h=["object","number/string","function","boolean"],i=cf_sortParams(g,h);b=i[0],c=i[1],d=i[2],e=i[3];var j=a.type.slice(conf.events.prefix.length);if(is_object(b)||(b={}),is_function(d)&&(b.onAfter=d),is_boolean(e)&&(b.queue=e),b=$.extend(!0,{},opts[j],b),b.conditions&&!b.conditions.call($tt0,j))return a.stopImmediatePropagation(),debug(conf,'Callback "conditions" returned false.');if(!is_number(c)){if("*"!=opts.items.filter)c="visible";else for(var k=[c,b.items,opts[j].items],i=0,l=k.length;l>i;i++)if(is_number(k[i])||"page"==k[i]||"visible"==k[i]){c=k[i];break}switch(c){case"page":return a.stopImmediatePropagation(),$cfs.triggerHandler(cf_e(j+"Page",conf),[b,d]);case"visible":opts.items.visibleConf.variable||"*"!=opts.items.filter||(c=opts.items.visible)}}if(scrl.isStopped)return $cfs.trigger(cf_e("resume",conf)),$cfs.trigger(cf_e("queue",conf),[j,[b,c,d]]),a.stopImmediatePropagation(),debug(conf,"Carousel resumed scrolling.");if(b.duration>0&&crsl.isScrolling)return b.queue&&("last"==b.queue&&(queu=[]),("first"!=b.queue||0==queu.length)&&$cfs.trigger(cf_e("queue",conf),[j,[b,c,d]])),a.stopImmediatePropagation(),debug(conf,"Carousel currently scrolling.");if(tmrs.timePassed=0,$cfs.trigger(cf_e("slide_"+j,conf),[b,c]),opts.synchronise)for(var m=opts.synchronise,n=[b,c],o=0,l=m.length;l>o;o++){var p=j;m[o][2]||(p="prev"==p?"next":"prev"),m[o][1]||(n[0]=m[o][0].triggerHandler("_cfs_triggerEvent",["configuration",p])),n[1]=c+m[o][3],m[o][0].trigger("_cfs_triggerEvent",["slide_"+p,n])}return!0}),$cfs.bind(cf_e("slide_prev",conf),function(a,b,c){a.stopPropagation();var d=$cfs.children();if(!opts.circular&&0==itms.first)return opts.infinite&&$cfs.trigger(cf_e("next",conf),itms.total-1),a.stopImmediatePropagation();if(sz_resetMargin(d,opts),!is_number(c)){if(opts.items.visibleConf.variable)c=gn_getVisibleItemsPrev(d,opts,itms.total-1);else if("*"!=opts.items.filter){var e=is_number(b.items)?b.items:gn_getVisibleOrg($cfs,opts);c=gn_getScrollItemsPrevFilter(d,opts,itms.total-1,e)}else c=opts.items.visible;c=cf_getAdjust(c,opts,b.items,$tt0)}if(opts.circular||itms.total-c<itms.first&&(c=itms.total-itms.first),opts.items.visibleConf.old=opts.items.visible,opts.items.visibleConf.variable){var f=cf_getItemsAdjust(gn_getVisibleItemsNext(d,opts,itms.total-c),opts,opts.items.visibleConf.adjust,$tt0);f>=opts.items.visible+c&&itms.total>c&&(c++,f=cf_getItemsAdjust(gn_getVisibleItemsNext(d,opts,itms.total-c),opts,opts.items.visibleConf.adjust,$tt0)),opts.items.visible=f}else if("*"!=opts.items.filter){var f=gn_getVisibleItemsNextFilter(d,opts,itms.total-c);opts.items.visible=cf_getItemsAdjust(f,opts,opts.items.visibleConf.adjust,$tt0)}if(sz_resetMargin(d,opts,!0),0==c)return a.stopImmediatePropagation(),debug(conf,"0 items to scroll: Not scrolling.");for(debug(conf,"Scrolling "+c+" items backward."),itms.first+=c;itms.first>=itms.total;)itms.first-=itms.total;opts.circular||(0==itms.first&&b.onEnd&&b.onEnd.call($tt0,"prev"),opts.infinite||nv_enableNavi(opts,itms.first,conf)),$cfs.children().slice(itms.total-c,itms.total).prependTo($cfs),itms.total<opts.items.visible+c&&$cfs.children().slice(0,opts.items.visible+c-itms.total).clone(!0).appendTo($cfs);var d=$cfs.children(),g=gi_getOldItemsPrev(d,opts,c),h=gi_getNewItemsPrev(d,opts),i=d.eq(c-1),j=g.last(),k=h.last();sz_resetMargin(d,opts);var l=0,m=0;if(opts.align){var n=cf_getAlignPadding(h,opts);l=n[0],m=n[1]}var o=0>l?opts.padding[opts.d[3]]:0,p=!1,q=$();if(c>opts.items.visible&&(q=d.slice(opts.items.visibleConf.old,c),"directscroll"==b.fx)){var r=opts.items[opts.d.width];p=q,i=k,sc_hideHiddenItems(p),opts.items[opts.d.width]="variable"}var s=!1,t=ms_getTotalSize(d.slice(0,c),opts,"width"),u=cf_mapWrapperSizes(ms_getSizes(h,opts,!0),opts,!opts.usePadding),v=0,w={},x={},y={},z={},A={},B={},C={},D=sc_getDuration(b,opts,c,t);switch(b.fx){case"cover":case"cover-fade":v=ms_getTotalSize(d.slice(0,opts.items.visible),opts,"width")}p&&(opts.items[opts.d.width]=r),sz_resetMargin(d,opts,!0),m>=0&&sz_resetMargin(j,opts,opts.padding[opts.d[1]]),l>=0&&sz_resetMargin(i,opts,opts.padding[opts.d[3]]),opts.align&&(opts.padding[opts.d[1]]=m,opts.padding[opts.d[3]]=l),B[opts.d.left]=-(t-o),C[opts.d.left]=-(v-o),x[opts.d.left]=u[opts.d.width];var E=function(){},F=function(){},G=function(){},H=function(){},I=function(){},J=function(){},K=function(){},L=function(){},M=function(){},N=function(){},O=function(){};switch(b.fx){case"crossfade":case"cover":case"cover-fade":case"uncover":case"uncover-fade":s=$cfs.clone(!0).appendTo($wrp)}switch(b.fx){case"crossfade":case"uncover":case"uncover-fade":s.children().slice(0,c).remove(),s.children().slice(opts.items.visibleConf.old).remove();break;case"cover":case"cover-fade":s.children().slice(opts.items.visible).remove(),s.css(C)}if($cfs.css(B),scrl=sc_setScroll(D,b.easing,conf),w[opts.d.left]=opts.usePadding?opts.padding[opts.d[3]]:0,("variable"==opts[opts.d.width]||"variable"==opts[opts.d.height])&&(E=function(){$wrp.css(u)},F=function(){scrl.anims.push([$wrp,u])}),opts.usePadding){switch(k.not(i).length&&(y[opts.d.marginRight]=i.data("_cfs_origCssMargin"),0>l?i.css(y):(K=function(){i.css(y)},L=function(){scrl.anims.push([i,y])})),b.fx){case"cover":case"cover-fade":s.children().eq(c-1).css(y)}k.not(j).length&&(z[opts.d.marginRight]=j.data("_cfs_origCssMargin"),G=function(){j.css(z)},H=function(){scrl.anims.push([j,z])}),m>=0&&(A[opts.d.marginRight]=k.data("_cfs_origCssMargin")+opts.padding[opts.d[1]],I=function(){k.css(A)},J=function(){scrl.anims.push([k,A])})}O=function(){$cfs.css(w)};var P=opts.items.visible+c-itms.total;N=function(){if(P>0&&($cfs.children().slice(itms.total).remove(),g=$($cfs.children().slice(itms.total-(opts.items.visible-P)).get().concat($cfs.children().slice(0,P).get()))),sc_showHiddenItems(p),opts.usePadding){var a=$cfs.children().eq(opts.items.visible+c-1);a.css(opts.d.marginRight,a.data("_cfs_origCssMargin"))}};var Q=sc_mapCallbackArguments(g,q,h,c,"prev",D,u);switch(M=function(){sc_afterScroll($cfs,s,b),crsl.isScrolling=!1,clbk.onAfter=sc_fireCallbacks($tt0,b,"onAfter",Q,clbk),queu=sc_fireQueue($cfs,queu,conf),crsl.isPaused||$cfs.trigger(cf_e("play",conf))},crsl.isScrolling=!0,tmrs=sc_clearTimers(tmrs),clbk.onBefore=sc_fireCallbacks($tt0,b,"onBefore",Q,clbk),b.fx){case"none":$cfs.css(w),E(),G(),I(),K(),O(),N(),M();break;case"fade":scrl.anims.push([$cfs,{opacity:0},function(){E(),G(),I(),K(),O(),N(),scrl=sc_setScroll(D,b.easing,conf),scrl.anims.push([$cfs,{opacity:1},M]),sc_startScroll(scrl,conf)}]);break;case"crossfade":$cfs.css({opacity:0}),scrl.anims.push([s,{opacity:0}]),scrl.anims.push([$cfs,{opacity:1},M]),F(),G(),I(),K(),O(),N();break;case"cover":scrl.anims.push([s,w,function(){G(),I(),K(),O(),N(),M()}]),F();break;case"cover-fade":scrl.anims.push([$cfs,{opacity:0}]),scrl.anims.push([s,w,function(){G(),I(),K(),O(),N(),M()}]),F();break;case"uncover":scrl.anims.push([s,x,M]),F(),G(),I(),K(),O(),N();break;case"uncover-fade":$cfs.css({opacity:0}),scrl.anims.push([$cfs,{opacity:1}]),scrl.anims.push([s,x,M]),F(),G(),I(),K(),O(),N();break;default:scrl.anims.push([$cfs,w,function(){N(),M()}]),F(),H(),J(),L()}return sc_startScroll(scrl,conf),cf_setCookie(opts.cookie,$cfs,conf),$cfs.trigger(cf_e("updatePageStatus",conf),[!1,u]),!0

}),$cfs.bind(cf_e("slide_next",conf),function(a,b,c){a.stopPropagation();var d=$cfs.children();if(!opts.circular&&itms.first==opts.items.visible)return opts.infinite&&$cfs.trigger(cf_e("prev",conf),itms.total-1),a.stopImmediatePropagation();if(sz_resetMargin(d,opts),!is_number(c)){if("*"!=opts.items.filter){var e=is_number(b.items)?b.items:gn_getVisibleOrg($cfs,opts);c=gn_getScrollItemsNextFilter(d,opts,0,e)}else c=opts.items.visible;c=cf_getAdjust(c,opts,b.items,$tt0)}var f=0==itms.first?itms.total:itms.first;if(!opts.circular){if(opts.items.visibleConf.variable)var g=gn_getVisibleItemsNext(d,opts,c),e=gn_getVisibleItemsPrev(d,opts,f-1);else var g=opts.items.visible,e=opts.items.visible;c+g>f&&(c=f-e)}if(opts.items.visibleConf.old=opts.items.visible,opts.items.visibleConf.variable){for(var g=cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(d,opts,c,f),opts,opts.items.visibleConf.adjust,$tt0);opts.items.visible-c>=g&&itms.total>c;)c++,g=cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(d,opts,c,f),opts,opts.items.visibleConf.adjust,$tt0);opts.items.visible=g}else if("*"!=opts.items.filter){var g=gn_getVisibleItemsNextFilter(d,opts,c);opts.items.visible=cf_getItemsAdjust(g,opts,opts.items.visibleConf.adjust,$tt0)}if(sz_resetMargin(d,opts,!0),0==c)return a.stopImmediatePropagation(),debug(conf,"0 items to scroll: Not scrolling.");for(debug(conf,"Scrolling "+c+" items forward."),itms.first-=c;0>itms.first;)itms.first+=itms.total;opts.circular||(itms.first==opts.items.visible&&b.onEnd&&b.onEnd.call($tt0,"next"),opts.infinite||nv_enableNavi(opts,itms.first,conf)),itms.total<opts.items.visible+c&&$cfs.children().slice(0,opts.items.visible+c-itms.total).clone(!0).appendTo($cfs);var d=$cfs.children(),h=gi_getOldItemsNext(d,opts),i=gi_getNewItemsNext(d,opts,c),j=d.eq(c-1),k=h.last(),l=i.last();sz_resetMargin(d,opts);var m=0,n=0;if(opts.align){var o=cf_getAlignPadding(i,opts);m=o[0],n=o[1]}var p=!1,q=$();if(c>opts.items.visibleConf.old&&(q=d.slice(opts.items.visibleConf.old,c),"directscroll"==b.fx)){var r=opts.items[opts.d.width];p=q,j=k,sc_hideHiddenItems(p),opts.items[opts.d.width]="variable"}var s=!1,t=ms_getTotalSize(d.slice(0,c),opts,"width"),u=cf_mapWrapperSizes(ms_getSizes(i,opts,!0),opts,!opts.usePadding),v=0,w={},x={},y={},z={},A={},B=sc_getDuration(b,opts,c,t);switch(b.fx){case"uncover":case"uncover-fade":v=ms_getTotalSize(d.slice(0,opts.items.visibleConf.old),opts,"width")}p&&(opts.items[opts.d.width]=r),opts.align&&0>opts.padding[opts.d[1]]&&(opts.padding[opts.d[1]]=0),sz_resetMargin(d,opts,!0),sz_resetMargin(k,opts,opts.padding[opts.d[1]]),opts.align&&(opts.padding[opts.d[1]]=n,opts.padding[opts.d[3]]=m),A[opts.d.left]=opts.usePadding?opts.padding[opts.d[3]]:0;var C=function(){},D=function(){},E=function(){},F=function(){},G=function(){},H=function(){},I=function(){},J=function(){},K=function(){};switch(b.fx){case"crossfade":case"cover":case"cover-fade":case"uncover":case"uncover-fade":s=$cfs.clone(!0).appendTo($wrp),s.children().slice(opts.items.visibleConf.old).remove()}switch(b.fx){case"crossfade":case"cover":case"cover-fade":$cfs.css("zIndex",1),s.css("zIndex",0)}if(scrl=sc_setScroll(B,b.easing,conf),w[opts.d.left]=-t,x[opts.d.left]=-v,0>m&&(w[opts.d.left]+=m),("variable"==opts[opts.d.width]||"variable"==opts[opts.d.height])&&(C=function(){$wrp.css(u)},D=function(){scrl.anims.push([$wrp,u])}),opts.usePadding){var L=l.data("_cfs_origCssMargin");n>=0&&(L+=opts.padding[opts.d[1]]),l.css(opts.d.marginRight,L),j.not(k).length&&(z[opts.d.marginRight]=k.data("_cfs_origCssMargin")),E=function(){k.css(z)},F=function(){scrl.anims.push([k,z])};var M=j.data("_cfs_origCssMargin");m>0&&(M+=opts.padding[opts.d[3]]),y[opts.d.marginRight]=M,G=function(){j.css(y)},H=function(){scrl.anims.push([j,y])}}K=function(){$cfs.css(A)};var N=opts.items.visible+c-itms.total;J=function(){N>0&&$cfs.children().slice(itms.total).remove();var a=$cfs.children().slice(0,c).appendTo($cfs).last();if(N>0&&(i=gi_getCurrentItems(d,opts)),sc_showHiddenItems(p),opts.usePadding){if(itms.total<opts.items.visible+c){var b=$cfs.children().eq(opts.items.visible-1);b.css(opts.d.marginRight,b.data("_cfs_origCssMargin")+opts.padding[opts.d[1]])}a.css(opts.d.marginRight,a.data("_cfs_origCssMargin"))}};var O=sc_mapCallbackArguments(h,q,i,c,"next",B,u);switch(I=function(){$cfs.css("zIndex",$cfs.data("_cfs_origCssZindex")),sc_afterScroll($cfs,s,b),crsl.isScrolling=!1,clbk.onAfter=sc_fireCallbacks($tt0,b,"onAfter",O,clbk),queu=sc_fireQueue($cfs,queu,conf),crsl.isPaused||$cfs.trigger(cf_e("play",conf))},crsl.isScrolling=!0,tmrs=sc_clearTimers(tmrs),clbk.onBefore=sc_fireCallbacks($tt0,b,"onBefore",O,clbk),b.fx){case"none":$cfs.css(w),C(),E(),G(),K(),J(),I();break;case"fade":scrl.anims.push([$cfs,{opacity:0},function(){C(),E(),G(),K(),J(),scrl=sc_setScroll(B,b.easing,conf),scrl.anims.push([$cfs,{opacity:1},I]),sc_startScroll(scrl,conf)}]);break;case"crossfade":$cfs.css({opacity:0}),scrl.anims.push([s,{opacity:0}]),scrl.anims.push([$cfs,{opacity:1},I]),D(),E(),G(),K(),J();break;case"cover":$cfs.css(opts.d.left,$wrp[opts.d.width]()),scrl.anims.push([$cfs,A,I]),D(),E(),G(),J();break;case"cover-fade":$cfs.css(opts.d.left,$wrp[opts.d.width]()),scrl.anims.push([s,{opacity:0}]),scrl.anims.push([$cfs,A,I]),D(),E(),G(),J();break;case"uncover":scrl.anims.push([s,x,I]),D(),E(),G(),K(),J();break;case"uncover-fade":$cfs.css({opacity:0}),scrl.anims.push([$cfs,{opacity:1}]),scrl.anims.push([s,x,I]),D(),E(),G(),K(),J();break;default:scrl.anims.push([$cfs,w,function(){K(),J(),I()}]),D(),F(),H()}return sc_startScroll(scrl,conf),cf_setCookie(opts.cookie,$cfs,conf),$cfs.trigger(cf_e("updatePageStatus",conf),[!1,u]),!0}),$cfs.bind(cf_e("slideTo",conf),function(a,b,c,d,e,f,g){a.stopPropagation();var h=[b,c,d,e,f,g],i=["string/number/object","number","boolean","object","string","function"],j=cf_sortParams(h,i);return e=j[3],f=j[4],g=j[5],b=gn_getItemIndex(j[0],j[1],j[2],itms,$cfs),0==b?!1:(is_object(e)||(e=!1),"prev"!=f&&"next"!=f&&(f=opts.circular?itms.total/2>=b?"next":"prev":0==itms.first||itms.first>b?"next":"prev"),"prev"==f&&(b=itms.total-b),$cfs.trigger(cf_e(f,conf),[e,b,g]),!0)}),$cfs.bind(cf_e("prevPage",conf),function(a,b,c){a.stopPropagation();var d=$cfs.triggerHandler(cf_e("currentPage",conf));return $cfs.triggerHandler(cf_e("slideToPage",conf),[d-1,b,"prev",c])}),$cfs.bind(cf_e("nextPage",conf),function(a,b,c){a.stopPropagation();var d=$cfs.triggerHandler(cf_e("currentPage",conf));return $cfs.triggerHandler(cf_e("slideToPage",conf),[d+1,b,"next",c])}),$cfs.bind(cf_e("slideToPage",conf),function(a,b,c,d,e){a.stopPropagation(),is_number(b)||(b=$cfs.triggerHandler(cf_e("currentPage",conf)));var f=opts.pagination.items||opts.items.visible,g=Math.ceil(itms.total/f)-1;return 0>b&&(b=g),b>g&&(b=0),$cfs.triggerHandler(cf_e("slideTo",conf),[b*f,0,!0,c,d,e])}),$cfs.bind(cf_e("jumpToStart",conf),function(a,b){if(a.stopPropagation(),b=b?gn_getItemIndex(b,0,!0,itms,$cfs):0,b+=itms.first,0!=b){if(itms.total>0)for(;b>itms.total;)b-=itms.total;$cfs.prepend($cfs.children().slice(b,itms.total))}return!0}),$cfs.bind(cf_e("synchronise",conf),function(a,b){if(a.stopPropagation(),b)b=cf_getSynchArr(b);else{if(!opts.synchronise)return debug(conf,"No carousel to synchronise.");b=opts.synchronise}for(var c=$cfs.triggerHandler(cf_e("currentPosition",conf)),d=!0,e=0,f=b.length;f>e;e++)b[e][0].triggerHandler(cf_e("slideTo",conf),[c,b[e][3],!0])||(d=!1);return d}),$cfs.bind(cf_e("queue",conf),function(a,b,c){return a.stopPropagation(),is_function(b)?b.call($tt0,queu):is_array(b)?queu=b:is_undefined(b)||queu.push([b,c]),queu}),$cfs.bind(cf_e("insertItem",conf),function(a,b,c,d,e){a.stopPropagation();var f=[b,c,d,e],g=["string/object","string/number/object","boolean","number"],h=cf_sortParams(f,g);if(b=h[0],c=h[1],d=h[2],e=h[3],is_object(b)&&!is_jquery(b)?b=$(b):is_string(b)&&(b=$(b)),!is_jquery(b)||0==b.length)return debug(conf,"Not a valid object.");is_undefined(c)&&(c="end"),sz_storeMargin(b,opts),sz_storeOrigCss(b);var i=c,j="before";"end"==c?d?(0==itms.first?(c=itms.total-1,j="after"):(c=itms.first,itms.first+=b.length),0>c&&(c=0)):(c=itms.total-1,j="after"):c=gn_getItemIndex(c,e,d,itms,$cfs);var k=$cfs.children().eq(c);return k.length?k[j](b):(debug(conf,"Correct insert-position not found! Appending item to the end."),$cfs.append(b)),"end"==i||d||itms.first>c&&(itms.first+=b.length),itms.total=$cfs.children().length,itms.first>=itms.total&&(itms.first-=itms.total),$cfs.trigger(cf_e("updateSizes",conf)),$cfs.trigger(cf_e("linkAnchors",conf)),!0}),$cfs.bind(cf_e("removeItem",conf),function(a,b,c,d){a.stopPropagation();var e=[b,c,d],f=["string/number/object","boolean","number"],g=cf_sortParams(e,f);if(b=g[0],c=g[1],d=g[2],b instanceof $&&b.length>1)return i=$(),b.each(function(){var e=$cfs.trigger(cf_e("removeItem",conf),[$(this),c,d]);e&&(i=i.add(e))}),i;if(is_undefined(b)||"end"==b)i=$cfs.children().last();else{b=gn_getItemIndex(b,d,c,itms,$cfs);var i=$cfs.children().eq(b);i.length&&itms.first>b&&(itms.first-=i.length)}return i&&i.length&&(i.detach(),itms.total=$cfs.children().length,$cfs.trigger(cf_e("updateSizes",conf))),i}),$cfs.bind(cf_e("onBefore",conf)+" "+cf_e("onAfter",conf),function(a,b){a.stopPropagation();var c=a.type.slice(conf.events.prefix.length);return is_array(b)&&(clbk[c]=b),is_function(b)&&clbk[c].push(b),clbk[c]}),$cfs.bind(cf_e("currentPosition",conf),function(a,b){if(a.stopPropagation(),0==itms.first)var c=0;else var c=itms.total-itms.first;return is_function(b)&&b.call($tt0,c),c}),$cfs.bind(cf_e("currentPage",conf),function(a,b){a.stopPropagation();var e,c=opts.pagination.items||opts.items.visible,d=Math.ceil(itms.total/c-1);return e=0==itms.first?0:itms.first<itms.total%c?0:itms.first!=c||opts.circular?Math.round((itms.total-itms.first)/c):d,0>e&&(e=0),e>d&&(e=d),is_function(b)&&b.call($tt0,e),e}),$cfs.bind(cf_e("currentVisible",conf),function(a,b){a.stopPropagation();var c=gi_getCurrentItems($cfs.children(),opts);return is_function(b)&&b.call($tt0,c),c}),$cfs.bind(cf_e("slice",conf),function(a,b,c,d){if(a.stopPropagation(),0==itms.total)return!1;var e=[b,c,d],f=["number","number","function"],g=cf_sortParams(e,f);if(b=is_number(g[0])?g[0]:0,c=is_number(g[1])?g[1]:itms.total,d=g[2],b+=itms.first,c+=itms.first,items.total>0){for(;b>itms.total;)b-=itms.total;for(;c>itms.total;)c-=itms.total;for(;0>b;)b+=itms.total;for(;0>c;)c+=itms.total}var i,h=$cfs.children();return i=c>b?h.slice(b,c):$(h.slice(b,itms.total).get().concat(h.slice(0,c).get())),is_function(d)&&d.call($tt0,i),i}),$cfs.bind(cf_e("isPaused",conf)+" "+cf_e("isStopped",conf)+" "+cf_e("isScrolling",conf),function(a,b){a.stopPropagation();var c=a.type.slice(conf.events.prefix.length),d=crsl[c];return is_function(b)&&b.call($tt0,d),d}),$cfs.bind(cf_e("configuration",conf),function(e,a,b,c){e.stopPropagation();var reInit=!1;if(is_function(a))a.call($tt0,opts);else if(is_object(a))opts_orig=$.extend(!0,{},opts_orig,a),b!==!1?reInit=!0:opts=$.extend(!0,{},opts,a);else if(!is_undefined(a))if(is_function(b)){var val=eval("opts."+a);is_undefined(val)&&(val=""),b.call($tt0,val)}else{if(is_undefined(b))return eval("opts."+a);"boolean"!=typeof c&&(c=!0),eval("opts_orig."+a+" = b"),c!==!1?reInit=!0:eval("opts."+a+" = b")}if(reInit){sz_resetMargin($cfs.children(),opts),FN._init(opts_orig),FN._bind_buttons();var sz=sz_setSizes($cfs,opts);$cfs.trigger(cf_e("updatePageStatus",conf),[!0,sz])}return opts}),$cfs.bind(cf_e("linkAnchors",conf),function(a,b,c){return a.stopPropagation(),is_undefined(b)?b=$("body"):is_string(b)&&(b=$(b)),is_jquery(b)&&0!=b.length?(is_string(c)||(c="a.caroufredsel"),b.find(c).each(function(){var a=this.hash||"";a.length>0&&-1!=$cfs.children().index($(a))&&$(this).unbind("click").click(function(b){b.preventDefault(),$cfs.trigger(cf_e("slideTo",conf),a)})}),!0):debug(conf,"Not a valid object.")}),$cfs.bind(cf_e("updatePageStatus",conf),function(a,b){if(a.stopPropagation(),opts.pagination.container){var d=opts.pagination.items||opts.items.visible,e=Math.ceil(itms.total/d);b&&(opts.pagination.anchorBuilder&&(opts.pagination.container.children().remove(),opts.pagination.container.each(function(){for(var a=0;e>a;a++){var b=$cfs.children().eq(gn_getItemIndex(a*d,0,!0,itms,$cfs));$(this).append(opts.pagination.anchorBuilder.call(b[0],a+1))}})),opts.pagination.container.each(function(){$(this).children().unbind(opts.pagination.event).each(function(a){$(this).bind(opts.pagination.event,function(b){b.preventDefault(),$cfs.trigger(cf_e("slideTo",conf),[a*d,-opts.pagination.deviation,!0,opts.pagination])})})}));var f=$cfs.triggerHandler(cf_e("currentPage",conf))+opts.pagination.deviation;return f>=e&&(f=0),0>f&&(f=e-1),opts.pagination.container.each(function(){$(this).children().removeClass(cf_c("selected",conf)).eq(f).addClass(cf_c("selected",conf))}),!0}}),$cfs.bind(cf_e("updateSizes",conf),function(){var b=opts.items.visible,c=$cfs.children(),d=ms_getParentSize($wrp,opts,"width");if(itms.total=c.length,crsl.primarySizePercentage?(opts.maxDimension=d,opts[opts.d.width]=ms_getPercentage(d,crsl.primarySizePercentage)):opts.maxDimension=ms_getMaxDimension(opts,d),opts.responsive?(opts.items.width=opts.items.sizesConf.width,opts.items.height=opts.items.sizesConf.height,opts=in_getResponsiveValues(opts,c,d),b=opts.items.visible,sz_setResponsiveSizes(opts,c)):opts.items.visibleConf.variable?b=gn_getVisibleItemsNext(c,opts,0):"*"!=opts.items.filter&&(b=gn_getVisibleItemsNextFilter(c,opts,0)),!opts.circular&&0!=itms.first&&b>itms.first){if(opts.items.visibleConf.variable)var e=gn_getVisibleItemsPrev(c,opts,itms.first)-itms.first;else if("*"!=opts.items.filter)var e=gn_getVisibleItemsPrevFilter(c,opts,itms.first)-itms.first;else var e=opts.items.visible-itms.first;debug(conf,"Preventing non-circular: sliding "+e+" items backward."),$cfs.trigger(cf_e("prev",conf),e)}opts.items.visible=cf_getItemsAdjust(b,opts,opts.items.visibleConf.adjust,$tt0),opts.items.visibleConf.old=opts.items.visible,opts=in_getAlignPadding(opts,c);var f=sz_setSizes($cfs,opts);return $cfs.trigger(cf_e("updatePageStatus",conf),[!0,f]),nv_showNavi(opts,itms.total,conf),nv_enableNavi(opts,itms.first,conf),f}),$cfs.bind(cf_e("destroy",conf),function(a,b){return a.stopPropagation(),tmrs=sc_clearTimers(tmrs),$cfs.data("_cfs_isCarousel",!1),$cfs.trigger(cf_e("finish",conf)),b&&$cfs.trigger(cf_e("jumpToStart",conf)),sz_restoreOrigCss($cfs.children()),sz_restoreOrigCss($cfs),FN._unbind_events(),FN._unbind_buttons(),"parent"==conf.wrapper?sz_restoreOrigCss($wrp):$wrp.replaceWith($cfs),!0}),$cfs.bind(cf_e("debug",conf),function(){return debug(conf,"Carousel width: "+opts.width),debug(conf,"Carousel height: "+opts.height),debug(conf,"Item widths: "+opts.items.width),debug(conf,"Item heights: "+opts.items.height),debug(conf,"Number of items visible: "+opts.items.visible),opts.auto.play&&debug(conf,"Number of items scrolled automatically: "+opts.auto.items),opts.prev.button&&debug(conf,"Number of items scrolled backward: "+opts.prev.items),opts.next.button&&debug(conf,"Number of items scrolled forward: "+opts.next.items),conf.debug}),$cfs.bind("_cfs_triggerEvent",function(a,b,c){return a.stopPropagation(),$cfs.triggerHandler(cf_e(b,conf),c)})},FN._unbind_events=function(){$cfs.unbind(cf_e("",conf)),$cfs.unbind(cf_e("",conf,!1)),$cfs.unbind("_cfs_triggerEvent")},FN._bind_buttons=function(){if(FN._unbind_buttons(),nv_showNavi(opts,itms.total,conf),nv_enableNavi(opts,itms.first,conf),opts.auto.pauseOnHover){var a=bt_pauseOnHoverConfig(opts.auto.pauseOnHover);$wrp.bind(cf_e("mouseenter",conf,!1),function(){$cfs.trigger(cf_e("pause",conf),a)}).bind(cf_e("mouseleave",conf,!1),function(){$cfs.trigger(cf_e("resume",conf))})}if(opts.auto.button&&opts.auto.button.bind(cf_e(opts.auto.event,conf,!1),function(a){a.preventDefault();var b=!1,c=null;crsl.isPaused?b="play":opts.auto.pauseOnEvent&&(b="pause",c=bt_pauseOnHoverConfig(opts.auto.pauseOnEvent)),b&&$cfs.trigger(cf_e(b,conf),c)}),opts.prev.button&&(opts.prev.button.bind(cf_e(opts.prev.event,conf,!1),function(a){a.preventDefault(),$cfs.trigger(cf_e("prev",conf))}),opts.prev.pauseOnHover)){var a=bt_pauseOnHoverConfig(opts.prev.pauseOnHover);opts.prev.button.bind(cf_e("mouseenter",conf,!1),function(){$cfs.trigger(cf_e("pause",conf),a)}).bind(cf_e("mouseleave",conf,!1),function(){$cfs.trigger(cf_e("resume",conf))})}if(opts.next.button&&(opts.next.button.bind(cf_e(opts.next.event,conf,!1),function(a){a.preventDefault(),$cfs.trigger(cf_e("next",conf))}),opts.next.pauseOnHover)){var a=bt_pauseOnHoverConfig(opts.next.pauseOnHover);opts.next.button.bind(cf_e("mouseenter",conf,!1),function(){$cfs.trigger(cf_e("pause",conf),a)}).bind(cf_e("mouseleave",conf,!1),function(){$cfs.trigger(cf_e("resume",conf))})}if(opts.pagination.container&&opts.pagination.pauseOnHover){var a=bt_pauseOnHoverConfig(opts.pagination.pauseOnHover);opts.pagination.container.bind(cf_e("mouseenter",conf,!1),function(){$cfs.trigger(cf_e("pause",conf),a)}).bind(cf_e("mouseleave",conf,!1),function(){$cfs.trigger(cf_e("resume",conf))})}if((opts.prev.key||opts.next.key)&&$(document).bind(cf_e("keyup",conf,!1,!0,!0),function(a){var b=a.keyCode;b==opts.next.key&&(a.preventDefault(),$cfs.trigger(cf_e("next",conf))),b==opts.prev.key&&(a.preventDefault(),$cfs.trigger(cf_e("prev",conf)))}),opts.pagination.keys&&$(document).bind(cf_e("keyup",conf,!1,!0,!0),function(a){var b=a.keyCode;b>=49&&58>b&&(b=(b-49)*opts.items.visible,itms.total>=b&&(a.preventDefault(),$cfs.trigger(cf_e("slideTo",conf),[b,0,!0,opts.pagination])))}),$.fn.swipe){var b="ontouchstart"in window;if(b&&opts.swipe.onTouch||!b&&opts.swipe.onMouse){var c=$.extend(!0,{},opts.prev,opts.swipe),d=$.extend(!0,{},opts.next,opts.swipe),e=function(){$cfs.trigger(cf_e("prev",conf),[c])},f=function(){$cfs.trigger(cf_e("next",conf),[d])};switch(opts.direction){case"up":case"down":opts.swipe.options.swipeUp=f,opts.swipe.options.swipeDown=e;break;default:opts.swipe.options.swipeLeft=f,opts.swipe.options.swipeRight=e}crsl.swipe&&$cfs.swipe("destroy"),$wrp.swipe(opts.swipe.options),$wrp.css("cursor","move"),crsl.swipe=!0}}if($.fn.mousewheel&&opts.mousewheel){var g=$.extend(!0,{},opts.prev,opts.mousewheel),h=$.extend(!0,{},opts.next,opts.mousewheel);crsl.mousewheel&&$wrp.unbind(cf_e("mousewheel",conf,!1)),$wrp.bind(cf_e("mousewheel",conf,!1),function(a,b){a.preventDefault(),b>0?$cfs.trigger(cf_e("prev",conf),[g]):$cfs.trigger(cf_e("next",conf),[h])}),crsl.mousewheel=!0}if(opts.auto.play&&$cfs.trigger(cf_e("play",conf),opts.auto.delay),crsl.upDateOnWindowResize){var i=function(){$cfs.trigger(cf_e("finish",conf)),opts.auto.pauseOnResize&&!crsl.isPaused&&$cfs.trigger(cf_e("play",conf)),sz_resetMargin($cfs.children(),opts),$cfs.trigger(cf_e("updateSizes",conf))},j=$(window),k=null;if($.debounce&&"debounce"==conf.onWindowResize)k=$.debounce(200,i);else if($.throttle&&"throttle"==conf.onWindowResize)k=$.throttle(300,i);else{var l=0,m=0;k=function(){var a=j.width(),b=j.height();(a!=l||b!=m)&&(i(),l=a,m=b)}}j.bind(cf_e("resize",conf,!1,!0,!0),k)}},FN._unbind_buttons=function(){var b=(cf_e("",conf),cf_e("",conf,!1));ns3=cf_e("",conf,!1,!0,!0),$(document).unbind(ns3),$(window).unbind(ns3),$wrp.unbind(b),opts.auto.button&&opts.auto.button.unbind(b),opts.prev.button&&opts.prev.button.unbind(b),opts.next.button&&opts.next.button.unbind(b),opts.pagination.container&&(opts.pagination.container.unbind(b),opts.pagination.anchorBuilder&&opts.pagination.container.children().remove()),crsl.swipe&&($cfs.swipe("destroy"),$wrp.css("cursor","default"),crsl.swipe=!1),crsl.mousewheel&&(crsl.mousewheel=!1),nv_showNavi(opts,"hide",conf),nv_enableNavi(opts,"removeClass",conf)},is_boolean(configs)&&(configs={debug:configs});var crsl={direction:"next",isPaused:!0,isScrolling:!1,isStopped:!1,mousewheel:!1,swipe:!1},itms={total:$cfs.children().length,first:0},tmrs={auto:null,progress:null,startTime:getTime(),timePassed:0},scrl={isStopped:!1,duration:0,startTime:0,easing:"",anims:[]},clbk={onBefore:[],onAfter:[]},queu=[],conf=$.extend(!0,{},$.fn.carouFredSel.configs,configs),opts={},opts_orig=$.extend(!0,{},options),$wrp="parent"==conf.wrapper?$cfs.parent():$cfs.wrap("<"+conf.wrapper.element+' class="'+conf.wrapper.classname+'" />').parent();if(conf.selector=$cfs.selector,conf.serialNumber=$.fn.carouFredSel.serialNumber++,conf.transition=conf.transition&&$.fn.transition?"transition":"animate",FN._init(opts_orig,!0,starting_position),FN._build(),FN._bind_events(),FN._bind_buttons(),is_array(opts.items.start))var start_arr=opts.items.start;else{var start_arr=[];0!=opts.items.start&&start_arr.push(opts.items.start)}if(opts.cookie&&start_arr.unshift(parseInt(cf_getCookie(opts.cookie),10)),start_arr.length>0)for(var a=0,l=start_arr.length;l>a;a++){var s=start_arr[a];if(0!=s){if(s===!0){if(s=window.location.hash,1>s.length)continue}else"random"===s&&(s=Math.floor(Math.random()*itms.total));if($cfs.triggerHandler(cf_e("slideTo",conf),[s,0,!0,{fx:"none"}]))break}}var siz=sz_setSizes($cfs,opts),itm=gi_getCurrentItems($cfs.children(),opts);return opts.onCreate&&opts.onCreate.call($tt0,{width:siz.width,height:siz.height,items:itm}),$cfs.trigger(cf_e("updatePageStatus",conf),[!0,siz]),$cfs.trigger(cf_e("linkAnchors",conf)),conf.debug&&$cfs.trigger(cf_e("debug",conf)),$cfs},$.fn.carouFredSel.serialNumber=1,$.fn.carouFredSel.defaults={synchronise:!1,infinite:!0,circular:!0,responsive:!1,direction:"left",items:{start:0},scroll:{easing:"swing",duration:500,pauseOnHover:!1,event:"click",queue:!1}},$.fn.carouFredSel.configs={debug:!1,transition:!1,onWindowResize:"throttle",events:{prefix:"",namespace:"cfs"},wrapper:{element:"div",classname:"caroufredsel_wrapper"},classnames:{}},$.fn.carouFredSel.pageAnchorBuilder=function(a){return'<a href="#"><span>'+a+"</span></a>"},$.fn.carouFredSel.progressbarUpdater=function(a){$(this).css("width",a+"%")},$.fn.carouFredSel.cookie={get:function(a){a+="=";for(var b=document.cookie.split(";"),c=0,d=b.length;d>c;c++){for(var e=b[c];" "==e.charAt(0);)e=e.slice(1);if(0==e.indexOf(a))return e.slice(a.length)}return 0},set:function(a,b,c){var d="";if(c){var e=new Date;e.setTime(e.getTime()+1e3*60*60*24*c),d="; expires="+e.toGMTString()}document.cookie=a+"="+b+d+"; path=/"},remove:function(a){$.fn.carouFredSel.cookie.set(a,"",-1)}},$.extend($.easing,{quadratic:function(a){var b=a*a;return a*(-b*a+4*b-6*a+4)},cubic:function(a){return a*(4*a*a-9*a+6)},elastic:function(a){var b=a*a;return a*(33*b*b-106*b*a+126*b-67*a+15)}}))})(jQuery);



// Generated by CoffeeScript 1.6.2
/*
 jQuery Waypoints - v2.0.2
 Copyright (c) 2011-2013 Caleb Troughton
 Dual licensed under the MIT license and GPL license.
 https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
 */
(function(){var t=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++){if(e in this&&this[e]===t)return e}return-1},e=[].slice;(function(t,e){if(typeof define==="function"&&define.amd){return define("waypoints",["jquery"],function(n){return e(n,t)})}else{return e(t.jQuery,t)}})(this,function(n,r){var i,o,l,s,f,u,a,c,h,d,p,y,v,w,g,m;i=n(r);c=t.call(r,"ontouchstart")>=0;s={horizontal:{},vertical:{}};f=1;a={};u="waypoints-context-id";p="resize.waypoints";y="scroll.waypoints";v=1;w="waypoints-waypoint-ids";g="waypoint";m="waypoints";o=function(){function t(t){var e=this;this.$element=t;this.element=t[0];this.didResize=false;this.didScroll=false;this.id="context"+f++;this.oldScroll={x:t.scrollLeft(),y:t.scrollTop()};this.waypoints={horizontal:{},vertical:{}};t.data(u,this.id);a[this.id]=this;t.bind(y,function(){var t;if(!(e.didScroll||c)){e.didScroll=true;t=function(){e.doScroll();return e.didScroll=false};return r.setTimeout(t,n[m].settings.scrollThrottle)}});t.bind(p,function(){var t;if(!e.didResize){e.didResize=true;t=function(){n[m]("refresh");return e.didResize=false};return r.setTimeout(t,n[m].settings.resizeThrottle)}})}t.prototype.doScroll=function(){var t,e=this;t={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};if(c&&(!t.vertical.oldScroll||!t.vertical.newScroll)){n[m]("refresh")}n.each(t,function(t,r){var i,o,l;l=[];o=r.newScroll>r.oldScroll;i=o?r.forward:r.backward;n.each(e.waypoints[t],function(t,e){var n,i;if(r.oldScroll<(n=e.offset)&&n<=r.newScroll){return l.push(e)}else if(r.newScroll<(i=e.offset)&&i<=r.oldScroll){return l.push(e)}});l.sort(function(t,e){return t.offset-e.offset});if(!o){l.reverse()}return n.each(l,function(t,e){if(e.options.continuous||t===l.length-1){return e.trigger([i])}})});return this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}};t.prototype.refresh=function(){var t,e,r,i=this;r=n.isWindow(this.element);e=this.$element.offset();this.doScroll();t={horizontal:{contextOffset:r?0:e.left,contextScroll:r?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:r?0:e.top,contextScroll:r?0:this.oldScroll.y,contextDimension:r?n[m]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};return n.each(t,function(t,e){return n.each(i.waypoints[t],function(t,r){var i,o,l,s,f;i=r.options.offset;l=r.offset;o=n.isWindow(r.element)?0:r.$element.offset()[e.offsetProp];if(n.isFunction(i)){i=i.apply(r.element)}else if(typeof i==="string"){i=parseFloat(i);if(r.options.offset.indexOf("%")>-1){i=Math.ceil(e.contextDimension*i/100)}}r.offset=o-e.contextOffset+e.contextScroll-i;if(r.options.onlyOnScroll&&l!=null||!r.enabled){return}if(l!==null&&l<(s=e.oldScroll)&&s<=r.offset){return r.trigger([e.backward])}else if(l!==null&&l>(f=e.oldScroll)&&f>=r.offset){return r.trigger([e.forward])}else if(l===null&&e.oldScroll>=r.offset){return r.trigger([e.forward])}})})};t.prototype.checkEmpty=function(){if(n.isEmptyObject(this.waypoints.horizontal)&&n.isEmptyObject(this.waypoints.vertical)){this.$element.unbind([p,y].join(" "));return delete a[this.id]}};return t}();l=function(){function t(t,e,r){var i,o;r=n.extend({},n.fn[g].defaults,r);if(r.offset==="bottom-in-view"){r.offset=function(){var t;t=n[m]("viewportHeight");if(!n.isWindow(e.element)){t=e.$element.height()}return t-n(this).outerHeight()}}this.$element=t;this.element=t[0];this.axis=r.horizontal?"horizontal":"vertical";this.callback=r.handler;this.context=e;this.enabled=r.enabled;this.id="waypoints"+v++;this.offset=null;this.options=r;e.waypoints[this.axis][this.id]=this;s[this.axis][this.id]=this;i=(o=t.data(w))!=null?o:[];i.push(this.id);t.data(w,i)}t.prototype.trigger=function(t){if(!this.enabled){return}if(this.callback!=null){this.callback.apply(this.element,t)}if(this.options.triggerOnce){return this.destroy()}};t.prototype.disable=function(){return this.enabled=false};t.prototype.enable=function(){this.context.refresh();return this.enabled=true};t.prototype.destroy=function(){delete s[this.axis][this.id];delete this.context.waypoints[this.axis][this.id];return this.context.checkEmpty()};t.getWaypointsByElement=function(t){var e,r;r=n(t).data(w);if(!r){return[]}e=n.extend({},s.horizontal,s.vertical);return n.map(r,function(t){return e[t]})};return t}();d={init:function(t,e){var r;if(e==null){e={}}if((r=e.handler)==null){e.handler=t}this.each(function(){var t,r,i,s;t=n(this);i=(s=e.context)!=null?s:n.fn[g].defaults.context;if(!n.isWindow(i)){i=t.closest(i)}i=n(i);r=a[i.data(u)];if(!r){r=new o(i)}return new l(t,r,e)});n[m]("refresh");return this},disable:function(){return d._invoke(this,"disable")},enable:function(){return d._invoke(this,"enable")},destroy:function(){return d._invoke(this,"destroy")},prev:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e>0){return t.push(n[e-1])}})},next:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e<n.length-1){return t.push(n[e+1])}})},_traverse:function(t,e,i){var o,l;if(t==null){t="vertical"}if(e==null){e=r}l=h.aggregate(e);o=[];this.each(function(){var e;e=n.inArray(this,l[t]);return i(o,e,l[t])});return this.pushStack(o)},_invoke:function(t,e){t.each(function(){var t;t=l.getWaypointsByElement(this);return n.each(t,function(t,n){n[e]();return true})});return this}};n.fn[g]=function(){var t,r;r=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(d[r]){return d[r].apply(this,t)}else if(n.isFunction(r)){return d.init.apply(this,arguments)}else if(n.isPlainObject(r)){return d.init.apply(this,[null,r])}else if(!r){return n.error("jQuery Waypoints needs a callback function or handler option.")}else{return n.error("The "+r+" method does not exist in jQuery Waypoints.")}};n.fn[g].defaults={context:r,continuous:true,enabled:true,horizontal:false,offset:0,triggerOnce:false};h={refresh:function(){return n.each(a,function(t,e){return e.refresh()})},viewportHeight:function(){var t;return(t=r.innerHeight)!=null?t:i.height()},aggregate:function(t){var e,r,i;e=s;if(t){e=(i=a[n(t).data(u)])!=null?i.waypoints:void 0}if(!e){return[]}r={horizontal:[],vertical:[]};n.each(r,function(t,i){n.each(e[t],function(t,e){return i.push(e)});i.sort(function(t,e){return t.offset-e.offset});r[t]=n.map(i,function(t){return t.element});return r[t]=n.unique(r[t])});return r},above:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset<=t.oldScroll.y})},below:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset>t.oldScroll.y})},left:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset<=t.oldScroll.x})},right:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset>t.oldScroll.x})},enable:function(){return h._invoke("enable")},disable:function(){return h._invoke("disable")},destroy:function(){return h._invoke("destroy")},extendFn:function(t,e){return d[t]=e},_invoke:function(t){var e;e=n.extend({},s.vertical,s.horizontal);return n.each(e,function(e,n){n[t]();return true})},_filter:function(t,e,r){var i,o;i=a[n(t).data(u)];if(!i){return[]}o=[];n.each(i.waypoints[e],function(t,e){if(r(i,e)){return o.push(e)}});o.sort(function(t,e){return t.offset-e.offset});return n.map(o,function(t){return t.element})}};n[m]=function(){var t,n;n=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(h[n]){return h[n].apply(null,t)}else{return h.aggregate.call(null,n)}};n[m].settings={resizeThrottle:100,scrollThrottle:30};return i.load(function(){return n[m]("refresh")})})}).call(this);

/*
 * Superfish v1.4.8 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 */

!function(s){"use strict";s.fn.superfish=function(a){var i=s.fn.superfish,o=i.c,e=s(['<span class="',o.arrowClass,'"> &#187;</span>'].join("")),n=function(){var a=s(this),i=l(a);clearTimeout(i.sfTimer),a.showSuperfishUl().siblings().hideSuperfishUl()},t=function(){var a=s(this),o=l(a),e=i.op;clearTimeout(o.sfTimer),o.sfTimer=setTimeout(function(){e.retainPath=s.inArray(a[0],e.$path)>-1,a.hideSuperfishUl(),e.$path.length&&a.parents(["li.",e.hoverClass].join("")).length<1&&n.call(e.$path)},e.delay)},l=function(s){var a=s.parents(["ul.",o.menuClass,":first"].join(""))[0];return i.op=i.o[a.serial],a},r=function(s){s.addClass(o.anchorClass).append(e.clone())};return this.each(function(){var e=this.serial=i.o.length,l=s.extend({},i.defaults,a);l.$path=s("li."+l.pathClass,this).slice(0,l.pathLevels).each(function(){s(this).addClass([l.hoverClass,o.bcClass].join(" ")).filter("li:has(ul)").removeClass(l.pathClass)}),i.o[e]=i.op=l,s("li:has(ul)",this)[s.fn.hoverIntent&&!l.disableHI?"hoverIntent":"hover"](n,t).each(function(){l.autoArrows&&r(s(">a:first-child",this))}).not("."+o.bcClass).hideSuperfishUl();var h=s("a",this);h.each(function(s){var a=h.eq(s).parents("li");h.eq(s).focus(function(){n.call(a)}).blur(function(){t.call(a)})}),l.onInit.call(this)}).each(function(){var a=[o.menuClass];!i.op.dropShadows||s.browser.msie&&s.browser.version<7||a.push(o.shadowClass),s(this).addClass(a.join(" "))})};var a=s.fn.superfish;a.o=[],a.op={},a.IE7fix=function(){var i=a.op;s.browser.msie&&s.browser.version>6&&i.dropShadows&&void 0!=i.animation.opacity&&this.toggleClass(a.c.shadowClass+"-off")},a.c={bcClass:"sf-breadcrumb",menuClass:"sf-js-enabled",anchorClass:"sf-with-ul",arrowClass:"sf-sub-indicator",shadowClass:"sf-shadow"},a.defaults={hoverClass:"sfHover",pathClass:"overideThisToUse",pathLevels:1,delay:1200,animation:{opacity:"show"},speed:"normal",autoArrows:!1,dropShadows:!0,disableHI:!1,onInit:function(){},onBeforeShow:function(){},onShow:function(){},onHide:function(){}},s.fn.extend({hideSuperfishUl:function(){var i=a.op,o=i.retainPath===!0?i.$path:"";i.retainPath=!1;var e=s(["li.",i.hoverClass].join(""),this).add(this).not(o).removeClass(i.hoverClass).find(">ul").hide().css("visibility","hidden");return i.onHide.call(e),this},showSuperfishUl:function(){var s=a.op,i=(a.c.shadowClass+"-off",this.addClass(s.hoverClass).find(">ul:hidden").css("visibility","visible"));return a.IE7fix.call(i),s.onBeforeShow.call(i),i.animate(s.animation,s.speed,function(){a.IE7fix.call(i),s.onShow.call(i)}),this}})}(jQuery);



    /* ------------------------------------------------------------------------

  Fitsvid

     ------------------------------------------------------------------------- */
!function(t){"use strict";t.fn.fitVids=function(e){var i={customSelector:null,ignore:null};if(!document.getElementById("fit-vids-style")){var r=document.head||document.getElementsByTagName("head")[0],a=".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}",d=document.createElement("div");d.innerHTML='<p>x</p><style id="fit-vids-style">'+a+"</style>",r.appendChild(d.childNodes[1])}return e&&t.extend(i,e),this.each(function(){var e=['iframe[src*="player.vimeo.com"]','iframe[src*="youtube.com"]','iframe[src*="youtube-nocookie.com"]','iframe[src*="kickstarter.com"][src*="video.html"]',"object","embed"];i.customSelector&&e.push(i.customSelector);var r=".fitvidsignore";i.ignore&&(r=r+", "+i.ignore);var a=t(this).find(e.join(","));a=a.not("object object"),a=a.not(r),a.each(function(e){var i=t(this);if(!(i.parents(r).length>0||"embed"===this.tagName.toLowerCase()&&i.parent("object").length||i.parent(".fluid-width-video-wrapper").length)){i.css("height")||i.css("width")||!isNaN(i.attr("height"))&&!isNaN(i.attr("width"))||(i.attr("height",9),i.attr("width",16));var a="object"===this.tagName.toLowerCase()||i.attr("height")&&!isNaN(parseInt(i.attr("height"),10))?parseInt(i.attr("height"),10):i.height(),d=isNaN(parseInt(i.attr("width"),10))?i.width():parseInt(i.attr("width"),10),o=a/d;if(!i.attr("id")){var h="fitvid"+e;i.attr("id",h)}i.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top",100*o+"%"),i.removeAttr("height").removeAttr("width")}})})}}(window.jQuery||window.Zepto);

/* ------------------------------------------------------------------------

 Class: prettyPhoto

 Use: Lightbox clone for jQuery

 Author: Stephane Caron (http://www.no-margin-for-errors.com)

 Version: 3.1.5

 ------------------------------------------------------------------------- */

(function(e){function t(){var e=location.href;hashtag=e.indexOf("#prettyPhoto")!==-1?decodeURI(e.substring(e.indexOf("#prettyPhoto")+1,e.length)):false;return hashtag}function n(){if(typeof theRel=="undefined")return;location.hash=theRel+"/"+rel_index+"/"}function r(){if(location.href.indexOf("#prettyPhoto")!==-1)location.hash="prettyPhoto"}function i(e,t){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var n="[\\?&]"+e+"=([^&#]*)";var r=new RegExp(n);var i=r.exec(t);return i==null?"":i[1]}e.prettyPhoto={version:"3.1.5"};e.fn.prettyPhoto=function(s){function g(){e(".pp_loaderIcon").hide();projectedTop=scroll_pos["scrollTop"]+(d/2-a["containerHeight"]/2);if(projectedTop<0)projectedTop=0;$ppt.fadeTo(settings.animation_speed,1);$pp_pic_holder.find(".pp_content").animate({height:a["contentHeight"],width:a["contentWidth"]},settings.animation_speed);$pp_pic_holder.animate({top:projectedTop,left:v/2-a["containerWidth"]/2<0?0:v/2-a["containerWidth"]/2,width:a["containerWidth"]},settings.animation_speed,function(){$pp_pic_holder.find(".pp_hoverContainer,#fullResImage").height(a["height"]).width(a["width"]);$pp_pic_holder.find(".pp_fade").fadeIn(settings.animation_speed);if(isSet&&S(pp_images[set_position])=="image"){$pp_pic_holder.find(".pp_hoverContainer").show()}else{$pp_pic_holder.find(".pp_hoverContainer").hide()}if(settings.allow_expand){if(a["resized"]){e("a.pp_expand,a.pp_contract").show()}else{e("a.pp_expand").hide()}}if(settings.autoplay_slideshow&&!m&&!f)e.prettyPhoto.startSlideshow();settings.changepicturecallback();f=true});C();s.ajaxcallback()}function y(t){$pp_pic_holder.find("#pp_full_res object,#pp_full_res embed").css("visibility","hidden");$pp_pic_holder.find(".pp_fade").fadeOut(settings.animation_speed,function(){e(".pp_loaderIcon").show();t()})}function b(t){t>1?e(".pp_nav").show():e(".pp_nav").hide()}function w(e,t){resized=false;E(e,t);imageWidth=e,imageHeight=t;if((p>v||h>d)&&doresize&&settings.allow_resize&&!u){resized=true,fitting=false;while(!fitting){if(p>v){imageWidth=v-200;imageHeight=t/e*imageWidth}else if(h>d){imageHeight=d-200;imageWidth=e/t*imageHeight}else{fitting=true}h=imageHeight,p=imageWidth}if(p>v||h>d){w(p,h)}E(imageWidth,imageHeight)}return{width:Math.floor(imageWidth),height:Math.floor(imageHeight),containerHeight:Math.floor(h),containerWidth:Math.floor(p)+settings.horizontal_padding*2,contentHeight:Math.floor(l),contentWidth:Math.floor(c),resized:resized}}function E(t,n){t=parseFloat(t);n=parseFloat(n);$pp_details=$pp_pic_holder.find(".pp_details");$pp_details.width(t);detailsHeight=parseFloat($pp_details.css("marginTop"))+parseFloat($pp_details.css("marginBottom"));$pp_details=$pp_details.clone().addClass(settings.theme).width(t).appendTo(e("body")).css({position:"absolute",top:-1e4});detailsHeight+=$pp_details.height();detailsHeight=detailsHeight<=34?36:detailsHeight;$pp_details.remove();$pp_title=$pp_pic_holder.find(".ppt");$pp_title.width(t);titleHeight=parseFloat($pp_title.css("marginTop"))+parseFloat($pp_title.css("marginBottom"));$pp_title=$pp_title.clone().appendTo(e("body")).css({position:"absolute",top:-1e4});titleHeight+=$pp_title.height();$pp_title.remove();l=n+detailsHeight;c=t;h=l+titleHeight+$pp_pic_holder.find(".pp_top").height()+$pp_pic_holder.find(".pp_bottom").height();p=t}function S(e){if(e.match(/youtube\.com\/watch/i)||e.match(/youtu\.be/i)){return"youtube"}else if(e.match(/vimeo\.com/i)){return"vimeo"}else if(e.match(/\b.mov\b/i)){return"quicktime"}else if(e.match(/\b.swf\b/i)){return"flash"}else if(e.match(/\biframe=true\b/i)){return"iframe"}else if(e.match(/\bajax=true\b/i)){return"ajax"}else if(e.match(/\bcustom=true\b/i)){return"custom"}else if(e.substr(0,1)=="#"){return"inline"}else{return"image"}}function x(){if(doresize&&typeof $pp_pic_holder!="undefined"){scroll_pos=T();contentHeight=$pp_pic_holder.height(),contentwidth=$pp_pic_holder.width();projectedTop=d/2+scroll_pos["scrollTop"]-contentHeight/2;if(projectedTop<0)projectedTop=0;if(contentHeight>d)return;$pp_pic_holder.css({top:projectedTop,left:v/2+scroll_pos["scrollLeft"]-contentwidth/2})}}function T(){if(self.pageYOffset){return{scrollTop:self.pageYOffset,scrollLeft:self.pageXOffset}}else if(document.documentElement&&document.documentElement.scrollTop){return{scrollTop:document.documentElement.scrollTop,scrollLeft:document.documentElement.scrollLeft}}else if(document.body){return{scrollTop:document.body.scrollTop,scrollLeft:document.body.scrollLeft}}}function N(){d=e(window).height(),v=e(window).width();if(typeof $pp_overlay!="undefined")$pp_overlay.height(e(document).height()).width(v)}function C(){if(isSet&&settings.overlay_gallery&&S(pp_images[set_position])=="image"){itemWidth=52+5;navWidth=settings.theme=="facebook"||settings.theme=="pp_default"?50:30;itemsPerPage=Math.floor((a["containerWidth"]-100-navWidth)/itemWidth);itemsPerPage=itemsPerPage<pp_images.length?itemsPerPage:pp_images.length;totalPage=Math.ceil(pp_images.length/itemsPerPage)-1;if(totalPage==0){navWidth=0;$pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").hide()}else{$pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").show()}galleryWidth=itemsPerPage*itemWidth;fullGalleryWidth=pp_images.length*itemWidth;$pp_gallery.css("margin-left",-(galleryWidth/2+navWidth/2)).find("div:first").width(galleryWidth+5).find("ul").width(fullGalleryWidth).find("li.selected").removeClass("selected");goToPage=Math.floor(set_position/itemsPerPage)<totalPage?Math.floor(set_position/itemsPerPage):totalPage;e.prettyPhoto.changeGalleryPage(goToPage);$pp_gallery_li.filter(":eq("+set_position+")").addClass("selected")}else{$pp_pic_holder.find(".pp_content").unbind("mouseenter mouseleave")}}function k(t){if(settings.social_tools)facebook_like_link=settings.social_tools.replace("{location_href}",encodeURIComponent(location.href));settings.markup=settings.markup.replace("{pp_social}","");e("body").append(settings.markup);$pp_pic_holder=e(".pp_pic_holder"),$ppt=e(".ppt"),$pp_overlay=e("div.pp_overlay");if(isSet&&settings.overlay_gallery){currentGalleryPage=0;toInject="";for(var n=0;n<pp_images.length;n++){if(!pp_images[n].match(/\b(jpg|jpeg|png|gif)\b/gi)){classname="default";img_src=""}else{classname="";img_src=pp_images[n]}toInject+="<li class='"+classname+"'><a href='#'><img src='"+img_src+"' width='50' alt='' /></a></li>"}toInject=settings.gallery_markup.replace(/{gallery}/g,toInject);$pp_pic_holder.find("#pp_full_res").after(toInject);$pp_gallery=e(".pp_pic_holder .pp_gallery"),$pp_gallery_li=$pp_gallery.find("li");$pp_gallery.find(".pp_arrow_next").click(function(){e.prettyPhoto.changeGalleryPage("next");e.prettyPhoto.stopSlideshow();return false});$pp_gallery.find(".pp_arrow_previous").click(function(){e.prettyPhoto.changeGalleryPage("previous");e.prettyPhoto.stopSlideshow();return false});$pp_pic_holder.find(".pp_content").hover(function(){$pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeIn()},function(){$pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeOut()});itemWidth=52+5;$pp_gallery_li.each(function(t){e(this).find("a").click(function(){e.prettyPhoto.changePage(t);e.prettyPhoto.stopSlideshow();return false})})}if(settings.slideshow){$pp_pic_holder.find(".pp_nav").prepend('<a href="#" class="pp_play">Play</a>');$pp_pic_holder.find(".pp_nav .pp_play").click(function(){e.prettyPhoto.startSlideshow();return false})}$pp_pic_holder.attr("class","pp_pic_holder "+settings.theme);$pp_overlay.css({opacity:0,height:e(document).height(),width:e(window).width()}).bind("click",function(){if(!settings.modal)e.prettyPhoto.close()});e("a.pp_close").bind("click",function(){e.prettyPhoto.close();return false});if(settings.allow_expand){e("a.pp_expand").bind("click",function(t){if(e(this).hasClass("pp_expand")){e(this).removeClass("pp_expand").addClass("pp_contract");doresize=false}else{e(this).removeClass("pp_contract").addClass("pp_expand");doresize=true}y(function(){e.prettyPhoto.open()});return false})}$pp_pic_holder.find(".pp_previous, .pp_nav .pp_arrow_previous").bind("click",function(){e.prettyPhoto.changePage("previous");e.prettyPhoto.stopSlideshow();return false});$pp_pic_holder.find(".pp_next, .pp_nav .pp_arrow_next").bind("click",function(){e.prettyPhoto.changePage("next");e.prettyPhoto.stopSlideshow();return false});x()}s=jQuery.extend({hook:"rel",animation_speed:"fast",ajaxcallback:function(){},slideshow:5e3,autoplay_slideshow:false,opacity:.8,show_title:true,allow_resize:true,allow_expand:true,default_width:500,default_height:344,counter_separator_label:"/",theme:"pp_default",horizontal_padding:20,hideflash:false,wmode:"opaque",autoplay:true,modal:false,deeplinking:true,overlay_gallery:true,overlay_gallery_max:30,keyboard_shortcuts:true,changepicturecallback:function(){},callback:function(){},ie6_fallback:true,markup:'<div class="pp_pic_holder"> 						<div class="ppt">?</div> 						<div class="pp_top"> 							<div class="pp_left"></div> 							<div class="pp_middle"></div> 							<div class="pp_right"></div> 						</div> 						<div class="pp_content_container"> 							<div class="pp_left"> 							<div class="pp_right"> 								<div class="pp_content"> 									<div class="pp_loaderIcon"></div> 									<div class="pp_fade"> 										<a href="#" class="pp_expand" title="Expand the image">Expand</a> 										<div class="pp_hoverContainer"> 											<a class="pp_next" href="#">next</a> 											<a class="pp_previous" href="#">previous</a> 										</div> 										<div id="pp_full_res"></div> 										<div class="pp_details"> 											<div class="pp_nav"> 												<a href="#" class="pp_arrow_previous">Previous</a> 												<p class="currentTextHolder">0/0</p> 												<a href="#" class="pp_arrow_next">Next</a> 											</div> 											<p class="pp_description"></p> 											<div class="pp_social">{pp_social}</div> 											<a class="pp_close" href="#">Close</a> 										</div> 									</div> 								</div> 							</div> 							</div> 						</div> 						<div class="pp_bottom"> 							<div class="pp_left"></div> 							<div class="pp_middle"></div> 							<div class="pp_right"></div> 						</div> 					</div> 					<div class="pp_overlay"></div>',gallery_markup:'<div class="pp_gallery"> 								<a href="#" class="pp_arrow_previous">Previous</a> 								<div> 									<ul> 										{gallery} 									</ul> 								</div> 								<a href="#" class="pp_arrow_next">Next</a> 							</div>',image_markup:'<img id="fullResImage" src="{path}" />',flash_markup:'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',quicktime_markup:'<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',iframe_markup:'<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>',inline_markup:'<div class="pp_inline">{content}</div>',custom_markup:"",social_tools:'<div class="twitter"><a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></div><div class="facebook"><iframe src="//www.facebook.com/plugins/like.php?locale=en_US&href={location_href}&layout=button_count&show_faces=true&width=500&action=like&font&colorscheme=light&height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:23px;" allowTransparency="true"></iframe></div>'},s);var o=this,u=false,a,f,l,c,h,p,d=e(window).height(),v=e(window).width(),m;doresize=true,scroll_pos=T();e(window).unbind("resize.prettyphoto").bind("resize.prettyphoto",function(){x();N()});if(s.keyboard_shortcuts){e(document).unbind("keydown.prettyphoto").bind("keydown.prettyphoto",function(t){if(typeof $pp_pic_holder!="undefined"){if($pp_pic_holder.is(":visible")){switch(t.keyCode){case 37:e.prettyPhoto.changePage("previous");t.preventDefault();break;case 39:e.prettyPhoto.changePage("next");t.preventDefault();break;case 27:if(!settings.modal)e.prettyPhoto.close();t.preventDefault();break}}}})}e.prettyPhoto.initialize=function(){settings=s;if(settings.theme=="pp_default")settings.horizontal_padding=16;theRel=e(this).attr(settings.hook);galleryRegExp=/\[(?:.*)\]/;isSet=galleryRegExp.exec(theRel)?true:false;pp_images=isSet?jQuery.map(o,function(t,n){if(e(t).attr(settings.hook).indexOf(theRel)!=-1)return e(t).attr("href")}):e.makeArray(e(this).attr("href"));pp_titles=isSet?jQuery.map(o,function(t,n){if(e(t).attr(settings.hook).indexOf(theRel)!=-1)return e(t).find("img").attr("alt")?e(t).find("img").attr("alt"):""}):e.makeArray(e(this).find("img").attr("alt"));pp_descriptions=isSet?jQuery.map(o,function(t,n){if(e(t).attr(settings.hook).indexOf(theRel)!=-1)return e(t).attr("title")?e(t).attr("title"):""}):e.makeArray(e(this).attr("title"));if(pp_images.length>settings.overlay_gallery_max)settings.overlay_gallery=false;set_position=jQuery.inArray(e(this).attr("href"),pp_images);rel_index=isSet?set_position:e("a["+settings.hook+"^='"+theRel+"']").index(e(this));k(this);if(settings.allow_resize)e(window).bind("scroll.prettyphoto",function(){x()});e.prettyPhoto.open();return false};e.prettyPhoto.open=function(t){if(typeof settings=="undefined"){settings=s;pp_images=e.makeArray(arguments[0]);pp_titles=arguments[1]?e.makeArray(arguments[1]):e.makeArray("");pp_descriptions=arguments[2]?e.makeArray(arguments[2]):e.makeArray("");isSet=pp_images.length>1?true:false;set_position=arguments[3]?arguments[3]:0;k(t.target)}if(settings.hideflash)e("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css("visibility","hidden");b(e(pp_images).size());e(".pp_loaderIcon").show();if(settings.deeplinking)n();if(settings.social_tools){facebook_like_link=settings.social_tools.replace("{location_href}",encodeURIComponent(location.href));$pp_pic_holder.find(".pp_social").html(facebook_like_link)}if($ppt.is(":hidden"))$ppt.css("opacity",0).show();$pp_overlay.show().fadeTo(settings.animation_speed,settings.opacity);$pp_pic_holder.find(".currentTextHolder").text(set_position+1+settings.counter_separator_label+e(pp_images).size());if(typeof pp_descriptions[set_position]!="undefined"&&pp_descriptions[set_position]!=""){$pp_pic_holder.find(".pp_description").show().html(unescape(pp_descriptions[set_position]))}else{$pp_pic_holder.find(".pp_description").hide()}movie_width=parseFloat(i("width",pp_images[set_position]))?i("width",pp_images[set_position]):settings.default_width.toString();movie_height=parseFloat(i("height",pp_images[set_position]))?i("height",pp_images[set_position]):settings.default_height.toString();u=false;if(movie_height.indexOf("%")!=-1){movie_height=parseFloat(e(window).height()*parseFloat(movie_height)/100-150);u=true}if(movie_width.indexOf("%")!=-1){movie_width=parseFloat(e(window).width()*parseFloat(movie_width)/100-150);u=true}$pp_pic_holder.fadeIn(function(){settings.show_title&&pp_titles[set_position]!=""&&typeof pp_titles[set_position]!="undefined"?$ppt.html(unescape(pp_titles[set_position])):$ppt.html("?");imgPreloader="";skipInjection=false;switch(S(pp_images[set_position])){case"image":imgPreloader=new Image;nextImage=new Image;if(isSet&&set_position<e(pp_images).size()-1)nextImage.src=pp_images[set_position+1];prevImage=new Image;if(isSet&&pp_images[set_position-1])prevImage.src=pp_images[set_position-1];$pp_pic_holder.find("#pp_full_res")[0].innerHTML=settings.image_markup.replace(/{path}/g,pp_images[set_position]);imgPreloader.onload=function(){a=w(imgPreloader.width,imgPreloader.height);g()};imgPreloader.onerror=function(){alert("Image cannot be loaded. Make sure the path is correct and image exist.");e.prettyPhoto.close()};imgPreloader.src=pp_images[set_position];break;case"youtube":a=w(movie_width,movie_height);movie_id=i("v",pp_images[set_position]);if(movie_id==""){movie_id=pp_images[set_position].split("youtu.be/");movie_id=movie_id[1];if(movie_id.indexOf("?")>0)movie_id=movie_id.substr(0,movie_id.indexOf("?"));if(movie_id.indexOf("&")>0)movie_id=movie_id.substr(0,movie_id.indexOf("&"))}movie="http://www.youtube.com/embed/"+movie_id;i("rel",pp_images[set_position])?movie+="?rel="+i("rel",pp_images[set_position]):movie+="?rel=1";if(settings.autoplay)movie+="&autoplay=1";toInject=settings.iframe_markup.replace(/{width}/g,a["width"]).replace(/{height}/g,a["height"]).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,movie);break;case"vimeo":a=w(movie_width,movie_height);movie_id=pp_images[set_position];var t=/http(s?):\/\/(www\.)?vimeo.com\/(\d+)/;var n=movie_id.match(t);movie="http://player.vimeo.com/video/"+n[3]+"?title=0&byline=0&portrait=0";if(settings.autoplay)movie+="&autoplay=1;";vimeo_width=a["width"]+"/embed/?moog_width="+a["width"];toInject=settings.iframe_markup.replace(/{width}/g,vimeo_width).replace(/{height}/g,a["height"]).replace(/{path}/g,movie);break;case"quicktime":a=w(movie_width,movie_height);a["height"]+=15;a["contentHeight"]+=15;a["containerHeight"]+=15;toInject=settings.quicktime_markup.replace(/{width}/g,a["width"]).replace(/{height}/g,a["height"]).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,pp_images[set_position]).replace(/{autoplay}/g,settings.autoplay);break;case"flash":a=w(movie_width,movie_height);flash_vars=pp_images[set_position];flash_vars=flash_vars.substring(pp_images[set_position].indexOf("flashvars")+10,pp_images[set_position].length);filename=pp_images[set_position];filename=filename.substring(0,filename.indexOf("?"));toInject=settings.flash_markup.replace(/{width}/g,a["width"]).replace(/{height}/g,a["height"]).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,filename+"?"+flash_vars);break;case"iframe":a=w(movie_width,movie_height);frame_url=pp_images[set_position];frame_url=frame_url.substr(0,frame_url.indexOf("iframe")-1);toInject=settings.iframe_markup.replace(/{width}/g,a["width"]).replace(/{height}/g,a["height"]).replace(/{path}/g,frame_url);break;case"ajax":doresize=false;a=w(movie_width,movie_height);doresize=true;skipInjection=true;e.get(pp_images[set_position],function(e){toInject=settings.inline_markup.replace(/{content}/g,e);$pp_pic_holder.find("#pp_full_res")[0].innerHTML=toInject;g()});break;case"custom":a=w(movie_width,movie_height);toInject=settings.custom_markup;break;case"inline":myClone=e(pp_images[set_position]).clone().append('<br clear="all" />').css({width:settings.default_width}).wrapInner('<div id="pp_full_res"><div class="pp_inline"></div></div>').appendTo(e("body")).show();doresize=false;a=w(e(myClone).width(),e(myClone).height());doresize=true;e(myClone).remove();toInject=settings.inline_markup.replace(/{content}/g,e(pp_images[set_position]).html());break}if(!imgPreloader&&!skipInjection){$pp_pic_holder.find("#pp_full_res")[0].innerHTML=toInject;g()}});return false};e.prettyPhoto.changePage=function(t){currentGalleryPage=0;if(t=="previous"){set_position--;if(set_position<0)set_position=e(pp_images).size()-1}else if(t=="next"){set_position++;if(set_position>e(pp_images).size()-1)set_position=0}else{set_position=t}rel_index=set_position;if(!doresize)doresize=true;if(settings.allow_expand){e(".pp_contract").removeClass("pp_contract").addClass("pp_expand")}y(function(){e.prettyPhoto.open()})};e.prettyPhoto.changeGalleryPage=function(e){if(e=="next"){currentGalleryPage++;if(currentGalleryPage>totalPage)currentGalleryPage=0}else if(e=="previous"){currentGalleryPage--;if(currentGalleryPage<0)currentGalleryPage=totalPage}else{currentGalleryPage=e}slide_speed=e=="next"||e=="previous"?settings.animation_speed:0;slide_to=currentGalleryPage*itemsPerPage*itemWidth;$pp_gallery.find("ul").animate({left:-slide_to},slide_speed)};e.prettyPhoto.startSlideshow=function(){if(typeof m=="undefined"){$pp_pic_holder.find(".pp_play").unbind("click").removeClass("pp_play").addClass("pp_pause").click(function(){e.prettyPhoto.stopSlideshow();return false});m=setInterval(e.prettyPhoto.startSlideshow,settings.slideshow)}else{e.prettyPhoto.changePage("next")}};e.prettyPhoto.stopSlideshow=function(){$pp_pic_holder.find(".pp_pause").unbind("click").removeClass("pp_pause").addClass("pp_play").click(function(){e.prettyPhoto.startSlideshow();return false});clearInterval(m);m=undefined};e.prettyPhoto.close=function(){if($pp_overlay.is(":animated"))return;e.prettyPhoto.stopSlideshow();$pp_pic_holder.stop().find("object,embed").css("visibility","hidden");e("div.pp_pic_holder,div.ppt,.pp_fade").fadeOut(settings.animation_speed,function(){e(this).remove()});$pp_overlay.fadeOut(settings.animation_speed,function(){if(settings.hideflash)e("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css("visibility","visible");e(this).remove();e(window).unbind("scroll.prettyphoto");r();settings.callback();doresize=true;f=false;delete settings})};if(!pp_alreadyInitialized&&t()){pp_alreadyInitialized=true;hashIndex=t();hashRel=hashIndex;hashIndex=hashIndex.substring(hashIndex.indexOf("/")+1,hashIndex.length-1);hashRel=hashRel.substring(0,hashRel.indexOf("/"));setTimeout(function(){e("a["+s.hook+"^='"+hashRel+"']:eq("+hashIndex+")").trigger("click")},50)}return this.unbind("click.prettyphoto").bind("click.prettyphoto",e.prettyPhoto.initialize)};})(jQuery);var pp_alreadyInitialized=false
