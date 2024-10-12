export {initialCards, createCard, deleteCard, renderCards, cardList};

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

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

    // Функция удаления карточки через подачу карточки
function deleteCard(cardElement) {
    cardElement.remove();
};

    // Поиск контейнера для карточек
const cardList = document.querySelector('.places__list');
    // Функция рендеринга карточек
function renderCards () {
        // Перебор элементов массива
    initialCards.forEach(function (cardData) {
            // Вызов фунции создания карточки и добавление в DOM 
        cardList.append(createCard(cardData));    
    });
};