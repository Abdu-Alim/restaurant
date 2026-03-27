import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h3>Zur Gemütlichkeit</h3>
          <p className="footer-address">
            Адрес: ул. Шамшинская, 2, Город: Существует
          </p>
        </div>

        <nav className="footer-nav" aria-label="Навигация в подвале">
          <Link to="/">Главная</Link>
          <Link to="/menu">Меню</Link>
        </nav>

        <p className="footer-copy">
          © 2026 Ресторан первой команды. Ни одно из прав не защищено.
        </p>

        <div className="footer-contact">
          <p>
            <span className="footer-contact-label">Телефон:</span>{" "}
            +996-555-55-55-55
          </p>
          <p>
            <span className="footer-contact-label">Email:</span>{" "}
            <a href="mailto:zurgemuetlichkeit@gmail.com">
              zurgemuetlichkeit@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
