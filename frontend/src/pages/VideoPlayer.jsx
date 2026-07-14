import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import api from "../services/api";

function VideoPlayer() {
  const { id } = useParams();

  const playerRef = useRef(null);

  const [video, setVideo] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isTabActive, setIsTabActive] = useState(true);
  const [bookmarks, setBookmarks] = useState([]); 

  useEffect(() => {
      fetchVideo();
      loadBookmarks();
  }, [id]);

  // 2. Disable right click
  useEffect(() => {
    const disableRightClick = (e) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", disableRightClick);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  // 3. Detect tab change
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabActive(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "PrintScreen") {
        alert(
          "Screenshots are discouraged for protected learning content."
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const fetchVideo = async () => {
    try {
      const response = await api.get(`/videos/${id}`);
      setVideo(response.data.video);
    } catch (err) {
      console.log(err);
    }
  };

  const onReady = (event) => {
    playerRef.current = event.target;

    const savedTime = Number(
        localStorage.getItem(`progress_${id}`)
    );

    if(savedTime > 0){
        playerRef.current.seekTo(savedTime,true);
    }
  };

  const onStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      const interval = setInterval(() => {
        if (playerRef.current) {
          setCurrentTime(playerRef.current.getCurrentTime());
          localStorage.setItem(
              `progress_${id}`,
              Math.floor(playerRef.current.getCurrentTime())
          );
        }
      }, 1000);

      playerRef.current.interval = interval;
    }

    if (
      event.data === window.YT.PlayerState.PAUSED ||
      event.data === window.YT.PlayerState.ENDED
    ) {
      clearInterval(playerRef.current?.interval);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const loadBookmarks = async () => {
      try {
        const response = await api.get(`/bookmarks/${id}`);
        setBookmarks(response.data.bookmarks);
      } catch (error) {
        console.log(error);
      }
    };

    const deleteBookmark = async (bookmarkId) => {
    try {
      await api.delete(`/bookmarks/${bookmarkId}`);
      loadBookmarks();
    } catch (error) {
      console.log(error);
    }
  };

  const addBookmark = async () => {
    try {
      const bookmarkName =
        prompt("Enter Bookmark Name (Optional)") || "";

      await api.post("/bookmarks", {
        videoId: id,
        bookmarkName,
        timestamp: Math.floor(currentTime),
      });

      loadBookmarks();

      alert("Bookmark Added");
    } catch (error) {
      console.log(error);
    }
  };

  if (!video) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-slate-800">
          {video.title}
        </h1>

        <p className="text-gray-500 mt-2">
          Continue learning where you left off.
        </p>
      </div>

      <div
        className="relative rounded-2xl overflow-hidden shadow-2xl bg-black"
        style={{
          filter: isTabActive ? "none" : "blur(12px)",
          transition: "0.3s",
        }}
      >
        <YouTube
          videoId={video.videoUrl}
          onReady={onReady}
          onStateChange={onStateChange}
          opts={{
            width: "100%",
            height: "500",
            playerVars: {
              autoplay: 0,
            },
          }}
        />

        <div className="absolute top-4 left-4 bg-black/60 text-white px-4 py-2 rounded-lg text-sm font-semibold backdrop-blur-sm">
          GVCC Learning Portal
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-8">
        Current Time : {formatTime(currentTime)}
      </h2>
     <div className="mt-5 rounded-xl border border-yellow-300 bg-yellow-50 p-4">
        <p className="text-yellow-800 font-medium">
          ⚠ This content is intended for learning purposes.
          Screenshots and screen recordings are discouraged.
        </p>
      </div>
      <button
        onClick={addBookmark}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
        Add Bookmark
    </button>
    <div style={{ marginTop: 30 }}>
      <h2 className="text-2xl font-bold mt-10 mb-6">
          📑 Bookmarks
      </h2>

      {bookmarks.map((bookmark) => (
       <div
        key={bookmark._id}
        className="bg-white rounded-2xl shadow-md p-5 flex justify-between items-center hover:shadow-xl transition mb-4"
      >
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            playerRef.current.seekTo(bookmark.timestamp, true);
            playerRef.current.playVideo();
          }}
        >
          <h4>{bookmark.bookmarkName || "Untitled"}</h4>
          <p>{formatTime(bookmark.timestamp)}</p>
        </div>

        <button
          onClick={() => deleteBookmark(bookmark._id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Delete
        </button>
      </div>
      ))}
    </div>
    </div>
  );
}

export default VideoPlayer;