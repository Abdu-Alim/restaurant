import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, register, toggleAuth, toggleRegisterMode } from '../store/slices/authSlice';
import './Auth.css';

function Auth() {
  const dispatch = useDispatch();
  const { showAuth, isRegistering } = useSelector(state => state.auth);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  if (!showAuth) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      dispatch(register(formData));
    } else {
      dispatch(login({ email: formData.email, password: formData.password }));
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="auth-modal-overlay" onClick={() => dispatch(toggleAuth(false))}>
      <div className="auth-modal" onClick={e => e.stopPropagation()}>
        <h2>{isRegistering ? 'Регистрация' : 'Вход'}</h2>
        
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <input
              type="text"
              name="name"
              placeholder="Имя"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          <button type="submit">
            {isRegistering ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </form>
        
        <button 
          className="switch-btn"
          onClick={() => dispatch(toggleRegisterMode())}
        >
          {isRegistering ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
        </button>
        
        <button 
          className="close-btn"
          onClick={() => dispatch(toggleAuth(false))}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}

export default Auth;
