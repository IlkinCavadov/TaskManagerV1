import { useTasks } from '@/context/taskContext';
import { edit, star, deleteIcon } from '@/utils/Icons';
import { Task } from '@/utils/types'
import { formatTime } from '@/utils/utilities';
import React, { use, useEffect } from 'react'

interface TaskItemProps {
  task :Task;
}

function TaskItem({ task }: TaskItemProps) {

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'critical':
        return 'text-red-800';
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  }

  const {getTask, openEditModal, deleteTask, modalMode} = useTasks();
  return (
    <div className='h-[16rem] px-4 flex flex-col gap-4 shadow-sm bg-[#f9f9f9] rounded-lg border-2 border-white'>
      <div>
        <h4 className='font-bold text-2xl'>{task.title}</h4>
        <p >{task.description}</p>
      </div>
      <div className='mt-auto flex justify-between items-center'>
        <p className='text-sm text-gray-400'>{formatTime(task.createdAt)}</p>
        <p className={`text-sm font-bold ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </p>
        <div>
          <div className='flex items-center gap-3 text-gray-400 text-[1.2rem]'>
          <button className={`${task.completed ? 'text-yellow-500' : 'text-gray-400'}`} 
          >{star}</button>
          <button className='text-[#00a1f1]'
            onClick={() => {
              getTask(task._id);
              openEditModal(task);
              
            }}
          >
            {edit}
            </button>
          <button className='text-[#f11c00]' 
          onClick={() =>{
            const isConfirmed = window.confirm("Are you sure you want to delete this task?");
            if (isConfirmed) {
            getTask(task._id);
            deleteTask(task._id)              
            }

            }}>{deleteIcon}</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default TaskItem