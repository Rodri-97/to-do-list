import * as logic from "./logic.js";
import * as DOM from "./dom.js";

const addTodoBtn = document.getElementById("add-todo-btn");
const submitBtn = document.getElementById("form-submit");

addTodoBtn.addEventListener("click", DOM.displayForm);
submitBtn.addEventListener("click", function() {
    const formData = DOM.getFormData();
    logic.addData(formData);
    DOM.closeForm();
});