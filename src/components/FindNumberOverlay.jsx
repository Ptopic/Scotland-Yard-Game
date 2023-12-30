import React from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { resetNumberToFind } from '../redux/gameRedux';

function FindNumberOverlay() {
	const dispatch = useDispatch();

	return (
		<div
			className="find-number-overlay"
			onClick={() => dispatch(resetNumberToFind())}
		></div>
	);
}

export default FindNumberOverlay;
