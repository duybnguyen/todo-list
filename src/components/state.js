let currentProjectName = '';

export function setCurrentProject(name) {
    currentProjectName = name;
}

export function getCurrentProject() {
    return currentProjectName;
}