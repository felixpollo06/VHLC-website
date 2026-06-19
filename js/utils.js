// ============================================================
// VHLC — Shared Utilities (utils.js)
// ============================================================

// ── Toast Notification ──────────────────────────────────────
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast-vhlc toast-${type}`;
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity .4s';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// ── Loading Overlay ──────────────────────────────────────────
function showLoading(message = 'Loading...') {
  let overlay = document.getElementById('vhlc-loading');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'vhlc-loading';
    overlay.className = 'loading-overlay';
    overlay.innerHTML = `
      <div class="spinner"></div>
      <p id="loading-msg" style="margin-top:1rem;color:var(--text-muted);font-size:.88rem;">${message}</p>
    `;
    document.body.appendChild(overlay);
  } else {
    document.getElementById('loading-msg').textContent = message;
    overlay.style.display = 'flex';
  }
}

function hideLoading() {
  const overlay = document.getElementById('vhlc-loading');
  if (overlay) overlay.style.display = 'none';
}

// ── Date Formatting ──────────────────────────────────────────
function formatDate(timestamp) {
  if (!timestamp) return '—';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString('en-PH', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
}

function formatDateShort(timestamp) {
  if (!timestamp) return '—';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString('en-PH', {
    year: 'numeric', month: 'short', day: 'numeric'
  });
}

function formatDateTime(timestamp) {
  if (!timestamp) return '—';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleString('en-PH', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

function todayISO() {
  return new Date().toISOString().split('T')[0];
}

// ── DepEd Grade Calculator (Grades 4–6) ─────────────────────
// Weights: Performance Tasks 50%, Written Works 20%, Examinations 30%
function computeGrade(performanceTasks, writtenWorks, examinations) {
  const pt  = parseFloat(performanceTasks) || 0;
  const ww  = parseFloat(writtenWorks) || 0;
  const ex  = parseFloat(examinations) || 0;
  const final = (pt * 0.50) + (ww * 0.20) + (ex * 0.30);
  return Math.round(final * 100) / 100;
}

// ── DepEd Descriptive Rating ────────────────────────────────
function getDescriptiveRating(grade, gradeLevel) {
  // Grades 1–3: use descriptive only
  if (gradeLevel <= 3) return grade; // grade is already descriptive string

  // Grades 4–6: numerical → descriptive
  if (grade >= 90) return 'Outstanding';
  if (grade >= 85) return 'Very Satisfactory';
  if (grade >= 80) return 'Satisfactory';
  if (grade >= 75) return 'Fairly Satisfactory';
  return 'Did Not Meet Expectations';
}

function isPassing(grade, gradeLevel) {
  if (gradeLevel <= 3) return grade === 'Consistent' || grade === 'Developing';
  return parseFloat(grade) >= 75;
}

// ── Grade Badge HTML ─────────────────────────────────────────
function gradeBadge(grade, gradeLevel) {
  const passing = isPassing(grade, gradeLevel);
  return `<span class="badge-${passing ? 'pass' : 'fail'}">${grade}</span>`;
}

// ── Attendance Percentage ────────────────────────────────────
function attendancePercent(present, total) {
  if (!total) return 0;
  return Math.round((present / total) * 100);
}

// ── Get Initials (for avatars) ───────────────────────────────
function getInitials(name) {
  if (!name) return '?';
  return name.trim().split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

// ── Truncate Text ────────────────────────────────────────────
function truncate(text, maxLen = 100) {
  if (!text || text.length <= maxLen) return text;
  return text.slice(0, maxLen).trim() + '…';
}

// ── Escape HTML ──────────────────────────────────────────────
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ── Empty State HTML ─────────────────────────────────────────
function emptyState(icon = '📋', title = 'No data yet', subtitle = '') {
  return `
    <div style="text-align:center;padding:3rem 1rem;color:var(--text-muted)">
      <div style="font-size:3rem;margin-bottom:.75rem">${icon}</div>
      <p style="font-weight:700;color:var(--text-dark);margin:0">${title}</p>
      ${subtitle ? `<p style="font-size:.85rem;margin:.4rem 0 0">${subtitle}</p>` : ''}
    </div>`;
}

// ── Confirm Dialog ───────────────────────────────────────────
function confirmAction(message) {
  return confirm(message);
}

// ── Current School Year (e.g. 2025-2026) ────────────────────
function currentSchoolYear() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 1–12
  // School year starts June in PH
  return month >= 6
    ? `${year}–${year + 1}`
    : `${year - 1}–${year}`;
}

// ── Populate Select Dropdown ─────────────────────────────────
function populateSelect(selectEl, options, placeholder = 'Select...') {
  selectEl.innerHTML = `<option value="" disabled selected>${placeholder}</option>`;
  options.forEach(opt => {
    const o = document.createElement('option');
    o.value = opt.value ?? opt;
    o.textContent = opt.label ?? opt;
    selectEl.appendChild(o);
  });
}

// ── Sidebar Mobile Toggle ────────────────────────────────────
function initSidebarToggle() {
  const sidebar = document.getElementById('portal-sidebar');
  const toggleBtn = document.getElementById('sidebar-toggle');
  if (!sidebar || !toggleBtn) return;

  toggleBtn.addEventListener('click', () => sidebar.classList.toggle('open'));

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });
}

// ── Set User Info in Sidebar ─────────────────────────────────
function setSidebarUser(name, role) {
  const nameEl = document.getElementById('sidebar-user-name');
  const roleEl = document.getElementById('sidebar-user-role');
  if (nameEl) nameEl.textContent = name;
  if (roleEl) roleEl.textContent = role.charAt(0).toUpperCase() + role.slice(1);
}

// ── Highlight Active Sidebar Link ────────────────────────────
function highlightActiveNav() {
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.sidebar-nav-item').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href.endsWith(currentPage)) link.classList.add('active');
  });
}
