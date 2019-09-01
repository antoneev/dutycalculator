var preview_items = [];
var cigarette_types = ["cigarettes", "cigarillos_etc_other", "cigars"];

function put_percentage(value) {
    if (typeof value == "number") {
        return value + "%";
    }
    return value;
}

function stick_footer() {
    var window_height = window.innerHeight;
    var navbar_height = document.getElementById("nav_bar").offsetHeight;
    var container_height = document.getElementById("main_container").offsetHeight;
    var footer_height = document.getElementById("footer").offsetHeight;
    var height = window_height - (navbar_height + 20 + container_height + footer_height) ;
    console.log(height);
    if (height < 10) {
        $('#main_container').css('margin-bottom', 20);
    } else {
        $('#footer').css('margin-top', height);
    }
}

function generate_levy_rate_table(id) {

    if (document.getElementById("levy_rate_table")) {
        document.getElementById("levy_rate_table").remove();
    }
    
    var category = document.getElementById(id).value;
    var items = levy_rates[category].items;

    var table_content_html = ``;
    for (var i = 0; i < items.length; i++) {
        var row = `
            <tr>
                <td>` + items[i].item + `</td>
                <td>` + put_percentage(items[i].levy_rate) + `</td>
            </tr>
        `
        table_content_html += row;
    }

    var table_content = document.createElement('thead');
    table_content.innerHTML = table_content_html;

    var table = document.createElement('table');
    table.setAttribute("class", "table table-bordered");
    table.setAttribute("id", "levy_rate_table");
    table.innerHTML = `
        <thead>
            <tr>
                <th>Item name</th>
                <th>Levy Rate</th>
            </tr>
        </thead>
    `
    document.getElementById("levy_rate_glossary").appendChild(table);
    document.getElementById("levy_rate_table").appendChild(table_content);

}

function generate_duty_rate_table(id) {

    if (document.getElementById("duty_rate_table")) {
        document.getElementById("duty_rate_table").remove();
    }
    var category = document.getElementById(id).value;
    var sub_categories = Object.keys(duty_rates[category].sub_categories);

    var table_content_html = ``;
    for (var i = 0; i < sub_categories.length; i++) {
        var row = `
            <tr>
                <td>` + duty_rates[category].sub_categories[sub_categories[i]].text + `</td>
                <td>` + put_percentage(duty_rates[category].sub_categories[sub_categories[i]].duty_rate) + `</td>
            </tr>
        `
        console.log(typeof duty_rates[category].sub_categories[sub_categories[i]].duty_rate);
        table_content_html += row;
    }

    var table_content = document.createElement('thead');
    table_content.innerHTML = table_content_html;

    var table = document.createElement('table');
    table.setAttribute("class", "table table-bordered");
    table.setAttribute("id", "duty_rate_table");
    table.innerHTML = `
        <thead>
            <tr>
                <th>Item name</th>
                <th>Duty Rate</th>
            </tr>
        </thead>
    `
    document.getElementById("duty_rate_glossary").appendChild(table);
    document.getElementById("duty_rate_table").appendChild(table_content);
}

function generate_preview_container() {
    var preview_container = document.createElement('div');
    preview_container.setAttribute("id", "preview_container");

    preview_container.innerHTML = `
    <div class="row" id="preview_buttons">
        <div class="col text-center">
            <button type="button" class="btn btn-danger" id="preview_btn" onclick="reset()">
                <a id="preview_btn_link" href="#main_container" style="color: white; text-decoration: none;">Add more</a>
            </button>
            <button type="button" class="btn btn-primary" id="preview_btn" onclick="calulate_duty_estimate()">Calculate</button>
        </div>
    </div>
`
    document.getElementById("main_container").appendChild(preview_container);
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

function fill_product_category_data() {
    // Fill Product category list
    var select = document.getElementById("product_category");
    if (select) {
        var keys = Object.keys(duty_rates);
        console.log(keys);
        console.log(duty_rates[keys[0]].text);
        for (var i = 0; i < keys.length; i++) {
            var option = document.createElement("option");
            option.textContent = duty_rates[keys[i]].text
            option.value = keys[i];
            select.appendChild(option);
        }
    }

}

function fill_levy_category_data() {
    console.log("The levy function is working");
    // Fill Levy Rates field form
    var select = document.getElementById("levy_category");
    console.log(select);
    if (select) {
        var keys = Object.keys(levy_rates);
        console.log(keys);
        for (var i = 0; i < keys.length; i++) {
            var option = document.createElement("option");
            option.textContent = levy_rates[keys[i]].text
            option.value = keys[i];
            select.appendChild(option);
        }
    }
}

function generate_qty_field() {
    var subcategory = document.getElementById("product_subcategory");

    if (cigarette_types.includes(subcategory.value)) {
        var qty = document.createElement("div");
        qty.setAttribute("class", "form-group row");

        qty.innerHTML = `
            <div class="col-7">
                <input class="form-control" type="number" min="0" placeholder="No. of sticks"
                    id="quantity">
            </div>
            <div class="my_icon">
                <a href="#" class="fa fa-question-circle-o" data-toggle="popover" title="Enter no. of cigarrete sticks"
                    data-content="Cigarretes duty rates are calculated per stick"></a>
            </div>
        `
        subcategory.parentNode.parentNode.insertBefore(qty, subcategory.parentNode.nextSibling);

    } else {
        var quantity_field = document.getElementById("quantity");
        if (quantity_field) {
            quantity_field.parentNode.parentNode.removeChild(quantity_field.parentNode);
        }
    }
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
    var preview_item = document.getElementById(id_of_preview_item);
    preview_item.parentNode.removeChild(preview_item);

    if (preview_items.length === 1) {
        document.getElementById("preview_container").remove();
    }

    // Remove from the preview_items_object
    var index = parseInt(id_of_preview_item[id_of_preview_item.length - 1]) - 1;
    preview_items.splice(index, 1);

    remove_result();
}



function is_valid() {
    var category = document.getElementById("product_category").value;
    var subcategory = document.getElementById("product_subcategory").value;
    var value_of_item = document.getElementById("value_of_item").value;
    var qty = document.getElementById("quantity");

    var is_valid = true;
    if (category === "") {
        alert("You must put a value in category");
        is_valid = false;
    }
    if (subcategory === "") {
        alert("You must put a value in sub-category");
        is_valid = false;
    }
    if (!value_of_item) {
        alert("You must put a price in the value of item");
        is_valid = false;
    }
    if (qty) {
        if (!qty.value) {
            alert("You must enter the no of sticks of cigars");
            is_valid = false;
        }
    }

    return is_valid;
}

function generate_preview_item(category, subcategory, value_of_item, processing_fee, levy_fee, quantity) {
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
        levy_fee: l_fee,
        quantity: quantity
    };

    preview_items.push(preview_item_object);

    var no_of_items = preview_items.length;

    var preview_item_id = "preview_item" + no_of_items;

    var preview_item = document.createElement('div');
    preview_item.setAttribute("id", preview_item_id);
    preview_item.setAttribute("class", "preview_item");

    if (!quantity) {
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
                        <th scope="row">VAT</th>
                        <td>12%</td>
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
    } else {
        preview_item.innerHTML = `
            <button id="x" onclick="remove_preview_item(this.parentNode.id)">x</button>
            <table class="table">
                <tbody>
                    <tr>
                        <th scope="row">Item Price</th>
                        <td>$` + item_price + `</td>
                    </tr>
                    <tr>
                        <th scope="row">Qty</th>
                        <td>` + quantity + ` sticks</td>
                    </tr>
                    <tr>
                        <th scope="row">Duty rate</th>
                        <td>` + duty_rate + `</td>
                    </tr>
                    <tr>
                        <th scope="row">VAT</th>
                        <td>12%</td>
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
    }

    return preview_item;
}

function remove_result() {
    if (document.getElementById("result")) {
        document.getElementById("result").remove();
    }
}

function preview() {
    remove_result();
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

        var quantity = document.getElementById("quantity");
        if (quantity) {
            quantity = quantity.value;
        }

        var preview_item = generate_preview_item(category, subcategory, value_of_item, processing_fee, levy_fee, quantity);
        // Insert before preview buttons
        var preview_buttons = document.getElementById("preview_buttons");
        preview_buttons.parentNode.insertBefore(preview_item, preview_buttons);
    }
}

function parse_duty_rate(duty_rate) {

    var price_per_stick = parseFloat(duty_rate.slice(0, duty_rate.indexOf('p') - 1));
    var additional_duty_rate = 0;

    var i = duty_rate.indexOf("+");

    if (i > 0) {
        additional_duty_rate = parseFloat(duty_rate.slice(i + 2, duty_rate.length - 1));
    }

    return [price_per_stick, additional_duty_rate];
}

function calulate_duty_estimate() {
    remove_result();

    var result = 0;
    for (var i = 0; i < preview_items.length; i++) {

        var item_price = parseFloat(preview_items[i].item_price);

        var processing_fee = parseFloat(preview_items[i].processing_fee);
        var levy_fee = parseFloat(preview_items[i].levy_fee);

        if (preview_items[i].quantity) {
            var quantity = parseFloat(preview_items[i].quantity);
            var x = parse_duty_rate(preview_items[i].duty_rate);
            console.log(x[0]);
            console.log(x[1]);
            result += item_price + ((x[1] / 100) * item_price) + (quantity * x[0]) + processing_fee + levy_fee + (0.12 * item_price);

        } else {
            var duty_rate = parseFloat(preview_items[i].duty_rate);
            result += item_price + ((duty_rate / 100) * item_price) + processing_fee + levy_fee + (0.12 * item_price);
        }
    }

    result = result.toFixed(2);

    var result_elem = document.createElement("div");
    result_elem.setAttribute("id", "result");
    result_elem.innerHTML = `
        <p>$` + result + `</p>
    
    `
    document.getElementById("main_container").appendChild(result_elem);
}

function reset() {
    var form = document.getElementById("main_form");

    form.innerHTML = `
        <div class="form-group">
            <select class="form-control" id="product_category" onchange="populate(this.id,'product_subcategory')">
                <option value="">Choose Product's category</option>
            </select>
        </div>
        <div class="form-group">
            <select class="form-control" id="product_subcategory" onchange="generate_qty_field()">
                <option value="">Choose Product's sub-category</option>
            </select>
        </div>

        <div class="form-group row">
            <div class="col-5">
                <input class="form-control" type="number" min="0" placeholder="Value of item(s)" id="value_of_item">
            </div>
        </div>

        <div class="form-group row">
            <div class="col-7">
                <input class="form-control" type="number" min="0" placeholder="Processing fee ($)"
                    id="processing_fee">
            </div>
            <div class="my_icon">
                <a href="#" class="fa fa-question-circle-o" data-toggle="popover" title="Popover Header"
                    data-content="Some content inside the popover"></a>
            </div>
        </div>

        <div class="form-group row">
            <div class="col-7">
                <input class="form-control" type="number" min="0" placeholder="Environmental levy fee ($)"
                    id="levy_fee">
            </div>

            <div class="my_icon">
                <a href="#" class="fa fa-question-circle-o" data-toggle="popover" title="Popover Header"
                    data-content="Some content inside the popover"></a>
            </div>
        </div>

        <div class="row">
            <div class="col text-center">
                <button type="button" class="btn btn-primary" id="preview_btn" onclick="preview()">Preview</button>
            </div>
        </div>
    `

    fill_category_data();
}