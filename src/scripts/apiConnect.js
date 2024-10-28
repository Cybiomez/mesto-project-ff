// Мои данные для доступа к серверу
const myData = {
  cohort: "wff-cohort-25",
  token: "eff53e97-693a-49d3-ba0b-f139517f1f78",
};

// --------------------------------------------------------------

// Запрос к серверу для получения данных пользователя
const profileData = fetch(
  "https://nomoreparties.co/v1/wff-cohort-25/users/me",
  {
    method: "GET",
    headers: {
      authorization: "eff53e97-693a-49d3-ba0b-f139517f1f78",
    },
  }
).then((res) => res.json());

// Запрос к серверу для получения данных карточек
const cardData = fetch("https://nomoreparties.co/v1/wff-cohort-25/cards", {
  method: "GET",
  headers: {
    authorization: "eff53e97-693a-49d3-ba0b-f139517f1f78",
  },
}).then((res) => res.json());

// --------------------------------------------------------------

// Создание массива данных, полученных из запросов о пользователе и карточках
const getProfileAndCardData = Promise.all([profileData, cardData]);

// --------------------------------------------------------------

// Функция получения с свервера и подмены данных профиля
function editingProfileData(nameProfile, descriptionProfile) {
  profileData.then((result) => {
    nameProfile.textContent = result.name;
    descriptionProfile.textContent = result.about;
  });
}

// Функция получения с сервера и отрисовки массива карточек
function renderCards(cardContainer, createCard, callbackList) {
  getProfileAndCardData.then((result) => {
    result[1].forEach(function (cardData) {
      // Вызов фунции создания карточки и добавление в DOM
      cardContainer.append(createCard(cardData, result[0], callbackList));
    });
  });
}

// Функция редактирования данных профиля на серврере
function patchProfileData(profileNameInput, profileDescriptionInput) {
  fetch("https://nomoreparties.co/v1/wff-cohort-25/users/me", {
    method: "PATCH",
    headers: {
      authorization: "eff53e97-693a-49d3-ba0b-f139517f1f78",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: profileNameInput.value,
      about: profileDescriptionInput.value,
    }),
  });
}

// Функция создания карточки на сервере и ее отрисовки
function postNewCard(
  cardNameInput,
  cardUrlInput,
  cardContainer,
  createCard,
  callbackList
) {
  fetch("https://nomoreparties.co/v1/wff-cohort-25/cards", {
    method: "POST",
    headers: {
      authorization: "eff53e97-693a-49d3-ba0b-f139517f1f78",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: cardNameInput.value,
      link: cardUrlInput.value,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      cardContainer.prepend(
        createCard(result, profileData, callbackList)
      );
    });
}

// Функция удаления карточки на сервере


export { editingProfileData, renderCards, patchProfileData, postNewCard };
