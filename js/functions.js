// Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее.

const checkStringLength = function (string, maxLength) {
  return string.length <= maxLength;
};
checkStringLength('проверяемая строка, 20');
// Функция для проверки, является ли строка палиндромом. Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево

const checkStringIsPalindrome = function (string) {
  let newString = '';
  string = string.replaceAll(' ', '').toLowerCase();
  for(let i = string.length - 1; i >= 0; i--) {
    newString += string[i];
  }
  return string === newString;
};
checkStringIsPalindrome('шалаш');

// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN:

const getNumber = function (string) {
  if(typeof(string) === 'number') {
    string = string.toString();
  }
  let number = '';
  for(let i = 0; i < string.length; i++) {
    let symbol = string[i];
    symbol = parseInt(symbol, 10);
    number += Number.isNaN(symbol) ? '' : symbol;
  }
  return parseInt(number, 10);
};
getNumber(555);


// функция, которая принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи в минутах и возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит.
//  Время указывается в виде строки в формате часы:минуты. Для указания часов и минут могут использоваться как две цифры, так и одна. Например, 8 часов 5 минут могут быть указаны по-разному: 08:05, 8:5, 08:5 или 8:05

const getMinutsInString = (string) => {
  const minutsArr = string.split(':');
  return minutsArr[0] * 60 + minutsArr[1] * 1;

};

const getPossibleWorkTime = (beginingWorkTime, endingWorkTime, startMeetingTime, durationOfTheMeeting) => {
  beginingWorkTime = getMinutsInString(beginingWorkTime);
  endingWorkTime = getMinutsInString(endingWorkTime);
  startMeetingTime = getMinutsInString(startMeetingTime);
  return (startMeetingTime >= beginingWorkTime &&
          startMeetingTime + durationOfTheMeeting <= endingWorkTime &&
          endingWorkTime - startMeetingTime >= durationOfTheMeeting &&
          endingWorkTime - beginingWorkTime >= durationOfTheMeeting);
};

getPossibleWorkTime('14:00', '17:30', '08:0', 90);
