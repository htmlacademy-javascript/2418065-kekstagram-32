const descriptionArray = [
  'Поймал момент!',
  'Чудесная погода',
  'Вышел прогуляться',
  'Может мне стать фотографом',
  'скучаю по этим временам'
];

const messageArray = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const nameArray = [
  'Алишер Маликов',
  'Иван Молчанов',
  'Бабаев Владислав',
  'Терексина Александра',
  'Светлана Никифорова',
  'Анастасия Запарина',
  'Ислам Каримов',
  'Кактус Колючий',
  'Кун Агуэро'
];

// генератор чисел
const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// генератор не повторяющихся чисел
const createRandomDigit = (min, max) => {
  const previousValue = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValue.length >= (max - min + 1)) {
      return null;
    }
    while(previousValue.includes(currentValue)) {
      currentValue = getRandomInteger(min ,max);
    }
    previousValue.push(currentValue);
    return currentValue;
  };
};

const SIMILAR_OBJECT_COUNT = 25;
const maxPhotoId = 25;
const maxUserId = 25;
const minLikesCount = 12;
const maxLikesCount = 200;
const maxCommentCount = 30;
const maxCommentAvatarCount = 6;
const maxMessageQuantity = 2;
const createId = createRandomDigit(1, maxUserId);
const createPhotoId = createRandomDigit(1, maxPhotoId);
const createDescription = () => descriptionArray[getRandomInteger(1, descriptionArray.length - 1)];
const createLikesCount = () => getRandomInteger(minLikesCount, maxLikesCount);
const createCommentId = createRandomDigit(1, 1000);
const createCommentAvatar = () => getRandomInteger(1, maxCommentAvatarCount);
const createCommentMesage = () => {
  const messageQuantity = getRandomInteger(1, maxMessageQuantity);
  const messages = [];
  while(messages.length < messageQuantity) {
    messages.push(messageArray[getRandomInteger(1, messageArray.length - 1)]);
  }
  return messages.join(' ');
};

const createCommentName = () => nameArray[getRandomInteger(1, nameArray.length - 1)];
const commentCounts = () => getRandomInteger(0, maxCommentCount);

const createComments = () => ({
  id: createCommentId(),
  avatar: `img/avatar-${createCommentAvatar()}.svg`,
  message: createCommentMesage(),
  name: createCommentName()
});

const createObject = () =>
  ({
    id: createId(),
    url: `photos/${createPhotoId()}.jpg`,
    description: createDescription(),
    likes: createLikesCount(),
    comments: Array.from({length: commentCounts()}, createComments)
  });

const similarObject = Array.from({length: SIMILAR_OBJECT_COUNT}, createObject);

void similarObject;


