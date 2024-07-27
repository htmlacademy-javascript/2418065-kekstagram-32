const previewThumbnail = document.querySelectorAll('.effects__preview');
const uploadInput = document.querySelector('.img-upload__input');
const FILE_TYPES = ['jpg', 'jpeg', 'png', 'webp'];
const imgUploadPreview = document.querySelector('.img-upload__preview img');


const chooseUploadPhotoPreview = () => {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(file);

    previewThumbnail.forEach((mini) => {
      mini.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
  }
};

export{chooseUploadPhotoPreview};
