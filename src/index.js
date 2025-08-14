const express = require('express');
require('./db/mongoose')
const UserRouter = require('./router/user')
const TaskRouter = require('./router/task');
const nodemailer = require("nodemailer");
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(UserRouter)
app.use(TaskRouter)

const multer = require('multer');
const upload = multer({
    dest: 'images',
    limits: {
        fieldSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            cb(new Error('File must be a PDF!'))
        }
        cb(undefined, true)
    }
})

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post("/send-email", async (req, res) => {
    const { to, subject, message } = req.body;

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text: message
        });

        res.send({ success: true, message: "Email sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, error: "Failed to send email" });
    }
});

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})