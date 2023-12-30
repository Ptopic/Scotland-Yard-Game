import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './GameComponent.css';

// redux
import { useSelector } from 'react-redux';

// Components
import PlayerContainer from './PlayerContainer';
import FindModal from './FindModal';
import ActionButtons from './ActionButtons';
import PathFindingOverlay from './PathFindingOverlay';
import FindNumberOverlay from './FindNumberOverlay';
import Cordinates from './Cordinates';

function GameComponent() {
	const [findModalOpen, setFindModalOpen] = useState(false);
	const [findNumber, setFindNumber] = useState('0');
	const [pathFindingMode, setPathFindingMode] = useState(false);
	const [pathFindingEnabled, setPathFindingEnabled] = useState(false);
	let findNumberIndex = useSelector((state) => state.numberToFind);
	let curPlayer = useSelector((state) => state.curPlayer);
	let mrXPlayed = useSelector((state) => state.mrXPlayed);

	useEffect(() => {
		checkIsMrXSelected();
	}, [curPlayer]);

	// Reveal element x,y position on mouse click
	const mouseClick = (e) => {
		// Get position of place on map
		// toast.dismiss();
		// var rect = e.target.getBoundingClientRect();
		// var cordinates = {
		// 	x: e.clientX - rect.left - 18,
		// 	y: e.clientY - rect.top - 18,
		// };
		// // Player cords this cords + 5 px
		// var playerCords = {
		// 	x: cordinates.x + 5,
		// 	y: cordinates.y + 5,
		// };
		// toast.loading('left: ' + cordinates.x + ' ' + 'top: ' + cordinates.y);
	};

	// Check if mr x is chosing a position then enter mr.x mode
	const checkIsMrXSelected = () => {
		// Check if curPlayer is x and if mrXPlayed is true then enter path finding mode
		if (curPlayer == 'x' && mrXPlayed && pathFindingEnabled) {
			// Set pathFinding mode state to true
			setPathFindingMode(true);
		} else {
			// Set pathFinding mode state to false
			setPathFindingMode(false);
		}
	};

	return (
		<div class="container">
			{pathFindingMode && <PathFindingOverlay />}
			{findNumberIndex != null && <FindNumberOverlay />}
			<PlayerContainer />

			<ActionButtons
				setFindNumber={setFindNumber}
				findModalOpen={findModalOpen}
				setFindModalOpen={setFindModalOpen}
				pathFindingEnabled={pathFindingEnabled}
				setPathFindingEnabled={setPathFindingEnabled}
			/>
			{/* Keep toaster and img */}
			<Toaster />
			<img
				id="map"
				src="https://i.imgur.com/smIY5l7.png"
				onClick={(e) => mouseClick(e)}
			/>
			<Cordinates pathFindingMode={pathFindingMode} />
			{findModalOpen && (
				<FindModal
					findModalOpen={findModalOpen}
					setFindModalOpen={setFindModalOpen}
					findNumber={findNumber}
					setFindNumber={setFindNumber}
				/>
			)}
		</div>
	);
}

export default GameComponent;
