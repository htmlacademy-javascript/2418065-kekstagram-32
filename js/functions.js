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


