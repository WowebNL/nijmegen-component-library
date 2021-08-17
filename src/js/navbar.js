var navbarToggler = $('.navbar-toggler');
const SMOOTH_SCROLL_DURATION = 700;
const KEY_ENTER = 13;
const KEY_SPACE = 32;

// close if clicked outside the navbar
$(document).on('click keyup', function(event) {
    if (
        event.type === 'click' &&
        navbarToggler.is(':visible') &&
        !navbarToggler.hasClass('collapsed') &&
        !$(event.target).closest('.navbar-toggler').length &&
        !$(event.target).closest('.navbar-collapse').length
    ) {
        navbarToggler.trigger('click');
    }
    if (
        event.type === 'keyup' &&
        event.key === 'Escape' &&
        navbarToggler.is(':visible') &&
        !navbarToggler.hasClass('collapsed')
    ) {
        navbarToggler.trigger('click');
        navbarToggler.trigger('focus');
    }
});

// close if there is a smooth scroll
if (navbarToggler.is(':visible')) {
    $('.navbar-nav.nijmegen-smooth-scroll').each(function() {
        $('.nav-link', this).on('click', function() {
            if (!navbarToggler.hasClass('collapsed')) {
                navbarToggler.trigger('click');
            }
        });
    });
}

navbarToggler.on('click', () => {
    if (navbarToggler.hasClass('collapsed')) {
        $('.navbar-brand').attr('tabindex', -1);
        return;
    }
    $('.navbar-brand').attr('tabindex', 0);
});

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
$('.nijmegen-smooth-scroll').on('click keydown', 'a', function(event) {
    if (event.type === 'keydown' && ![KEY_ENTER, KEY_SPACE].includes(event.which)) {
        return;
    }
    const url = new URL($(this).attr('href'), location);

    // if this a different page navigate to that page
    if (!url.hash || url.pathname !== location.pathname) {
        if (event.type === 'keydown') {
            window.location = url.href;
        }
        return;
    }

    // prevent the default navigation
    event.preventDefault();

    const offset = $(this).attr('data-offset') || 0;
    smoothScrollTo(url.hash.substring(1), offset);
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
