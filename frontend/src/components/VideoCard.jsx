import { useNavigate } from "react-router-dom";

function VideoCard({ video }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-52 object-cover"
      />

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
          {video.title}
        </h3>

        <p className="text-gray-600 mt-3 h-12">
          {video.description}
        </p>

        <button
          onClick={() => navigate(`/video/${video._id}`)}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-300"
        >
          ▶ Watch Course
        </button>
      </div>
    </div>
  );
}

export default VideoCard;