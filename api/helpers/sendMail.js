import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendEmailRegister = async (email, username, url) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            logger : true,
            debug: true,
            secureConnection: false,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Activate your account',
            html: `<h2>Hello ${username}</h2>
                <p>Please click on the following link to activate your account:</p>
                <a href="${url}">${url}</a>`,
        });

        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
        throw error; // Ensure the error is propagated correctly
    }
};

export default sendEmailRegister;
