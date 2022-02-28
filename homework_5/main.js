var slot = null;
var selectedDate = new Date().toLocaleDateString('en-US');

window.onload = () => {
    var calendar = document.getElementById("my-calendar");
    console.log(calendar);
    var myCalendar = jsCalendar.new({
        target : calendar,
        navigator : true,
        navigatorPosition : "right",
        zeroFill : true,
        monthFormat : "month YYYY",
        dayFormat : "DD",
        firstDayOfTheWeek: "2"
    });
    myCalendar.onDateClick(function(event, date) {
        myCalendar.set(date);
        console.log(date.toLocaleDateString('en-US'));
        selectedDate = date.toLocaleDateString('en-US');
    });
};


window.addEventListener('click', (e) => {
    console.log(e.target);
    if (e.target.classList.contains("appointment") && e.target.querySelector('#cancel-appointment')) {
        if (e.target.querySelector('#cancel-appointment').classList.contains('hidden')){
            e.target.querySelector('#cancel-appointment').classList.remove('hidden');
        } else {
            e.target.querySelector('#cancel-appointment').classList.add('hidden');
        }
    }

    if (e.target.id == "render") {
        document.getElementById('schedule').className = "";
    }

    if (e.target.classList.contains("slot")) {
        if (slot == null) {
            slot = e.target;
            slot.classList.add("selected");
            document.getElementById("appointment-information").className = "";
            document.getElementById("appointment-method").innerHTML = document.querySelector('input[type=radio][name=method]:checked').value;
            document.getElementById("appointment-time").innerHTML = selectedDate + " " + slot.querySelector(".slot-time").innerHTML;
            document.getElementById("appointment-location").innerHTML = slot.querySelector(".slot-location").innerHTML;
        } else {
            slot.classList.remove("selected");
            slot = e.target;
            slot.classList.add("selected");
            document.getElementById("appointment-method").innerHTML = document.querySelector('input[type=radio][name=method]:checked').value;
            document.getElementById("appointment-time").innerHTML = selectedDate + " " + slot.querySelector(".slot-time").innerHTML;
            document.getElementById("appointment-location").innerHTML = slot.querySelector(".slot-location").innerHTML;
        }
    }

    if (e.target.id == "confirm") {
        document.querySelector("#finals").classList.remove("hidden");
        document.querySelector(".testing").classList.add("hidden");
        document.querySelector("#confirm").classList.add("hidden");
    }
})