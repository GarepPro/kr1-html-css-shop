import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SiteHeader from './SiteHeader.jsx';
import SiteFooter from './SiteFooter.jsx';
import ScrollTopButton from './ScrollTopButton.jsx';
import ChatWidget from '../chat/ChatWidget.jsx';
import ToastViewport from '../ui/ToastViewport.jsx';

// При переходе на другую страницу прокручиваем в начало.
// Если в адресе есть hash (#team) или ?section=faq — к нужному блоку,
// кнопка «Наверх» мгновенно убирается, чтобы не «висеть» поверх новой страницы.
function ScrollManager() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    const target = hash ? hash.slice(1) : new URLSearchParams(search).get('section');

    if (target) {
      // Даём странице отрисоваться, затем плавно прокручиваем к блоку.
      const frame = requestAnimationFrame(() => {
        const element = document.getElementById(target);
        if (!element) return;
        const offset = 96;
        const top = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      });

      return () => cancelAnimationFrame(frame);
    }

    window.scrollTo({ top: 0 });
    return undefined;
  }, [pathname, search, hash]);

  return null;
}

// Общий каркас всех страниц: шапка, <main>, подвал, кнопка «Наверх»,
// виджет чата и контейнер уведомлений.
function PageLayout() {
  const [chatOpen, setChatOpen] = useState(false);
  return (
    <>
      <SiteHeader />
      <main className="site-main" id="content">
        <Outlet context={{ openChat: () => setChatOpen(true) }} />
      </main>
      <SiteFooter />
      <ScrollTopButton />
      <ChatWidget open={chatOpen} setOpen={setChatOpen} />
      <ToastViewport />
      <ScrollManager />
    </>
  );
}

export default PageLayout;

