export const displayForm = () => {
    const addTodoForm = document.getElementById("add-todo-form");
    addTodoForm.style.display = "block";
}

export const getFormData = () => {
    const elementsIDs = ["title", "description", "due-date", "priority"];
    const userInput = [];

    for (let i = 0; i < elementsIDs.length; i++) {
        const element = document.getElementById(elementsIDs[i]).value;
        userInput.push(element);
    }

    return userInput;
}

export const closeForm = () => {
    const addTodoForm = document.getElementById("add-todo-form");
    addTodoForm.style.display = "none";
}

export const displayProjectsList = (projects) => {
    const projectsList = document.getElementById("projects-list");
    projectsList.innerHTML = "";

    /*const formatizeID = (projectName) => {
        const nameLower = projectName.toLowerCase();
        if (nameLower.split(" ").length === 1) return nameLower;
        return nameLower.split(" ").map(word => word + "-").join("");
    }*/

    for (let i = 0; i < projects.length; i++) {
        const li = document.createElement("li");
        li.innerHTML = projects[i].name;
        li.className = "project-item";
        //li.id = formatizeID(project[i].name);
        projectsList.append(li);
    }
}

export const displayDefaultProject = () => {
    const projectName = document.getElementById("project-name");
    projectName.textContent = "Default Project";
}

export const displayProject = (project) => {
    const projectName = document.getElementById("project-name");
    projectName.textContent = project.name;
}