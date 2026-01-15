import asyncHandler from "express-async-handler";
import TaskModel from "../../models/task/TaskModel.js";


export const createTask = asyncHandler(async(req, res)=>{
    try {

        const {title, description, dueDate, status, priority} = req.body;

        if (!title || title.trim() === "") {
            res.status(400).json({message: "Title is required!"})
            
        }
        
        const task = new TaskModel ({
            title,
            description,
            dueDate,
            status,
            priority,
            user: req.user._id,
        })

        await task.save();
        res.status(201).json({message:"Task created succesfully!", task});

    } catch (error) {
        console.log("Error in createTask: ", error.message);
        res.status(500).json({message:error.message});
    };
});

export const getTasks = asyncHandler(async(req, res)=>{
    try {
        const userId = req.user._id;
        

        if (!userId) {
            res.status(400).json({message: "User not found!"})
        }
        const tasks = await TaskModel.find({user: userId});
        res.status(201).json({
            length: tasks.length,
            tasks
        })

        
    } catch (error) {
        console.log("Error on getTasks: ", error.message);
        res.status(500).json({message:error.message});
    }
});

export const getTask = asyncHandler(async(req, res) =>{
    try {
        const userId = req.user._id;

        const {id} = req.params;

        if (!id) {
            res.status(400).json({message: "Task id not found!, please provide an Task id"})
        }

        const task = await TaskModel.findById(id)

        if (!task) {
            res.status(404).json({message: "Task not found!"})
        }

        if (!task.user.equals(userId)) {
            res.status(401).json({message: "Not authorized!"})
        }

        res.status(200).json({task})

        
    } catch (error) {
        console.log("Error on getTask: ", error.message);
        res.status(500).json({message:error.message});
    }
});
export const updateTask = asyncHandler(async(req, res)=>{
    try {
        const userId = req.user._id;

        const {id} = req.params;

        const {title, description, status, priority, completed} = req.body;

        if (!id) {
            res.status(400).json({message: "Task id not found!, please provide an Task id"})
        }

        const task = await TaskModel.findById(id)

        if (!task) {
            res.status(404).json({message: "Task not found!"})
        }

        if (!task.user.equals(userId)) {
            res.status(401).json({message: "Not authorized!"})
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        task.priority = priority || task.priority;
        task.completed = completed || task.completed;

        await task.save();

        return res.status(200).json({task});




    } catch (error) {
        console.log("Error on updateTask: ", error.message);
        res.status(500).json({message:error.message});        
    }
});

export const deleteTask = asyncHandler(async(req, res) => {

    try {
        const userId = req.user._id;

        const {id} = req.params;

        const task = await TaskModel.findById(id)

        if (!task) {
            res.status(404).json({message: "Task not found!"})
        }

        if (!task.user.equals(userId)) {
            res.status(401).json({message: "Not authorized!"})
        }

        await TaskModel.findByIdAndDelete(id);

        return res.status(200).json({message: "Task deleted succesfully!"});


    } catch (error) {
        console.log("Error on deleteTask: ", error.message);
        res.status(500).json({message:error.message});                
    }
})