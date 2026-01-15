"use client";

import useRedirect from "@/hooks/useUserRedirect";
import { useEffect, useState } from "react";
import { useTasks } from "@/context/taskContext";
import { Task } from "@/utils/types";
import { add } from "@/utils/Icons";
import { filteredTasks } from "@/utils/utilities";
import TaskItem from "../Components/TaskItem/TaskItem";
import Filters from "../Components/Filters/Filters";


export default function Pending() {
  useRedirect("/login");
  const { tasks, openAddModal, priority, setPriority, activeTasks } = useTasks();
  const filtered = filteredTasks(activeTasks, priority)

  useEffect(() => {
  setPriority("all");
    
  }, []);
  return (
    <main className="m-6 h-full">
  <div className="flex justify-between"> 
    <h1 className="text-2xl font-bold">Active Tasks</h1>
    <Filters />
  </div>

  <div className="pb-[2rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]">
    {filtered.map((task: Task, index: number) => (
      <TaskItem key={index} task={task} />
    ))}
    
    <button
      className="h-[16rem] w-full py-2 rounded-md text-lg font-medium text-gray-500 border-dashed border-2 border-gray-400
          hover:bg-gray-300 hover:border-none transition duration-200 ease-in-out"
      onClick={() => openAddModal()}
    >
      {add}
    </button>
  </div>
</main>
  );
}
