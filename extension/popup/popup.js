
document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('btn');
    const List = document.getElementById('attendees-list');

    btn.addEventListener('click', async () => {
        try {
            const tabs = await chrome.tabs.query({ active: true, currentWindow: true });

            if (tabs.length === 0) {
                List.innerHTML = 'No active tab found';
                return;
            }

            const tab = tabs[0];

            // Send message to content.js to start tracking
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['scripts/content.js']
            }, (results) => {
                if (chrome.runtime.lastError) {
                    List.innerHTML = 'There was an error injecting script: \n' + chrome.runtime.lastError.message;
                } else {
                    List.innerHTML = 'Script injected successfully';
                }
            });

            chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
                if (message.type === 'attendanceData') {
                    const jsonData = message.data;
                    console.log('Received attendance data from content script:', jsonData);
            
                    fetch('http://localhost:3000/api/attendees', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(jsonData)
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                        sendResponse({ success: true });
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        sendResponse({ success: false });
                    });
            
                    return true;
                }
            });

        } catch (error) {
            List.innerHTML = 'An error occurred: \n' + error.message;
        }
    });
});
