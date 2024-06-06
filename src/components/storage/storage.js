// storage.js

import { setCurrentProject, getCurrentProject } from '../state.js';

const key = 'projects';

export function getAllProjectsFromLocalStorage() {
    const projects = localStorage.getItem(key);
    return projects ? JSON.parse(projects) : [];
}

export function addProjectToLocalStorage(name) {
    // Get existing projects
    const projectsArray = getAllProjectsFromLocalStorage();
    
    // Check if project name already exists
    const projectExists = projectsArray.some(project => project.projectName === name);
    
    if (projectExists) {
        alert('Project names must be unique');
        return; // Instead of throw Error(), just return to prevent the function from continuing
    }
    
    // Append the new project
    const newProject = {
        projectName: name,
        tasks: []
    };
    
    projectsArray.push(newProject);
    
    // Save the updated array back to localStorage
    localStorage.setItem(key, JSON.stringify(projectsArray));
    
    // Set the current project to the newly created project
    setCurrentProject(name);
}

export function deleteProjectFromLocalStorage(name) {
    // Get existing projects
    let projectsArray = getAllProjectsFromLocalStorage();
    
    // Filter out the project to be deleted
    projectsArray = projectsArray.filter(project => project.projectName !== name);
    
    // Save the updated array back to localStorage
    localStorage.setItem(key, JSON.stringify(projectsArray));
    
    // If the deleted project was the current one, clear the currentProjectName
    if (getCurrentProject() === name) {
        setCurrentProject('');
        // You might also want to clear the content area here, but that's UI logic
        // so it's better to handle it where you call deleteProjectFromLocalStorage
    }
}

export function addTaskToLocalStorage(projectName, task) {
    // Get all projects from localStorage
    let projectsArray = getAllProjectsFromLocalStorage();

    // Find the project with the specified name
    let project = projectsArray.find(proj => proj.projectName === projectName);
    if (project) {
        // Add the task to the project's tasks array
        project.tasks.push(task);

        // Save the updated projects array back to localStorage
        localStorage.setItem(key, JSON.stringify(projectsArray));
    } else {
        console.error(`Project with name ${projectName} not found`);
    }
}

export function removeTaskFromLocalStorage(projectName, taskTitle) {
    // Get all projects from localStorage
    let projectsArray = getAllProjectsFromLocalStorage();

    // Find the project and remove the specified task
    projectsArray = projectsArray.map(project => {
        if (project.projectName === projectName) {
            project.tasks = project.tasks.filter(task => task.title !== taskTitle);
        }
        return project;
    });

    // Save the updated projects array back to localStorage
    localStorage.setItem(key, JSON.stringify(projectsArray));
}