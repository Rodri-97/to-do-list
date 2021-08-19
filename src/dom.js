export const displayProject = (project) => {
    const projectName = document.getElementById("project-name");
    const projectTasksDiv = document.getElementById("project-tasks");
    projectName.textContent = project.name;
    projectTasksDiv.innerHTML = "";

    const displayTask = (task) => {
        const taskDiv = document.createElement("div");
        taskDiv.className = "task-div";

        const displayTaskProperty = (property, key) => {
            const propertyParagraph = document.createElement("p");
            propertyParagraph.innerHTML = `${key}: ${property}`;
            taskDiv.append(propertyParagraph);
        };
        
        const taskProperties = [task.title, task.description, task.due, task.priority];
        const taskKeys = Object.keys(task);

        for (let i = 0; i < taskProperties.length; i++) {
            const property = taskProperties[i];
            const key = taskKeys[i].toUpperCase();
            displayTaskProperty(property, key);
        };
        
        projectTasksDiv.append(taskDiv);
    };

    project.tasks.forEach(displayTask);
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
    const due = document.getElementById("due").value;
    const priority = document.getElementById("priority").value;
    return [title, description, due, priority];
};