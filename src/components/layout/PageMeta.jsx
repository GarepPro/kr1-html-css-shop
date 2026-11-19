import { useEffect } from 'react';

// Заменяет <title> и <meta name="description"> при переходе между страницами.
// В HTML-версии они были прописаны в каждой странице отдельно.
function PageMeta({ title, description }) {
  useEffect(() => {
    document.title = title;

    if (description) {
      let meta = document.querySelector('meta[name="description"]');

      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }

      meta.setAttribute('content', description);
    }
  }, [title, description]);

  return null;
}

export default PageMeta;
