
var duty_rates;

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        duty_rates = JSON.parse(xhttp.responseText);
        console.log(duty_rates);
    }
};
xhttp.open("GET", "data/duty_rate.json", true);
xhttp.send();