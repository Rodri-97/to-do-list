export const displayProject = (project) => {
    const projectName = document.getElementById("project-name");
    const projectTasks = document.getElementById("project-tasks");
    projectName.textContent = project.name;
    projectTasks.textContent = project.tasks[0];
}

export const displayProjectsList = (allProjects) => {
    const projectsList = document.getElementById("projects-list");
    projectsList.innerHTML = "";

    for (let i = 0; i < allProjects.length; i++) {
        const project = allProjects[i];
        const li = document.createElement("li");
        li.textContent = project.name;
        li.className = "project-item";
        li.id = project.name;
        projectsList.append(li);
    }
}