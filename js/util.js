import { DELAY_TIME } from './constants.js';

const createNewElement = (tagName, className) => {
  const newElement = document.createElement(tagName);
  newElement.classList.add(className);
  return newElement;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const hasDuplicate = (arr) => {
  const uniqEl = new Set(arr);
  return uniqEl.size !== arr.length;
};

function addStopPropagation (evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}


const shuffleArray = (arr) => {
  for(let i = arr.length - 1; i > 0; i--) {
    const temp = arr[i];
    const random = Math.floor(Math.random() * (i + 1));

    arr[i] = arr[random];
    arr[random] = temp;
  }
  return arr;
};

function debounce (callback, timeoutDelay = DELAY_TIME) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {
  createNewElement,
  isEscapeKey,
  hasDuplicate,
  addStopPropagation,
  shuffleArray,
  debounce
};
