import {getSimilarObject} from './data.js';
import {createSimilarObject, getPictureFromThumbnails} from './thumbnails.js';

const dataFromObject = getSimilarObject();
createSimilarObject(dataFromObject);
getPictureFromThumbnails(dataFromObject);
