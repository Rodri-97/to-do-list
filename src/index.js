import * as DOM from "./dom.js";

let allProjects = [];

class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    };
};

class Task {
    constructor(title, description, due, priority) {
        this.title = title;
        this.description = description;
        this.due = due;
        this.priority = priority;
    };
};

const setAllProjects = () => {
    localStorage.setItem("allProjects", JSON.stringify(allProjects));
};

const getAllProjects = () => {
    allProjects = localStorage.getItem("allProjects");
    allProjects = JSON.parse(allProjects);

    if (allProjects === null) {
        allProjects = [];
    };

    return allProjects;
};

const addProject = (newProject) => {
    getAllProjects();
    const anySameProject = allProjects.some(project => project.name === newProject.name);
    if (!anySameProject) {
        allProjects.push(newProject);
        setAllProjects();
    };
};

const findProject = (projectName) => {
    getAllProjects();
    for (let i = 0; i < allProjects.length; i++) {
        if (allProjects[i].name === projectName) return allProjects[i];
    };
    return false;
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
        const newTask = new Task(formData[0], formData[1], formData[2], formData[3]);
        const currentProjectName = document.getElementById("project-name").textContent;
        const currentProject = findProject(currentProjectName);
        currentProject.tasks.push(newTask);
        setAllProjects();
        DOM.closeForm();
        DOM.displayProject(currentProject);
    });
})();

const editEvent = (() => {
    const tasks = document.getElementsByClassName("task-div");

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const editButton = task.getElementsByClassName("edit-btn")[0];
        editButton.addEventListener("click", function () {
            DOM.displayEditForm(task);
        });
    };
})();

// To be removed
for (let i = 0; i < allProjects.length; i++) {
    const project = allProjects[i];
    if (project.tasks.length !== 0) console.log(project.tasks[0].title);
}