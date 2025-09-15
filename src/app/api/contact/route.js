// app/api/contact/route.ts
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // ensures node runtime (not edge)

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, email, subject, message } = body || {};

        // Basic server-side validation
        if (!name || !email || !message) {
            return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
        }

        // nodemailer transporter using Gmail SMTP (app password)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER, // mtalhamanzoor1930@gmail.com
                pass: process.env.GMAIL_PASS, // app password (16-chars)
            },
        });

        const mailSubject = subject && subject.trim() !== "" ? subject : `New message from ${name}`;

        const mailOptions = {
            from: `"${name}" <${process.env.GMAIL_USER}>`, // shows as coming from your gmail account (sender)
            to: process.env.GMAIL_USER, // you receive the message
            replyTo: email, // reply will go to the visitor's email
            subject: mailSubject,
            text:
                `You received a new message from your website contact form.\n\n` +
                `Name: ${name}\nEmail: ${email}\nSubject: ${mailSubject}\n\nMessage:\n${message}`,
            html:
                `<h3>New message from website contact form</h3>` +
                `<p><strong>Name:</strong> ${name}<br/><strong>Email:</strong> ${email}<br/><strong>Subject:</strong> ${mailSubject}</p>` +
                `<hr/><p>${(message || "").replace(/\n/g, "<br/>")}</p>`,
        };

        // Send mail
        await transporter.sendMail(mailOptions);

        // Optionally: send a quick acknowledgement email back to visitor
        // (uncomment below if you want to send an auto-reply to the user)
        /*
        await transporter.sendMail({
          from: `"Your Company" <${process.env.GMAIL_USER}>`,
          to: email,
          subject: `Thanks for contacting us, ${name}!`,
          text: `Hi ${name},\n\nThanks for reaching out. We've received your message and will get back to you shortly.\n\n— Team`,
          html: `<p>Hi ${name},</p><p>Thanks for reaching out. We've received your message and will get back to you shortly.</p><p>— Team</p>`,
        });
        */

        return NextResponse.json({ message: "Message sent successfully. Thank you!" }, { status: 200 });
    } catch (err) {
        console.error("Error in /api/contact:", err);
        return NextResponse.json({ error: "Failed to send email. Please try again later." }, { status: 500 });
    }
}
