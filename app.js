// Инициализация Telegram WebApp
const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
}

// Категории
const categories = [
  { id: 'all', name: 'Все', icon: '⚡' },
  { id: 'stars', name: 'Stars', icon: '⭐' },
  { id: 'discord', name: 'Discord', icon: '🟣' },
  { id: 'steam', name: 'Steam', icon: '🎮' },
  { id: 'standoff', name: 'Standoff', icon: '🔫' },
  { id: 'spotify', name: 'Spotify', icon: '🎵' },
  { id: 'pubg', name: 'PUBG', icon: '🎯' }
];

// Список товаров
const products = [
  {
    id: 1,
    cat: 'stars',
    name: '50 Telegram Stars',
    price: 50,
    badge: '🔥 Хіт продажів',
    badgeType: 'badge-fire',
    sub: 'Telegram Stars'
  },
  {
    id: 2,
    cat: 'stars',
    name: '100 Telegram Stars',
    price: 85,
    badge: '⚡ Швидка доставка',
    badgeType: 'badge-fast',
    sub: 'Telegram Stars'
  },
  {
    id: 3,
    cat: 'discord',
    name: 'Discord Nitro 1 Місяць',
    price: 300,
    badge: '🔥 Хіт продажів',
    badgeType: 'badge-fire',
    sub: 'Discord Nitro'
  },
  {
    id: 4,
    cat: 'discord',
    name: 'Discord Nitro 3 Місяці',
    price: 1150,
    badge: '💎 Вигідна ціна',
    badgeType: 'badge-deal',
    sub: 'Discord Nitro'
  },
  {
    id: 5,
    cat: 'steam',
    name: '200 грн на Steam',
    price: 250,
    badge: '⚡ Швидка доставка',
    badgeType: 'badge-fast',
    sub: 'Поповнення балансу'
  },
  {
    id: 6,
    cat: 'standoff',
    name: '100 Gold Standoff 2',
    price: 40,
    badge: '🔥 Хіт продажів',
    badgeType: 'badge-fire',
    sub: 'Голда'
  },
  {
    id: 7,
    cat: 'standoff',
    name: '200 Gold Standoff 2',
    price: 80,
    badge: '⚡ Популярне',
    badgeType: 'badge-fast',
    sub: 'Голда'
  },
  {
    id: 8,
    cat: 'spotify',
    name: 'Spotify Premium 1 Міс',
    price: 120,
    badge: '💎 Найкраща ціна',
    badgeType: 'badge-deal',
    sub: 'Індивідуальна підписка'
  }
];

let cart = [];
let currentCategory = 'all';

// Отрисовка списка категорий
function renderCategories() {
  const bar = document.getElementById('categoriesBar');
  bar.innerHTML = categories.map(c => `
    <div class="cat-item ${c.id === currentCategory ? 'active' : ''}" onclick="selectCategory('${c.id}')">
      <div class="cat-icon-box">${c.icon}</div>
      <span class="cat-label">${c.name}</span>
    </div>
  `).join('');
}

// Переключение категории
function selectCategory(catId) {
  currentCategory = catId;
  renderCategories();
  renderProducts();
}

// Отрисовка карточек товаров
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

// Добавление в корзину
function addToCart(id) {
  const item = products.find(p => p.id === id);
  if (item) {
    cart.push(item);
    document.getElementById('cartCount').innerText = cart.length;
    
    // Telegram тактильный отклик (Haptic Feedback)
    if (tg && tg.HapticFeedback) {
      tg.HapticFeedback.impactOccurred('light');
    }
  }
}

// Открытие и оформление корзины
function openCart() {
  if (cart.length === 0) {
    if (tg) tg.showAlert("Ваш кошик порожній");
    else alert("Ваш кошик порожній");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const itemsText = cart.map((i, idx) => `${idx + 1}. ${i.name} (${i.price} гривны)`).join('\n');

  const confirmed = confirm(`Ваше замовлення:\n${itemsText}\n\nРазом: ${total} гривны\n\nПідтвердити оформлення?`);
  
  if (confirmed) {
    const payload = {
      action: "order",
      items: cart,
      total: total
    };
    
    if (tg) {
      tg.sendData(JSON.stringify(payload));
    } else {
      alert("Замовлення надіслано боту!");
      cart = [];
      document.getElementById('cartCount').innerText = 0;
    }
  }
}

// Связь с менеджером и соцсети
function openManager() {
  if (tg) tg.openTelegramLink('https://t.me/your_manager_username');
  else window.open('https://t.me/your_manager_username', '_blank');
}

function openTelegramChannel() {
  if (tg) tg.openTelegramLink('https://t.me/your_channel_username');
  else window.open('https://t.me/your_channel_username', '_blank');
}

function openInstagram() {
  window.open('https://instagram.com/your_shop', '_blank');
}

function scrollToCatalog() {
  document.getElementById('productsGrid').scrollIntoView({ behavior: 'smooth' });
}

function switchTab(tab) {
  if (tab === 'menu') {
    selectCategory('all');
  }
}

// Старт
renderCategories();
renderProducts();
