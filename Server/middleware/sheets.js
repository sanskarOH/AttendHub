const { google } = require('googleapis');
const { authenticate } = require('./gauth');

const updateSheet = async (spreadsheetId, range, values) => {
    try {
        const auth = await authenticate();
        const sheets = google.sheets({ version: 'v4', auth });
        const valueInputOption = 'RAW';
        const resource = { values };

        const existingValues = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range
        });

        const hasNewValues = false;
        for (let i = 0; i<existingValues.length;i++){
            if (existingValues[i] !== values[i]){
                hasNewValues = true;
                break;
            }
        }

        // Debugging logs
        console.log('Spreadsheet ID:', spreadsheetId);
        console.log('Range:', range);
        console.log('Values:', values);

        if(!hasNewValues){
            console.log('no new values to update in sheets!')
            resource;
        } else{
            const result = await sheets.spreadsheets.values.update({
                spreadsheetId,
                range,
                valueInputOption,
                resource
            });
            console.log('Cells updated:', result.data.updatedCells);
        }

    
    } catch (error) {
        console.error('Error updating sheet:', error);
    }
};

module.exports = { updateSheet };