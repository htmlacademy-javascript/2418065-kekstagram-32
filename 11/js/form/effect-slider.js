import { slider, sliderEffectLevel, sliderEffectValue, effectsList, sliderEffectsData} from '../constants.js';
import {uploadInput, imgUploadPreview} from '../constants.js';
import '../../vendor/nouislider/nouislider.js';

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start:100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)){
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    }
  }
});

let currentEffect = 'none';

slider.noUiSlider.on('update', () => {
  const value = slider.noUiSlider.get();

  if(currentEffect === 'none') {
    imgUploadPreview.style.filter = 'none';
    sliderEffectValue.value = '';
    sliderEffectLevel.classList.add('hidden');
  } else {
    const filter = sliderEffectsData[currentEffect].filter;
    const unit = sliderEffectsData[currentEffect].unit;
    imgUploadPreview.style.filter = `${filter}(${value}${unit})`;
    sliderEffectLevel.classList.remove('hidden');
    sliderEffectValue.value = value;
  }
});

const onChangeEffects = (evt) => {
  const effectName = evt.target.value;
  const newOptions = sliderEffectsData[effectName];
  currentEffect = effectName;
  slider.noUiSlider.updateOptions(newOptions);
};

uploadInput.addEventListener('change', () => {
  currentEffect = 'none';
  slider.noUiSlider.set();
  effectsList.addEventListener('change', onChangeEffects);
});


export {onChangeEffects,};
