var preview_items = [];

function generate_preview_container() {
    var preview_container = document.createElement('div');
    preview_container.setAttribute("id", "preview_container");

    preview_container.innerHTML = `
    <div class="row" id="preview_buttons">
        <div class="col text-center">
            <button type="button" class="btn btn-danger" id="preview_btn">Add more</button>
            <button type="button" class="btn btn-primary" id="preview_btn">Calculate</button>
        </div>
    </div>
`
    document.getElementById("main_container").appendChild(preview_container);
}

function calculate_processing_fee(value_of_item) {
    var ans = 0.01 * value_of_item;
    if (ans < 10) {
        return 10;
    }
    if (ans > 500) {
        return 500;
    }
    return ans;
}

function remove_preview_item(id_of_preview_item) {
    console.log(id_of_preview_item);
    var preview_item = document.getElementById(id_of_preview_item);
    console.log(preview_item);
    preview_item.parentNode.removeChild(preview_item);

    // Remove from the preview_items_object
    var index = parseInt(id_of_preview_item[id_of_preview_item.length - 1]) - 1;
    preview_items.splice(index, 1);
}

// Populate Sub-category function
function populate(s1, s2) {
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

function is_valid() {
    var category = document.getElementById("product_category").value;
    var subcategory = document.getElementById("product_subcategory").value;
    var value_of_item = document.getElementById("value_of_item").value;

    var is_valid = true;
    if (category === "") {
        document.getElementById("category_alert").style.display = "block";
        is_valid = false;
    }
    if (subcategory === "") {
        document.getElementById("subcategory_alert").style.display = "block";
        is_valid = false;
    }
    if (!value_of_item) {
        document.getElementById("value_alert").style.display = "block";
        is_valid = false;
    }

    return is_valid;
}

function generate_preview_item(category, subcategory, value_of_item, processing_fee, levy_fee) {
    var item_price = value_of_item;
    var duty_rate = duty_rates[category].sub_categories[subcategory].duty_rate;
    var p_fee;
    if (!processing_fee) {
        p_fee = calculate_processing_fee(value_of_item);
    } else {
        p_fee = processing_fee;
    }
    var l_fee;
    if (!levy_fee) {
        l_fee = 0;
    } else {
        l_fee = levy_fee;
    }

    var preview_item_object = {
        item_price: item_price,
        duty_rate: duty_rate,
        processing_fee: p_fee,
        levy_fee: l_fee
    };

    preview_items.push(preview_item_object);

    var no_of_items = preview_items.length;

    var preview_item_id = "preview_item" + no_of_items;

    var preview_item = document.createElement('div');
    preview_item.setAttribute("id", preview_item_id);
    preview_item.setAttribute("class", "preview_item");

    preview_item.innerHTML = `
        <button id="x" onclick="remove_preview_item(this.parentNode.id)">x</button>
        <table class="table">
            <tbody>
                <tr>
                    <th scope="row">Item Price</th>
                    <td>$` + item_price + `</td>
                </tr>
                <tr>
                    <th scope="row">Duty rate</th>
                    <td>` + duty_rate + `%</td>
                </tr>
                <tr>
                    <th scope="row">Environmental Levy fee</th>
                    <td>$` + l_fee + `</td>
                </tr>
                <tr>
                    <th scope="row">Processing fee</th>
                    <td>$` + p_fee + `</td>
                </tr>
            </tbody>
        </table>
    `

    return preview_item;
}

function preview() {
    if (is_valid()) {
        var preview_container = document.getElementById("preview_container");
        if (!preview_container) {
            generate_preview_container();
        }
        var category = document.getElementById("product_category").value;
        var subcategory = document.getElementById("product_subcategory").value;
        var value_of_item = document.getElementById("value_of_item").value;
        var processing_fee = document.getElementById("processing_fee").value;
        var levy_fee = document.getElementById("levy_fee").value;

        var preview_item = generate_preview_item(category, subcategory, value_of_item, processing_fee, levy_fee);
        // Insert before preview buttons
        var preview_buttons = document.getElementById("preview_buttons");
        preview_buttons.parentNode.insertBefore(preview_item, preview_buttons);
    }
}