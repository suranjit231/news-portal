// import nodemailer from 'nodemailer';

// export async function sendSubscriptionMail(user) {
//     // Create a transporter object using SMTP transport
//     let transporter = nodemailer.createTransport({
//         service: 'gmail', 
//         auth: {
//             user:process.env.News_Email, 
//             pass:process.env.Email_Password,
//         }
//     });

//     // Email content
//     let mailOptions = {
//         from:process.env.News_Email, 
//         to:user.email, 
//         subject: 'Welcome to Premium Access!', 
//         text: `Hello,

// Thank you for subscribing to the premium access of our news website!

// You now have unlimited access to all our premium content, including in-depth articles, exclusive interviews, and more.

// If you have any questions or need assistance, feel free to contact our support team.

// Best regards,
// News Website Team`, 
//         html: `<p>Hello ${user.username},</p>
//                <p>Thank you for subscribing to the premium access of our news website!</p>
//                <p>You now have unlimited access to all our premium content, including in-depth articles, exclusive interviews, and more.</p>
//                <p>If you have any questions or need assistance, feel free to contact our support team.</p>
//                <p>Best regards,<br>News Website Team</p>`
//     };

//     // sending email to the defined transport
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message sent: %s', info.messageId);
//     });
// }


// //-------- a function for sending otp for reset-password
// export function sendOtpMail(user, otp){

// }





import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

async function sendEmail(to, subject, text, html) {
    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.News_Email,
            pass: process.env.Email_Password,
        }
    });

    // Email content
    let mailOptions = {
        from: process.env.News_Email,
        to: to,
        subject: subject,
        text: text,
        html: html
    };

    // Send mail with defined transport object
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

export async function sendSubscriptionMail(user) {
    const subject = 'Welcome to Premium Access!';
    const text = `Hello,

Thank you for subscribing to the premium access of our news website!

You now have unlimited access to all our premium content, including in-depth articles, exclusive interviews, and more.

If you have any questions or need assistance, feel free to contact our support team.

Best regards,
News Website Team`;

    const html = `<p>Hello ${user.username},</p>
                  <p>Thank you for subscribing to the premium access of our news website!</p>
                  <p>You now have unlimited access to all our premium content, including in-depth articles, exclusive interviews, and more.</p>
                  <p>If you have any questions or need assistance, feel free to contact our support team.</p>
                  <p>Best regards,<br>News Website Team</p>`;

                  console.log("receiver email: ", user.email);
    await sendEmail(user.email, subject, text, html);
   
}

export async function sendOtpMail(user, otp) {
    console.log("sendOtpMail call: ", user, otp)
    const subject = 'Your OTP Code';
    const text = `Hello,

Your OTP code for resetting your password is ${otp}.

If you did not request this, please contact our support team immediately.

Best regards,
News Website Team`;

    const html = `<p>Hello ${user.username},</p>
                  <p>Your OTP code for resetting your password is <strong>${otp}</strong>.</p>
                  <p>If you did not request this, please contact our support team immediately.</p>
                  <p>Best regards,<br>News Website Team</p>`;

    await sendEmail(user.email, subject, text, html);
}
