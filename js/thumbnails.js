import { createBigPicture, openModal } from './modal.js';

const objectList = document.querySelector('.pictures');
const objectTemplate = document.querySelector('#picture').content.querySelector('.picture');

const objectListFragment = document.createDocumentFragment();

const createSimilarObject = (data) => {
  data.forEach((obj) => {
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

  objectList.append(objectListFragment);
};

const getPictureFromThumbnails = (data) => {
  objectList.addEventListener('click', (evt) => {
    evt.preventDefault();

    if(evt.target.matches('img')) {
      const pictureId = Number(evt.target.closest('a').dataset.photoId);
      const currentPicture = data.find((e) => e.id === pictureId);
      createBigPicture(currentPicture);
      openModal();
    }
  });

};

export {createSimilarObject, getPictureFromThumbnails};