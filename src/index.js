import * as DOM from "./dom.js";
import * as createTodos from "./createTodos.js";
import * as createProjects from "./createProjects.js";

createProjects.storeDefaultProject();
const projects = createProjects.getProjects();
DOM.displayProjects(projects);

const addTodoBtn = document.getElementById("add-todo-btn");
const submitBtn = document.getElementById("form-submit");

addTodoBtn.addEventListener("click", DOM.displayForm);
submitBtn.addEventListener("click", function() {
    const formData = DOM.getFormData();
    DOM.closeForm();
});