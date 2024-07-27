import { isEscapeKey, hasDuplicate} from './util.js';
import '../vendor/pristine/pristine.min.js';
import '../vendor/nouislider/nouislider.js';
import { showSendedErrorMessage, showSuccessMessage } from './messages.js';
import { sendData } from './api.js';
import { chooseUploadPhotoPreview } from './preview.js';
import {uploadForm, scaleControlBigger, scaleControlSmaller, scaleControlValue,imgUploadPreview, slider, sliderEffectLevel, sliderEffectValue, effectsList, MIN_SCALE_COUNT, MAX_DESCRIPTION_LENGTH, MAX_HASHTAGS_COUNT, MAX_HASHTAG_LENGTH, SCALE_STEP, MAX_SCALE_COUNT, sliderEffectsData} from './constants.js';

const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCloseButton = uploadForm.querySelector('.img-upload__cancel');
const uploadInputHashtag = uploadForm.querySelector('.text__hashtags');
const uploadInputDescription = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const SubmitButtonText = {
  IDLE: 'ОПУБЛИКОВАТЬ',
  SENDING: 'ПУБЛИКУЮ...'
};

const hashtagRegular = /^#[а-яёa-z0-9]{1,19}$/;

const error = {
  description: `Длина комментария больше ${MAX_DESCRIPTION_LENGTH} символов.`,
};

let scaleValue = parseInt(scaleControlValue.value, 10);

const getPreviewSmaller = () => {

  if(scaleValue > MIN_SCALE_COUNT) {
    scaleValue -= SCALE_STEP;
    imgUploadPreview.style.transform = `scale(${scaleValue / 100})`;
    scaleControlValue.value = `${scaleValue }%`;
  }
};

const getPreviewBigger = () => {

  if(scaleValue < MAX_SCALE_COUNT) {
    scaleValue += SCALE_STEP;
    imgUploadPreview.style.transform = `scale(${scaleValue / 100})`;
    scaleControlValue.value = `${scaleValue }%`;
  }
};

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start:100,
  step: 1,
  connect: 'lower',
});

let currentEffect = 'none';

slider.noUiSlider.on('update', () => {
  const value = slider.noUiSlider.get();

  if(currentEffect === 'none') {
    imgUploadPreview.style.filter = 'none';
    sliderEffectValue.value = '';
    sliderEffectLevel.classList.add('hidden');
  } else {
    const filter = sliderEffectsData[currentEffect].filter;
    const unit = sliderEffectsData[currentEffect].unit;
    imgUploadPreview.style.filter = `${filter}(${value}${unit})`;
    sliderEffectLevel.classList.remove('hidden');
    sliderEffectValue.value = value;
  }
});

const onChangeEffects = (evt) => {
  const effectName = evt.target.value;
  const newOptions = sliderEffectsData[effectName];
  currentEffect = effectName;
  slider.noUiSlider.updateOptions(newOptions);
};

const hashtagError = () => error.hashtagMessage;

const validateHashtag = (value) => {

  const arrOfHashtags = value
    .toLowerCase()
    .split(' ')
    .filter(Boolean);
  if(arrOfHashtags.length > MAX_HASHTAGS_COUNT) {
    error.hashtagMessage = `нельзя указать больше ${MAX_HASHTAGS_COUNT} хэштегов`;
    return false;
  }
  if(hasDuplicate(arrOfHashtags)) {
    error.hashtagMessage = 'один и тот же хэштег не может быть использован дважды';
    return false;
  }

  let isValid = true;

  arrOfHashtags.forEach((hashtag) => {

    if(!hashtagRegular.test(hashtag)) {
      error.hashtagMessage = 'Хэштэг должен состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.)';
      isValid = false;
    }
    if(hashtag.length > MAX_HASHTAG_LENGTH) {
      error.hashtagMessage = `максимальная длина одного хэштега ${MAX_HASHTAG_LENGTH} символов, включая решётку`;
      isValid = false;
    }
    if(hashtag.indexOf('#') !== 0) {
      error.hashtagMessage = 'хэштеги начинаются с #';
      isValid = false;
    }
    if(hashtag.indexOf('#', 1) >= 1) {
      error.hashtagMessage = 'хэштеги разделяются пробелами';
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
  pristine.addValidator(uploadInputHashtag,validateHashtag, hashtagError, 1, false);
  pristine.addValidator(uploadInputDescription, validateDescription, error.description, 1, false);
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
    currentEffect = 'none';
    slider.noUiSlider.set([0]);
    effectsList.addEventListener('change', onChangeEffects);
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

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const setUploadFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(showSuccessMessage)
        .then(onSuccess)
        .catch((err) => {
          showSendedErrorMessage(err.message);
        })
        .finally(unblockSubmitButton);
    }
  });
};

function addStopPropagation (evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}

function onInputHashtagFocus () {
  uploadInputHashtag.addEventListener('keydown', addStopPropagation);
}

function onInputDescriptionFocus () {
  uploadInputDescription.addEventListener('keydown', addStopPropagation);
}

uploadCloseButton.addEventListener('click',
  closeUploadWindow);


export {openUploadWindow, addValidators, setUploadFormSubmit, closeUploadWindow, onDocumentKeydown};
