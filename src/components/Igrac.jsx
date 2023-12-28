import React from 'react';
import './Igrac.css';

import { useSelector, useDispatch } from 'react-redux';
import { setCurPlayer, setPlayerCords } from '../redux/gameRedux';

function Igrac({ boja }) {
	let curPlayer = useSelector((state) => state.curPlayer);
	let playerPosition = useSelector((state) => state.playerPositions[boja]);

	const dispatch = useDispatch();
	const mouseClick = (e) => {
		// Set selected piece color in redux state;
		if (curPlayer == boja) {
			dispatch(setCurPlayer(''));
		} else {
			dispatch(setCurPlayer(boja));
		}
	};
	return (
		<div
			className={
				'marker ' + `${'marker-' + boja} ${curPlayer == boja ? 'active' : ''}`
			}
			style={{
				top: playerPosition.top,
				left: playerPosition.left,
			}}
			onClick={(e) => mouseClick(e)}
		></div>
	);
}

export default Igrac;
