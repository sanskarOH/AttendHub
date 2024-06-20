const express = require('express');
const homeroute = express.Router();

homeroute.get('/', (req,res) => {
    console.log("Route Hit!!");
    res.send('This is the BackEnd Server for the EasyAttendace App.');
});

module.exports = homeroute;