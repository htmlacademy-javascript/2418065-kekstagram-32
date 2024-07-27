import { createBigPicture, openModal } from './modal.js';
import { shuffleArray } from './util.js';


const objectList = document.querySelector('.pictures');
const objectTemplate = document.querySelector('#picture').content.querySelector('.picture');
const imgFilters = document.querySelector('.img-filters');
const filterForm = imgFilters.querySelector('.img-filters__form');


let currentFilter = 'filter-default';

const getFiltredArray = (arr) => {

  if(currentFilter === 'filter-discussed') {
    return arr.slice().sort((a, b) => b.comments.length - a.comments.length);
  }

  if(currentFilter === 'filter-random') {
    return shuffleArray(arr.slice()).slice(0,10);
  }
  return arr;
};

const changeFilter = (cb) => {
  imgFilters.classList.remove('img-filters--inactive');

  filterForm.addEventListener('click', (evt) => {
    const targetElement = evt.target;
    if(!targetElement.classList.contains('img-filters__button')) {
      return;
    }

    const act = filterForm.querySelector('.img-filters__button--active');
    act.classList.remove('img-filters__button--active');
    targetElement.classList.add('img-filters__button--active');

    currentFilter = targetElement.id;
    cb();
  });
};

const createSimilarObject = (data) => {

  const objectListFragment = document.createDocumentFragment();

  const newData = getFiltredArray(data);
  newData.forEach((obj) => {
    const objectProperty = objectTemplate.cloneNode(true);
    const pictureImage = objectProperty.querySelector('.picture__img');
    pictureImage.src = obj.url;
    pictureImage.alt = obj.description;
    const pictureLikes = objectProperty.querySelector('.picture__likes');
    pictureLikes.textContent = obj.likes;
    const picrureCommments = objectProperty.querySelector('.picture__comments');
    picrureCommments.textContent = obj.comments.length;
    objectProperty.dataset.photoId = obj.id;
    objectListFragment.append(objectProperty);
  });

  objectList.querySelectorAll('a').forEach((link) => link.remove());

  objectList.append(objectListFragment);
};

const getPictureFromThumbnails = (data) => {
  objectList.addEventListener('click', (evt) => {

    if(evt.target.closest('a')) {
      evt.preventDefault();
      const pictureId = Number(evt.target.closest('a').dataset.photoId);
      const currentPicture = data.find((e) => e.id === pictureId);
      createBigPicture(currentPicture);
      openModal();
    }
  });
};

export {createSimilarObject, getPictureFromThumbnails,changeFilter};
