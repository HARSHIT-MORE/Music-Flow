import React from "react";

const StatCard = ({ title, value, color }) => {
  return (
    <div
      className={`rounded-xl p-6 shadow-lg ${color} transition hover:scale-105`}
    >
      <h3 className="text-gray-200 text-lg">{title}</h3>

      <p className="mt-4 text-4xl font-bold">
        {value}
      </p>
    </div>
  );
};

export default StatCard;