import * as DOM from "./dom.js";

let allProjects = [];

class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }
};

class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
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
    }
};

const updateProjectItemsEvents = (allProjects) => {
    const findProject = (projectName) => {
        getAllProjects();
        for (let i = 0; i < allProjects.length; i++) {
            if (allProjects[i].name === projectName) return allProjects[i];
        }
        return;
    }

    const projectItems = document.getElementsByClassName("project-item");

    for (let i = 0; i < projectItems.length; i++) {
        const projectItem = projectItems[i];
        projectItem.addEventListener("click", function() {
            const project = findProject(projectItem.textContent);
            DOM.displayProject(project);
        });
    }
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
    const createNewProject = () => {
        const projectName = prompt("New Project's name:");
        const newProject = new Project(projectName);
        addProject(newProject);
        getAllProjects();
        DOM.displayProjectsList(allProjects);
        updateProjectItemsEvents(allProjects);
    };
    newProjectBtn.addEventListener("click", createNewProject);
})();

console.log(allProjects);