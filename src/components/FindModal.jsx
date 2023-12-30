import React from 'react';
import './GameComponent.css';

import { IoMdClose } from 'react-icons/io';
import { FaBackspace } from 'react-icons/fa';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setNumberToFind, resetNumberToFind } from '../redux/gameRedux';

function FindModal({
	findModalOpen,
	setFindModalOpen,
	findNumber,
	setFindNumber,
}) {
	const dispatch = useDispatch();

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

	return (
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
	);
}

export default FindModal;
