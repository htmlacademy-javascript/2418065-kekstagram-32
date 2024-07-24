import {getSimilarObject} from './data.js';
import {createSimilarObject, getPictureFromThumbnails} from './thumbnails.js';
import {openUploadWindow, addValidators} from './form-upload.js';
openUploadWindow ();
addValidators();

const dataFromObject = getSimilarObject();
createSimilarObject(dataFromObject);
getPictureFromThumbnails(dataFromObject);


