import './styles.css';

import { Todo, TodoList } from './classes';
import { crearTodoHTML } from './js/componentes';
 
export const todolist = new TodoList();

todolist.todos.forEach( crearTodoHTML );

//const newTodo = new Todo('Instancias');
//todolist.nuevoTodo(newTodo);

console.info('todos', todolist.todos);