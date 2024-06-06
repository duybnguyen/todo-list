import { getAllProjectsFromLocalStorage, removeTaskFromLocalStorage } from "../storage/storage";

export default function loadTasks(projName) {
    const contentContainer = document.querySelector('.content')
    const tasksContainer = document.querySelector('.tasks') || document.createElement('div')
    tasksContainer.classList.add('task')
    tasksContainer.innerHTML = ''

    const allProjects = getAllProjectsFromLocalStorage();

    // Filter to the specific project the user clicked on
    const project = allProjects.find(proj => proj.projectName === projName);
    console.log(project)

    if (project && project.tasks) {
        // Create an element for every task and add it to a container
        project.tasks.forEach(item => {
            const taskContainer = document.createElement('div');
            taskContainer.classList.add('task-container');

            const deleteTask = document.createElement('button')
            deleteTask.textContent = 'Delete'
            deleteTask.addEventListener('click', () => {
                removeTaskFromLocalStorage(projName, item.title)
                tasksContainer.removeChild(taskContainer)
            })

            const title = document.createElement('h3');
            title.textContent = `Title: ${item.title}`;;

            const description = document.createElement('p');
            description.textContent = `Description: ${item.description}`;

            const dueDate = document.createElement('p');
            dueDate.textContent = `Due date: ${item.dueDate}`;;

            const priority = document.createElement('p');
            priority.textContent = `Priority: ${item.priority}`;;

            const created = document.createElement('p');
            created.textContent = `Created: ${item.created}`;

            taskContainer.append(deleteTask, title, description, dueDate, priority, created);
            tasksContainer.appendChild(taskContainer);
        });

    }
    contentContainer.appendChild(tasksContainer)
}
