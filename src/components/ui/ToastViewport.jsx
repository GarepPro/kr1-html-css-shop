import { Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext.jsx';
import Icon from './Icon.jsx';

// Контейнер уведомлений: выводит очередь тостов поверх страницы.
export function ToastViewport() {
  const { toasts, dismiss } = useToast();

  if (!toasts.length) return null;

  return (
    <div className="toast-viewport" role="region" aria-label="Уведомления">
      {toasts.map((toast) => (
        <div className={`toast toast--${toast.tone}`} key={toast.id} role="status">
          <span className="toast__mark" aria-hidden="true">
            <Icon name={toast.tone === 'danger' ? 'info' : 'check'} size={16} />
          </span>
          <span className="toast__body">
            <strong className="toast__title">{toast.title}</strong>
            {toast.text && <span className="toast__text">{toast.text}</span>}
            {/* Кнопка-переход: «Перейти в корзину», «Открыть товар» и т.п. */}
            {toast.action && (
              <Link className="toast__action" to={toast.action.to} onClick={() => dismiss(toast.id)}>
                {toast.action.label}
                <Icon name="arrowRight" size={14} />
              </Link>
            )}
          </span>
          <button
            className="toast__close"
            type="button"
            onClick={() => dismiss(toast.id)}
            aria-label="Закрыть уведомление"
          >
            <Icon name="close" size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default ToastViewport;
