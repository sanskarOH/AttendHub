var attendeesList = [];

// Update this selector to match the actual Google Meet structure
function getAttendees() {
    const attendees = document.querySelectorAll('span.zWGUib');
    attendees.forEach(attendee => {
        attendeesList.push(attendee.innerText);
    });
    return attendeesList;
}

getAttendees();