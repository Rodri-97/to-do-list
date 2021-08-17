import * as DOM from "./dom.js";
import * as createTodos from "./createTodos.js";
import { getProjects, addDefaultProject, addNewProject } from "./createProjects.js";

const displayProjects = (() => {
    addDefaultProject();
    const projects = getProjects();
    DOM.displayProjectsList(projects);
    DOM.displayDefaultProject();
})();

const addNewProjectEventListener = (() => {
    const newProjectBtn = document.getElementById("new-project-btn");
    newProjectBtn.addEventListener("click", function() {
        addNewProject();
        const projects = getProjects();
        DOM.displayProjectsList(projects);
        selectProjectEventListener();
    });
})();

const selectProjectEventListener = () => {
    const projectItems = document.getElementsByClassName("project-item");
    const projects = getProjects();
    for (let i = 0; i < projectItems.length; i++) {
        const project = projects[i];
        projectItems[i].addEventListener("click", function() {
            DOM.displayProject(project);
        });
    }
};

selectProjectEventListener();

// CSS/Style: Generate random color for each project + Redify selected item

const addTodo = (() => {
    const addTodoBtn = document.getElementById("add-todo-btn");
    const submitBtn = document.getElementById("form-submit");

    addTodoBtn.addEventListener("click", DOM.displayForm);
    submitBtn.addEventListener("click", function() {
        const formData = DOM.getFormData();
        DOM.closeForm();
    });
})();