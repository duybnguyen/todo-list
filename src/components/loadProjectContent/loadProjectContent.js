import './loadProjectContent.css'
import loadTasks from "../loadTasks/loadTasks"
import { getCurrentProject, setCurrentProject } from "../state"
import { addTaskToLocalStorage } from "../storage/storage"
import { format } from 'date-fns'

export default function loadProjectContent(projName) {
    setCurrentProject(projName)

    // get container references and clear those containers
    const contentContainer = document.querySelector('.content')
    const tasksContainer = document.querySelector('.tasks')
    const taskModal = document.querySelector('dialog')
    contentContainer.innerHTML = ''
 
    // create header for the project
    const header = document.createElement('h2')
    header.classList.add('header-content')
    header.textContent = getCurrentProject()

    // create button to add tasks to project
    const addTask = document.createElement('button')
    addTask.classList.add('add-task')
    addTask.textContent = '+ Add Task'

    const addTaskHandler = e => {
        e.preventDefault();
        
        // Get input elements
        const titleInput = document.getElementById('title');
        const descriptionInput = document.getElementById('description');
        const dueDateInput = document.getElementById('due-date');
        const priorityInput = document.getElementById('priority');
        const addTaskBtn = document.querySelector('.add-task-btn');
    
        // Disable input fields and submit button
        const disableInputs = () => {
            titleInput.disabled = true;
            descriptionInput.disabled = true;
            dueDateInput.disabled = true;
            priorityInput.disabled = true;
            addTaskBtn.disabled = true;
        };
    
        // Enable input fields and submit button
        const enableInputs = () => {
            titleInput.disabled = false;
            descriptionInput.disabled = false;
            dueDateInput.disabled = false;
            priorityInput.disabled = false;
            addTaskBtn.disabled = false;
        };
    
        // Disable inputs immediately
        disableInputs();
    
        // Get input values
        const title = titleInput.value;
        const description = descriptionInput.value;
        const dueDate = dueDateInput.value;
        const priority = priorityInput.value;
        
        const task = {
            title,
            description,
            dueDate: format(dueDate, 'MM/dd/yyyy'),
            priority,
            created: format(new Date(), 'MM/dd/yyyy')
        };
    
        // Check if title is not empty (you can add more validation if needed)
        if (title) {
            // Assuming `projName` is the name of the current project
            addTaskToLocalStorage(getCurrentProject(), task);
    
            // Reload project content and tasks
            loadProjectContent(getCurrentProject());
            loadTasks(getCurrentProject());
    
            // Clear input forms
            titleInput.value = '';
            descriptionInput.value = '';
            dueDateInput.value = '';
            priorityInput.value = 'low';
    
            // Close the modal
            taskModal.close();
    
            // Re-enable inputs after a delay (e.g., 1 second)
            setTimeout(enableInputs, 1000);
        } else {
            enableInputs();
        }
    };
    
    // Add event listener to the submit button
    document.querySelector('.add-task-btn').addEventListener('click', addTaskHandler);

    // modal functionalities to add tasks 
    addTask.addEventListener('click', () => taskModal.showModal())
    document.querySelector('.cancel-task-btn').addEventListener('click', () => taskModal.close())

    const addTaskBtn = document.querySelector('.add-task-btn');
    // Remove previous event listener (if any)
    addTaskBtn.removeEventListener('click', addTaskHandler);
    addTaskBtn.addEventListener('click', addTaskHandler)
    

    // appending header, task and addTask button to container
    contentContainer.append(header, addTask)
    

    // clears the contentContainer when user deletes a project on the sidebar
    if (!projName) {
        contentContainer.removeChild(header)
        contentContainer.removeChild(addTask)
        if (tasksContainer) {
            tasksContainer.innerHTML = ''
        }

    }
}

