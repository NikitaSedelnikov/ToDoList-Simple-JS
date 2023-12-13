(function () {

    let tasksArray = [];
    function createAppTitle(title)
    {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;

        if (localStorage.getItem('tasks'))
        {
            tasksArray = JSON.parse(localStorage.getItem('tasks'));
        }

        return appTitle;
    }

    function createToDoItemForm()
    {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';

        buttonWrapper.append(button);
        form.append(input);
        form.append(button);

        return {
          form,
          input,
          button,
        };

    }
    function createTodoList()
    {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function taskIsDone(object)
    {
        if (object.isDone == true)
        {
            object.item.classList.toggle('list-group-item-success');

        }
        return object;
    }
    function createTodoItem (object, isNew)
    {
        let item = document.createElement('li');

        let buttonGroup  = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');
        let isDone = object.isDone;

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = object.name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        deleteButton.classList.add('btn', 'btn-danger');
        doneButton.textContent = 'Готово';
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);


        let count = isNew ? tasksArray.length + 1 : object.id;
        if (isNew == true)
        {
            let newObject = {id: count, name: object.name, isDone: object.isDone};
            tasksArray.push(newObject);
            localStorage.removeItem('tasks');
            localStorage.setItem('tasks', JSON.stringify(tasksArray));
            return {
                isDone,
                count,
                item,
                buttonGroup,
                doneButton,
                deleteButton,
            };
        } else {
            return {
                isDone,
                count,
                item,
                buttonGroup,
                doneButton,
                deleteButton,

            };
        }

    }


    (()=> {
        document.addEventListener('DOMContentLoaded', function (){

             let container = document.getElementById('todo')

             let todoAppTitle = createAppTitle('Список дел');
             let todoItemForm = createToDoItemForm();
             let todoList = createTodoList();

             container.append(todoAppTitle);
             container.append(todoItemForm.form);
             container.append(todoList);

            (()=>{
                for (task in tasksArray)
                {
                    let todoTask = createTodoItem(tasksArray[task], false);
                    todoList.append(todoTask.item);
                    if (tasksArray[task].isDone === true)
                    {
                        todoTask.item.classList.toggle('list-group-item-success');
                    }

                    todoTask.doneButton.addEventListener('click', function (){
                        let count = todoTask.count-1;
                        if (tasksArray[count].isDone == false)
                        {
                            tasksArray[count].isDone = true;
                        } else {
                            tasksArray[count].isDone = false;
                        }

                        localStorage.removeItem('tasks');
                        localStorage.setItem('tasks', JSON.stringify(tasksArray));
                        todoTask.item.classList.toggle('list-group-item-success');
                    });
                    todoTask.deleteButton.addEventListener('click', function () {
                        if (confirm('Ты уверен?'))
                        {
                            todoTask.item.remove();
                            tasksArray.splice(tasksArray.count-1, 1);
                            localStorage.removeItem('tasks');
                            localStorage.setItem('tasks', JSON.stringify(tasksArray));
                        }
                    });

                }
            })();


             if (!todoItemForm.input.value)
             {
                 todoItemForm.button.disabled = true;
             }
             todoItemForm.input.addEventListener('input', function () {
                 todoItemForm.button.disabled = false;
                 if (!todoItemForm.input.value)
                 {
                     todoItemForm.button.disabled = true;
                 }
             });

             todoItemForm.form.addEventListener('submit', function (e){
                 e.preventDefault();

                 if (!todoItemForm.input.value)
                 {
                     return;
                 }

                 let todoItem = createTodoItem({name: todoItemForm.input.value, isDone:false}, true);

                 todoItem.doneButton.addEventListener('click', function (){
                     let count = todoItem.count-1;
                     tasksArray[count].isDone = true;
                     localStorage.removeItem('tasks');
                     localStorage.setItem('tasks', JSON.stringify(tasksArray));
                     todoItem.item.classList.toggle('list-group-item-success');
                 });
                 todoItem.deleteButton.addEventListener('click', function () {
                    if (confirm('Ты уверен?'))
                    {
                        todoItem.item.remove();
                        tasksArray.splice(tasksArray.count-1, 1);
                        localStorage.removeItem('tasks');
                        localStorage.setItem('tasks', JSON.stringify(tasksArray));
                    }
                 });


                 todoList.append(todoItem.item);
                 todoItemForm.input.value = '';

                 if (!todoItemForm.input.value)
                 {
                     todoItemForm.button.disabled = true;
                 }

             });
        })
    })();
})();