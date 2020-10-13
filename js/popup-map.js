'use strict';

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

/* 
// Вариант с делегированием
popupMap.addEventListener('click', (evt) => {
  if (evt.target === mapUnderlay || evt.target === mapClose) {
    evt.preventDefault();
    popupMap.classList.remove('modal-wrap-show');
  }
});
*/

// Close map popup with ESC
window.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27 || evt.keyCode === 'Escape') {
    if (popupMap.classList.contains('modal-wrap-show')) {
      popupMap.classList.remove('modal-wrap-show');  
    }
  }
});