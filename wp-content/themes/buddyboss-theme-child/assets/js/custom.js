/* This is your custom Javascript */

(function ($) {
    $(document).on('facetwp-loaded', function () {
        // Check if there are no more posts to load
        if (FWP.settings.pager.total_pages <= FWP.settings.pager.page) {
            $('.facetwp-load-more').hide(); // Adjust the selector to match your Load More button
        } else {
            $('.facetwp-load-more').show();
        }
    });
})(jQuery);

// add class on research page nav link
jQuery(document).ready(function () {

    var currentUrl = window.location.href.split('#')[0].split('?')[0].replace(/\/$/, "");
    jQuery('.menu-item').each(function () {
        var link = jQuery(this).find('a');
        if (link.length) {
            var linkHref = link.attr('href').split('#')[0].split('?')[0].replace(/\/$/, "");
            if (linkHref === currentUrl) {
                jQuery(this).addClass('current-menu-item current_page_item');
            }
        }
    });
});


// jQuery(document).ready(function() {
//     // Get the div to move
//     const $divToMove = jQuery("#item-header");

//     // Get the destination div
//     const $destination = jQuery("#item-header-cover-image");

//     // Move the div to the destination
//     $destination.append($divToMove);
//   });
// jQuery(document).ready(function() {
//     const $source = jQuery('#item-header');
//     const $destination = jQuery('#item-header-cover-image');

//     $source.children().appendTo($destination);
//   });

jQuery(document).ready(function () {
    if (jQuery('.groups-header.single-headers:visible').length) {
        jQuery('.groups-header.single-headers:visible').css('display', 'none');
    }
    let h = '<div id="item-header" role="complementary" data-bp-item-id="8" data-bp-item-component="groups" class="groups-header single-headers">';
    h += jQuery('.groups-header.single-headers').html();
    h += '</div>';

    jQuery('.banner-header').html(h);
    jQuery('.groups-header.single-headers:first').css('display', 'block');
    //     var content = jQuery('.group-statistics').html();
    // jQuery('#header-cover-image').append('<div class="group-statistics">'+content+'</div>');
    // jQuery('#item-header-content > .group-statistics').remove();

    var content1 = jQuery('.mo-openid-app-icons').html();
    if (jQuery('.mo-openid-app-icons').length < 1) {
        return false;
    } else {
        jQuery('.bbpress-sidebar').prepend("<div class='mo-openid-app-icons circle social-share-stats status-count'>" + content1 + "</div>");
        jQuery('.bp-generic-meta > .mo-openid-app-icons').remove();
    }

})

jQuery(document).on('click', '.banner-header .group-subscription', function (e) {
    jQuery('.groups-header.single-headers:last').find('.bp-generic-meta').find('.group-subscription').trigger('click');
    setTimeout(() => {
        let x = jQuery('.groups-header.single-headers:last').find('.group-actions-absolute').html();
        jQuery('.groups-header.single-headers:first').find('.group-actions-absolute').html(x);
    }, 1400);
})

jQuery(document).on('click', '.banner-header .groups-meta:first', function (e) {
    e.preventDefault(); // Prevent default action if needed
    // Find the last .groups-header.single-headers and trigger click on .button
    jQuery('.groups-header.single-headers:last').find('.bp-generic-meta:first').find('.button').trigger('click');

    // Use setTimeout to wait for the click action to complete
    setTimeout(() => {
        // Get the HTML content from .group-actions-absolute and set it again
        let x = jQuery('.groups-header.single-headers:last').find('.group-actions-absolute').html();
        jQuery('.groups-header.single-headers:last').find('.group-actions-absolute').html(x);
    }, 1400);
});


jQuery(document).ready(function ($) {
    $('#custom-reply-button').on('click', function () {
        // Simulate a click on the existing reply button
        $('.bbp-topic-reply-link').click();
    });

    $('#custom-subscribe-button').on('click', function () {
        var dataBaloon = jQuery(this).attr("data-balloon");
        var className = jQuery(this).attr("class");
        if (className == "custom-subscribed-btn") {
            var classNamenew = 'custom-subscribe-btn';
        } else {
            var classNamenew = 'custom-subscribed-btn';
        }


        console.log("Test3");

        if (dataBaloon == "Subscribe") {
            var dataBaloonN = "Subscribed";

            var design = '<span><svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none"><path d="M0.209365 9.96607C2.39306 9.96607 4.44587 10.8191 5.98856 12.3706C7.53408 13.9221 8.38498 15.9887 8.38498 18.1886H11.7501C11.7501 11.7988 6.57276 6.60058 0.209365 6.60058V9.96607ZM0.214657 4.00026C7.99728 4.00026 14.3293 10.3668 14.3293 18.1928H17.6944C17.6944 8.51087 9.85253 0.635117 0.214657 0.635117V4.00026ZM4.86814 15.8419C4.86814 17.1289 3.82427 18.1727 2.53734 18.1727C1.25041 18.1727 0.206543 17.1292 0.206543 15.8419C0.206543 14.5543 1.25006 13.5111 2.53699 13.5111C3.82392 13.5111 4.86814 14.5543 4.86814 15.8419Z" fill="#9B9C9F"/></svg></span><span class="btn-txt">Subscribed</span> ';
        } else {
            var dataBaloonN = "Subscribe";
            var design = '<span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M9.87107 18.6886C9.75152 16.5449 8.86447 14.5453 7.3428 13.0177C5.82458 11.491 3.83834 10.6009 1.70937 10.4802V8.11181C7.39889 8.36784 11.9851 12.9708 12.239 18.6886H9.87107ZM1.71466 2.14241C10.6789 2.40422 17.9278 9.68233 18.1872 18.6928H15.8209C15.5634 10.9905 9.38004 4.769 1.71466 4.50873V2.14241ZM5.36814 16.8419C5.36814 17.8527 4.54813 18.6727 3.53734 18.6727C2.5265 18.6727 1.70654 17.853 1.70654 16.8419C1.70654 15.8304 2.5262 15.0111 3.53699 15.0111C4.54798 15.0111 5.36814 15.8306 5.36814 16.8419Z" stroke="#9B9C9F"/></svg></span><span class="btn-txt">Subscribe</span> ';

        }
        // Simulate a click on the existing reply button

        $('.custom-subscribe-btn').empty().append(design);

        $('.' + className).attr('data-balloon', dataBaloonN);
        $('.' + className).addClass(classNamenew);
        $('.' + classNamenew).removeClass(className);
        $('.subscription-toggle').click();
    });

    $('#custom-subscribed-button').on('click', function () {
        var className = jQuery(this).attr("class");
        var dataBaloon = jQuery(this).attr("data-balloon");

        if (className == "custom-subscribed-btn") {
            var classNamenew = 'custom-subscribe-btn';
        } else {
            var classNamenew = 'custom-subscribed-btn';
        }
        console.log("Test1");

        if (dataBaloon == "Subscribe") {
            var dataBaloonN = "Subscribed";

            var design = '<span><svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none"><path d="M0.209365 9.96607C2.39306 9.96607 4.44587 10.8191 5.98856 12.3706C7.53408 13.9221 8.38498 15.9887 8.38498 18.1886H11.7501C11.7501 11.7988 6.57276 6.60058 0.209365 6.60058V9.96607ZM0.214657 4.00026C7.99728 4.00026 14.3293 10.3668 14.3293 18.1928H17.6944C17.6944 8.51087 9.85253 0.635117 0.214657 0.635117V4.00026ZM4.86814 15.8419C4.86814 17.1289 3.82427 18.1727 2.53734 18.1727C1.25041 18.1727 0.206543 17.1292 0.206543 15.8419C0.206543 14.5543 1.25006 13.5111 2.53699 13.5111C3.82392 13.5111 4.86814 14.5543 4.86814 15.8419Z" fill="#9B9C9F"/></svg></span><span class="btn-txt">Subscribed</span> ';
        } else {
            var dataBaloonN = "Subscribe";
            var design = '<span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M9.87107 18.6886C9.75152 16.5449 8.86447 14.5453 7.3428 13.0177C5.82458 11.491 3.83834 10.6009 1.70937 10.4802V8.11181C7.39889 8.36784 11.9851 12.9708 12.239 18.6886H9.87107ZM1.71466 2.14241C10.6789 2.40422 17.9278 9.68233 18.1872 18.6928H15.8209C15.5634 10.9905 9.38004 4.769 1.71466 4.50873V2.14241ZM5.36814 16.8419C5.36814 17.8527 4.54813 18.6727 3.53734 18.6727C2.5265 18.6727 1.70654 17.853 1.70654 16.8419C1.70654 15.8304 2.5262 15.0111 3.53699 15.0111C4.54798 15.0111 5.36814 15.8306 5.36814 16.8419Z" stroke="#9B9C9F"/></svg></span><span class="btn-txt">Subscribe</span> ';

        }
        // Simulate a click on the existing reply button
        $('.' + className).empty().append(design);

        $('.' + className).attr('data-balloon', dataBaloonN);
        $('.' + className).addClass(classNamenew);
        $('.' + classNamenew).removeClass(className);

        $('.subscription-toggle').click();
    });


    $('#custom-favorite-button').on('click', function () {
        var className = jQuery(this).attr("class");
        var dataBaloon = jQuery(this).attr("data-balloon");
        console.log(className);
        if (className == "custom-favorited-btn") {
            var classNamenew = 'custom-favorite-btn';
        } else {
            var classNamenew = 'custom-favorited-btn';
        }

        if (dataBaloon == "Favorited") {
            var dataBaloonN = "Favorite";

            var design = '<span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M9.64934 3.57646L10.0029 3.92419L10.3535 3.57355L10.9585 2.96859C11.9034 2.07742 13.1582 1.58889 14.4572 1.60661C15.7584 1.62435 17.0014 2.14873 17.9222 3.06833C18.843 3.98794 19.369 5.23031 19.3884 6.53152C19.4078 7.8304 18.9209 9.08574 18.031 10.0318L9.99975 18.0727L1.96879 10.0417C1.07897 9.09564 0.592133 7.84035 0.61152 6.54152C0.630942 5.24031 1.15691 3.99794 2.0777 3.07833C2.99849 2.15873 4.24154 1.63435 5.54277 1.61661C6.8424 1.59888 8.0978 2.08793 9.04293 2.97999L9.64934 3.57646Z" stroke="#9B9C9F"/></svg></span><span class="btn-txt">Favorite</span>';
        } else {
            var dataBaloonN = "Favorited";
            var design = '<span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"> <path d="M9.99996 3.22L9.38996 2.61999C8.34988 1.63643 6.96731 1.09713 5.53595 1.11665C4.10459 1.13618 2.73724 1.71299 1.72438 2.72455C0.71151 3.73612 0.13294 5.10272 0.111575 6.53405C0.0902106 7.96539 0.627735 9.34865 1.60996 10.39L9.99996 18.78L18.39 10.38C19.3722 9.33865 19.9097 7.95539 19.8883 6.52406C19.867 5.09272 19.2884 3.72612 18.2755 2.71455C17.2627 1.70299 15.8953 1.12618 14.464 1.10665C13.0326 1.08713 11.65 1.62643 10.61 2.61L9.99996 3.22Z" fill="#9B9C9F"/></svg></span><span class="btn-txt">Favorited</span> ';

        }
        // Simulate a click on the existing reply button
        $('.' + className).empty().append(design);

        $('.' + className).attr('data-balloon', dataBaloonN);
        $('.' + className).addClass(classNamenew);
        $('.' + classNamenew).removeClass(className);

        $('.favorite-toggle').click();
    });
});





//  move like button after fevorite
jQuery(document).ready(function () {
    // Get the div to move
    var divToMove = jQuery(".wpulike-default").eq(0);

    // Get the destination div
    var destination = jQuery(".bs-voices-wrap");

    // Move the div to the destination
    jQuery(destination).append(divToMove);
});


jQuery(document).ready(function () {
    jQuery('#bbp_topic_title').attr('maxlength', 255);

});


document.querySelectorAll('.horizontal a').forEach(function (link) {
    let icon = link.querySelector('i');
    if (icon) { 
        let iconClass = icon.classList;
        if (iconClass.contains('fa-facebook')) {
            link.setAttribute('title', 'Facebook');
        } else if (iconClass.contains('fa-twitter')) {
            link.setAttribute('title', 'Twitter');
        } else if (iconClass.contains('fa-linkedin')) {
            link.setAttribute('title', 'LinkedIn');
        } else if (iconClass.contains('fa-envelope')) {
            link.setAttribute('title', 'Email');
        } else if (iconClass.contains('fa-whatsapp')) {
            link.setAttribute('title', 'WhatsApp');
        }
    }
});



jQuery(document).ready(function ($) {
    function toLowerCase(text) {
        return text.trim().toLowerCase();
    }

    var breadcrumbTexts = $('.custom-breadcrumbs li a').map(function () {
        return toLowerCase($(this).text()); // Convert to lowercase
    }).get();

    breadcrumbTexts.shift();
    $.each(breadcrumbTexts, function (index, breadcrumb) {
        $('#primary-navbar #primary-menu li.menu-item').each(function () {
            var menuText = toLowerCase($(this).find('a span').text());
            if (menuText === breadcrumb) {
                $(this).addClass('current_page_item');
            }
        });
    });
});

jQuery(document).ready(function ($) {
    const url = window.location.href;
    if (url.includes('research-type') || url.includes('research-category') || url.includes('research-tag')) {
        $('#primary-navbar #primary-menu li.menu-item').each(function () {
            var menuText = $(this).find('a span').text().trim();
            if (menuText == 'Market research') {
                $(this).addClass('current_page_item');
            }
        });
    }

    if (url.includes('/category/') || url.includes('/tag/')) {
        $('#primary-navbar #primary-menu li.menu-item').each(function () {
            var menuText = $(this).find('a span').text().trim();
            if (menuText == 'Blogs') {
                $(this).addClass('current_page_item');
            }
        });
    }

    if (url.includes('members') || url.includes('forums')) {
        $('#primary-navbar #primary-menu li.menu-item').each(function () {
            var menuText = $(this).find('a > span').text().trim();
            if (menuText === 'CommunityForumsMembers') {
                $(this).addClass('current_page_item');
            }
        });
    }

    if ($('.post-tag-wrapper a').length > 0) {
        $('.market-category-tag').show();
        $('.blog-category-tag').show();

    }else{
        $('.blog-category-tag').hide();
        $('.market-category-tag').hide();
    }


});
