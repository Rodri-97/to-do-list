export const displayFormEvent = () => {
    const addTodoBtn = document.getElementById("add-todo-btn");
    const addTodoForm = document.getElementById("add-todo-form");
    addTodoBtn.addEventListener("click", function() {
        addTodoForm.style.display = "block";
    });
}

export const submitFormEvent = () => {
    const addTodoForm = document.getElementById("add-todo-form");
    const submitBtn = document.getElementById("form-submit");
    submitBtn.addEventListener("click", function() {
        addTodoForm.style.display = "none";
    })
}