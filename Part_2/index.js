// Now that you have learned a bit of jQuery, it's time to refactor an application from vanilla JS to use jQuery! 
// You can reuse an application that you have built previously, like the Todo application,

$(document).ready(function(){
    // MY ID CREATOR
    // let idCreator = 1;
    var GenRandom =  {

        Stored: [],
    
        Job: function(){
            var newId = Date.now().toString().substr(6); // or use any method that you want to achieve this string
    
            if( this.Check(newId) ){
                this.Job();
            }
    
            this.Stored.push(newId);
            return newId; // or store it in sql database or whatever you want
    
        },
    
        Check: function(id){
            for( var i = 0; i < this.Stored.length; i++ ){
                if( this.Stored[i] == id ) return true;
            }
            return false;
        }
    
    };

    // Task Class Declaration
    class Task{
        constructor(name, taskID){
            this.name = name,
            this.taskID = taskID
        }
    };

    // Store Class: To Handle My storage
    class Store {
        static getTasks() {
            let tasks;
            if(localStorage.getItem('tasks') === null){
                tasks = [];
            } else {
                tasks = JSON.parse(localStorage.getItem('tasks'));
            }
            return tasks;
        };

        static addTask(task) {
            const tasks = Store.getTasks();

            tasks.push(task);

            localStorage.setItem('tasks', JSON.stringify(tasks));
        };

        static deleteTask($el){
            const tasks = Store.getTasks();

            if($el.hasClass('delete')){
                let element = $el.parent().prev().attr('id');
                console.log(element);
                tasks.forEach((task, index) => {
                    if(task.taskID == element){
                        tasks.splice(index, 1);
                    }
                });
                localStorage.setItem('tasks', JSON.stringify(tasks))
            }
        };
    };


    //UI Class Declaration
    class UI{
        static displayTasks(){
            const tasks = Store.getTasks();

            tasks.forEach((task) => UI.addTaskToList(task))
        }

        static addTaskToList(task){
            let $section = $('section');

            // Create the Div that will contain all my stuff
            let $myDiv = $('<div>');

            // Create the Input
            let $myInput = $('<input>', {
                attr: {
                    type: 'checkbox'
                }
            });
            $myInput.addClass('checker');

            // Create the Span element
            let $mySpan = $('<span>');
            $mySpan.addClass('items');
            $mySpan.attr('id', task.taskID);

            // Validate the Input
            if(task.name === ''){
                showAlert('Please Fill the Input', 'danger');
            } else {
                $mySpan.text(task.name);

                // Create the icon
                let $iconSpan = $('<span>');
                $iconSpan.html('<button type="button" class="btn btn-danger delete">X</button>');
                
                // Attachment time!!
                $myDiv.append($myInput);
                $myDiv.append($mySpan);
                $myDiv.append($iconSpan);

                $section.append($myDiv);

                // Show success message
                showAlert('Task Added Successfully', 'success');
            }
        };

        static deleteTask($el){
            if($el.hasClass('delete')){
                $el.parent().parent().remove();
                showAlert('Task deleted successfully', 'danger');
            };
        };

        static striker($el){
            if($el.hasClass('checker')){
                let $myTask = $el.next();
                $myTask.toggleClass('itemStroke');
            }
        }

        static clearField(){
            $('#new_task').val('');
        }
    };

    // Event: Display Books THE VERY IGNITION OF THE CODE
    UI.displayTasks();

    // Event Add a Task
    $('#myForm').on('submit', (e) => {
        e.preventDefault();

        // Target the new task div
        var $myNewTask = $('#new_task').val();
        let myID = GenRandom.Job();

        // Instatiate a Task
        const task  = new Task($myNewTask, myID);

        // Add Task to the UI
        UI.addTaskToList(task);
        console.log(task);

        // Add Task to Local storage
        Store.addTask(task);

        // Clear the UI
        UI.clearField();
    });


    // Event Delete a Task
    $('section').on('click', (e) => {
        // Remove Task from UI
        UI.deleteTask($(e.target));

        // Remove Task from Storage
        Store.deleteTask($(e.target));

        UI.striker($(e.target));
    });



    // The show alert function
    function showAlert(message, className){
        let $alertDiv = $('<div>');
        $alertDiv.addClass('alert alert-'+className);
        $alertDiv.append(document.createTextNode(message));

        let $form = $('#myForm');

        $form.prepend($alertDiv);

        // Disappear in 2 seconds
        setTimeout(() => $('.alert').remove(), 2000);
    };
})