import React from 'react';
import './GameComponent.css';

// redux
import { useSelector, useDispatch } from 'react-redux';
import {
	resetPlayers,
	resetX,
	resetNumberToFind,
	resetMrXPlayed,
} from '../redux/gameRedux';

function ActionButtons({
	setFindNumber,
	findModalOpen,
	setFindModalOpen,
	pathFindingEnabled,
	setPathFindingEnabled,
}) {
	const dispatch = useDispatch();

	const onResetPlayers = () => {
		// Reset player positions to default
		dispatch(resetPlayers());
	};

	const onResetX = () => {
		// Reset Mr.X position to default
		dispatch(resetX());

		// Reset Mr. X played
		dispatch(resetMrXPlayed());
	};

	const toggleFindModal = () => {
		// Reset findNumber state and redux state
		setFindNumber('0');
		dispatch(resetNumberToFind());

		// Togle find number modal
		setFindModalOpen(!findModalOpen);
	};

	// Toggle if path finding feature is enabled
	const togglePathFindingEnabled = () => {
		setPathFindingEnabled(!pathFindingEnabled);
	};

	return (
		<div className="action-buttons">
			<button onClick={() => onResetPlayers()}>Reset Players</button>
			<button onClick={() => onResetX()}>Reset Mr.X</button>

			<button onClick={() => toggleFindModal()}>Find Position</button>

			<div className="switch-container">
				<div
					className={`${pathFindingEnabled ? 'switch-active' : 'switch'}`}
					onClick={() => togglePathFindingEnabled()}
				>
					<div
						className={`${
							pathFindingEnabled ? 'switch-dot-active' : 'switch-dot'
						}`}
					></div>
				</div>
				<p>Enable Path Finding</p>
			</div>
		</div>
	);
}

export default ActionButtons;
