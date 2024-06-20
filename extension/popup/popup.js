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
                    const attendees = results[0].result;
                    if (attendees && attendees.length > 0) {
                        List.innerHTML = 'Attendees List:';
                        attendees.forEach(attendee => {
                            const li = document.createElement('li');
                            li.textContent = attendee;
                            List.appendChild(li);
                        });
                         const btn = document.createElement('button');
                         btn.textContent = 'Log Sheets';
                         List.appendChild(btn);
                         btn.addEventListener('click' , async ()=>{
                             try{
                                 const response = await fetch('http://localhost:3000/api/attendees', {
                                     method: 'POST',
                                     headers: {
                                         'Content-Type': 'application/json'
                                     },
                                     body: JSON.stringify({attendees})
                                 });
                                 if(response.ok){
                                     List.innerHTML = 'Attendees logged successfully';}
                                 else{
                                     List.innerHTML = 'An error occurred: \n' + response.statusText;
                                 }

                             }catch(error){
                                 List.innerHTML = 'An error occurred: \n' + error.message;
                             }

                        
                         });
                    } else {
                        List.innerHTML = 'No attendees found';
                    }
                }
            });
        } catch (error) {
            List.innerHTML = 'An error occurred: \n' + error.message;
        }
    });
});
