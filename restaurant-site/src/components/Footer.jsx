import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div>
                    <h3>Zur Gemütlichkeit</h3>
                    <p>Адрес: ул. Шамшинская, 2, Город: Существует</p>
                </div>
                <p>© 2026 Ресторан первой команды. Ни одно из прав не защищено.</p>
                <nav className="nav">
                    <Link to="/">Главная</Link>
                    <Link to="/menu">Меню</Link>
                </nav>
                <div>
                    <p>Телефон: +996-555-55-55-55</p>
                    <p>Email: zurgemuetlichkeit@gmail.com</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
