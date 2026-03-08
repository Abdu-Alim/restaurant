import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDish, updateDish, deleteDish, toggleAvailability } from "../store/slices/dishesSlice";
import { deleteReview } from "../store/slices/reviewsSlice";
import "./Admin.css";

function Admin() {
  const dispatch = useDispatch();
  const { items: dishes } = useSelector(state => state.dishes);
  const { items: reviews } = useSelector(state => state.reviews);
  const { items: orders } = useSelector(state => state.orders);
  
  const [activeTab, setActiveTab] = useState('dishes');
  const [editingDish, setEditingDish] = useState(null);
  
  const categories = ['Горячие блюда', 'Колбаски и закуски', 'Пиво и напитки', 'Десерты'];
  
  const [newDish, setNewDish] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Горячие блюда',
    image: '',
    hasOptions: false
  });

  const handleAddDish = (e) => {
    e.preventDefault();
    dispatch(addDish({
      ...newDish,
      price: parseInt(newDish.price)
    }));
    setNewDish({
      name: '',
      description: '',
      price: '',
      category: 'Горячие блюда',
      image: '',
      hasOptions: false
    });
  };

  const handleUpdateDish = (e) => {
    e.preventDefault();
    dispatch(updateDish({
      ...editingDish,
      price: parseInt(editingDish.price)
    }));
    setEditingDish(null);
  };

  const startEditing = (dish) => {
    setEditingDish({ ...dish });
  };

  return (
    <div className="admin-page">
      <h1>Панель администратора</h1>
      
      <div className="admin-tabs">
        <button 
          className={activeTab === 'dishes' ? 'active' : ''}
          onClick={() => setActiveTab('dishes')}
        >
          Блюда
        </button>
        <button 
          className={activeTab === 'orders' ? 'active' : ''}
          onClick={() => setActiveTab('orders')}
        >
          Заказы ({orders.length})
        </button>
        <button 
          className={activeTab === 'reviews' ? 'active' : ''}
          onClick={() => setActiveTab('reviews')}
        >
          Отзывы ({reviews.length})
        </button>
      </div>

      {activeTab === 'dishes' && (
        <div className="admin-section">
          <h2>Управление блюдами</h2>
          
          {editingDish ? (
            <form onSubmit={handleUpdateDish} className="add-dish-form">
              <h3>Редактировать блюдо</h3>
              <input
                type="text"
                placeholder="Название блюда"
                value={editingDish.name}
                onChange={(e) => setEditingDish({...editingDish, name: e.target.value})}
                required
              />
              <textarea
                placeholder="Описание"
                value={editingDish.description}
                onChange={(e) => setEditingDish({...editingDish, description: e.target.value})}
                required
              />
              <input
                type="number"
                placeholder="Цена"
                value={editingDish.price}
                onChange={(e) => setEditingDish({...editingDish, price: e.target.value})}
                required
              />
              <select
                value={editingDish.category}
                onChange={(e) => setEditingDish({...editingDish, category: e.target.value})}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="URL изображения (оставьте пустым для автоматического)"
                value={editingDish.image}
                onChange={(e) => setEditingDish({...editingDish, image: e.target.value})}
              />
              <label>
                <input
                  type="checkbox"
                  checked={editingDish.hasOptions}
                  onChange={(e) => setEditingDish({...editingDish, hasOptions: e.target.checked})}
                />
                Есть опции/добавки
              </label>
              <div className="form-actions">
                <button type="button" onClick={() => setEditingDish(null)}>Отмена</button>
                <button type="submit">Сохранить</button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleAddDish} className="add-dish-form">
              <h3>Добавить новое блюдо</h3>
              <input
                type="text"
                placeholder="Название блюда"
                value={newDish.name}
                onChange={(e) => setNewDish({...newDish, name: e.target.value})}
                required
              />
              <textarea
                placeholder="Описание"
                value={newDish.description}
                onChange={(e) => setNewDish({...newDish, description: e.target.value})}
                required
              />
              <input
                type="number"
                placeholder="Цена"
                value={newDish.price}
                onChange={(e) => setNewDish({...newDish, price: e.target.value})}
                required
              />
              <select
                value={newDish.category}
                onChange={(e) => setNewDish({...newDish, category: e.target.value})}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="URL изображения (оставьте пустым для автоматического)"
                value={newDish.image}
                onChange={(e) => setNewDish({...newDish, image: e.target.value})}
              />
              <label>
                <input
                  type="checkbox"
                  checked={newDish.hasOptions}
                  onChange={(e) => setNewDish({...newDish, hasOptions: e.target.checked})}
                />
                Есть опции/добавки
              </label>
              <button type="submit">Добавить блюдо</button>
            </form>
          )}

          <div className="dishes-list">
            <h3>Существующие блюда</h3>
            {dishes.map(dish => (
              <div key={dish.id} className="dish-admin-item">
                <div className="dish-info">
                  <strong>{dish.name}</strong> - {dish.price} сом
                  <span className="category-badge">{dish.category}</span>
                  <span className={`availability ${dish.available ? 'available' : 'unavailable'}`}>
                    {dish.available ? 'В наличии' : 'Нет в наличии'}
                  </span>
                  <span className="order-count">Заказов: {dish.orderCount || 0}</span>
                </div>
                <div className="dish-actions">
                  <button onClick={() => startEditing(dish)}>Редактировать</button>
                  <button onClick={() => dispatch(toggleAvailability(dish.id))}>
                    {dish.available ? 'Снять' : 'Добавить'}
                  </button>
                  <button onClick={() => dispatch(deleteDish(dish.id))}>Удалить</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="admin-section">
          <h2>Управление заказами</h2>
          {orders.length === 0 ? (
            <p className="no-items">Пока нет заказов</p>
          ) : (
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-admin-item">
                  <div className="order-header">
                    <span className="order-id">Заказ #{order.id}</span>
                    <span className={`order-status status-${order.status}`}>{order.status}</span>
                    <span className="order-date">{new Date(order.date).toLocaleString()}</span>
                  </div>
                  <div className="order-details">
                    <div className="order-customer">
                      <strong>Клиент:</strong> {order.userId}
                    </div>
                    <div className="order-items">
                      <strong>Блюда:</strong>
                      <ul>
                        {order.items.map((item, idx) => (
                          <li key={idx}>
                            {item.name} x{item.quantity} - {item.price * item.quantity} сом
                            {item.options && (
                              <small>
                                {item.options.sauce && ` (Соус: ${item.options.sauce})`}
                                {item.options.additions?.length > 0 && 
                                  ` (Добавки: ${item.options.additions.join(', ')})`}
                              </small>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="order-total">
                      <strong>Итого:</strong> {order.total} сом
                    </div>
                    <div className="order-address">
                      <strong>Адрес доставки:</strong> {order.address}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="admin-section">
          <h2>Управление отзывами</h2>
          {reviews.length === 0 ? (
            <p className="no-items">Пока нет отзывов</p>
          ) : (
            reviews.map(review => (
              <div key={review.id} className="review-admin-item">
                <div>
                  <strong>{review.author}</strong> - Оценка: {'★'.repeat(review.rating)}
                  <p>{review.text}</p>
                  <small>{new Date(review.date).toLocaleDateString()}</small>
                </div>
                <button onClick={() => dispatch(deleteReview(review.id))}>
                  Удалить
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Admin;