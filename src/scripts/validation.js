// Функция визуализации ошибки валидации поля ввода
function showInputError(
  formElement,
  inputElement,
  validationConfig,
  errorMessage
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  console.log(errorMessage);
  errorElement.classList.add(validationConfig.errorClass);
}

// Функция отклюения визуализации ошибки валидации поля ввода
function hideInputError(formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
}

// Функция проверки ошибкок валидации полей ввода
function checkInputValidity(formElement, inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      validationConfig,
      inputElement.validationMessage
    );
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}

// Функция проверки валидности полей ввода
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Функция изменения состояния кнопки
function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}

// Функция обработчика события ввода
function formEventListeners(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
}

// Функция добавления валидации
function enableValidation(validationConfig) {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    formEventListeners(formElement, validationConfig);
  });
}

// Функции очистки ошибок валидации
function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  inputList.forEach((inputElement) =>
    hideInputError(formElement, inputElement, validationConfig)
  );
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
}

// Экспорт функций добавления и очистки ошибок валидации
export { enableValidation, clearValidation };
