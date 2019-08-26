// Popover 
$(document).ready(function () {
    // Initialize bootstrap popover
    $('[data-toggle="popover"]').popover();

    // Fill Product category list
    var select = document.getElementById("product_category");
    var keys = Object.keys(duty_rates);
    console.log(keys);
    console.log(duty_rates[keys[0]].text);
    for (var i = 0; i < keys.length; i++) {
        var option = document.createElement("option");
        option.textContent = duty_rates[keys[i]].text
        option.value = keys[i];
        select.appendChild(option);
    }

    // Footer
    var window_height = window.innerHeight;
    var navbar_height = document.getElementById("nav_bar").offsetHeight;
    var container_height = document.getElementById("main_container").offsetHeight;
    var footer_height = document.getElementById("footer").offsetHeight;
    var height = window_height - (navbar_height + 20 + container_height + footer_height) ;
    console.log(height);
    $('#footer').css('margin-top',height);
});