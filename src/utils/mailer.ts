//We can get the token by just simple by params id with []
// classizz.com/verifytoken/dsjlkfadshkja

//Client component this one is better using the window.location.search
//  classizz.com/verifytoken?token=dsjlkfadshkja

// Transpoter is created wgich is nodemailer.createTrasnport consists of the hostname, port, secure, etc 
// smtp host = mailtrap

import nodemailer from "nodemailer";
import User from "@/models/user";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    //Email = where to send the email, emailType = what type is the email verify token or forgot password, userID id of the user

    try {
        //Bcrypt giving a hash value 10 is the rounds we eant to go
        const hashToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, { verifyToken: hashToken, verifyTokenExpiry: Date.now() + 3600000 });
        }
        else if (emailType === "RESET") {
            //Update the hashed forget password
            await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashToken, forgotPasswordTokenExpiry: Date.now() + 3600000 });
        }


        // var transport = nodemailer.createTransport({
        //     host: "sandbox.smtp.mailtrap.io",
        //     port: 2525,
        //     auth: {
        //         user: "e8af31e6b8a157",
        //         pass: "bae87d0f20d513"
        //     }
        // });

        // var transport = nodemailer.createTransport({
        //     host: "live.smtp.mailtrap.io",
        //     port: 587,
        //     auth: {
        //         user: "api",
        //         pass: "2a14e9826feecb8d730061922aaafd33"
        //     }
        // });

        const email = 'jyotirmoybaidya57485@gmail.com'
        const pass = "eiyo iguk brin wnlu"

        var transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: email,
                pass: pass,
            }
        })

        const mailOptions = {
            from: "jyotirmoybaidya57485@gmail.com",
            to: `${email}`,
            subject: emailType === "VERIFY" ? "Verify you email" : "Reset your Password",
            html: `<p>
                        Click <a href="${process.env.NEXT_DOMAIN}/verifyemail?token=${hashToken}">here</a> to ${emailType === "VERIFY" ? "Verify you email" : "Reset your Password"}<br/><br/>
                    </p>`
        }

        const mailResp = await transport.sendMail(mailOptions);
        return mailResp;

    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
}
