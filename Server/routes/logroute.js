const express = require('express');
const logroute = express.Router();
const dotenv = require('dotenv');
const { updateSheet } = require('../middleware/sheets');
dotenv.config({ path: './configs/.env' });

logroute.post('/attendees', (req, res) => {
    const { meetCode, date, startTime, stopTime, participants } = req.body;

    if (participants && participants.length > 0) {
        console.log('Meet Code:', meetCode);
        console.log('Date:', date);
        console.log('Start Time:', startTime);
        console.log('Stop Time:', stopTime);
        console.log('Participants:', participants);

        res.status(200).send('Attendees logged successfully');

        const spreadsheetId = process.env.SHEET_ID;
        const range = process.env.SHEET_NAME;

        // Calculate the total meeting duration
        const start = new Date(`1970-01-01T${startTime}Z`);
        const stop = new Date(`1970-01-01T${stopTime}Z`);
        const totalMeetingDuration = (stop - start) / 1000 / 60; // Duration in minutes

        // Map participants data to the format needed for the spreadsheet
        const values = participants.map(participant => [
            meetCode,
            date,
            startTime,
            stopTime,
            participant.name,
            participant.avatarUrl,
            participant.joinTime,
            participant.attendedDuration
        ]);

        // Log the values to be sent to the spreadsheet
        console.log('Values to be appended to the spreadsheet:', values);

        updateSheet(spreadsheetId, range, values, totalMeetingDuration);
    } else {
        res.status(400).send('No attendees logged');
    }
});

module.exports = logroute;