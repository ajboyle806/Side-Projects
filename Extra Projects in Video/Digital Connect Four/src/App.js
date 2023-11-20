import React, { useState, useEffect } from "react";
import "./App.css";

//useKeypress function is based upon outside code
//source: Caktus Group blog post at https://www.caktusgroup.com/blog/2020/07/01/usekeypress-hook-react/
//author: Michael Ashton
function useKeypress(key, action) {
  useEffect(() => {
    function onKeyup(e) {
      if (e.key === key) action();
    }
    window.addEventListener("keyup", onKeyup);
    return () => window.removeEventListener("keyup", onKeyup);
  }, []);
}

function winCheck(board) {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      if (
        board[row][col] == board[row][col + 1] &&
        board[row][col + 1] == board[row][col + 2] &&
        board[row][col + 2] == board[row][col + 3] &&
        board[row][col] != 0
      ) {
        return {outcome: true, locations: [[row, col],[row, col + 1],[row, col + 2],[row, col + 3]]};
      }
    }
  }
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row < 3; row++) {
      if (
        board[row][col] == board[row + 1][col] &&
        board[row + 1][col] == board[row + 2][col] &&
        board[row + 2][col] == board[row + 3][col] &&
        board[row][col] != 0
      ) {
        return {outcome: true, locations: [[row, col], [row + 1, col], [row + 2, col], [row + 3, col]]};
      }
    }
  }
  for (let col = 0; col < 4; col++) {
    for (let row = 0; row < 3; row++) {
      if (
        board[row][col] == board[row + 1][col + 1] &&
        board[row + 1][col + 1] == board[row + 2][col + 2] &&
        board[row + 2][col + 2] == board[row + 3][col + 3] &&
        board[row][col] != 0
      ) {
        return {outcome: true, locations: [[row, col], [row + 1, col + 1], [row + 2, col + 2], [row + 3, col + 3]]};
      }
    }
  }
  for (let col = 0; col < 4; col++) {
    for (let row = 5; row > 2; row--) {
      if (
        board[row][col] == board[row - 1][col + 1] &&
        board[row - 1][col + 1] == board[row - 2][col + 2] &&
        board[row - 2][col + 2] == board[row - 3][col + 3] &&
        board[row][col] != 0
      ) {
        return {outcome: true, locations: [[row, col], [row - 1, col + 1], [row - 2, col + 2], [row - 3, col + 3]]};
      }
    }
  }
  return {outcome: false, locations: []};
};

let reset = false;

const App = () => {
  let [count, setCount] = useState(0);
  let [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, "YL", 0, 0, 0],
  ]);
  let [dropColumn, setDropColumn] = useState(4);
  let [redWins, setRedWins] = useState(0);
  let [yellowWins, setYellowWins] = useState(0);
  const resetGame = () => {
    if (count % 2 == 0) {
      board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, "YL", 0, 0, 0],
      ];
    } else {
      board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, "RL", 0, 0, 0],
      ];
    }
    setBoard([...board]);
    dropColumn = 4;
    setDropColumn(4);
    reset = false;
  };
  const doReset = () => {
    if (reset) {
      resetGame();
    }
  };
  //useKeypress utilizes outside code (see function declaration)
  useKeypress("ArrowRight", () => {
    doReset();
    if (!winCheck(board).outcome) {
      if (dropColumn < 7) {
        dropColumn++;
        setDropColumn(dropColumn);
        addPreview([...board]);
      }
    }
  });
  //useKeypress utilizes outside code (see function declaration)
  useKeypress("ArrowLeft", () => {
    doReset();
    if (!winCheck(board).outcome) {
      if (dropColumn > 1) {
        dropColumn--;
        setDropColumn(dropColumn);
        addPreview([...board]);
      }
    }
  });
  //useKeypress utilizes outside code (see function declaration)
  useKeypress("ArrowDown", () => {
    doReset();
    if (!winCheck(board).outcome) {
      performDrop(dropColumn);
    }
  });
  const addPreview = (localBoard) => {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (localBoard[i][j] == "RL" || localBoard[i][j] == "YL") {
          localBoard[i][j] = 0;
          board = localBoard;
          setBoard([...localBoard]);
        }
      }
    }
    let boardRow = [0, 0, 0, 0, 0, 0];
    for (let row = 0; row < 6; row++) {
      boardRow[row] = localBoard[row][dropColumn - 1];
    }
    let previewAdded = false;
    for (let row = 5; row >= 0; row--) {
      if (!previewAdded && boardRow[row] != "R" && boardRow[row] != "Y") {
        previewAdded = true;
        if (count % 2 == 0) {
          boardRow[row] = "YL";
        } else {
          boardRow[row] = "RL";
        }
      }
    }
    for (let row = 5; row >= 0; row--) {
      localBoard[row][dropColumn - 1] = boardRow[row];
    }
    board = localBoard;
    setBoard([...localBoard]);
  };
  const drop = (column, droppedPiece) => {
    let dropped = false;
    for (let row = 5; row >= 0; row--) {
      if (
        !dropped &&
        board[row][column - 1] != "R" &&
        board[row][column - 1] != "Y"
      ) {
        board[row][column - 1] = droppedPiece;
        dropped = true;
      }
    }
    if (dropped) {
      setBoard([...board]);
    } else {
      return false;
    }
  };
  const boardUpdate = (column) => {
    count += 1;
    setCount(count);
    if (count % 2 == 0) {
      drop(column, "R");
    } else {
      drop(column, "Y");
    }
    setBoard([...board]);
  }
  //winCheck is called within this procedure at lines 207 and 210
  //this procedure executes whenever a piece is dropped
  const performDrop = (column) => {
    if (drop(column, 0) != false) {
      boardUpdate(column);
      if (!winCheck(board).outcome) {
        addPreview([...board]);
      }
      else {
        let locations = winCheck(board).locations;
        if (count % 2 == 1) {
          board[locations[0][0]][locations[0][1]] = "YW";
          board[locations[1][0]][locations[1][1]] = "YW";
          board[locations[2][0]][locations[2][1]] = "YW";
          board[locations[3][0]][locations[3][1]] = "YW";
          yellowWins++;
          setYellowWins(yellowWins);
        } else {
          board[locations[0][0]][locations[0][1]] = "RW";
          board[locations[1][0]][locations[1][1]] = "RW";
          board[locations[2][0]][locations[2][1]] = "RW";
          board[locations[3][0]][locations[3][1]] = "RW";
          redWins++;
          setRedWins(redWins);
        }
        setBoard([...board]);
      }
    }
  };

  const which = () => {
    if ((count + 1) % 2 == 0) {
      return "R";
    }
    return "Y";
  };
  const padding = () => {
    let obj = {};
    obj.paddingLeft = 1 + 4 * (dropColumn - 1) + "rem";
    return obj;
  };
  const win = () => {
    if (winCheck(board).outcome) {
      if (count % 2 == 0) {
        return <h1>Red Wins!</h1>;
      } else {
        return <h1>Yellow Wins!</h1>;
      }
    } else {
      return (
        <div style={padding()}>
          <Piece id="red" color={which()}></Piece>
        </div>
      );
    }
  };
  return (
    <div id="mainDiv" key={Math.random()}>
      <div id="gameNameDescDiv">
        <h1 id="gameName">Connect 4</h1>
        <p>Use the arrow keys to play</p>
      </div>
      <div id="scoreContainer">
        <div className="scoreDiv">
          <h2>Red Wins</h2>
          <h1>{redWins}</h1>
        </div>
        <div className="scoreDiv">
          <h2>Yellow Wins</h2>
          <h1>{yellowWins}</h1>
        </div>
        <button
          className="resetButton"
          onClick={() => {
            reset = true;
            resetGame();
            reset = true;
          }}
        >
          New Game
        </button>
      </div>
      <div className="dropAndResultsDiv">{win()}</div>
      <div key={Math.random()} className="connectFourGameBoard">
        {[...board].map((row) => {
          return (
            <React.Fragment key={Math.random()}>
              {[...row].map((piece) => {
                return (
                  <Piece
                    key={Math.random()}
                    color={piece}
                    board={board}
                    count={count}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

const Piece = (obj) => {
  const which = () => {
    if (obj.color == "R") {
      return <div className="piece red"></div>;
    } else if (obj.color == "RL") {
      return <div className="piece redLight"></div>;
    } else if (obj.color == "RW") {
      return <div className="piece redWin"></div>;
    } else if (obj.color == "Y") {
      return <div className="piece yellow"></div>;
    } else if (obj.color == "YL") {
      return <div className="piece yellowLight"></div>;
    } else if (obj.color == "YW") {
      return <div className="piece yellowWin"></div>;
    } else {
      return <div className="piece no"></div>;
    }
  };
  return <>{which()}</>;
};

export default App;
