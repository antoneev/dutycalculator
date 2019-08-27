// Popover 
$(document).ready(function () {
    // Initialize bootstrap popover
    $('[data-toggle="popover"]').popover();

    fill_category_data();

    // Footer
    var window_height = window.innerHeight;
    var navbar_height = document.getElementById("nav_bar").offsetHeight;
    var container_height = document.getElementById("main_container").offsetHeight;
    var footer_height = document.getElementById("footer").offsetHeight;
    var height = window_height - (navbar_height + 20 + container_height + footer_height) ;
    console.log(height);
    $('#footer').css('margin-top',height);
});