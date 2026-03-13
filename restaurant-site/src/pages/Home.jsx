import './Home.css';
// import { dishes } from '../data/dishes';
import { useSelector } from 'react-redux';
import Popular from './Popular.jsx'; 
// import Footer from '../components/Footer.jsx';

function Home() {
  const { items: dishes } = useSelector(state => state.dishes);
  const popular = [...dishes]
    .sort((a, b) => b.orderCount - a.orderCount)
    .slice(0, 3);

  return (
    <div className='home'>
      <section className="hero">
        <p>Немецкая кухня • Пиво • Уют</p>
        <h2>Zur Gemütlichkeit</h2>
        <p>Найди свой уголок уюта. Аутентичная немецкая кухня, премиальное пиво и теплая атмосвера.</p>
        <button className="menubtn" onClick={() => window.location.href = "/menu"}>
          Посмотреть меню
        </button>
      </section>

      <section className="featured">
        <h2>Популярное</h2>
        <div className="grid">
          {popular.map(dish => <Popular key={dish.id} dish={dish} />)} {}
        </div>
      </section>
    </div>
  );
}

export default Home;