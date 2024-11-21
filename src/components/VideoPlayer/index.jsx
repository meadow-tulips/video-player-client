import { useEffect, useRef } from "react";
import {
  attachListeners,
  pauseVideo,
  playVideo,
  transitionVideo,
} from "../../socketUtils";
import { VideoPlayerEvents } from "../../socketUtils/videoPlayerEvents";

const VideoPlayer = ({ url, socket }) => {
  const ref = useRef();

  const handlePlay = (event) => {
    playVideo(socket, [url]);
  };

  const playVideoCallback = (data) => {
    if (ref.current) {
      ref.current.currentTime = data.time;
      ref.current.play();
    }
  };

  const handlePause = (event) => {
    pauseVideo(socket, [url, event.target.currentTime]);
  };

  const pauseVideoCallback = (data) => {
    if (ref.current) {
      ref.current.currentTime = data.time;
      ref.current.pause();
    }
  };

  const handleTimeUpdate = (event) => {
    transitionVideo(socket, [url, event.target.currentTime]);
  };

  const timeCallback = (data) => {
    if (ref.current) {
      ref.current.currentTime = data.time;
    }
  };

  useEffect(() => {
    attachListeners(socket, [
      { eventName: VideoPlayerEvents.Play, callback: playVideoCallback },
      { eventName: VideoPlayerEvents.Pause, callback: pauseVideoCallback },
      // { eventName: VideoPlayerEvents.Time, callback: timeCallback },
    ]);
  }, [url]);

  useEffect(() => {
    pauseVideo(socket, [url, 0]);
  }, []);

  if (!url) return null;
  return (
    <video
      onPlay={handlePlay}
      onPause={handlePause}
      onSeeking={handleTimeUpdate}
      width="100%"
      height="100%"
      controls
      ref={ref}
    >
      <source src={url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
