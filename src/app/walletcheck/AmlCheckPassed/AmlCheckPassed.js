"use client";

import React, { useEffect, useState } from "react";

 

const AmlCheckPassed = () => {
  const [indicators, setIndicators] = useState([]);
  const [overallScore, setOverallScore] = useState(0);

  useEffect(() => {
    const generateRandomPositivePercentage = (min = 50, max = 100) => {
      return (Math.random() * (max - min) + min).toFixed(2);
    };

    setIndicators([
      { label: "Transaction diversity", value: generateRandomPositivePercentage(), color: "bg-blue-500" },
      { label: "Wallet activity", value: generateRandomPositivePercentage(), color: "bg-green-500" },
      { label: "Transaction to/from CEX", value: generateRandomPositivePercentage(), color: "bg-blue-500" },
      { label: "Avg. Transaction Value", value: generateRandomPositivePercentage(), color: "bg-green-500" },
      { label: "Wallet Age", value: generateRandomPositivePercentage(), color: "bg-green-500" },
      { label: "Suspicious transactions", value: generateRandomPositivePercentage(), color: "bg-yellow-500" },
      { label: "Transaction to High-Risk addresses", value: generateRandomPositivePercentage(), color: "bg-yellow-500" },
    ]);

    setOverallScore(generateRandomPositivePercentage());
  }, []);

  // if (indicators.length === 0) {
  //   return <div>Loading...</div>; // Optional loading state
  // }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 14l2-2 2 2m-2-6v4"
            />
          </svg>
        </div>
      </div>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold">{overallScore}%</h2>
        <p className="text-gray-600 text-sm">
          Rating scored from A to F, where A represents a clean wallet, and F represents a dirty wallet.
          The total rating is the average value between the indicators.
        </p>
      </div>
      <div className="space-y-4">
        {indicators.map((indicator, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-700 text-sm">{indicator.label}</span>
            <div className="flex-1 mx-4 h-2 rounded-full bg-gray-200">
              <div
                className={`h-2 rounded-full ${indicator.color}`}
                style={{ width: `${indicator.value}%` }}
              ></div>
            </div>
            <span className="text-gray-700 text-sm">{indicator.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmlCheckPassed;
