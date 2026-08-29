const tg = window.Telegram?.WebApp;

// Курсы валют относительно RUB
const currencyRates = {
    RUB: { symbol: '₽', rate: 1 },
    UAH: { symbol: 'гривны', rate: 0.44 },
    USD: { symbol: '$', rate: 0.011 },
    EUR: { symbol: '€', rate: 0.010 }
};

let currentCurrency = 'RUB';
let userBalanceRub = 0.00; // Баланс пользователя в рублях

// Каталог товаров
const products = [
    {
        id: 1,
        category: 'telegram',
        title: '50 Telegram Stars',
        categoryName: 'Telegram Stars',
        priceRub: 120,
        badge1: '🔥 Хит продаж',
        badge2: '⚡ Быстро',
        image: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=300&auto=format&fit=crop&q=60'
    },
    {
        id: 2,
        category: 'telegram',
        title: '100 Telegram Stars',
        categoryName: 'Telegram Stars',
        priceRub: 230,
        badge1: '🔥 Хит продаж',
        badge2: '✨ Берут чаще',
        image: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=300&auto=format&fit=crop&q=60'
    },
    {
        id: 3,
        category: 'discord',
        title: 'Discord Nitro Full 1 Месяц',
        categoryName: 'Discord Nitro',
        priceRub: 650,
        badge1: '🔥 Хит продаж',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=60'
    },
    {
        id: 4,
        category: 'discord',
        title: 'Discord Nitro Full 3 Месяца',
        categoryName: 'Discord Nitro',
        priceRub: 1800,
        badge1: '🔥 Топ',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=60'
    },
    {
        id: 5,
        category: 'standoff',
        title: '100G Gold Standoff 2',
        categoryName: 'Игровая валюта',
        priceRub: 150,
        badge1: '⚡ Моментально',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&auto=format&fit=crop&q=60'
    },
    {
        id: 6,
        category: 'warthunder',
        title: '1000 Золотых Орлов',
        categoryName: 'War Thunder Gold',
        priceRub: 420,
        badge1: '🔥 Популярно',
        image: 'https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?w=300&auto=format&fit=crop&q=60'
    },
    {
        id: 7,
        category: 'steam',
        title: 'Пополнение Steam 500 ₽',
        categoryName: 'Пополнение баланса',
        priceRub: 550,
        badge1: '🔥 Хит',
        image: 'https://images.unsplash.com/photo-1612287233207-6b45d0458428?w=300&auto=format&fit=crop&q=60'
    }
];

// Инициализация Telegram WebApp
if (tg) {
    tg.expand();
    tg.ready();
    
    const user = tg.initDataUnsafe?.user;
    if (user) {
        const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Пользователь';
        
        const profileName = document.getElementById('profile-name');
        const profileUser = document.getElementById('profile-username');
        const profileId = document.getElementById('profile-id');
        const profileAvatar = document.getElementById('profile-avatar');
        const cardHolder = document.getElementById('card-holder-name');
        const cardNum = document.getElementById('card-virtual-number');

        if (profileName) profileName.innerText = fullName;
        if (profileUser) profileUser.innerText = user.username ? `@${user.username}` : '';
        if (profileId) profileId.innerText = `ID: ${user.id}`;
        if (profileAvatar && user.photo_url) profileAvatar.src = user.photo_url;
        
        if (cardHolder) cardHolder.innerText = (user.first_name || 'USER').toUpperCase();
        if (cardNum && user.id) {
            const uidStr = String(user.id);
            const p1 = uidStr.slice(0, 4) || '5188';
            const p2 = uidStr.slice(-4) || '9101';
            cardNum.innerText = `001 ${p1} •••• ${p2}`;
        }
    }
}

// 3D переворот банковской карты
function flipCard(container) {
    const cardInner = container.querySelector('#bankCard');
    if (cardInner) {
        cardInner.classList.toggle('flipped');
        if (tg?.HapticFeedback) {
            tg.HapticFeedback.impactOccurred('light');
        }
    }
}

// Обновление отображения баланса на карте, в профиле и уровнях
function updateBalanceDisplays() {
    const converted = (userBalanceRub * currencyRates[currentCurrency].rate).toFixed(2);
    const symbol = currencyRates[currentCurrency].symbol;
    const formatted = `${converted} ${symbol}`;

    const cardBal = document.getElementById('virtual-card-balance');
    const profBal = document.getElementById('profile-balance');
    const turnoverVal = document.getElementById('level-turnover-val');

    if (cardBal) cardBal.innerText = formatted;
    if (profBal) profBal.innerText = formatted;
    if (turnoverVal) turnoverVal.innerText = formatted;
}

// Отрисовка каталога товаров
function renderProducts(cat = 'all') {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    const filtered = cat === 'all' ? products : products.filter(p => p.category === cat);

    filtered.forEach(p => {
        const convertedPrice = (p.priceRub * currencyRates[currentCurrency].rate).toFixed(2);
        const symbol = currencyRates[currentCurrency].symbol;

        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-banner">
                <img src="${p.image}" alt="${p.title}">
                <div class="product-badges">
                    ${p.badge1 ? `<span class="badge-tag hot">${p.badge1}</span>` : ''}
                    ${p.badge2 ? `<span class="badge-tag fast">${p.badge2}</span>` : ''}
                </div>
            </div>
            <div class="product-info">
                <div class="product-price">${convertedPrice} ${symbol}</div>
                <div class="product-title">${p.title}</div>
                <div class="product-category-name">${p.categoryName}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${p.id})">В корзину</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Фильтрация категорий
function filterCategory(cat, el) {
    if (el) {
        document.querySelectorAll('.cat-item').forEach(i => i.classList.remove('active'));
        el.classList.add('active');
    }

    const backBtn = document.getElementById('back-all-btn');
    const title = document.getElementById('catalog-title');

    if (cat === 'all') {
        if (backBtn) backBtn.classList.add('hidden');
        if (title) title.innerText = 'Главная';
    } else {
        if (backBtn) backBtn.classList.remove('hidden');
        const names = {
            standoff: 'Standoff 2',
            warthunder: 'War Thunder',
            steam: 'Steam',
            telegram: 'Telegram',
            discord: 'Discord'
        };
        if (title) title.innerText = names[cat] || 'Каталог';
    }

    renderProducts(cat);
}

// Смена валюты с пересчетом цен
function changeCurrency(val) {
    currentCurrency = val;
    const catTitle = document.getElementById('catalog-title')?.innerText || 'Главная';
    const revMap = {
        'Главная': 'all',
        'Standoff 2': 'standoff',
        'War Thunder': 'warthunder',
        'Steam': 'steam',
        'Telegram': 'telegram',
        'Discord': 'discord'
    };
    renderProducts(revMap[catTitle] || 'all');
    updateBalanceDisplays();
}

// Добавление в корзину
function addToCart(id) {
    const item = products.find(p => p.id === id);
    if (!item) return;

    if (tg?.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('medium');
    }

    if (tg?.showAlert) {
        tg.showAlert(`Товар "${item.title}" добавлен в корзину!`);
    } else {
        alert(`Товар "${item.title}" добавлен в корзину!`);
    }
}

// Открытие чата с поддержкой / менеджером @Fambod
function openManager() {
    const managerUrl = 'https://t.me/Fambod';
    if (tg?.openTelegramLink) {
        tg.openTelegramLink(managerUrl);
    } else {
        window.open(managerUrl, '_blank');
    }
}

// Окно пополнения баланса
function openDepositModal() {
    openManager();
}

// Переключение слайдера баннеров
let slideIndex = 0;
function showSlide(idx) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    if (!slides.length) return;

    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    slideIndex = idx >= slides.length ? 0 : (idx < 0 ? slides.length - 1 : idx);
    slides[slideIndex].classList.add('active');
    if (dots[slideIndex]) dots[slideIndex].classList.add('active');
}

function setSlide(idx) {
    showSlide(idx);
}

setInterval(() => {
    showSlide(slideIndex + 1);
}, 4500);

// Переключение вкладок нижнего меню
function switchTab(tabId, el) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));

    const targetTab = document.getElementById(tabId);
    if (targetTab) targetTab.classList.add('active');

    if (el) {
        el.classList.add('active');
    } else {
        const navButtons = document.querySelectorAll('.nav-item');
        const map = {
            'tab-home': 0,
            'tab-levels': 1,
            'tab-balance': 2,
            'tab-custom': 3,
            'tab-profile': 4
        };
        if (map[tabId] !== undefined && navButtons[map[tabId]]) {
            navButtons[map[tabId]].classList.add('active');
        }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Работа с API-ключом в профиле
function toggleApi() {
    const input = document.getElementById('api-key');
    if (input) {
        input.type = input.type === 'password' ? 'text' : 'password';
    }
}

function copyApi() {
    const input = document.getElementById('api-key');
    if (!input) return;

    navigator.clipboard.writeText(input.value);
    
    if (tg?.HapticFeedback) {
        tg.HapticFeedback.notificationOccurred('success');
    }

    if (tg?.showAlert) {
        tg.showAlert('API ключ скопирован!');
    } else {
        alert('API ключ скопирован!');
    }
}

// Первоначальный запуск
document.addEventListener('DOMContentLoaded', () => {
    renderProducts('all');
    updateBalanceDisplays();
});
