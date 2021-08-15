const todoFactory = (title, description, dueDate, priority, complete) => {
    return { title, description, dueDate, priority, complete };
};

const defaultProject = [];
const projects = [defaultProject];

//export { todoFactory };

// node src/logic.js