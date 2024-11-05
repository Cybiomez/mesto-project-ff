// Мои данные для доступа к серверу
const myData = {
  cohortUrl: "https://nomoreparties.co/v1/wff-cohort-25",
  token: "eff53e97-693a-49d3-ba0b-f139517f1f78",
};

// --------------------------------------------------------------

// Блок проверки и преобразования
const pasteBlockVerificationAndConversion = (res) => {
  if (res.ok) {
    return res.json();
  }
  // Если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
};

// --------------------------------------------------------------

// Запрос к серверу для получения данных пользователя
const getProfileData = fetch(`${myData.cohortUrl}/users/me`, {
  method: "GET",
  headers: {
    authorization: myData.token,
  },
}).then(pasteBlockVerificationAndConversion);

// Запрос к серверу для получения данных карточек
const getCardData = fetch(`${myData.cohortUrl}/cards`, {
  method: "GET",
  headers: {
    authorization: myData.token,
  },
}).then(pasteBlockVerificationAndConversion);

// --------------------------------------------------------------

// Функция получения с сервера данных профиля и массива карточек
function fetchProfileAndCardsData() {
  return Promise.all([getProfileData, getCardData]);
}

// --------------------------------------------------------------

// Функция редактирования аватара профиля на серврере
function fetchPatchProfileImage(profileImgeUrlInput) {
  return fetch(`${myData.cohortUrl}/users/me/avatar `, {
    method: "PATCH",
    headers: {
      authorization: myData.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: profileImgeUrlInput.value,
    }),
  }).then(pasteBlockVerificationAndConversion);
}

// Функция редактирования данных профиля на серврере
function fetchPatchProfileData(profileNameInput, profileDescriptionInput) {
  return fetch(`${myData.cohortUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: myData.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: profileNameInput.value,
      about: profileDescriptionInput.value,
    }),
  }).then(pasteBlockVerificationAndConversion);
}

// Функция создания карточки на сервере и ее отрисовки
function fetchPostNewCard(cardNameInput, cardUrlInput) {
  return fetch(`${myData.cohortUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: myData.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: cardNameInput.value,
      link: cardUrlInput.value,
    }),
  }).then(pasteBlockVerificationAndConversion);
}

// Функция удаления карточки
function fetchDeleteCard(id) {
  return fetch(`${myData.cohortUrl}/cards/${id}`, {
    method: "DELETE",
    headers: {
      authorization: myData.token,
    },
  });
}

// Функция постановки лайка
function fetchPutLikeCard(cardData) {
  return fetch(`${myData.cohortUrl}/cards/likes/${cardData._id}`, {
    method: "PUT",
    headers: {
      authorization: myData.token,
    },
  }).then(pasteBlockVerificationAndConversion);
}

// Функция удаления лайка
function fetchDeleteLikeCard(cardData) {
  return fetch(`${myData.cohortUrl}/cards/likes/${cardData._id}`, {
    method: "DELETE",
    headers: {
      authorization: myData.token,
    },
  }).then(pasteBlockVerificationAndConversion);
}

export {
  fetchProfileAndCardsData,
  fetchPatchProfileImage,
  fetchPatchProfileData,
  fetchPostNewCard,
  fetchDeleteCard,
  fetchPutLikeCard,
  fetchDeleteLikeCard,
};
