import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './MapComponent.css';
import Place from './Place';

import cords from '../cords.json';
import Igrac from './Igrac';

import { IoMdClose } from 'react-icons/io';
import { FaBackspace } from 'react-icons/fa';

// redux
import { useSelector, useDispatch } from 'react-redux';
import {
	resetPlayers,
	resetX,
	setNumberToFind,
	resetNumberToFind,
	resetMrXPlayed,
} from '../redux/gameRedux';

function MapComponent() {
	const [findModalOpen, setFindModalOpen] = useState(false);
	const [findNumber, setFindNumber] = useState('0');
	const [pathFindingMode, setPathFindingMode] = useState(false);
	const [pathFindingEnabled, setPathFindingEnabled] = useState(false);
	let findNumberIndex = useSelector((state) => state.numberToFind);
	let curPlayer = useSelector((state) => state.curPlayer);
	let mrXPlayed = useSelector((state) => state.mrXPlayed);
	let curMrXNumber = useSelector((state) => state.curMrXNumber);
	const dispatch = useDispatch();
	var cordinates = cords.cords;

	var adjecentPlaces = [];

	useEffect(() => {
		checkIsMrXSelected();
	}, [curPlayer]);

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

	const onFindNumberChange = (e) => {
		var findNumberInt = parseInt(findNumber);
		if (findNumberInt > 0) {
			setFindNumber(findNumber + e.target.innerText);
		} else {
			setFindNumber(e.target.innerText);
		}
	};

	const onFindNumberDelete = () => {
		setFindNumber(findNumber.slice(0, -1));
	};

	const onFindNumberSubmit = () => {
		// Convert findNumber to int
		var findNumberInt = parseInt(findNumber);

		if (findNumberInt > 0) {
			// Decrement findNumber int by 1 to get index values
			var findNumberIndex = findNumberInt - 1;

			// Set redux state to new value
			dispatch(setNumberToFind(findNumberIndex));
		}

		// Close modal
		setFindModalOpen(false);
	};

	// Toggle if path finding feature is enabled
	const togglePathFindingEnabled = () => {
		setPathFindingEnabled(!pathFindingEnabled);
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

	const piecesRenderingLogic = (cordinate, i) => {
		var currentNumberAdjecentNodes = [];
		if (pathFindingMode && cordinate.num == curMrXNumber) {
			var currentNumberIndex = curMrXNumber - 1;
			// Loop thru adjecent list and add numbers to currentNumberAdjecentNodes with number decremented by 1 (index of node)
			for (var i = 0; i < cordinates[currentNumberIndex].adj.length; i++) {
				currentNumberAdjecentNodes.push(
					cordinates[currentNumberIndex].adj[i] - 1
				);
			}

			// Push adjecent places to adjecentPlaces array
			for (var i = 0; i < currentNumberAdjecentNodes.length; i++) {
				adjecentPlaces.push(
					<Place
						left={cordinates[currentNumberAdjecentNodes[i]].left}
						top={cordinates[currentNumberAdjecentNodes[i]].top}
						number={cordinates[currentNumberAdjecentNodes[i]].num}
						pathFindMode={true}
					/>
				);
			}
		}

		if (findNumberIndex == i) {
			return (
				<Place
					left={cordinate.left}
					top={cordinate.top}
					number={cordinate.num}
					findMode={true}
				/>
			);
		} else {
			return (
				<Place
					left={cordinate.left}
					top={cordinate.top}
					number={cordinate.num}
					findMode={false}
				/>
			);
		}
	};

	return (
		<div class="container">
			{pathFindingMode && <div className="path-finding-overlay"></div>}
			{findNumberIndex != null && (
				<div
					className="find-number-overlay"
					onClick={() => dispatch(resetNumberToFind())}
				></div>
			)}
			<div className="top-row">
				{/* ! put in seperate component */}
				<div className="players-container">
					<Igrac boja="blue" />
					<Place left={0} top={-40} startingPoint={true} />
					<Igrac boja="red" />
					<Place left={50} top={-40} startingPoint={true} />
					<Igrac boja="yellow" />
					<Place left={100} top={-40} startingPoint={true} />
					<Igrac boja="black" />
					<Place left={150} top={-40} startingPoint={true} />
					<Igrac boja="green" />
					<Place left={200} top={-40} startingPoint={true} />
					<Igrac boja="x" />
					<Place left={250} top={-40} startingPoint={true} />
				</div>

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
			</div>
			<Toaster />
			<img
				id="map"
				src="https://i.imgur.com/smIY5l7.png"
				onClick={(e) => mouseClick(e)}
			/>
			{/* ! put in seperate component */}
			<div className="cords-container">
				{cordinates.map((cordinate, i) => piecesRenderingLogic(cordinate, i))}

				{/* Print adjecent nodes places if pathFindingMode is true */}
				{pathFindingMode ? adjecentPlaces : ''}
			</div>
			{findModalOpen && (
				<div className="find-modal">
					<div className="find-modal-content">
						<div className="find-modal-nav">
							<IoMdClose size={32} onClick={() => toggleFindModal()} />
						</div>
						<h1>Enter Number:</h1>
						<div className="find-number-display">{findNumber}</div>
						<div className="numbers-container">
							<div>
								<button onClick={(e) => onFindNumberChange(e)}>1</button>
								<button onClick={(e) => onFindNumberChange(e)}>2</button>
								<button onClick={(e) => onFindNumberChange(e)}>3</button>
							</div>

							<div>
								<button onClick={(e) => onFindNumberChange(e)}>4</button>
								<button onClick={(e) => onFindNumberChange(e)}>5</button>
								<button onClick={(e) => onFindNumberChange(e)}>6</button>
							</div>

							<div>
								<button onClick={(e) => onFindNumberChange(e)}>7</button>
								<button onClick={(e) => onFindNumberChange(e)}>8</button>
								<button onClick={(e) => onFindNumberChange(e)}>9</button>
							</div>

							<div className="last-row">
								<button onClick={(e) => onFindNumberChange(e)}>0</button>
								<FaBackspace size={32} onClick={() => onFindNumberDelete()} />
							</div>
						</div>
						<button className="find-btn" onClick={() => onFindNumberSubmit()}>
							Find
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default MapComponent;
