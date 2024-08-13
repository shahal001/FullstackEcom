import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-[100px]">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
    
  );
};

export default Loader;
