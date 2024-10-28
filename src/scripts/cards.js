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
  const cardLikeButtonCounter = cardElement.querySelector(".card__like-button_counter");
  // Поиск элементов для обработчиков
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  // Присвоение данных из элемента массива
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardLikeButtonCounter.textContent = cardData.likes.length;

  if (cardData.owner._id !== profileData._id) {
    deleteButton.classList.add("card__delete-button_unavailable")
    // ОСТАЛОСЬ ДОПИСАТЬ КЛАСС
  };

  cardData.likes.forEach((id) => {
    if (id === profileData._id) {
      callbackList.likeCard(cardLikeButton)
    };
  });

  // Обработчик функции удаления карточки
  deleteButton.addEventListener("click", () =>
    callbackList.deleteCard(cardElement)
  );
  // Обработчик функции лайка
  cardLikeButton.addEventListener("click", () =>
    callbackList.likeCard(cardLikeButton)
  );
  // Обработчик функции модального окна карточки
  cardImage.addEventListener("click", () =>
    callbackList.handleImageClick(cardImage)
  );
  // Возврат скопированного из шаблона элемента
  return cardElement;
}

// Функция обработчика удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// Функция обработчика лайка
function likeCard(cardLikeButton) {
  cardLikeButton.classList.toggle("card__like-button_is-active");
}

// Экспорт функций создания, удаления и лайка карточек
export { createCard, deleteCard, likeCard };
