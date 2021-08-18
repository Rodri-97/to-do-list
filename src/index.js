import * as DOM from "./dom.js";

let allProjects = [];
const newProjectBtn = document.getElementById("new-project-btn");

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

const createDefaultProject = (() => {
    const defaultProject = new Project("Default Project");
    addProject(defaultProject);
    DOM.displayProject(defaultProject);
    getAllProjects();
    DOM.displayProjectsList(allProjects);
})();

const createNewProject = () => {
    const projectName = prompt("New Project's name:");
    const newProject = new Project(projectName);
    addProject(newProject);
    getAllProjects();
    DOM.displayProjectsList(allProjects);
};

newProjectBtn.addEventListener("click", createNewProject);

console.log(allProjects);