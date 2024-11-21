import { VideoPlayerEvents } from "./videoPlayerEvents";

export const loadVideoFromRemote = (socket, updateUrl) => {
  socket.on(VideoPlayerEvents.Download, (data) => {
    if (data) {
      updateUrl(data.url);
    }
  });
  socket.emit(VideoPlayerEvents.Load);
};

export const playVideo = (socket, args = []) => {
  socket.emit(VideoPlayerEvents.Play, ...args);
};

export const pauseVideo = (socket, args = []) => {
  socket.emit(VideoPlayerEvents.Pause, ...args);
};

export const transitionVideo = (socket, args = []) => {
  socket.emit(VideoPlayerEvents.Time, ...args);
};

export const disconnectFromRemote = (socket) => {
  socket.off(VideoPlayerEvents.Download);
  socket.off("connect");
  socket.off("disconnect");
  socket.off("message");
};

export const attachListeners = (socket, arr) => {
  arr.forEach((item) => {
    socket.on(item.eventName, item.callback);
  });
};
