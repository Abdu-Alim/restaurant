import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../store/slices/cartSlice";
import { incrementOrderCount } from "../store/slices/dishesSlice";
import "./Menu.css";

function Popular({ dish }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert('Пожалуйста, войдите в систему, чтобы добавить блюдо в корзину');
      return;
    }

    if (!dish.available) {
      alert('Это блюдо временно недоступно');
      return;
    }

    if (dish.hasOptions) {
      window.location.href = `/dish/${dish.id}`;
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
    <div className="menu-item"> {}
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
          <span className="price">{dish.price} сом</span> {}
          {dish.hasOptions ? (
            <Link to={`/dish/${dish.id}`} className="customize-btn">
              Настроить
            </Link>
          ) : (
            <button 
              className="add-btn"
              disabled={!dish.available}
              onClick={handleAddToCart}
            >
              Добавить
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Popular;