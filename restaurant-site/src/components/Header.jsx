import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleAuth, logout } from "../store/slices/authSlice";
import "./Header.css";

function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [navOpen, setNavOpen] = useState(false);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { items } = useSelector(state => state.cart);

  useEffect(() => {
    setNavOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 992px)");
    const syncBodyScroll = () => {
      if (mq.matches && navOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    };
    syncBodyScroll();
    mq.addEventListener("change", syncBodyScroll);
    return () => {
      mq.removeEventListener("change", syncBodyScroll);
      document.body.style.overflow = "";
    };
  }, [navOpen]);

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo" onClick={() => setNavOpen(false)}>
          Zur Gemütlichkeit
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={navOpen}
          aria-controls="main-nav"
          aria-label={navOpen ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setNavOpen((o) => !o)}
        >
          <span className="menu-toggle-bar" aria-hidden />
          <span className="menu-toggle-bar" aria-hidden />
          <span className="menu-toggle-bar" aria-hidden />
        </button>

        <nav
          id="main-nav"
          className={`nav${navOpen ? " nav--open" : ""}`}
        >
          <Link to="/">Главная</Link>
          <Link to="/menu">Меню</Link>
          <Link to="/about">О нас</Link>
          <Link to="/contact">Контакты</Link>
          {isAuthenticated && user?.role === "admin" && (
            <Link to="/admin">Админ</Link>
          )}
        </nav>

        <div className="header-actions">
          <Link to="/cart" className="cart-link">
            <span className="cart-label">Корзина</span>
            <span className="cart-count">{items.length}</span>
          </Link>

          {isAuthenticated ? (
            <div className="user-block">
              <span className="user-name">{user?.name}</span>
              <button
                type="button"
                className="loginBtn"
                onClick={() => dispatch(logout())}
              >
                Выйти
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="loginBtn"
              onClick={() => dispatch(toggleAuth(true))}
            >
              Войти
            </button>
          )}
        </div>
      </div>

      {navOpen && (
        <button
          type="button"
          className="nav-backdrop"
          aria-label="Закрыть меню"
          onClick={() => setNavOpen(false)}
        />
      )}
    </header>
  );
}

export default Header;
