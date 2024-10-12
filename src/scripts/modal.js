export {openModal, closeModal};

// --------------------------------------------------------------

    // Функция открытия попапа
function openModal(popupElement) {
    popupElement.classList.add('popup_is-opened');
    document.addEventListener('keyup', closeEscape);
};

    // Функция закрытия попапа
function closeModal(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keyup', closeEscape);
    if (popupElement.classList.contains('popup_type_edit')) {
        const popupValue = popupElement.querySelectorAll('.popup__input');
        popupValue.forEach(function (element) {
            element.value = '';
        });
    };
};

// --------------------------------------------------------------

    // Функция обработчика закрытия попапа по нажатию на Escape
function closeEscape(evt) {
    if (evt.key === 'Escape') {
        const popupIsOpened = document.querySelector('.popup_is-opened');
        closeModal(popupIsOpened);
    };
};