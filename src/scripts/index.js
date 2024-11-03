// Импорт главного файла стилей
import "../pages/index.css";
// Импорт функций создания, уаления и лайка карточек
import { createCard, changeLike, removeElement } from "./cards.js";
// Импорт функций открытия и закрытия модальных окон
import { openModal, closeModal } from "./modal.js";
// Импорт функций добавления и очистки валидации
import { enableValidation, clearValidation } from "./validation.js";
// Импорт функций взаимодействия с API
import {
  fetchProfileAndCardsData,
  fetchPatchProfileImage,
  fetchPatchProfileData,
  fetchPostNewCard,
  fetchDeleteCard,
  fetchPutLikeCard,
  fetchDeleteLikeCard,
} from "./api.js";

// --------------------------------------------------------------

// Поиск аватара профиля
const profileImage = document.querySelector(".profile__image");

// Поиск заголовка и описания профиля
const nameProfile = document.querySelector(".profile__title");
const descriptionProfile = document.querySelector(".profile__description");

// Поиск контейнера для карточек
const cardContainer = document.querySelector(".places__list");

// Поиск модальных окон
const popupList = Array.from(document.querySelectorAll(".popup"));
const popupTypeImageEdit = document.querySelector(".popup_type_new-image");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");

// Поиск форм редактирования профиля и добавления карточек
const formEditImageProfile = document.forms["new-image"];
const formEditProfile = document.forms["edit-profile"];
const formNewPlace = document.forms["new-place"];

// Поиск полей форм редактирования аватара, профиля и добавления карточек
const profileImgeUrlInput = document.querySelector(
  ".popup__input_type_url-profile-image"
);
const profileNameInput = document.querySelector(".popup__input_type_name");
const profileDescriptionInput = document.querySelector(
  ".popup__input_type_description"
);
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardUrlInput = document.querySelector(".popup__input_type_url-card");

// Поиск кнопок отправки форм редактирования профиля и добавления карточек
const profileEditImageButton = document.querySelector(
  ".profile__edit-image-button"
);
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

// Поиск элементов модального окна картинки
const popupCaption = document.querySelector(".popup__caption");
const popupImage = document.querySelector(".popup__image");

// Создание объекта колбэка для функции создания карточки
const callbackList = { deleteCard, likeCard, handleImageClick };

// Создание объекта настроек функции валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// --------------------------------------------------------------

// Обработчик события клика по кнопке открытя формы редактирования аватара профиля
profileEditImageButton.addEventListener("click", function () {
  // Вызов функии открытия модального окна
  openModal(popupTypeImageEdit);
});

// Обработчик события клика по кнопке открытя формы редактирования профиля
profileEditButton.addEventListener("click", function () {
  profileNameInput.value = nameProfile.textContent;
  profileDescriptionInput.value = descriptionProfile.textContent;
  // Вызов функции очистки ошибок валидации
  clearValidation(popupTypeEdit, validationConfig);
  // Вызов функии открытия модального окна
  openModal(popupTypeEdit);
});

// Обработчик события клика по кнопке открытия формы добавления карточки
profileAddButton.addEventListener("click", function () {
  // Вызов функии открытия модального окна
  openModal(popupTypeNewCard);
});

// --------------------------------------------------------------

// Обработчик закрытия модального окна по нажатию на оверлей или кнопку закрытия
popupList.forEach((popup) => {
  popup.addEventListener("mousedown", function (evt) {
    if (
      evt.target.classList.contains("popup_is-opened") ||
      evt.target.classList.contains("popup__close")
    ) {
      closeModal(popup);
    }
  });
});

// --------------------------------------------------------------

// Блок обработки ошибок
const blockCatch = (error) => {
  alert(`Ошибка: ${error}`);
  console.log(`Ошибка: ${error}`);
};

// Функция отправки формы редактирования аватара профиля
function handleFormEditImageProfileSubmit(evt) {
  // Отмена стандартной отправки формы
  evt.preventDefault();
  // Вызов функции ожидания ответа
  waitingResponse(true, formEditImageProfile);
  // Вызов функции редактирования аватара на сервере
  fetchPatchProfileImage(profileImgeUrlInput)
    .then((result) => {
      profileImage.style = `background-image: url(${result.avatar})`;
      // Закрытие модального окна редактирования аватара профиля
      closeModal(popupTypeImageEdit);
      // Сброс значений полей формы редактирования аватара профиля
      formEditImageProfile.reset();
    })
    .catch(blockCatch)
    .finally(() => {
      // Вызов функции ожидания ответа
      waitingResponse(false, formEditImageProfile);
    });
}

// Обработчик события отправки формы редактирования аватара профиля
formEditImageProfile.addEventListener(
  "submit",
  handleFormEditImageProfileSubmit
);

// --------------------------------------------------------------

// Функция отправки формы редактирования профиля
function handleFormEditProfileSubmit(evt) {
  // Отмена стандартной отправки формы
  evt.preventDefault();
  // Вызов функции ожидания ответа
  waitingResponse(true, formEditProfile);
  // Вызов функции редактирования данных профиля на серврере
  fetchPatchProfileData(profileNameInput, profileDescriptionInput)
    .then((result) => {
      nameProfile.textContent = result.name;
      descriptionProfile.textContent = result.about;
      // Закрытие модального окна редактирования профиля
      closeModal(popupTypeEdit);
    })
    .catch(blockCatch)
    .finally(() => {
      // Вызов функции ожидания ответа
      waitingResponse(false, formEditProfile);
    });
}

// Обработчик события отправки формы редактирования профиля
formEditProfile.addEventListener("submit", handleFormEditProfileSubmit);

// --------------------------------------------------------------

// Функция отправки формы добавления карточки
function handleFormNewPlace(evt) {
  // Отмена стандартной отправки формы
  evt.preventDefault();
  // Вызов функции ожидания ответа
  waitingResponse(true, formNewPlace);
  // Вызов функции создания карточки на серврере и отрисовка в DOM
  fetchPostNewCard(cardNameInput, cardUrlInput)
    .then((result) => {
      cardContainer.prepend(createCard(result[1], result[0], callbackList));
      // Закрытие модального окна добавления карточки
      closeModal(popupTypeNewCard);
      // Сброс значений полей формы добавления карточки
      formNewPlace.reset();
    })
    .catch(blockCatch)
    .finally(() => {
      // Вызов функции ожидания ответа
      waitingResponse(false, formNewPlace);
    });
}

// Обработчик события отправки формы добавления карточки
formNewPlace.addEventListener("submit", handleFormNewPlace);

// --------------------------------------------------------------

// Функция обработчика удаления карточки
function deleteCard(id, cardElement) {
  fetchDeleteCard(id)
    .then((res) => {
      if (res.ok) {
        removeElement(cardElement);
      }
    })
    .catch(blockCatch);
}

// Функция обработчика лайка
function likeCard(status, cardData, cardLikeButton, cardLikeButtonCounter) {
  if (!status) {
    fetchPutLikeCard(cardData)
      .then((res) => changeLike(cardLikeButton, cardLikeButtonCounter, res))
      .catch(blockCatch);
  } else {
    fetchDeleteLikeCard(cardData)
      .then((res) => changeLike(cardLikeButton, cardLikeButtonCounter, res))
      .catch(blockCatch);
  }
}

// Функция ожидания ответа
let formButtonTextDefault;
function waitingResponse(inWait, form) {
  const formButton = form.querySelector(".button");
  if (inWait) {
    formButtonTextDefault = formButton.textContent;
    formButton.textContent = "Сохранение...";
  } else if (!inWait) {
    formButton.textContent = formButtonTextDefault;
  }
}

// Функция обработчика клика по картинкам
function handleImageClick(cardImage) {
  popupCaption.textContent = cardImage.alt;
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  openModal(popupTypeImage);
}

// Вызов функции получения с сервера и отрисовка данных профиля и массива карточек
fetchProfileAndCardsData(cardContainer, createCard, callbackList)
  .then((result) => {
    profileImage.style = `background-image: url(${result[0].avatar})`;
    nameProfile.textContent = result[0].name;
    descriptionProfile.textContent = result[0].about;
    result[1].forEach(function (cardData) {
      // Вызов фунции создания карточки и добавление в DOM
      cardContainer.append(createCard(cardData, result[0], callbackList));
    });
  })
  .catch(blockCatch);

// Вызов функции добавления валидации
enableValidation(validationConfig);

// --------------------------------------------------------------
