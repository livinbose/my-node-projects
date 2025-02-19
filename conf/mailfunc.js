const mailSentFunction = () => {
    console.log("===========mailSentFunction===========");
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'livinbose5@gmail.com', // Your email
            pass: 'dchl viey uldz lfcz' // App password
        }
    });
    let OTP = '1234';
    // Send OTP via Email
    const mailOptions = {
        from: 'livinbose5@gmail.com',
        to: 'livinbose0@gmail.com',
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${OTP}. It expires in 10 minutes.`
    };

    transporter.sendMail(mailOptions, (error, info) => {

        if (error) {
            console.log("Errrr",error);
        }
        console.log("INFO===",info)
        // if (error) return res.status(500).json({ error }
        // if );
        // res.json({ message: 'OTP sent successfully' });
    });

}


exports.mailSentFunction = mailSentFunction;
