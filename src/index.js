import * as DOM from "./dom.js";
import { allProjects, setAllProjects, getAllProjects, addProject, findProject } from "./projects.js";
import { createTask } from "./tasks.js";

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
        editButton.addEventListener("click", function () {
            DOM.displayEditForm(task);
            editDateEvent();
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
        defaultProject = new Project("Default Project");
        addProject(defaultProject);
    }

    else {
        defaultProject = findProject("Default Project");
    }

    DOM.displayProject(defaultProject);
    getAllProjects();
    DOM.displayProjectsList(allProjects);
    updateProjectItemsEvents(allProjects);
    editEvent();
})();

const newProjectEvent = (() => {
    const newProjectBtn = document.getElementById("new-project-btn");
    newProjectBtn.addEventListener("click", function() {
        const projectName = prompt("New Project's name:");

        const createNewProject = () => {
            const newProject = new Project(projectName);
            addProject(newProject);
            getAllProjects();
            DOM.displayProjectsList(allProjects);
            updateProjectItemsEvents(allProjects);
        };

        if (projectName.trim() !== "") createNewProject();
    });
})();

const addTaskEvent = (() => {
    const addTaskBtn = document.getElementById("add-task-btn");
    addTaskBtn.addEventListener("click", function() {
        DOM.displayForm();
    });
})();

const submitEvent = (() => {
    const submitBtn = document.getElementById("submit-btn");
    submitBtn.addEventListener("click", function() {
        const formData = DOM.getFormData();
        const newTask = createTask(formData[0], formData[1], formData[2], formData[3]);
        const currentProjectName = document.getElementById("project-name").textContent;
        const currentProject = findProject(currentProjectName);
        currentProject.tasks.push(newTask);
        setAllProjects();
        DOM.closeForm();
        DOM.displayProject(currentProject);
        editEvent();
    });
})();