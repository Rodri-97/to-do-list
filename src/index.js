import * as DOM from "./dom.js";

// CSS/Style: Generate random color for each project + Redify selected item

let allProjects = [];

class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    };
};

class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
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
    return;
};

const updateProjectItemsEvents = (allProjects) => {

    const projectItems = document.getElementsByClassName("project-item");

    for (let i = 0; i < projectItems.length; i++) {
        const projectItem = projectItems[i];
        projectItem.addEventListener("click", function() {
            const project = findProject(projectItem.textContent);
            DOM.displayProject(project);
        });
    };
};

const createDefaultProject = (() => {
    const defaultProject = new Project("Default Project");
    addProject(defaultProject);
    DOM.displayProject(defaultProject);
    getAllProjects();
    DOM.displayProjectsList(allProjects);
    updateProjectItemsEvents(allProjects);
})();

const newProjectEvent = (() => {
    const newProjectBtn = document.getElementById("new-project-btn");
    newProjectBtn.addEventListener("click", function() {
        const projectName = prompt("New Project's name:");
        const newProject = new Project(projectName);
        addProject(newProject);
        getAllProjects();
        DOM.displayProjectsList(allProjects);
        updateProjectItemsEvents(allProjects);
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
        getAllProjects();
        const currentProjectName = document.getElementById("project-name").textContent;
        const currentProject = findProject(currentProjectName);
        currentProject.tasks.push(newTask);
        setAllProjects();
    });
})();

for (let i = 0; i < allProjects.length; i++) {
    console.log(allProjects[i].tasks);
}
