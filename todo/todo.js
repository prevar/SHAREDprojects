function Todo({todo, index, remove}) {

    function handle() {
        remove(index);
    }

    return <div className="todoItem" >{todo.text} <button className="btnRem" onClick={handle}>Remove </button> </div> ;
    
}