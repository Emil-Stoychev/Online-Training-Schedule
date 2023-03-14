const nodemailer = require('nodemailer')
const { emailTemplate } = require('../utils/emailtemplate/emailtemplate')

const user = 'gymbuddiesteamservice@gmail.com'
const pass = 'nknceofvfrmyajup'

function sendEmail() {

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
            to: 'omaigash@abv.bg',
            subject: 'Email verification!',
            html: emailTemplate('aiosndoiuans234iuias')
        }

        transporter.sendMail(mail_configs, function (error, info) {
            if (error) {
                console.log(error)
                return reject({ message: 'An error has occured!' })
            }

            return resolve({ message: 'Email sent successfully!' })
        })

    })
}

module.exports = {
    sendEmail
}


