import './loadSidebarProjects.css'
import { getAllProjectsFromLocalStorage } from '../storage/storage'
import { loadProjectContent } from '../loadProjectContent/loadProjectContent'
import projectIcon from '../../images/project.png'

function loadSidebarProjects() {
    // clear the current projects on the sidebar on reload
    const projectsContainer = document.querySelector('.projects')
    projectsContainer.innerHTML = ''

    // get all projects from localStorage
    getAllProjectsFromLocalStorage().map(proj => {
        // create an h3 for every project name on the sidebar
        const h3 = document.createElement('h3')
        h3.textContent = proj.projectName

        // onclick we load any tasks that project has and adding the active class to the element
        h3.addEventListener('click', () => {
            loadProjectContent(proj.projectName)
            document.querySelectorAll('.sidebar-active').forEach(element => {
                element.classList.remove('sidebar-active')
            })
            h3.classList.add('sidebar-active')
        })

        // create icon for project
        const img = document.createElement('img')
        img.src = projectIcon
        
        // add it to sidebar projects
        projectsContainer.append(img, h3)
    })
}

export default loadSidebarProjects