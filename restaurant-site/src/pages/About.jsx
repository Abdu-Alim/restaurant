import "./About.css";

function About() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>О нас</h1>
        <p>История традиций и уюта в самом сердце Москвы</p>
      </div>
      
      <div className="about-content">
        <div className="about-section">
          <div className="about-text">
            <h2>Наша история</h2>
            <p>
              <span className="highlight">Zur Gemütlichkeit</span> — это не просто ресторан, это настоящий немецкий оазис 
              в деловом центре Москвы. Мы открыли свои двери в 2018 году с одной целью: 
              подарить жителям и гостям столицы частичку настоящего немецкого уюта и гастрономического совершенства.
            </p>
            <p>
              Название нашего ресторана переводится с немецкого как "к уюту". 
              И действительно, каждый гость чувствует здесь особую атмосферу тепла и гостеприимства, 
              которая так ценится в Баварии.
            </p>
          </div>
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600" alt="Интерьер ресторана" />
          </div>
        </div>

        <div className="about-section reverse">
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600" alt="Немецкая кухня" />
          </div>
          <div className="about-text">
            <h2>Немецкая кухня</h2>
            <p>
              Наш шеф-повар Савицкий Александр приехал из Колледжа специально, чтобы 
              познакомить москвичей с аутентичными рецептами баварской кухни. 
              Мы используем только качественные продукты и соблюдаем все традиции приготовления.
            </p>
            <p>
              В нашем меню вы найдете классические немецкие блюда: 
              <span className="highlight"> братвурст, карривурст, айсбайн, шницель</span> и, конечно же, 
              лучшие сорта немецкого пива.
            </p>
          </div>
        </div>

        <div className="values-section">
          <h2>Наши ценности</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🍺</div>
              <h3>Качество</h3>
              <p>Только свежие продукты и правильные рецепты</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🏠</div>
              <h3>Уют</h3>
              <p>Атмосфера настоящего немецкого дома</p>
            </div>
            <div className="value-card">
              <div className="value-icon">👨‍🍳</div>
              <h3>Традиции</h3>
              <p>Соблюдение вековых кулинарных традиций</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Гостеприимство</h3>
              <p>Каждый гость — член нашей семьи</p>
            </div>
          </div>
        </div>

        <div className="team-section">
          <h2>Наша команда</h2>
          <div className="team-grid">
            <div className="team-member">
              <img src="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400" alt="Шеф-повар" />
              <h3>Савицкий Александр</h3>
              <p>Шеф-повар из Колледжа</p>
            </div>
            <div className="team-member">
              <img src="/src/assets/alim.png" alt="Управляющий" />
              <h3>Ширахунов Абду-Алим</h3>
              <p>Управляющий рестораном</p>
            </div>
            <div className="team-member">
              <img src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400" alt="Сомелье" />
              <h3>Saturnino Erika</h3>
              <p>Пивной сомелье</p>
            </div>
          </div>
        </div>

        <div className="gallery-section">
          <h2>Фотогалерея</h2>
          <div className="gallery-grid">
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400" alt="Интерьер" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1551024702-8b8ddc3f84b7?w=400" alt="Блюда" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1532635241-17e820acc59f?w=400" alt="Пиво" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400" alt="Атмосфера" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400" alt="Кухня" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400" alt="Колбаски" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;