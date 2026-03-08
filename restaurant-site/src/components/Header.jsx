import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleAuth, logout } from "../store/slices/authSlice";
import "./Header.css";

function Header() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { items } = useSelector(state => state.cart);

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          Zur Gemütlichkeit
        </Link>

        <nav className="nav">
          <Link to="/">Главная</Link>
          <Link to="/menu">Меню</Link>
          <Link to="/about">О нас</Link>
          <Link to="/contact">Контакты</Link>
          {isAuthenticated && user?.role === 'admin' && (
            <Link to="/admin">Админ</Link>
          )}
        </nav>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>
            Корзина ({items.length})
          </Link>
          
          {isAuthenticated ? (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span style={{ color: '#C89B3C' }}>{user?.name}</span>
              <button className="loginBtn" onClick={() => dispatch(logout())}>
                Выйти
              </button>
            </div>
          ) : (
            <button 
              className="loginBtn" 
              onClick={() => dispatch(toggleAuth(true))}
            >
              Войти
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
