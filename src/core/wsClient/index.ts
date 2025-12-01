class WsClient<T = unknown> {
  #socket: WebSocket;

  constructor(endpoint: string) {
    this.#socket = new WebSocket(endpoint);
  }

  createConnection = (handleMessage: (data: T) => void) => {
    this.#socket.onopen = () => {
      this.#socket.send(
        JSON.stringify({
          content: '0',
          type: 'get old',
        })
      );
    };

    this.#socket.onmessage = (event: MessageEvent<T>) => {
      handleMessage(JSON.parse(event.data as unknown as string));
    };

    this.#socket.onerror = (error) => console.error('Произошла ошибка:', error);

    this.#socket.onclose = (event) =>
      console.log('Соединение закрыто', event.code, event.reason);
  };

  sendMessage = (content: string) => {
    this.#socket.send(
      JSON.stringify({
        content,
        type: 'message',
      })
    );
  };

  closeConnection = () => this.#socket.close();
}

export default WsClient;
