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

  // Check for saved theme preference or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';

      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);

      // Optional: Add a small animation feedback
      themeToggle.style.transform = 'rotate(360deg)';
      setTimeout(() => {
        themeToggle.style.transform = '';
      }, 300);
    });
  }
}
