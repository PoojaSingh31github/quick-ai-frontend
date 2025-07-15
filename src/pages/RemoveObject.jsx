import { Scissors, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL =
  import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const RemoveObject = () => {
  const [input, setInput] = useState("");
  const [object, setObject] = useState("");
  const { getToken } = useAuth();

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setContent("");
      if (!input) {
        toast.error("Please upload an image.");
        setLoading(false);
        return;
      }
      const formData = new FormData();
      formData.append("img", input);
      formData.append("object", object);

      const token = await getToken();

      const response = await axios.post("/remove-object", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status !== 200) {
        throw new Error("Failed to remove object");
      }

      toast.success("Object removed successfully!");
      setContent(response.data.message);
      setLoading(false);
      setInput("");
    } catch (error) {
      toast.error(
        error.message || "Failed to remove object. Please try again later."
      );
      console.error("Error removing object:", error);
    }
  };
  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* left col */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#437AF5]" />
          <h1 className="text-xl font-semibold">Object removal</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Upload Image</p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setInput(e.target.files[0])}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          required
        />

        <p className="mt-6 text-sm font-medium">Describe Object to Remove</p>
        <textarea
          onChange={(e) => setObject(e.target.value)}
          value={object}
          type="text"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="eg. car in background, tree from the image, etc."
          required
        />
        <p>be spacific about what you want to remove</p>

        <br />
        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#437AF5] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          <Scissors className="w-5" />
          {loading ? "Removing Object..." : "Remove Object"}
        </button>
      </form>
      {/* Right col */}
      <div className="w-full max-w-lg p-4  bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[800px]">
        <div className="flex items-center gap-3">
          <Scissors className="w-5 h-5 text-[#437AF5]" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>
        <div className="flex-1 flex justify-center items-center">
          {content ? (
            <img
              src={content}
              alt="Processed"
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Scissors className="w-9 h-9" />
              <p>Upload an Image and describe what to remove</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RemoveObject;
