import React from "react";

const ConsultTimeline = () => {
  return (
    <div className="sticky top-12 lg:top-20 z-50 bg-blue-900 py-2 lg:py-4 px-6  lg:px-12 w-full lg:w-1/2 mx-auto mt-6 mb-20">
      <ol className="flex list-none lg:list-decimal items-center justify-around lg:justify-between w-full text-base lg:text-lg gap-6 font-semibold text-white">
        <li>
          <span className="hidden lg:inline-block">Modalities</span>
          <span className="block rounded-full p-2 bg-gray-200 text-blue-800 lg:hidden">Step 1</span>
        </li>
        <li>
          <span className="hidden lg:inline-block">Supply Details</span>
          <span className="block lg:hidden">Step 2</span>
        </li>
        <li>
          <span className="hidden lg:inline-block">Shell Out</span>
          <span className="block lg:hidden">Step 3</span>
        </li>
        <li>
          <span className="hidden lg:inline-block">Finish</span>
          <span className="block lg:hidden">Step 4</span>
        </li>
      </ol>
    </div>
  );
};

export default ConsultTimeline;
