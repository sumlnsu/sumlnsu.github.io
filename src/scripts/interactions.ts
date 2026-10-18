// 페이지 인터랙션. astro:page-load마다 initPage가 다시 실행된다 (ClientRouter 이동 포함).
// 원칙: JS가 없어도 모든 내용이 보이고 동작해야 한다. JS는 "더 좋게"만 만든다.

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let cleanups: Array<() => void> = [];

export function keepTheme() {
  // ClientRouter가 <html> 속성을 새 문서 것으로 바꾸므로 테마·js 클래스를 다시 적용
  const d = document.documentElement;
  d.classList.add('js');
  try { const t = localStorage.getItem('theme'); if (t) d.dataset.theme = t; } catch {}
}

export function initPage() {
  cleanups.forEach((fn) => fn());
  cleanups = [];
  rememberTrack();
  reveal();
  countUp();
  header();
  themeToggle();
  copyEmail();
  toc();
}

/* 마지막으로 본 트랙(전체/AX/DA/DAE)을 기억해 홈·목록 링크가 그 트랙으로 돌아가게 */
function rememberTrack() {
  const page = document.querySelector<HTMLElement>('[data-track-path]');
  if (page) {
    try { sessionStorage.setItem('trackPath', page.dataset.trackPath!); } catch {}
  }
  let path = '/';
  try { path = sessionStorage.getItem('trackPath') || '/'; } catch {}
  document.querySelectorAll<HTMLAnchorElement>('[data-home-link], [data-back-link]').forEach((a) => (a.href = path));
  document.querySelectorAll<HTMLAnchorElement>('[data-home-anchor]').forEach((a) => (a.href = `${path}#${a.dataset.homeAnchor}`));
}

function reveal() {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)');
  if (reduced() || !('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('is-in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  els.forEach((el) => io.observe(el));
  cleanups.push(() => io.disconnect());
}

function countUp() {
  const els = document.querySelectorAll<HTMLElement>('[data-count]');
  const fmt = (n: number) => Math.round(n).toLocaleString('ko-KR');
  const run = (el: HTMLElement) => {
    const to = Number(el.dataset.count); const suffix = el.dataset.suffix || '';
    if (reduced()) { el.textContent = fmt(to) + suffix; return; }
    const dur = Math.min(1600, 700 + Math.log10(to + 1) * 180); const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / dur); const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = fmt(to * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { run(e.target as HTMLElement); io.unobserve(e.target); } });
  }, { threshold: 0.6 });
  els.forEach((el) => io.observe(el));
  cleanups.push(() => io.disconnect());
}

/* 스크롤 내리면 헤더 숨김, 올리면 표시 + 읽기 진행 바 */
function header() {
  const h = document.querySelector<HTMLElement>('[data-header]');
  const bar = document.querySelector<HTMLElement>('[data-progress]');
  if (!h) return;
  let last = window.scrollY; let ticking = false;
  const onScroll = () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY; const max = document.documentElement.scrollHeight - innerHeight;
      h.classList.toggle('is-scrolled', y > 8);
      h.classList.toggle('is-hidden', y > 240 && y > last + 4);
      if (y < last - 4) h.classList.remove('is-hidden');
      bar?.style.setProperty('--p', String(max > 0 ? y / max : 0));
      last = y; ticking = false;
    });
  };
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });
  cleanups.push(() => removeEventListener('scroll', onScroll));
}

function themeToggle() {
  const btn = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
  if (!btn || btn.dataset.bound) return; // 헤더는 transition:persist라 한 번만 바인딩
  btn.dataset.bound = '1';
  btn.addEventListener('click', () => {
    const d = document.documentElement;
    const current = d.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    const apply = () => { d.dataset.theme = next; try { localStorage.setItem('theme', next); } catch {} };
    // 지원 브라우저에서는 테마도 부드럽게 전환
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (doc.startViewTransition && !reduced()) doc.startViewTransition(apply); else apply();
  });
}

function toast(msg: string) {
  const t = document.querySelector<HTMLElement>('.toast'); if (!t) return;
  t.textContent = msg; t.classList.add('is-show');
  clearTimeout(Number(t.dataset.timer));
  t.dataset.timer = String(setTimeout(() => t.classList.remove('is-show'), 2200));
}

function copyEmail() {
  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
    const handler = async () => {
      try { await navigator.clipboard.writeText(btn.dataset.copy!); toast('이메일 주소를 복사했어요'); }
      catch { location.href = `mailto:${btn.dataset.copy}`; }
    };
    btn.addEventListener('click', handler);
    cleanups.push(() => btn.removeEventListener('click', handler));
  });
}

/* 상세 페이지 목차: 지금 읽는 섹션 강조 */
function toc() {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-toc] a')];
  if (!links.length) return;
  const targets = links.map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1)))).filter(Boolean) as HTMLElement[];
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.classList.toggle('is-active', a.hash.slice(1) === encodeURIComponent(e.target.id) || decodeURIComponent(a.hash.slice(1)) === e.target.id));
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  targets.forEach((t) => io.observe(t));
  cleanups.push(() => io.disconnect());
}
