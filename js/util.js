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


export { getRandomInteger, getId, createNewElement, isEscapeKey};
