(()=>{"use strict";function t(t,e,n){var o=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),r=o.querySelector(".card__title"),c=o.querySelector(".card__image"),a=o.querySelector(".card__like-button_counter"),i=o.querySelector(".card__delete-button"),u=o.querySelector(".card__like-button");return r.textContent=t.name,c.src=t.link,c.alt=t.name,a.textContent=t.likes.length,t.owner._id!==e._id&&i.classList.add("card__delete-button_unavailable"),t.likes.forEach((function(t){t._id.includes("".concat(e._id))&&u.classList.add("card__like-button_is-active")})),i.addEventListener("click",(function(){return n.deleteCard(t._id,o)})),u.addEventListener("click",(function(){return n.likeCard(function(t){return t.classList.contains("card__like-button_is-active")}(u),t,u,a)})),c.addEventListener("click",(function(){return n.handleImageClick(c)})),o}function e(t,e,n){t.classList.toggle("card__like-button_is-active"),e.textContent=n.likes.length}function n(t){t.classList.add("popup_is-opened"),document.addEventListener("keyup",r)}function o(t){t.classList.remove("popup_is-opened"),document.removeEventListener("keyup",r)}function r(t){"Escape"===t.key&&o(document.querySelector(".popup_is-opened"))}function c(t,e,n){var o=t.querySelector(".".concat(e.id,"-error"));e.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""}function a(t,e,n){!function(t){return t.some((function(t){return!t.validity.valid}))}(t)?e.classList.remove(n.inactiveButtonClass):e.classList.add(n.inactiveButtonClass)}var i="https://nomoreparties.co/v1/wff-cohort-25",u="eff53e97-693a-49d3-ba0b-f139517f1f78",l=function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))},s=fetch("".concat(i,"/users/me"),{method:"GET",headers:{authorization:u}}).then(l),d=fetch("".concat(i,"/cards"),{method:"GET",headers:{authorization:u}}).then(l),p=document.querySelector(".profile__image"),f=document.querySelector(".profile__title"),_=document.querySelector(".profile__description"),m=document.querySelector(".places__list"),y=Array.from(document.querySelectorAll(".popup")),h=document.querySelector(".popup_type_new-image"),v=document.querySelector(".popup_type_edit"),S=document.querySelector(".popup_type_new-card"),C=document.querySelector(".popup_type_image"),q=document.forms["new-image"],b=document.forms["edit-profile"],E=document.forms["new-place"],L=document.querySelector(".popup__input_type_url-profile-image"),k=document.querySelector(".popup__input_type_name"),g=document.querySelector(".popup__input_type_description"),x=document.querySelector(".popup__input_type_card-name"),T=document.querySelector(".popup__input_type_url-card"),A=document.querySelector(".profile__edit-image-button"),z=document.querySelector(".profile__edit-button"),w=document.querySelector(".profile__add-button"),B=document.querySelector(".popup__caption"),P=document.querySelector(".popup__image"),D={deleteCard:function(t,e){(function(t){return fetch("".concat(i,"/cards/").concat(t),{method:"DELETE",headers:{authorization:u}})})(t).then((function(t){t.ok&&function(t){t.remove()}(e)})).catch(O)},likeCard:function(t,n,o,r){t?function(t){return fetch("".concat(i,"/cards/likes/").concat(t._id),{method:"DELETE",headers:{authorization:u}}).then(l)}(n).then((function(t){return e(o,r,t)})).catch(O):function(t){return fetch("".concat(i,"/cards/likes/").concat(t._id),{method:"PUT",headers:{authorization:u}}).then(l)}(n).then((function(t){return e(o,r,t)})).catch(O)},handleImageClick:function(t){B.textContent=t.alt,P.src=t.src,P.alt=t.alt,n(C)}},j={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};A.addEventListener("click",(function(){n(h)})),z.addEventListener("click",(function(){k.value=f.textContent,g.value=_.textContent,function(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector)),o=t.querySelector(e.submitButtonSelector);n.forEach((function(n){return c(t,n,e)})),o.classList.add(e.inactiveButtonClass)}(v,j),n(v)})),w.addEventListener("click",(function(){n(S)})),y.forEach((function(t){t.addEventListener("mousedown",(function(e){(e.target.classList.contains("popup_is-opened")||e.target.classList.contains("popup__close"))&&o(t)}))}));var N,O=function(t){alert("Ошибка: ".concat(t)),console.log("Ошибка: ".concat(t))};function J(t,e){var n=e.querySelector(".button");t?(N=n.textContent,n.textContent="Сохранение..."):t||(n.textContent=N)}q.addEventListener("submit",(function(t){t.preventDefault(),J(!0,q),function(t){return fetch("".concat(i,"/users/me/avatar "),{method:"PATCH",headers:{authorization:u,"Content-Type":"application/json"},body:JSON.stringify({avatar:t.value})}).then(l)}(L).then((function(t){p.style="background-image: url(".concat(t.avatar,")"),o(h),q.reset()})).catch(O).finally((function(){J(!1,q)}))})),b.addEventListener("submit",(function(t){t.preventDefault(),J(!0,b),function(t,e){return fetch("".concat(i,"/users/me"),{method:"PATCH",headers:{authorization:u,"Content-Type":"application/json"},body:JSON.stringify({name:t.value,about:e.value})}).then(l)}(k,g).then((function(t){f.textContent=t.name,_.textContent=t.about,o(v)})).catch(O).finally((function(){J(!1,b)}))})),E.addEventListener("submit",(function(e){e.preventDefault(),J(!0,E),function(t,e){var n=fetch("".concat(i,"/cards"),{method:"POST",headers:{authorization:u,"Content-Type":"application/json"},body:JSON.stringify({name:t.value,link:e.value})}).then(l);return Promise.all([s,n])}(x,T).then((function(e){m.prepend(t(e[1],e[0],D)),o(S),E.reset()})).catch(O).finally((function(){J(!1,E)}))})),Promise.all([s,d]).then((function(e){p.style="background-image: url(".concat(e[0].avatar,")"),f.textContent=e[0].name,_.textContent=e[0].about,e[1].forEach((function(n){m.append(t(n,e[0],D))}))})).catch(O),function(t){Array.from(document.querySelectorAll(t.formSelector)).forEach((function(e){e.addEventListener("submit",(function(t){t.preventDefault()})),function(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector)),o=t.querySelector(e.submitButtonSelector);a(n,o,e),n.forEach((function(r){r.addEventListener("input",(function(){(function(t,e,n){e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity(""),e.validity.valid?c(t,e,n):function(t,e,n,o){var r=t.querySelector(".".concat(e.id,"-error"));e.classList.add(n.inputErrorClass),r.textContent=o,console.log(o),r.classList.add(n.errorClass)}(t,e,n,e.validationMessage)})(t,r,e),a(n,o,e)}))}))}(e,t)}))}(j)})();