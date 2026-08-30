const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
}

// Скрытие лоадера через плавную анимацию
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => loader.style.display = 'none', 400);
    }
  }, 900);
});

const categories = [
  { id: 'all', name: 'Все', icon: '⚡' },
  { id: 'stars', name: 'Stars', icon: '⭐' },
  { id: 'discord', name: 'Discord', icon: '🟣' },
  { id: 'steam', name: 'Steam', icon: '🎮' },
  { id: 'standoff', name: 'Standoff', icon: '🔫' },
  { id: 'spotify', name: 'Spotify', icon: '🎵' },
  { id: 'pubg', name: 'PUBG', icon: '🎯' }
];

const products = [
  { id: 1, cat: 'stars', name: '50 Telegram Stars', price: 50, badge: '🔥 Хіт продажів', badgeType: 'badge-fire', sub: 'Telegram Stars' },
  { id: 2, cat: 'stars', name: '100 Telegram Stars', price: 85, badge: '⚡ Швидка доставка', badgeType: 'badge-fast', sub: 'Telegram Stars' },
  { id: 3, cat: 'discord', name: 'Discord Nitro 1 Місяць', price: 300, badge: '🔥 Хіт продажів', badgeType: 'badge-fire', sub: 'Discord Nitro' },
  { id: 4, cat: 'discord', name: 'Discord Nitro 3 Місяці', price: 1150, badge: '💎 Вигідна ціна', badgeType: 'badge-deal', sub: 'Discord Nitro' },
  { id: 5, cat: 'steam', name: '200 грн на Steam', price: 250, badge: '⚡ Швидка доставка', badgeType: 'badge-fast', sub: 'Поповнення балансу' },
  { id: 6, cat: 'standoff', name: '100 Gold Standoff 2', price: 40, badge: '🔥 Хіт продажів', badgeType: 'badge-fire', sub: 'Голда' },
  { id: 7, cat: 'standoff', name: '200 Gold Standoff 2', price: 80, badge: '⚡ Популярне', badgeType: 'badge-fast', sub: 'Голда' },
  { id: 8, cat: 'spotify', name: 'Spotify Premium 1 Міс', price: 120, badge: '💎 Найкраща ціна', badgeType: 'badge-deal', sub: 'Індивідуальна підписка' }
];

let cart = [];
let currentCategory = 'all';
let ordersHistory = 0;

function renderCategories() {
  const bar = document.getElementById('categoriesBar');
  bar.innerHTML = categories.map(c => `
    <div class="cat-item ${c.id === currentCategory ? 'active' : ''}" onclick="selectCategory('${c.id}')">
      <div class="cat-icon-box">${c.icon}</div>
      <span class="cat-label">${c.name}</span>
    </div>
  `).join('');
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

  grid.innerHTML = filtered.map(item => `
    <div class="product-card">
      <div class="card-banner">
        <div class="badge-row">
          <span class="badge ${item.badgeType}">${item.badge}</span>
        </div>
        <div class="card-title-white">${item.name}</div>
      </div>
      <div class="card-info">
        <div class="card-price">${item.price} гривны</div>
        <div class="card-category">${item.sub}</div>
        <button class="btn-card" onclick="addToCart(${item.id})">У кошик</button>
      </div>
    </div>
  `).join('');
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
    totalDisplay.innerText = '0 гривны';
    return;
  }

  listContainer.innerHTML = cart.map((item, index) => `
    <div class="cart-item-row">
      <div class="cart-item-details">
        <span class="cart-item-title">${item.name}</span>
        <span class="cart-item-sub">${item.price} гривны × ${item.count} шт. = ${item.price * item.count} гривны</span>
      </div>
      <div class="cart-item-actions">
        <button class="btn-remove-item" onclick="removeFromCart(${index})">Видалити</button>
      </div>
    </div>
  `).join('');

  const total = cart.reduce((sum, i) => sum + (i.price * i.count), 0);
  totalDisplay.innerText = `${total} гривны`;
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
  const itemsText = cart.map(i => `• ${i.name} (${i.count} шт.) — ${i.price * i.count} гривны`).join('\n');

  closeCartModal();

  document.getElementById('receiptNumber').innerText = checkId;
  document.getElementById('receiptSummary').innerText = `${itemsText}\n\nРазом: ${total} гривны`;
  
  const msgForManager = `Привіт! Мій чек на замовлення в Gravity Shop:\n🧾 Чек: ${checkId}\n\nТовари:\n${itemsText}\n\n💳 Разом: ${total} гривны`;
  
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
