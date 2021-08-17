import "./createTodos.js"

const projectFactory = (name, todos) => {
    return { name, todos };
}

let projects = [];

export const getProjects = () => {
    projects = localStorage.getItem("projects");
    projects = JSON.parse(projects);

    if (projects === null) {
        projects = [];
    }

    return projects;
}

export const setProjects = () => {
    localStorage.setItem("projects", JSON.stringify(projects));
}

export const storeProject = (project) => {
    getProjects();
    projects.push(project);
    setProjects();
}

export const storeDefaultProject = () => {
    const defaultProject = projectFactory("Default Project", []);
    storeProject(defaultProject);
}



