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

// Removed scroll-based theme switching as requested.
// Each section will maintain its own distinct CSS-based styling.