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
