//importing relavant libraries from express

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware set up
app.use(cors());
app.use(bodyParser.json());

// Serving my static files from 'assets', 'css', 'js', 'images', and root directory
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'js')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(__dirname)); // Serve the HTML files directly

// POST route for sending email
app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password',
        },
    });

    const mailOptions = {
        from: email,
        to: 'your-email@gmail.com',
        subject: `New Contact Form Submission from ${name}`,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to send email');
    }
});

// Start the server on port 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
