// Функция создания карточки
function createCard(cardData, profileData, callbackList) {
  // Копирование шаблона карточки
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  // Поиск элементов для создания карточки
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeButtonCounter = cardElement.querySelector(
    ".card__like-button_counter"
  );
  // Поиск элементов для обработчиков
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  // Присвоение данных из элемента массива
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardLikeButtonCounter.textContent = cardData.likes.length;
  // Условие доступности кнопки удаления
  if (cardData.owner._id !== profileData._id) {
    deleteButton.classList.add("card__delete-button_unavailable");
  }
  // Условие отрисовки лайка
  cardData.likes.forEach((user) => {
    if (user._id.includes(`${profileData._id}`)) {
      cardLikeButton.classList.add("card__like-button_is-active");
    }
  });
  // Обработчик функции удаления карточки
  deleteButton.addEventListener("click", () =>
    callbackList.deleteCard(cardElement, cardData._id)
  );
  // Обработчик функции лайка
  cardLikeButton.addEventListener("click", () =>
    callbackList.likeCard(cardLikeButton, cardLikeButtonCounter, cardData)
  );
  // Обработчик функции модального окна карточки
  cardImage.addEventListener("click", () =>
    callbackList.handleImageClick(cardImage)
  );
  // Возврат скопированного из шаблона элемента
  return cardElement;
}

// Экспорт функций создания, удаления и лайка карточек
export { createCard };
