"use client";

import useRedirect from "@/hooks/useUserRedirect";
import { useEffect, useState } from "react";
import { useTasks } from "@/context/taskContext";
import Filters from "./Components/Filters/Filters";
import TaskItem from "./Components/TaskItem/TaskItem";
import { Task } from "@/utils/types";
import { add } from "@/utils/Icons";
import { filteredTasks } from "@/utils/utilities";


export default function Home() {
  useRedirect("/login");
  const { tasks, openAddModal, priority, setPriority } = useTasks();
  const filtered = filteredTasks(tasks, priority)

  useEffect(() => {
  setPriority("all");
    
  }, []);
  return (
    <main className="max-w-[1400px] mx-auto m-6 h-full px-4 md:px-6">
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"> 
    <h1 className="text-2xl font-bold">All tasks</h1>
    <Filters />
  </div>

  <div className="pb-8 mt-6 grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-6">
    {filtered.map((task: Task, index: number) => (
      <TaskItem key={index} task={task} />
    ))}
    
    <button
      className="group h-[16rem] w-full py-2 rounded-md text-lg font-medium text-gray-500 border-dashed border-2 border-gray-400
      hover:bg-gray-200 hover:border-transparent transition-all duration-200 ease-in-out flex items-center justify-center"
      onClick={() => openAddModal()}
    >
      {add}
    </button>
  </div>
</main>
  );
}
