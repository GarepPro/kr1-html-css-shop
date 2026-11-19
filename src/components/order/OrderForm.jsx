import { useRef, useState } from 'react';

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
  success: 'Заявка успешно отправлена! Мы свяжемся с вами.',
  commentRows: 5,
};

const MODAL_TEXTS = {
  name: 'Имя',
  email: 'E-mail',
  phone: 'Телефон',
  agreement: 'Я согласен на обработку данных',
  hintField: 'name',
  hintText: 'Минимум 2 символа.',
  success: 'Форма успешно отправлена!',
  commentRows: 4,
};

// Форма заявки (БЭМ-блок order-form) в двух режимах:
// - variant="page"  — форма на странице /order;
// - variant="modal" — форма внутри модального окна на главной.
// selectedProduct передаётся только в модалке (скрытое поле).
// onCancel выводит кнопку «Закрыть» вместо «Очистить» и скрывает сообщение об успехе.
function OrderForm({ variant = 'page', selectedProduct, onCancel, onSuccess = () => {} }) {
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
  const [successVisible, setSuccessVisible] = useState(false);

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
      form.reportValidity();
      return;
    }

    form.reset();
    setSuccessVisible(true);
    onSuccess();
  };

  // Очистка: снимаем подсветку ошибок и скрываем прошлое сообщение об успехе.
  const handleReset = () => {
    Array.from(formRef.current.elements).forEach((field) => {
      if (field.willValidate) field.removeAttribute('aria-invalid');
    });
    setSuccessVisible(false);
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
    >
      {selectedProduct !== undefined && (
        <input name="selected-product" type="hidden" value={selectedProduct} readOnly />
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

      {onCancel ? (
        <div className="order-form__actions">
          <button className="button button--secondary" type="button" onClick={onCancel}>
            Закрыть
          </button>
          <button className="button button--primary" type="submit">
            Отправить заявку
          </button>
        </div>
      ) : (
        <>
          <div className="order-form__actions">
            <button className="button button--secondary" type="reset">
              Очистить
            </button>
            <button className="button button--primary" type="submit">
              Отправить заявку
            </button>
          </div>

          <p className="success-message" role="status" hidden={!successVisible}>
            {texts.success}
          </p>
        </>
      )}
    </form>
  );
}

export default OrderForm;
