const express = require('express');
const logroute = express.Router();
const dotenv = require('dotenv');
const { updateSheet } = require('../middleware/sheets');
dotenv.config({ path: './configs/.env' });

logroute.post('/attendees', (req, res) => {
    const attendees = req.body.attendees;
    if(req.body.attendees){
        console.log(attendees);
        res.status(200).send('Attendees logged successfully');
        const spreadsheetId = process.env.SHEET_ID;
        const range = process.env.SHEET_NAME;
        const values = attendees.map(attendee => [attendee]);
        updateSheet(spreadsheetId, range, values);

    }
    else{
        res.status(400).send('No attendees logged \n' + res.statusText);
    }


    
});

module.exports = logroute;