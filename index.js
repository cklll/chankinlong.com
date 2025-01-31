const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const nodemailer = require("nodemailer");

const app = express();
app.use(bodyParser.json({ strict: true }));

const mailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE == "1",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const contactReceiverEmails = process.env.CONTACT_RECEIVER_EMAILS.split(',');
const smtpSenderEmail = process.env.SMTP_SENDER_EMAIL;

app.get('/', function (req, res) {
  res.sendFile('index.html', {
    root: __dirname,
  });
});

// just want to move this ugly thing out of controller
function generateEmailBody({ name, email, details }) {
  return {
    text: `
Name: ${name}\n
Email: ${email}\n
Details:\n
${details}
`.trim(),
  };
};

function validateContactPayload(body) {
  // very loose restriction - only require at least 1 key-value
  const keys = Object.keys(body);
  if (keys.length < 1)  {
    return false;
  }
  for (let key of keys) {
    if (body[key]) {
      return true;
    }
  }
  return false;
}

app.post('/contact', async function (req, res) {
  const { name, email, details } = req.body;
  const filterBody = { name, email, details };
  // log to CloudWatch to make sure the data is not lost if I broke the mail config
  console.info('Received a form submission: ' + JSON.stringify(filterBody));

  if (!validateContactPayload(filterBody)) {
    res.status(422);
    res.send({ message: 'Missing required fields.' });
    return;
  }

  try {
    await mailTransporter.sendMail({
      from: smtpSenderEmail,
      to: contactReceiverEmails,
      subject: '[chankinlong.com] You received a new message',
      ...generateEmailBody(filterBody),
    });

    res.send({ message: 'OK' });
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send({ message: 'Unexpected Error from server side.' });
  }
});

module.exports.handler = serverless(app);
