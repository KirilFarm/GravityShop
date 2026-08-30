const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
}

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

// Корзина: [{ id, name, price, count }]
let cart = [];
let currentCategory = 'all';

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

// Управление окном корзины
function openCartModal() {
  renderCartModal();
  document.getElementById('cartModal').classList.add('active');
}

function closeCartModal() {
  document.getElementById('cartModal').classList.remove('active');
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

function checkoutOrder() {
  if (cart.length === 0) {
    if (tg) tg.showAlert("Додайте хоча б один товар до кошика!");
    else alert("Додайте хоча б один товар до кошика!");
    return;
  }

  const total = cart.reduce((sum, i) => sum + (i.price * i.count), 0);

  const payload = {
    action: "order",
    items: cart,
    total: total
  };

  if (tg) {
    tg.sendData(JSON.stringify(payload));
  } else {
    alert("Замовлення надіслано боту!");
    clearCart();
    closeCartModal();
  }
}

function openManagerDirect() {
  if (tg) tg.openTelegramLink('https://t.me/Fambod');
  else window.open('https://t.me/Fambod', '_blank');
}

function scrollToCatalog() {
  document.getElementById('productsGrid').scrollIntoView({ behavior: 'smooth' });
}

function switchTab(tab) {
  if (tab === 'menu') {
    selectCategory('all');
    closeCartModal();
  }
}

renderCategories();
renderProducts();
