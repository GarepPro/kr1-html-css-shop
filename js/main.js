// ============================================================
// 1. Модальное окно заявки (модалка на index.html)
// ============================================================
const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.product-card__button');
const closeDialogButton = document.getElementById('close-order-dialog');
const selectedProductInput = document.getElementById('selected-product');

if (orderDialog && orderButtons.length && closeDialogButton && selectedProductInput) {
  orderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const productName = button.dataset.product || 'Не указан';
      selectedProductInput.value = productName;
      orderDialog.showModal();
    });
  });

  closeDialogButton.addEventListener('click', () => {
    orderDialog.close();
  });
}

// ============================================================
// 2. Валидация формы в модальном окне
// ============================================================
const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');

if (orderForm && successMessage && orderDialog) {
  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formElements = Array.from(orderForm.elements);

    formElements.forEach((element) => {
      if (element.willValidate) element.removeAttribute('aria-invalid');
    });

    if (!orderForm.checkValidity()) {
      formElements.forEach((element) => {
        if (element.willValidate && !element.checkValidity()) {
          element.setAttribute('aria-invalid', 'true');
        }
      });
      orderForm.reportValidity();
      return;
    }

    successMessage.hidden = false;
    orderForm.reset();
    orderDialog.close();
  });
}

// ============================================================
// 3. Кнопка «Наверх» (position: fixed)
// ============================================================
const scrollTopButton = document.getElementById('scroll-top');

if (scrollTopButton) {
  const toggleScrollTop = () => {
    if (window.scrollY > 300) {
      scrollTopButton.classList.add('scroll-top--visible');
    } else {
      scrollTopButton.classList.remove('scroll-top--visible');
    }
  };

  window.addEventListener('scroll', toggleScrollTop, { passive: true });
  toggleScrollTop();

  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}