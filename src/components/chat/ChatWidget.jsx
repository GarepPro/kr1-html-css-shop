import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';
import {
  CHAT_FALLBACK,
  CHAT_GREETING,
  CHAT_QUICK_REPLIES,
  getChatScenario,
} from '../../data/search.js';

// Чат магазина: кнопка в правом нижнем углу и панель переписки.
// Ответы подбираются по ключевым словам (data/search.js) с имитацией набора текста.
let messageId = 0;
const createMessage = (from, text, action = null) => ({
  id: `msg-${++messageId}`,
  from,
  text,
  action,
});

export function ChatWidget({ open, setOpen }) {
  const [messages, setMessages] = useState(() => [createMessage('bot', CHAT_GREETING.text)]);
  const [draft, setDraft] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const timers = useRef([]);

  // Автопрокрутка к последнему сообщению.
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, typing, open]);

  // Фокус в поле ввода при открытии панели.
  useEffect(() => {
    if (open) {
      setUnread(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Сбрасываем запланированные ответы при размонтировании.
  useEffect(() => {
    const current = timers.current;
    return () => current.forEach((timer) => clearTimeout(timer));
  }, []);

  // Отправка сообщения: ответы бота приходят по очереди с индикатором набора.
  const send = (rawText) => {
    const text = rawText.trim();
    if (!text || typing) return;

    setMessages((prev) => [...prev, createMessage('user', text)]);
    setDraft('');
    setTyping(true);

    const scenario = getChatScenario(text);
    const source = scenario ?? CHAT_FALLBACK;

    source.replies.forEach((reply, index) => {
      const isLast = index === source.replies.length - 1;
      const delay = 900 + index * 1300;

      const timer = setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          createMessage('bot', reply, isLast ? source.action ?? null : null),
        ]);
        if (isLast) setTyping(false);
        if (!open) setUnread((prev) => prev + 1);
      }, delay);

      timers.current.push(timer);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    send(draft);
  };

  return (
    <div className={`chat${open ? ' chat--open' : ''}`}>
      {open && (
        <section className="chat__panel" aria-label="Чат магазина">
          <header className="chat__header">
            <strong className="chat__name">Помощник магазина</strong>
            <button
              className="chat__icon-button"
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Свернуть чат"
            >
              <Icon name="close" size={18} />
            </button>
          </header>

          <div className="chat__messages" ref={listRef} role="log">
            {messages.map((message) => (
              <div className={`chat__message chat__message--${message.from}`} key={message.id}>
                <div className="chat__bubble">
                  {message.text}
                  {message.action && (
                    <Link
                      className="chat__action"
                      to={message.action.to}
                      onClick={() => setOpen(false)}
                    >
                      {message.action.label}
                    </Link>
                  )}
                </div>
              </div>
            ))}

            {typing && (
              <div className="chat__message chat__message--bot">
                <span className="visually-hidden">Готовится ответ</span>
                <div className="chat__bubble chat__bubble--typing" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
          </div>

          <div className="chat__quick">
            {CHAT_QUICK_REPLIES.map((reply) => (
              <button
                className="chat__quick-button"
                type="button"
                key={reply.id}
                onClick={() => send(reply.label)}
                disabled={typing}
              >
                {reply.label}
              </button>
            ))}
          </div>

          <form className="chat__form" onSubmit={handleSubmit}>
            <label className="visually-hidden" htmlFor="chat-input">
              Ваше сообщение
            </label>
            <input
              className="chat__input"
              id="chat-input"
              ref={inputRef}
              value={draft}
              placeholder="Напишите сообщение…"
              autoComplete="off"
              onChange={(event) => setDraft(event.target.value)}
            />
            <button
              className="chat__send"
              type="submit"
              aria-label="Отправить сообщение"
              disabled={!draft.trim() || typing}
            >
              <Icon name="send" size={18} />
            </button>
          </form>
        </section>
      )}

      <button
        className="chat__toggle"
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={open ? 'Свернуть чат' : 'Чат магазина'}
      >
        <Icon name={open ? 'close' : 'chat'} size={22} />
        {!open && <span className="chat__toggle-label">Чат магазина</span>}
        {!open && unread > 0 && <span className="chat__badge">{unread}</span>}
      </button>
    </div>
  );
}

export default ChatWidget;
