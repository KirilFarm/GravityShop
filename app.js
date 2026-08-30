// Ініціалізація Telegram WebApp
const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
}

// Приховування екрану завантаження
function hideLoader() {
  const loader = document.getElementById('loader');
  if (loader && !loader.classList.contains('hidden')) {
    loader.classList.add('hidden');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(hideLoader, 1500);
});

// Live Feed (Імітація покупок у реальному часі)
const fakePurchases = [
  "Користувач @and*** щойно купив Discord Nitro 1 Місяць",
  "Користувач @vla*** поповнив 1000 підписників TikTok",
  "Користувач @nik*** придбав 100 Telegram Stars",
  "Користувач @dan*** оформив 10 000 переглядів TikTok",
  "Користувач @art*** поповнив баланс Steam на 200 гривен"
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
    }, 300);
  }
}, 5000);

// Категорії
const categories = [
  { id: 'all', name: 'Все', icon: '⚡', img: '' },
  { id: 'tiktok', name: 'TikTok', icon: '📱', img: '' },
  { id: 'stars', name: 'Stars', icon: '⭐', img: '' },
  { id: 'discord', name: 'Discord', icon: '🟣', img: '' },
  { id: 'steam', name: 'Steam', icon: '🎮', img: '' },
  { id: 'standoff', name: 'Standoff', icon: '🔫', img: '' },
  { id: 'spotify', name: 'Spotify', icon: '🎵', img: '' }
];

// Список товарів
const products = [
  { 
    id: 101, 
    cat: 'tiktok', 
    name: 'Накрутка підписників TikTok', 
    price: 90, 
    badge: '🔥 Хіт продажів', 
    badgeType: 'badge-fire', 
    sub: '1000 якісних фоловерів',
    icon: '👥',
    img: '' 
  },
  { 
    id: 102, 
    cat: 'tiktok', 
    name: 'Накрутка переглядів TikTok', 
    price: 35, 
    badge: '⚡ Швидка доставка', 
    badgeType: 'badge-fast', 
    sub: '10 000 переглядів у рекомендації',
    icon: '👀',
    img: '' 
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
    img: '' 
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
    img: '' 
  },
  { 
    id: 1, 
    cat: 'stars', 
    name: '50 Telegram Stars', 
    price: 50, 
    badge: '🔥 Хіт продажів', 
    badgeType: 'badge-fire', 
    sub: 'Офіційні зірки Telegram',
    icon: '⭐',
    img: '' 
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
    img: '' 
  },
  { 
    id: 3, 
    cat: 'discord', 
    name: 'Discord Nitro 1 Місяць', 
    price: 300, 
    badge: '🔥 Хіт продажів', 
    badgeType: 'badge-fire', 
    sub: 'Full Nitro з 2 бустами',
    icon: '🟣',
    img: '' 
  },
  { 
    id: 4, 
    cat: 'discord', 
    name: 'Discord Nitro 3 Місяці', 
    price: 1150, 
    badge: '💎 Вигідна ціна', 
    badgeType: 'badge-deal', 
    sub: 'Full Nitro гарантія',
    icon: '💎',
    img: '' 
  },
  { 
    id: 5, 
    cat: 'steam', 
    name: 'Поповнення Steam (200 грн)', 
    price: 250, 
    badge: '⚡ Авто-видача', 
    badgeType: 'badge-fast', 
    sub: 'Поповнення балансу акаунту',
    icon: '🎮',
    img: '' 
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
    img: '' 
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
    img: '' 
  }
];

let cart = [];
let currentCategory = 'all';
let ordersHistory = 0;

// Відображення категорій
function renderCategories() {
  const bar = document.getElementById('categoriesBar');
  if (!bar) return;

  bar.innerHTML = categories.map(c => {
    const iconContent = c.img 
      ? `<img src="${c.img}" class="cat-custom-img" alt="${c.name}">` 
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
  renderCategories();
  renderProducts();
}

// Відображення товарів
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  const filtered = currentCategory === 'all' 
    ? products 
    : products.filter(p => p.cat === currentCategory);

  grid.innerHTML = filtered.map(item => {
    const bannerMedia = item.img 
      ? `<img src="${item.img}" class="card-custom-img" alt="${item.name}">` 
      : `<div class="card-center-glow-icon">${item.icon || '⚡'}</div>`;

    return `
      <div class="product-card">
        <div class="card-banner">
          <div class="badge-row">
            <span class="badge ${item.badgeType}">${item.badge}</span>
          </div>
          ${bannerMedia}
        </div>
        <div class="card-info">
          <div class="card-title-bottom">${item.name}</div>
          <div class="card-sub-info">${item.sub}</div>
          <div class="card-price-row">
            <span class="card-price">${item.price} грн</span>
            <button class="btn-card" onclick="addToCart(${item.id})">+ В кошик</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Робота з кошиком
function addToCart(id) {
  const item = products.find(p => p.id === id);
  if (!item) return;

  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.count += 1;
  } else {
    cart.push({ ...item, count: 1 });
  }

  updateCartState();
  if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred('medium');
}

function updateCartState() {
  const totalCount = cart.reduce((sum, i) => sum + i.count, 0);
  const totalPrice = cart.reduce((sum, i) => sum + (i.price * i.count), 0);
  
  const cartCountEl = document.getElementById('cartCount');
  if (cartCountEl) cartCountEl.innerText = totalCount;

  const floatingBar = document.getElementById('floatingCartBar');
  if (floatingBar) {
    if (totalCount > 0) {
      const fCount = document.getElementById('floatingCartCount');
      const fTotal = document.getElementById('floatingCartTotal');
      if (fCount) fCount.innerText = totalCount;
      if (fTotal) fTotal.innerText = `${totalPrice} грн`;
      floatingBar.classList.add('visible');
    } else {
      floatingBar.classList.remove('visible');
    }
  }
}

function openCartModal() {
  renderCartModal();
  document.getElementById('cartModal')?.classList.add('active');
}

function closeCartModal() {
  document.getElementById('cartModal')?.classList.remove('active');
}

function closeReceiptModal() {
  document.getElementById('receiptModal')?.classList.remove('active');
}

function renderCartModal() {
  const listContainer = document.getElementById('cartItemsList');
  const totalDisplay = document.getElementById('cartTotalDisplay');
  if (!listContainer || !totalDisplay) return;

  if (cart.length === 0) {
    listContainer.innerHTML = '<div class="empty-cart-msg">Ваш кошик порожній 🛒</div>';
    totalDisplay.innerText = '0 грн';
    return;
  }

  listContainer.innerHTML = cart.map((item, index) => `
    <div class="cart-item-row">
      <div class="cart-item-details">
        <span class="cart-item-title">${item.name}</span>
        <span class="cart-item-sub">${item.price} грн × ${item.count} шт. = ${item.price * item.count} грн</span>
      </div>
      <button class="btn-remove-item" onclick="removeFromCart(${index})">Видалити</button>
    </div>
  `).join('');

  const total = cart.reduce((sum, i) => sum + (i.price * i.count), 0);
  totalDisplay.innerText = `${total} грн`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartState();
  renderCartModal();
  if (tg?.HapticFeedback) tg.HapticFeedback.notificationOccurred('warning');
}

function clearCart() {
  cart = [];
  updateCartState();
  renderCartModal();
}

function generateCheckId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let res = '#GR-';
  for (let i = 0; i < 5; i++) {
    res += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return res;
}

// Оформлення замовлення
function checkoutOrder() {
  if (cart.length === 0) {
    if (tg) tg.showAlert("Додайте хоча б один товар до кошика!");
    else alert("Додайте хоча б один товар до кошика!");
    return;
  }

  const checkId = generateCheckId();
  const total = cart.reduce((sum, i) => sum + (i.price * i.count), 0);
  const itemsText = cart.map(i => `• ${i.name} (${i.count} шт.) — ${i.price * i.count} грн`).join('\n');

  closeCartModal();

  const receiptNumEl = document.getElementById('receiptNumber');
  const receiptSumEl = document.getElementById('receiptSummary');
  if (receiptNumEl) receiptNumEl.innerText = checkId;
  if (receiptSumEl) receiptSumEl.innerText = `${itemsText}\n\nРазом: ${total} грн`;
  
  const orderData = {
    id: checkId,
    items: cart.map(i => ({ id: i.id, name: i.name, count: i.count, price: i.price })),
    total: total
  };
  
  const encodedPayload = btoa(encodeURIComponent(JSON.stringify(orderData)));
  const msgForManager = `Привіт! Мій чек на замовлення в Gravity Shop:\n🧾 Чек: ${checkId}\n\nТовари:\n${itemsText}\n\n💳 Разом: ${total} грн\n\n(Посилання для реєстрації чека в базі: https://t.me/garavityshop_bot?start=order_${encodedPayload})`;

  const sendBtn = document.getElementById('btnSendManager');
  if (sendBtn) {
    sendBtn.onclick = function() {
      const url = `https://t.me/Fambod?text=${encodeURIComponent(msgForManager)}`;
      if (tg) tg.openTelegramLink(url);
      else window.open(url, '_blank');
    };
  }

  document.getElementById('receiptModal')?.classList.add('active');

  try {
    tg?.sendData(JSON.stringify({ checkId, items: cart, total }));
  } catch (e) {
    console.error("Помилка відправки tg.sendData:", e);
  }

  ordersHistory += 1;
  const ordersCountEl = document.getElementById('userOrdersCount');
  if (ordersCountEl) ordersCountEl.innerText = ordersHistory;
  
  cart = [];
  updateCartState();
}

// Навігація між вкладками
function switchTab(tab) {
  const catalog = document.getElementById('catalogView');
  const profile = document.getElementById('profileView');
  const menuBtn = document.getElementById('navMenuBtn');
  const profBtn = document.getElementById('navProfileBtn');

  if (tab === 'menu') {
    if (catalog) catalog.style.display = 'block';
    if (profile) profile.style.display = 'none';
    menuBtn?.classList.add('active');
    profBtn?.classList.remove('active');
  } else if (tab === 'profile') {
    if (catalog) catalog.style.display = 'none';
    if (profile) profile.style.display = 'block';
    profBtn?.classList.add('active');
    menuBtn?.classList.remove('active');
    loadProfileData();
  }
}

// Завантаження профілю
function loadProfileData() {
  if (tg?.initDataUnsafe?.user) {
    const u = tg.initDataUnsafe.user;
    const nameEl = document.getElementById('userName');
    const userEl = document.getElementById('userUsername');
    const idEl = document.getElementById('userId');
    const avatarEl = document.getElementById('userAvatar');

    if (nameEl) nameEl.innerText = `${u.first_name || ''} ${u.last_name || ''}`.trim() || 'Користувач';
    if (userEl) userEl.innerText = u.username ? `@${u.username}` : 'Без юзернейму';
    if (idEl) idEl.innerText = u.id || 'Невідомо';
    if (avatarEl && u.first_name) {
      avatarEl.innerText = u.first_name.charAt(0).toUpperCase();
    }
  }
}

function scrollToCatalog() {
  const grid = document.getElementById('productsGrid');
  if (grid) grid.scrollIntoView({ behavior: 'smooth' });
}

// Старт додатку
renderCategories();
renderProducts();
loadProfileData();
