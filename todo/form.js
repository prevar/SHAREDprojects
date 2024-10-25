function TodoForm({addTodo}) {
    const [value, setValue] = React.useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if(!value) return;
        addTodo(value);
        setValue('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div style={{border : '1px solid black'}}>
            <input type="text" className="inputClass" value={value} placeholder="Add a New To Do" onChange={ e => setValue(e.target.value)}/>
            <button className="btnAdd" onClick={handleSubmit}>Add</button>
            </div>
        </form>
    );
}