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
    objectListFragment.append(objectProperty);
  });

  objectList.append(objectListFragment);
};
export {createSimilarObject};
