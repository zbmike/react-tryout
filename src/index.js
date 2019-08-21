import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// square become a function component so no 'render' 
// takes props as input and returns what should be rendered
function Square(props) {

  // instead of 'render', it 'returns' object as functions do
  // #return() a button
  return (
    // 
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

//
class Board extends React.Component {
  constructor(props) {
    super(props);
    // so actually 'state' is an object
    // has 'squares' and 'xIsNext'
    this.state = {
      squares: Array(9).fill(null),      
      xIsNext: true,
    };
  }

  // functions used in render()
  // called when clicked
  handleClick(i) {
    // use slice to create a copy of squares array
    const squares = this.state.squares.slice();

    // return condition to ignore clicks on clicked squares or
    // there is already a winner
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    // set 'squares' of 'Board' to be the new array

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  // renders each square
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  // render in each component
  render() {
    // const is for immutability
    const winner = calculateWinner(this.state.squares);
    // status is directly changed so use 'let'
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      // curly braces mean 'status' is the const above not string
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {

  // render in each component
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

// logic
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
  // for loop to test each line defined above
  for (let i = 0; i < lines.length; i++) {
    // get square numbers to a,b,c
    const [a, b, c] = lines[i];
    // === is strict equality, if the line has all same sign it declares a winner
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}