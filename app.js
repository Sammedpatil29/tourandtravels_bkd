const express = require('express')
const nodemailer = require('nodemailer')
const bodyparser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 3000

app.use(bodyparser.json())
app.use(cors())

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'admin@smashthoughts.in',
        pass: 'cluh hjqh zqix yknw',
    },
});

app.post('/send-email', (req,res) => {
    const {name, contact, place , message} = req.body;

    const mailOptions = {
        from: 'admin@smashthoughts.in',
        to: 'srimahaadevtoursntravels@gmail.com',
        subject: 'New travel request from customer',
        text: `Name: ${name}\nContact: ${contact}\nPlace: ${place}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Error sending email', error });
        } else {
            return res.status(200).json({ message: 'Email sent successfully' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})