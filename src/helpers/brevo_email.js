// helpers/brevo_email.js
import dotenv from 'dotenv';
dotenv.config(); // Ensure env variables are loaded in this file

async function sendEmail(to, subject, htmlContent) {
    const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
    
    // Debug: This will show you in the console if the sender is missing
    const senderEmail = process.env.BREVO_SENDER;
    if (!senderEmail) {
        console.error("CRITICAL: BREVO_SENDER is not defined in your .env file!");
    }

    const emailData = {
        sender: { 
            name: "UMP", 
            email: senderEmail 
        },
        to: [{ email: to }],
        subject: subject,
        htmlContent: htmlContent,
    };

    try {
        const response = await fetch(BREVO_API_URL, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': process.env.BREVO_API_KEY,
                'content-type': 'application/json',
            },
            body: JSON.stringify(emailData),
        });

        const result = await response.json();

        if (!response.ok) {
            console.error("LiteAcad Email Error Details:", result);
            return { success: false, error: result };
        }

        console.log("LiteAcad Email Sent Successfully!");
        return { success: true, messageId: result.messageId };
    } catch (error) {
        console.error("LiteAcad Network Error:", error.message);
        throw error;
    }
}

export default sendEmail;