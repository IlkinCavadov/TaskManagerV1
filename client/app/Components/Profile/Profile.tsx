"use client";

import { useTasks } from '@/context/taskContext';
import { useUserContext } from '@/context/userContext';
import Image from 'next/image';
import React from 'react'

function Profile() {

    const {user} = useUserContext();
    const {tasks, completedTasks, activeTasks, criticalTasks, openProfileModal} = useTasks();
    const totalTasks = tasks.length
    const totalCritical = criticalTasks.length
    const totalActive = activeTasks.length
    const totalCompleted = completedTasks.length
    

  return (
    
    <div className='m-1'>
        <div 
        className='px-2 py-2 flex flex-col-1 items-center gap-3 bg-[#E6E6E6]/20 rounded-[0.8rem] 
        hover:bg-[#E6E6E6]/40 transition duration-300 ease-in-out cursor-pointer border-2 border-transparent hover:border-2 hover:border-white'
        onClick={openProfileModal}
        >
            <div>
                <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || user?.name}`}
                alt="avatar" 
                width={70} 
                height={70}
                className='rounded-full' 
                unoptimized
                />
            </div>
            <div className='flex flex-col-1'>
                <span className="text-xl font-medium">Hello,</span>
                <span className="text-xl font-bold">
                    {user?.name || 'Guest User'}
                </span>
            </div>
        </div>

        <div className='mt-6 flex flex-col gap-8'>
            <div className='grid grid-cols-2 gap-4'>
                <div className='text-gray-400'>
                    <p>Total Tasks:</p>
                    <p className='pl-4 relative flex gap-2'>
                        <span className='absolute h-[70%] w-[0.2rem] left-px top-1/2 translate-y-[-50%] bg-purple-500 rounded-[5px]'></span>
                        <span className='font-medium text-4xl text-[#333]'>{totalTasks}</span>

                    </p>
                </div>
                <div className='text-gray-400'>
                    <p>Critical:</p>
                    <p className='pl-4 relative flex gap-2'>
                        <span className='absolute h-[70%] w-[0.2rem] left-px top-1/2 translate-y-[-50%] bg-red-500 rounded-[5px]'></span>
                        <span className='font-medium text-4xl text-[#333]'>{totalCritical}{}</span>

                    </p>
                </div>
                <div className='text-gray-400'>
                    <p>In Progress:</p>
                    <p className='pl-4 relative flex gap-2'>
                        <span className='absolute h-[70%] w-[0.2rem] left-px top-1/2 translate-y-[-50%] bg-blue-500 rounded-[5px]'></span>
                        <span className='font-medium text-4xl text-[#333]'>{totalActive}</span>

                    </p>
                </div>
                <div className='text-gray-400'>
                    <p>Completed:</p>
                    <p className='pl-4 relative flex gap-2'>
                        <span className='absolute h-[70%] w-[0.2rem] left-px top-1/2 translate-y-[-50%] bg-green-500 rounded-[5px]'></span>
                        <span className='font-medium text-4xl text-[#333]'>{totalCompleted}</span>

                    </p>
                </div>                                                
            </div>
        </div>
    </div>
  )
}

export default Profile