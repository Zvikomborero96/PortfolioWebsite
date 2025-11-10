# Portfolio Website

A clean, modern portfolio website built with HTML, CSS, and vanilla JavaScript. Features a responsive design, smooth animations, and a contact form.

## Project Structure

```
PortfolioWebsite/
├── static-version/
│   ├── assets/        # Images and other media files
│   ├── css/          # Stylesheet files
│   │   └── styles.css
│   ├── js/           # JavaScript files
│   │   └── main.js
│   └── index.html    # Main HTML file
├── .git/             # Git version control
├── .gitignore        # Git ignore rules
└── README.md         # Project documentation
```

## Features

- Responsive design that works on all devices
- Modern glass-morphism UI with smooth animations
- Dark theme with gradient accents
- Mobile-friendly navigation
- Sections for About, Skills, Projects, Experience, and Contact
- Smooth scroll navigation
- Contact form functionality

## Running the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/Zvikomborero96/PortfolioWebsite.git
   ```

2. Navigate to the project directory:

   ```bash
   cd PortfolioWebsite/static-version
   ```

3. Open `index.html` in your browser or serve it using a local server:
   ```bash
   # Using Python
   python -m http.server 3000
   # Or using Node.js
   npx serve
   ```

## Contact Form Setup

For the contact form to work, you'll need a backend server. Here are two recommended approaches:

### Option 1: Simple Express.js Server

1. Create a new directory for the server:

   ```bash
   mkdir server
   cd server
   npm init -y
   npm install express cors dotenv nodemailer
   ```

2. Create `server.js`:

   ```javascript
   const express = require("express");
   const cors = require("cors");
   const nodemailer = require("nodemailer");
   require("dotenv").config();

   const app = express();
   app.use(cors());
   app.use(express.json());

   const transporter = nodemailer.createTransport({
     service: "gmail",
     auth: {
       user: process.env.EMAIL_USER,
       pass: process.env.EMAIL_PASS,
     },
   });

   app.post("/api/contact", async (req, res) => {
     try {
       const { name, email, message } = req.body;

       await transporter.sendMail({
         from: process.env.EMAIL_USER,
         to: "your@email.com", // Your email address
         subject: `Portfolio Contact: ${name}`,
         text: `
           Name: ${name}
           Email: ${email}
           Message: ${message}
         `,
       });

       res.status(200).json({ message: "Email sent successfully" });
     } catch (error) {
       console.error("Error:", error);
       res.status(500).json({ error: "Failed to send email" });
     }
   });

   const PORT = process.env.PORT || 3001;
   app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
   });
   ```

3. Create `.env` file:
   ```
   EMAIL_USER=your.email@gmail.com
   EMAIL_PASS=your-app-specific-password
   PORT=3001
   ```

### Option 2: Serverless Function (Netlify)

1. Create `netlify.toml` in the root directory:

   ```toml
   [build]
     functions = "functions"
     publish = "static-version"
   ```

2. Create a functions directory and contact function:

   ```bash
   mkdir functions
   ```

3. Create `functions/contact.js`:

   ```javascript
   const nodemailer = require("nodemailer");

   exports.handler = async function (event, context) {
     if (event.httpMethod !== "POST") {
       return { statusCode: 405, body: "Method Not Allowed" };
     }

     try {
       const { name, email, message } = JSON.parse(event.body);

       const transporter = nodemailer.createTransport({
         service: "gmail",
         auth: {
           user: process.env.EMAIL_USER,
           pass: process.env.EMAIL_PASS,
         },
       });

       await transporter.sendMail({
         from: process.env.EMAIL_USER,
         to: "your@email.com",
         subject: `Portfolio Contact: ${name}`,
         text: `
           Name: ${name}
           Email: ${email}
           Message: ${message}
         `,
       });

       return {
         statusCode: 200,
         body: JSON.stringify({ message: "Email sent successfully" }),
       };
     } catch (error) {
       return {
         statusCode: 500,
         body: JSON.stringify({ error: "Failed to send email" }),
       };
     }
   };
   ```

4. Install dependencies for the function:
   ```bash
   cd functions
   npm init -y
   npm install nodemailer
   ```

To use either backend solution, update the fetch URL in `main.js` to point to your backend endpoint:

- For Express.js: `http://localhost:3001/api/contact`
- For Netlify: `/.netlify/functions/contact`

## Customization

1. Edit `index.html` to update content and structure
2. Modify `css/styles.css` to change styles and animations
3. Update `js/main.js` to modify functionality
4. Add your images and assets to the `assets` directory

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - Feel free to use this project as a template for your own portfolio!
