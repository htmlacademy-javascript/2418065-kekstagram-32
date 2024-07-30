import { uploadInput, imgUploadPreview, previewThumbnails, FILE_TYPES } from '../constants.js';

const chooseUploadPhotoPreview = () => {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(file);

    previewThumbnails.forEach((mini) => {
      mini.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
  }
};

export{chooseUploadPhotoPreview};
