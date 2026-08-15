// ======================== NODEMAILER IMPLEMENTATION ========================
// Used for local development with Gmail SMTP
// Render free tier blocks SMTP ports (465/587), so Resend is used in production
// ============================================================================
// import nodeMailer from "nodemailer";
//
// export const sendEmail = async (options) => {
//     const transporter = nodeMailer.createTransport({
//         host: process.env.SMTP_HOST,
//         port: process.env.SMTP_PORT,
//         service: process.env.SMTP_SERVICE,
//         auth: {
//             user: process.env.SMTP_MAIL,
//             pass: process.env.SMTP_PASSWORD,
//         },
//     });
//     const mailOptions = {
//         from: process.env.SMTP_MAIL,
//         to: options.email,
//         subject: options.subject,
//         text: `${options.message} \n\n email of use who sent the message: ${options.userEmail}`,
//     };
//     await transporter.sendMail(mailOptions);
// };


// ======================== RESEND IMPLEMENTATION ========================
// Used for production on Render (uses HTTPS API, no SMTP ports needed)
// Falls back to Nodemailer for local development automatically
// =======================================================================
import { Resend } from "resend";
import nodeMailer from "nodemailer";

export const sendEmail = async (options) => {
    if (process.env.RESEND_API_KEY) {
        // Production: Use Resend HTTP API (works on Render free tier)
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
            from: `FlexHub <${process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"}>`,
            to: options.email,
            subject: options.subject,
            text: `${options.message} \n\n email of user who sent the message: ${options.userEmail}`,
        });
    } else {
        // Local Development: Use Nodemailer with Gmail SMTP
        const transporter = nodeMailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            service: process.env.SMTP_SERVICE,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });
        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: options.email,
            subject: options.subject,
            text: `${options.message} \n\n email of use who sent the message: ${options.userEmail}`,
        };
        await transporter.sendMail(mailOptions);
    }
};
