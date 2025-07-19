import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const initSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000');
  }
  return socket;
};

export const getSocket = () => socket;
