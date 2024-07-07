export const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const getId = () => {
  let i = 1;
  return function () {
    return i++;
  };
};
