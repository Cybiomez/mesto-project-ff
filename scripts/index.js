const mainContainer = document.querySelector('.content');
const cardsContainer = mainContainer.querySelector('.places');
const cardList = cardsContainer.querySelector('.places__list');

    // Функция удаления карточки
function deleteCard (event) {
    event.target.parentElement.remove();
};

    // Функция создания карточки
function createCard (cardTitle, cardImageLink, cardImageAlt) {
        // Копирование шаблона карточки
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
        // Определение аргументов
    const cardDescription = cardElement.querySelector('.card__description');
    cardDescription.querySelector('.card__title').textContent = cardTitle;
    cardElement.querySelector('.card__image').src = cardImageLink;
    cardElement.querySelector('.card__image').alt = cardImageAlt;
        // Обработчик функции удаления
    const removeButton = cardElement.querySelector('.card__delete-button');
    removeButton.addEventListener('click', deleteCard);
        // Возврат скопированного из шаблона элемента
    return cardElement;
};

    // Функция рендеринга карточек
function renderCards () {
        // Перебор элементов массива
    initialCards.forEach(function (element) {
            // Присвоение аргументам данных, содержащихся в элементах массива
        cardTitle = element.name;
        cardImageLink = element.link;
        cardImageAlt = element.name;
            // Вызов фунции создания карточки с аргументами и добавление в DOM
        const cardItem = createCard(cardTitle, cardImageLink, cardImageAlt); 
        cardList.append(cardItem);    
    });
};

renderCards();