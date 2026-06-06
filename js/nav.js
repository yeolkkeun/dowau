function nav(pageId) {
  document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
  document.querySelectorAll('.nav-a').forEach(a => a.classList.remove('active'));

  const page = document.getElementById(pageId);
  if (page) page.style.display = 'block';

  const link = document.querySelector(`.nav-a[data-page="${pageId}"]`);
  if (link) link.classList.add('active');

  const main = document.getElementById('main');
  if (main) main.scrollTop = 0;

  // URL 해시 동기화 → 페이지별 개별 링크(공유 가능) 생성
  // 예: .../index.html#story  (코치 스토리 페이지로 바로 열림)
  // 홈은 깔끔한 주소 유지를 위해 해시를 제거.
  const targetHash = pageId === 'home' ? '' : '#' + pageId;
  if (targetHash !== location.hash) {
    history.replaceState(null, '', targetHash || location.pathname + location.search);
  }

  if (window.innerWidth <= 768) closeSidebar();
}

// 해시(#story 등)를 읽어 해당 페이지로 이동. 없거나 잘못된 값이면 home.
function routeFromHash() {
  const id = (location.hash || '').replace(/^#/, '');
  nav(id && document.getElementById(id) ? id : 'home');
}

// 첫 로드 시 + 브라우저 뒤로/앞으로(주소창 해시 변경) 시 라우팅
window.addEventListener('hashchange', routeFromHash);
window.addEventListener('DOMContentLoaded', routeFromHash);

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (!sidebar) return;
  const isOpen = sidebar.classList.toggle('open');
  if (backdrop) backdrop.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (sidebar) sidebar.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
  document.body.style.overflow = '';
}
