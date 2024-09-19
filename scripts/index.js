const mainContainer = document.querySelector('.content');
const cardsContainer = mainContainer.querySelector('.places');
const cardList = cardsContainer.querySelector('.places__list');

/*
    // Функция удаления карточки через event
function deleteCard(event) {
    event.target.closest('.places__item').remove();
};
*/

    // Функция удаления карточки через подачу карточки
function deleteCard(cardElement) {
    cardElement.remove();
};

    // Функция создания карточки
function createCard(cardData) {
        // Копирование шаблона карточки
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
        // Определение аргументов с присвоением данных из элемента массива по ключу
    const cardDescription = cardElement.querySelector('.card__description');
    cardDescription.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.name;
        // Обработчик функции удаления
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {deleteCard(cardElement);});
        // Возврат скопированного из шаблона элемента
    return cardElement;
};

    // Функция рендеринга карточек ЧЕРЕЗ МЕТОД МАССИВА
function renderCards () {
        // Перебор элементов массива
    initialCards.forEach(function (cardData) {
            // Вызов фунции создания карточки и добавление в DOM 
        cardList.append(createCard(cardData));    
    });
};

/*
    // Функция рендеринга карточек ЧЕРЕЗ ЦИКЛ
function renderCards () {
        // Перебор элементов массива
    for (let i = 0; i < initialCards.length; i++) {
            // Создание объекта с данными из элемента массива
        let cardData = {
            name: initialCards[i].name,
            link: initialCards[i].link,
        };
            // Вызов фунции создания карточки с аргументами и добавление в DOM
        cardList.append(createCard(cardData));    
    };
};
*/

renderCards();