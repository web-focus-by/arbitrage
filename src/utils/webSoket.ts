let webSocket: WebSocket | null = null;

const getWebSocket = () => {
  console.log('getWebSocket', webSocket);
  if (!webSocket) {
    // webSocket = new WebSocket('wss://socketsbay.com/wss/v2/1/demo/');
    webSocket = new WebSocket(import.meta.env.VITE_BACKEND_WS_URL + '/spreads');
  }
  return webSocket;
};

const resetWebSocket = () => {
  webSocket?.close();
  webSocket = null;
};

export { getWebSocket, resetWebSocket };
