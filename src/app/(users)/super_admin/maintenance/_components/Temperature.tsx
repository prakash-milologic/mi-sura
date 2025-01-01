import React, { useEffect, useState } from "react";

interface TemperatureBarProps {
  value: number; // Current temperature value
  min: number; // Minimum temperature value
  max: number; // Maximum temperature value
}

const TemperatureBar: React.FC<TemperatureBarProps> = ({ value, min, max }) => {
  const [animatedHeight, setAnimatedHeight] = useState(0);

  // Normalize the value to be between 20% and 80%
  const minHeight = 20;
  const maxHeight = 80;
  const heightPercentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));


  useEffect(() => {
    // Animate the height change over 1 second
    setAnimatedHeight(heightPercentage);
  }, [value, heightPercentage]);

  const isCritical = value >= 75; // Threshold for critical temperature
  const gradient = "linear-gradient(180deg, #FFBD2A -24.54%, #FC8439 47.22%, #735FED 92.57%)"; // Color gradient

  return (
    <div className="flex items-center jusitfy-center m-auto">
      {/* Left Labels */}
      <div className="flex flex-col justify-between h-72 mr-4 text-gray-500 text-sm">
        <span>100°C</span> {/* Top Label */}
        <span>50°C</span> {/* Middle Label */}
        <span>0°C</span> {/* Bottom Label */}
      </div>

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
