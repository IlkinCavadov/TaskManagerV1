"use client";
import { useTasks } from '@/context/taskContext';
import useDetectOutside from '@/hooks/useDetectOutside';
import React, { act, useEffect } from 'react'

function Modal() {

    const {task, handleInput, createTask, updateTask, isEditing, closeModal, modalMode, activeTask} =  useTasks();
    // ...existing code...
// ...existing code...
    const ref = React.useRef(null);
// ...existing code...// ...existing code...

    useDetectOutside({ref, callback: () => {
        if (isEditing) {
            // Close the modal
            closeModal();
        }
    }});

    useEffect(() => {
        if (modalMode === "edit" && activeTask) {
            handleInput("setTask")(activeTask);
        }
    }, [modalMode, activeTask]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        if (modalMode === "edit") {
            await updateTask(task);
        } else if (modalMode === "add") {
            await createTask(task);
        }
        closeModal();

    };

  return (
    <div className='fixed left-0 top-0 z-50 h-full w-full bg-[#333]/30 overflow-hidden'>
        <form action="" 
        className='py-5 px-6 max-w-[520px] w-full flex flex-col gap-3 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md'
        onSubmit={handleSubmit}
        ref = {ref}
        >
            <div className='flex flex-col gap-1'>
                <label htmlFor="title">Title</label>
                <input 
                    type="text"
                    placeholder='Task Title'
                    id='title'
                    name='title'
                    className='bg-[#f9f9f9] p-2 rounded-md border'
                    value={task.title}
                    onChange={(e) => handleInput("title")(e)} 
                />

            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="description">Description</label>
                <textarea 
                    placeholder='Task Description'
                    name='description'
                    rows={4}
                    className='bg-[#f9f9f9] p-2 rounded-md border resize-none'
                    value={task.description}
                    onChange={(e) => handleInput("description")(e)} 
                />

            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="priority">Select Priority</label>
                <select 
                    name='priority'
                    className='bg-[#f9f9f9] p-2 rounded-md border cursor-pointer'
                    value={task.priority}
                    onChange={(e) => handleInput("priority")(e)} 
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                </select>
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="dueDate">Due Date</label>
                <input 
                    type="date"
                    name='dueDate'
                    className='bg-[#f9f9f9] p-2 rounded-md border'
                    value={task.dueDate}
                    onChange={(e) => handleInput("dueDate")(e)} 
                />
            </div>            
            <div className='flex flex-col gap-1'>
                <label htmlFor="completed">Task Completed</label>
                <div className='flex items-center justify-between bg-[#f9f9f9] p-2 rounded-md border'>
                    <label htmlFor="completed">Completed</label>
                <div>

                
                <select 
                    name='completed'
                    className='bg-[#f9f9f9] p-2 rounded-md border cursor-pointer'
                    value={task.completed ? "true"  : "false"}
                    onChange={(e) => handleInput("completed")(e)} 
                >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                </select>
                </div>
                </div>
            </div>

            <div className='mt-8 '>
                <button type="submit" className={`${modalMode === "edit" ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'} w-full py-2 text-white font-bold rounded-md transition duration-200 ease-in-out`}>
                    {modalMode === "edit" ? "Update Task" : "Create Task"}
                </button>
            </div>
        </form>

    </div>
  )
}

export default Modal