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
            propertyParagraph.className = "task-property";
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

        const addEditButton = (() => {
            const editBtn = document.createElement("button");
            editBtn.type = "button";
            editBtn.className = "edit-btn";
            editBtn.textContent = "Edit";
            taskDiv.append(editBtn);
        })();

        //const addDeleteButton = () => {

        //};
        
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

export const closeForm = () => {
    const addTaskForm = document.getElementById("add-task-form");
    addTaskForm.style.display = "none";
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

const createSelectOptions = () => {
    const options = ["High", "Medium", "Low"];
    const optionsReturned = [];

    for (let i = 0; i < options.length; i++) {
        const option = document.createElement("option");
        option.innerHTML = options[i];
        optionsReturned.push(option);
    };

    return optionsReturned;
};

export const displayEditForm = (task) => {
    const taskProperties = task.getElementsByClassName("task-property");
    const propertiesNames = getPropertiesNames(taskProperties);
    task.innerHTML = "";

    const displayInputField = (propertyName) => {
        const propertyText = document.createElement("h2");
        propertyText.textContent = propertyName;
        propertyText.className = "edit-property-text";
        task.append(propertyText);

        let input = document.createElement("input");
        input.type = "text";
        input.className = `edit-input-field edit-${propertyName.toLowerCase()}`;

        if (propertyName === "DUE") {
            input.placeholder = "MM/DD/YYYY";
        }
        else {
            input.placeholder = `New ${propertyName.toLowerCase()}`;
        };

        if (propertyName === "PRIORITY") {
            input = document.createElement("select");
            const options = createSelectOptions();
            for (let i = 0; i < options.length; i++) input.append(options[i]);
        };

        task.append(input);
    };

    propertiesNames.forEach(displayInputField);

    const createDoneButton = (() => {
        const doneButton = document.createElement("button");
        doneButton.type = "button";
        doneButton.className = "done-btn";
        doneButton.textContent = "Done!";
        task.innerHTML += "<br>";
        task.append(doneButton);
    })();
}