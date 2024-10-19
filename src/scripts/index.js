// Импорт главного файла стилей
import "../pages/index.css";
// Импорт функций создания, уаления и лайка карточек
import { createCard, deleteCard, likeCard } from "./cards.js";
// Импорт функций открытия и закрытия модальных окон
import { openModal, closeModal } from "./modal.js";
// Импорт массива с данными для начальных карточек
import { initialCards } from "./initialCards.js";
// Импорт функций добавления и очистки валидации
import { enableValidation, clearValidation } from "./validation.js";

// --------------------------------------------------------------

// Поиск контейнера для карточек
const cardContainer = document.querySelector(".places__list");

// Поиск заголовка и описания профиля
const nameProfile = document.querySelector(".profile__title");
const descriptionProfile = document.querySelector(".profile__description");

// Поиск модальных окон
const popupList = Array.from(document.querySelectorAll(".popup"));
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");

// Поиск форм редактирования профиля и добавления карточек
const formEditProfile = document.forms["edit-profile"];
const formNewPlace = document.forms["new-place"];

// Поиск полей форм редактирования профиля и добавления карточек
const profileNameInput = document.querySelector(".popup__input_type_name");
const profileDescriptionInput = document.querySelector(".popup__input_type_description");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardUrlInput = document.querySelector(".popup__input_type_url");

// Поиск кнопок отправки форм редактирования профиля и добавления карточек
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

// Поиск элементов модального окна картинки
const popupCaption = document.querySelector(".popup__caption");
const popupImage = document.querySelector(".popup__image");

// Создание объекта колбэка для функции создания карточки
const callbackList = { deleteCard, likeCard, handleImageClick };

// Создание объекта настроек функции валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// --------------------------------------------------------------

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

// Функция отправки формы редактирования профиля
function handleFormEditProfileSubmit(evt) {
  // Отмена стандартной отправки формы
  evt.preventDefault();
  // Поиск полей формы редактирования профиля на странице
  const nameOutput = nameProfile;
  const jobOutput = descriptionProfile;
  // Присвоение новых значений из полей формы редактирования профиля
  nameOutput.textContent = profileNameInput.value;
  jobOutput.textContent = profileDescriptionInput.value;
  // Закрытие модального окна редактирования профиля
  closeModal(popupTypeEdit);
}

// Обработчик события отправки формы редактирования профиля
formEditProfile.addEventListener("submit", handleFormEditProfileSubmit);

// --------------------------------------------------------------

// Функция отправки формы добавления карточки
function handleFormNewPlace(evt) {
  // Отмена стандартной отправки формы
  evt.preventDefault();
  // Определение значений для добавления карточки
  initialCards.name = cardNameInput.value;
  initialCards.link = cardUrlInput.value;
  const cardName = initialCards.name;
  const cardLink = initialCards.link;
  // Вызов функции создания карточки и добавление в DOM
  cardContainer.prepend(createCard({ name: cardName, link: cardLink }, callbackList));
  // Закрытие модального окна добавления карточки
  closeModal(popupTypeNewCard);
  // Сброс значений полей формы добавления карточки
  formNewPlace.reset();
  // Вызов функции очистки ошибок валидации
  clearValidation(popupTypeEdit, validationConfig);
}

// Обработчик события отправки формы добавления карточки
formNewPlace.addEventListener("submit", handleFormNewPlace);

// --------------------------------------------------------------

// Функция обработчика клика по картинкам
function handleImageClick(cardImage) {
  popupCaption.textContent = cardImage.alt;
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  openModal(popupTypeImage);
}

// Функция отрисовки карточек из масива
function renderCards() {
  initialCards.forEach(function (cardData) {
    // Вызов фунции создания карточки и добавление в DOM
    cardContainer.append(createCard(cardData, callbackList));
  });
}

// Вызов функции отрисовки карточек из массива
renderCards();

// Вызов функции добавления валидации
enableValidation(validationConfig); 