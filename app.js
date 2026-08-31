// Ініціалізація Telegram WebApp
const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
  if (tg.enableClosingConfirmation) tg.enableClosingConfirmation();
}

function hideLoader() {
  const loader = document.getElementById('loader');
  if (loader && !loader.classList.contains('hidden')) {
    loader.classList.add('hidden');
    setTimeout(() => { loader.style.display = 'none'; }, 450);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(hideLoader, 800);
});

function showToast(text) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.innerText = text;
  toast.classList.add('show');
  setTimeout(() => { toast.classList.remove('show'); }, 2300);
}

// Конфігурація API
const API_BASE_URL = "https://gravityshopbot.onrender.com";

const urlParams = new URLSearchParams(window.location.search);
let currentUserId = tg?.initDataUnsafe?.user?.id || parseInt(urlParams.get('uid') || localStorage.getItem('gravity_user_id') || '5188484100', 10);
localStorage.setItem('gravity_user_id', currentUserId.toString());

let urlBalParam = urlParams.get('bal');
let userBalance = 0;
if (urlBalParam !== null && !isNaN(parseInt(urlBalParam, 10))) {
  userBalance = parseInt(urlBalParam, 10);
} else {
  userBalance = parseInt(localStorage.getItem('gravity_balance') || '0', 10);
}
if (isNaN(userBalance)) userBalance = 0;

let ordersHistory = parseInt(localStorage.getItem('gravity_orders_count') || '0', 10);

let isCardFocused = false;
let userCardFullNumber = "4412 0000 0000 0000";
let userCardMaskedNumber = "4412 **** **** 0000";

let transactions = [];
const txParam = urlParams.get('tx');
if (txParam) {
  try {
    transactions = JSON.parse(decodeURIComponent(txParam));
    localStorage.setItem('gravity_transactions', JSON.stringify(transactions));
  } catch (e) {
    transactions = JSON.parse(localStorage.getItem('gravity_transactions') || '[]');
  }
} else {
  transactions = JSON.parse(localStorage.getItem('gravity_transactions') || '[]');
}

function updateBalanceDisplays() {
  const cardBal = document.getElementById('cardBalanceVal');
  const cartBal = document.getElementById('cartUserBalance');
  if (cardBal) cardBal.innerText = userBalance;
  if (cartBal) cartBal.innerText = userBalance;
  localStorage.setItem('gravity_balance', userBalance.toString());
}

// Автоматична синхронізація з ботом у реальному часі
async function syncWithServer() {
  if (!currentUserId) return;
  try {
    const res = await fetch(`${API_BASE_URL}/api/user?uid=${currentUserId}`);
    if (res.ok) {
      const data = await res.json();
      if (typeof data.balance === 'number') {
        userBalance = data.balance;
        updateBalanceDisplays();
      }
      if (Array.isArray(data.transactions)) {
        transactions = data.transactions;
        localStorage.setItem('gravity_transactions', JSON.stringify(transactions));
        renderTransactions();
      }
    }
  } catch (e) {}
}

setInterval(syncWithServer, 3000);

function addTransaction(title, amount, isNegative = true) {
  const now = new Date();
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  const dateStr = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1).toString().padStart(2, '0')}`;
  
  transactions.unshift({
    id: Date.now(),
    title: title,
    amount: amount,
    isNegative: isNegative,
    time: `${dateStr} о ${timeStr}`
  });

  if (transactions.length > 25) transactions.pop();
  localStorage.setItem('gravity_transactions', JSON.stringify(transactions));
  renderTransactions();
}

function renderTransactions() {
  const list = document.getElementById('transactionsList');
  if (!list) return;

  if (transactions.length === 0) {
    list.innerHTML = '<div class="empty-trans-msg">Транзакцій по картці ще не було 💳</div>';
    return;
  }

  list.innerHTML = transactions.map(t => `
    <div class="trans-item">
      <div class="trans-item-left">
        <div class="trans-icon ${t.isNegative ? 'expense' : 'income'}">
          ${t.isNegative ? '🛍️' : '💳'}
        </div>
        <div class="trans-details">
          <span class="trans-title">${t.title}</span>
          <span class="trans-time">${t.time}</span>
        </div>
      </div>
      <span class="trans-amount ${t.isNegative ? 'expense' : 'income'}">
        ${t.isNegative ? '-' : '+'}${t.amount} гривны
      </span>
    </div>
  `).join('');
}

function generateCardNumber(userId) {
  const idStr = String(userId || '5188484100').padStart(10, '0');
  const part1 = "4412";
  const part2 = idStr.slice(0, 4);
  const part3 = idStr.slice(4, 8);
  const part4 = (idStr.slice(8) + "77").slice(0, 4);
  return `${part1} ${part2} ${part3} ${part4}`;
}

function toggleCardFocus() {
  const card = document.getElementById('monoBankCard');
  const numEl = document.getElementById('monoCardNumber');
  const hintEl = document.getElementById('cardTapHint');

  isCardFocused = !isCardFocused;

  if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred('medium');

  if (isCardFocused) {
    card?.classList.remove('is-tilted');
    card?.classList.add('is-focused');
    if (numEl) numEl.innerText = userCardFullNumber;
    if (hintEl) hintEl.innerHTML = '<span>✨ Картка активна. Натисніть знову, щоб покласти в 3D</span>';
  } else {
    card?.classList.remove('is-focused');
    card?.classList.add('is-tilted');
    if (numEl) numEl.innerText = userCardMaskedNumber;
    if (hintEl) hintEl.innerHTML = '<span>👆 Натисніть на картку, щоб переглянути номер та баланс</span>';
  }
}

// Live Feed
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

const categories = [
  { id: 'all', name: 'Все', icon: '⚡', img: '' },
  { id: 'tiktok', name: 'TikTok', icon: '📱', img: '' },
  { id: 'stars', name: 'Stars', icon: '⭐', img: '' },
  { id: 'discord', name: 'Discord', icon: '🟣', img: '' },
  { id: 'steam', name: 'Steam', icon: '🎮', img: '' },
  { id: 'standoff', name: 'Standoff', icon: '🔫', img: '' },
  { id: 'spotify', name: 'Spotify', icon: '🎵', img: '' }
];

const products = [
  { id: 101, cat: 'tiktok', name: 'Накрутка підписників TikTok', price: 90, badge: '🔥 Хіт продажів', badgeType: 'badge-fire', sub: '1000 якісних фоловерів', icon: '👥', img: '' },
  { id: 102, cat: 'tiktok', name: 'Накрутка переглядів TikTok', price: 35, badge: '⚡ Швидка доставка', badgeType: 'badge-fast', sub: '10 000 переглядів у рек', icon: '👀', img: '' },
  { id: 103, cat: 'tiktok', name: 'Накрутка коментарів TikTok', price: 60, badge: '💬 Активність', badgeType: 'badge-deal', sub: '50 позитивних коментарів', icon: '💬', img: '' },
  { id: 104, cat: 'tiktok', name: 'Накрутка репостів TikTok', price: 45, badge: '🚀 ТОП алгоритми', badgeType: 'badge-fast', sub: '500 репостів/поділів', icon: '🔁', img: '' },
  { id: 1, cat: 'stars', name: '50 Telegram Stars', price: 50, badge: '🔥 Топ', badgeType: 'badge-fire', sub: 'Офіційні зірки Telegram', icon: '⭐', img: '' },
  { id: 2, cat: 'stars', name: '100 Telegram Stars', price: 85, badge: '⚡ Миттєво', badgeType: 'badge-fast', sub: 'Офіційні зірки Telegram', icon: '⭐', img: '' },
  { id: 3, cat: 'discord', name: 'Discord Nitro 1 Місяць', price: 300, badge: '🔥 Хіт', badgeType: 'badge-fire', sub: 'Full Nitro з 2 бустами', icon: '🟣', img: '' },
  { id: 4, cat: 'discord', name: 'Discord Nitro 3 Місяці', price: 1150, badge: '💎 Вигідно', badgeType: 'badge-deal', sub: 'Full Nitro гарантія', icon: '💎', img: '' },
  { id: 5, cat: 'steam', name: 'Поповнення Steam (200 грн)', price: 250, badge: '⚡ Авто-видача', badgeType: 'badge-fast', sub: 'Баланс гаманця Steam', icon: '🎮', img: '' },
  { id: 6, cat: 'standoff', name: '100 Gold Standoff 2', price: 40, badge: '🔥 Топ ціна', badgeType: 'badge-fire', sub: 'Голда по ринку з комісією', icon: '🔫', img: '' },
  { id: 7, cat: 'spotify', name: 'Spotify Premium 1 Міс', price: 120, badge: '🎵 Без реклами', badgeType: 'badge-deal', sub: 'Індивідуальна підписка', icon: '🎵', img: '' }
];

let cart = [];
let currentCategory = 'all';

function renderCategories() {
  const bar = document.getElementById('categoriesBar');
  if (!bar) return;

  bar.innerHTML = categories.map(c => {
    const iconContent = c.img ? `<img src="${c.img}" class="cat-custom-img" alt="${c.name}">` : `<span>${c.icon}</span>`;
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
            <span class="card-price">${item.price} <small>гривны</small></span>
            <button class="btn-card" onclick="addToCart(${item.id})">+ Купити</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function addToCart(id) {
  const item = products.find(p => p.id === id);
  if (!item) return;

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
  updateBalanceDisplays();
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

function utf8ToBase64(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (m, p1) => String.fromCharCode(parseInt(p1, 16))));
}

async function checkoutOrder() {
  if (cart.length === 0) {
    if (tg?.showAlert) tg.showAlert("Додайте хоча б один товар до кошика!");
    else alert("Додайте хоча б один товар до кошика!");
    return;
  }

  const checkId = generateCheckId();
  const total = Number(cart.reduce((sum, i) => sum + (i.price * i.count), 0));
  const useBalance = Boolean(document.getElementById('useBalanceCheckbox')?.checked);
  const currentNumericBalance = Number(userBalance) || 0;

  if (useBalance && currentNumericBalance < total) {
    if (tg?.showAlert) tg.showAlert(`Недостатньо коштів на картці! Ваш баланс: ${currentNumericBalance} гривны, а сума: ${total} гривны.`);
    else alert(`Недостатньо коштів на картці! Поповніть її через менеджера.`);
    return;
  }

  if (useBalance) {
    userBalance = currentNumericBalance - total;
    updateBalanceDisplays();
    addTransaction(`Оплата замовлення ${checkId}`, total, true);
    
    // Відправляємо списання у фоновому режимі
    fetch(`${API_BASE_URL}/api/pay`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: currentUserId, amount: total, check_id: checkId })
    }).catch(() => {});
  }

  const itemsText = cart.map(i => `• ${i.name} (${i.count} шт.) — ${i.price * i.count} гривны`).join('\n');

  const receiptNumEl = document.getElementById('receiptNumber');
  const receiptSumEl = document.getElementById('receiptSummary');
  if (receiptNumEl) receiptNumEl.innerText = checkId;

  const paymentText = useBalance ? `🟢 Оплата: Списання з картки Gravity (${userCardFullNumber})` : "🟡 Оплата: Переказ на картку менеджеру";
  if (receiptSumEl) receiptSumEl.innerText = `${itemsText}\n\nРазом: ${total} гривны\n${paymentText}`;
  
  const orderData = {
    id: checkId,
    user_id: currentUserId,
    items: cart.map(i => ({ id: i.id, name: i.name, count: i.count, price: i.price })),
    total: total,
    use_balance: useBalance
  };
  
  const encodedPayload = utf8ToBase64(JSON.stringify(orderData));
  const botLink = `https://t.me/gravityshopbot?start=order_${encodedPayload}`;
  const msgForManager = `Привіт! Мій чек в Gravity Shop:\n🧾 Чек: ${checkId}\n\nТовари:\n${itemsText}\n\n💳 Разом: ${total} гривны\n${paymentText}\n\n(Посилання: ${botLink})`;

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
  } catch (e) {}

  ordersHistory += 1;
  localStorage.setItem('gravity_orders_count', ordersHistory.toString());
  const ordersCountEl = document.getElementById('userOrdersCount');
  if (ordersCountEl) ordersCountEl.innerText = ordersHistory;
  
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

function copyCardNumber() {
  if (userCardFullNumber) {
    navigator.clipboard?.writeText(userCardFullNumber);
    showToast(`💳 Номер картки ${userCardFullNumber} скопійовано!`);
    if (tg?.HapticFeedback) tg.HapticFeedback.notificationOccurred('success');
  }
}

function topUpBalance() {
  const msg = `Привіт! Хочу поповнити картку Gravity Black.\n💳 Номер картки: ${userCardFullNumber}\n👤 ID: ${currentUserId}\nСума:`;
  const url = `https://t.me/Fambod?text=${encodeURIComponent(msg)}`;
  if (tg) tg.openTelegramLink(url);
  else window.open(url, '_blank');
}

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

function switchTab(tab) {
  const views = {
    catalog: document.getElementById('viewCatalog'),
    card: document.getElementById('viewCard'),
    cart: document.getElementById('viewCart'),
    profile: document.getElementById('viewProfile')
  };

  const tabs = {
    catalog: document.getElementById('tabCatalog'),
    card: document.getElementById('tabCard'),
    cart: document.getElementById('tabCart'),
    profile: document.getElementById('tabProfile')
  };

  Object.values(views).forEach(v => { if (v) v.style.display = 'none'; });
  Object.values(tabs).forEach(t => t?.classList.remove('active'));

  if (views[tab]) views[tab].style.display = 'block';
  if (tabs[tab]) tabs[tab].classList.add('active');

  if (tg?.HapticFeedback) tg.HapticFeedback.selectionChanged();

  if (tab === 'card') {
    syncWithServer();
    renderTransactions();
  }
  if (tab === 'cart') renderCartScreen();
  if (tab === 'profile') loadProfileData();
}

function loadProfileData() {
  updateBalanceDisplays();
  const ordersCountEl = document.getElementById('userOrdersCount');
  if (ordersCountEl) ordersCountEl.innerText = ordersHistory;

  userCardFullNumber = generateCardNumber(currentUserId);
  const parts = userCardFullNumber.split(' ');
  userCardMaskedNumber = `${parts[0]} **** **** ${parts[3] || '0000'}`;

  const cardNumEl = document.getElementById('monoCardNumber');
  if (cardNumEl) {
    cardNumEl.innerText = isCardFocused ? userCardFullNumber : userCardMaskedNumber;
  }

  const u = tg?.initDataUnsafe?.user;
  const fullName = `${u?.first_name || ''} ${u?.last_name || ''}`.trim() || 'GRAVITY CLIENT';
  const cardHolderEl = document.getElementById('cardHolderName');
  if (cardHolderEl) cardHolderEl.innerText = fullName.toUpperCase();

  const nameEl = document.getElementById('userName');
  const userEl = document.getElementById('userUsername');
  const idEl = document.getElementById('userId');
  const avatarEl = document.getElementById('userAvatar');

  if (nameEl) nameEl.innerText = fullName || 'Користувач';
  if (userEl) userEl.innerText = u?.username ? `@${u.username}` : 'Без юзернейму';
  if (idEl) idEl.innerText = currentUserId;
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
renderTransactions();
syncWithServer();
