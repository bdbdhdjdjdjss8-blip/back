// const express = require('express');
// const fs = require('fs');
// const cors = require('cors'); // to allow your static site to call this API
// const app = express();

// app.use(cors());
// app.use(express.json());

// app.post('/log', (req, res) => {
//     const entry = `${req.body.timestamp} - ${req.body.url}\n`;
//     fs.appendFile('logs.txt', entry, err => {
//         if (err) console.error(err);
//     });
//     res.sendStatus(200);
// });

// const port = process.env.PORT || 10000;
// app.listen(port, () => console.log(`Server running on port ${port}`));
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Trust Render's proxy so req.ip works correctly
app.set('trust proxy', true);

app.post('/log', (req, res) => {
    const timestamp = req.body.timestamp;
    const url = req.body.url;
    const ip = req.ip; // real visitor IP
    const userAgent = req.headers['user-agent']; // browser/device info

    const entry = `${timestamp} | IP: ${ip} | URL: ${url} | UA: ${userAgent}`;
    
    // Write to Render console (visible in Logs)
    console.log(entry);

    // Write also to logs.txt (optional)
    fs.appendFile('logs.txt', entry + "\n", err => {
        if (err) console.error(err);
    });

    res.sendStatus(200);
});

const port = process.env.PORT || 10000;
app.listen(port, () => console.log(`Server running on port ${port}`));


