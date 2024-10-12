    // Импорт главного файла стилей
import '../pages/index.css'; 
    // Импорт массива данных карточек и функций управления ими
import {initialCards, createCard, deleteCard, renderCards} from './cards.js'; 

    // Рендер карточек из сассива
renderCards();

    // Поиск кнопок и объектов
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const cardImage = document.querySelectorAll('.card__image');
const buttonClose = document.querySelectorAll('.popup__close');

    // Поиск попапов
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popup = document.querySelectorAll('.popup');

    // Функция открытия попапа
function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened');
};

    // Обработчик клика по кнопке редактирования профиля
profileEditButton.addEventListener('click', function () {
    openPopup(popupTypeEdit);
});

    // Обработчик клика по кнопке добавления карточки
profileAddButton.addEventListener('click', function () {
    openPopup(popupTypeNewCard);
});

    // Обработчик клика по картинкам
cardImage.forEach(function(element) {
    element.addEventListener('click', function () {
        const popupImage = document.querySelector('.popup__image');
        const popupCaption = document.querySelector('.popup__caption');
        popupCaption.textContent = element.alt;
        popupImage.src = element.src;
        popupImage.alt = element.alt;
        openPopup(popupTypeImage);
    });
});

    // Функция закрытия попапа
function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened');
};

    // Закрытие попапа по нажатию на крестик
buttonClose.forEach(function(element) {
    element.addEventListener('click', function() {
        closePopup(element.parentNode.parentNode);
        document.querySelector('.popup__input_type_name').value = '';
        document.querySelector('.popup__input_type_description').value = '';
    });
});

    // Закрытие попапа по нажатию на оверлей
popup.forEach(function(element) {
    element.addEventListener('click', function(evt) {
        if (evt.target.classList.contains('popup') && !evt.target.classList.contains('popup__content')) {
            closePopup(element);
        };   
    });
});

    // Закрытие попапа по нажатию на Esc
document.addEventListener('keyup', function (evt) {
    if (evt.key === 'Escape') {
        popup.forEach(function(element) {
            if (element.classList.contains('popup_is-opened')) {
                closePopup(element);
            };
        });
    };
});


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
    closePopup(popupTypeEdit);
        // Сброс значений полей
    nameInput.value = '';
    jobInput.value = '';
        // Присвоение новых значений по умполчанию полям
    nameInput.placeholder = nameOutput.textContent;
    jobInput.placeholder = jobOutput.textContent;
};

    // Обработчик события отправки
formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);


    

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
        // Вызов функции отрисовки карточек из сассива
    createCard();
        // Закрытие попапа
    closePopup(popupTypeNewCard);
        // Сброс значений полей
    cardNameInput.value = '';
    urlInput.value = '';
};

    // Обработчик события отправки
formNewPlace.addEventListener('submit', handleFormNewPlace);
