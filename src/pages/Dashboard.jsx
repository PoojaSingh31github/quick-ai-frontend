import React, { useEffect, useState } from "react";
import { dummyCreationData } from "../assets/assets";
import { Gem, Sparkles } from "lucide-react";
import { Protect } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.baseURL =
  import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);

  const { getToken } = useAuth();
  const fetchCreations = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await axios.get("/all-creations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setCreations(response.data.creations);
      } else {
        toast.error("Failed to fetch creations");
      }
    } catch (error) {
      setCreations(dummyCreationData);
      toast.error(
        error.message || "Failed to fetch creations. Please try again later."
      );
      console.error("Error fetching creations:", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchCreations();
  }, []);

  return (
    <div className="h-full p-6 overflow-y-scroll">
      <div className="flex justify-start gap-4 flex-wrap">
        {/* Total Creations Card */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Total Creations</p>
            <h2 className="text-xl font-semibold">{creations.length}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center">
            <Sparkles className="w-5 text-white" />
          </div>
        </div>
        {/* Active Plan Card */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Active Plan</p>
            <h2 className="text-xl font-semibold">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>
            </h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center">
            <Gem className="w-5 text-white" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <p className="mt-6 mb-4">Recent Creations</p>
        {loading && (
          <div className="w-full flex justify-center items-center h-[300px]">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {creations.map((item, index) => (
          <CreationItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
