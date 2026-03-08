import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addToCart } from "../store/slices/cartSlice";
import "./DishCard.css";

function DishCard() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector(state => state.dishes);
  
  const dish = items.find(d => d.id === parseInt(id));
  
  const [selectedOptions, setSelectedOptions] = useState({
    sauce: null,
    additions: []
  });

  if (!dish) return <div className="not-found">Блюдо не найдено</div>;

  const sauces = [
    { name: 'Горчица', price: 0 },
    { name: 'BBQ', price: 40 },
    { name: 'Сырный', price: 60 }
  ];

  const additions = [
    { name: 'Халапеньо', price: 50 },
    { name: 'Жареный лук', price: 40 }
  ];

  const handleAddToCart = () => {
    const totalPrice = dish.price + 
      (selectedOptions.sauce?.price || 0) + 
      selectedOptions.additions.reduce((sum, a) => sum + a.price, 0);

    dispatch(addToCart({
      id: dish.id,
      name: dish.name,
      price: totalPrice,
      basePrice: dish.price,
      options: {
        sauce: selectedOptions.sauce?.name,
        additions: selectedOptions.additions.map(a => a.name)
      }
    }));
    dispatch(incrementOrderCount(dish.id));
    
    alert('Блюдо добавлено в корзину!');
    
    navigate('/menu');
  };

  return (
    <div className="dish-details">
      <div className="dish-details-image">
        <img 
          src={dish.image || `https://source.unsplash.com/600x400/?german-food,${dish.name}`} 
          alt={dish.name} 
        />
      </div>
      
      <div className="dish-details-info">
        <h1>{dish.name}</h1>
        <p className="description">{dish.description}</p>
        
        <div className="price-section">
          <span className="price-label">Базовая цена:</span>
          <span className="base-price">{dish.price} сом</span>
        </div>

        <div className="options-section">
          <h3>Выберите соус</h3>
          <div className="options-grid">
            {sauces.map(sauce => (
              <label key={sauce.name} className={`option-card ${selectedOptions.sauce?.name === sauce.name ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="sauce"
                  onChange={() => setSelectedOptions({...selectedOptions, sauce})}
                />
                <div className="option-content">
                  <span className="option-name">{sauce.name}</span>
                  {sauce.price > 0 && <span className="option-price">+{sauce.price} сом</span>}
                </div>
              </label>
            ))}
          </div>

          <h3>Добавки</h3>
          <div className="options-grid">
            {additions.map(add => (
              <label key={add.name} className={`option-card ${selectedOptions.additions.some(a => a.name === add.name) ? 'selected' : ''}`}>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedOptions({
                        ...selectedOptions,
                        additions: [...selectedOptions.additions, add]
                      });
                    } else {
                      setSelectedOptions({
                        ...selectedOptions,
                        additions: selectedOptions.additions.filter(a => a.name !== add.name)
                      });
                    }
                  }}
                />
                <div className="option-content">
                  <span className="option-name">{add.name}</span>
                  <span className="option-price">+{add.price} сом</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="total-price-section">
          <span>Итого:</span>
          <span className="total-price">
            {dish.price + 
              (selectedOptions.sauce?.price || 0) + 
              selectedOptions.additions.reduce((sum, a) => sum + a.price, 0)} сом
          </span>
        </div>

        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Добавить в корзину
        </button>
      </div>
    </div>
  );
}

export default DishCard;