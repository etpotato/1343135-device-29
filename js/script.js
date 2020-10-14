'use strict';

const linkMap = document.querySelector('.contacts-map');
const popupMap = document.querySelector('.modal-wrap-map');
const mapUnderlay = popupMap.querySelector('.modal-underlay-map');
const mapClose = popupMap.querySelector('.button-close-map');

const linkMail = document.querySelector('.info-link-mail');
const mailWrap = document.querySelector('.modal-wrap-mail');
const mailUnderlay = mailWrap.querySelector('.modal-underlay-mail');
const mailModal = mailWrap.querySelector('.modal-mail');
const mailClose = mailModal.querySelector('.button-close-mail');
const mailForm = mailModal.querySelector('.mail-form');
const mailInputs = mailForm.querySelectorAll('.mail-input');
const mailName = mailForm.querySelector('.mail-input-name');
const mailEmail = mailForm.querySelector('.mail-input-email');
const mailMessage = mailForm.querySelector('.mail-input-message');
const mailSubmit = mailForm.querySelector('.mail-submit');

// Open map popup
linkMap.addEventListener('click', (evt) => {
  evt.preventDefault();
  popupMap.classList.add('modal-wrap-show');
});

// Close map popup with close button
mapClose.addEventListener('click', (evt) => {
  evt.preventDefault();
  popupMap.classList.remove('modal-wrap-show');
});

// Close map popup with click on underlay
mapUnderlay.addEventListener('click', () => {
  popupMap.classList.remove('modal-wrap-show');  
});

// Close map popup with ESC
window.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27 || evt.keyCode === 'Escape') {
    if (popupMap.classList.contains('modal-wrap-show')) {
      popupMap.classList.remove('modal-wrap-show');  
    }
  }
});

// is localStorage supported?
let storageName = '';
let isStorageSupport = true;

try {
  storageName = localStorage.getItem('name');
} catch (err) {
  isStorageSupport = false;
}

// Open mail form popup
linkMail.addEventListener('click', (evt) => {
  evt.preventDefault();
  mailWrap.classList.add('modal-wrap-show');
  
  // Autofill inputs
  if (isStorageSupport) {
    for (let i = 0; i < mailInputs.length; i++) {
      let mailInputName = mailInputs[i].getAttribute('name');
      let mailInputValue = localStorage.getItem(mailInputName); 
      mailInputs[i].value = mailInputValue;
    }
  }

  // Focus on empty input
  for (let j = 0; j < mailInputs.length; j++) {
    if (!mailInputs[j].value) {
      mailInputs[j].focus();
      break;
    } else if (j === mailInputs.length - 1) {
      mailInputs[j].focus();
    }
  }

  mailForm.noValidate = true;
});

// Submit form
mailForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  mailSubmit.blur();
  mailForm.classList.add('mail-form-check');
  mailModal.classList.remove('modal-mail-error');

  // Save valid input values in localStorage
  if (isStorageSupport) {
    for (let i = 0; i < mailInputs.length - 1; i++) {
      if (mailInputs[i].checkValidity()) {
        let mailInputName = mailInputs[i].getAttribute('name');
        localStorage.setItem(mailInputName, mailInputs[i].value);
      }
    }
  }

  // Focus on invalid input
  for (let mailInput of mailInputs) {
    if (!mailInput.checkValidity()) {
      mailInput.focus();
      mailModal.classList.add('modal-mail-error');
      break;
    }
  }
});

// Close mail popup
let closePopupMail = () => {
  mailWrap.classList.remove('modal-wrap-show');
  mailModal.classList.remove('modal-mail-error');
  mailForm.classList.remove('mail-form-check');
  mailForm.reset();
}

// Close with close button
mailClose.addEventListener('click', (evt) => {
  evt.preventDefault();
  closePopupMail();
});

// Close with click on wrapper
mailUnderlay.addEventListener('click', () => {
  closePopupMail();
});

// Close with ESC
window.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27 || evt.keyCode === 'Escape') {
    if (mailWrap.classList.contains('modal-wrap-show')) {
      closePopupMail();
    }
  }
});