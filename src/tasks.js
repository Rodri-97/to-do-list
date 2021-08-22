class Task {
    constructor(title, description, due, priority) {
        this.title = title;
        this.description = description;
        this.due = due;
        this.priority = priority;
    };
};

export const createTask = (title, description, due, priority) => {
    const newTask = new Task(title, description, due, priority);
    return newTask;
};