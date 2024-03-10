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

   /* const handleRemove = index=> {
        console.log('****'+index);
        const i = Number(index);
        console.log('****'+i);
        let temp = [...todos]
        temp.splice(i,1);
        setTodos(temp);
    }*/

    const removeTodo = index => {
        let temp = [...todos];
        temp.splice(index,1);
        setTodos(temp);
    }

    return (<div className="app">
                <TodoForm addTodo={addTodo}/>
                <div className="listWrapper">
                {todos.map( (todo, i)=> 
                <Todo index={i} key={i} todo={todo} remove={removeTodo}/>) }
                </div>
        </div>
    );
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)