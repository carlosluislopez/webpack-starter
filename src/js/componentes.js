import { Todo } from '../classes'

import { todolist } from '../index'


const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHTML = ( todo ) => {

    const htmlTodo = `<li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
                        <div class="view">
                            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
                            <label>${ todo.tarea }</label>
                            <button class="destroy"></button>
                        </div>
                        <input class="edit" value="Create a TodoMVC template">
                    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;

}


txtInput.addEventListener('keyup', (event) => {

    //console.info(event);

    if(event.keyCode !== 13)
        return;

    if(txtInput.value.length === 0)
        return;

    //console.info(txtInput.value);

    const nuevoTodo = new Todo(txtInput.value);
    todolist.nuevoTodo(nuevoTodo);

    crearTodoHTML(nuevoTodo);

    txtInput.value = '';

    //console.info(todolist);

});

divTodoList.addEventListener('click', (event) => {

    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if(nombreElemento.includes('input')){
        todolist.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    }else if(nombreElemento.includes('button')){
        todolist.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }

    //console.info(todolist);

});

btnBorrar.addEventListener('click', () => {
    todolist.eliminarCompletados();

    for(let i = divTodoList.children.length-1; i>= 0; i--){
        const elemento = divTodoList.children[i];

        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }

    //console.info(todolist);
});

ulFiltros.addEventListener('click', (event) => {
    //console.info(event.target.text);
    const filtro = event.target.text;

    if(!filtro)
        return;

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for(const elemento of divTodoList.children){
        elemento.classList.remove('hidden');
        const compleato = elemento.classList.contains('completed');

        switch(filtro){
            case 'Pendientes':
                if(compleato){
                    elemento.classList.add('hidden');
                }
            case 'Completados':
                if(!compleato){
                    elemento.classList.add('hidden');
                }
            default:
                break;
        }
    }
});