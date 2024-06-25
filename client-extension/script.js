alert('title: ', document.title)
 
// Add event listener when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Query the active tab to get its URL
    let form_btn = document.getElementById('form-btn');


    
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // tabs is an array of tabs that match the query parameters

        // Select current tab from tabs
        let activeTab = tabs[0];

        // Display the URL of the active tab
        console.log('Active tab URL:', activeTab.url);

        // Get button of comment pop-up
        let comment = document.getElementById("comment").value;


        // For execute scripts current tab:
        chrome.scripting.executeScript({
            // set as current tab
            target: { tabId: activeTab.id },
            function: () => {
                // Get account name from youtube tab
                const user = document.getElementById("account-name").innerText

                form_btn.addEventListener('click', function (e) {
                    e.preventDefault();

                    console.log('Comment:', comment);

                    // Example: Perform a post request with comment and videoId

                    post_request(user, comment, videoId); // Replace "..." with your endpoint


                });

            }
        });
    });
});


function post_request(user, content, videoId) {
    fetch('http://localhost:3000/comments/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: content, videoId: videoId, user: user })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Comment successfully submitted:', data);
            // Handle success as needed (e.g., show confirmation to user)
        })
        .catch(error => {
            console.error('Error submitting comment:', error);
            // Handle errors (e.g., show error message to user)
        });
}



/*// Add event listener when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Query the active tab to get its URL

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // tabs is an array of tabs that match the query parameters

        // Select current tab from tabs
        let activeTab = tabs[0];

        // Display the URL of the active tab
        console.log('Active tab URL:', activeTab.url);

        // Get button of comment pop-up
        let form_btn = document.getElementById('form-btn');


        // For execute scripts current tab:
        chrome.scripting.executeScript({
            // set as current tab
            target: { tabId: activeTab.id },
            function: () => {
                // Manipulate the DOM of the active 
                const user = document.getElementById("account-name").innerText

                form_btn.addEventListener('click', function (e) {
                    e.preventDefault();

                    let comment = document.getElementById("comment").value;
                    console.log('Comment:', comment);

                    // Example: Perform a post request with comment and videoId

                    post_request(user, comment, videoId); // Replace "..." with your endpoint


                });

            }
        });
    });
});

const form_btn = document.getElementById('form-btn');

function post_request(user, content, videoId) {
    fetch('http://localhost:3000/comments/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: content, videoId: videoId, user: user })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Comment successfully submitted:', data);
            // Handle success as needed (e.g., show confirmation to user)
        })
        .catch(error => {
            console.error('Error submitting comment:', error);
            // Handle errors (e.g., show error message to user)
        });
}
*/