import { useRef, useState } from 'react';
import Icon from '../ui/Icon.jsx';

// Источники данных для поля «Тема заявки», как в HTML-версии.
export const ORDER_TOPICS = [
  { value: '', label: 'Выберите тему' },
  { value: 'product', label: 'Заказ товара' },
  { value: 'consultation', label: 'Консультация' },
  { value: 'delivery', label: 'Доставка' },
];

// Подсказки и подписи, которые в HTML-версии были разными
// в модальном окне (index.html) и на странице (order.html).
const PAGE_TEXTS = {
  name: 'Имя *',
  email: 'E-mail *',
  phone: 'Телефон *',
  agreement: 'Я согласен на обработку данных *',
  hintField: 'phone',
  hintText: 'Формат: +7 (900) 000-00-00',
  commentRows: 5,
};

const MODAL_TEXTS = {
  name: 'Имя',
  email: 'E-mail',
  phone: 'Телефон',
  agreement: 'Я согласен на обработку данных',
  hintField: 'name',
  hintText: 'Минимум 2 символа.',
  commentRows: 4,
};

// Форма заявки (БЭМ-блок order-form) в двух режимах:
// - variant="page"  — форма внутри корзины на странице /cart;
// - variant="modal" — форма внутри модального окна на главной.
// selectedProduct передаётся только в модалке (скрытое поле).
// orderLines — состав корзины: уходит скрытым полем «Состав заказа».
// onCancel выводит кнопку «Закрыть» вместо «Очистить».
function OrderForm({
  variant = 'page',
  selectedProduct,
  orderLines = [],
  onCancel,
}) {
  const isPage = variant !== 'modal';
  const texts = isPage ? PAGE_TEXTS : MODAL_TEXTS;
  const formClass = isPage ? 'order-form order-form--page' : 'order-form';
  const nameId = `${variant}-name`;
  const emailId = `${variant}-email`;
  const phoneId = `${variant}-phone`;
  const dateId = `${variant}-date`;
  const topicId = `${variant}-topic`;
  const commentId = `${variant}-comment`;
  const agreementId = `${variant}-agreement`;
  const hintId = `${variant}-${texts.hintField}-hint`;
  const formRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Состав заказа в виде текста: «Лампа Aurora Desk × 2; Коврик Desk Pad × 1».
  const orderSummary = orderLines
    .map((line) => `${line.product.title} × ${line.qty}`)
    .join('; ');

  // aria-describedby добавляем только к тому полю, у которого есть подсказка.
  const describedBy = (field) => {
    if (texts.hintField !== field) return {};
    return { 'aria-describedby': hintId };
  };

  // Валидация: сбрасываем aria-invalid, проверяем checkValidity(),
  // помечаем невалидные поля и вызываем reportValidity() (как в js/main.js).
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = Array.from(form.elements);

    fields.forEach((field) => {
      if (field.willValidate) field.removeAttribute('aria-invalid');
    });

    if (!form.checkValidity()) {
      fields.forEach((field) => {
        if (field.willValidate && !field.checkValidity()) {
          field.setAttribute('aria-invalid', 'true');
        }
      });
      setIsSubmitted(false);
      form.reportValidity();
      return;
    }

    setIsSubmitted(true);
  };

  // Очистка: снимаем подсветку ошибок и скрываем уведомление.
  const handleReset = () => {
    Array.from(formRef.current.elements).forEach((field) => {
      if (field.willValidate) field.removeAttribute('aria-invalid');
    });
    setIsSubmitted(false);
  };

  return (
    <form
      ref={formRef}
      className={formClass}
      action="#"
      method="post"
      noValidate
      onSubmit={handleSubmit}
      onReset={handleReset}
      onChange={() => setIsSubmitted(false)}
    >
      {selectedProduct !== undefined && (
        <input name="selected-product" type="hidden" value={selectedProduct} readOnly />
      )}
      {orderLines.length > 0 && (
        <input name="order" type="hidden" value={orderSummary} readOnly />
      )}

      <div className="order-form__field">
        <label className="order-form__label" htmlFor={nameId}>
          {texts.name}
        </label>
        <input
          className="order-form__input"
          id={nameId}
          name="name"
          type="text"
          placeholder="Введите ваше имя"
          minLength={2}
          autoComplete="given-name"
          {...describedBy('name')}
          required
        />
        {texts.hintField === 'name' && (
          <small className="order-form__hint" id={hintId}>
            {texts.hintText}
          </small>
        )}
      </div>

      <div className="order-form__field">
        <label className="order-form__label" htmlFor={emailId}>
          {texts.email}
        </label>
        <input
          className="order-form__input"
          id={emailId}
          name="email"
          type="email"
          placeholder="example@mail.ru"
          autoComplete="email"
          required
        />
      </div>

      <div className="order-form__field">
        <label className="order-form__label" htmlFor={phoneId}>
          {texts.phone}
        </label>
        <input
          className="order-form__input"
          id={phoneId}
          name="phone"
          type="tel"
          inputMode="tel"
          placeholder="+7 (900) 000-00-00"
          pattern="^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$"
          autoComplete="tel"
          {...describedBy('phone')}
          required
        />
        {texts.hintField === 'phone' && (
          <small className="order-form__hint" id={hintId}>
            {texts.hintText}
          </small>
        )}
      </div>

      <div className="order-form__field">
        <label className="order-form__label" htmlFor={dateId}>
          Дата связи
        </label>
        <input className="order-form__input" id={dateId} name="date" type="date" />
      </div>

      <div className="order-form__field">
        <label className="order-form__label" htmlFor={topicId}>
          Тема заявки{isPage ? ' *' : ''}
        </label>
        <select className="order-form__select" id={topicId} name="topic" required>
          {ORDER_TOPICS.map((topic) => (
            <option key={topic.value} value={topic.value}>
              {topic.label}
            </option>
          ))}
        </select>
      </div>

      <div className="order-form__field">
        <label className="order-form__label" htmlFor={commentId}>
          Комментарий
        </label>
        <textarea
          className="order-form__textarea"
          id={commentId}
          name="comment"
          rows={texts.commentRows}
          placeholder="Укажите дополнительную информацию"
        />
      </div>

      <div className="order-form__field order-form__field--checkbox">
        <label className="order-form__label">
          <input
            className="order-form__input"
            id={agreementId}
            name="agreement"
            type="checkbox"
            required
          />
          {texts.agreement}
        </label>
      </div>

      <div className="order-form__actions">
        {onCancel ? (
          <button className="button button--secondary" type="button" onClick={onCancel}>
            Закрыть
          </button>
        ) : (
          <button className="button button--secondary" type="reset">
            Очистить
          </button>
        )}
        <button className="button button--primary" type="submit">
          Отправить заявку
        </button>
      </div>

      {isSubmitted && (
        <p className="order-form__notice" role="status">
          <Icon name="check" size={18} />
          Заявка успешно отправлена!
        </p>
      )}
    </form>
  );
}

export default OrderForm;
