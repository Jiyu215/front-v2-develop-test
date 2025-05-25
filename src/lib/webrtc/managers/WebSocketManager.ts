type WebSocketManagerProps = {
  url: string;
  onMessage?: (message: any) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (err: Event) => void;
};

export default class WebSocketManager {
  private url: string;
  private onMessage?: (message: any) => void;
  private onOpen?: () => void;
  private onClose?: () => void;
  private onError?: (err: Event) => void;
  private socket: WebSocket | null = null;

  constructor({ url, onMessage, onOpen, onClose, onError }: WebSocketManagerProps) {
    this.url = url;
    this.onMessage = onMessage;
    this.onOpen = onOpen;
    this.onClose = onClose;
    this.onError = onError;
  }

  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log('[WebSocket] Connected');
      this.onOpen?.();
    };

    this.socket.onmessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      this.onMessage?.(message);
    };

    this.socket.onerror = (err: Event) => {
      console.error('[WebSocket] Error:', err);
      this.onError?.(err);
    };

    this.socket.onclose = () => {
      console.log('[WebSocket] Disconnected');
      this.onClose?.();
    };
  }

  send(message: any) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    }
  }

  close() {
    this.socket?.close();
  }
}
