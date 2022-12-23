import './footer.module.css'

export const FooterComponent = () => {
    return (
        <footer>
            <div className="contacts">
                <i className="fa-brands fa-facebook"></i>

                <i className="fa-brands fa-square-instagram"></i>

                <i className="fa-brands fa-github"></i>
            </div>

            <p>© 2022 Copyright <span>|</span> Made by Emil Stoychev</p>
        </footer>
    )
}