import {dataErrorTemplate, successTemplate, sendedErrorTemplate, TIMEOUT_TIME} from '../constants.js';
import { isEscapeKey } from '../util.js';
import { onDocumentKeydown } from './form-upload.js';

const onDocumentKeydownError = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeWindow();
  }
};

const showDataErrorMessage = (mess) => {
  const dataErrorMessage = dataErrorTemplate.cloneNode(true);
  document.body.append(dataErrorMessage);
  const messageText = dataErrorMessage.querySelector('h2');
  messageText.textContent = mess;

  setTimeout(() => {
    dataErrorMessage.remove();
  }, TIMEOUT_TIME);
};

let messageWindow;

const showMessageWindow = (template) => {
  messageWindow = template.cloneNode(true);

  document.body.append(messageWindow);
  const closeButton = messageWindow.querySelector('button');
  closeButton.addEventListener('click', removeWindow);
  document.addEventListener('keydown', onDocumentKeydownError);
  document.removeEventListener('keydown', onDocumentKeydown);
  closeMessageWindow();
};


const showSuccessMessage = () => showMessageWindow(successTemplate);
const showSendedErrorMessage = () => showMessageWindow(sendedErrorTemplate);

function closeMessageWindow () {
  messageWindow.addEventListener('click', (evt) => {
    if (evt.target === messageWindow) {
      removeWindow();
    }
  });
}

function removeWindow () {
  document.body.removeChild(messageWindow);
  document.removeEventListener('keydown', onDocumentKeydownError);
  document.addEventListener('keydown', onDocumentKeydown);
}


export {showDataErrorMessage, showSuccessMessage, showSendedErrorMessage};
