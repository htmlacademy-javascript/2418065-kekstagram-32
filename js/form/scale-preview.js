import{scaleControlValue, MIN_SCALE_COUNT, SCALE_STEP, MAX_SCALE_COUNT, imgUploadPreview} from '../constants.js';

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

export {getPreviewBigger, getPreviewSmaller};
