// Ініціалізація Telegram WebApp
const tg = window.Telegram?.WebApp;
if (tg) {
  try {
    tg.ready();
    tg.expand();
    if (tg.enableClosingConfirmation) tg.enableClosingConfirmation();
  } catch (e) {}
}

function hideLoader() {
  const loader = document.getElementById('loader');
  if (loader && !loader.classList.contains('hidden')) {
    loader.classList.add('hidden');
    setTimeout(() => { loader.style.display = 'none'; }, 450);
  }
}

window.addEventListener('DOMContentLoaded', () => setTimeout(hideLoader, 300));
setTimeout(hideLoader, 800);

function showToast(text) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.innerText = text;
  toast.classList.add('show');
  setTimeout(() => { toast.classList.remove('show'); }, 2300);
}

// Live Feed
const fakePurchases = [
  "Користувач @noy**** щойно купив Discord Nitro 1 Місяць",
  "Користувач @vla*** поповнив 1000 підписників TikTok",
  "Користувач @nik*** придбав 100 Telegram Stars",
  "Користувач @dan*** оформив 10 000 переглядів TikTok",
  "Користувач @art*** поповнив баланс Steam на 200 гривны"
];

let feedIdx = 0;
setInterval(() => {
  const el = document.getElementById('liveFeedText');
  if (el) {
    feedIdx = (feedIdx + 1) % fakePurchases.length;
    el.style.opacity = '0';
    setTimeout(() => {
      el.innerText = fakePurchases[feedIdx];
      el.style.opacity = '1';
    }, 250);
  }
}, 4500);

// КАТЕГОРІЇ
const categories = [
  { id: 'all', name: 'Все', icon: '⚡', img: '' },
  { id: 'tiktok', name: 'TikTok', icon: '📱', img: 'images/tiktok.jpg' },
  { id: 'stars', name: 'Stars', icon: '⭐', img: 'images/telegramstar.png' },
  { id: 'discord', name: 'Discord', icon: '🟣', img: 'images/discord.jpg' },
  { id: 'steam', name: 'Steam', icon: '🎮', img: 'images/steam.jpg' },
  { id: 'standoff', name: 'Standoff', icon: '🔫', img: 'images/standoff.jpg' },
  { id: 'spotify', name: 'Spotify', icon: '🎵', img: 'images/spotify.jpg' }
];

// ТОВАРИ (Підтримка прапорця disabled: true для розробки / відсутності товару)
const products = [
  { 
    id: 101, 
    cat: 'tiktok', 
    name: 'Накрутка підписників TikTok', 
    price: 90, 
    badge: 'Немає в наявності', 
    badgeType: 'badge-fire', 
    sub: '1000 якісних фоловерів', 
    icon: '👥', 
    img: 'images/products/tiktok_subs.png',
    disabled: true
  },
  { 
    id: 102, 
    cat: 'tiktok', 
    name: 'Накрутка переглядів TikTok', 
    price: 35, 
    badge: '⚡ ШВИДКА ДОСТАВКА', 
    badgeType: 'badge-fast', 
    sub: '10 000 переглядів у рек', 
    icon: '👀', 
    img: 'images/products/tiktok_views.png',
    disabled: false
  },
  { 
    id: 103, 
    cat: 'tiktok', 
    name: 'Накрутка коментарів TikTok', 
    price: 60, 
    badge: '💬 Активність', 
    badgeType: 'badge-deal', 
    sub: '50 позитивних коментарів', 
    icon: '💬', 
    img: 'images/products/tiktok_comments.png',
    disabled: false
  },
  { 
    id: 104, 
    cat: 'tiktok', 
    name: 'Накрутка репостів TikTok', 
    price: 45, 
    badge: '🚀 ТОП алгоритми', 
    badgeType: 'badge-fast', 
    sub: '500 репостів/поділів', 
    icon: '🔁', 
    img: 'images/products/tiktok_reposts.png',
    disabled: false
  },
  { 
    id: 1, 
    cat: 'stars', 
    name: '50 Telegram Stars', 
    price: 50, 
    badge: '🔥 Топ', 
    badgeType: 'badge-fire', 
    sub: 'Офіційні зірки Telegram', 
    icon: '⭐', 
    img: 'images/products/stars_50.png',
    disabled: false
  },
  { 
    id: 2, 
    cat: 'stars', 
    name: '100 Telegram Stars', 
    price: 85, 
    badge: '⚡ Миттєво', 
    badgeType: 'badge-fast', 
    sub: 'Офіційні зірки Telegram', 
    icon: '⭐', 
    img: 'images/products/stars_100.png',
    disabled: false
  },
  { 
    id: 3, 
    cat: 'discord', 
    name: 'Discord Nitro 1 Місяць', 
    price: 300, 
    badge: '🔥 Хіт', 
    badgeType: 'badge-fire', 
    sub: 'Full Nitro з 2 бустами', 
    icon: '🟣', 
    img: 'images/products/discord_nitro_1m.png',
    disabled: false
  },
  { 
    id: 4, 
    cat: 'discord', 
    name: 'Discord Nitro 3 Місяці', 
    price: 1150, 
    badge: '💎 Вигідно', 
    badgeType: 'badge-deal', 
    sub: 'Full Nitro гарантія', 
    icon: '💎', 
    img: 'images/products/discord_nitro_3m.png',
    disabled: false
  },
  { 
    id: 5, 
    cat: 'steam', 
    name: 'Поповнення Steam (200 грн)', 
    price: 250, 
    badge: '⚡ Авто-видача', 
    badgeType: 'badge-fast', 
    sub: 'Баланс гаманця Steam', 
    icon: '🎮', 
    img: 'images/products/steam_topup.png',
    disabled: false
  },
  { 
    id: 6, 
    cat: 'standoff', 
    name: '100 Gold Standoff 2', 
    price: 40, 
    badge: '🔥 Топ ціна', 
    badgeType: 'badge-fire', 
    sub: 'Голда по ринку з комісією', 
    icon: '🔫', 
    img: 'images/banner/bannerstandoff100gold.jpg',
    disabled: false
  },
  { 
    id: 7, 
    cat: 'spotify', 
    name: 'Spotify Premium 1 Міс', 
    price: 120, 
    badge: '🎵 Без реклами', 
    badgeType: 'badge-deal', 
    sub: 'Індивідуальна підписка', 
    icon: '🎵', 
    img: 'images/products/spotify_prem.png',
    disabled: false
  }
];

let cart = [];
let currentCategory = 'all';

function renderCategories() {
  const bar = document.getElementById('categoriesBar');
  if (!bar) return;

  bar.innerHTML = categories.map(c => {
    const iconContent = c.img 
      ? `<img src="${c.img}" class="cat-custom-img" alt="${c.name}" onerror="this.outerHTML='<span>${c.icon}</span>'">` 
      : `<span>${c.icon}</span>`;
      
    return `
      <div class="cat-item ${c.id === currentCategory ? 'active' : ''}" onclick="selectCategory('${c.id}')">
        <div class="cat-icon-box">${iconContent}</div>
        <span class="cat-label">${c.name}</span>
      </div>
    `;
  }).join('');
}

function selectCategory(catId) {
  currentCategory = catId;
  if (tg?.HapticFeedback) tg.HapticFeedback.selectionChanged();
  renderCategories();
  renderProducts();
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  const filtered = currentCategory === 'all' 
    ? products 
    : products.filter(p => p.cat === currentCategory);

  grid.innerHTML = filtered.map(item => {
    const bannerMedia = item.img 
      ? `<img src="${item.img}" class="card-custom-img" alt="${item.name}" onerror="this.outerHTML='<div class=\\'card-center-glow-icon\\'>${item.icon || '⚡'}</div>'">` 
      : `<div class="card-center-glow-icon">${item.icon || '⚡'}</div>`;

    const isOff = Boolean(item.disabled);
    const priceDisplay = isOff 
      ? `<span class="card-price" style="color: var(--text-muted); font-size: 12px;">Уточнюється</span>` 
      : `<span class="card-price">${item.price} <small>гривны</small></span>`;

    const buttonDisplay = isOff
      ? `<button class="btn-card disabled" disabled>Недоступно</button>`
      : `<button class="btn-card" onclick="addToCart(${item.id})">+ Купити</button>`;

    return `
      <div class="product-card ${isOff ? 'is-disabled' : ''}">
        <div class="card-banner">
          <div class="badge-row">
            <span class="badge ${item.badgeType || 'badge-fast'}">${item.badge || 'ТОП'}</span>
          </div>
          ${bannerMedia}
        </div>
        <div class="card-info">
          <div class="card-title-bottom">${item.name}</div>
          <div class="card-sub-info">${item.sub}</div>
          <div class="card-price-row">
            ${priceDisplay}
            ${buttonDisplay}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function addToCart(id) {
  const item = products.find(p => p.id === id);
  if (!item || item.disabled) return;

  const existing = cart.find(i => i.id === id);
  if (existing) existing.count += 1;
  else cart.push({ ...item, count: 1 });

  updateCartState();
  showToast(`✅ "${item.name}" додано до кошика!`);
  if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred('medium');
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.count += delta;
  if (item.count <= 0) cart = cart.filter(i => i.id !== id);

  updateCartState();
  renderCartScreen();
  if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred('light');
}

function updateCartState() {
  const totalCount = cart.reduce((sum, i) => sum + i.count, 0);
  const totalPrice = cart.reduce((sum, i) => sum + (i.price * i.count), 0);
  
  const cartBadge = document.getElementById('navCartBadge');
  if (cartBadge) {
    if (totalCount > 0) {
      cartBadge.innerText = totalCount;
      cartBadge.style.display = 'flex';
    } else {
      cartBadge.style.display = 'none';
    }
  }

  const floatingBar = document.getElementById('floatingCartBar');
  if (floatingBar) {
    if (totalCount > 0) {
      const fCount = document.getElementById('floatingCartCount');
      const fTotal = document.getElementById('floatingCartTotal');
      if (fCount) fCount.innerText = totalCount;
      if (fTotal) fTotal.innerText = `${totalPrice} гривны`;
      floatingBar.classList.add('visible');
    } else {
      floatingBar.classList.remove('visible');
    }
  }
  renderCartScreen();
}

function renderCartScreen() {
  const listContainer = document.getElementById('cartScreenItemsList');
  const totalDisplay = document.getElementById('cartScreenTotalDisplay');
  if (!listContainer || !totalDisplay) return;

  if (cart.length === 0) {
    listContainer.innerHTML = '<div class="empty-cart-msg">Ваш кошик порожній 🛒</div>';
    totalDisplay.innerText = '0 гривны';
    return;
  }

  listContainer.innerHTML = cart.map((item) => `
    <div class="cart-item-row">
      <div class="cart-item-details">
        <span class="cart-item-title">${item.name}</span>
        <span class="cart-item-sub">${item.price * item.count} гривны (${item.price} × ${item.count})</span>
      </div>
      <div class="cart-qty-control">
        <button class="btn-qty" onclick="changeQty(${item.id}, -1)">−</button>
        <span class="qty-val">${item.count}</span>
        <button class="btn-qty" onclick="changeQty(${item.id}, 1)">+</button>
      </div>
    </div>
  `).join('');

  const total = cart.reduce((sum, i) => sum + (i.price * i.count), 0);
  totalDisplay.innerText = `${total} гривны`;
}

function clearCart() {
  cart = [];
  updateCartState();
}

function generateCheckId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let res = '#GR-';
  for (let i = 0; i < 5; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
  return res;
}

function checkoutOrder() {
  if (cart.length === 0) {
    if (tg?.showAlert) tg.showAlert("Додайте хоча б один товар до кошика!");
    else alert("Додайте хоча б один товар до кошика!");
    return;
  }

  const checkId = generateCheckId();
  const total = Number(cart.reduce((sum, i) => sum + (i.price * i.count), 0));
  const itemsText = cart.map(i => `• ${i.name} (${i.count} шт.) — ${i.price * i.count} гривны`).join('\n');

  const receiptNumEl = document.getElementById('receiptNumber');
  const receiptSumEl = document.getElementById('receiptSummary');
  if (receiptNumEl) receiptNumEl.innerText = checkId;
  if (receiptSumEl) receiptSumEl.innerText = `${itemsText}\n\nРазом: ${total} гривны`;

  const msgForManager = `Привіт! Хочу замовити в Gravity Shop:\n🧾 Замовлення: ${checkId}\n\nТовари:\n${itemsText}\n\n💳 Разом до сплати: ${total} гривны`;

  const sendBtn = document.getElementById('btnSendManager');
  if (sendBtn) {
    sendBtn.onclick = function() {
      const url = `https://t.me/Fambod?text=${encodeURIComponent(msgForManager)}`;
      if (tg) tg.openTelegramLink(url);
      else window.open(url, '_blank');
    };
  }

  document.getElementById('receiptModal')?.classList.add('active');
  if (tg?.HapticFeedback) tg.HapticFeedback.notificationOccurred('success');

  cart = [];
  updateCartState();
}

function closeReceiptModal() {
  document.getElementById('receiptModal')?.classList.remove('active');
}

function copyCheckId() {
  const checkId = document.getElementById('receiptNumber')?.innerText;
  if (checkId) {
    navigator.clipboard?.writeText(checkId);
    showToast(`📋 Номер ${checkId} скопійовано!`);
    if (tg?.HapticFeedback) tg.HapticFeedback.notificationOccurred('success');
  }
}

function switchTab(tab) {
  const views = {
    catalog: document.getElementById('viewCatalog'),
    cart: document.getElementById('viewCart'),
    profile: document.getElementById('viewProfile')
  };

  const tabs = {
    catalog: document.getElementById('tabCatalog'),
    cart: document.getElementById('tabCart'),
    profile: document.getElementById('tabProfile')
  };

  Object.values(views).forEach(v => { if (v) v.style.display = 'none'; });
  Object.values(tabs).forEach(t => t?.classList.remove('active'));

  if (views[tab]) views[tab].style.display = 'block';
  if (tabs[tab]) tabs[tab].classList.add('active');

  if (tg?.HapticFeedback) tg.HapticFeedback.selectionChanged();

  if (tab === 'cart') renderCartScreen();
  if (tab === 'profile') loadProfileData();
}

function loadProfileData() {
  const u = tg?.initDataUnsafe?.user;
  const fullName = `${u?.first_name || ''} ${u?.last_name || ''}`.trim() || 'Користувач';

  const nameEl = document.getElementById('userName');
  const userEl = document.getElementById('userUsername');
  const idEl = document.getElementById('userId');
  const avatarEl = document.getElementById('userAvatar');

  if (nameEl) nameEl.innerText = fullName;
  if (userEl) userEl.innerText = u?.username ? `@${u.username}` : 'Без юзернейму';
  if (idEl) idEl.innerText = u?.id || '5188484100';
  if (avatarEl && u?.first_name) {
    avatarEl.innerText = u.first_name.charAt(0).toUpperCase();
  }
}

function scrollToCatalog() {
  const grid = document.getElementById('productsGrid');
  if (grid) grid.scrollIntoView({ behavior: 'smooth' });
}

renderCategories();
renderProducts();
loadProfileData();
