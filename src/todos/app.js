import todoStore from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos } from './use-cases';

const ElementIDs = {
    Todolist: '.todo-list',
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

    })();

}