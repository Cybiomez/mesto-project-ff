// Импорт главного файла стилей
import "../pages/index.css";
// Импорт массива данных карточек и функций управления ими
import { createCard, deleteCard, likeCard } from "./cards.js";
// Импорт функций и обработчиков попапов
import { openModal, closeModal } from "./modal.js";
// Импорт массива с данными для карточек
import { initialCards } from "./initialCards.js";
// Рендер карточек из сассива

// --------------------------------------------------------------

// Поиск контейнера для карточек
const cardList = document.querySelector(".places__list");

// Поиск попапов
const popups = document.querySelectorAll(".popup");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");

// Поиск формы редактирования профиля в DOM
const formEditProfile = document.forms["edit-profile"];
// Поиск полей формы редактирования профиля в DOM
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

// Поиск формы добавления карточек в DOM
const formNewPlace = document.forms["new-place"];
// Поиск полей формы добавления карточек в DOM
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const urlInput = document.querySelector(".popup__input_type_url");

// Поиск кнопок отправки форм
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

// Поиск элементов попапа картинки
const popupCaption = document.querySelector(".popup__caption");
const popupImage = document.querySelector(".popup__image");

// Создание объекта колбэка карточки
const callbacks = { deleteCard, likeCard, handleImageClick };

// --------------------------------------------------------------

// Обработчик клика по кнопке отправки формы редактирования профиля
profileEditButton.addEventListener("click", function () {
  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__description").textContent;
  openModal(popupTypeEdit);
});

// Обработчик клика по кнопке отправки формы добавления карточки
profileAddButton.addEventListener("click", function () {
  openModal(popupTypeNewCard);
});

// --------------------------------------------------------------

// Обработчик закрытия попапа по нажатию на оверлей или кнопку закрытия
popups.forEach((popup) => {
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
  const nameOutput = document.querySelector(".profile__title");
  const jobOutput = document.querySelector(".profile__description");
  // Присвоение новых значений из полей формы редактирования профиля
  nameOutput.textContent = nameInput.value;
  jobOutput.textContent = jobInput.value;
  // Закрытие попапа редактирования профиля
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
  initialCards.link = urlInput.value;
  const cardName = initialCards.name;
  const cardLink = initialCards.link;
  // Вызов функции создания карточки и добавление в DOM
  cardList.prepend(createCard({ name: cardName, link: cardLink }, callbacks));
  // Закрытие попапа добавления карточки
  closeModal(popupTypeNewCard);
  // Сброс значений полей формы добавления карточки
  formNewPlace.reset();
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
    cardList.append(createCard(cardData, callbacks));
  });
}

// Вызов функции отрисовки карточек из массива
renderCards();
