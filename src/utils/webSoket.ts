interface IWebSocketStore {
  [key: string]: WebSocket;
}
const webSocketStore: IWebSocketStore = {};

const getWebSocket = (url = 'spread') => {
  if (!webSocketStore[url]) {
    // webSocketStore[url] = new WebSocket('wss://socketsbay.com/wss/v2/1/demo/');
    webSocketStore[url] = new WebSocket(import.meta.env.VITE_BACKEND_WS_URL + '/' + url);
  }
  return webSocketStore[url];
};

const resetWebSocketStore = () => {
  Object.keys(webSocketStore).forEach((key) => {
    webSocketStore[key]?.close();
    delete webSocketStore[key];
  });
};
const resetWebSocket = (url = 'spread') => {
  if (webSocketStore[url]) {
    webSocketStore[url]?.close();
    delete webSocketStore[url];
  }
};

export { getWebSocket, resetWebSocket, resetWebSocketStore };
