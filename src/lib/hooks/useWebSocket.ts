import { useEffect, useRef } from 'react';

type MessageHandler = (message: any) => void;

const useWebSocket = (url: string, onMessage: MessageHandler, onOpen?: () => void) => {
    const socket = useRef<WebSocket | null>(null);

    useEffect(() => {
        socket.current = new WebSocket(url);

        socket.current.onopen = () => {
            console.log('WebSocket opened:', url);
            onOpen?.();
        };

        socket.current.onmessage = (message) => {
            try {
                const data = JSON.parse(message.data);
                onMessage(data);
            } catch (e) {
                console.error('Invalid WebSocket message:', message.data);
            }
        };

        socket.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            if (socket.current) {
                console.log('Closing WebSocket');
                socket.current.close();
            }
        };
    }, [url]);

    const sendMessage = (data: any) => {
        const json = JSON.stringify(data);
        console.log('Sending WebSocket message:', json);
        if (socket.current && socket.current.readyState === WebSocket.OPEN) {
            socket.current.send(json);
        }
    };

    return {
        sendMessage,
        socket,
    };
};

export default useWebSocket;