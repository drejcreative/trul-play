/*====================================
=            ON DOM READY            =
====================================*/
$(function() {

    // Toggle Nav on Click
    $('.toggle-nav').click(function() {
        // Calling a function in case you want to expand upon this.
        toggleNav();
    });
    $('#sidenav-close').click(function(event) {
        event.preventDefault();
        closeNav();
    });

});


/*========================================
=            CUSTOM FUNCTIONS            =
========================================*/
function toggleNav() {
    if ($('#wrapper').hasClass('show-nav')) {
        // Do things on Nav Close
        $('#wrapper').removeClass('show-nav');
    } else {
        // Do things on Nav Open
        $('#wrapper').addClass('show-nav');
    }

    //$('#site-wrapper').toggleClass('show-nav');
}
function closeNav() {
    $('#wrapper').removeClass('show-nav');
}
