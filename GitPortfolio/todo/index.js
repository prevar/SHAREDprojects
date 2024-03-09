function App() {
   
    const [todos, setTodos] = React.useState([
        {
            text:'Learn React',
            completed: false
        },
        {
            text:'Meet Friends for Lunch',
            completed: false
        },
        {
            text:'Style the TODO list',
            completed: false
        }       
    ]);
    
        const addTodo = todoText => {
            const newTodos = [...todos, {text:todoText, completed:false}]
            setTodos(newTodos);
        } 

    const handleRemove = index=> {
        let temp = [...todos]
        temp.splice(index,1);
        setTodos(temp);
    }

    return (
        <div className="app">
            <div className="listWrapper">
                {todos.map( (todo, i)=> <Todo index={i} todo={todo} remove={handleRemove} /> ) }
                <TodoForm addTodo={addTodo}/>
            </div>
        </div>
    );
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)