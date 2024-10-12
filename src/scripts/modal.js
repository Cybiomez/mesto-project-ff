export {openModal, closeModal, cardPopup, popupTypeEdit, popupTypeNewCard};

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

    // Функция открытия попапа
function openModal(popupElement) {
    popupElement.classList.add('popup_is-opened');
};

    // Обработчик клика по кнопке редактирования профиля
profileEditButton.addEventListener('click', function () {
    openModal(popupTypeEdit);
});

    // Обработчик клика по кнопке добавления карточки
profileAddButton.addEventListener('click', function () {
    openModal(popupTypeNewCard);
});

    // Функция обработчика клика по картинкам
function cardPopup () {
    const cardImage = document.querySelectorAll('.card__image');
    cardImage.forEach(function(element) {
        element.addEventListener('click', function () {
            const popupImage = document.querySelector('.popup__image');
            const popupCaption = document.querySelector('.popup__caption');
            popupCaption.textContent = element.alt;
            popupImage.src = element.src;
            popupImage.alt = element.alt;
            openModal(popupTypeImage);
        });
    });
};

// --------------------------------------------------------------

    // Функция закрытия попапа
function closeModal(popupElement) {
    popupElement.classList.remove('popup_is-opened');
};

    // Закрытие попапа по нажатию на крестик
buttonClose.forEach(function(element) {
    element.addEventListener('click', function() {
        closeModal(element.parentNode.parentNode);
        const popupValue = document.querySelectorAll('.popup__input');
        popupValue.forEach(function (element) {
            element.value = '';
        });
    });
});

    // Закрытие попапа по нажатию на оверлей
popup.forEach(function(element) {
    element.addEventListener('click', function(evt) {
        if (evt.target.classList.contains('popup') && !evt.target.classList.contains('popup__content')) {
            closeModal(element);
        };   
    });
});

    // Закрытие попапа по нажатию на Esc
document.addEventListener('keyup', function (evt) {
    if (evt.key === 'Escape') {
        popup.forEach(function(element) {
            if (element.classList.contains('popup_is-opened')) {
                closeModal(element);
            };
        });
    };
});