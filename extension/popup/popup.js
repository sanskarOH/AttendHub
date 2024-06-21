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
        } catch (error) {
            List.innerHTML = 'An error occurred: \n' + error.message;
        }
    });
});
