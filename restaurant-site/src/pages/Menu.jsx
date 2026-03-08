import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../store/slices/cartSlice";
import { incrementOrderCount } from "../store/slices/dishesSlice";
import "./Menu.css";

function Menu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector(state => state.dishes);
  const { isAuthenticated } = useSelector(state => state.auth);
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Все', 'Горячие блюда', 'Колбаски и закуски', 'Пиво и напитки', 'Десерты', 'Фирменные блюда'];

  const filteredDishes = items.filter(dish => {
    const matchesCategory = selectedCategory === 'Все' || dish.category === selectedCategory;
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const hasOptions = (dishName) => {
    const optionsDishes = ['Братвурст', 'Шницель'];
    return optionsDishes.includes(dishName);
  };

  const handleAddToCart = (dish) => {
    if (!isAuthenticated) {
      alert('Пожалуйста, войдите в систему, чтобы добавить блюдо в корзину');
      return;
    }

    if (!dish.available) {
      alert('Это блюдо временно недоступно');
      return;
    }

    if (hasOptions(dish.name)) {
      navigate(`/dish/${dish.id}`);
      return;
    }

    dispatch(addToCart({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      options: null
    }));
    dispatch(incrementOrderCount(dish.id));

    alert(`${dish.name} добавлено в корзину!`);
  };

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1>Меню</h1>
        
        <div className="menu-filters">
          <div className="category-filter">
            {categories.map(cat => (
              <button
                key={cat}
                className={selectedCategory === cat ? 'active' : ''}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <input
            type="text"
            placeholder="Поиск по блюдам..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {filteredDishes.length === 0 ? (
        <div className="no-dishes">
          <p>В этой категории пока нет блюд</p>
        </div>
      ) : (
        <div className="menu-grid">
          {filteredDishes.map(dish => (
            <div key={dish.id} className="menu-item">
              <div className="menu-item-image">
                <img 
                  src={dish.image || `https://source.unsplash.com/300x200/?german-food,${dish.name}`} 
                  alt={dish.name} 
                />
                {!dish.available && (
                  <div className="out-of-stock">Нет в наличии</div>
                )}
              </div>
              <div className="menu-item-info">
                <h3>{dish.name}</h3>
                <p>{dish.description}</p>
                <div className="menu-item-footer">
                  <span className="price">{dish.price} сом</span>
                  {hasOptions(dish.name) ? (
                    <Link to={`/dish/${dish.id}`} className="customize-btn">
                      Настроить
                    </Link>
                  ) : (
                    <button 
                      className="add-btn"
                      disabled={!dish.available}
                      onClick={() => handleAddToCart(dish)}
                    >
                      Добавить
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;