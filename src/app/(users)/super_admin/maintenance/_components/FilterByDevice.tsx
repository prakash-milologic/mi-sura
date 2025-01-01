import { ConnectionIcon, DailyYieldIcon } from '@/app/assets/SVGCollection';
import React from 'react'

const FilterByDevice = () => {
    const [selectedDevice, setSelectedDevice] = React.useState<string | null>(null);
    const devices = ['Device 1', 'Device 2', 'Device 3'];
    const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDevice(event.target.value);
    };

    return (
        <div className='flex flex-wrap md:flex-nowrap gap-8 p-6 bg-[#FFFFFF] dark:bg-[#262629] rounded-2xl'>
            <div className='flex gap-2 '>
                <div className='w-14 h-14 bg-[#F4F5F9] rounded-xl'></div>
                <div className='flex flex-col gap-1 justify-center border-r-[1px] border-[#1717170D] pr-8'>
                    <p className='text-[28px] text-[#171717] dark:text-white leading-8 font-semibold'>Sungrow3</p>
                    <div className='flex gap-3 items-center justify-center'>
                        <p className='text-sm text-[#686868] dark:text-[#FFFFFFCC] font-medium'>
                            sungrow_141413
                        </p>
                        <div className='flex gap-1.5 items-center'>
                            <p className='w-2 h-2 bg-[#3FC43A] rounded-full'></p>
                            <span className='text-[#3FC43A] text-sm font-medium'>Active</span>
                        </div>
                    </div>
                </div>

            </div>
            <div className='flex  gap-2 flex-col justify-center border-r-[1px] border-[#1717170D] pr-8'>
                <div className='flex gap-1'>
                    <p className='text-xs text-[#686868] dark:text-[#FFFFFFCC] font-medium'>
                        Connected to
                    </p>
                    <ConnectionIcon />
                </div>
                <p className='text-lg text-[#171717] dark:text-white leading-8 font-semibold'>MIMOS KHTP</p>
            </div>
            <div className='flex  gap-2 flex-col justify-center border-r-[1px] border-[#1717170D] pr-8'>
                <div className='flex gap-1.5'>
                    <p className='text-xs text-[#686868] dark:text-[#FFFFFFCC] font-medium'>
                        Production
                    </p>
                    <DailyYieldIcon width={10} height={13.57} />
                </div>
                <p className='text-lg text-[#171717] dark:text-white leading-8 font-semibold'>238 kWh</p>

            </div>
            <div className='flex  gap-2  justify-center items-center'>
                <p className='text-sm  whitespace-nowrap text-[#686868] dark:text-[#FFFFFFCC] font-medium'>
                    Select Device
                </p>
    <form className="w-[353px] mx-auto">
    <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-2.5 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none ">
        <option value="US">Sungrow_37b</option>
        <option value="CA">Sungrow_38b</option>
        <option value="CA">Sungrow_38b</option>
        <option value="CA">Sungrow_38b</option>
        <option value="CA">Sungrow_38b</option>
        <option value="CA">Sungrow_38b</option>
    </select>
    </form>


            </div>

        </div>
    )
}

export default FilterByDevice