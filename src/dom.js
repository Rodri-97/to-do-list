const displayTaskProperty = (property, key) => {
    const propertyParagraph = document.createElement("p");
    propertyParagraph.className = "task-property";
    propertyParagraph.innerHTML = `${key}: ${property}`;
    return propertyParagraph;
};

const displayEditButton = () => {
    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit";
    return editBtn;
};

const displayDeleteCross = () => {
    const deleteCross = document.createElement("p");
    deleteCross.className = "delete-cross";
    deleteCross.textContent = "X";
    return deleteCross;
};

const displayTask = (task) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task-div";
    
    const taskProperties = [task.title, task.description, task.due, task.priority];
    const taskKeys = Object.keys(task);

    for (let i = 0; i < taskProperties.length; i++) {
        const property = taskProperties[i];
        const key = taskKeys[i].toUpperCase();
        const propertyParagraph = displayTaskProperty(property, key);
        taskDiv.append(propertyParagraph);
    };

    const deleteCross = displayDeleteCross();
    const editButton = displayEditButton();
    taskDiv.prepend(deleteCross);
    taskDiv.append(editButton);
    return taskDiv;
};

const sortTasksByPriority = (tasks) => {
    const sortedTasks = [];

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].priority === "high") sortedTasks.push(tasks[i])
    };

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].priority === "medium") sortedTasks.push(tasks[i]);
    };

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].priority === "low") sortedTasks.push(tasks[i]);
    };

    return sortedTasks;
};

export const displayProject = (project) => {
    const deleteBtn = document.getElementById("delete-btn");
    if (project.name === "Default Project") {
        deleteBtn.style.display = "none";
    }
    else {
        deleteBtn.style.display = "block";
    };

    const projectName = document.getElementById("project-name");
    const projectTasksDiv = document.getElementById("project-tasks");
    projectName.textContent = project.name;
    projectTasksDiv.innerHTML = "";
    const sortedTasks = sortTasksByPriority(project.tasks);
    
    for (let i = 0; i < sortedTasks.length; i++) {
        const task = displayTask(sortedTasks[i]);
        projectTasksDiv.append(task);
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
    const due = document.getElementById("due").value;
    const priority = document.getElementById("priority").value;
    return [title, description, due, priority];
};

const clearFormInput = () => {
    const inputFields = document.getElementsByClassName("add-task-input");
    for (let i = 0; i < inputFields.length; i++) inputFields[i].value = "";
    const priority = document.getElementById("priority");
    priority.selectedIndex = "0";
};

export const closeForm = () => {
    const addTaskForm = document.getElementById("add-task-form");
    addTaskForm.style.display = "none";
    clearFormInput();
};

export const redifySelectedItem = (selectedItem, allItems) => {
    for (let i = 0; i < allItems.length; i++) {
        const currentItem = allItems[i];
        if (currentItem === selectedItem) {
            currentItem.style.backgroundColor = "red";
        }
        else {
            currentItem.style.backgroundColor = "white";
        }
    }
};

const getPropertiesNames = (taskProperties) => {
    const newArr = [];
    for (let i = 0; i < taskProperties.length; i++) {
        const propertyName = taskProperties[i].textContent.split(":")[0];
        newArr.push(propertyName);
    }
    return newArr;
};

const getPropertiesValues = (taskProperties) => {
    const newArr = [];
    for (let i = 0; i < taskProperties.length; i++) {
        const value = taskProperties[i].textContent.split(":")[1];
        newArr.push(value);
    }
    return newArr;
};

const displayInputField = (task, propertyName, propertyValue) => {
    const propertyText = document.createElement("h2");
    propertyText.textContent = propertyName;
    propertyText.className = "edit-property-text";
    task.append(propertyText);

    if (propertyName === "PRIORITY") {
        const select = document.createElement("select");
        const options = ["high", "medium", "low"];
        for (let i = 0; i < options.length; i++) {
            const option = document.createElement("option");
            option.innerHTML = options[i];
            if (options[i] === propertyValue.trim()) option.setAttribute("selected", "selected");
            select.append(option);
        };
        select.className = "edit-input-field edit-priority";
        task.append(select);
    }
    else {
        const input = document.createElement("input");
        input.type = "text";
        input.defaultValue = propertyValue.trim();
        input.className = `edit-input-field edit-${propertyName.toLowerCase()}`;
        task.append(input);
    };
};

const displayDoneButton = (task) => {
    const doneButton = document.createElement("button");
    doneButton.type = "button";
    doneButton.className = "done-btn";
    doneButton.textContent = "Done!";
    task.innerHTML += "<br>";
    task.append(doneButton);
};

export const displayEditForm = (task) => {
    const taskProperties = task.getElementsByClassName("task-property");
    const propertiesNames = getPropertiesNames(taskProperties);
    const propertiesValues = getPropertiesValues(taskProperties);
    task.innerHTML = "";

    for (let i = 0; i < propertiesNames.length; i++) {
        const propertyName = propertiesNames[i];
        const propertyValue = propertiesValues[i];
        displayInputField(task, propertyName, propertyValue);
    };

    displayDoneButton(task);
};

export const getEditData = (task) => {
    const inputFields = task.getElementsByClassName("edit-input-field");
    const editData = [];

    for (let i = 0; i < inputFields.length; i++) {
        editData.push(inputFields[i].value);
    };
    return editData;
};