import {bigPictureModal, bigPictureImage, bigPictureLikes, bigPictureCloseButton, bigPictureSocialCaption, bigPictureShowedComments, bigPictureTotalComments, bigPictureSocialComments, bigPictureCommentsLoader,} from './constants.js';
import { createNewElement, isEscapeKey } from './util.js';

let showMoreComments;

const getObjectComments = (comArr) => {

  const commentsListFragment = document.createDocumentFragment();

  comArr.forEach((comment) => {
    const newCommentElement = createNewElement('li','social__comment');
    const newCommentAvatar = createNewElement('img','social__picture');
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

// закрытие модалки по клику не на модалку
// bigPictureModal.addEventListener('click', (evt) => {
//   if(evt.target === bigPictureModal) {
//     closeModal();
//   }
// });

export {openModal, createBigPicture};
