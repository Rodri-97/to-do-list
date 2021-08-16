const todoFactory = (title, description, dueDate, priority) => {
    return { title, description, dueDate, priority };
};

const storeTodo = (dataArr, project = defaultProject) => {
    const newTodo = todoFactory(dataArr[0], dataArr[1], dataArr[2], dataArr[3], dataArr[4]);
    project.push(newTodo);
    localStorage.setItem(`${newTodo.title}`, newTodo);
}

export { todoFactory, storeTodo };