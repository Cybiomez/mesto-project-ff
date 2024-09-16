const container = document.querySelector('.content');
const cardContainer = container.querySelector('.places');
const cardList = cardContainer.querySelector('.places__list');


const likeButton = container.querySelector('card__like-button');

    // Функция создания карточки
function addCard (cardTitle, cardLink, cardAlt) {
        // Копирование шаблона карточки
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
        // Определение аргументов
    const cardDescription = cardElement.querySelector('.card__description');
    cardDescription.querySelector('.card__title').textContent = cardTitle;
    cardElement.querySelector('.card__image').src = cardLink;
    cardElement.querySelector('.card__image').alt = cardAlt;
        // Обработчик функции удаления
    const removeButton = cardElement.querySelector('.card__delete-button');
    removeButton.addEventListener('click', removeCard);
        // Возврат скопированного из шаблона элемента
    return cardElement;
};

    // Рендер карточек
initialCards.forEach(function (element) {
        // Присвоение аргументам данных, содержащихся в элементах массива
    cardTitle = element.name;
    cardLink = element.link;
    cardAlt = element.alt;
        // Вызов фунции создания карточки с аргументами и добавление в DOM
    cardList.append(addCard(cardTitle, cardLink, cardAlt));    
});

    // Функция удаления карточки
function removeCard () {
    const card = document.querySelectorAll('.card');
};

