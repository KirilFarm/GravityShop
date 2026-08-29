const tg = window.Telegram?.WebApp;

// Курсы валют и знаки
const currencyRates = {
    RUB: { symbol: '₽', rate: 1 },
    UAH: { symbol: '₴', rate: 0.44 },
    USD: { symbol: '$', rate: 0.011 },
    EUR: { symbol: '€', rate: 0.010 }
};

let currentCurrency = 'RUB';
let currentLanguage = 'ru';
let userBalanceRub = 0.00;

// Локализация всех текстов интерфейса
const translations = {
    ru: {
        write_manager: 'Написать менеджеру',
        promo_badge: 'Акция',
        hit_badge: 'Хит',
        slide1_desc: 'Дешевле, чем в приложении',
        slide2_desc: 'Моментальная доставка на аккаунт',
        check_btn: 'Проверить',
        buy_nitro_btn: 'Купить Nitro',
        tick_games: 'ИГРЫ И ЦИФРОВЫЕ ТОВАРЫ',
        tick_guarantee: 'ГАРАНТИЯ И ПОДДЕРЖКА КЛИЕНТОВ',
        tick_fast: 'БЫСТРАЯ ДОСТАВКА',
        home_title: 'Главная',
        cat_all: 'Все',
        useful_links: 'Полезные ссылки',
        f_delivery: 'Доставка',
        f_payment: 'Оплата',
        f_contacts: 'Контакты',
        f_reviews: 'Отзывы',
        f_refund: 'Возврат',
        f_guarantee: 'Гарантия',
        f_terms: 'Оферта',
        our_socials: 'Наши соцсети',
        levels_title: 'Уровни',
        levels_sub: 'Больше оборот — ниже цена',
        levels_desc: 'Программа лояльности для покупателей и реселлеров: больше оборот — ниже цена. Уровень даёт постоянный бонус к пополнению баланса.',
        current_level: 'ТЕКУЩИЙ УРОВЕНЬ',
        no_level_yet: 'Уровня пока нет',
        turnover_60d: 'Оборот за последние 60 дней',
        lvl1: 'Уровень 1', lvl1_from: 'от 10,000 ₽',
        lvl2: 'Уровень 2', lvl2_from: 'от 20,000 ₽',
        lvl3: 'Уровень 3', lvl3_from: 'от 30,000 ₽',
        my_balance_title: 'Мой Баланс',
        card_flip_hint: 'Нажмите на карту, чтобы перевернуть',
        avail_balance: 'ДОСТУПНЫЙ БАЛАНС',
        deposit_btn: 'Пополнить',
        transfer_btn: 'Перевод',
        history_title: 'История операций',
        no_tx_yet: 'Транзакций пока нет',
        custom_title: 'Кастомизация',
        custom_sub: 'Как выглядят бустеры на твоём сервере',
        c_opt1_title: 'Кастомизировать профили бустеров',
        c_opt1_desc: 'Персональный аватар, баннер и ник. Доплата +10% к каждому заказу',
        c_opt2_title: 'Спрашивать при покупке',
        c_opt2_desc: 'Спросим при покупке. При согласии доплата +10% к заказу',
        c_opt3_title: 'Оставить рекламу сервиса',
        c_opt3_desc: 'Без доплаты. Бустеры показывают рекламу сервиса',
        profile_title: 'Профиль',
        p_balance_label: 'БАЛАНС',
        lang_label: 'Язык',
        bank_card_item: 'Банковская карта',
        bank_card_desc: 'Управление счетом и пополнение',
        logout: 'Выйти',
        nav_shop: 'Магазин',
        nav_levels: 'Уровни',
        nav_balance: 'Баланс',
        nav_custom: 'Кастом',
        nav_profile: 'Профиль',
        add_to_cart: 'В корзину'
    },
    en: {
        write_manager: 'Contact Manager',
        promo_badge: 'Promo',
        hit_badge: 'Hit',
        slide1_desc: 'Cheaper than in-app',
        slide2_desc: 'Instant delivery to account',
        check_btn: 'Check now',
        buy_nitro_btn: 'Buy Nitro',
        tick_games: 'GAMES & DIGITAL GOODS',
        tick_guarantee: 'WARRANTY & CLIENT SUPPORT',
        tick_fast: 'FAST DELIVERY',
        home_title: 'Main',
        cat_all: 'All',
        useful_links: 'Useful Links',
        f_delivery: 'Delivery',
        f_payment: 'Payment',
        f_contacts: 'Contacts',
        f_reviews: 'Reviews',
        f_refund: 'Refund',
        f_guarantee: 'Guarantee',
        f_terms: 'Terms',
        our_socials: 'Our Socials',
        levels_title: 'Levels',
        levels_sub: 'Higher turnover — lower price',
        levels_desc: 'Loyalty program for customers and resellers: level gives a permanent bonus to top-ups.',
        current_level: 'CURRENT LEVEL',
        no_level_yet: 'No level yet',
        turnover_60d: 'Turnover in last 60 days',
        lvl1: 'Level 1', lvl1_from: 'from 10,000 ₽',
        lvl2: 'Level 2', lvl2_from: 'from 20,000 ₽',
        lvl3: 'Level 3', lvl3_from: 'from 30,000 ₽',
        my_balance_title: 'My Balance',
        card_flip_hint: 'Tap card to flip',
        avail_balance: 'AVAILABLE BALANCE',
        deposit_btn: 'Top Up',
        transfer_btn: 'Transfer',
        history_title: 'Transaction History',
        no_tx_yet: 'No transactions yet',
        custom_title: 'Customization',
        custom_sub: 'How boosters look on your server',
        c_opt1_title: 'Customize booster profiles',
        c_opt1_desc: 'Personal avatar, banner and nickname. +10% extra per order',
        c_opt2_title: 'Ask on purchase',
        c_opt2_desc: 'We will ask upon purchase. If agreed +10% extra',
        c_opt3_title: 'Leave service ads',
        c_opt3_desc: 'No extra fee. Boosters show service branding',
        profile_title: 'Profile',
        p_balance_label: 'BALANCE',
        lang_label: 'Language',
        bank_card_item: 'Bank Card',
        bank_card_desc: 'Account balance and management',
        logout: 'Log Out',
        nav_shop: 'Shop',
        nav_levels: 'Levels',
        nav_balance: 'Balance',
        nav_custom: 'Custom',
        nav_profile: 'Profile',
        add_to_cart: 'Add to Cart'
    }
};

const products = [
    {
        id: 1,
        category: 'telegram',
        title: '50 Telegram Stars',
        categoryName: 'Telegram Stars',
        priceRub: 120,
        badge1: '🔥 Хит',
        badge2: '⚡ Быстро',
        image: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=300&auto=format&fit=crop&q=60'
    },
    {
        id: 2,
        category: 'telegram',
        title: '100 Telegram Stars',
        categoryName: 'Telegram Stars',
        priceRub: 230,
        badge1: '🔥 Хит',
        badge2: '✨ Топ',
        image: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=300&auto=format&fit=crop&q=60'
    },
    {
        id: 3,
        category: 'discord',
        title: 'Discord Nitro Full 1 Месяц',
        categoryName: 'Discord Nitro',
        priceRub: 650,
        badge1: '🔥 Хит',
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

// Инициализация WebApp
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
            cardNum.innerText = `001 ${p1} 4841 ${p2}`;
        }
    }
}

// Переключение языка
function setLanguage(lang) {
    currentLanguage = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    
    const activeBtn = document.getElementById(`btn-lang-${lang}`);
    if (activeBtn) activeBtn.classList.add('active');

    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });

    renderProducts('all');
    updateBalanceDisplays();
}

// Переворот 3D карты
function flipCard(container) {
    const card = container.querySelector('#bankCard');
    if (card) {
        card.classList.toggle('flipped');
        if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred('light');
    }
}

// Открытие чата с @Fambod
function openManager() {
    const link = 'https://t.me/Fambod';
    if (window.Telegram?.WebApp?.openTelegramLink) {
        window.Telegram.WebApp.openTelegramLink(link);
    } else {
        window.open(link, '_blank');
    }
}

// Селектор валют
function toggleCurrencyMenu() {
    const dropdown = document.getElementById('curr-dropdown');
    if (dropdown) dropdown.classList.toggle('show');
}

function selectCurrency(code, flag, text) {
    currentCurrency = code;
    const flagEl = document.getElementById('curr-flag');
    const codeEl = document.getElementById('curr-code');
    const dropdown = document.getElementById('curr-dropdown');

    if (flagEl) flagEl.innerText = flag;
    if (codeEl) codeEl.innerText = text;
    if (dropdown) dropdown.classList.remove('show');
    
    renderProducts('all');
    updateBalanceDisplays();
}

// Закрывать выпадающий список валют при клике вне его
document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-currency-select')) {
        const dropdown = document.getElementById('curr-dropdown');
        if (dropdown) dropdown.classList.remove('show');
    }
});

// Выбор опции кастомизации
function selectCustomCard(label) {
    document.querySelectorAll('.custom-opt-item').forEach(item => {
        item.classList.remove('active');
        const radio = item.querySelector('input[type="radio"]');
        if (radio) radio.checked = false;
    });

    label.classList.add('active');
    const input = label.querySelector('input[type="radio"]');
    if (input) input.checked = true;

    if (tg?.HapticFeedback) tg.HapticFeedback.selectionChanged();
}

// Обновление баланса
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

// Рендер каталога товаров
function renderProducts(cat = 'all') {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const filtered = cat === 'all' ? products : products.filter(p => p.category === cat);
    filtered.forEach(p => {
        const convertedPrice = (p.priceRub * currencyRates[currentCurrency].rate).toFixed(2);
        const symbol = currencyRates[currentCurrency].symbol;
        const btnText = translations[currentLanguage].add_to_cart;

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
                <button class="add-to-cart-btn" onclick="addToCart(${p.id})">${btnText}</button>
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
        if (title) title.innerText = translations[currentLanguage].home_title;
    } else {
        if (backBtn) backBtn.classList.remove('hidden');
        const names = { standoff: 'Standoff 2', warthunder: 'War Thunder', steam: 'Steam', telegram: 'Telegram', discord: 'Discord' };
        if (title) title.innerText = names[cat] || 'Каталог';
    }
    renderProducts(cat);
}

function addToCart(id) {
    const item = products.find(p => p.id === id);
    if (!item) return;
    if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred('medium');
    if (tg?.showAlert) tg.showAlert(`Товар "${item.title}" добавлен в корзину!`);
    else alert(`Товар "${item.title}" добавлен в корзину!`);
}

// Слайдер
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
function setSlide(idx) { showSlide(idx); }
setInterval(() => { showSlide(slideIndex + 1); }, 4500);

// Переключение табов
function switchTab(tabId, el) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));

    const targetTab = document.getElementById(tabId);
    if (targetTab) targetTab.classList.add('active');

    if (el) el.classList.add('active');
    else {
        const navButtons = document.querySelectorAll('.nav-item');
        const map = { 'tab-home': 0, 'tab-levels': 1, 'tab-balance': 2, 'tab-custom': 3, 'tab-profile': 4 };
        if (map[tabId] !== undefined && navButtons[map[tabId]]) navButtons[map[tabId]].classList.add('active');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleApi() {
    const input = document.getElementById('api-key');
    if (input) input.type = input.type === 'password' ? 'text' : 'password';
}

function copyApi() {
    const input = document.getElementById('api-key');
    if (!input) return;
    navigator.clipboard.writeText(input.value);
    if (tg?.showAlert) tg.showAlert('API ключ скопирован!');
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts('all');
    updateBalanceDisplays();
});
