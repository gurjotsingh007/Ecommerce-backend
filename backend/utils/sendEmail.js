const nodeMailer = require("nodemailer");

const sendEmail = async(options) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.HOST,
        port: 587,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }

    });

    const mailOptions = {
        from:process.env.SMTP_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message
    };

    // await transporter.sendMail(mailOptions);
    await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
       console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          // do something useful
        }
    });
}
module.exports = sendEmail;

// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const sendEmail = async (options) => {
//     const msg = {
//         to: options.email,
//         from: process.env.SMTP_MAIL, // Corrected variable name
//         subject: options.subject,
//         text: options.message,
//         html: options.message
//     };

//     try {
//         await sgMail.send(msg);
//         console.log('Email sent via SendGrid');
//     } catch (error) {
//         console.error('Error sending email via SendGrid:\n\n', error);
//     }
// };

// module.exports = sendEmail;

// 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


// SMTP_SERVICE=gmail
// SMTP_MAIL=noreplase69@gmail.com
// SMTP_PASSWORD=fmdmluyfkrxfrtii
// SENDGRID_API_KEY=yHf1doAYS1KoQEr0MasTNQ

// const transporter = nodeMailer.createTransport({
//     host: 'smtp.gmail.com',
// port: 465,
// service:process.env.SERVICE,

// auth: {
//     user: process.env.SMTP_MAIL,
//     pass: process.env.SMTP_PASSWORD
// }
// });

// const mailOptions = {
//     from:process.env.SMTP_MAIL,
//     to:options.email,
//     subject:options.subject,
//     text:options.message
// };



// SMTP_SERVICE=gmail
// SMTP_MAIL=noreplase69@gmail.com
// SMTP_PASSWORD=fmdmluyfkrxfrtii
// SENDGRID_API_KEY=yHf1doAYS1KoQEr0MasTNQ