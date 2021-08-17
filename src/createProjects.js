import "./createTodos.js"

const projectFactory = (name, todos) => {
    return { name, todos };
}

let projects = [];

const getProjects = () => {
    projects = localStorage.getItem("projects");
    projects = JSON.parse(projects);

    if (projects === null) {
        projects = [];
    }

    return projects;
}

const setProjects = () => {
    localStorage.setItem("projects", JSON.stringify(projects));
}

const storeProject = (project) => {
    getProjects();
    projects.push(project);
    setProjects();
}

const storeNewProject = (name) => {
    const newProject = projectFactory(name, []);
    storeProject(newProject);
}

const addDefaultProject = () => {
    let projects = getProjects();
    const anyDefault = projects.some(project => project.name === "Default Project");
    if (!anyDefault) {
        storeNewProject("Default Project");
        projects = getProjects();
    }
};

const addNewProject = () => {
    const projectName = prompt("New project's name:");
    let projects = getProjects();
    const anySameProject = projects.some(project => project.name === projectName);
    if (!anySameProject) {
        storeNewProject(projectName);
        projects = getProjects();
    }
};

export { getProjects, addDefaultProject, addNewProject };

