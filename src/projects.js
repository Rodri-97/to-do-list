class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    };
};

export const createProject = (name) => {
    const newProject = new Project(name);
    return newProject;
}

let allProjects = [];

export const setAllProjects = () => {
    localStorage.setItem("allProjects", JSON.stringify(allProjects));
};

export const getAllProjects = () => {
    allProjects = localStorage.getItem("allProjects");
    allProjects = JSON.parse(allProjects);

    if (allProjects === null) {
        allProjects = [];
    };

    return allProjects;
};

export const addProject = (newProject) => {
    getAllProjects();
    const anySameProject = allProjects.some(project => project.name.toLowerCase() === newProject.name.toLowerCase());
    if (!anySameProject) {
        allProjects.push(newProject);
        setAllProjects();
    };
};

export const findProject = (projectName) => {
    getAllProjects();
    for (let i = 0; i < allProjects.length; i++) {
        if (allProjects[i].name === projectName) return allProjects[i];
    };
    return false;
};