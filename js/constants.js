// API
const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorTextApi = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте перезагрузить страницу.',
  SEND_DATA: 'Не удалось загрузить изображение.'
};
// миниатюры
const objectList = document.querySelector('.pictures');
const objectTemplate = document.querySelector('#picture').content.querySelector('.picture');
// построение модального окна с большим Фото
const bigPictureModal = document.querySelector('.big-picture');
const bigPictureImage = bigPictureModal.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureModal.querySelector('.likes-count');
const bigPictureCloseButton = bigPictureModal.querySelector('.big-picture__cancel');
const bigPictureSocialCaption = bigPictureModal.querySelector('.social__caption');
const bigPictureShowedComments = bigPictureModal.querySelector('.social__comment-shown-count');
const bigPictureTotalComments = bigPictureModal.querySelector('.social__comment-total-count');
const bigPictureSocialComments = bigPictureModal.querySelector('.social__comments');
const bigPictureCommentsLoader = bigPictureModal.querySelector('.comments-loader');
// форма
const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCloseButton = uploadForm.querySelector('.img-upload__cancel');
const SubmitButtonText = {
  IDLE: 'ОПУБЛИКОВАТЬ',
  SENDING: 'ПУБЛИКУЮ...'
};
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
// предпросмотр загруженного изображения
const previewThumbnails = uploadForm.querySelectorAll('.effects__preview');
const FILE_TYPES = ['jpg', 'jpeg', 'png', 'webp'];
// валидация
const MAX_HASHTAGS_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_DESCRIPTION_LENGTH = 140;
const DELAY_TIME = 500;
const uploadInputHashtag = uploadForm.querySelector('.text__hashtags');
const uploadInputDescription = uploadForm.querySelector('.text__description');
const hashtagRegular = /^#[а-яёa-z0-9]{1,19}$/;
const ErrorText = {
  COUNT : `нельзя указать больше ${MAX_HASHTAGS_COUNT} хэштегов`,
  DUPLICATE : 'один и тот же хэштег не может быть использован дважды',
  REGULAR : 'Хэштэг должен начинаться с "#" и состоять из букв и чисел и не может содержать пробелы, спецсимволы ( @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.)',
  LENGTH :  `максимальная длина одного хэштега ${MAX_HASHTAG_LENGTH} символов, включая решётку`,
  SPACES : 'хэштеги разделяются пробелами',
};
const ErrorValidation = {
  DESCRIPTION : `Длина комментария больше ${MAX_DESCRIPTION_LENGTH} символов.`,
  HASHTAG : ErrorText,
};
// фильтр изображений
const imgFilters = document.querySelector('.img-filters');
const filterForm = imgFilters.querySelector('.img-filters__form');
const MAX_RANDOM_FILTER_COUNT = 10;
// сообщения об ошибках
const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const sendedErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const TIMEOUT_TIME = 5000;

export { BASE_URL, Route, Method, ErrorTextApi, objectList, objectTemplate, bigPictureModal, bigPictureImage, bigPictureLikes, bigPictureCloseButton, bigPictureSocialCaption, bigPictureShowedComments, bigPictureTotalComments, bigPictureSocialComments, bigPictureCommentsLoader, uploadForm, uploadInput, uploadOverlay, uploadCloseButton, uploadInputHashtag, uploadInputDescription, SubmitButtonText, submitButton, scaleControlBigger, scaleControlSmaller, scaleControlValue,imgUploadPreview, slider, sliderEffectLevel, sliderEffectValue, effectsList, MIN_SCALE_COUNT, MAX_DESCRIPTION_LENGTH, MAX_HASHTAGS_COUNT, MAX_HASHTAG_LENGTH, SCALE_STEP, MAX_SCALE_COUNT, sliderEffectsData, DELAY_TIME, hashtagRegular, ErrorText, ErrorValidation, imgFilters, filterForm, MAX_RANDOM_FILTER_COUNT, dataErrorTemplate, successTemplate, sendedErrorTemplate, TIMEOUT_TIME, previewThumbnails, FILE_TYPES };
