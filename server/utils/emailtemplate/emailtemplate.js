function emailTemplate(code) {
    return (`
            <div style="background: radial-gradient(circle at 10% 20%,rgb(98, 114, 128) 0%,rgb(52, 63, 51) 90.1%); border-radius: 1rem; width: 100%; height: 100%;">
                <div style="background: linear-gradient(-20deg, #616161 0%, #9bc5c3 100%); border-radius: 1rem;">
                    <article>
                        <img src="./robot.gif" alt="" />
                    </article>
                    <article>
                        <h3 style="padding: 2rem 1rem; letter-spacing: 1px; color: white; text-align: center">Thanks for joining GymBuddies!</h3>
                        
                        <h3 style="padding: 2rem 1rem; letter-spacing: 1px; color: white; text-align: center;">To finish signing up, please confirm your email address with this code</h3>
                        
                        <h2 style="padding: 1.5rem 2rem; letter-spacing: 1px; color: white; text-align: center; background-color: rgb(190, 79, 79); border-radius: 1rem; margin: 0 auto;"><b>${code}</b></h2>
                    </article>
                    <article>
                        <p style="padding: 2rem 1rem; letter-spacing: 1px; text-align: center; color: white;">Thanks, GymBuddies Team!</p>
                    </article>
                </div>
            </div>
        `)
}

module.exports = {
    emailTemplate
}