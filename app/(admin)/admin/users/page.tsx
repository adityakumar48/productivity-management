"use client";
import { User } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ShowAllUsers from "./components/ShowAllUsers";

const AdminUsers = () => {
  const [data, setData] = useState<User[]>([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/admin/users");
      setData(res.data);
    } catch (err) {
      console.log(err);
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
          <h1 className="font-poppins text-2xl font-semibold">All Users</h1>
        </div>

        {/* Show All Users */}
        <ShowAllUsers data={data} setData={setData} />
      </div>
    </div>
  );
};

export default AdminUsers;
