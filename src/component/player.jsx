import { useState } from "react";
export default function Player({
	initialName,
	symbol,
	activePlayerSymbol,
	onChangeName,
}) {
	const [name, setName] = useState(initialName);
	const [isEdititng, setisEdititng] = useState(false);
	function handleEditClick() {
		setisEdititng((editing) => !editing);
		if (isEdititng) {
			onChangeName(symbol, name);
		}
	}
	function handleInputChange(event) {
		console.log(event.target.value);
		setName(event.target.value);
	}

	return (
		<li className={activePlayerSymbol ? "active" : undefined}>
			<span className="player">
				{!isEdititng && <span className="player-name">{name}</span>}
				{isEdititng && (
					<input
						type="text"
						required
						value={name}
						onChange={handleInputChange}
					/>
				)}
				<span className="player-symbol">{symbol}</span>
			</span>
			<button onClick={handleEditClick}>
				{isEdititng ? "Save" : "Edit"}
			</button>
		</li>
	);
}
