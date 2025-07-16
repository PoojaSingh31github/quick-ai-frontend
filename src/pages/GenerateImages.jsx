import { Image, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL =
  import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const GenerateImages = () => {
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
  const [selectedstyle, setSelectedstyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = await getToken();
      const response = await axios.post(
        "/generate-img",
        {
          prompt: `Generate an image of ${input} in ${selectedstyle} style`,
          publish: publish,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status !== 200) {
        throw new Error("Failed to generate image");
      }

      toast.success("Image generated successfully!");
      setContent(response.data.message);
      setLoading(false);
      setInput("");
    } catch (error) {
      setLoading(false);
      toast.error(
        error?.response?.data?.message || "Failed to generate image. Please try again later."
      );
      console.error("Error generating image:", error);
      setError("Failed to generate image. Please try again later.");
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
          <Sparkles className="w-6 text-[#00AD25]" />
          <h1 className="text-xl font-semibold">AI Image Generator</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Describe Your Image</p>
        <textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="Describe what you want to see in the image.."
          required
        />
        <p className="mt-4 text-sm font-medium">Style</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {aiImage.map((item, index) => (
            <span
              onClick={() => setSelectedstyle(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedstyle == item
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-500 border-gray-300"
              }`}
              key={index}
            >
              {item}
            </span>
          ))}
        </div>
        <br />
        <p className="mt-4 text-sm font-medium">Publish</p>
        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            checked={publish}
            onChange={(e) => setPublish(e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded
            focus:ring-blue-500"
          />
          <label className="text-sm text-gray-700">
            Publish this image to the community
          </label>
        </div>
        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          <Image className="w-5" />
          {loading ? "Generating Image..." : "Generate Image"}
        </button>
      </form>
      {/* Right col */}
      <div className="w-full max-w-lg p-4  bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[800px]">
        <div className="flex items-center gap-3">
          <Image className="w-5 h-5 text-[#00AD25]" />
          <h1 className="text-xl font-semibold">Generated Image</h1>
        </div>
        <div className="flex-1 flex justify-center items-center">
          {
            content ? (
              <img
                src={content}
                alt="Generated"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            ) : (
              <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
                <Image className="w-9 h-9" />
                <p>
                  Describe an Image and click "Generate Image" to get started
                </p>
              </div>
            )
          }
         
        </div>
      </div>
    </div>
  );
};

export default GenerateImages;
