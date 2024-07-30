import { objectList, objectTemplate } from './constants.js';
import { createBigPicture, openModal } from './modal.js';
import { getFiltredArray } from './filter.js';


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

export {createSimilarObject, getPictureFromThumbnails,};
