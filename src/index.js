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
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
        return <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />;
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
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