import { Todo } from ".";

export class TodoList {
    
    constructor(){
        //this.todos = [];
        this.cargarLocalStorage();
    }

    nuevoTodo(todo) {
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    eliminarTodo( id ) {
        this.todos = this.todos.filter(x => x.id != id);
        this.guardarLocalStorage();
    }

    marcarCompletado ( id ) {

        for(const todo of this.todos){
            //console.info(id, todo.id);

            if(id == todo.id){
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }

    eliminarCompletados () {
        this.todos = this.todos.filter(x => !x.completado);
        this.guardarLocalStorage();
    }

    guardarLocalStorage() {

        localStorage.setItem('todo', JSON.stringify(this.todos));

    }

    cargarLocalStorage() {

        this.todos = (localStorage.getItem('todo'))
                      ? JSON.parse(localStorage.getItem('todo'))
                      : [];

        this.todos = this.todos.map( obj => Todo.fromJson(obj) );
    }

}
