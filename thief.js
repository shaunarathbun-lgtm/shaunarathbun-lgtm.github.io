// Simple fetch request to your Oastify listener
fetch('https://mxnsskj6e98b6ppkq7vv2j4y6pcg09oy.oastify.com', {
    method: 'POST', // Sending as a POST
    mode: 'no-cors', // Ensures it fires even if the server doesn't send CORS headers
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        message: "Hello from Site A",
        timestamp: new Date().toISOString()
    })
})
.then(() => console.log("✅ Fetch sent successfully."))
.catch((err) => console.log("❌ Fetch failed: ", err));
