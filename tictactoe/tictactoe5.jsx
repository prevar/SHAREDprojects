
const Squares = ({id, player, newState})=> {
    const [color, setColor] = React.useState('green');
    const [status, setStatus] = React.useState(null);
    const XorO = ['O','X'];
    
    const palet = ['yellow','blue','green'];
    const getRandomColor = ()=> palet[Math.floor(Math.random()*3)];
    //console.log('id='+id +'and player='+ player);
    React.useEffect(()=> {
       // console.log(`render id=${id}`);
        return ()=>{}//console.log(`unmounting square id = ${id}`);
    })
   return (<button className='btn' onClick={
    (e)=>{
        let col = getRandomColor();
        setColor(col);
        let nextPlayer = newState(id); //, color:col});
        console.log('my id is'+id+'player='+player)
        setStatus(nextPlayer);
        e.target.style.background = col;
    }
    }>
    <h1 className={status==0?"red":"white"}>{XorO[status]}</h1>
    </button>) ;
}

const Board = () => {
    console.log('in board');
    const [player,setPlayer] = React.useState(1);
    const [state, setState] = React.useState(Array(9).fill(null));

    let status = `Player ${player}`; 
    let winner = checkWinner(state);
    if (winner != null) status=`Player ${winner} wins`;

    //This function is defined and passed down to square to invoke 
    //and update state of the board
    const newState = (idOfSquare) => {
        let thePlayer = player;
        state[idOfSquare] = thePlayer; //present player
        setState(state); //state is array of 0 or 1 or null

        let nextPlayer = (thePlayer +1)%2;
        setPlayer(nextPlayer);
        return thePlayer; //return present player
    }

    function renderSquare(i) {
        //console.log('in rendersquare'+i);
        return (<Squares id={i} player={player} newState={newState}>hello</Squares>);
    }   

    return (
        
        <div className="board"
        onClick = {(e)=>{
                //setPlayer( (player +1)%2 );
                console.log('player='+status);
             }}>
            <div>
                <div className="grid-row grid-row-1">{ renderSquare(0, player)} { renderSquare(1, player)} { renderSquare(2, player)}</div>
                <div className="grid-row grid-row-2">{ renderSquare(3, player)} { renderSquare(4, player)} { renderSquare(5, player)}</div>
                <div className="grid-row grid-row-3">{ renderSquare(6, player)} { renderSquare(7, player)} { renderSquare(8, player)}</div>
            </div>
            <div className="divstatus">
                <h1>{status}</h1>
            </div>
        </div>
        
        
        
    )
}

ReactDOM.render(<Board/> , document.getElementById("root"));