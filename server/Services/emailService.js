const nodemailer = require('nodemailer')
const shortid = require('shortid');
const { verificationComplete } = require('../utils/emailtemplate/completeVerification');
const { emailTemplate } = require('../utils/emailtemplate/emailtemplate')

const user = 'gymbuddiesteamservice@gmail.com'
const pass = 'nknceofvfrmyajup'

function sendEmail(option, email, id) {

    return new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user,
                pass
            }
        })

        const mail_configs = {
            from: user,
            to: email,
            subject: option == 'sendCode' ? 'Email verification!' : 'Verification successful!',
            html: option == 'sendCode' ? emailTemplate(id) : verificationComplete()
        }

        transporter.sendMail(mail_configs, function (error, info) {
            try {
                return resolve({ message: 'Email sent successfully!' })
            } catch (error) {
                console.log(error);
                return reject({ message: 'An error has occured!' })
            }
        })

    })
}

module.exports = {
    sendEmail
}


