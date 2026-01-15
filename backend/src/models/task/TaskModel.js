import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title : {
        type: String,
        required: [true, "Please add a title"],
        unique: true
    },
    description: {
        type: String,
        default: " No description added",
    },

    dueDate: {
        type: Date,
        default: Date.now(),
    },
    satus: {
        type: String,
        enum:["active", "inactive"],
        default: "active",
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high", "critical"],
        default: "medium",
    } ,
    completed : {
        type: Boolean,
        default: false,
    },

    user : {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
},
{timestamps: true }
);


const TaskModel = mongoose.model("Task", TaskSchema);

export default TaskModel;