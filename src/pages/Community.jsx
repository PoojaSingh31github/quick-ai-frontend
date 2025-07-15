import React, { useEffect, useState } from "react";
import axios from "axios";
import { Heart } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL =
  import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const Community = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingLikes, setLoadingLikes] = useState(false);
  const { getToken } = useAuth();

  const fetchCreations = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const res = await axios.get("/all-published", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCreations(res.data.creations || []);
    } catch (error) {
      toast.error("Failed to fetch creations");
      console.error("Error fetching creations", error);
    }
    setLoading(false);
  };

  const handleLike = async (creationId) => {
    try {
      setLoadingLikes(true);
      const token = await getToken();
      const res = await axios.post(
        "/likes",
        { creationId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(res.data.message);
      fetchCreations(); // refresh likes
    } catch (error) {
      toast.error("Failed to like/unlike");
    }
    setLoadingLikes(false);
  };

  useEffect(() => {
    fetchCreations();
  }, []);

  return (
    <div className="p-3">
      <h1 className="text-lg mb-2">Creations</h1>

      {loading ? (
        <div className="w-full flex justify-center items-center h-[300px]">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[calc(100vh-120px)] scrollbar-custom overflow-y-auto  p-3 bg-white">
          {creations.map((creation) => (
            <div
              key={creation._id}
              className="relative bg-white rounded-xl shadow-md overflow-hidden group"
            >
              <img
                src={creation.context}
                alt={creation.prompt}
                className="w-full h-[400px] object-cover transition-transform group-hover:scale-105 duration-300"
                onError={(e) => (e.target.src = "/fallback.png")}
              />

              {/* Prompt at bottom */}
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-transparent to-transparent px-3 py-2">
                <p className="text-white text-sm font-medium line-clamp-2">
                  {creation.prompt}
                </p>
              </div>

              {/* Like button */}
              <div className="absolute top-3 right-3 flex items-center gap-1 cursor-pointer">
                <button
                  onClick={() => handleLike(creation.id)}
                  className="bg-white px-3 py-1 rounded-full text-gray-800 font-medium flex items-center gap-1 hover:shadow-md"
                >
                  <Heart
                    size={18}
                    className={`${
                      creation.likes.includes(creation.user_id)
                        ? "fill-[#fa0909] text-[#f73232]"
                        : "text-gray-500"
                    }`}
                  />
                  {creation.likes.length}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Community;
