// Ініціалізація Telegram WebApp
const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
  if (tg.enableClosingConfirmation) {
    tg.enableClosingConfirmation();
  }
}

// Приховування екрану завантаження
function hideLoader() {
  const loader = document.getElementById('loader');
  if (loader && !loader.classList.contains('hidden')) {
    loader.classList.add('hidden');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 450);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(hideLoader, 800);
});

// Toast Сповіщення
function showToast(text) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.innerText = text;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2300);
}

// Управління балансом та історією
const urlParams = new URLSearchParams(window.location.search);
let userBalance = parseInt(urlParams.get('bal') || localStorage.getItem('gravity_balance') || '0', 10);
let ordersHistory = parseInt(localStorage.getItem('gravity_orders_count') || '0', 10);

function updateBalanceDisplays() {
  const headerBal = document.getElementById('headerBalance');
  const profBal = document.getElementById('profileBalance');
  const cartBal = document.getElementById('cartUserBalance');
  
  if (headerBal) headerBal.innerText = userBalance;
  if (profBal) profBal.innerText = userBalance;
  if (cartBal) cartBal.innerText = userBalance;
  
  localStorage.setItem('gravity_balance', userBalance.toString());
}

// Live Feed (Імітація покупок у реальному часі)
const fakePurchases = [
  "Користувач @and*** щойно купив Discord Nitro 1 Місяць",
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

// Категорії
const categories = [
  { id: 'all', name: 'Все', icon: '⚡' },
  { id: 'tiktok', name: 'TikTok', icon: '📱' },
  { id: 'stars', name: 'Stars', icon: '⭐' },
  { id: 'discord', name: 'Discord', icon: '🟣' },
  { id: 'steam', name: 'Steam', icon: '🎮' },
  { id: 'standoff', name: 'Standoff', icon: '🔫' },
  { id: 'spotify', name: 'Spotify', icon: '🎵' }
];

// Товари
const products = [
  { 
    id: 101, 
    cat: 'tiktok', 
    name: 'Накрутка підписників TikTok', 
    price: 90, 
    badge: '🔥 Хіт продажів', 
    badgeType: 'badge-fire', 
    sub: '1000 якісних фоловерів',
    icon: '👥' 
  },
  { 
    id: 102, 
    cat: 'tiktok', 
    name: 'Накрутка переглядів TikTok', 
    price: 35, 
    badge: '⚡ Швидка доставка', 
    badgeType: 'badge-fast', 
    sub: '10 000 переглядів у рекомендації',
    icon: '👀' 
  },
  { 
    id: 103, 
    cat: 'tiktok', 
    name: 'Накрутка коментарів TikTok', 
    price: 60, 
    badge: '💬 Активність', 
    badgeType: 'badge-deal', 
    sub: '50 позитивних коментарів',
    icon: '💬' 
  },
  { 
    id: 104, 
    cat: 'tiktok', 
    name: 'Накрутка репостів TikTok', 
    price: 45, 
    badge: '🚀 ТОП алгоритми', 
    badgeType: 'badge-fast', 
    sub: '500 репостів/поділів',
    icon: '🔁' 
  },
  { 
    id: 1, 
    cat: 'stars', 
    name: '50 Telegram Stars', 
    price: 50, 
    badge: '🔥 Топ', 
    badgeType: 'badge-fire', 
    sub: 'Офіційні зірки Telegram',
    icon: '⭐' 
  },
  { 
    id: 2, 
    cat: 'stars', 
    name: '100 Telegram Stars', 
    price: 85, 
    badge: '⚡ Миттєво', 
    badgeType: 'badge-fast', 
    sub: 'Офіційні зірки Telegram',
    icon: '⭐' 
  },
  { 
    id: 3, 
    cat: 'discord', 
    name: 'Discord Nitro 1 Місяць', 
    price: 300, 
    badge: '🔥 Хіт', 
    badgeType: 'badge-fire', 
    sub: 'Full Nitro з 2 бустами',
    icon: '🟣' 
  },
  { 
    id: 4, 
    cat: 'discord', 
    name: 'Discord Nitro 3 Місяці', 
    price: 1150, 
    badge: '💎 Вигідно', 
    badgeType: 'badge-deal', 
    sub: 'Full Nitro гарантія',
    icon: '💎' 
  },
  { 
    id: 5, 
    cat: 'steam', 
    name: 'Поповнення Steam (200 грн)', 
    price: 250, 
    badge: '⚡ Авто-видача', 
    badgeType: 'badge-fast', 
    sub: 'Поповнення балансу акаунту',
    icon: '🎮' 
  },
  { 
    id: 6, 
    cat: 'standoff', 
    name: '100 Gold Standoff 2', 
    price: 40, 
    badge: '🔥 Топ ціна', 
    badgeType: 'badge-fire', 
    sub: 'Голда по ринку з комісією',
    icon: '🔫' 
  },
  { 
    id: 7, 
    cat: 'spotify', 
    name: 'Spotify Premium 1 Міс', 
    price: 120, 
    badge: '🎵 Без реклами', 
    badgeType: 'badge-deal', 
    sub: 'Індивідуальна підписка',
    icon: '🎵' 
  }
];

let cart = [];
let currentCategory = 'all';

// Відображення категорій
function renderCategories() {
  const bar = document.getElementById('categoriesBar');
  if (!bar) return;

  bar.innerHTML = categories.map(c => `
    <div class="cat-item ${c.id === currentCategory ? 'active' : ''}" onclick="selectCategory('${c.id}')">
      <div class="cat-icon-box">
        <span>${c.icon}</span>
      </div>
      <span class="cat-label">${c.name}</span>
    </div>
  `).join('');
}

function selectCategory(catId) {
  currentCategory = catId;
  if (tg?.HapticFeedback) tg.HapticFeedback.selectionChanged();
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

  grid.innerHTML = filtered.map(item => `
    <div class="product-card">
      <div class="card-banner">
        <div class="badge-row">
          <span class="badge ${item.badgeType}">${item.badge}</span>
        </div>
        <div class="card-center-glow-icon">${item.icon || '⚡'}</div>
      </div>
      <div class="card-info">
        <div class="card-title-bottom">${item.name}</div>
        <div class="card-sub-info">${item.sub}</div>
        <div class="card-price-row">
          <span class="card-price">${item.price} <small>гривны</small></span>
          <button class="btn-card" onclick="addToCart(${item.id})">+ Купити</button>
        </div>
      </div>
    </div>
  `).join('');
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
  showToast(`✅ "${item.name}" додано до кошика!`);
  if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred('medium');
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.count += delta;
  if (item.count <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  updateCartState();
  renderCartModal();
  if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred('light');
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
      if (fTotal) fTotal.innerText = `${totalPrice} гривны`;
      floatingBar.classList.add('visible');
    } else {
      floatingBar.classList.remove('visible');
    }
  }
}

function openCartModal() {
  renderCartModal();
  document.getElementById('cartModal')?.classList.add('active');
  if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred('light');
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
  updateBalanceDisplays();
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

// Надійне UTF-8 Base64 кодування
function utf8ToBase64(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
    return String.fromCharCode(parseInt(p1, 16));
  }));
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
  const useBalance = document.getElementById('useBalanceCheckbox')?.checked || false;

  if (useBalance && userBalance < total) {
    if (tg?.showAlert) tg.showAlert(`Недостатньо коштів на балансі! Ваш баланс: ${userBalance} гривны, а сума замовлення: ${total} гривны.`);
    else alert(`Недостатньо коштів на балансі! Поповніть баланс через менеджера.`);
    return;
  }

  const itemsText = cart.map(i => `• ${i.name} (${i.count} шт.) — ${i.price * i.count} гривны`).join('\n');
  closeCartModal();

  const receiptNumEl = document.getElementById('receiptNumber');
  const receiptSumEl = document.getElementById('receiptSummary');
  if (receiptNumEl) receiptNumEl.innerText = checkId;

  const paymentText = useBalance ? "🟢 Оплата: Списання з балансу профілю" : "🟡 Оплата: Переказ на картку менеджеру";
  if (receiptSumEl) receiptSumEl.innerText = `${itemsText}\n\nРазом: ${total} гривны\n${paymentText}`;
  
  const orderData = {
    id: checkId,
    items: cart.map(i => ({ id: i.id, name: i.name, count: i.count, price: i.price })),
    total: total,
    use_balance: useBalance
  };
  
  const encodedPayload = utf8ToBase64(JSON.stringify(orderData));
  const botLink = `https://t.me/gravityshopbot?start=order_${encodedPayload}`;
  const msgForManager = `Привіт! Мій чек в Gravity Shop:\n🧾 Чек: ${checkId}\n\nТовари:\n${itemsText}\n\n💳 Разом: ${total} гривны\n${paymentText}\n\n(Посилання для реєстрації чека: ${botLink})`;

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

  try {
    tg?.sendData(JSON.stringify(orderData));
  } catch (e) {
    console.error("Помилка відправки tg.sendData:", e);
  }

  if (useBalance) {
    userBalance -= total;
    updateBalanceDisplays();
  }

  ordersHistory += 1;
  localStorage.setItem('gravity_orders_count', ordersHistory.toString());
  const ordersCountEl = document.getElementById('userOrdersCount');
  if (ordersCountEl) ordersCountEl.innerText = ordersHistory;
  
  cart = [];
  updateCartState();
}

function copyCheckId() {
  const checkId = document.getElementById('receiptNumber')?.innerText;
  if (checkId) {
    navigator.clipboard?.writeText(checkId);
    showToast(`📋 Номер ${checkId} скопійовано!`);
    if (tg?.HapticFeedback) tg.HapticFeedback.notificationOccurred('success');
  }
}

// Промокоди
function openPromoModal() {
  document.getElementById('promoModal')?.classList.add('active');
  if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred('light');
}

function closePromoModal() {
  document.getElementById('promoModal')?.classList.remove('active');
}

function submitPromoCode() {
  const code = document.getElementById('promoInput')?.value.trim().toUpperCase();
  if (!code) {
    showToast("⚠️ Введіть промокод!");
    return;
  }

  closePromoModal();
  if (tg?.sendData) {
    tg.sendData(JSON.stringify({ action: "activate_promo", code: code }));
  } else {
    window.location.href = `https://t.me/gravityshopbot?start=promo_${code}`;
  }
}

function topUpBalance() {
  const url = `https://t.me/Fambod?text=${encodeURIComponent("Привіт! Хочу поповнити баланс у Gravity Shop на суму:")}`;
  if (tg) tg.openTelegramLink(url);
  else window.open(url, '_blank');
}

// Навігація між вкладками
function switchTab(tab) {
  const catalog = document.getElementById('catalogView');
  const profile = document.getElementById('profileView');
  const menuBtn = document.getElementById('navMenuBtn');
  const profBtn = document.getElementById('navProfileBtn');

  if (tg?.HapticFeedback) tg.HapticFeedback.selectionChanged();

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
  updateBalanceDisplays();
  const ordersCountEl = document.getElementById('userOrdersCount');
  if (ordersCountEl) ordersCountEl.innerText = ordersHistory;

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
updateBalanceDisplays();
loadProfileData();
