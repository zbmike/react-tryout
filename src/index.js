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
    const status = 'Next player: X';

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
