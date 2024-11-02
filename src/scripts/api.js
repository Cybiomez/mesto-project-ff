// Мои данные для доступа к серверу
const myData = {
  cohortUrl: "https://nomoreparties.co/v1/wff-cohort-25",
  token: "eff53e97-693a-49d3-ba0b-f139517f1f78",
};

// --------------------------------------------------------------

// Блок проверки и преобразования
const blockVerificationAndConversion = (res) => {
  if (res.ok) {
    return res.json();
  }
  // Если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Блок обработки ошибок
const blockCatch = (error) => {
  console.log(console.log(`Ошибка: ${error}`));
};

// --------------------------------------------------------------

// Запрос к серверу для получения данных пользователя
const getProfileData = fetch(`${myData.cohortUrl}/users/me`, {
  method: "GET",
  headers: {
    authorization: myData.token,
  },
})
  .then(blockVerificationAndConversion)
  .catch(blockCatch);

// Запрос к серверу для получения данных карточек
const getCardData = fetch(`${myData.cohortUrl}/cards`, {
  method: "GET",
  headers: {
    authorization: myData.token,
  },
})
  .then(blockVerificationAndConversion)
  .catch(blockCatch);



// --------------------------------------------------------------

// Функция получения с свервера данных профиля
function editingProfileData() {
  return getProfileData;
}

// Функция получения с сервера массива карточек
function renderCards() {
  return Promise.all([getProfileData, getCardData]);
}

// --------------------------------------------------------------

// Функция редактирования аватара профиля на серврере
function patchProfileImage(profileImgeUrlInput) {
  return fetch(`${myData.cohortUrl}/users/me/avatar `, {
    method: "PATCH",
    headers: {
      authorization: myData.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: profileImgeUrlInput.value,
    }),
  })
    .then(blockVerificationAndConversion)
    .catch(blockCatch);
}

// Функция редактирования данных профиля на серврере
function patchProfileData(profileNameInput, profileDescriptionInput) {
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
  })
    .then(blockVerificationAndConversion)
    .catch(blockCatch);
}

// Функция создания карточки на сервере и ее отрисовки
function postNewCard(cardNameInput, cardUrlInput) {
  const postCard = fetch(`${myData.cohortUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: myData.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: cardNameInput.value,
      link: cardUrlInput.value,
    }),
  })
    .then(blockVerificationAndConversion)
    .catch(blockCatch);
  return Promise.all([getProfileData, postCard]);
}

// Функция обработчика удаления карточки
function deleteCard(id) {
  return fetch(`${myData.cohortUrl}/cards/${id}`, {
    method: "DELETE",
    headers: {
      authorization: myData.token,
    },
  })
    .then(blockVerificationAndConversion)
    .catch(blockCatch);
}

// Функция обработчика лайка
function likeCard(cardLikeButton, cardData) {
  if (cardLikeButton.classList.contains("card__like-button_is-active")) {
    return fetch(`${myData.cohortUrl}/cards/likes/${cardData._id}`, {
      method: "DELETE",
      headers: {
        authorization: myData.token,
      },
    })
      .then(blockVerificationAndConversion)
      .catch(blockCatch);
  } else {
    return fetch(`${myData.cohortUrl}/cards/likes/${cardData._id}`, {
      method: "PUT",
      headers: {
        authorization: myData.token,
      },
    })
      .then(blockVerificationAndConversion)
      .catch(blockCatch);
  }
}

export {
  editingProfileData,
  renderCards,
  patchProfileImage,
  patchProfileData,
  postNewCard,
  deleteCard,
  likeCard,
};
