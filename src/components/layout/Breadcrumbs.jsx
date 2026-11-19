import { Link } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';

// Хлебные крошки. `trail` — список промежуточных разделов: { to, label }.
// Последний элемент (current) выводится как текущая страница.
function Breadcrumbs({ trail = [], current }) {
  return (
    <nav className="breadcrumbs" aria-label="Хлебные крошки">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link className="breadcrumbs__link" to="/">
            Главная
          </Link>
        </li>
        {trail.map((item) => (
          <li className="breadcrumbs__item" key={item.to}>
            <Link className="breadcrumbs__link" to={item.to}>
              {item.label}
            </Link>
          </li>
        ))}
        <li className="breadcrumbs__item">
          <span className="breadcrumbs__current" aria-current="page">
            {current}
          </span>
        </li>
      </ol>

      <Link className="breadcrumbs__back" to="/catalog">
        <Icon name="arrowLeft" size={15} />
        В каталог
      </Link>
    </nav>
  );
}

export default Breadcrumbs;

