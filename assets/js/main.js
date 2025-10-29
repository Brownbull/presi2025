// AI Disclaimer functionality
function dismissDisclaimer() {
  const disclaimer = document.getElementById('aiDisclaimer');
  if (disclaimer) {
    disclaimer.classList.add('hidden');
    sessionStorage.setItem('disclaimerDismissed', 'true');
  }
}

// Check if disclaimer was dismissed in this session
document.addEventListener('DOMContentLoaded', function() {
  const disclaimer = document.getElementById('aiDisclaimer');
  if (disclaimer && sessionStorage.getItem('disclaimerDismissed') === 'true') {
    disclaimer.classList.add('hidden');
  }

  // Theme Toggle functionality
  initThemeToggle();
});

// Theme Toggle
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  // Always start with light theme, but allow user to toggle within session
  // Don't restore from localStorage - always default to light
  const currentTheme = html.getAttribute('data-theme') || 'light';
  html.setAttribute('data-theme', 'light');

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';

      html.setAttribute('data-theme', newTheme);
      // Don't save to localStorage - let it reset on page reload

      // Optional: Add a small animation feedback
      themeToggle.style.transform = 'rotate(360deg)';
      setTimeout(() => {
        themeToggle.style.transform = '';
      }, 300);
    });
  }
}
