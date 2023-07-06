import videoImage from '../../public/mainPage/videoBlock/videoImage.png';

export const VALIDATION_REGEX = {
  email: /^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+$/,
  telegramUsername: /^@[a-zA-Z]+$/,
  flatNumber: /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/,
  url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/,
};

export const SHOP_ARR = [
  { market: 'binance', name: 'Binance' },
  { market: 'bybit', name: 'Bybit' },
  { market: 'kucoin', name: 'Kucoin' },
  { market: 'okx', name: 'OKX' },
  { market: 'gateio', name: 'Gateio' },
  { market: 'huobi', name: 'Huobi' },
  { market: 'poloniex', name: 'Poloniex' },
  { market: 'mexc', name: 'Mexc' },
];

export const VIDEO_ARR = [
  { id: 1, image: videoImage, link: 'https://google.com/', title: 'Video Title' },
  { id: 2, image: videoImage, link: 'https://google.com/', title: 'Video Title' },
  { id: 3, image: videoImage, link: 'https://google.com/', title: 'Video Title' },
  { id: 4, image: videoImage, link: 'https://google.com/', title: 'Video Title' },
  { id: 5, image: videoImage, link: 'https://google.com/', title: 'Video Title' },
  { id: 6, image: videoImage, link: 'https://google.com/', title: 'Video Title' },
  { id: 7, image: videoImage, link: 'https://google.com/', title: 'Video Title' },
];
