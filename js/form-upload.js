import { isEscapeKey, hasDuplicate} from './util.js';
import '../vendor/pristine/pristine.min.js';
import '../vendor/nouislider/nouislider.js';

const uploadForm = document.querySelector('.img-upload__form');

const scaleControlSmaller = uploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = uploadForm.querySelector('.scale__control--bigger');
const scaleControlValue = uploadForm.querySelector('.scale__control--value');
const imgUploadPreview = uploadForm.querySelector('.img-upload__preview img');

const slider = uploadForm.querySelector('.effect-level__slider');
const sliderEffectValue = uploadForm.querySelector('.effect-level__value');
const sliderEffectLevel = uploadForm.querySelector('.img-upload__effect-level');
const effectsList = uploadForm.querySelector('.effects__list');

const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCloseButton = uploadForm.querySelector('.img-upload__cancel');

const uploadInputHashtag = uploadForm.querySelector('.text__hashtags');
const uploadInputDescription = uploadForm.querySelector('.text__description');

const MAX_HASHTAGS_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_DESCRIPTION_LENGTH = 140;
const MIN_SCALE_COUNT = 25;
const MAX_SCALE_COUNT = 100;
const SCALE_STEP = 25;

const hashtagRegular = /^#[а-яёa-z0-9]{1,19}$/;

const sliderEffectsData = {
  none : {
    value: 'none',
    filter: 'none',
  },

  chrome: {
    value: 'chrome',
    filter: 'grayscale',
    unit: '',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  },

  sepia: {
    value: 'sepia',
    filter: 'sepia',
    unit: '',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  },

  marvin: {
    value: 'marvin',
    filter: 'invert',
    unit: '%',
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  },

  phobos: {
    value: 'phobos',
    filter: 'blur',
    unit: 'px',
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
  },

  heat: {
    value: 'heat',
    filter: 'brightness',
    unit: '',
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
  },
};

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
    uploadForm.addEventListener('submit', onFormSubmit);
    uploadInputHashtag.addEventListener('focus', onInputHashtagFocus);
    uploadInputDescription.addEventListener('focus', onInputDescriptionFocus);
    scaleControlSmaller.addEventListener('click', getPreviewSmaller,);
    scaleControlBigger.addEventListener('click', getPreviewBigger);
    imgUploadPreview.style.transform = `scale(${1})`;
    currentEffect = 'none';
    slider.noUiSlider.set([0]);
    effectsList.addEventListener('change', onChangeEffects);
  });
};


function closeUploadWindow () {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  uploadForm.removeEventListener('submit', onFormSubmit);

  uploadInputHashtag.removeEventListener('focus', onInputHashtagFocus);
  uploadInputDescription.removeEventListener('focus', onInputDescriptionFocus);
  uploadInputHashtag.removeEventListener('keydown', addStopPropagation);
  uploadInputDescription.removeEventListener('keydown', addStopPropagation);

  scaleControlSmaller.removeEventListener('click', getPreviewSmaller,);
  scaleControlBigger.removeEventListener('click', getPreviewBigger);

  effectsList.removeEventListener('change', onChangeEffects);

  uploadForm.reset();
  pristine.reset();
  // pristine.destroy();
}


function onFormSubmit (evt) {
  const isValid = pristine.validate();
  evt.preventDefault();


  if (isValid) {
    closeUploadWindow();
  }
}


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


export {openUploadWindow, addValidators};
