const { google } = require('googleapis');
const { authenticate } = require('./gauth');

const updateSheet = async (spreadsheetId, range, attendees) => {
    try {
        const auth = await authenticate();
        const sheets = google.sheets({ version: 'v4', auth });
        const valueInputOption = 'RAW';

        // Get current date in YYYY-MM-DD format
        const currentDate = new Date().toISOString().split('T')[0];

        // Flatten the array of attendees into a single array of strings
        const flattenedAttendees = attendees.flat();

        // Prepare rows to append starting from A3
        const rows = attendees.map(attendee => [currentDate, attendee]);

        const resource = {
            values: rows
        };

        // Adjust range to start from A3
        const newRange = `${range}!A3`;

        // Debugging logs
        console.log('Spreadsheet ID:', spreadsheetId);
        console.log('Range:', newRange);
        console.log('Values:', rows);

        const result = await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: newRange,
            valueInputOption,
            resource
        });

        console.log('Rows appended:', result.data.updates.updatedRows);
    } catch (error) {
        console.error('Error updating sheet:', error);
    }
};

module.exports = { updateSheet };
