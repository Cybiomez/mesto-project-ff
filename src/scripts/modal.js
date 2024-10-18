// Функция открытия модального окна
function openModal(popupElement) {
  popupElement.classList.add("popup_is-opened");
  document.addEventListener("keyup", closeEscape);
}

// Функция закрытия модального окна
function closeModal(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  document.removeEventListener("keyup", closeEscape);
}

// Функция обработчика закрытия модального окна по нажатию на Escape
function closeEscape(evt) {
  if (evt.key === "Escape") {
    const popupIsOpened = document.querySelector(".popup_is-opened");
    closeModal(popupIsOpened);
  }
}

// Экспорт функций открытия и закрытия модальных окон
export { openModal, closeModal };
