import { useEffect, useRef } from 'react';
import OrderForm from './OrderForm.jsx';
import Icon from '../ui/Icon.jsx';

// Модальное окно заявки (БЭМ-блок order-dialog) на нативном <dialog>.
// Открывается кнопкой «Заказать» в карточке товара на главной.
function OrderDialog({ open, productName, onClose }) {
  const dialogRef = useRef(null);

  // Синхронизируем состояние React с нативным dialog.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const handleSuccess = () => {
    dialogRef.current?.close();
  };

  const handleClose = () => {
    dialogRef.current?.close();
  };

  return (
    <dialog
      ref={dialogRef}
      className="order-dialog"
      aria-labelledby="order-dialog-title"
      onClose={onClose}
    >
      <div className="order-dialog__inner">
        <div className="order-dialog__head">
          <div>
            <h2 className="order-dialog__title" id="order-dialog-title">
              Оформление заявки
            </h2>
            <p className="order-dialog__text">
              {productName
                ? `Вы выбрали «${productName}». Оставьте контакты — подтвердим наличие и время доставки.`
                : 'Оставьте контакты — менеджер свяжется с вами в течение 15 минут.'}
            </p>
          </div>
          <button
            className="icon-button"
            type="button"
            onClick={handleClose}
            aria-label="Закрыть окно заявки"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <OrderForm
          variant="modal"
          selectedProduct={productName}
          onCancel={handleClose}
          onSuccess={handleSuccess}
        />
      </div>
    </dialog>
  );
}

export default OrderDialog;

