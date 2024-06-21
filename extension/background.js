chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
});
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === 'attendanceData') {
        
        console.log('Received attendance data in background.js:', message.data);

        chrome.runtime.sendMessage({
            type: 'attendanceData',
            data: message.data
        });
    }
});
