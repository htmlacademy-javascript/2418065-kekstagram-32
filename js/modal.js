import { createNewElement, isEscapeKey } from './util.js';

const bigPictureModal = document.querySelector('.big-picture');
const bigPictureImage = bigPictureModal.querySelector('.big-picture__img img');

const bigPictureLikes = bigPictureModal.querySelector('.likes-count');
const bigPictureCloseButton = bigPictureModal.querySelector('.big-picture__cancel');
const bigPictureSocialCaption = bigPictureModal.querySelector('.social__caption');
const bigPictureShowedComments = bigPictureModal.querySelector('.social__comment-shown-count');
const bigPictureTotalComments = bigPictureModal.querySelector('.social__comment-total-count');
const bigPictureSocialComments = bigPictureModal.querySelector('.social__comments');
// const bigPictureSocialCommentsCounts = bigPictureModal.querySelector('.social__comment-count');
const bigPictureCommentsLoader = bigPictureModal.querySelector('.comments-loader');

let showMoreComments;

const getObjectComments = (comArr) => {

  const commentsListFragment = document.createDocumentFragment();

  comArr.forEach((comment) => {
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
  return commentsListFragment;
};

const showComments = (comArr) => {
  const start = 0;
  let end = start + 5;
  return function () {
    if(end >= comArr.length){
      end = comArr.length;
      bigPictureCommentsLoader.classList.add('hidden');
    } else {
      bigPictureCommentsLoader.classList.remove('hidden');
    }

    const result = comArr.slice(start, end);
    bigPictureSocialComments.append(getObjectComments(result));

    bigPictureShowedComments.textContent = end;

    end += 5;
  };
};

const createBigPicture = (currentPicture) => {
  bigPictureImage.src = currentPicture.url;
  bigPictureImage.alt = currentPicture.description;
  bigPictureSocialCaption.textContent = currentPicture.description;
  bigPictureLikes.textContent = currentPicture.likes;
  bigPictureTotalComments.textContent = currentPicture.comments.length;

  const dataFromComments = currentPicture.comments;
  showMoreComments = showComments(dataFromComments);
  showMoreComments();

  bigPictureCommentsLoader.addEventListener('click', showMoreComments);
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
};

function closeModal () {
  bigPictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureSocialComments.innerHTML = '';
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureCommentsLoader.removeEventListener('click', showMoreComments);
}

bigPictureCloseButton.addEventListener('click', () => {
  closeModal();
});

export {openModal, createBigPicture};
