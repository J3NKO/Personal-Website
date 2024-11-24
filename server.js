//importing relavant libraries from express, nodemailer and bodyParser

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

//importing path module and cors middleware for future use incase I intergrate a remote backend without the same 
//port and domain
const cors = require('cors');
const path = require('path');

//.env file
require('dotenv').config({ path: './pass.env' });


//instance of express below
const app = express();
const PORT = process.env.PORT || 3000;
// ^ default port from environment and if not developement port 3000 

// Middleware set up
app.use(cors());
//automatically parsing incoming requests
app.use(bodyParser.json());

// Serving static files with express built in express.static method through 'app' server: from assets, css, js, images, and the root directory
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'js')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(__dirname)); // Serve the static HTML files directly


// POST route for sending emails to use with contact form (only need one)
app.post('/send-email', async (req, res) => {

    const { name, email, message } = req.body; //destructuring the contact form request

    const transporter = nodemailer.createTransport({
        host: 'smtp.mail.me.com',
        port: 587, //STARTTLS port
        secure: false, //STARTTLS will essentially upgrade the connection to secure so dont need to set to true
        auth: {
            user: process.env.ICLOUD_EMAIL, //hidden email in .env file
            pass: process.env.ICLOUD_PASSWORD, //hidden password in .env file
        },
        tls: {
            //dont need this I think because im using STARTTLS ----- ciphers: 'SSLv3',
            rejectUnauthorized: true //requires SMTP server to have valid ssl cert, no man in the middle for me attack for me!
        },
    });


    //mailOptions naming convention
    const mailOptions = {
        from: process.env.ICLOUD_EMAIL,
        to: process.env.ICLOUD_EMAIL,
        subject: `Contact Form Submission from ${name}`,
        text: message,
        replyTo: email //using reply to header as email is not authoraised to post to my email
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
