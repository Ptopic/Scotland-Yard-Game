import React from 'react';
import Place from './Place';

import cords from '../cords.json';

// redux
import { useSelector } from 'react-redux';

function Cordinates({ pathFindingMode }) {
	let findNumberIndex = useSelector((state) => state.numberToFind);
	let curMrXNumber = useSelector((state) => state.curMrXNumber);
	var cordinates = cords.cords;

	var adjecentPlaces = [];

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
		<div className="cords-container">
			{cordinates.map((cordinate, i) => piecesRenderingLogic(cordinate, i))}

			{/* Print adjecent nodes places if pathFindingMode is true */}
			{pathFindingMode ? adjecentPlaces : ''}
		</div>
	);
}

export default Cordinates;
