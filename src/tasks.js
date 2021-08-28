import { setAllProjects, getAllProjects, addProject, findProject } from "./projects.js";

class Task {
    constructor(title, description, due, priority) {
        this.title = title;
        this.description = description;
        this.due = due;
        this.priority = priority;
    };
};

export const createTask = (title, description, due, priority) => {
    const newTask = new Task(title, description, due, priority);
    return newTask;
};

export const getAllTasks = (projectName) => {
    const allProjects = getAllProjects();
    for (let i = 0; i < allProjects.length; i++) {
        if (allProjects[i].name === projectName) return allProjects[i].tasks;
    }
    return;
};

export const findTaskObject = (taskTitle) => {
    const allProjects = getAllProjects();
    for (let i = 0; i < allProjects.length; i++) {
        const projectName = allProjects[i].name;
        const tasks = getAllTasks(projectName);

        for (let j = 0; j < tasks.length; j++) {
            if (tasks[j].title === taskTitle) return tasks[j];
        }
    }
    return false;
};

export const editTaskObject = (taskTitle, newData) => {
    const taskObject = findTaskObject(taskTitle);
    const newTitle = newData[0];
    const newDescription = newData[1];
    const newDue = newData[2];
    const newPriority = newData[3];
    taskObject.title = newTitle;
    taskObject.description = newDescription;
    taskObject.due = newDue;
    taskObject.priority = newPriority;
    setAllProjects();
};

export const deleteTaskObject = (taskTitle, project) => {
    project.tasks = project.tasks.filter(task => task.title !== taskTitle);
    setAllProjects();
};