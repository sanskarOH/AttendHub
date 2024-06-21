let meetActionButtons;
let participantsList = new Map();
let attendanceData = new Map();
let participantsButtonIndex = 1;
let startTime;
let meetDuration = 1;
let currTime;

function track_attendance() {
    let currentParticipants = document.getElementsByClassName("KjWwNd");
    let currentParticipantsName = document.getElementsByClassName("zWGUib");

    if (currentParticipants.length > 0) {
        participantsList.clear();

        if (meetDuration == 1) {
            startTime = new Date();
        }

        for (let i = 0; i < currentParticipants.length; i++) {
            participantsList.set(
                currentParticipants[i].src,
                currentParticipantsName[i].innerHTML.toUpperCase()
            );
        }

        participantsList.forEach(function(name, avatarUrl) {
            if (attendanceData.has(avatarUrl)) {
                let data = attendanceData.get(avatarUrl);
                data.attendedDuration += 1;
                data.lastAttendedTimeStamp = new Date();
                attendanceData.set(avatarUrl, data);
            } else {
                let joinTime = new Date();
                let data = {
                    avatarUrl: avatarUrl,
                    name: name,
                    joinTime: joinTime.getHours() + ":" + joinTime.getMinutes() + ":" + joinTime.getSeconds(),
                    attendedDuration: 1,
                    lastAttendedTimeStamp: new Date()
                };
                attendanceData.set(avatarUrl, data);
            }
        });

        meetDuration += 1;

    } else {
        try {
            meetActionButtons[participantsButtonIndex % meetActionButtons.length].click();
        } catch (error) {
            stop();
        }
    }
}

function start() {
    tracking = setInterval(track_attendance, 1000);
}

let stop = STOP = function(){
    clearInterval(tracking);
    let meetCode = window.location.pathname.substring(1);
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    let startTimeFormatted = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}`;
    let stopTime = new Date();
    let stopTimeFormatted = `${stopTime.getHours()}:${stopTime.getMinutes()}:${stopTime.getSeconds()}`;

    // CSV header
    csvContent = "Meet Code,Date,Start Time,Stop Time,Name,Avatar URL,Join Time,Leave Time,Attended Duration\n";

    // Iterate through attendance data
    attendanceData.forEach(function(data) {
        csvContent += `${meetCode},${dd}/${mm}/${yyyy},${startTimeFormatted},${stopTimeFormatted},${data.name},${data.avatarUrl},${data.joinTime},${data.leaveTime},${data.attendedDuration}\n`;
    });

    // // Create a blob for the CSV content
     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // // Create a temporary anchor element and initiate download
     const link = document.createElement('a');
     const url = URL.createObjectURL(blob);
     link.setAttribute('href', url);
     link.setAttribute('download', `attendance_${meetCode}_${dd}${mm}${yyyy}_${startTimeFormatted}-${stopTimeFormatted}.csv`);
     document.body.appendChild(link);
     link.click();

    // // Clean up
     document.body.removeChild(link);
    // Prepare the JSON content
    let jsonData = {
        meetCode: meetCode,
        date: `${dd}/${mm}/${yyyy}`,
        startTime: startTimeFormatted,
        stopTime: stopTimeFormatted,
        participants: []
    };

    // Iterate through attendance data
    attendanceData.forEach(function(data) {
        jsonData.participants.push({
            name: data.name,
            avatarUrl: data.avatarUrl,
            joinTime: data.joinTime,
            leaveTime: data.leaveTime,
            attendedDuration: data.attendedDuration
        });
    });

    // Post the JSON data to the server
    fetch('http://localhost:3000/api/attendees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
}

//Copied from a web

let statusText = document.createElement("button");
statusText.id = "status";
statusText.className = "Jyj1Td CkXZgc";
statusText.innerHTML = "&nbsp;🔴 Running Attend-Hub";
statusText.style.color = "red";
statusText.style.fontWeight = "bold";
statusText.style.padding = "auto";
statusText.style.border = "none";
statusText.style.outline = "none";
statusText.style.background = "transparent";

const blinkSpeed = 500;
setInterval(function() { statusText.style.visibility = (statusText.style.visibility == 'hidden' ? '' : 'hidden'); }, blinkSpeed);

/*
-------------------
start the extension
-------------------
*/

let engine = setInterval(startEngine, 1000);

function startEngine() {
    try {
        meetActionButtons = document.getElementsByClassName("NtU4hc");
        document.getElementsByClassName("Qp8KI")[0].appendChild(statusText);
        start();
        clearInterval(engine);
    } catch (error) {}
};