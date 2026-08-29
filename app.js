const tg = window.Telegram?.WebApp;

if (tg) {
    tg.expand();
    tg.ready();
    
    // Получаем данные текущего пользователя Telegram
    const user = tg.initDataUnsafe?.user;
    if (user) {
        const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Пользователь';
        document.getElementById('welcome-username').innerText = `Привет, ${user.first_name || 'Пользователь'}!`;
        document.getElementById('profile-name').innerText = fullName;
        document.getElementById('profile-username').innerText = user.username ? `@${user.username}` : '';
        document.getElementById('profile-id').innerText = `ID: ${user.id}`;
        
        if (user.photo_url) {
            document.getElementById('user-avatar').src = user.photo_url;
            document.getElementById('profile-avatar').src = user.photo_url;
        }
    }
}

function switchTab(tabId, el) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));

    const targetTab = document.getElementById(tabId);
    if (targetTab) targetTab.classList.add('active');

    if (el) {
        el.classList.add('active');
    } else {
        // Синхронизация кнопки при вызове с карточки
        const navButtons = document.querySelectorAll('.nav-item');
        const map = {
            'tab-home': 0,
            'tab-levels': 1,
            'tab-buy': 2,
            'tab-custom': 3,
            'tab-profile': 4
        };
        if (map[tabId] !== undefined) {
            navButtons[map[tabId]].classList.add('active');
        }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleApi() {
    const input = document.getElementById('api-key');
    input.type = input.type === 'password' ? 'text' : 'password';
}

function copyApi() {
    const input = document.getElementById('api-key');
    navigator.clipboard.writeText(input.value);
    if (tg?.showAlert) {
        tg.showAlert('API ключ скопирован!');
    } else {
        alert('API ключ скопирован!');
    }
}