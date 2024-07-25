import {createSimilarObject, getPictureFromThumbnails} from './thumbnails.js';
import {openUploadWindow, addValidators, closeUploadWindow, setUploadFormSubmit} from './form-upload.js';
import { getData } from './api.js';
import { showDataErrorMessage } from './messages.js';

openUploadWindow ();
addValidators();


getData()
  .then((objData) => {
    createSimilarObject(objData);
    getPictureFromThumbnails(objData);
  })
  .catch((err) => {
    showDataErrorMessage(err.message);
  });

setUploadFormSubmit(closeUploadWindow);
