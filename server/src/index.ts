import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// FIX: Allow specific origins - add your deployed frontend URL here
const allowedOrigins = [
  'http://localhost:5173',   // Vite dev server
  'http://localhost:4173',   // Vite preview
  process.env.CLIENT_URL,    // Set this in production .env to your deployed frontend URL
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  methods: ['POST', 'GET'],
}));

app.use(express.json());

// Health check route - useful for deployment platforms
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Email Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,  // Use a Gmail App Password, NOT your real password
  },
});

// Contact form route
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,           // Must be your Gmail (Gmail overrides "from")
      replyTo: `"${name}" <${email}>`,         // Visitor's email goes here so you can reply to them
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact: Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Contact form email sent from ${email}`);

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
