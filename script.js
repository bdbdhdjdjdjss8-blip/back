// Send a log request when someone visits
fetch('https://YOUR-API-URL.onrender.com/log', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        timestamp: new Date().toISOString(),
        url: window.location.href
    })
});
