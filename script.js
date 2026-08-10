const state = { posts: [], category: '전체', query: '' };

const $ = (selector) => document.querySelector(selector);

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

function renderCategories() {
  const categories = ['전체', ...new Set(state.posts.map((post) => post.category).filter(Boolean))];
  $('#categories').innerHTML = categories.map((category) => `
    <button class="category ${category === state.category ? 'active' : ''}" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>
  `).join('');

  $('#categories').querySelectorAll('.category').forEach((button) => {
    button.addEventListener('click', () => {
      state.category = button.dataset.category;
      renderCategories();
      renderPosts();
    });
  });
}

function renderPosts() {
  const query = state.query.trim().toLowerCase();
  const filtered = state.posts.filter((post) => {
    const categoryMatch = state.category === '전체' || post.category === state.category;
    const haystack = `${post.title} ${post.excerpt} ${post.category}`.toLowerCase();
    return categoryMatch && (!query || haystack.includes(query));
  });

  $('#post-list').innerHTML = filtered.map((post) => `
    <a class="post-card" href="${escapeHtml(post.url)}">
      <div class="post-meta"><span class="post-tag">${escapeHtml(post.category || '기록')}</span><span>·</span><time datetime="${escapeHtml(post.date)}">${escapeHtml(post.date)}</time></div>
      <h3>${escapeHtml(post.title)}</h3>
      <p>${escapeHtml(post.excerpt || '')}</p>
    </a>
  `).join('');

  $('#empty').hidden = filtered.length !== 0;
}

async function init() {
  $('#year').textContent = new Date().getFullYear();
  try {
    const response = await fetch('posts.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    state.posts = await response.json();
    state.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    renderCategories();
    renderPosts();
  } catch (error) {
    console.error(error);
    $('#post-list').innerHTML = '<p class="empty">글 목록을 불러오지 못했습니다. 잠시 후 다시 확인해주세요.</p>';
  }
}

$('#search').addEventListener('input', (event) => {
  state.query = event.target.value;
  renderPosts();
});

init();
