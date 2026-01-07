function sendPostWithoutFetch() {
    const url = "https://auth.ort-one-pingone.com/f0f52ba9-9d84-40a4-99c6-26416327722d/davinci/connections/867ed4363b2bc21c860085ad2baa817d/capabilities/customHtmlMessage";

    // 1. Create a form element
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = url;
    form.style.display = 'none';

    // 2. Create an input to hold your JSON data
    // Note: Some APIs expect a raw body, but standard forms send as 'key=value'
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'data'; // You may need to check if the server accepts form-encoded JSON
    input.value = JSON.stringify({
        "nextEvent": {
            "constructType": "skEvent",
            "eventName": "continue",
            "params": [],
            "eventType": "post",
            "postProcess": {}
        },
        "eventName": "continue",
        "id": "b0qyqlpiyz",
        "interactionId": document.cookie.split('interactionId=')[1]?.split(';')[0]
    });

    form.appendChild(input);
    document.body.appendChild(form);

    // 3. Submit the form
    form.submit();
}

sendPostWithoutFetch();
