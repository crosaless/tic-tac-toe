import {useState} from 'react';

function Square({value, onSquareClick}) {
  /*const [value, setValue] = useState(null);
  
  function handleClick(){
    setValue('X');
    console.log('hiciste click');
  }*/


  return (
    <button 
    className="square"
    onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({xIsNext, squares, onPlay}) { //i forget to send the attributes to the function like structure with {}
  //const [xIsNext, setXIsNext] = useState(true);
  //const [squares, setSquares] = useState(Array(9).fill(null));  
  
  function handleClick(i){
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    const nextSquares = squares.slice();
    if(xIsNext){
      nextSquares[i] = "x";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
    //setSquares(nextSquares);
    //setXIsNext(!xIsNext);  
  }
  
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Ganador: ' + winner;
  } else {
    status = 'Siguiente jugador: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={ () => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={ () => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={ () => handleClick(2)}/>
      </div>

      <div className="board-row">
        <Square value={squares[3]} onSquareClick={ () => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={ () => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={ () => handleClick(5)}/>
      </div>

      <div className="board-row">
        <Square value={squares[6]} onSquareClick={ () => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={ () => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={ () => handleClick(8)}/>
      </div>
    </>
  );
}

export default function Game() {
  //const [xIsNext, setXIsNext] = useState(true);
  let xIsNext = null;
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  

  

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    //setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    //setXIsNext(nextMove % 2 === 0);
  }
  
  const moves = history.map((squares, move) => {
    let description;

    if(move > 0){
      description = 'ir al movimiento nro' + move;
    } else {
      description = 'ir al incio del juego';
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );

  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}