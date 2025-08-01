import { Eraser, Sparkles } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL =
  import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const RemoveBackground = () => {
  const aiImage = [
    "Realistic",
    "ghibli style",
    "anime style",
    "cartoon style",
    "pixel art",
    "low poly",
    "isometric",
    "3D render",
    "oil painting",
    "watercolor",
    "sketch",
    "line art",
  ];
  const [selectedLength, setSelectedLength] = useState(aiImage[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = await getToken();

      const formData = new FormData();
      formData.append("img", input);

      const response = await axios.post("/remove-bg-img", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status !== 200) {
        throw new Error("Failed to remove background");
      }

      toast.success("Background removed successfully!");
      setContent(response.data.message);
      setLoading(false);
      setInput("");
    } catch (error) {
      setLoading(false);
      toast.error(
        error?.response?.data?.message || "Failed to remove background. Please try again later."
      );
      console.error("Error removing background:", error);
      setError("Failed to remove background. Please try again later.");
    }
    setLoading(false);
  };
  return (
    <div className="h-full overflow-y-scroll scrollbar-custom p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* left col */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#FF4938]" />
          <h1 className="text-xl font-semibold">Backend Removal</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Upload Image</p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setInput(e.target.files[0])}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          required
        />

        <p className="mt-2 text-sm">
          suppot jpg, png, webp an other image formats
        </p>

        <br />
        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          <Eraser className="w-5" />
          {loading ? "Removing Background..." : "Remove Background"}
        </button>
      </form>
      {/* Right col */}
      <div className="w-full max-w-lg p-4  bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[800px]">
        <div className="flex items-center gap-3">
          <Eraser className="w-5 h-5 text-[#FF4938]" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>
        <div className="flex-1 flex justify-center items-center">
          {content ? (
            <img
              src={content}
              alt="Processed"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          ) : (
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Eraser className="w-9 h-9" />
              <p>
                Upload an Image and click "Remove background" to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RemoveBackground;
