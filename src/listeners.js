import { createNewProject } from "./index.js";

const newProjectEvent = () => {
    const newProjectBtn = document.getElementById("new-project-btn");
    newProjectBtn.addEventListener("click", createNewProject);

}
    
    const addTaskBtn = document.getElementById("add-task-btn");

   
    

})();

const addItemsEventListeners = () => {
    const projectItems = document.getElementsByClassName("project-item");
    for (let i = 0; i < projectItems.length; i++) {
        const projectItem = projectItems[i];
        const project = findProject(projectItem.textContent);
        projectItem.addEventListener("click", function() {
            DOM.displayProject(project);
        })
    }
}