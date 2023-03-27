import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './about.css'

import * as trainingService from '../../services/trainingService.js'

const AboutComponent = () => {
    const navigate = useNavigate()
    const [countCont, setCountCont] = useState([0, 0, 0])

    let valueDisplays = document.querySelectorAll(".num");
    let interval = 3500;

    useEffect(() => {
        trainingService.gymBuddiesInNumbers()
            .then(res => setCountCont([res.users, res.trainingPrograms, res.fiveStars]))
    }, [])

    useEffect(() => {
        valueDisplays.forEach((x) => {
            let startValue = 0;
            let endValue = parseInt(x.getAttribute("data-val"));
            let duration = Math.floor(interval / endValue);
            let counter = setInterval(function () {
                startValue += 1;
                x.textContent = startValue;
                if (startValue == endValue) {
                    clearInterval(counter);
                }
            }, duration);
        });
    }, [countCont])

    return (
        <div className='about-cont'>

            <h1>GymBuddies in numbers</h1>

            <div className='numberCounting-div'>
                <div className="numberCounting">
                    <i className="fas fa-smile-beam"></i>
                    <span className="num" data-val={countCont[0]}>0</span>
                    <span className="text">Happy Users</span>
                </div>
                <div className="numberCounting">
                    <i className="fas fa-list"></i>
                    <span className="num" data-val={countCont[1]}>0</span>
                    <span className="text">Training Programs</span>
                </div>
                <div className="numberCounting">
                    <i className="fas fa-star"></i>
                    <span className="num" data-val={countCont[2]}>0</span>
                    <span className="text">Five Stars</span>
                </div>
            </div>

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