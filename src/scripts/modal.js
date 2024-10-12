export {openModal, closeModal};

// --------------------------------------------------------------

    // Функция открытия попапа
function openModal(popupElement) {
    popupElement.classList.add('popup_is-opened');
};

// --------------------------------------------------------------

    // Функция закрытия попапа
function closeModal(popupElement) {
    popupElement.classList.remove('popup_is-opened');
};