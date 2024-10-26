const myData = {
  cohort: "wff-cohort-25",
  token: "eff53e97-693a-49d3-ba0b-f139517f1f78",
};

// Функция получения с свервера и подмены данных профиля
function getProfileData(nameProfile, descriptionProfile) {
  fetch("https://nomoreparties.co/v1/wff-cohort-25/users/me", {
    method: "GET",
    headers: {
      authorization: "eff53e97-693a-49d3-ba0b-f139517f1f78",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      nameProfile.textContent = result.name;
      descriptionProfile.textContent = result.about;
    });
}

// Функция получения с сервера и отрисовки массива карточек
function getCardsForRender(cardContainer, createCard, callbackList) {
  fetch("https://nomoreparties.co/v1/wff-cohort-25/cards", {
    method: "GET",
    headers: {
      authorization: "eff53e97-693a-49d3-ba0b-f139517f1f78",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      const cardArray = result;
      cardArray.forEach(function (cardData) {
        // Вызов фунции создания карточки и добавление в DOM
        cardContainer.append(createCard(cardData, callbackList));
      });
    });
}

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

export { getProfileData, getCardsForRender, patchProfileData };
