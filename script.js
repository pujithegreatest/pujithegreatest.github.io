const THEME_KEYS = ["8bit", "ocean", "sunset", "forest", "royal"];
const body = document.body;
const themeSelect = document.getElementById("themeSelect");
const modeToggle = document.getElementById("modeToggle");
const randomizeTheme = document.getElementById("randomizeTheme");
const muteBtn = document.getElementById("muteBtn");

function applyTheme(theme, mode) {
  body.dataset.theme = theme;
  body.dataset.mode = mode;
  if (themeSelect) themeSelect.value = theme;
  if (modeToggle) modeToggle.checked = mode === "dark";
  localStorage.setItem("puji-theme", theme);
  localStorage.setItem("puji-mode", mode);
}

function randomTheme() {
  const theme = THEME_KEYS[Math.floor(Math.random() * THEME_KEYS.length)];
  const mode = Math.random() > 0.5 ? "dark" : "light";
  applyTheme(theme, mode);
}

const savedTheme = localStorage.getItem("puji-theme") || "8bit";
const savedMode = localStorage.getItem("puji-mode") || "light";
applyTheme(savedTheme, savedMode);

if (themeSelect) {
  themeSelect.addEventListener("change", (event) => {
    applyTheme(event.target.value, body.dataset.mode || "light");
  });
}

if (modeToggle) {
  modeToggle.addEventListener("change", (event) => {
    applyTheme(body.dataset.theme || "8bit", event.target.checked ? "dark" : "light");
  });
}

if (randomizeTheme) {
  randomizeTheme.addEventListener("click", randomTheme);
}

if (muteBtn) {
  muteBtn.addEventListener("click", () => {
    muteBtn.classList.toggle("muted");
  });
}

// Custom Cursor
const customCursor = document.createElement('div');
customCursor.className = 'custom-cursor';
customCursor.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" fill="currentColor" stroke="currentColor" stroke-width="1"/>
    <line x1="12" y1="4" x2="12" y2="8" stroke="currentColor" stroke-width="2" stroke-linecap="square"/>
    <line x1="12" y1="16" x2="12" y2="20" stroke="currentColor" stroke-width="2" stroke-linecap="square"/>
    <line x1="4" y1="12" x2="8" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="square"/>
    <line x1="16" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="square"/>
    <rect x="2" y="2" width="4" height="4" fill="currentColor"/>
    <rect x="18" y="2" width="4" height="4" fill="currentColor"/>
    <rect x="2" y="18" width="4" height="4" fill="currentColor"/>
    <rect x="18" y="18" width="4" height="4" fill="currentColor"/>
  </svg>
`;
document.body.appendChild(customCursor);

let cursorX = 0;
let cursorY = 0;
let cursorElementX = 0;
let cursorElementY = 0;

document.addEventListener('mousemove', (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
});

function animateCursor() {
  cursorElementX += (cursorX - cursorElementX) * 0.15;
  cursorElementY += (cursorY - cursorElementY) * 0.15;
  customCursor.style.left = cursorElementX + 'px';
  customCursor.style.top = cursorElementY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hide default cursor on interactive elements
const interactiveElements = document.querySelectorAll('a, button, select, input, textarea, .btn, .mpc-pad, .tab, .article-item');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    customCursor.classList.add('hover');
    document.body.style.cursor = 'none';
  });
  el.addEventListener('mouseleave', () => {
    customCursor.classList.remove('hover');
    document.body.style.cursor = 'none';
  });
});

document.body.style.cursor = 'none';