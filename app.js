const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
}

// 4 секунди затримки завантаження з плавною анімацією
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => loader.style.display = 'none', 500);
    }
  }, 4000);
});

// Категорії: можна вказати посилання на власне фото в поле img (наприклад: 'img/tiktok.png')
const categories = [
  { id: 'all', name: 'Все', icon: '⚡', img: '' },
  { id: 'tiktok', name: 'TikTok', icon: '📱', img: '' },
  { id: 'stars', name: 'Stars', icon: '⭐', img: '' },
  { id: 'discord', name: 'Discord', icon: '🟣', img: '' },
  { id: 'steam', name: 'Steam', icon: '🎮', img: '' },
  { id: 'standoff', name: 'Standoff', icon: '🔫', img: '' },
  { id: 'spotify', name: 'Spotify', icon: '🎵', img: '' }
];

// Список товарів: можна вказати посилання на власне фото картки в полі img
const products = [
  // Послуги TikTok
  { 
    id: 101, 
    cat: 'tiktok', 
    name: 'Накрутка підписників TikTok', 
    price: 90, 
    badge: '🔥 Хіт продажів', 
    badgeType: 'badge-fire', 
    sub: '1000 якісних фоловерів',
    img: '' 
  },
  { 
    id: 102, 
    cat: 'tiktok', 
    name: 'Накрутка переглядів TikTok', 
    price: 35, 
    badge: '⚡ Швидка доставка', 
    badgeType: 'badge-fast', 
    sub: '10 000 переглядів',
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
    img: '' 
  },
  { 
    id: 104, 
    cat: 'tiktok', 
    name: 'Накрутка репостів TikTok', 
    price: 45, 
    badge: '🚀 У рекомендації', 
    badgeType: 'badge-fast', 
    sub: '500 репостів/поділів',
    img: '' 
  },
  // Stars & Discord & Games
  { 
    id: 1, 
    cat: 'stars', 
    name: '50 Telegram Stars', 
    price: 50, 
    badge: '🔥 Хіт продажів', 
    badgeType: 'badge-fire', 
    sub: 'Офіційні зірки',
    img: '' 
  },
  { 
    id: 2, 
    cat: 'stars', 
    name: '100 Telegram Stars', 
    price: 85, 
    badge: '⚡ Швидка доставка', 
    badgeType: 'badge-fast', 
    sub: 'Офіційні зірки',
    img: '' 
  },
  { 
    id: 3, 
    cat: 'discord', 
    name: 'Discord Nitro 1 Місяць', 
    price: 300, 
    badge: '🔥 Хіт продажів', 
    badgeType: 'badge-fire', 
    sub: 'Full Nitro з бустами',
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
    img: '' 
  },
  { 
    id: 5, 
    cat: 'steam', 
    name: '200 грн на Steam', 
    price: 250, 
    badge: '⚡ Авто-видача', 
    badgeType: 'badge-fast', 
    sub: 'Поповнення балансу',
    img: '' 
  },
  { 
    id: 6, 
    cat: 'standoff', 
    name: '100 Gold Standoff 2', 
    price: 40, 
    badge: '🔥 Топ ціна', 
    badgeType: 'badge-fire', 
    sub: 'Голда по ринку',
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
    img: '' 
  }
];

let cart = [];
let currentCategory = 'all';
let ordersHistory = 0;

function renderCategories() {
  const bar = document.getElementById('categoriesBar');
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

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const filtered = currentCategory === 'all' 
    ? products 
    : products.filter(p => p.cat === currentCategory);

  grid.innerHTML = filtered.map(item => {
    const bannerMedia = item.img 
      ? `<img src="${item.img}" class="card-custom-img" alt="${item.name}">` 
      : `<div class="card-title-white">${item.name}</div>`;

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
          <div class="card-price">${item.price} грн</div>
          <div class="card-category">${item.sub}</div>
          <button class="btn-card" onclick="addToCart(${item.id})">У кошик</button>
        </div>
      </div>
    `;
  }).join('');
}

function addToCart(id) {
  const item = products.find(p => p.id === id);
  if (!item) return;

  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.count += 1;
  } else {
    cart.push({ ...item, count: 1 });
  }

  updateCartBadge();
  if (tg && tg.HapticFeedback) tg.HapticFeedback.impactOccurred('light');
}

function updateCartBadge() {
  const totalCount = cart.reduce((sum, i) => sum + i.count, 0);
  document.getElementById('cartCount').innerText = totalCount;
}

function openCartModal() {
  renderCartModal();
  document.getElementById('cartModal').classList.add('active');
}

function closeCartModal() {
  document.getElementById('cartModal').classList.remove('active');
}

function closeReceiptModal() {
  document.getElementById('receiptModal').classList.remove('active');
}

function renderCartModal() {
  const listContainer = document.getElementById('cartItemsList');
  const totalDisplay = document.getElementById('cartTotalDisplay');

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
      <div class="cart-item-actions">
        <button class="btn-remove-item" onclick="removeFromCart(${index})">Видалити</button>
      </div>
    </div>
  `).join('');

  const total = cart.reduce((sum, i) => sum + (i.price * i.count), 0);
  totalDisplay.innerText = `${total} грн`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartBadge();
  renderCartModal();
  if (tg && tg.HapticFeedback) tg.HapticFeedback.notificationOccurred('warning');
}

function clearCart() {
  cart = [];
  updateCartBadge();
  renderCartModal();
}

function generateCheckId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let res = '#';
  for (let i = 0; i < 6; i++) {
    res += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return res;
}

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

  document.getElementById('receiptNumber').innerText = checkId;
  document.getElementById('receiptSummary').innerText = `${itemsText}\n\nРазом: ${total} грн`;
  
  const msgForManager = `Привіт! Мій чек на замовлення в Gravity Shop:\n🧾 Чек: ${checkId}\n\nТовари:\n${itemsText}\n\n💳 Разом: ${total} грн`;
  
  document.getElementById('btnSendManager').onclick = function() {
    const url = `https://t.me/Fambod?text=${encodeURIComponent(msgForManager)}`;
    if (tg) tg.openTelegramLink(url);
    else window.open(url, '_blank');
  };

  document.getElementById('receiptModal').classList.add('active');

  try {
    tg.sendData(JSON.stringify({ checkId, items: cart, total }));
  } catch (e) {}

  ordersHistory += 1;
  document.getElementById('userOrdersCount').innerText = ordersHistory;
  cart = [];
  updateCartBadge();
}

function switchTab(tab) {
  const catalog = document.getElementById('catalogView');
  const profile = document.getElementById('profileView');
  const menuBtn = document.getElementById('navMenuBtn');
  const profBtn = document.getElementById('navProfileBtn');

  if (tab === 'menu') {
    catalog.style.display = 'block';
    profile.style.display = 'none';
    menuBtn.classList.add('active');
    profBtn.classList.remove('active');
  } else if (tab === 'profile') {
    catalog.style.display = 'none';
    profile.style.display = 'block';
    profBtn.classList.add('active');
    menuBtn.classList.remove('active');
    loadProfileData();
  }
}

function loadProfileData() {
  if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
    const u = tg.initDataUnsafe.user;
    document.getElementById('userName').innerText = `${u.first_name || ''} ${u.last_name || ''}`.trim() || 'Користувач';
    document.getElementById('userUsername').innerText = u.username ? `@${u.username}` : 'Без юзернейму';
    document.getElementById('userId').innerText = u.id || 'Невідомо';
    if (u.first_name) {
      document.getElementById('userAvatar').innerText = u.first_name.charAt(0).toUpperCase();
    }
  }
}

function scrollToCatalog() {
  document.getElementById('productsGrid').scrollIntoView({ behavior: 'smooth' });
}

renderCategories();
renderProducts();
loadProfileData();
