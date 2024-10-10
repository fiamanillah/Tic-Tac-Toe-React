import Player from "./component/player";
import Gameboard from "./component/Gameboard";
import Log from "./component/Log";
import { useState } from "react";
import GameOver from "./component/GameOver";
import { WINNING_COMBINATIONS } from "./component/winning-combinations";

const initialGameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

function deriveCurrentPlayer(gameTurns) {
	let currenPlayer = "X";
	if (gameTurns.length > 0 && gameTurns[0].player === "X") {
		currenPlayer = "O";
	}
	return currenPlayer;
}

function App() {
	const [players, setPlayer] = useState({
		X: "Player 1",
		O: "Player 2"
	})
	const [gameTurns, setGameTurns] = useState([]);
	const [activePlayer, setActivePlayer] = useState("X");

	deriveCurrentPlayer(gameTurns);

	let gameBoard = [...initialGameBoard.map(array => [...array])];

	for (const turn of gameTurns) {
		const { square, player } = turn;
		const { row, col } = square;

		gameBoard[row][col] = player;
	}

	let winner;

	for (const combination of WINNING_COMBINATIONS) {
		const firstSquareSymbol =
			gameBoard[combination[0].row][combination[0].column];
		const secSquareSymbol =
			gameBoard[combination[1].row][combination[1].column];
		const thirdSquareSymbol =
			gameBoard[combination[2].row][combination[2].column];

		if (
			firstSquareSymbol &&
			firstSquareSymbol === secSquareSymbol &&
			firstSquareSymbol === thirdSquareSymbol
		) {
			winner = players[firstSquareSymbol];
		}
	}
	function handleRestart(){
		setGameTurns([]);
		setActivePlayer("X")
	}

	const hasDraw = gameTurns.length === 9 && !winner;

	function handleSelectedSquare(rowIndex, colIndex) {
		
		setGameTurns((prevTurn) => {
			let currenPlayer = deriveCurrentPlayer(prevTurn);
			const updatedTurns = [
				{
					square: { row: rowIndex, col: colIndex },
					player: currenPlayer,
				},
				...prevTurn,
			];
			setActivePlayer((activePlayer) =>
				activePlayer === "X" ? "O" : "X"
			);
			return updatedTurns;
		});
	}

	function handlePlayerNameChange(symbol, newName){
		setPlayer(prevPlayerName=>{
			return {
				...prevPlayerName,
				[symbol]: newName
			}
		})
	}

	
	console.log(activePlayer);

	return (
		<main>
			<div id="game-container">
				<ol id="players" className="highlight-player">
					<Player
						initialName="Player 1"
						symbol="X"
						activePlayerSymbol={activePlayer === "X"}
						onChangeName={handlePlayerNameChange}
					/>
					<Player
						initialName="Player 2"
						symbol="0"
						activePlayerSymbol={activePlayer === "O"}
						onChangeName={handlePlayerNameChange}
					/>
				</ol>
				{(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
				<Gameboard
					onSelectSquare={handleSelectedSquare}
					gameBoard={gameBoard}
				/>
			</div>
			<Log turns={gameTurns} />
		</main>
	);
}

export default App;
