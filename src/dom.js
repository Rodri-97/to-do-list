export const displayProject = (project) => {
    const projectName = document.getElementById("project-name");
    const projectTasksDiv = document.getElementById("project-tasks");
    projectTasksDiv.innerHTML = "";
    projectName.textContent = project.name;

    for (let i = 0; i < project.tasks.length; i++) {
            const currentTask = project.tasks[i];
            const taskDiv = document.createElement("div");
            const title = document.createElement("h2");
            title.textContent = currentTask.title;
            taskDiv.append(title);
            projectTasksDiv.append(taskDiv);
    };
};

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
    };
};

export const displayForm = () => {
    const addTaskForm = document.getElementById("add-task-form");
    addTaskForm.style.display = "block";
};

export const getFormData = () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("due-date").value;
    const priority = document.getElementById("priority").value;
    return [title, description, dueDate, priority];
};