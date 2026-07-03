/* ---------- Back to top button ---------- */

window.onscroll = function () {
  const btn = document.querySelector('.back-to-top');
  btn.style.display =
    (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200)
      ? 'block'
      : 'none';
};

document.querySelector('.back-to-top').addEventListener('click', function (e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---------- Typing effect on the name ---------- */

function typeName() {
  const heading = document.getElementById('typed-name');
  if (!heading) return;

  const target = heading.querySelector('.typed-text');
  const fullText = heading.getAttribute('data-full-text') || '';
  let i = 0;

  target.textContent = '';

  function step() {
    if (i <= fullText.length) {
      target.textContent = fullText.slice(0, i);
      i++;
      setTimeout(step, 90);
    }
  }

  step();
}

document.addEventListener('DOMContentLoaded', typeName);

/* ---------- Dark / light mode toggle ---------- */

(function () {
  const toggleBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const STORAGE_KEY = 'preferred-theme';

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      toggleBtn.setAttribute('aria-pressed', 'true');
      toggleBtn.setAttribute('aria-label', 'Switch to light mode');
    } else {
      root.removeAttribute('data-theme');
      toggleBtn.setAttribute('aria-pressed', 'false');
      toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
    }
  }

  // On load: respect saved choice, otherwise fall back to system preference
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    applyTheme(saved);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  }

  toggleBtn.addEventListener('click', function () {
    const isDark = root.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });
})();
