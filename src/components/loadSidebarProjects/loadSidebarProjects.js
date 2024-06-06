import './loadSidebarProjects.css'
import { getAllProjectsFromLocalStorage, deleteProjectFromLocalStorage } from '../storage/storage'
import loadProjectContent from '../loadProjectContent/loadProjectContent'
import projectIcon from '../../images/project.png'
import trashIcon from '../../images/trash.png'
import loadTasks from '../loadTasks/loadTasks'
import { setCurrentProject, getCurrentProject } from '../state.js';
import { format } from 'date-fns'



function loadSidebarProjects() {
    // clear the current projects on the sidebar on reload
    const projectsContainer = document.querySelector('.projects')
    projectsContainer.innerHTML = ''

    // get all projects from localStorage
    getAllProjectsFromLocalStorage().map(proj => {

        // create a container for one project
        const projectContainer = document.createElement('div')
        projectContainer.classList.add('project-container')

        // create icon for project
        const img = document.createElement('img')
        img.src = projectIcon

        // create an h3 for every project name on the sidebar
        const h3 = document.createElement('h3')
        h3.textContent = proj.projectName

        // delete btn for the project
        const deleteBtn = document.createElement('img')
        deleteBtn.src = trashIcon
        deleteBtn.classList.add('delete-btn')
        // delete from localStorage then reload the sidebar
        deleteBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent the event from bubbling up to the project container
            deleteProjectFromLocalStorage(proj.projectName)
            loadSidebarProjects()
            loadProjectContent('')
        })

        // onclick we load any tasks that project has and add the active class to the element
        projectContainer.addEventListener('click', () => {
            setCurrentProject(proj.projectName);
            // load the contents of that project
            loadProjectContent(getCurrentProject());
            loadTasks(getCurrentProject())
            // Remove .sidebar-active from all other project containers
            document.querySelectorAll('.project-container').forEach(element => {
                element.classList.remove('sidebar-active')
            })
            // Add .sidebar-active to the clicked project container
            projectContainer.classList.add('sidebar-active')
        })

        // add it to sidebar projects
        projectContainer.append(img, h3, deleteBtn)
        projectsContainer.appendChild(projectContainer)
    })
}

export default loadSidebarProjects;
