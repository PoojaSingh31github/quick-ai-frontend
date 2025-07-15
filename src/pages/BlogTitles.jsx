import { Edit, Hash, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

axios.defaults.baseURL =
  import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const BlogTitles = () => {
  const blogCategories = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Food",
  ];
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [titles, setTitles] = useState("");
  const [error, setError] = useState("");
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const token = await getToken();
      const response = await axios.post(
        "/generate-blog",
        {
          prompt:`Generate a blog title for the keyword ${ input} in the category of ${selectedCategory}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status !== 200) {
        throw new Error("Failed to generate titles");
      }
      toast.success("Titles generated successfully!");
      setTitles(response.data.message);
      setLoading(false);
      setInput("");
      setSelectedCategory("General"); // Reset to default category
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "Failed to generate titles. Please try again later.");
      console.error("Error generating titles:", error);
      setError("Failed to generate titles. Please try again later.");
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
          <Sparkles className="w-6 text-[#8E37EB]" />
          <h1 className="text-xl font-semibold">AI Title Generator</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Keyword</p>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="The future of artificial intelligence is..."
          required
        />
        <p className="mt-4 text-sm font-medium">Category</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {blogCategories.map((item) => (
            <span
              onClick={() => setSelectedCategory(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedCategory === item
                  ? "bg-purple-50 text-purple-700"
                  : "text-gray-500 border-gray-300"
              }`}
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
        <br />
        <button disabled={loading} className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer">
          <Hash className="w-5" />
          {loading ? "Generating..." : "Generate title"}
        </button>
      </form>
      {/* Right col */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96">
        <div className="flex items-center gap-3">
          <Hash className="w-5 h-5 text-[#8E37EB]" />
          <h1 className="text-xl font-semibold">Generated titles</h1>
        </div>
        <div className="flex-1 flex justify-center items-center">
          {titles ? (
            <div className="text-sm flex flex-col items-start gap-5 text-gray-700 scrollbar-custom overflow-y-scroll">
              <ReactMarkdown>{titles}</ReactMarkdown>
            </div>
          ) : (
            <p className="text-gray-500">
              <Hash className="mb-3 h-9 text-center w-full   " />
              Enter a topic and click "Generate title "to get started
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogTitles;
