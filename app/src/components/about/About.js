import { useNavigate } from 'react-router-dom'
import './about.css'

const AboutComponent = () => {
    const navigate = useNavigate()

    return (
        <div className='about-cont'>

            <h1>Our Contacts</h1>

            <div className='about-contacts'>

                <div>
                    <i onClick={() => window.open('https://www.facebook.com/profile.php?id=100010478416709', '_blank')} className="fa-brands fa-facebook"></i>
                </div>

                <div>
                    <i onClick={() => window.open('https://www.instagram.com/emil.stoichev/', '_blank')} className="fa-brands fa-square-instagram"></i>
                </div>

                <div>
                    <i onClick={() => window.open('https://github.com/Emil-Stoychev', '_blank')} className="fa-brands fa-github"></i>
                </div>

                <div>
                    <i onClick={() => window.open('https://www.linkedin.com/', '_blank')} className="fa-brands fa-linkedin"></i>
                </div>

            </div>

        </div>
    )
}

export default AboutComponent