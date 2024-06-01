
class Project {

    constructor() {
        this.projectName = ''
        this.title = ''
        this.description = ''
        this.dueDate = ''
        this.priority = ''
        this.projects = []
        this.projectsContainer = document.querySelector('.projects')
        this.content = document.querySelector('.content')
        this.modal = document.querySelector('dialog')
    }

    addNewProject = () => {
        this.projects.push({
            title,
            description,
            dueDate,
            priority,
        })
    }

    displaySidebarProject = (projectName) => {
        this.projectName = projectName
        const h3 = document.createElement('h3')
        h3.textContent = this.projectName
        this.projectsContainer.appendChild(h3)

        h3.addEventListener('click', () => {
            this.content.textContent = ''
            const h4 = document.createElement('h4')
            h4.textContent = projectName
            this.content.appendChild(h4)

            const taskBtn = document.createElement('button')
            taskBtn.textContent = "+ Add Task"
            taskBtn.classList.add('task-btn')
            this.content.appendChild(taskBtn)

            taskBtn.addEventListener('click', () => this.modal.showModal())
            document.querySelector('.close-modal').addEventListener('click', () => this.modal.close())
        })
    }

    displayContent = () => {

    }

}

export default Project

