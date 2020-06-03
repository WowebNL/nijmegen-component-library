var navbarToggler = $('.navbar-toggler');
const SMOOTH_SCROLL_DURATION = 700;

// close if clicked outside the navbar
$(document).on('click', function(event) {
    if (
        navbarToggler.is(':visible') &&
        !navbarToggler.hasClass('collapsed') &&
        !$(event.target).closest('.navbar-toggler').length &&
        !$(event.target).closest('.navbar-collapse').length
    ) {
        navbarToggler.trigger('click');
    }
});

// close if there is a smooth scroll
if (navbarToggler.is(':visible')) {
    $('.navbar-nav.smooth-scroll').each(function() {
        $('.nav-link', this).click(function() {
            if (!navbarToggler.hasClass('collapsed')) {
                navbarToggler.trigger('click');
            }
        });
    });
}

const smoothScrollTo = (hash, offset = 0) => {
    if (!$(`#${hash}`).length) {
        return;
    }
    $('body,html').animate(
        {
            scrollTop: $(`#${hash}`).offset().top - offset,
        },
        SMOOTH_SCROLL_DURATION
    );
    history.replaceState(null, null, `#${hash}`);
};

// fix navigating to external url
$('.nijmegen-smooth-scroll').on('click', 'a', function(element) {
    const [path, hash] = $(this)
        .attr('href')
        .split('#');

    if (!hash) {
        return;
    }
    if (path !== '' && path !== location.pathname) {
        return;
    }

    element.preventDefault();

    const offset = $(this).attr('data-offset') || 0;
    smoothScrollTo(hash, offset);
});

var SCROLLING_NAVBAR_OFFSET_TOP = 50;
$(window)
    .off('scroll')
    .on('scroll', function() {
        var $navbar = $('.navbar');
        if ($navbar.length) {
            if ($navbar.offset().top > SCROLLING_NAVBAR_OFFSET_TOP) {
                $('.scrolling-navbar').addClass('top-nav-collapse');
            } else {
                $('.scrolling-navbar').removeClass('top-nav-collapse');
            }
        }
    });

var navbarSearch = new NavbarSearch();
$(document).ready(function() {
    navbarSearch.init();
});

function NavbarSearch() {}

NavbarSearch.prototype.init = function() {
    $('#navbar-open-search').click(this.openSearch);
    $('.autocomplete').on('close', this.closeSearch);
    $('#navbar-close-search').click(this.closeSearch);
};

NavbarSearch.prototype.openSearch = function(event) {
    $('.navbar').addClass('search-open');
    $('.autocomplete__input').focus();
    event.stopPropagation();
    event.preventDefault();
};

NavbarSearch.prototype.closeSearch = function() {
    $('.navbar').removeClass('search-open');
    $('#navbar-open-search').focus();
};
