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
});
