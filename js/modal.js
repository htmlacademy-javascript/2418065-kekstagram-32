import { createNewElement, isEscapeKey } from './util.js';

const bigPictureModal = document.querySelector('.big-picture');
const bigPictureImage = bigPictureModal.querySelector('.big-picture__img img');

const bigPictureLikes = bigPictureModal.querySelector('.likes-count');
const bigPictureCloseButton = bigPictureModal.querySelector('.big-picture__cancel');
const bigPictureSocialCaption = bigPictureModal.querySelector('.social__caption');
// const bigPictureShowedComments = bigPictureModal.querySelector('.social__comment-shown-count');
const bigPictureTotalComments = bigPictureModal.querySelector('.social__comment-total-count');
const bigPictureSocialComments = bigPictureModal.querySelector('.social__comments');
const bigPictureSocialCommentsCounts = bigPictureModal.querySelector('.social__comment-count');
const bigPictureCommentsLoader = bigPictureModal.querySelector('.comments-loader');

export const createBigPicture = (currentPicture) => {
  bigPictureImage.src = currentPicture.url;
  bigPictureImage.alt = currentPicture.description;
  bigPictureSocialCaption.textContent = currentPicture.description;
  bigPictureLikes.textContent = currentPicture.likes;
  bigPictureTotalComments.textContent = currentPicture.comments.length;

  //  bigPictureShowedComments.textContent = (currentPicture.comments.length <= 5) ? currentPicture.comments.length : 5;


  const dataFromComments = currentPicture.comments;

  const commentsListFragment = document.createDocumentFragment();

  dataFromComments.forEach((comment) => {
    const newCommentElement = createNewElement('li','social__comment');
    const newCommentAvatar = createNewElement('img','.social__picture');
    const newCommentText = createNewElement('p', 'social__text');
    newCommentAvatar.src = comment.avatar;
    newCommentAvatar.alt = comment.name;
    newCommentAvatar.width = '35';
    newCommentAvatar.height = '35';
    newCommentText.textContent = comment.message;
    newCommentElement.append(newCommentAvatar, newCommentText);

    commentsListFragment.append(newCommentElement);

    bigPictureSocialComments.innerHTML = '';
  });

  bigPictureSocialComments.append(commentsListFragment);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const openModal = () => {
  bigPictureModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  bigPictureSocialCommentsCounts.classList.add('hidden');
  bigPictureCommentsLoader.classList.add('hidden');
};

function closeModal () {
  bigPictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureSocialComments.innerHTML = '';
  document.removeEventListener('keydown', onDocumentKeydown);
}

bigPictureCloseButton.addEventListener('click', () => {
  closeModal();
});

export {openModal};
