const { google } = require('googleapis');
const { authenticate } = require('./gauth');

const updateSheet = async (spreadsheetId, range, values) => {
    try {
        const auth = await authenticate();
        const sheets = google.sheets({ version: 'v4', auth });
        const valueInputOption = 'RAW';
        const resource = { values };

        // Debugging logs
        console.log('Spreadsheet ID:', spreadsheetId);
        console.log('Range:', range);
        console.log('Values:', values);

        const result = await sheets.spreadsheets.values.update({
            spreadsheetId,
            range,
            valueInputOption,
            resource
        });
        console.log('Cells updated:', result.data.updatedCells);
    } catch (error) {
        console.error('Error updating sheet:', error);
    }
};

module.exports = { updateSheet };
