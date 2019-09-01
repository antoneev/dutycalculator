
var duty_rates;
var levy_rates;
var duty_rate_xhttp = new XMLHttpRequest();
var levy_rate_xhttp = new XMLHttpRequest();

// Duty Rate json
duty_rate_xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        duty_rates = JSON.parse(duty_rate_xhttp.responseText);
        console.log(duty_rates);
    }
};
duty_rate_xhttp.open("GET", "data/duty_rate.json", true);
duty_rate_xhttp.send();

// Levy Rate json
levy_rate_xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        levy_rates = JSON.parse(levy_rate_xhttp.responseText);
        console.log(levy_rates);
    }
};
levy_rate_xhttp.open("GET", "data/levy_rate.json", true);
levy_rate_xhttp.send();