import * as DOM from "./dom.js";
import * as createTodos from "./createTodos.js";
import { getProjects, addDefaultProject, addNewProject } from "./createProjects.js";

const displayDefaultProject = (() => {
    addDefaultProject();
    const projects = getProjects();
    DOM.displayProjects(projects);
})();

const addNewProjectEventListener = (() => {
    const newProjectBtn = document.getElementById("new-project-btn");
    newProjectBtn.addEventListener("click", function() {
        addNewProject();
        const projects = getProjects();
        DOM.displayProjects(projects);
    });
})();

const addTodoBtn = document.getElementById("add-todo-btn");
const submitBtn = document.getElementById("form-submit");

addTodoBtn.addEventListener("click", DOM.displayForm);
submitBtn.addEventListener("click", function() {
    const formData = DOM.getFormData();
    DOM.closeForm();
});