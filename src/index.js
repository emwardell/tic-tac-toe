import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const SQUARES = {
  topLeft: 0,
  topCenter: 1,
  topRight: 2,
  middleLeft: 3,
  middleCenter: 4,
  middleRight: 5,
  bottomLeft: 6,
  bottomCenter: 7,
  bottomRight: 8
};

function Square(props) {
  return (
    <button onClick={() => props.onClick()} className="square">
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(SQUARES.topLeft)}
          {this.renderSquare(SQUARES.topCenter)}
          {this.renderSquare(SQUARES.topRight)}
        </div>
        <div className="board-row">
          {this.renderSquare(SQUARES.middleLeft)}
          {this.renderSquare(SQUARES.middleCenter)}
          {this.renderSquare(SQUARES.middleRight)}
        </div>
        <div className="board-row">
          {this.renderSquare(SQUARES.bottomLeft)}
          {this.renderSquare(SQUARES.bottomCenter)}
          {this.renderSquare(SQUARES.bottomRight)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        `Go to move #${move}` :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next Player: ${(this.state.xIsNext ? 'X' : 'O')}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [SQUARES.topLeft, SQUARES.topCenter, SQUARES.topRight], // top
    [SQUARES.middleLeft, SQUARES.middleCenter, SQUARES.middleRight], // middle
    [SQUARES.bottomLeft, SQUARES.bottomCenter, SQUARES.bottomRight], // bottom
    [SQUARES.topLeft, SQUARES.middleLeft, SQUARES.bottomLeft], // left
    [SQUARES.topCenter, SQUARES.middleCenter, SQUARES.bottomCenter], // center
    [SQUARES.topRight, SQUARES.middleRight, SQUARES.bottomRight], // right
    [SQUARES.topLeft, SQUARES.middleCenter, SQUARES.bottomRight], // diag down left to right
    [SQUARES.topRight, SQUARES.middleCenter, SQUARES.bottomLeft], // diag up left to right
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);