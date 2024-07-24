import {getSimilarObject} from './data.js';
import {createSimilarObject, getPictureFromThumbnails} from './thumbnails.js';
import {openUploadWindow} from './form-upload.js';
openUploadWindow ();

const dataFromObject = getSimilarObject();
createSimilarObject(dataFromObject);
getPictureFromThumbnails(dataFromObject);


