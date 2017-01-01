'use strict';

var dim = 25;
var board = new Array(dim);
for (var i = 0; i < board.length; i++) {
  board[i] = new Array(dim);
  for (var j = 0; j < board[i].length; j++) {
    board[i][j] = Math.floor(Math.random() * 2);
  }
}

var GameOfLife = React.createClass({
  displayName: 'GameOfLife',

  getInitialState: function getInitialState() {
    return {
      dim: this.props.dim,
      board: this.props.board,
      round: 0
    };
  },
  handleInput: function handleInput(e) {
    var current = this.state.board;
    var row = Math.floor(parseInt(e.target.id) / 100);
    var col = parseInt(e.target.id) % 100;
    current[row][col] = current[row][col] === 1 ? 0 : 1;
    this.setState({ board: current });
  },
  clearBoard: function clearBoard() {
    var cur = this.state.board;
    var nex = this.state.board;
    for (var i = 0; i < cur.length; i++) {
      for (var j = 0; j < cur[i].length; j++) {
        nex[i][j] = 0;
      }
    }
    this.setState({ board: nex, round: 0 });
  },
  cellsLog: function cellsLog() {
    var r = this.state.board.length - 1;
    var c = this.state.board[0].length - 1;
    var cur = this.state.board;
    var nex = new Array(this.state.dim);
    var val_nbh = new Array(this.state.dim);
    for (var i = 0; i < nex.length; i++) {
      nex[i] = new Array(this.dim);
      val_nbh[i] = new Array(this.dim);
    }
    var r1, r3, c1, c3;

    for (var i = 0; i <= r; i++) {
      for (var j = 0; j <= c; j++) {
        r1 = i == 0 ? r : i - 1;
        r3 = i == r ? 0 : i + 1;
        c1 = j == 0 ? c : j - 1;
        c3 = j == c ? 0 : j + 1;
        val_nbh[i][j] = cur[r1][c1] + cur[r1][j] + cur[r1][c3] + cur[i][c1] + cur[i][c3] + cur[r3][c1] + cur[r3][j] + cur[r3][c3];
        if (cur[i][j] == 0) {
          nex[i][j] = val_nbh[i][j] == 3 ? 1 : 0;
        } else if (cur[i][j] == 1) {
          nex[i][j] = [2, 3].indexOf(val_nbh[i][j]) != -1 ? 1 : 0;
        }
      }
    }
    console.log(cur);
    console.log(val_nbh);
    console.log(nex);
  },
  gameOfLife: function gameOfLife() {
    var cur_round = this.state.round + 1;
    var r = this.state.board.length - 1;
    var c = this.state.board[0].length - 1;
    var cur = this.state.board;
    var nex = new Array(this.state.dim);
    var val_nbh = new Array(this.state.dim);
    for (var i = 0; i < nex.length; i++) {
      nex[i] = new Array(this.state.dim);
      val_nbh[i] = new Array(this.state.dim);
    }
    var r1, r3, c1, c3;
    for (var i = 0; i <= r; i++) {
      for (var j = 0; j <= c; j++) {
        r1 = i == 0 ? r : i - 1;
        r3 = i == r ? 0 : i + 1;
        c1 = j == 0 ? c : j - 1;
        c3 = j == c ? 0 : j + 1;
        val_nbh[i][j] = cur[r1][c1] + cur[r1][j] + cur[r1][c3] + cur[i][c1] + cur[i][c3] + cur[r3][c1] + cur[r3][j] + cur[r3][c3];
        if (cur[i][j] == 0) {
          nex[i][j] = val_nbh[i][j] == 3 ? 1 : 0;
        } else if (cur[i][j] == 1) {
          nex[i][j] = [2, 3].indexOf(val_nbh[i][j]) != -1 ? 1 : 0;
        }
      }
    }
    this.setState({ board: nex, round: cur_round });
  },
  run: function run() {
    clearInterval(this.state.intervalID);
    var intervalID = setInterval(function () {
      var nextBoard = this.gameOfLife();
    }.bind(this), 250);
    this.setState({ intervalID: intervalID });
  },
  stopInterval: function stopInterval() {
    clearInterval(this.state.intervalID);
  },
  render: function render() {
    var rows = this.state.board.map(function (item, idx_r) {
      var cells = item.map(function (element, idx_c) {
        return React.createElement('td', { className: 'color' + element, id: 100 * idx_r + idx_c, value: element, onClick: this.handleInput });
      }.bind(this));
      return React.createElement(
        'tr',
        null,
        cells
      );
    }.bind(this));
    return React.createElement(
      'div',
      null,
      React.createElement(
        'table',
        null,
        rows
      ),
      React.createElement('br', null),
      React.createElement(
        'h2',
        null,
        'Round: ',
        this.state.round
      ),
      React.createElement(
        'div',
        { className: 'panel' },
        React.createElement(
          'button',
          { onClick: this.run },
          'Play'
        ),
        React.createElement(
          'button',
          { onClick: this.stopInterval },
          'Stop'
        ),
        React.createElement(
          'button',
          { onClick: this.clearBoard },
          'Clear'
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(GameOfLife, { board: board, dim: dim }), document.getElementById('board'));

//          <button onClick={this.gameOfLife}>Play once</button>
//          <button onClick={this.cellsLog}>Cells Log</button>