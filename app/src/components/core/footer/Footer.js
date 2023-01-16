import './footer.module.css'

export const FooterComponent = () => {
    return (
        <footer>
            <p>© {new Date().getFullYear()} Copyright <span>|</span> Made by Emil Stoychev</p>
        </footer>
    )
}