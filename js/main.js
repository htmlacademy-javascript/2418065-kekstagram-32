import {changeFilter, createSimilarObject, getPictureFromThumbnails} from './thumbnails.js';
import {openUploadWindow, addValidators, closeUploadWindow, setUploadFormSubmit} from './form-upload.js';
import { getData } from './api.js';
import { showDataErrorMessage } from './messages.js';
import { debounce } from './util.js';

openUploadWindow ();
addValidators();


getData()
  .then((objData) => {
    createSimilarObject(objData);
    getPictureFromThumbnails(objData);
    changeFilter(debounce(() => createSimilarObject(objData), 500));
  })
  .catch((err) => {
    showDataErrorMessage(err.message);
  });

setUploadFormSubmit(closeUploadWindow);
