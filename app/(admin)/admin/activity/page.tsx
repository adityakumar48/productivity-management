"use client";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiActivity } from "react-icons/fi";
import ShowActivity from "./components/ShowActivity";

const ActivityPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/activity");
      setData(res.data);
      setLoading(false);
      router.refresh();
    } catch (err) {
      setLoading(false);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {" "}
      <div className="md:px-16 px-8 pt-4">
        {/* Show all reminders Label */}
        <div className="flex justify-between items-center mt-8">
          <h1 className="font-poppins text-2xl font-semibold">
            {" "}
            <span className="flex items-center gap-2 ">
              <FiActivity className="text-purple-600" /> All Activity
            </span>
          </h1>
        </div>

        <ShowActivity data={data} />
      </div>
    </div>
  );
};

export default ActivityPage;
