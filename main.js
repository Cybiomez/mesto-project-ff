(()=>{"use strict";function e(e,t,n){var o=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),r=o.querySelector(".card__title"),c=o.querySelector(".card__image"),a=o.querySelector(".card__like-button_counter"),i=o.querySelector(".card__delete-button"),u=o.querySelector(".card__like-button");return r.textContent=e.name,c.src=e.link,c.alt=e.name,a.textContent=e.likes.length,e.owner._id!==t._id&&i.classList.add("card__delete-button_unavailable"),e.likes.forEach((function(e){e._id.includes("".concat(t._id))&&u.classList.add("card__like-button_is-active")})),i.addEventListener("click",(function(){return n.deleteCard(e._id).then(o.remove())})),u.addEventListener("click",(function(){return n.likeCard(u,e).then((function(e){u.classList.toggle("card__like-button_is-active"),a.textContent=e.likes.length}))})),c.addEventListener("click",(function(){return n.handleImageClick(c)})),o}function t(e){e.classList.add("popup_is-opened"),document.addEventListener("keyup",o)}function n(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keyup",o)}function o(e){"Escape"===e.key&&n(document.querySelector(".popup_is-opened"))}function r(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.classList.remove(n.inactiveButtonClass):t.classList.add(n.inactiveButtonClass)}function c(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){var o=e.querySelector(".".concat(n.id,"-error"));n.classList.remove(t.inputErrorClass),o.classList.remove(t.errorClass),o.textContent=""})),o.classList.add(t.inactiveButtonClass)}var a,i="https://nomoreparties.co/v1/wff-cohort-25",u="eff53e97-693a-49d3-ba0b-f139517f1f78",l=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},s=function(e){console.log(console.log("Ошибка: ".concat(e)))},d=fetch("".concat(i,"/users/me"),{method:"GET",headers:{authorization:u}}).then(l).catch(s),p=fetch("".concat(i,"/cards"),{method:"GET",headers:{authorization:u}}).then(l).catch(s),_=document.querySelector(".profile__image"),f=document.querySelector(".profile__title"),m=document.querySelector(".profile__description"),y=document.querySelector(".places__list"),h=Array.from(document.querySelectorAll(".popup")),v=document.querySelector(".popup_type_new-image"),S=document.querySelector(".popup_type_edit"),C=document.querySelector(".popup_type_new-card"),q=document.querySelector(".popup_type_image"),b=document.forms["new-image"],E=document.forms["edit-profile"],L=document.forms["new-place"],g=document.querySelector(".popup__input_type_url-profile-image"),k=document.querySelector(".popup__input_type_name"),x=document.querySelector(".popup__input_type_description"),T=document.querySelector(".popup__input_type_card-name"),A=document.querySelector(".popup__input_type_url-card"),z=document.querySelector(".profile__edit-image-button"),w=document.querySelector(".profile__edit-button"),B=document.querySelector(".profile__add-button"),P=document.querySelector(".popup__caption"),D=document.querySelector(".popup__image"),j={deleteCard:function(e){return fetch("".concat(i,"/cards/").concat(e),{method:"DELETE",headers:{authorization:u}}).then(l).catch(s)},likeCard:function(e,t){return e.classList.contains("card__like-button_is-active")?fetch("".concat(i,"/cards/likes/").concat(t._id),{method:"DELETE",headers:{authorization:u}}).then(l).catch(s):fetch("".concat(i,"/cards/likes/").concat(t._id),{method:"PUT",headers:{authorization:u}}).then(l).catch(s)},handleImageClick:function(e){P.textContent=e.alt,D.src=e.src,D.alt=e.alt,t(q)}},N={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function O(e,t){var n=t.querySelector(".button");e?(a=n.textContent,n.textContent="Сохранение..."):e||(n.textContent=a)}z.addEventListener("click",(function(){t(v)})),w.addEventListener("click",(function(){k.value=f.textContent,x.value=m.textContent,c(S,N),t(S)})),B.addEventListener("click",(function(){t(C)})),h.forEach((function(e){e.addEventListener("mousedown",(function(t){(t.target.classList.contains("popup_is-opened")||t.target.classList.contains("popup__close"))&&n(e)}))})),b.addEventListener("submit",(function(e){e.preventDefault(),O(!0,b),function(e){return fetch("".concat(i,"/users/me/avatar "),{method:"PATCH",headers:{authorization:u,"Content-Type":"application/json"},body:JSON.stringify({avatar:e.value})}).then(l).catch(s)}(g).then((function(e){_.style="background-image: url(".concat(e.avatar,")")})).finally((function(){O(!1,b),n(v),b.reset(),c(v,N)}))})),E.addEventListener("submit",(function(e){e.preventDefault(),O(!0,E),function(e,t){return fetch("".concat(i,"/users/me"),{method:"PATCH",headers:{authorization:u,"Content-Type":"application/json"},body:JSON.stringify({name:e.value,about:t.value})}).then(l).catch(s)}(k,x).then((function(e){f.textContent=e.name,m.textContent=e.about})).finally((function(){O(!1,E),n(S),c(S,N)}))})),L.addEventListener("submit",(function(t){t.preventDefault(),O(!0,L),function(e,t){var n=fetch("".concat(i,"/cards"),{method:"POST",headers:{authorization:u,"Content-Type":"application/json"},body:JSON.stringify({name:e.value,link:t.value})}).then(l).catch(s);return Promise.all([d,n])}(T,A).then((function(t){y.prepend(e(t[1],t[0],j))})).finally((function(){O(!1,L),n(C),L.reset(),c(S,N)}))})),d.then((function(e){_.style="background-image: url(".concat(e.avatar,")"),f.textContent=e.name,m.textContent=e.about})),Promise.all([d,p]).then((function(t){t[1].forEach((function(n){y.append(e(n,t[0],j))}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);r(n,o,t),n.forEach((function(c){c.addEventListener("input",(function(){(function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""}(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),r.textContent=o,console.log(o),r.classList.add(n.errorClass)}(e,t,n,t.validationMessage)})(e,c,t),r(n,o,t)}))}))}(t,e)}))}(N)})();