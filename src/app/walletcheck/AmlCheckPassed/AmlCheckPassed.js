"use client";

import React from "react";

const AmlCheckPassed = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-green-50 rounded-lg shadow-lg text-center">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-green-600">AML Check Passed</h2>
        <span className="text-green-500 bg-green-100 text-sm px-4 py-1 rounded-full border border-green-200">
          Step 4 of 4
        </span>
      </div>
      <p className="text-gray-600 mb-6">
        Your wallet has passed the AML check successfully. You can now proceed.
      </p>

      <div className="flex items-center justify-center mb-6">
        <div className="w-24 h-24 bg-green-100 border-4 border-green-500 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      {/* <button
        onClick={() => alert("Next steps...")}
        className="w-full py-3 px-4 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition"
      >
        Proceed
      </button> */}
    </div>
  );
};

export default AmlCheckPassed;
