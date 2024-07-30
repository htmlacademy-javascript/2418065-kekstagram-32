import {BASE_URL, Route, Method, ErrorTextApi } from './constants.js';

const load = (route, errorText = null, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`,{method, body})
    .then((response) => {
      if(!response.ok) {
        throw new Error(`Произошла ошибка ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((err) => {
      throw new Error(errorText ?? err.message);
    });


const getData = () => load(Route.GET_DATA, ErrorTextApi.GET_DATA);

const sendData = (body) => load(Route.SEND_DATA, ErrorTextApi.SEND_DATA, Method.POST, body);


export {getData, sendData};
