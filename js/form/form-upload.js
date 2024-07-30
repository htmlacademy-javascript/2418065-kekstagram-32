import '../../vendor/pristine/pristine.min.js';
import {uploadForm, uploadInput, uploadOverlay, uploadCloseButton, uploadInputHashtag, uploadInputDescription, SubmitButtonText, submitButton, scaleControlBigger, scaleControlSmaller,imgUploadPreview, effectsList, MAX_DESCRIPTION_LENGTH, MAX_HASHTAGS_COUNT, MAX_HASHTAG_LENGTH, hashtagRegular, ErrorText, ErrorValidation } from '../constants.js';
import { isEscapeKey, hasDuplicate, addStopPropagation} from '../util.js';
import { showSendedErrorMessage, showSuccessMessage } from './messages.js';
import { sendData } from '../api.js';
import { chooseUploadPhotoPreview } from './preview.js';
import { onChangeEffects } from './effect-slider.js';
import { getPreviewBigger, getPreviewSmaller } from './scale-preview.js';


const getHashtagError = () => ErrorValidation.HASHTAG;

const validateHashtag = (value) => {

  const arrOfHashtags = value
    .toLowerCase()
    .split(' ')
    .filter(Boolean);
  if(arrOfHashtags.length > MAX_HASHTAGS_COUNT) {
    ErrorValidation.HASHTAG = ErrorText.COUNT;
    return false;
  }
  if(hasDuplicate(arrOfHashtags)) {
    ErrorValidation.HASHTAG = ErrorText.DUPLICATE;
    return false;
  }

  let isValid = true;

  arrOfHashtags.forEach((hashtag) => {

    if(!hashtagRegular.test(hashtag)) {
      ErrorValidation.HASHTAG = ErrorText.REGULAR;
      isValid = false;
    }
    if(hashtag.length > MAX_HASHTAG_LENGTH) {
      ErrorValidation.HASHTAG = ErrorText.LENGTH;
      isValid = false;
    }
    if(hashtag.indexOf('#', 1) >= 1) {
      ErrorValidation.HASHTAG = ErrorText.SPACES;
      isValid = false;
    }
  });
  return isValid;
};

const validateDescription = (value) => value.length < MAX_DESCRIPTION_LENGTH;

let pristine;
const addValidators = () => {

  pristine = new Pristine(uploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error',
  },true);
  pristine.addValidator(uploadInputHashtag,validateHashtag, getHashtagError, 1, false);
  pristine.addValidator(uploadInputDescription, validateDescription, ErrorValidation.DESCRIPTION, 1, false);
};


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadWindow();
  }
};

const openUploadWindow = () => {
  uploadInput.addEventListener('change', () => {
    uploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
    uploadInputHashtag.addEventListener('focus', onInputHashtagFocus);
    uploadInputDescription.addEventListener('focus', onInputDescriptionFocus);
    scaleControlSmaller.addEventListener('click', getPreviewSmaller,);
    scaleControlBigger.addEventListener('click', getPreviewBigger);
    imgUploadPreview.style.transform = `scale(${1})`;
    chooseUploadPhotoPreview();
  });
};

function closeUploadWindow () {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadInputHashtag.removeEventListener('focus', onInputHashtagFocus);
  uploadInputDescription.removeEventListener('focus', onInputDescriptionFocus);
  uploadInputHashtag.removeEventListener('keydown', addStopPropagation);
  uploadInputDescription.removeEventListener('keydown', addStopPropagation);
  scaleControlSmaller.removeEventListener('click', getPreviewSmaller,);
  scaleControlBigger.removeEventListener('click', getPreviewBigger);
  effectsList.removeEventListener('change', onChangeEffects);
  uploadForm.reset();
  pristine.reset();
}

const toggleSubmitButton = (isDiasabled) => {
  submitButton.disabled = isDiasabled;
  submitButton.textContent = isDiasabled ? SubmitButtonText.SENDING : SubmitButtonText.IDLE;
};

const setUploadFormSubmit = (onSuccess) => {
  addValidators();
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      toggleSubmitButton(true);
      sendData(new FormData(evt.target))
        .then(showSuccessMessage)
        .then(onSuccess)
        .catch((err) => {
          showSendedErrorMessage(err.message);
        })
        .finally(toggleSubmitButton);
    }
  });
};

function onInputHashtagFocus () {
  uploadInputHashtag.addEventListener('keydown', addStopPropagation);
}

function onInputDescriptionFocus () {
  uploadInputDescription.addEventListener('keydown', addStopPropagation);
}

uploadCloseButton.addEventListener('click',
  closeUploadWindow);


export {openUploadWindow, addValidators, setUploadFormSubmit, closeUploadWindow, onDocumentKeydown};
