document.addEventListener('DOMContentLoaded', () => {
    // Функция для добавления обработчика на несколько элементов
    const addClickHandler = (elements, callback) => {
        elements.forEach(element => element.addEventListener('click', callback));
    };

    // Получаем необходимые элементы
    const bonusModal = document.getElementById('bonusModal');
    const closeButton = document.querySelector('.close-button');
    const getBonusButton = document.getElementById('getBonusButton');
    const ctaButtons = document.querySelectorAll('.cta-button');
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const bonusesSection = document.getElementById('bonuses');
    const smoothLinks = document.querySelectorAll('a[href^="#"]');

    // Открытие/закрытие модального окна
    const openModal = () => bonusModal.style.display = 'flex';
    const closeModal = () => bonusModal.style.display = 'none';

    // Добавление обработчика на кнопку "Получить Бонус"
    addClickHandler(ctaButtons, () => alert('Ваш бонус ожидает вас в Sweet Bonanza 1000!'));

    // Обработчик закрытия модального окна
    if (closeButton) closeButton.addEventListener('click', closeModal);

    // Закрытие модального окна при клике за его пределами
    window.addEventListener('click', event => {
        if (event.target === bonusModal) closeModal();
    });

    // Обработчик кнопки "Получить Бонусы" внутри модального окна
    if (getBonusButton) {
        getBonusButton.addEventListener('click', () => {
            alert('Бонусы успешно получены!');
            closeModal();
        });
    }

    // Таймаут для открытия модального окна
    let bonusModalTimeout;

    // Наблюдатель для секции бонусов (открытие модального окна через 2 секунды при прокрутке)
    if (bonusesSection) {
        const observerOptions = { root: null, rootMargin: '0px 0px -50% 0px', threshold: 0 };

        const observerCallback = entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bonusModalTimeout = setTimeout(() => {
                        openModal();
                        observer.unobserve(entry.target);
                    }, 2000);
                } else {
                    clearTimeout(bonusModalTimeout);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        observer.observe(bonusesSection);
    }

    // Плавный переход по якорным ссылкам
    addClickHandler(smoothLinks, event => {
        event.preventDefault();
        const targetElement = document.querySelector(event.target.getAttribute('href'));

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });

    // Открытие/закрытие бургер-меню
    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            burger.classList.toggle('toggle');
        });
    }
});
