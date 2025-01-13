import React, { useEffect, useState } from "react";

interface TemperatureBarProps {
  value: number; // Current temperature value
  min: number; // Minimum temperature value
  max: number; // Maximum temperature value
}

const TemperatureBar: React.FC<TemperatureBarProps> = ({ value, min, max }) => {
  const [animatedHeight, setAnimatedHeight] = useState(0);

  // Normalize the value to be between the minHeight and maxHeight percentages
  const minHeight = 20; // Minimum height percentage (20%)
  const maxHeight = 80; // Maximum height percentage (80%)
  const heightPercentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));



  useEffect(() => {
    // Animate the height change over 1 second
    setAnimatedHeight(heightPercentage);
  }, [value, heightPercentage]);

  const gradient = "linear-gradient(#FFBD2A, #FC8439, #735FED)"; // Color gradient

  return (
    <div className="flex items-center jusitfy-center gap-4 m-auto">
      {/* Left Labels */}
      <div className="flex flex-col justify-between h-72 mr-4 text-gray-500 text-sm">
        <div
          className="flex gap-2 items-center"
        >
          <span className="dark:text-[#FFFFFFCC] text-[#979797] text-base font-normal">100°C</span>
          <div className="w-[42px] h-[1px] bg-[#17171733] dark:bg-[#FFFFFF33]"></div>
        </div>
        <div
          className="flex gap-2 items-center"
        >
          <span className="dark:text-[#FFFFFFCC] text-[#979797] text-base font-normal">50°C</span>
          <div className="w-[42px] h-[1px] bg-[#17171733] dark:bg-[#FFFFFF33]"></div>
        </div>
        <div
          className="flex gap-2 items-center"
        >
          <span className="dark:text-[#FFFFFFCC] text-[#979797] text-base font-normal">0°C</span>
          <div className="w-[42px] h-[1px] bg-[#17171733] dark:bg-[#FFFFFF33]"></div>
        </div>
      </div>
      {/* Left Labels */}



      {/* Progress Bar */}
      <div className="relative flex flex-col justify-end w-8 h-72 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-in-out"
          style={{
            height: `${animatedHeight}%`,
            background: gradient,
            borderRadius: "9999px 9999px 0 0",
          }}
        ></div>
      </div>
    </div>
  );
};

export default TemperatureBar;
