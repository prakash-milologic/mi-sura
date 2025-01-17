import React from 'react'

const PowerTypes = ({key,title,content,icon}:{key:number,title:string,content:string,icon:React.ReactNode}) => {
  return (
    <div className='bg-white dark:bg-[#262629] rounded-2xl p-4 lg:p-6 flex  items-center gap-4' key={key}>
        <div className='pr-4 border-r border-[#1717171A] dark:border-[#FFFFFF1A]'>
        {icon}
        </div>
        <div>
            <p className='text-sm xl:text-base font-medium text-[#171717CC] dark:text-[#FFFFFFBF] '>{title}</p>
            <p className='text-lg xl:text-[32px] font-semibold text-[#171717] mt-2 dark:text-white'>{content}</p>
        </div>
    </div>
  )
}

export default PowerTypes