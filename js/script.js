'use strict';

// Promo slider
const sliderList = document.querySelector('.slider-list');
const slides = sliderList.querySelectorAll('.slider-item');
const sliderNavList = document.querySelector('.slider-nav-list');
const sliderNavButtons = sliderNavList.querySelectorAll('.slider-nav-button');

const switchSlides = (evt) => {
  const targetButton = evt.target.closest('.slider-nav-button');
  const currentButton = sliderNavList.querySelector('.slider-nav-button-current');
  const currentSlide = sliderList.querySelector('.slider-item-current');
  
  let targetIndex = 0;
  
  for (let i = 0; i < sliderNavButtons.length; i++) {
    if (sliderNavButtons[i] === targetButton) {
      targetIndex = i;
    }
  }
  
  const targetSlide = slides[targetIndex];

  currentButton.classList.remove('slider-nav-button-current');
  currentSlide.classList.remove('slider-item-current');
  targetButton.classList.add('slider-nav-button-current');
  targetSlide.classList.add('slider-item-current');
};

sliderNavList.addEventListener('click', evt => {
  if (evt.target.closest('.slider-nav-button') && !evt.target.closest('.slider-nav-button-current')) {
    switchSlides(evt);
  }
});

// Services slider

const servicesList = document.querySelector('.services-list');
const services = servicesList.querySelectorAll('.services-item');
const servicesNavList = document.querySelector('.services-nav-list');
const servicesNavButtons = servicesNavList.querySelectorAll('.services-button');

const switchServices = (evt) => {
  const targetButton = evt.target.closest('.services-button');
  const targetNavItem = targetButton.closest('.services-nav-item');
  const currentNavItem = servicesNavList.querySelector('.services-nav-item-current');
  const currentButton = currentNavItem.querySelector('.services-button-current');
  const currentService = servicesList.querySelector('.services-item-current');

  let targetIndex = 0;
  
  for (let i = 0; i < servicesNavButtons.length; i++) {
    if (servicesNavButtons[i] === targetButton) {
      targetIndex = i;
    }
  }
  
  const targetService = services[targetIndex];

  currentButton.classList.remove('services-button-current');
  currentNavItem.classList.remove('services-nav-item-current');
  currentService.classList.remove('services-item-current');
  targetButton.classList.add('services-button-current');
  targetNavItem.classList.add('services-nav-item-current');
  targetService.classList.add('services-item-current');
};

servicesNavList.addEventListener('click', evt => {
  if (evt.target.closest('.services-button') && !evt.target.closest('.services-button-current')) {
    switchServices(evt);
  }
});

// Map popup 

const linkMap = document.querySelector('.contacts-map');
const popupMap = document.querySelector('.modal-wrap-map');
const mapUnderlay = popupMap.querySelector('.modal-underlay-map');
const mapClose = popupMap.querySelector('.button-close-map');

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

// Mail popup

const linkMail = document.querySelector('.info-link-mail');
const mailWrap = document.querySelector('.modal-wrap-mail');
const mailUnderlay = mailWrap.querySelector('.modal-underlay-mail');
const mailModal = mailWrap.querySelector('.modal-mail');
const mailClose = mailModal.querySelector('.button-close-mail');
const mailForm = mailModal.querySelector('.mail-form');
const mailInputs = mailForm.querySelectorAll('.mail-input');
const mailName = mailForm.querySelector('.mail-input-name');
const mailSubmit = mailForm.querySelector('.mail-submit');

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
