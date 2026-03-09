import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../store/slices/reviewsSlice";
import "./Contact.css";

function Contact() {
  const dispatch = useDispatch();
  const { items: reviews } = useSelector(state => state.reviews);
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const { deliveryAreas } = useSelector(state => state.dishes);

  const [newReview, setNewReview] = useState({
    author: user?.name || '',
    rating: 5,
    text: ''
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    dispatch(addReview({
      ...newReview,
      author: newReview.author || 'Аноним'
    }));
    setNewReview({ author: user?.name || '', rating: 5, text: '' });
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="contact-page">
      <h1>Контакты</h1>

      <div className="contact-grid">
        <div className="contact-info">
          <h2>Информация</h2>

          <div className="info-block">
            <h3>Адрес</h3>
            <p>Шамшинская улица, 2</p>
            <p>Токмок, Кыргызстан</p>
          </div>

          <div className="info-block">
            <h3>Часы работы</h3>
            <p>Пн-Пт: 11:00 - 23:00</p>
            <p>Сб-Вс: 12:00 - 02:00</p>
          </div>

          <div className="info-block">
            <h3>Контакты</h3>
            <p>+996-555-55-55-55</p>
            <p>zurgemuetlichkeit@gmail.com</p>
          </div>

          <div className="info-block">
            <h3>Районы доставки</h3>
            <ul>
              {deliveryAreas.map(area => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="reviews-section">
          <h2>Отзывы</h2>

          <div className="reviews-stats">
            <span className="average-rating">
              Средняя оценка: {averageRating} ★
            </span>
            <span>Всего отзывов: {reviews.length}</span>
          </div>

          <div className="reviews-list">
            {reviews.length === 0 ? (
              <p className="no-reviews">Пока нет отзывов</p>
            ) : (
              reviews.map(review => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <strong>{review.author}</strong>
                    <span className="review-rating">{'★'.repeat(review.rating)}</span>
                  </div>
                  <p>{review.text}</p>
                  <small>{new Date(review.date).toLocaleDateString()}</small>
                </div>
              ))
            )}
          </div>

          {isAuthenticated && (
            <form onSubmit={handleSubmitReview} className="review-form">
              <h3>Оставить отзыв</h3>

              <input
                type="text"
                placeholder="Имя"
                value={newReview.author}
                onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                required
              />

              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
              >
                {[5, 4, 3, 2, 1].map(r => (
                  <option key={r} value={r}>{r} ★</option>
                ))}
              </select>

              <textarea
                placeholder="Ваш отзыв"
                value={newReview.text}
                onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                required
                rows="4"
              />

              <div className="form-actions">
                <button type="button" onClick={() => setNewReview({ author: user?.name || '', rating: 5, text: '' })}>
                  Очистить
                </button>
                <button type="submit">Отправить</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;
