import { useEffect, useState } from "react";
import io from "socket.io-client";
import { VideoPlayer } from "./components";
import "./App.css";
import { disconnectFromRemote, loadVideoFromRemote } from "./socketUtils";

const socket = io(process.env.REACT_APP_VIDEO_PLAYER_API);

function App() {
  const [url, updateUrl] = useState("");
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      disconnectFromRemote(socket);
    };
  }, []);

  useEffect(() => {
    if (isConnected) {
      loadVideoFromRemote(socket, updateUrl);
    }
  }, [isConnected]);

  return (
    <div className="App">
      <VideoPlayer url={url} socket={socket} />
    </div>
  );
}

export default App;
