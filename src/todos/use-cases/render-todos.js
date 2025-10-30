import { Todo } from "../models/todo.model";
import { createTodoHTML } from "./create-todo-html";

let element;

export const renderTodos = ( elementID ,todos = [] ) =>
{   if( !element )
    element = document.querySelector( elementID );

    if( !element)
        throw new Error('The element doenst exist')
    
    element.innerHTML = '';

    todos.forEach( todo => {
    
    element.append(createTodoHTML(todo));
    });
}