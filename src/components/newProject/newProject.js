import './newProject.css'

const newProject = () => {
    const sidebar = document.querySelector('.sidebar')
    const newBtn = document.querySelector('.add-project')
    sidebar.removeChild(newBtn);

    const form = document.createElement('form')
    form.classList.add('new-form')

    const newAddLabel = document.createElement('label')
    newAddLabel.textContent = 'Enter project name:'

    const newAddInput = document.createElement('input')

    newAddLabel.appendChild(newAddInput)


    const btnContainer = document.createElement('div')
    btnContainer.classList.add('btn-container')

    const newAddBtn = document.createElement('button')
    newAddBtn.textContent = 'Add'
    newAddBtn.classList.add('new-add-btn')
    newAddBtn.addEventListener('click', () => displayProject())

    const newCancelBtn = document.createElement('button')
    newCancelBtn.textContent = 'Cancel'
    newCancelBtn.classList.add('new-cancel-btn')


    newCancelBtn.addEventListener('click', () => {
        sidebar.removeChild(form)
        sidebar.appendChild(newBtn) 
    })
    btnContainer.append(newAddBtn, newCancelBtn)
    form.append(newAddLabel, btnContainer)
    sidebar.appendChild(form)


}

export default newProject