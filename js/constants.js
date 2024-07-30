const uploadForm = document.querySelector('.img-upload__form');

// скейл превью
const scaleControlSmaller = uploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = uploadForm.querySelector('.scale__control--bigger');
const scaleControlValue = uploadForm.querySelector('.scale__control--value');
const imgUploadPreview = uploadForm.querySelector('.img-upload__preview img');
const MIN_SCALE_COUNT = 25;
const MAX_SCALE_COUNT = 100;
const SCALE_STEP = 25;
// слайдер эффектов
const slider = uploadForm.querySelector('.effect-level__slider');
const sliderEffectValue = uploadForm.querySelector('.effect-level__value');
const sliderEffectLevel = uploadForm.querySelector('.img-upload__effect-level');
const effectsList = uploadForm.querySelector('.effects__list');
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

const MAX_HASHTAGS_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_DESCRIPTION_LENGTH = 140;
const DELAY_TIME = 500;

export {uploadForm, scaleControlBigger, scaleControlSmaller, scaleControlValue,imgUploadPreview, slider, sliderEffectLevel, sliderEffectValue, effectsList, MIN_SCALE_COUNT, MAX_DESCRIPTION_LENGTH, MAX_HASHTAGS_COUNT, MAX_HASHTAG_LENGTH, SCALE_STEP, MAX_SCALE_COUNT, sliderEffectsData, DELAY_TIME};
