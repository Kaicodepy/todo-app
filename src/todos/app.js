import todoStore from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos } from './use-cases';

const ElementIDs = {
    Todolist: '.todo-list',
    newTodoInput : '#new-todo-input'
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
        if(eventClass == 'destroy');
        {   
            todoStore.deleteTodo(element.getAttribute('data-id'));
            displayTodos();
        }
    });


}