// --- Завдання 1: Масив подій та цикл while ---

// Масив історичних подій
const historyEvents = [
    {
        title: "Античність",
        date: "800 до н.е. — 476 н.е.",
        shortDesc: "Розквіт грецької філософії, римського права та архітектури.",
        fullDesc: "Античність заклала фундамент сучасної європейської цивілізації. У цей час були створені основи демократії в Афінах, збудовані величні Колізей та Парфенон, а римське право стало базою для багатьох сучасних правових систем.",
        img: "https://images.unsplash.com/photo-1564399580075-5dfe19c205f3?auto=format&fit=crop&w=500&q=60"
    },
    {
        title: "Середньовіччя",
        date: "476 — 1492",
        shortDesc: "Епоха лицарства, формування королівств та готичних соборів.",
        fullDesc: "Період, що почався після падіння Західної Римської імперії. Характеризується феодальною системою, домінуванням релігії в житті суспільства, хрестовими походами та будівництвом неприступних замків.",
        img: "https://i.pinimg.com/1200x/37/05/10/37051007336826ca9f34c8819bcf3f9c.jpg"
    },
    {
        title: "Відродження",
        date: "XIV — XVII ст.",
        shortDesc: "Повернення до античних ідеалів, великі географічні відкриття.",
        fullDesc: "Епоха Ренесансу подарувала людству геніїв на кшталт Леонардо да Вінчі та Мікеланджело. Це час стрімкого розвитку науки, мистецтва та початку книгодрукування Гутенбергом.",
        img: "https://images.unsplash.com/photo-1576016770956-debb63d92058?auto=format&fit=crop&w=500&q=60"
    }
];

// Генерація контенту за допомогою циклу while
const timelineContainer = document.getElementById('timeline-container');
let index = 0;

while (index < historyEvents.length) {
    const event = historyEvents[index];

    // Створюємо HTML структуру для кожної події
    // Чергуємо класи для розташування зліва/справа
    const isReverse = index % 2 !== 0 ? 'reverse' : '';

    const eventHTML = `
        <div class="timeline-item ${isReverse}">
            <div class="timeline-content text-${isReverse ? 'left' : 'right'}">
                <h3 class="font-serif text-white">${event.title}</h3>
                <span class="date">${event.date}</span>
                <p class="text-muted">${event.shortDesc}</p>
                <button class="btn-outline btn-small learn-more-btn" data-index="${index}">Дізнатися більше</button>
            </div>
            <div class="timeline-dot ${isReverse ? 'bg-secondary border-accent' : ''}"></div>
            <div class="timeline-img">
                <img src="${event.img}" alt="${event.title}">
            </div>
        </div>
    `;

    timelineContainer.innerHTML += eventHTML;
    index++;
}


// --- Завдання 2: Модальне вікно (Обробка подій) ---

const modal = document.getElementById('eventModal');
const closeBtn = document.querySelector('.close-btn');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');

// Додаємо слухачів подій на всі згенеровані кнопки "Дізнатися більше"
const learnMoreButtons = document.querySelectorAll('.learn-more-btn');

// Використовуємо forEach (як альтернативу for з лекції) для перебору кнопок
learnMoreButtons.forEach(button => {
    button.addEventListener('click', function () {
        const eventIndex = this.getAttribute('data-index');
        const eventData = historyEvents[eventIndex];

        modalTitle.textContent = eventData.title;
        modalDesc.textContent = eventData.fullDesc;

        modal.classList.remove('hidden');
    });
});

// Закриття модального вікна
closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
});

// Закриття при кліку поза вікном
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});


// --- Завдання 3: Тестування та обробка форм ---

const openTestBtn = document.getElementById('openTestBtn');
const testingSection = document.getElementById('testing');
const testForm = document.getElementById('historyTestForm');
const testResult = document.getElementById('testResult');

// Відкриття тесту по кнопці в розділі "Події"
openTestBtn.addEventListener('click', () => {
    testingSection.classList.remove('hidden');
    // Плавний скрол до тесту
    testingSection.scrollIntoView({ behavior: 'smooth' });
});

// Обробка відправлення форми (if-else логіка)
testForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Зупиняємо стандартне перезавантаження сторінки

    // Отримуємо значення з форми
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');
    const userName = document.getElementById('userName').value.trim();

    // Умовна логіка: перевірка чи всі поля заповнені
    if (!q1 || !q2 || userName === "") {
        testResult.textContent = "Будь ласка, дайте відповідь на всі запитання!";
        testResult.style.color = "red";
        return; // Виходимо з функції
    }

    // Підрахунок балів
    let score = 0;

    if (q1.value === "476") {
        score += 1;
    }

    if (q2.value === "napoleon") {
        score += 1;
    }

    // Формування динамічного результату
    if (score === 2) {
        testResult.textContent = `Відмінно, ${userName}! Ви набрали ${score}/2 балів.`;
        testResult.style.color = "var(--accent)"; // Золотий колір
    } else if (score === 1) {
        testResult.textContent = `Непогано, ${userName}. Ваш результат: ${score}/2 балів. Варто повторити матеріал.`;
        testResult.style.color = "var(--white)";
    } else {
        testResult.textContent = `Спробуйте ще раз, ${userName}. Ваш результат: 0/2.`;
        testResult.style.color = "red";
    }
});