// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    if (!nextId) {
        nextId = 1;
    } else {
        nextId++
    }
    localStorage.setItem('nextId', JSON.stringify(nextId));
    return nextId
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const card = $(`
        <div class="card mb-3" data-id="${task.id}">
            <div class="card-body">
                <h5 class="card-title">${task.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${task.dueDate}</h6>
                <p class="card-text">${task.description}</p>
            </div>
        </div>
    `);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
   
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();

    const title = $('input[name="title"]').val();
    const dueDate = $('input[name="dueDate"]').val();
    const description = $('input[name="description"]').val();

    const newTask = {
        id: generateTaskId(),
        title,
        dueDate,
        description,
    }

    $('#formModal').modal('hide');
    $('#taskForm')[0].reset();
}


// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $("#dueDate").datepicker();

    $('#taskForm').on('submit', handleAddTask);
});
