const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const attendanceRecords = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'attendance.html'));
});

app.post('/attendance', (req, res) => {
    const { name, set, subject, code, time } = req.body;

    if (!name || !set || !subject || !code || !time) {
        return res.status(400).send('All fields are required');
    }

    console.log(`Name: ${name}, Set: ${set}, Subject: ${subject}, Code: ${code}, Time: ${time}`);
    attendanceRecords.push({ name, set, subject, code, time });
    res.send('Attendance recorded successfully');
});

app.get('/records', (req, res) => {
    res.json(attendanceRecords);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
