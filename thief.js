async function triggerContinueEvent() {
    // 1. Dynamically get the IDs from the cookies so it works for any user
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const currentInteractionId = getCookie('interactionId');

    // 2. The URL and Payload using the dynamic ID
    const url = "https://auth.ort-one-pingone.com/f0f52ba9-9d84-40a4-99c6-26416327722d/davinci/connections/867ed4363b2bc21c860085ad2baa817d/capabilities/customHtmlMessage";

    const payload = {
        "nextEvent": {
            "constructType": "skEvent",
            "eventName": "continue",
            "params": [],
            "eventType": "post",
            "postProcess": {}
        },
        "eventName": "continue",
        "id": "b0qyqlpiyz", // This ID might also be found in the page HTML if it changes
        "interactionId": currentInteractionId
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Interactionid': currentInteractionId,
                'Interactiontoken': 'undefined', // Matches your reference
                'Origin-Cookies': '%7B%7D'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Success! Site A server responded:", data);
            
            // OPTIONAL: If you want to move the user to the next page automatically:
            // window.location.reload(); 
        }
    } catch (error) {
        console.error('Action failed:', error);
    }
}

triggerContinueEvent();
