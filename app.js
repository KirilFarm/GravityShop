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

// Налаштування мови та валюти
let currentLang = localStorage.getItem('gravity_lang') || 'ua';
let currentCurrency = localStorage.getItem('gravity_curr') || 'UAH';

// Базовий точний курс із Google Finance (1 ₴ = 1.94 ₽)
let RATE_UAH_TO_RUB = 1.94;

// Автоматична синхронізація курсу валют у фоновому режимі
async function syncExchangeRate() {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/UAH');
    if (!res.ok) return;
    const data = await res.json();
    if (data?.rates?.RUB) {
      RATE_UAH_TO_RUB = Number(data.rates.RUB.toFixed(2));
      if (currentCurrency === 'RUB') {
        renderProducts();
        updateCartState();
      }
    }
  } catch (e) {
    // У разі відсутності інтернету залишається точний базовий курс 1.94
  }
}
syncExchangeRate();

const i18n = {
  ua: {
    loaderStatus: "Завантаження каталогу...",
    bannerBadge: "CYBER EDITION • 2026",
    bannerTitle: "TIKTOK, STARS & NITRO",
    bannerSubtitle: "Швидка видача та прямий зв'язок з менеджером",
    bannerBtn: "Переглянути каталог",
    ticker: [
      "🛡️ ГАРАНТІЯ ТА ПІДТРИМКА <b>GRAVITY</b>",
      "⚡ МИТТЄВА НАКРУТКА TIKTOK <b>GRAVITY</b>",
      "⭐ ОФІЦІЙНІ TELEGRAM STARS <b>GRAVITY</b>",
      "💎 НАЙНИЖЧІ ЦІНИ НА РИНКУ <b>GRAVITY</b>"
    ],
    categoriesTitle: "Категорії послуг",
    cartHeader: "Ваш кошик",
    cartEmpty: "Ваш кошик порожній 🛒",
    cartTotal: "Разом до сплати:",
    btnClear: "Очистити",
    btnCheckout: "Купити (Написати менеджеру)",
    floatingTitle: "Товарів у кошику",
    floatingBtn: "До кошика →",
    settingsTitle: "⚙️ Налаштування застосунку",
    labelLang: "Мова / Язык",
    hintLang: "Оберіть мову інтерфейсу",
    labelCurr: "Валюта",
    hintCurr: "Відображення цін у магазині",
    contactManager: "Написати менеджеру (@Fambod)",
    navShop: "Магазин",
    navCart: "Кошик",
    navProfile: "Профіль",
    receiptTitle: "Ваше замовлення",
    receiptCopyHint: "📋 Натисніть, щоб скопіювати номер замовлення",
    receiptText: "Натисніть кнопку нижче, щоб надіслати замовлення менеджеру в Telegram:",
    btnSendMsg: "🚀 Надіслати замовлення менеджеру @Fambod",
    addedToCart: "додано до кошика!",
    alertCartEmpty: "Додайте хоча б один товар до кошика!",
    btnBuy: "+ Купити",
    btnUnavailable: "Недоступно",
    pricePending: "Уточнюється",
    copied: "скопійовано!",
    labelModalSpeed: "Швидкість видачі",
    labelModalGuarantee: "Гарантія",
    labelModalTerms: "📌 Умови та вимоги",
    labelModalInstructions: "🚀 Як отримати товар"
  },
  ru: {
    loaderStatus: "Загрузка каталога...",
    bannerBadge: "CYBER EDITION • 2026",
    bannerTitle: "TIKTOK, STARS & NITRO",
    bannerSubtitle: "Быстрая выдача и прямая связь с менеджером",
    bannerBtn: "Смотреть каталог",
    ticker: [
      "🛡️ ГАРАНТИЯ И ПОДДЕРЖКА <b>GRAVITY</b>",
      "⚡ МГНОВЕННАЯ НАКРУТКА TIKTOK <b>GRAVITY</b>",
      "⭐ ОФИЦИАЛЬНЫЕ TELEGRAM STARS <b>GRAVITY</b>",
      "💎 ЛУЧШИЕ ЦЕНЫ НА РЫНКЕ <b>GRAVITY</b>"
    ],
    categoriesTitle: "Категории услуг",
    cartHeader: "Ваша корзина",
    cartEmpty: "Ваша корзина пуста 🛒",
    cartTotal: "Итого к оплате:",
    btnClear: "Очистить",
    btnCheckout: "Купить (Написать менеджеру)",
    floatingTitle: "Товаров в корзине",
    floatingBtn: "В корзину →",
    settingsTitle: "⚙️ Настройки приложения",
    labelLang: "Язык / Мова",
    hintLang: "Выберите язык интерфейса",
    labelCurr: "Валюта",
    hintCurr: "Отображение цен в магазине",
    contactManager: "Написать менеджеру (@Fambod)",
    navShop: "Магазин",
    navCart: "Корзина",
    navProfile: "Профиль",
    receiptTitle: "Ваш заказ",
    receiptCopyHint: "📋 Нажмите, чтобы скопировать номер заказа",
    receiptText: "Нажмите кнопку ниже, чтобы отправить заказ менеджеру в Telegram:",
    btnSendMsg: "🚀 Отправить заказ менеджеру @Fambod",
    addedToCart: "добавлено в корзину!",
    alertCartEmpty: "Добавьте хотя бы один товар в корзину!",
    btnBuy: "+ Купить",
    btnUnavailable: "Недоступно",
    pricePending: "Уточняется",
    copied: "скопировано!",
    labelModalSpeed: "Скорость выдачи",
    labelModalGuarantee: "Гарантия",
    labelModalTerms: "📌 Условия и требования",
    labelModalInstructions: "🚀 Как получить товар"
  }
};

function formatPrice(uahAmount) {
  if (currentCurrency === 'RUB') {
    const rub = Math.round(uahAmount * RATE_UAH_TO_RUB);
    return `${rub} ₽`;
  }
  return `${uahAmount} ₴`;
}

// Live Feed
const fakePurchases = [
  "Користувач @noy**** щойно купив Discord Nitro 1 Місяць",
  "Користувач @vla*** поповнив 1000 підписників TikTok",
  "Користувач @nik*** придбав 100 Telegram Stars",
  "Користувач @dan*** оформив 10 000 переглядів TikTok",
  "Користувач @art*** поповнив баланс Steam на 200 ₴"
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
  { id: 'all', nameUA: 'Все', nameRU: 'Все', icon: '⚡', img: 'images/main.png' },
  { id: 'tiktok', nameUA: 'TikTok', nameRU: 'TikTok', icon: '📱', img: 'images/tiktok.jpg' },
  { id: 'stars', nameUA: 'Stars', nameRU: 'Stars', icon: '⭐', img: 'images/telegramstar.png' },
  { id: 'discord', nameUA: 'Discord', nameRU: 'Discord', icon: '🟣', img: 'images/discord.jpg' },
  { id: 'steam', nameUA: 'Steam', nameRU: 'Steam', icon: '🎮', img: 'images/steam.jpg' },
  { id: 'standoff', nameUA: 'Standoff', nameRU: 'Standoff', icon: '🔫', img: 'images/standoff.jpg' },
  { id: 'spotify', nameUA: 'Spotify', nameRU: 'Spotify', icon: '🎵', img: 'images/spotify.jpg' }
];

// ТОВАРИ
const products = [
  { 
    id: 101, 
    cat: 'tiktok', 
    nameUA: 'Накрутка підписників TikTok', 
    nameRU: 'Накрутка подписчиков TikTok',
    price: 330, 
    badgeUA: '⚡ ШВИДКА ДОСТАВКА', 
    badgeRU: '⚡ БЫСТРАЯ ДОСТАВКА',
    badgeType: 'badge-fire', 
    subUA: '1000 якісних фоловерів', 
    subRU: '1000 качественных фолловеров',
    icon: '👥', 
    img: 'images/banner/tiktok1000folover.jpg',
    disabled: false,
    speedUA: '15 - 60 хв',
    speedRU: '15 - 60 мин',
    guaranteeUA: '30 днів від списань',
    guaranteeRU: '30 дней от списаний',
    termsUA: 'Профіль обов’язково має бути відкритим. Під час накрутки не змінюйте нікнейм профілю.',
    termsRU: 'Профиль обязательно должен быть открытым. Во время накрутки не меняйте никнейм профиля.',
    instUA: 'Створіть замовлення через кошик, надішліть чек менеджеру разом із посиланням на ваш профіль TikTok.'
  },
  { 
    id: 102, 
    cat: 'tiktok', 
    nameUA: 'Накрутка переглядів TikTok', 
    nameRU: 'Накрутка просмотров TikTok',
    price: 35, 
    badgeUA: '⚡ ШВИДКА ДОСТАВКА', 
    badgeRU: '⚡ БЫСТРАЯ ДОСТАВКА',
    badgeType: 'badge-fast', 
    subUA: '10 000 переглядів у рек', 
    subRU: '10 000 просмотров в рек',
    icon: '👀', 
    img: 'images/banner/tiktok10000.jpg',
    disabled: false,
    speedUA: '5 - 20 хв',
    speedRU: '5 - 20 мин',
    guaranteeUA: '100% докрутка до ліміту',
    guaranteeRU: '100% докрутка до лимита',
    termsUA: 'Відео має бути загальнодоступним без регіональних обмежень.',
    termsRU: 'Видео должно быть общедоступным без региональных ограничений.',
    instUA: 'Скопіюйте посилання на ваше відео в TikTok та надішліть менеджеру після оформлення замовлення.'
  },
  { 
    id: 103, 
    cat: 'tiktok', 
    nameUA: 'Накрутка коментарів TikTok', 
    nameRU: 'Накрутка комментариев TikTok',
    price: 60, 
    badgeUA: '💬 Активність', 
    badgeRU: '💬 Активность',
    badgeType: 'badge-deal', 
    subUA: '50 позитивних коментарів', 
    subRU: '50 положительных комментариев',
    icon: '💬', 
    img: 'images/banner/commenttictok.jpg',
    disabled: false,
    speedUA: '10 - 40 хв',
    speedRU: '10 - 40 мин',
    guaranteeUA: 'Жива активність під публікацією',
    guaranteeRU: 'Живая активность под публикацией',
    termsUA: 'Коментарі до відео мають бути увімкнені для всіх користувачів.',
    termsRU: 'Комментарии к видео должны быть включены для всех пользователей.',
    instUA: 'Надішліть посилання на відео. Якщо є побажання до тексту коментарів — вкажіть це менеджеру.'
  },
  { 
    id: 104, 
    cat: 'tiktok', 
    nameUA: 'Накрутка репостів TikTok', 
    nameRU: 'Накрутка репостов TikTok',
    price: 45, 
    badgeUA: '🚀 ТОП алгоритми', 
    badgeRU: '🚀 ТОП алгоритмы',
    badgeType: 'badge-fast', 
    subUA: '500 репостів/поділів', 
    subRU: '500 репостов/поделиться',
    icon: '🔁', 
    img: 'images/banner/tiktokrepost.jpg',
    disabled: false,
    speedUA: '5 - 30 хв',
    speedRU: '5 - 30 мин',
    guaranteeUA: 'Поштовх у рекомендації алгоритмів',
    guaranteeRU: 'Буст в рекомендации алгоритмов',
    termsUA: 'Відео має бути опубліковане не більше 7 днів тому для кращого ефекту.',
    termsRU: 'Видео должно быть опубликовано не более 7 дней назад для наилучшего эффекта.',
    instUA: 'Надішліть посилання на публікацію менеджеру разом із номером замовлення.'
  },
  { 
    id: 1, 
    cat: 'stars', 
    nameUA: '50 Telegram Stars', 
    nameRU: '50 Telegram Stars',
    price: 50, 
    badgeUA: '🔥 Топ', 
    badgeRU: '🔥 Топ',
    badgeType: 'badge-fire', 
    subUA: 'Офіційні зірки Telegram', 
    subRU: 'Официальные звёзды Telegram',
    icon: '⭐', 
    img: 'images/banner/star50.jpg',
    disabled: false,
    speedUA: '3 - 10 хв',
    speedRU: '3 - 10 мин',
    guaranteeUA: 'Офіційне зарахування через Telegram',
    guaranteeRU: 'Официальное зачисление через Telegram',
    termsUA: 'Потрібно вказати ваш юзернейм або посилання на канал/бота, куди зарахувати зірки.',
    termsRU: 'Нужно указать ваш юзернейм или ссылку на канал/бота, куда зачислить звезды.',
    instUA: 'Менеджер надсилає зірки напряму за вашим @username після підтвердження чека.'
  },
  { 
    id: 2, 
    cat: 'stars', 
    nameUA: '100 Telegram Stars', 
    nameRU: '100 Telegram Stars',
    price: 85, 
    badgeUA: '⚡ Миттєво', 
    badgeRU: '⚡ Мгновенно',
    badgeType: 'badge-fast', 
    subUA: 'Офіційні зірки Telegram', 
    subRU: 'Официальные звёзды Telegram',
    icon: '⭐', 
    img: 'images/banner/star100.jpg',
    disabled: false,
    speedUA: '3 - 10 хв',
    speedRU: '3 - 10 мин',
    guaranteeUA: '100% безпека акаунта',
    guaranteeRU: '100% безопасность аккаунта',
    termsUA: 'Без передачі паролів чи доступу — лише публічний нікнейм або канал.',
    termsRU: 'Без передачи паролей или доступа — только публичный никнейм или канал.',
    instUA: 'Оформіть замовлення і вкажіть ваш Telegram @username в чаті з менеджером.'
  },
  { 
    id: 3, 
    cat: 'discord', 
    nameUA: 'Discord Nitro 2 Місяці', 
    nameRU: 'Discord Nitro 2 Месяца',
    price: 320, 
    badgeUA: '🔥 Хіт', 
    badgeRU: '🔥 Хит',
    badgeType: 'badge-fire', 
    subUA: 'Full Nitro з 2 бустами', 
    subRU: 'Full Nitro с 2 бустами',
    icon: '🟣', 
    img: 'images/banner/nitrofull.jpg',
    disabled: false,
    speedUA: '5 - 15 хв',
    speedRU: '5 - 15 мин',
    guaranteeUA: 'Гарантія на весь термін підписки',
    guaranteeRU: 'Гарантия на весь срок подписки',
    termsUA: 'Підходить любий аккаунт навіть якщо вже було нітро! На момнет покупки в вас не повіно бути активної підписки.',
    termsRU: 'Подходит для учетных записей без активной подписки.',
    instUA: 'Видача здійснюється у вигляді офіційного Gift-посилання або через QR-код менеджера.'
  },
  { 
    id: 4, 
    cat: 'discord', 
    nameUA: 'Discord Nitro Basic 1 Місяць', 
    nameRU: 'Discord Nitro Basic 1 Месяц',
    price: 150, 
    badgeUA: 'Немає в наявності', 
    badgeRU: 'Нет в наличии',
    badgeType: 'badge-deal', 
    subUA: 'Basic Nitro гарантія', 
    subRU: 'Basic Nitro гарантия',
    icon: '💎', 
    img: 'images/banner/nitrobasic.jpg',
    disabled: true,
    speedUA: '5 - 20 хв',
    speedRU: '5 - 20 мин',
    guaranteeUA: 'Повна гарантія та заміна в разі збою',
    guaranteeRU: 'Полная гарантия и замена при сбое',
    termsUA: 'Підходить для облікових записів без активної підписки.',
    termsRU: 'Подходит для учетных записей без активной подписки.',
    instUA: 'Після перевірки оплати менеджер видає активаційний лінк або допомагає з входом.'
  },
  { 
    id: 5, 
    cat: 'steam', 
    nameUA: 'Поповнення Steam (200 ₴)', 
    nameRU: 'Пополнение Steam (200 ₴)',
    price: 250, 
    badgeUA: '⚡ Авто-видача', 
    badgeRU: '⚡ Авто-выдача',
    badgeType: 'badge-fast', 
    subUA: 'Баланс гаманця Steam', 
    subRU: 'Баланс кошелька Steam',
    icon: '🎮', 
    img: 'images/banner/steambalans200.jpg',
    disabled: false,
    speedUA: '5 - 15 хв',
    speedRU: '5 - 15 мин',
    guaranteeUA: 'Пряме зарахування на баланс',
    guaranteeRU: 'Прямое зачисление на баланс',
    termsUA: 'Потрібно вказати логін акаунта Steam (той, за яким входите в клієнт, а не видимий нік).',
    termsRU: 'Нужно указать логин аккаунта Steam (тот, по которому входите, а не видимый ник).',
    instUA: 'Надішліть логін менеджеру. Баланс автоматично поповнюється на вказану суму.'
  },
  { 
    id: 6, 
    cat: 'standoff', 
    nameUA: '100 Gold Standoff 2', 
    nameRU: '100 Gold Standoff 2',
    price: 40, 
    badgeUA: '🔥 Топ ціна', 
    badgeRU: '🔥 Топ цена',
    badgeType: 'badge-fire', 
    subUA: 'Голда по ринку з комісією', 
    subRU: 'Голда по рынку с комиссией',
    icon: '🔫', 
    img: 'images/banner/bannerstandoff100gold.jpg',
    disabled: false,
    speedUA: '10 - 30 хв',
    speedRU: '10 - 30 мин',
    guaranteeUA: 'Покриваємо 20% комісії ринку гри',
    guaranteeRU: 'Покрываем 20% комиссии рынка игры',
    termsUA: 'Вам знадобиться виставити дешевий скін на ринок за узгодженою з менеджером ціною.',
    termsRU: 'Вам понадобится выставить дешевый скин на рынок по согласованной цене.',
    instUA: 'Менеджер викупить ваш скін на ринку, і голда миттєво з’явиться на балансі.'
  },
  { 
    id: 7, 
    cat: 'spotify', 
    nameUA: 'Spotify Premium 1 Міс', 
    nameRU: 'Spotify Premium 1 Мес',
    price: 120, 
    badgeUA: '🎵 Без реклами', 
    badgeRU: '🎵 Без рекламы',
    badgeType: 'badge-deal', 
    subUA: 'Індивідуальна підписка', 
    subRU: 'Индивидуальная подписка',
    icon: '🎵', 
    img: 'images/banner/spotify.png',
    disabled: false,
    speedUA: '10 - 25 хв',
    speedRU: '10 - 25 мин',
    guaranteeUA: '30 днів гарантії та збереження треків',
    guaranteeRU: '30 дней гарантии и сохранность треков',
    termsUA: 'Підходить для існуючих та нових акаунтів без активної сімейної підписки.',
    termsRU: 'Подходит для существующих и новых аккаунтов без активной семейной подписки.',
    instUA: 'Надішліть дані акаунта або прийміть запрошення у преміум від менеджера.'
  }
];

let cart = [];
let currentCategory = 'all';
let currentModalProductId = null;

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('gravity_lang', lang);
  if (tg?.HapticFeedback) tg.HapticFeedback.selectionChanged();
  applyTranslations();
  renderCategories();
  renderProducts();
  renderCartScreen();
  updateProfileButtons();
  if (currentModalProductId) {
    openProductModal(currentModalProductId);
  }
}

function toggleLanguageQuick() {
  const nextLang = currentLang === 'ua' ? 'ru' : 'ua';
  setLanguage(nextLang);
  showToast(nextLang === 'ua' ? "🇺🇦 Мову змінено на Українську" : "🌐 Язык изменён на Русский");
}

function setCurrency(curr) {
  currentCurrency = curr;
  localStorage.setItem('gravity_curr', curr);
  if (tg?.HapticFeedback) tg.HapticFeedback.selectionChanged();
  renderProducts();
  updateCartState();
  updateProfileButtons();
  if (currentModalProductId) {
    openProductModal(currentModalProductId);
  }
  showToast(curr === 'UAH' ? "₴ Валюта: Гривня (UAH)" : "₽ Валюта: Рубль (RUB)");
}

function updateProfileButtons() {
  document.getElementById('btnLangUA')?.classList.toggle('active', currentLang === 'ua');
  document.getElementById('btnLangRU')?.classList.toggle('active', currentLang === 'ru');
  document.getElementById('btnCurrUAH')?.classList.toggle('active', currentCurrency === 'UAH');
  document.getElementById('btnCurrRUB')?.classList.toggle('active', currentCurrency === 'RUB');

  const headerFlag = document.getElementById('headerFlag');
  const headerText = document.getElementById('headerLangText');
  if (headerFlag && headerText) {
    headerFlag.innerText = currentLang === 'ua' ? '🇺🇦' : '🌐';
    headerText.innerText = currentLang === 'ua' ? 'UA' : 'RU';
  }
}

function applyTranslations() {
  const t = i18n[currentLang];

  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = text;
  };

  setText('loaderStatus', t.loaderStatus);
  setText('bannerBadge', t.bannerBadge);
  setText('bannerTitle', t.bannerTitle);
  setText('bannerSubtitle', t.bannerSubtitle);
  setText('bannerBtn', t.bannerBtn);
  setText('pageTitleCategories', t.categoriesTitle);
  setText('cartHeaderTitle', t.cartHeader);
  setText('cartTotalLabel', t.cartTotal);
  setText('btnClearCart', t.btnClear);
  setText('btnCheckout', t.btnCheckout);
  setText('settingsTitle', t.settingsTitle);
  setText('labelLang', t.labelLang);
  setText('hintLang', t.hintLang);
  setText('labelCurr', t.labelCurr);
  setText('hintCurr', t.hintCurr);
  setText('labelContactManager', t.contactManager);
  setText('navLabelShop', t.navShop);
  setText('navLabelCart', t.navCart);
  setText('navLabelProfile', t.navProfile);
  setText('floatingCartTitle', t.floatingTitle);
  setText('floatingCartBtn', t.floatingBtn);
  setText('receiptModalTitle', t.receiptTitle);
  setText('copyHint', t.receiptCopyHint);
  setText('receiptTextHint', t.receiptText);
  setText('btnSendManager', t.btnSendMsg);

  const ticker = document.getElementById('tickerContainer');
  if (ticker) {
    ticker.innerHTML = t.ticker.map(item => `<span>${item}</span>`).join('');
  }
}

function renderCategories() {
  const bar = document.getElementById('categoriesBar');
  if (!bar) return;

  bar.innerHTML = categories.map(c => {
    const catName = currentLang === 'ua' ? c.nameUA : c.nameRU;
    const iconContent = c.img 
      ? `<img src="${c.img}" class="cat-custom-img" alt="${catName}" onerror="this.outerHTML='<span>${c.icon}</span>'">` 
      : `<span>${c.icon}</span>`;
      
    return `
      <div class="cat-item ${c.id === currentCategory ? 'active' : ''}" onclick="selectCategory('${c.id}')">
        <div class="cat-icon-box">${iconContent}</div>
        <span class="cat-label">${catName}</span>
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

  const t = i18n[currentLang];
  const filtered = currentCategory === 'all' 
    ? products 
    : products.filter(p => p.cat === currentCategory);

  grid.innerHTML = filtered.map(item => {
    const prodName = currentLang === 'ua' ? item.nameUA : item.nameRU;
    const prodSub = currentLang === 'ua' ? item.subUA : item.subRU;
    const prodBadge = currentLang === 'ua' ? item.badgeUA : item.badgeRU;

    const bannerMedia = item.img 
      ? `<img src="${item.img}" class="card-custom-img" alt="${prodName}" onerror="this.outerHTML='<div class=\\'card-center-glow-icon\\'>${item.icon || '⚡'}</div>'">` 
      : `<div class="card-center-glow-icon">${item.icon || '⚡'}</div>`;

    const isOff = Boolean(item.disabled);
    const priceDisplay = isOff 
      ? `<span class="card-price" style="color: var(--text-muted); font-size: 12px;">${t.pricePending}</span>` 
      : `<span class="card-price">${formatPrice(item.price)}</span>`;

    const buttonDisplay = isOff
      ? `<button class="btn-card disabled" disabled onclick="event.stopPropagation();">${t.btnUnavailable}</button>`
      : `<button class="btn-card" onclick="event.stopPropagation(); addToCart(${item.id})">${t.btnBuy}</button>`;

    return `
      <div class="product-card ${isOff ? 'is-disabled' : ''}" onclick="openProductModal(${item.id})">
        <div class="card-banner">
          <div class="badge-row">
            <span class="badge ${item.badgeType || 'badge-fast'}">${prodBadge}</span>
          </div>
          ${bannerMedia}
        </div>
        <div class="card-info">
          <div class="card-title-bottom">${prodName}</div>
          <div class="card-sub-info">${prodSub}</div>
          <div class="card-price-row">
            ${priceDisplay}
            ${buttonDisplay}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// МОДАЛЬНЕ ВІКНО ДЕТАЛЕЙ ТОВАРУ
function openProductModal(id) {
  const item = products.find(p => p.id === id);
  if (!item) return;
  currentModalProductId = id;

  const t = i18n[currentLang];
  const prodName = currentLang === 'ua' ? item.nameUA : item.nameRU;
  const prodSub = currentLang === 'ua' ? item.subUA : item.subRU;
  const prodBadge = currentLang === 'ua' ? item.badgeUA : item.badgeRU;

  const speed = (currentLang === 'ua' ? item.speedUA : item.speedRU) || '5 - 30 хв';
  const guarantee = (currentLang === 'ua' ? item.guaranteeUA : item.guaranteeRU) || (currentLang === 'ua' ? '100% захист та гарантія видачі' : '100% защита и гарантия выдачи');
  const terms = (currentLang === 'ua' ? item.termsUA : item.termsRU) || (currentLang === 'ua' ? 'Послуга активується одразу після підтвердження замовлення менеджером.' : 'Услуга активируется сразу после подтверждения заказа менеджером.');
  const inst = (currentLang === 'ua' ? item.instUA : item.instRU) || (currentLang === 'ua' ? 'Оформіть покупку в кошику, скопіюйте номер замовлення та надішліть менеджеру @Fambod.' : 'Оформите покупку в корзине, скопируйте номер заказа и отправьте менеджеру @Fambod.');

  const titleEl = document.getElementById('modalProductTitle');
  const badgeEl = document.getElementById('modalProductBadge');
  const priceEl = document.getElementById('modalProductPrice');
  const descEl = document.getElementById('modalProductShortDesc');
  const speedEl = document.getElementById('modalProductSpeed');
  const guarEl = document.getElementById('modalProductGuarantee');
  const termsEl = document.getElementById('modalProductTerms');
  const instEl = document.getElementById('modalProductInstructions');
  const bannerEl = document.getElementById('modalProductBanner');
  const footerAction = document.getElementById('modalProductFooterAction');

  if (titleEl) titleEl.innerText = prodName;
  if (badgeEl) {
    badgeEl.innerText = prodBadge;
    badgeEl.className = `badge ${item.badgeType || 'badge-fast'}`;
  }
  if (priceEl) priceEl.innerText = item.disabled ? t.pricePending : formatPrice(item.price);
  if (descEl) descEl.innerText = prodSub;
  if (speedEl) speedEl.innerText = speed;
  if (guarEl) guarEl.innerText = guarantee;
  if (termsEl) termsEl.innerText = terms;
  if (instEl) instEl.innerText = inst;

  const lblSpeed = document.getElementById('labelModalSpeed');
  const lblGuar = document.getElementById('labelModalGuarantee');
  const lblTerms = document.getElementById('labelModalTerms');
  const lblInst = document.getElementById('labelModalInstructions');

  if (lblSpeed) lblSpeed.innerText = t.labelModalSpeed;
  if (lblGuar) lblGuar.innerText = t.labelModalGuarantee;
  if (lblTerms) lblTerms.innerText = t.labelModalTerms;
  if (lblInst) lblInst.innerText = t.labelModalInstructions;

  if (bannerEl) {
    bannerEl.innerHTML = item.img 
      ? `<img src="${item.img}" class="modal-banner-img" alt="${prodName}" onerror="this.outerHTML='<div class=\\'card-center-glow-icon\\'>${item.icon || '⚡'}</div>'">` 
      : `<div class="card-center-glow-icon">${item.icon || '⚡'}</div>`;
  }

  if (footerAction) {
    if (item.disabled) {
      footerAction.innerHTML = `<button class="btn-checkout" style="background: rgba(255,255,255,0.06); color: var(--text-muted); cursor: not-allowed;" disabled>${t.btnUnavailable}</button>`;
    } else {
      footerAction.innerHTML = `<button class="btn-checkout" onclick="addToCart(${item.id}); closeProductModal();">${t.btnBuy} — ${formatPrice(item.price)}</button>`;
    }
  }

  document.getElementById('productModal')?.classList.add('active');
  if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred('light');
}

function closeProductModal() {
  document.getElementById('productModal')?.classList.remove('active');
  currentModalProductId = null;
}

function addToCart(id) {
  const item = products.find(p => p.id === id);
  if (!item || item.disabled) return;

  const existing = cart.find(i => i.id === id);
  if (existing) existing.count += 1;
  else cart.push({ ...item, count: 1 });

  updateCartState();
  const prodName = currentLang === 'ua' ? item.nameUA : item.nameRU;
  showToast(`✅ "${prodName}" ${i18n[currentLang].addedToCart}`);
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
  const totalPriceUAH = cart.reduce((sum, i) => sum + (i.price * i.count), 0);
  
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
      if (fTotal) fTotal.innerText = formatPrice(totalPriceUAH);
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

  const t = i18n[currentLang];

  if (cart.length === 0) {
    listContainer.innerHTML = `<div class="empty-cart-msg">${t.cartEmpty}</div>`;
    totalDisplay.innerText = formatPrice(0);
    return;
  }

  listContainer.innerHTML = cart.map((item) => {
    const prodName = currentLang === 'ua' ? item.nameUA : item.nameRU;
    const itemTotal = item.price * item.count;
    return `
      <div class="cart-item-row">
        <div class="cart-item-details">
          <span class="cart-item-title">${prodName}</span>
          <span class="cart-item-sub">${formatPrice(itemTotal)} (${formatPrice(item.price)} × ${item.count})</span>
        </div>
        <div class="cart-qty-control">
          <button class="btn-qty" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="qty-val">${item.count}</span>
          <button class="btn-qty" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </div>
    `;
  }).join('');

  const totalUAH = cart.reduce((sum, i) => sum + (i.price * i.count), 0);
  totalDisplay.innerText = formatPrice(totalUAH);
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
  const t = i18n[currentLang];
  if (cart.length === 0) {
    if (tg?.showAlert) tg.showAlert(t.alertCartEmpty);
    else alert(t.alertCartEmpty);
    return;
  }

  const checkId = generateCheckId();
  const totalUAH = Number(cart.reduce((sum, i) => sum + (i.price * i.count), 0));
  const formattedTotal = formatPrice(totalUAH);

  const itemsText = cart.map(i => {
    const name = currentLang === 'ua' ? i.nameUA : i.nameRU;
    return `• ${name} (${i.count} шт.) — ${formatPrice(i.price * i.count)}`;
  }).join('\n');

  const receiptNumEl = document.getElementById('receiptNumber');
  const receiptSumEl = document.getElementById('receiptSummary');
  if (receiptNumEl) receiptNumEl.innerText = checkId;
  if (receiptSumEl) receiptSumEl.innerText = `${itemsText}\n\n${t.cartTotal} ${formattedTotal}`;

  const greeting = currentLang === 'ua' ? 'Привіт! Хочу замовити в Gravity Shop:' : 'Привет! Хочу заказать в Gravity Shop:';
  const orderLabel = currentLang === 'ua' ? 'Замовлення' : 'Заказ';
  const goodsLabel = currentLang === 'ua' ? 'Товари' : 'Товары';
  const sumLabel = currentLang === 'ua' ? 'Разом до сплати' : 'Итого к оплате';

  const msgForManager = `${greeting}\n🧾 ${orderLabel}: ${checkId}\n\n${goodsLabel}:\n${itemsText}\n\n💳 ${sumLabel}: ${formattedTotal}`;

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
    showToast(`📋 ${checkId} ${i18n[currentLang].copied}`);
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
  const fullName = `${u?.first_name || ''} ${u?.last_name || ''}`.trim() || (currentLang === 'ua' ? 'Користувач' : 'Пользователь');

  const nameEl = document.getElementById('userName');
  const userEl = document.getElementById('userUsername');
  const idEl = document.getElementById('userId');
  const avatarEl = document.getElementById('userAvatar');

  if (nameEl) nameEl.innerText = fullName;
  if (userEl) userEl.innerText = u?.username ? `@${u.username}` : (currentLang === 'ua' ? 'Без юзернейму' : 'Без юзернейма');
  if (idEl) idEl.innerText = u?.id || '5188484100';
  if (avatarEl && u?.first_name) {
    avatarEl.innerText = u.first_name.charAt(0).toUpperCase();
  }
  updateProfileButtons();
}

function scrollToCatalog() {
  const grid = document.getElementById('productsGrid');
  if (grid) grid.scrollIntoView({ behavior: 'smooth' });
}

applyTranslations();
renderCategories();
renderProducts();
loadProfileData();
