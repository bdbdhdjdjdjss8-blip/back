const express = require('express');
const fs = require('fs');
const cors = require('cors'); // to allow your static site to call this API
const app = express();

app.use(cors());
app.use(express.json());

app.post('/log', (req, res) => {
    const entry = `${req.body.timestamp} - ${req.body.url}\n`;
    fs.appendFile('logs.txt', entry, err => {
        if (err) console.error(err);
    });
    res.sendStatus(200);
});

const port = process.env.PORT || 10000;
app.listen(port, () => console.log(`Server running on port ${port}`));
