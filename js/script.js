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
});