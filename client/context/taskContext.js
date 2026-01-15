import axios from 'axios';
import React, { createContext, use, useEffect } from 'react';
import { useUserContext } from './userContext';
import { get } from 'http';
import toast from 'react-hot-toast';



const TasksContext = createContext();

const serverUrl = "https://taskmanagerv1-fxi2.onrender.com/api/v1";

export const TasksProvider = ({children}) => {

    const userId = useUserContext().user._id;

    const [tasks, setTasks] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [task, setTask] = React.useState({});


    const [isEditing, setIsEditing] = React.useState(false);
    const [isCompleted, setIsCompleted] = React.useState(false)
    const [priority, setPriority] = React.useState("all");
    const [activeTask, setActiveTask] = React.useState(null);
    const [modalMode, setModalMode] = React.useState(""); // "add" or "edit"
    const [profileModal, setProfileModal] = React.useState(false);


    const openAddModal = () => {
        setModalMode("add");
        setIsEditing(true);
        setTask({});
    }
    const openEditModal = (task) => {
        setModalMode("edit");
        setIsEditing(true);
        setActiveTask(task);
       
    }


    

    const openProfileModal = () => {
        setProfileModal(true);
    }
    const closeModal = () => {
        setIsEditing(false);
        setProfileModal(false);
        setModalMode("");
        setActiveTask(null);
        setTask({});
    }


    // Fetch tasks from the server
    const getTasks = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${serverUrl}/tasks`);
            setTasks(response.data.tasks);
        } catch (error) {
            console.log("Error fetching tasks:", error); 
        }
        setLoading(false);
    };

    const getTask = async (taskId) => {
        setLoading(true);
        try {
            const response = await axios.get(`${serverUrl}/task/${taskId}`);
            setTask(response.data.task);
        } catch (error) {
            console.log("Error fetching task:", error); 
        }
        setLoading(false);
    }

    const createTask = async (task) => {
        setLoading(true);
        try {
            const res = await axios.post(`${serverUrl}/task/create`, task);
            setTasks([...tasks, res.data.task]);
            toast.success("Task created successfully!");
        } catch (error) {
            console.log("Error creating task:", error); 
        }
        setLoading(false);
    };



  const updateTask = async (task) => {
  if (!task?._id) return;

  setLoading(true);
  try {
    
    const res = await axios.patch(
      `${serverUrl}/task/${task._id}`,
      task
    );

    const updatedTask = res.data.task;

    // ✅ update task list
    setTasks(prev =>
      prev.map(tsk =>
        tsk._id === updatedTask._id ? updatedTask : tsk
      )
    );

    // ✅ update currently opened task
    setTask(updatedTask);

    toast.success("Task updated successfully");
  } catch (error) {
    console.log("Error updating task", error);
  } finally {
    setLoading(false);
  }
};


    const deleteTask = async (taskId) => {
        
        try {
            await axios.delete(`${serverUrl}/task/${taskId}`);
            const newTasks = tasks.filter(t => t._id !== taskId);
            setTasks(newTasks);
        } catch (error) {
            console.log("Error deleting task:", error); 
        }
       
    };

    const handleInput = (name) => (e) => {
        if(name === "setTask") {
            setTask(e);
        } else {
            setTask({...task, [name]: e.target.value});
        }
    }

    // get completed tasks
    const completedTasks = tasks.filter((task) => task.completed) 
    // get pending task
    const activeTasks = tasks.filter((task) => !task.completed)

    // get critical tasks 

    const criticalTasks = tasks.filter((task) => task.priority === "critical")
    

    useEffect(() => {
        getTasks();
    }, [userId]);

    return(
        <TasksContext.Provider value={{
            tasks, 
            loading, 
            task,
            tasks,
            getTask, 
            createTask, 
            updateTask, 
            deleteTask, 
            priority, 
            setPriority,
            handleInput,
            isEditing,
            setIsEditing,
            openAddModal,
            openEditModal,
            activeTask,
            closeModal,
            modalMode,
            completedTasks,
            activeTasks,
            criticalTasks,
            openProfileModal,
            profileModal,
          

            }}>
            {children}
        </TasksContext.Provider>
    )
};

export const useTasks = () =>{
    return React.useContext(TasksContext);
};