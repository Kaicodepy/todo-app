import todoStore, { Filters } from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos,renderPending } from './use-cases';

const ElementIDs = {
    ClearCompleted: '.clear-completed',
    Todolist: '.todo-list',
    newTodoInput : '#new-todo-input',
    todoFilters : '.filtro',
    PendingCountLabel: '#pending-count',
}


/**
 * 
 * @param {String} elementID 
 */
export const App = ( elementID ) =>{

    const displayTodos = () =>
    {
       const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
       renderTodos( ElementIDs.Todolist, todos );
       updatePendingCount();
        
    }

    const updatePendingCount = () =>
    {
        renderPending(ElementIDs.PendingCountLabel);
    }

    // cuando la aplicacion aoo se llama   
    ( ()=>{  
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementID).append(app);  
        displayTodos();
    })();

    //Referencias HTML
    const newDescriptionInput = document.querySelector( ElementIDs.newTodoInput);
    const todoListUL = document.querySelector( ElementIDs.Todolist);
    const clearCompletedButton = document.querySelector( ElementIDs.ClearCompleted);
    const filterLIs = document.querySelectorAll(ElementIDs.todoFilters); 

    //Listeners
    newDescriptionInput.addEventListener('keyup', ( event ) => {
        if(event.keyCode !== 13 ) return;
        if(event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', (event) =>{
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    todoListUL.addEventListener('click', (event) =>{
        const element = event.target.closest('[data-id]');
        
        const eventClass = event.target.className;
        
        if(eventClass === 'destroy')
        {   
            todoStore.deleteTodo(element.getAttribute('data-id'));
            displayTodos();
        }
    });

    clearCompletedButton.addEventListener('click', (event) =>{
        todoStore.deleteCompleted();
        displayTodos();
    });

    filterLIs.forEach(element => {
            
            element.addEventListener('click', (element) =>{
            filterLIs.forEach( el => el.classList.remove('selected'));
            element.target.classList.add('selected');
                
            switch (element.target.text)
            {   
                case 'Todos':
                    todoStore.setFilter(Filters.All);
                    break;
                
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending);
                    break;
                
                case 'Completados':
                    todoStore.setFilter(Filters.Completed);
                    break;


            }
            displayTodos();
        });
    

    });

}