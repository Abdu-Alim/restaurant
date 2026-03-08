import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart, updateQuantity, clearCart } from "../store/slices/cartSlice";
import { createOrder } from "../store/slices/ordersSlice";
import { incrementOrderCount } from "../store/slices/dishesSlice";
import "./Cart.css";
import { useState } from "react";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total } = useSelector(state => state.cart);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { deliveryAreas } = useSelector(state => state.dishes);

  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [addressDetails, setAddressDetails] = useState('');

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert('Пожалуйста, войдите в систему для оформления заказа');
      return;
    }

    if (items.length === 0) {
      alert('Корзина пуста');
      return;
    }

    if (!selectedDistrict || !addressDetails.trim()) { // ИЗМЕНЕНИЕ: Проверка обоих полей
      alert('Пожалуйста, выберите район и укажите полный адрес доставки');
      return;
    }

    const fullAddress = `${selectedDistrict}, ${addressDetails}`; // ИЗМЕНЕНИЕ: Комбинируем район + детали

    dispatch(createOrder({
      userId: user.id,
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        options: item.options
      })),
      total: total,
      address: fullAddress // ИЗМЕНЕНИЕ: Передаём полный адрес
    }));

    items.forEach(item => {
      for (let i = 0; i < item.quantity; i++) {
        dispatch(incrementOrderCount(item.id));
      }
    });

    dispatch(clearCart());
    alert('Заказ успешно оформлен! Спасибо за покупку!');
    navigate('/menu');
  };

  if (items.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <h2>Корзина пуста</h2>
        <p>Добавьте блюда из меню</p>
        <Link to="/menu" className="back-to-menu">Перейти в меню</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Корзина</h1>
      
      <div className="cart-items">
        {items.map((item, index) => (
          <div key={index} className="cart-item">
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              {item.options && (
                <div className="cart-item-options">
                  {item.options.sauce && <span>Соус: {item.options.sauce}</span>}
                  {item.options.additions?.length > 0 && (
                    <span>Добавки: {item.options.additions.join(', ')}</span>
                  )}
                </div>
              )}
            </div>
            
            <div className="cart-item-controls">
              <div className="quantity-control">
                <button onClick={() => dispatch(updateQuantity({ index, quantity: item.quantity - 1 }))}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(updateQuantity({ index, quantity: item.quantity + 1 }))}>
                  +
                </button>
              </div>
              
              <span className="item-price">{item.price * item.quantity} сом</span> {}
              <button 
                className="remove-btn"
                onClick={() => dispatch(removeFromCart(index))}
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-footer">
    <div className="cart-total">
      <span>Итого:</span>
      <span className="total-price">{total} сом</span>
    </div>

    {}
    <div style={{ marginBottom: '1rem' }}>
      <label htmlFor="district">Район доставки:</label>
      <select 
        id="district"
        value={selectedDistrict}
        onChange={(e) => setSelectedDistrict(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}
      >
        <option value="">Выберите район</option>
        {deliveryAreas.map(area => (
          <option key={area} value={area}>{area}</option>
        ))}
      </select>

      <label htmlFor="addressDetails">Подробный адрес (улица, дом, квартира):</label>
      <input 
        type="text"
        id="addressDetails"
        value={addressDetails}
        onChange={(e) => setAddressDetails(e.target.value)}
        placeholder="Например: ул. Ленина, 10, кв. 5"
        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
      />
    </div>
    
    <div className="cart-actions">
      <button className="clear-btn" onClick={() => dispatch(clearCart())}>
        Очистить корзину
      </button>
      <button className="checkout-btn" onClick={handleCheckout}>
        Оформить заказ
      </button>
    </div>
  </div>
    </div>
  );
}

export default Cart;