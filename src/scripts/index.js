export {popupTypeImage, popupCaption, popupImage};
    // Импорт главного файла стилей
import '../pages/index.css'; 
    // Импорт массива данных карточек и функций управления ими
import {initialCards, createCard, deleteCard, renderCards} from './cards.js';
    // Импорт функций и обработчиков попапов
import {openModal, closeModal} from './modal.js';
    // Рендер карточек из сассива

    // Поиск контейнера для карточек
const cardList = document.querySelector('.places__list');
    renderCards(cardList);

    // Поиск элементов попапа картинки
const popupCaption = document.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup__image');
    
    // Поиск кнопок и объектов
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const buttonClose = document.querySelectorAll('.popup__close');

    // Поиск попапов
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popup = document.querySelectorAll('.popup');

// --------------------------------------------------------------

    // Обработчик клика по кнопке редактирования профиля
profileEditButton.addEventListener('click', function () {
    openModal(popupTypeEdit);
});

    // Обработчик клика по кнопке добавления карточки
profileAddButton.addEventListener('click', function () {
    openModal(popupTypeNewCard);
});

// --------------------------------------------------------------

    // Обработчик закрытия попапа по нажатию на крестик
buttonClose.forEach(function(element) {
    element.addEventListener('click', function() {
        closeModal(element.parentNode.parentNode);
    });
});
    
    // Обработчик закрытия попапа по нажатию на оверлей
popup.forEach(function(element) {
    element.addEventListener('click', function(evt) {
        if (evt.target.classList.contains('popup') && !evt.target.classList.contains('popup__content')) {
            closeModal(element);
        };   
    });
});

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
        // Вызов функции отрисовки карточки из сассива
    cardList.prepend(createCard({name: cardName, link: cardLink}));
        // Закрытие попапа
    closeModal(popupTypeNewCard);
        // Сброс значений полей
    cardNameInput.value = '';
    urlInput.value = '';
};

    // Обработчик события отправки
formNewPlace.addEventListener('submit', handleFormNewPlace);