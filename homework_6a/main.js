var slot = null;
var selectedDate = new Date().toLocaleDateString('en-US');
var appointment = null;

function Appointment(type, method, time, location, address) {
    this.type = type;
    this.method = method;
    this.time = time;
    this.location = location;
    this.address = address;
    this.status = true;  // indicates whether the appointment was canceled or not
    this.result = null;
};

var a = new Appointment("test", "RT-PCR", new Date(2022, 2, 10, 10, 30, 0), "CVS", "5600 Wilkins Ave, Pittsburgh, PA 15217");
a.result = "Negative";
var b = new Appointment("vaccine", "Pfizer - 2nd Dose", new Date(2021, 8, 15, 12, 0, 0), "CVS", "5600 Wilkins Ave, Pittsburgh, PA 15217");
b.result = "Completed";
var c = new Appointment("vaccine", "Pfizer - Booster Shot", new Date(2022, 1, 3, 12, 0, 0), "CVS", "5600 Wilkins Ave, Pittsburgh, PA 15217");
c.status = false;
var d = new Appointment("vaccine", "Pfizer - Booster Shot", new Date(2022, 3, 3, 14, 30, 0), "CVS", "5600 Wilkins Ave, Pittsburgh, PA 15217");
localStorage.setItem("1", JSON.stringify(a));
localStorage.setItem("2", JSON.stringify(b));
localStorage.setItem("3", JSON.stringify(c));
localStorage.setItem("4", JSON.stringify(d));

function loadMain() {
    var upcomings = document.getElementById("upcomings");
    upcomings.innerHTML = "<h2>Upcoming Appointments</h2>";
    var pasts = document.getElementById("pasts");
    pasts.innerHTML = "<h2>Past Appointments</h2>";
    for (var i=0; i<localStorage.length; i++) {
        var currItem = JSON.parse(localStorage.getItem(localStorage.key(i)));
        // console.log(currItem);
        var currAppointment = document.createElement("div");
        currAppointment.setAttribute("class", "appointment");
        currAppointment.setAttribute("id", localStorage.key(i));
        var span = document.createElement("span");
        span.setAttribute("class", "appointment-info");
        var date = new Date(Date.parse(currItem.time));
        // console.log(typeof(date));
        span.innerHTML = currItem.method + "<br>" + date.toLocaleDateString() + "  " 
                        + date.toLocaleTimeString('en-US', {hour12: true, hour:"numeric", minute:"numeric"}) + "<br>";
        currAppointment.appendChild(span);
        if (currItem.status && date <= Date.now()) {
            // completed appointment
            var status = document.createElement("span");
            status.setAttribute("class", "appointment-status");
            if (currItem.result == "Completed") {
                status.classList.add("complete");
            }
            status.innerHTML = currItem.result;
            currAppointment.appendChild(status);
            pasts.appendChild(currAppointment);
        } else if (currItem.status && date > Date.now()) {
            // upcoming appointment
            currAppointment.setAttribute("class", "appointment upcoming");
            var location = document.createElement("span");
            location.appendChild(document.createTextNode(currItem.location));
            var addr = document.createElement("span");
            addr.setAttribute("class", "appointment-address");
            addr.innerHTML = currItem.address;
            location.appendChild(addr);
            currAppointment.appendChild(location);
            upcomings.appendChild(currAppointment);
        } else {
            // canceled appointment
            span.classList.add("cancel");
            var status = document.createElement("span");
            status.setAttribute("class", "appointment-status cancel");
            status.innerHTML = "Cancelled";
            currAppointment.appendChild(status);
            pasts.appendChild(currAppointment);
        }
    }
}

function loadMyInfo() {
    var all = document.getElementById("all");
    all.innerHTML = "<h2>My Appointments</h2>";
    var vaccinations = document.getElementById("vaccinations");
    vaccinations.innerHTML = "<h2>Vaccination History</h2>";
    for (var i=0; i<localStorage.length; i++) {
        var currItem = JSON.parse(localStorage.getItem(localStorage.key(i)));
        // console.log(currItem);
        var currAppointment = document.createElement("div");
        currAppointment.setAttribute("class", "appointment");
        currAppointment.setAttribute("id", localStorage.key(i));
        var span = document.createElement("span");
        span.setAttribute("class", "appointment-info");
        var date = new Date(Date.parse(currItem.time));
        // console.log(typeof(date));
        span.innerHTML = currItem.method + "<br>" + date.toLocaleDateString() + "  " 
                        + date.toLocaleTimeString('en-US', {hour12: true, hour:"numeric", minute:"numeric"}) + "<br>";
        currAppointment.appendChild(span);
        if (currItem.status && date <= Date.now()) {
            // completed appointment
            var status = document.createElement("span");
            status.setAttribute("class", "appointment-status");
            if (currItem.result == "Completed") {
                status.classList.add("complete");
            }
            status.innerHTML = currItem.result;
            currAppointment.appendChild(status);
            if (currItem.type == "vaccine") {
                vaccinations.appendChild(currAppointment);
            } else {
                all.appendChild(currAppointment);
            }
        } else if (currItem.status && date > Date.now()) {
            // upcoming appointment
            currAppointment.setAttribute("class", "appointment upcoming");
            var location = document.createElement("span");
            location.appendChild(document.createTextNode(currItem.location));
            var addr = document.createElement("span");
            addr.setAttribute("class", "appointment-address");
            addr.innerHTML = currItem.address;
            location.appendChild(addr);
            currAppointment.appendChild(location);
            all.appendChild(currAppointment);
        } else {
            // canceled appointment
            span.classList.add("cancel");
            var status = document.createElement("span");
            status.setAttribute("class", "appointment-status cancel");
            status.innerHTML = "Cancelled";
            currAppointment.appendChild(status);
            all.appendChild(currAppointment);
        }
    }
}

function loadCalendar() {
    var calendar = document.getElementById("my-calendar");
    // console.log(calendar);
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
        // console.log(date.toLocaleDateString('en-US'));
        selectedDate = date.toLocaleDateString('en-US');
    });
};

function updateAppointment(id, type) {
    appointment = JSON.parse(localStorage.getItem(id));
    var modal = document.getElementsByClassName("modal-content")[0];
    modal.innerHTML = `
    <div id="schedule">
        <h2>Select date/time:</h2>
        <div class="schedule">
            <div class="calendar" id="my-calendar" onload="loadCalendar()">
            </div>
            <div class="slots">
                <h2 id="slots-header">Available Slots:</h2>
                <div class="slot">
                    <div>
                        <span class="slot-time">11:00</span>
                        <span class="slot-location">CMU East Campus Garage</span>
                    </div>
                    <span class="slot-distance">0.7miles</span>
                </div>
                <div class="slot">
                    <div>
                        <span class="slot-time">12:00</span>
                        <span class="slot-location">CMU East Campus Garage</span>
                    </div>
                    <span class="slot-distance">0.7miles</span>
                </div>
                <div class="slot">
                    <div>
                        <span class="slot-time">15:00</span>
                        <span class="slot-location">CMU East Campus Garage</span>
                    </div>
                    <span class="slot-distance">0.7miles</span>
                </div>
                <div class="slot">
                    <div>
                        <span class="slot-time">16:00</span>
                        <span class="slot-location">CMU East Campus Garage</span>
                    </div>
                    <span class="slot-distance">0.7miles</span>
                </div>
            </div>
        </div>
    </div>
    <button id="update" onclick="finalizeUpdate(` + id + `,` + `'` + type + `'` + `)">Update Appointment</button>
    `;
    loadCalendar();
}

function finalizeUpdate(id, type) {
    // console.log(id, type);
    // console.log(JSON.stringify(appointment));
    appointment.time = new Date(Date.parse(selectedDate + " " + slot.querySelector(".slot-time").innerHTML));
    localStorage.setItem(id, JSON.stringify(appointment));
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    if (type == "main") {
        loadMain();
    } else {
        loadMyInfo();
    }
    appointment = null;
    var modalContent = document.getElementsByClassName("modal-content")[0];
    modalContent.innerHTML = `
    <h1>Appointment Information</h1>
            <div id="modal-content">

            </div>
            <button class="modal-btn" onclick="updateAppointment(this.id, '` + type + `')">Update Appointment</button>
            <button class="modal-btn" onclick="cancelAppointment(this.id, '` + type + `')">Cancel Appointment</button>
    `;
}

function cancelAppointment(id, type) {
    appointment = JSON.parse(localStorage.getItem(id));
    appointment.status = false;
    localStorage.setItem(id, JSON.stringify(appointment));
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    var buttons = document.getElementsByClassName("modal-btn");
    for (var j=0; j<buttons.length; j++) {
        buttons[j].removeAttribute("id");
    }
    if (type == "main") {
        loadMain();
    } else {
        loadMyInfo();
    }
    appointment = null;
}

window.addEventListener('click', (e) => {
    console.log(e.target);
    var modal = document.getElementById("myModal");
    var buttons = document.getElementsByClassName("modal-btn");
    if (e.target.classList.contains("appointment") && e.target.classList.contains("upcoming")) {
        /* On-click expand of upcoming appointment slots */
        modal.style.display = "block";
        var currItem = JSON.parse(localStorage.getItem(e.target.id));
        console.log(currItem);
        var modalContent = document.getElementById("modal-content");
        var date = new Date(Date.parse(currItem.time));
        modalContent.innerHTML = currItem.method + "<br>" + date.toLocaleDateString() + "  " 
                                + date.toLocaleTimeString('en-US', {hour12: true, hour:"numeric", minute:"numeric"}) + "<br>"
                                + "<span>" + currItem.location + "<span class='appointment-address'>" + currItem.address + "</span></span>";
        for (var j=0; j<buttons.length; j++) {
            buttons[j].setAttribute("id", e.target.id);
        }
    }
    if (e.target == modal) {
        modal.style.display = "none";
        for (var j=0; j<buttons.length; j++) {
            buttons[j].removeAttribute("id");
        }
    }

    if (e.target.id == "render") {
        document.getElementById('schedule').className = "";
        document.getElementById("schedule").scrollIntoView({behavior: "smooth"});
    }

    if (e.target.classList.contains("slot")) {
        if (slot == null) {
            slot = e.target;
            slot.classList.add("selected");
            document.getElementById("appointment-information").className = "";
            document.getElementById("appointment-method").innerHTML = document.querySelector('input[type=radio][name=method]:checked').value;
            document.getElementById("appointment-time").innerHTML = selectedDate + " " + slot.querySelector(".slot-time").innerHTML;
            document.getElementById("appointment-location").innerHTML = slot.querySelector(".slot-location").innerHTML;
            document.getElementById("appointment-information").scrollIntoView({behavior: "smooth"});
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