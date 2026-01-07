fetch('https://mxnsskj6e98b6ppkq7vv2j4y6pcg09oy.oastify.com', {
    method: 'POST',
    mode: 'no-cors', 
    // Remove the headers object entirely
    body: JSON.stringify({
        message: "Hello from Site A",
        timestamp: new Date().toISOString()
    })
})
