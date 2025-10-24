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

// Matriz filtering functionality
function initMatrizFilters() {
  const table = document.querySelector('.matriz-table');
  if (!table) return;

  // Add filter controls
  const wrapper = table.parentElement;
  const controls = document.createElement('div');
  controls.className = 'matriz-controls';
  controls.innerHTML = `
    <div class="filter-group">
      <label>Filtrar por rating:</label>
      <select id="ratingFilter">
        <option value="">Todos</option>
        <option value="high">Alto (7+)</option>
        <option value="medium">Medio (5-7)</option>
        <option value="low">Bajo (3-5)</option>
        <option value="poor">Muy bajo (<3)</option>
      </select>
    </div>
    <div class="search-group">
      <label>Buscar persona:</label>
      <input type="text" id="personaSearch" placeholder="Nombre...">
    </div>
  `;
  wrapper.insertBefore(controls, table);

  // Add filter listeners
  document.getElementById('ratingFilter')?.addEventListener('change', filterMatriz);
  document.getElementById('personaSearch')?.addEventListener('input', filterMatriz);
}

function filterMatriz() {
  const ratingFilter = document.getElementById('ratingFilter')?.value;
  const searchTerm = document.getElementById('personaSearch')?.value.toLowerCase();
  const rows = document.querySelectorAll('.matriz-table tbody tr');

  rows.forEach(row => {
    let showRow = true;

    // Search filter
    if (searchTerm) {
      const personaName = row.querySelector('.persona-name')?.textContent.toLowerCase() || '';
      showRow = personaName.includes(searchTerm);
    }

    // Rating filter
    if (showRow && ratingFilter) {
      const ratings = row.querySelectorAll('.rating-cell');
      const hasMatchingRating = Array.from(ratings).some(cell => {
        return cell.classList.contains(ratingFilter);
      });
      showRow = hasMatchingRating;
    }

    row.style.display = showRow ? '' : 'none';
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  initMatrizFilters();
});
