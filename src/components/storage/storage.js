

export function getAllProjectsFromLocalStorage() {
    const key = 'projects';
    const projects = localStorage.getItem(key);
    return projects ? JSON.parse(projects) : [];
}
    
    // Function to add a project to localStorage
export function addProjectToLocalStorage(name) {
    const key = 'projects';
    
    // Get existing projects
    const projectsArray = getAllProjectsFromLocalStorage();
    
    // Check if project name already exists
    const projectExists = projectsArray.some(project => project.projectName === name);
    
    if (projectExists) {
        alert('Project names must be unique');
        throw Error()
    }
    
    // Append the new project
    const newProject = {
        projectName: name,
        tasks: {}
    };
    
    projectsArray.push(newProject);
    
    // Save the updated array back to localStorage
    localStorage.setItem(key, JSON.stringify(projectsArray));
}






