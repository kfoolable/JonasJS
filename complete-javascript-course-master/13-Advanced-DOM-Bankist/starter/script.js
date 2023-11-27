'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault(); // added to prevent webpage to jump to the top when the modal is opened
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log(document.documentElement); // special way of selecting the entire document
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section'); // selects all section class
console.log(allSections); // returns a nodeList of all sections

document.getElementById('section--1'); // no need for hash
const allButtons = document.getElementsByTagName('button');
console.log(allButtons); // returns an HTMLCollection

console.log(document.getElementsByClassName('btn')); // HTMLCollection

// Creating and inserting elements
// .insertAdjacentHTML -> Jonas' fav way of adding html elements

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent =
//   'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message); // prepending is adding the element as a first child of the attached element, which is the header in this case
header.append(message); // last child // tjis doesn't add two elements, it cannot
// header.append(message.cloneNode(true));

// header.before(message); // inserts element before the header element as a sibling
// header.after(message); // after the header element as a sibling

// Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove(); // very recent addition to JS
    // message.parentElement.removeChild(message); // old way
  });
