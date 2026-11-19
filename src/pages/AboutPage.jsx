import { Link } from 'react-router-dom';
import PageMeta from '../components/layout/PageMeta.jsx';
import Breadcrumbs from '../components/layout/Breadcrumbs.jsx';
import Icon from '../components/ui/Icon.jsx';
import { Reveal, Counter } from '../components/ui/Reveal.jsx';
import { SectionHeading } from '../components/ui/SectionHeading.jsx';
import {
  ABOUT_HERO,
  ABOUT_QUOTES,
  ABOUT_STATS,
  ABOUT_STORY,
  ABOUT_TEAM,
  ABOUT_TIMELINE,
  ABOUT_VALUES,
} from '../data/about.js';

function AboutPage() {
  return (
    <>
      <PageMeta
        title="О бренде — ShopProject"
        description="История ShopProject: как мы выбираем предметы для рабочего места, наши ценности, команда и этапы развития."
      />

      <Breadcrumbs current="О бренде" />

      <section className="page-hero page-hero--split">
        <Reveal className="page-hero__content">
          <span className="page-hero__eyebrow">{ABOUT_HERO.eyebrow}</span>
          <h1 className="page-hero__title">{ABOUT_HERO.title}</h1>
          <p className="page-hero__text">{ABOUT_HERO.text}</p>

          <div className="hero__actions">
            <Link className="button button--primary" to="/catalog">
              Смотреть каталог
              <Icon name="arrowRight" size={18} />
            </Link>
            <Link className="button button--ghost" to="/contacts">
              Приехать в шоурум
            </Link>
          </div>
        </Reveal>

        <Reveal className="about-visual" delay={120} variant="scale">
          <div className="about-visual__frame" aria-hidden="true">
            <span className="about-visual__mark">SP</span>
            <span className="about-visual__caption">Студия предметов для работы</span>
          </div>
          <div className="about-visual__note">
            <Icon name="spark" size={18} />
            <span>12 позиций в каталоге — и все протестированы месяцем работы в офисе</span>
          </div>
        </Reveal>
      </section>

      <Reveal className="section about-stats">
        {ABOUT_STATS.map((stat) => (
          <Counter
            key={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
            plain={stat.plain}
          />
        ))}
      </Reveal>

      <section className="section section--surface" id="story" aria-labelledby="story-title">
        <SectionHeading eyebrow="История" title="С чего всё началось" id="story-title" />

        <div className="story-layout">
          <Reveal className="story-text">
            {ABOUT_STORY.map((paragraph) => (
              <p className="story-text__paragraph" key={paragraph.slice(0, 32)}>
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal className="story-quotes" delay={120}>
            {ABOUT_QUOTES.map((quote) => (
              <blockquote className="story-quote" key={quote.author}>
                <p className="story-quote__text">«{quote.text}»</p>
                <footer className="story-quote__author">{quote.author}</footer>
              </blockquote>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section" id="values" aria-labelledby="values-title">
        <SectionHeading
          eyebrow="Ценности"
          title="Четыре правила, от которых не отступаем"
          text="Они определяют, какие товары попадают в каталог и как работает сервис."
          id="values-title"
        />

        <ul className="advantages-list">
          {ABOUT_VALUES.map((value, index) => (
            <Reveal as="li" className="advantage" key={value.title} delay={index * 70}>
              <span className="advantage__icon">
                <Icon name={value.icon} size={22} />
              </span>
              <h3 className="advantage__title">{value.title}</h3>
              <p className="advantage__text">{value.text}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="section section--surface" id="timeline" aria-labelledby="timeline-title">
        <SectionHeading eyebrow="Развитие" title="Семь лет по шагам" id="timeline-title" />

        <ol className="timeline">
          {ABOUT_TIMELINE.map((item, index) => (
            <Reveal as="li" className="timeline__item" key={item.year} delay={index * 80}>
              <span className="timeline__year">{item.year}</span>
              <div className="timeline__body">
                <h3 className="timeline__title">{item.title}</h3>
                <p className="timeline__text">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="section" id="team" aria-labelledby="team-title">
        <SectionHeading
          eyebrow="Команда"
          title="Люди за прилавком"
          text="Небольшая команда, которая выбирает, тестирует и упаковывает каждую вещь."
          id="team-title"
        />

        <ul className="team-grid">
          {ABOUT_TEAM.map((member, index) => (
            <Reveal as="li" className="team-card" key={member.name} delay={index * 70}>
              <span className={`team-card__avatar team-card__avatar--${member.accent}`} aria-hidden="true">
                {member.initials}
              </span>
              <span className="team-card__name">{member.name}</span>
              <span className="team-card__role">{member.role}</span>
            </Reveal>
          ))}
        </ul>
      </section>

      <Reveal className="section cta">
        <div className="cta__inner">
          <div className="cta__copy">
            <h2 className="cta__title">Приезжайте посмотреть вживую</h2>
            <p className="cta__text">
              Шоурум в Москве открыт ежедневно с 10:00 до 21:00. Покажем материалы и дадим вещи
              «потрогать» перед покупкой.
            </p>
          </div>
          <Link className="button button--primary" to="/contacts">
            Контакты и адрес
            <Icon name="arrowRight" size={18} />
          </Link>
        </div>
      </Reveal>
    </>
  );
}

export default AboutPage;
