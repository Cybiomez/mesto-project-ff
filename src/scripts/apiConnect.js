// Мои данные для доступа к серверу
const myData = {
  cohortUrl: "https://nomoreparties.co/v1/wff-cohort-25",
  token: "eff53e97-693a-49d3-ba0b-f139517f1f78",
};

// --------------------------------------------------------------

// Запрос к серверу для получения данных пользователя
const profileData = fetch(`${myData.cohortUrl}/users/me`, {
  method: "GET",
  headers: {
    authorization: myData.token,
  },
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    // Если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((error) => {
    console.log(console.log(`Ошибка: ${error}`));
  });

// Запрос к серверу для получения данных карточек
const cardData = fetch(`${myData.cohortUrl}/cards`, {
  method: "GET",
  headers: {
    authorization: myData.token,
  },
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    // Если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((error) => {
    console.log(console.log(`Ошибка: ${error}`));
  });

// --------------------------------------------------------------

// Функция получения с свервера и подмены данных профиля
function editingProfileData(profileImage, nameProfile, descriptionProfile) {
  profileData.then((result) => {
    profileImage.style = `background-image: url(${result.avatar})`;
    nameProfile.textContent = result.name;
    descriptionProfile.textContent = result.about;
  });
}

// Функция получения с сервера и отрисовки массива карточек
function renderCards(cardContainer, createCard, callbackList) {
  Promise.all([profileData, cardData]).then((result) => {
    result[1].forEach(function (cardData) {
      // Вызов фунции создания карточки и добавление в DOM
      cardContainer.append(createCard(cardData, result[0], callbackList));
    });
  });
}

// --------------------------------------------------------------

// Функция редактирования аватара профиля на серврере
function patchProfileImage(profileImage, profileImgeUrlInput) {
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
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      // Если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      profileImage.style = `background-image: url(${result.avatar})`;
    })
    .catch((error) => {
      console.log(console.log(`Ошибка: ${error}`));
    });
}

// Функция редактирования данных профиля на серврере
function patchProfileData(
  nameProfile,
  descriptionProfile,
  profileNameInput,
  profileDescriptionInput
) {
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
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      // Если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      nameProfile.textContent = result.name;
      descriptionProfile.textContent = result.about;
    })
    .catch((error) => {
      console.log(console.log(`Ошибка: ${error}`));
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
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      // Если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((error) => {
      console.log(console.log(`Ошибка: ${error}`));
    });
  return Promise.all([profileData, postCard]).then((result) => {
    cardContainer.prepend(createCard(result[1], result[0], callbackList));
  });
}

// Функция обработчика удаления карточки
function deleteCard(cardElement, id) {
  fetch(`${myData.cohortUrl}/cards/${id}`, {
    method: "DELETE",
    headers: {
      authorization: myData.token,
    },
  }).then(cardElement.remove());
}

// Функция обработчика лайка
function likeCard(cardLikeButton, cardLikeButtonCounter, cardData) {
  if (cardLikeButton.classList.contains("card__like-button_is-active")) {
    fetch(`${myData.cohortUrl}/cards/likes/${cardData._id}`, {
      method: "DELETE",
      headers: {
        authorization: myData.token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // Если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        cardLikeButton.classList.toggle("card__like-button_is-active");
        cardLikeButtonCounter.textContent = res.likes.length;
      })
      .catch((error) => {
        console.log(console.log(`Ошибка: ${error}`));
      });
  } else {
    fetch(`${myData.cohortUrl}/cards/likes/${cardData._id}`, {
      method: "PUT",
      headers: {
        authorization: myData.token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // Если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        cardLikeButton.classList.toggle("card__like-button_is-active");
        cardLikeButtonCounter.textContent = res.likes.length;
      })
      .catch((error) => {
        console.log(console.log(`Ошибка: ${error}`));
      });
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
