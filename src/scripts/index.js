    // Импорт главного файла стилей
import '../pages/index.css'; 
    // Импорт массива данных карточек и функций управления ими
import {initialCards, createCard, deleteCard, renderCards, cardList} from './cards.js';
    //
import {openModal, closeModal, cardPopup, popupTypeEdit, popupTypeNewCard} from './modal.js';
    // Рендер карточек из сассива
renderCards();
    // Вызов функции обработчика клика по карточкам
cardPopup();
    // Вызов функции обработчика лайка
likeCard();

// --------------------------------------------------------------

    // Функция обработчика лайка
function likeCard() {
    const cardLikeButton = document.querySelectorAll('.card__like-button');
    cardLikeButton.forEach(function(element) {
        element.addEventListener('click', function () {
            if (!element.classList.contains('card__like-button_is-active')) {
                element.classList.add('card__like-button_is-active');
            }
            else {
                element.classList.remove('card__like-button_is-active');
            };
        });
    });
};

// --------------------------------------------------------------

    // Поиск формы изменения профиля в DOM
const formEditProfile = document.querySelector('[name="edit-profile"]');
    // Поиск полей формы в DOM
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
    // Присвоение значений по умолчанию полям
nameInput.placeholder = document.querySelector('.profile__title').textContent;
jobInput.placeholder = document.querySelector('.profile__description').textContent;

    // Обработчик «отправки» формы
function handleFormEditProfileSubmit(evt) {
        // Отмена стандартной отправки формы
    evt.preventDefault(); 
        // Поиск значений полей в DOM
    nameInput.value = document.querySelector('.popup__input_type_name').value;
    jobInput.value = document.querySelector('.popup__input_type_description').value;
        // Поиск соответствующих элементов на странице
    const nameOutput = document.querySelector('.profile__title');
    const jobOutput = document.querySelector('.profile__description');
        // Присвоение новых значений из полей формы
    nameOutput.textContent = nameInput.value;
    jobOutput.textContent = jobInput.value;
        // Закрытие попапа
    closeModal(popupTypeEdit);
        // Сброс значений полей
    nameInput.value = '';
    jobInput.value = '';
        // Присвоение новых значений по умполчанию полям
    nameInput.placeholder = nameOutput.textContent;
    jobInput.placeholder = jobOutput.textContent;
};

    // Обработчик события отправки
formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);

// --------------------------------------------------------------    

    // Поиск формы добавления карточек в DOM
const formNewPlace = document.querySelector('[name="new-place"]');
    // Поиск полей формы в DOM
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');

    // Обработчик «отправки» формы
function handleFormNewPlace(evt) {
        // Отмена стандартной отправки формы
    evt.preventDefault(); 
        // Поиск значений полей в DOM
    cardNameInput.value = document.querySelector('.popup__input_type_card-name').value;
    urlInput.value = document.querySelector('.popup__input_type_url').value;
        // Определение значений для карточек
    initialCards.name = cardNameInput.value;
    initialCards.link = urlInput.value;
    const cardName = initialCards.name;
    const cardLink = initialCards.link;
        // Передача данных в массив
    initialCards.unshift({name: cardName, link: cardLink});
        // Вызов функции отрисовки карточки из сассива
    cardList.prepend(createCard(initialCards[0]));
        // Вызов функции обработчика клика по карточкам
    cardPopup();
        // Вызов функции обработчика лайка
    likeCard();
        // Закрытие попапа
    closeModal(popupTypeNewCard);
        // Сброс значений полей
    cardNameInput.value = '';
    urlInput.value = '';
};

    // Обработчик события отправки
formNewPlace.addEventListener('submit', handleFormNewPlace);