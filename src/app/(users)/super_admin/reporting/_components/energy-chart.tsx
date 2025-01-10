"use client"
import { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import { useTheme } from 'next-themes';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const EnergyChart = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Listen to screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 640); // Adjust breakpoint for "small" devices
    };
    handleResize(); // Check on component mount
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

    const { theme } = useTheme();
  
  const chartOptions:ApexOptions = {
    theme: {
      mode: theme as "light" | "dark",
    },
    chart: {
      type: 'line' as const,
      background: 'transparent',
      toolbar: {
        show: false,
        tools: {
          download: false, // Disable export
        },
      },
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
    yaxis: {
      labels: {
        formatter: (val: number) => `${val} kWh`, // Custom formatter for y-axis labels
      },
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const value = series[seriesIndex][dataPointIndex];
        return `
          <div style="padding: 10px; background: #171717; color: #fff;">
            <p style="font-size:12px;">${w.globals.seriesNames[seriesIndex]}: ${value} kWh</p>
          </div>
        `;
      },
    },
    colors: ['#FD686A', '#FDB216', '#058DF7', '#00E397'], // Line colors
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      itemMargin: {
        horizontal: 24, // Gap between legend items
        vertical:isSmallScreen ? 10 : 20,
      },
      markers: {
        width: 16,
        height: 16,
        radius: 4, // Border-radius for markers
      },
    },
    stroke: {
      curve: 'smooth', // Smooth line curves
      width: 1.5,
    },
  };

  const [chartSeries, setChartSeries] = useState([
    {
      name: 'Solarium 3000',
      data: [50, 100, 150, 200, 250, 300, 200, 150, 100, 150, 200, 250],
    },
    {
      name: 'Photonix Pro',
      data: [100, 150, 120, 180, 220, 260, 236, 180, 120, 160, 210, 240],
    },
    {
      name: 'SunCharge Alpha',
      data: [70, 80, 90, 140, 200, 240, 210, 220, 190, 180, 170, 160],
    },
    {
      name: 'EcoPulse X1',
      data: [30, 50, 70, 100, 140, 190, 220, 240, 260, 230, 200, 170],
    },
  ]);

  return (
    <div className="sm:pb-10 h-full">{/* Add extra height to the container */}
      <Chart options={chartOptions} series={chartSeries} type="line" width={"100%"}
        height={"100%"} />
    </div>
  );
};

export default EnergyChart;
