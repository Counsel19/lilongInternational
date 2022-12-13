import React from "react";
import { format } from "date-fns";

const AdminTop = () => {
  const date = format(new Date(), "do, MMMM, yyyy");

  return (
    <div className="flex justify-between items-center my-4">
      <h2 className="font-semibold lg:text-lg text-gray-700">Welcome to Dashboard...</h2>

      <div>
        <div className="bg-blue-500 text-white text-xs lg:text-base p-2 rounded">{date}</div>
      </div>
    </div>
  );
};

export default AdminTop;
