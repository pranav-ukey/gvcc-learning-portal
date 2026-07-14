import { useEffect, useState } from "react";
import api from "../services/api";
import VideoCard from "../components/VideoCard";

function Dashboard() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const response = await api.get("/videos");
      setVideos(response.data.videos);
    } catch (error) {
      console.log(error);
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-8 py-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white">
              GVCC Learning Portal
            </h1>

            <p className="text-blue-100 mt-2 text-lg">
              Welcome back, {user?.name} 👋
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-white text-right">
              <p className="text-sm">Keep Learning 📚</p>
            </div>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/";
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">
          Available Courses
        </h2>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;