import React from 'react';
import Igrac from './Igrac';
import Place from './Place';

function PlayerContainer() {
	return (
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
	);
}

export default PlayerContainer;
