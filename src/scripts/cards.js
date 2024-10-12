import {popupTypeImage, popupCaption, popupImage} from './index.js';
import {openModal, closeModal} from './modal.js';

export {initialCards, createCard, deleteCard, renderCards};

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
        // Обработчик функции удаления карточки
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {deleteCard(cardElement);});
        // Обработчик функции лайка
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    cardLikeButton.addEventListener('click', () => {likeCard(cardLikeButton);});
        // Обработчик функции лайка
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.addEventListener('click', () => {cardPopup(cardImage);});
        // Возврат скопированного из шаблона элемента
    return cardElement;
};

    // Функция обработчика удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
};

    // Функция обработчика лайка
function likeCard(cardLikeButton) {
    if (!cardLikeButton.classList.contains('card__like-button_is-active')) {
      cardLikeButton.classList.add('card__like-button_is-active');
        }
    else {
      cardLikeButton.classList.remove('card__like-button_is-active');
    };
};

    // Функция обработчика клика по картинкам
function cardPopup (cardImage) {
    popupCaption.textContent = cardImage.alt;
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    openModal(popupTypeImage);
};

    // Функция рендеринга карточек
function renderCards (cardList) {
        // Перебор элементов массива
    initialCards.forEach(function (cardData) {
            // Вызов фунции создания карточки и добавление в DOM 
        cardList.append(createCard(cardData));    
    });
};