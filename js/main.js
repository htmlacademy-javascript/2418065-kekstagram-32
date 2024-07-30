import { createSimilarObject, getPictureFromThumbnails} from './thumbnails.js';
import {openUploadWindow, closeUploadWindow, setUploadFormSubmit} from './form/form-upload.js';
import { getData } from './api.js';
import { showDataErrorMessage } from './form/messages.js';
import { debounce } from './util.js';
import {changeFilter} from './filter.js';
import { DELAY_TIME } from './constants.js';

openUploadWindow ();

getData()
  .then((objData) => {
    createSimilarObject(objData);
    getPictureFromThumbnails(objData);
    changeFilter(debounce(() => createSimilarObject(objData), DELAY_TIME));
  })
  .catch((err) => {
    showDataErrorMessage(err.message);
  });

setUploadFormSubmit(closeUploadWindow);
