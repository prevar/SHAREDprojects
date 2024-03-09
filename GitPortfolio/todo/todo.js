function Todo({todo, index, remove}) {

    return <div onClick={remove} className='todoItem'>{todo.text} (-)</div>;
}