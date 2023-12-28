import React from 'react';
import './Place.css';

import { useSelector, useDispatch } from 'react-redux';
import {
	setCurPlayer,
	setPlayerCords,
	resetNumberToFind,
	resetMrXPlayed,
} from '../redux/gameRedux';

function Place({ left, top, number, findMode, startingPoint, pathFindMode }) {
	let findNumber = useSelector((state) => state.numberToFind);
	let curPlayer = useSelector((state) => state.curPlayer);

	const dispatch = useDispatch();

	const mouseClick = (e) => {
		// Check if findNumber is present (is user in find mode) then disable it on position change
		if (findMode) {
			dispatch(resetNumberToFind());
		}

		// Change that elements redux state position to this cords
		dispatch(setPlayerCords({ left: left, top: top, number: number }));

		// Check if player is mr x and place doesnt have a number (starting point) then reset mrx state
		if (curPlayer == 'x' && !number) {
			dispatch(resetMrXPlayed());
		}
	};
	return (
		<div
			className={`place ${findMode ? 'findMode' : ''} ${
				startingPoint ? 'startingPoint' : ''
			} ${pathFindMode ? 'pathFindMode' : ''}`}
			style={{ top: top, left: left }}
			onClick={(e) => mouseClick(e)}
		></div>
	);
}

export default Place;
