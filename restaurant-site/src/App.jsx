import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './App.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Auth from './components/Auth.jsx';
import Home from './pages/Home.jsx';
import Menu from './pages/Menu.jsx';
import DishCard from './pages/DishCard.jsx';
import Cart from './pages/Cart.jsx';
import Admin from './pages/Admin.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';

function App() {
  return (
    <Provider store={store}>
      <Header />
      <Auth />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/dish/:id" element={<DishCard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </Provider>
  );
}

export default App;
