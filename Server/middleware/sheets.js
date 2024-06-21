const { google } = require('googleapis');
const { authenticate } = require('./gauth');

const updateSheet = async (spreadsheetId, range, values, totalMeetingDuration) => {
    try {
        const auth = await authenticate();
        const sheets = google.sheets({ version: 'v4', auth });
        const valueInputOption = 'RAW';

        // Define the headings
        const headings = [
            'Meet Code',
            'Date',
            'Start Time',
            'Stop Time',
            'Name',
            'Avatar URL',
            'Join Time',
            'Attended Duration (seconds)',
            'Percentage Attended',
            'Attendance'
        ];

        // Calculate percentage attended and attendance status for each participant
        values = values.map(row => {
            const attendedDurationSeconds = row[7];
            const attendedDurationMinutes = attendedDurationSeconds / 60;
            const percentageAttended = (attendedDurationMinutes / totalMeetingDuration) * 100;
            const attendance = percentageAttended >= 30 ? 'Present' : 'Absent';
            return [...row, percentageAttended.toFixed(2) + '%', attendance];
        });

        // Fetch existing values from the sheet
        const existingResponse = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range
        });

        const existingValues = existingResponse.data.values || [];

        // Check if headings are already present
        let hasHeadings = false;
        if (existingValues.length > 0) {
            hasHeadings = existingValues[0].every((heading, index) => heading === headings[index]);
        }

        // Prepare the data to be appended
        const dataToAppend = hasHeadings ? values : [headings, ...values];

        // Debugging logs
        console.log('Spreadsheet ID:', spreadsheetId);
        console.log('Range:', range);
        console.log('Values:', values);

        // Append the data
        const result = await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption,
            resource: {
                values: dataToAppend
            }
        });
        console.log('Cells updated:', result.data.updates.updatedCells);

    } catch (error) {
        console.error('Error updating sheet:', error);
    }
};

module.exports = { updateSheet };
