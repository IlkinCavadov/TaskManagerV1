import moment from "moment";
import { Task } from "./types";

export const formatTime = (createdAt: string) => {
    const now = moment();
    const created = moment(createdAt);
    // if the task was created today
    if (created.isSame(now, 'day')) {
        return "Today";
    }
    // if the task was created yesterday
    if(created.isSame(now.subtract(1, 'days'), 'day')) {
        return "Yesterday";
    }


    // else return the date in DD-MM-YYYY format
    return created.format('DD-MM-YYYY');
};

export const filteredTasks = (tasks: Task[], priority: string) => {
    const filteredTasks = () => {
        switch (priority) {
            case "low":
                return tasks.filter((task) => task.priority == "low");
            case "medium":
                return tasks.filter((task) => task.priority == "medium");
            case "high":
                return tasks.filter((task) => task.priority == "high");                                
            case "critical":
                return tasks.filter((task) => task.priority == "critical");                
        
            default:
                return tasks;
        }
    };
    return filteredTasks();
};


export const overdueTasks = (tasks: Task[]) => {
    const todayDate = moment();

    return tasks.filter((task) => {
        return !task.completed && moment(task.dueDate).isBefore(todayDate)
    })
}