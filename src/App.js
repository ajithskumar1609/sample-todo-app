import { useState } from "react"


const initialTodos = [
    {
        id:1,
        title:'Make a coffee',
        finished:false,
    },
    {
        id:2,
        title:'Read book',
        finished:false,
    },
    {
        id:3,
        title:'Clean bedroom',
        finished:false,
    }
]

function App(){

    const [showTodo,setShowTodo] = useState(true);


    function handleShowTodo(){
        setShowTodo((currentShowTodo) => !currentShowTodo);
    }

    return (
        <div className="app">
            <button className="btn" onClick={handleShowTodo}>&times;</button>
            {
                showTodo && <TodoApp />
            }
            
        </div>
    )
}

function TodoApp(){

    // const todos = initialTodos;

    const [todos,setTodos] = useState(initialTodos);

    const totalTodoCount =todos.length;

    const totalFinishedTodo = todos.filter((todo) => todo.finished).length;


    function handleAddTodo(todo){
        setTodos((currentTodos) => [...currentTodos,todo]);
    }

    function handleDeleteTodo(id){
        setTodos((currentTodo) => currentTodo.filter((todo) => todo.id !== id))
    }

    function handleToggleTodo(id){
        setTodos((currentTodos) => currentTodos.map((todo) => todo.id === id ? {...todo,finished:!todo.finished}: todo))
    }

    return (
        <div className="todo-app">
            <h1>Todo App</h1>
            <FormAddList  onAddTodo={handleAddTodo}/>
            <TodoList  todos={todos} onDeleteTodo={handleDeleteTodo} onToggleTodo={handleToggleTodo}/>
            <Count totalCount={totalTodoCount} totalFinishedCount={totalFinishedTodo}/>
        </div>
    )
}

function FormAddList({onAddTodo}){

    const [title,setTitle] = useState('');

    function handleSubmit(event){
        event.preventDefault();

        const newTodo = {
            title,
            finished:false,
            id:crypto.randomUUID()
        }

        console.log(newTodo);
        onAddTodo(newTodo);

        setTitle('');
    }


    return (
        <form className="form" onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}/>
            <button>Add</button>
        </form>
    )
}

function TodoList({todos,onDeleteTodo,onToggleTodo}){


    let sortedTodos = todos.sort((a,b) => Number(a.finished) - Number(b.finished));

    return (
        <ul className="todo-list">
            {
              sortedTodos.map((todo) => <Todo todo={todo} key={todo.title} onDeleteTodo={onDeleteTodo} onToggleTodo={onToggleTodo}/>)
            }
        </ul>
    )
}

function Todo({todo,onDeleteTodo,onToggleTodo}){

    return (
        <li className={`list ${todo.finished ? 'selected':''}`}>
                <input type="checkbox" value={todo.finished} onClick={() => onToggleTodo(todo.id)}/>
                {todo.title}
                <button onClick={() => onDeleteTodo(todo.id)}>❌</button>
        </li>
    )
}

function Count({totalCount,totalFinishedCount}){
    return (
        <div className="count">
            <h3>Finished Todo: <strong>{totalFinishedCount}</strong></h3>
            <h3>Total Todo: <strong>{totalCount}</strong></h3>
        </div>
    )
}

export default App;