import * as DOM from "./dom.js";
import { createProject, setAllProjects, getAllProjects, addProject, findProject } from "./projects.js";
import { createTask, getAllTasks, findTaskObject, editTaskObject } from "./tasks.js";

const editDateEvent = () => {
    const editDates = document.getElementsByClassName("edit-due");

    for (let i = 0; i < editDates.length; i++) {
        editDates[i].addEventListener("focus", function() {
            this.type = "date";
        });
    };
};

const doneEvent = (task, taskTitle) => {
    const doneButton = task.getElementsByClassName("done-btn")[0];
    doneButton.addEventListener("click", function() {
        const newData = DOM.getEditData(task);
        editTaskObject(taskTitle, newData);
        const currentProjectName = document.getElementById("project-name").textContent;
        const currentProject = findProject(currentProjectName);
        DOM.displayProject(currentProject);
    });
};

const editEvent = () => {
    const tasks = document.getElementsByClassName("task-div");

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const editButton = task.getElementsByClassName("edit-btn")[0];
        const taskTitle = task.getElementsByClassName("task-property")[0].textContent.split(":")[1].trim();
        editButton.addEventListener("click", function () {
            DOM.displayEditForm(task);
            editDateEvent();
            doneEvent(task, taskTitle);
        });
    };
};

const addDisplayItemsEvents = (projectItems) => {
    for (let i = 0; i < projectItems.length; i++) {
        const item = projectItems[i];
        item.addEventListener("click", function() {
            DOM.redifySelectedItem(item, projectItems);
            const project = findProject(item.textContent);
            DOM.displayProject(project);
            editEvent();
        });
    };
};

//const updateProjectItemsEvents = (allProjects) => {
const updateProjectItemsEvents = () => {
    const projectItems = document.getElementsByClassName("project-item");
    const defaultProjectItem = projectItems[0];
    DOM.redifySelectedItem(defaultProjectItem, projectItems);
    addDisplayItemsEvents(projectItems);
};

const renderDefaultProject = (() => {
    let defaultProject = {};

    if (findProject("Default Project") === false) {
        defaultProject = createProject("Default Project");
        addProject(defaultProject);
    }

    else {
        defaultProject = findProject("Default Project");
    }

    DOM.displayProject(defaultProject);
    const allProjects = getAllProjects();
    DOM.displayProjectsList(allProjects);
    //updateProjectItemsEvents(allProjects);
    updateProjectItemsEvents();
    editEvent();
})();

const createNewProject = () => {
    const newProject = createProject(projectName);
    addProject(newProject);
    const allProjects = getAllProjects();
    DOM.displayProjectsList(allProjects);
    //updateProjectItemsEvents(allProjects);
    updateProjectItemsEvents();
};

const newProjectEvent = (() => {
    const newProjectBtn = document.getElementById("new-project-btn");
    newProjectBtn.addEventListener("click", function() {
        const projectName = prompt("New Project's name:");

        if (projectName.trim() !== "" ) {
            createNewProject();
        }
        else {
            alert("That project name is either empty or already exists!");
        }
    });
})();

const addTaskEvent = (() => {
    const addTaskBtn = document.getElementById("add-task-btn");
    addTaskBtn.addEventListener("click", function() {
        DOM.displayForm();
    });
})();

const isNotEmpty = (taskInput) => {
    if (taskInput === "") return false;
    return true;
};

const submitEvent = (() => {
    const submitBtn = document.getElementById("submit-btn");
    submitBtn.addEventListener("click", function() {
        const formData = DOM.getFormData();
        const taskTitle = formData[0];
        const taskDescription = formData[1];
        const taskDue = formData[2];
        const taskPriority = formData[3];
        const userInput = [taskTitle, taskDescription, taskDue, taskPriority];

        if (!findTaskObject(taskTitle) && userInput.every(isNotEmpty)) {
            const newTask = createTask(taskTitle, taskDescription, taskDue, taskPriority);
            const currentProjectName = document.getElementById("project-name").textContent;
            const currentProject = findProject(currentProjectName);
            currentProject.tasks.push(newTask);
            setAllProjects();
            DOM.closeForm();
            DOM.displayProject(currentProject);
            editEvent();
        }
        else {
            alert("That task is either empty or already exists!");
        };
    });
})();