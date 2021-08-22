import * as DOM from "./dom.js";
import { createProject, setAllProjects, getAllProjects, addProject, findProject } from "./projects.js";
import { createTask, getAllTasks, findTaskObject, editTaskObject } from "./tasks.js";

const editEvent = () => {
    const tasks = document.getElementsByClassName("task-div");

    const editDateEvent = () => {
        const editDates = document.getElementsByClassName("edit-due");
    
        for (let i = 0; i < editDates.length; i++) {
            editDates[i].addEventListener("focus", function() {
                this.type = "date";
            });
        };
    };

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const editButton = task.getElementsByClassName("edit-btn")[0];
        const taskTitle = task.getElementsByClassName("task-property")[0].textContent.split(":")[1];
        editButton.addEventListener("click", function () {
            DOM.displayEditForm(task);
            editDateEvent();
            doneEvent(task, taskTitle);
        });
    };
};

const updateProjectItemsEvents = (allProjects) => {
    const projectItems = document.getElementsByClassName("project-item");
    const defaultProjectItem = projectItems[0];
    DOM.redifySelectedItem(defaultProjectItem, projectItems);

    const addDisplayItemsEvents = (() => {
        for (let i = 0; i < projectItems.length; i++) {
            const item = projectItems[i];
            item.addEventListener("click", function() {
                DOM.redifySelectedItem(item, projectItems);
                const project = findProject(item.textContent);
                DOM.displayProject(project);
                editEvent();
            });
        };
    })();
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
    updateProjectItemsEvents(allProjects);
    editEvent();
})();

const newProjectEvent = (() => {
    const newProjectBtn = document.getElementById("new-project-btn");
    newProjectBtn.addEventListener("click", function() {
        const projectName = prompt("New Project's name:");

        const createNewProject = () => {
            const newProject = createProject(projectName);
            addProject(newProject);
            const allProjects = getAllProjects();
            DOM.displayProjectsList(allProjects);
            updateProjectItemsEvents(allProjects);
        };

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

const doneEvent = (task, taskTitle) => {
    const doneButton = task.getElementsByClassName("done-btn")[0];
    doneButton.addEventListener("click", function() {
        const newData = DOM.getEditData(task);
        editTaskObject(taskTitle, newData);
    });
};

//const projectName = document.getElementById("project-name").textContent;
//getAllTasks(projectName);
//getAllTasks("Second One");
//console.log(taskAlreadyExists("f RK"));
//taskAlreadyExists("bob marley");

//console.log(findTaskObject("ézefe"));
//const allTasks = getAllTasks("Default Project");
//console.log(allTasks[0].title);
//console.log(findTaskObject("one task"));

/*const taskTitle = "One task";
console.log(taskTitle);
console.log(findTaskObject(taskTitle));*/

console.log(getAllTasks());