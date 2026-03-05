import './HomePage.css';

function HomePage() {
  return (
    <div>
      <header>
        <h1>🍔 Пока не придумал название </h1>
        <p>Вкусно 😋 Быстро ⏱️ Дорого 🫰</p>
      </header>

      <main>
        <section>
          <h2>Добро пожаловать!</h2>
          <p>Зарегистрируйся или войди, чтобы увидеть меню и сделать заказ.</p>
          <button className='btn-sign'>Войти / Зарегистрироваться</button>
        </section>
      </main>

      <footer>
        <p>© 2026 Ресторан первой команды. Все права не защищены.</p>
      </footer>
    </div>
  );
}

export default HomePage;