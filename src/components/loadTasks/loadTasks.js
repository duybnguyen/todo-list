import { getAllProjectsFromLocalStorage, removeTaskFromLocalStorage } from "../storage/storage";
import './loadTasks.css'

export default function loadTasks(projName) {
    // get references to dom nodes
    const contentContainer = document.querySelector('.content')
    // either reference a currently existing tasks container or create a new on
    const tasksContainer = document.querySelector('.tasks') || document.createElement('div')
    tasksContainer.classList.add('tasks')
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

            const top = document.createElement('div')
            top.classList.add('top')

            const title = document.createElement('h3');
            title.textContent = `Title: ${item.title}`;;

            const deleteTask = document.createElement('button')
            deleteTask.classList.add('delete-btn')
            deleteTask.textContent = 'X'
            deleteTask.addEventListener('click', () => {
                removeTaskFromLocalStorage(projName, item.title)
                tasksContainer.removeChild(taskContainer)
            })

            top.append(title, deleteTask)

            const description = document.createElement('p');
            description.textContent = `Description: ${item.description}`;

            const dueDate = document.createElement('p');
            dueDate.textContent = `Due date: ${item.dueDate}`;;

            const priority = document.createElement('p');
            priority.textContent = `Priority: ${item.priority}`;;

            const created = document.createElement('p');
            created.textContent = `Created: ${item.created}`;

            taskContainer.append(top, description, dueDate, priority, created);
            tasksContainer.appendChild(taskContainer);
        });

    }
    contentContainer.appendChild(tasksContainer)
}
