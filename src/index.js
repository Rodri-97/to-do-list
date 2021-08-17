import * as DOM from "./dom.js";
import * as createTodos from "./createTodos.js";
import * as createProjects from "./createProjects.js";

const addDefaultProject = (() => {
    let projects = createProjects.getProjects();
    const anyDefault = projects.some(project => project.name === "Default Project");
    if (!anyDefault) {
        createProjects.storeNewProject("Default Project");
        projects = createProjects.getProjects();
    }
    DOM.displayProjects(projects);
})();

const addNewProject = () => {
    const projectName = prompt("New project's name:");
    let projects = createProjects.getProjects();
    const anySameProject = projects.some(project => project.name === projectName);
    if (!anySameProject) {
        createProjects.storeNewProject(projectName);
        projects = createProjects.getProjects();
    }
    DOM.displayProjects(projects);
};

const newProjectBtn = document.getElementById("new-project-btn");
newProjectBtn.addEventListener("click", addNewProject);

const addTodoBtn = document.getElementById("add-todo-btn");
const submitBtn = document.getElementById("form-submit");

addTodoBtn.addEventListener("click", DOM.displayForm);
submitBtn.addEventListener("click", function() {
    const formData = DOM.getFormData();
    DOM.closeForm();
});