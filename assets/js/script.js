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
    const title = $('<h5>').addClass('card-title').text(task.title);
    const dueDate = $('<h6>').addClass('card-dueDate').text(task.dueDate);
    const description = $('<p>').addClass('card-text').text(task.description);

    const cardBody = $('<div>').addClass('card-body')
        .append(title)
        .append(dueDate)
        .append(description);

    const card = $('<div>')
        .addClass('card mb-3')
        .attr('data-id', task.id)
        .append(cardBody);

    return card;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const lanes = {
        'to-do': $('#todo-cards'),
        'in-progress': $('#in-progress-cards'),
        'done': $('#done-cards')
    }
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
        status: 'to-do'
    }

    localStorage.setItem('tasks', JSON.stringify(taskList));

    renderTaskList();
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

    renderTaskList();

    $('lane').droppable({
        accept: '.card',
        drop: handleDrop
    })
});
