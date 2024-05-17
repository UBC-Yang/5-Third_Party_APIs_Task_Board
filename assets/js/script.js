// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const id = nextId;
    nextId++;
    localStorage.setItem('nextId', JSON.stringify(nextId));
    return id;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCards = [];

    const today = dayjs();
    const taskDates = dayjs(task.dueDate);
    let dateClass = '';

    if (taskDates.isSame(today, 'day')) {
        dateClass = 'warn'
    } else if (taskDates.isBefore(today)) {
        dateClass = 'late'
    }

    const title = $('<h5>').addClass('card-title').text(task.title);
    const dueDate = $('<h6>').addClass('card-subtitle mb-2').text(`Due: ${task.dueDate}`);
    const description = $('<p>').addClass('card-text').text(task.description);

    const deleteButton = $('<button>')
        .addClass('btn btn-danger btn-sm')
        .text('Delete')
        .click(handleDeleteTask);

    const cardBody = $('<div>').addClass(`card-body ${dateClass}`)
        .append(title)
        .append(dueDate)
        .append(description)
        .append(deleteButton);
    
    if (task.status === 'done') {
        cardBody.addClass('done-card');
    }
    
    const card = $('<div>')
        .addClass('card mb-3')
        .attr('data-id', task.id)
        .append(cardBody);

    const cardEl = $(card);
    taskCards.push(cardEl);
    
    return taskCards; 
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const lanes = {
        'to-do': $('#todo-cards'),
        'in-progress': $('#in-progress-cards'),
        'done': $('#done-cards')
    }

    for (let lane in lanes) {
        lanes[lane].empty();
    }

    taskList.forEach(task => {
        const taskCard = createTaskCard(task);
        lanes[task.status].append(taskCard);
    });

    $('.card').draggable();
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();

    const title = $('input[name="title"]').val();
    const dueDate = $('input[name="dueDate"]').val();
    const description = $('textarea[name="description"]').val();

    const newTask = {
        id: generateTaskId(),
        title: title,
        dueDate: dueDate,
        description: description,
        status: 'to-do'
    }

    taskList.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(taskList));

    renderTaskList();
    $('#formModal').modal('hide');
    $('#taskForm')[0].reset();
}


// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    const card = $(event.target).closest('.card');
    const id = card.attr('data-id');

    taskList = taskList.filter(task => task.id != id);
    localStorage.setItem('tasks', JSON.stringify(taskList));

    card.remove(); 
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

    const taskId = ui.draggable[0].dataset.id;
    const updatedStatus = event.target.id

    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == parseInt(taskId)) {
            taskList[i].status = updatedStatus;
        }
    }

    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList()
}
    

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $("#dueDate").datepicker({
        dateFormat: 'mm-dd-yy'
    });

    $('#taskForm').on('submit', handleAddTask);

    renderTaskList();

    $('.lane').droppable({
        accept: '.card',
        drop: handleDrop,
    })
});

