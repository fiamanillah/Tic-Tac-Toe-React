

export default function Gameboard({onSelectSquare, gameBoard}) {
	
	// const [gameBoard, setGameBoard] = useState(initialGameBoard);

	// function handleSelectSquare(rowIndex, colIndex) {
	// 	setGameBoard((prevGameBoard) => {
	// 		const updatedGameBoard = [
	// 			...prevGameBoard.map((innerArray) => [...innerArray]),
	// 		];
	// 		updatedGameBoard[rowIndex][colIndex] = activePlayer;
	// 		return updatedGameBoard;
	// 	});
	// 	onPlayerSelect();
	// }

	return (
		<ol id="game-board">
			{gameBoard.map((row, rowIndex) => (
				<li key={rowIndex}>
					<ol>
						{row.map((playerSymbol, colIndex) => (
							<li key={colIndex}>
								<button
									onClick={() => {
										onSelectSquare(rowIndex, colIndex);
									}} disabled={(playerSymbol != null) ? true : false}>
									{playerSymbol}
								</button>
							</li>
						))}
					</ol>
				</li>
			))}
		</ol>
	);
}
