import { Link } from 'react-router-dom';
import PageMeta from '../components/layout/PageMeta.jsx';
import Icon from '../components/ui/Icon.jsx';
import { Reveal } from '../components/ui/Reveal.jsx';

function NotFoundPage() {
  return (
    <>
      <PageMeta
        title="Страница не найдена — ShopProject"
        description="Запрошенная страница ShopProject не найдена."
      />

      <section className="not-found">
        <Reveal className="not-found__content">
          <span className="not-found__code" aria-hidden="true">
            404
          </span>
          <h1 className="not-found__title">Страница не найдена</h1>
          <p className="not-found__text">
            Возможно, ссылка устарела или страница переехала. Начните с каталога или загляните
            на главную.
          </p>

          <div className="not-found__actions">
            <Link className="button button--primary" to="/">
              На главную
              <Icon name="arrowRight" size={18} />
            </Link>
            <Link className="button button--ghost" to="/catalog">
              Открыть каталог
            </Link>
          </div>

          <nav className="not-found__links" aria-label="Популярные страницы">
            <Link to="/about">О бренде</Link>
            <Link to="/contacts">Контакты</Link>
            <Link to="/account">Личный кабинет</Link>
          </nav>
        </Reveal>
      </section>
    </>
  );
}

export default NotFoundPage;
