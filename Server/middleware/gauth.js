// auth.js
const { google } = require('googleapis');
const keys = require('../configs/key.json');

const authenticate = () => {
    const client = new google.auth.JWT(
        keys.client_email,
        null,
        keys.private_key,
        ['https://www.googleapis.com/auth/spreadsheets']
    );

    return new Promise((resolve, reject) => {
        client.authorize((err, tokens) => {
            if (err) {
                console.error('Error authorizing client:', err);
                reject(err);
            } else {
                console.log('Successfully connected to Google Sheets API');
                resolve(client);
            }
        });
    });
};

module.exports = { authenticate };
