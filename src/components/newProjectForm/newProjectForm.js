import './newProjectForm.css'
import { addProjectToLocalStorage } from '../storage/storage'
import loadSidebarProjects from '../loadSidebarProjects/loadSidebarProjects'

function newProjectForm() {
    // form for adding new project when add project btn is clicked
    const sidebar = document.querySelector('.sidebar')
    const addProjectBtn = document.querySelector('.add-project')
    addProjectBtn.addEventListener('click', () => {

        // create a form field
        const form = document.createElement('form')
        form.classList.add('new-project-form')

        // input field for project name
        const label = document.createElement('label')
        const input = document.createElement('input')
        label.textContent = 'Enter project name:'

        // buttons for the form
        const btnContainer = document.createElement('div')
        btnContainer.classList.add('btn-container')
        const addBtn = document.createElement('button')
        addBtn.classList.add('add-btn')
        addBtn.textContent = 'Add project'
        const cancelBtn = document.createElement('button')
        cancelBtn.classList.add('cancel-btn')
        cancelBtn.textContent = 'Cancel'
        

        /* removing addProjectBtn then appending the form to the
         parent container */
        btnContainer.append(addBtn, cancelBtn)
        form.append(label, input, btnContainer)
        sidebar.removeChild(addProjectBtn)
        sidebar.appendChild(form)
        

        // buttons functionality
        addBtn.addEventListener('click', (e) => {
            /* stores project name to localStorage then calls another function
            to display the sidebarProjects */
            e.preventDefault()
            const projectName = input.value
            projectName ? addProjectToLocalStorage(projectName) : alert("Project name can't be empty")
            loadSidebarProjects()

        })
        cancelBtn.addEventListener('click', () => {
            sidebar.removeChild(form)
            sidebar.appendChild(addProjectBtn)
        })
    })
}

export default newProjectForm