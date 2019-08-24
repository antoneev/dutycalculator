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

// Populate Sub-category function
function populate(s1,s2){
    var category_select = document.getElementById(s1);
    var subcategory_select = document.getElementById(s2);
    subcategory_select.innerHTML = "<option value=\"\">Choose Product's sub-category</option>";
    
    
    category_value = category_select.value;
    subcategory_values = Object.keys(duty_rates[category_value].sub_categories);
    console.log(subcategory_values);

    for (var i = 0; i < subcategory_values.length; i++) {
        var option = document.createElement("option");
        option.value = subcategory_values[i];
        option.innerHTML = duty_rates[category_value].sub_categories[subcategory_values[i]].text;
        subcategory_select.options.add(option);
    }
}    

