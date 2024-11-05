// Функция создания карточки
function createCard(cardData, user_id, callbackList) {
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
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  // Присвоение данных из элемента массива
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardLikeButtonCounter.textContent = cardData.likes.length;
  // Условие доступности кнопки удаления
  if (cardData.owner._id !== user_id) {
    cardDeleteButton.classList.add("card__delete-button_unavailable");
  }
  // Условие отрисовки лайка
  cardData.likes.forEach((owner) => {
    if (owner._id.includes(`${user_id}`)) {
      cardLikeButton.classList.add("card__like-button_is-active");
    }
  });
  // Обработчик функции удаления карточки
  cardDeleteButton.addEventListener("click", () =>
    callbackList.deleteCard(cardData._id, cardElement)
  );
  // Обработчик функции лайка
  cardLikeButton.addEventListener("click", () =>
    callbackList.likeCard(
      checkStatusLikeButton(cardLikeButton),
      cardData,
      cardLikeButton,
      cardLikeButtonCounter
    )
  );
  // Обработчик функции модального окна карточки
  cardImage.addEventListener("click", () =>
    callbackList.handleImageClick(cardImage)
  );
  // Возврат скопированного из шаблона элемента
  return cardElement;
}

function removeElement(cardElement) {
  cardElement.remove();
}

function checkStatusLikeButton(cardLikeButton) {
  return cardLikeButton.classList.contains("card__like-button_is-active");
}

function changeLike(cardLikeButton, cardLikeButtonCounter, res) {
  cardLikeButton.classList.toggle("card__like-button_is-active");
  cardLikeButtonCounter.textContent = res.likes.length;
}

// Экспорт функций создания, удаления и лайка карточек
export { createCard, changeLike, removeElement };
