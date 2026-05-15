function nav(pageId) {
  document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
  document.querySelectorAll('.nav-a').forEach(a => a.classList.remove('active'));

  const page = document.getElementById(pageId);
  if (page) page.style.display = 'block';

  const link = document.querySelector(`.nav-a[data-page="${pageId}"]`);
  if (link) link.classList.add('active');

  const main = document.getElementById('main');
  if (main) main.scrollTop = 0;

  if (window.innerWidth <= 768) closeSidebar();
}

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
