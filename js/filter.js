import {imgFilters, filterForm, MAX_RANDOM_FILTER_COUNT } from './constants.js';
import { shuffleArray } from './util.js';

let currentFilter = 'filter-default';

const getFiltredArray = (arr) => {

  if(currentFilter === 'filter-discussed') {
    return arr.slice().sort((a, b) => b.comments.length - a.comments.length);
  }
  if(currentFilter === 'filter-random') {
    return shuffleArray(arr.slice()).slice(0, MAX_RANDOM_FILTER_COUNT);
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

    filterForm.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    targetElement.classList.add('img-filters__button--active');

    currentFilter = targetElement.id;
    cb();
  });
};


export {getFiltredArray, changeFilter};
