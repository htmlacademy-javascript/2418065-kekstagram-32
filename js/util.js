const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const getId = () => {
  let i = 1;
  return function () {
    return i++;
  };
};

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


const shuffleArray = (arr) => {
  for(let i = arr.length - 1; i > 0; i--) {
    const temp = arr[i];
    const random = Math.floor(Math.random() * (i + 1));

    arr[i] = arr[random];
    arr[random] = temp;
  }
  return arr;
};

function debounce (callback, timeoutDelay) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { getRandomInteger,
  getId,
  createNewElement,
  isEscapeKey,
  hasDuplicate,
  shuffleArray,
  debounce
};
