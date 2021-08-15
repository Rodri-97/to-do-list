const todoFactory = (title, description, dueDate, priority) => {
    return { title, description, dueDate, priority };
};

const defaultProject = [];
const projects = [defaultProject];

const addData = (dataArr, project = defaultProject) => {
    const newTodo = todoFactory(dataArr[0], dataArr[1], dataArr[2], dataArr[3], dataArr[4]);
    project.push(newTodo);
}

export { todoFactory, defaultProject, projects, addData };