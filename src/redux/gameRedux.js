import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
	name: 'game',
	initialState: {
		curPlayer: null,
		playerPositions: {
			red: { left: 0, top: -40 },
			yellow: { left: 50, top: -40 },
			black: { left: 100, top: -40 },
			blue: { left: 150, top: -40 },
			green: { left: 200, top: -40 },
			x: { left: 250, top: -40 },
		},
		numberToFind: null,
		mrXPlayed: false,
		curMrXNumber: null,
	},
	reducers: {
		setCurPlayer: (state, action) => {
			state.curPlayer = action.payload;
		},
		setPlayerCords: (state, action) => {
			if (state.curPlayer == 'x') {
				state.playerPositions[state.curPlayer].left = action.payload.left;
				state.playerPositions[state.curPlayer].top = action.payload.top;
				state.curPlayer = '';
				state.mrXPlayed = true;
				state.curMrXNumber = action.payload.number;
			} else {
				state.playerPositions[state.curPlayer].left = action.payload.left;
				state.playerPositions[state.curPlayer].top = action.payload.top;
				state.curPlayer = '';
			}
		},
		resetPlayers: (state) => {
			state.playerPositions = {
				red: { left: 0, top: -40 },
				yellow: { left: 50, top: -40 },
				black: { left: 100, top: -40 },
				blue: { left: 150, top: -40 },
				green: { left: 200, top: -40 },
				x: {
					left: state.playerPositions.x.left,
					top: state.playerPositions.x.top,
				},
			};
			state.curPlayer = null;
		},

		resetX: (state) => {
			state.playerPositions.x = { left: 250, top: -40 };
			state.curPlayer = null;
		},

		setNumberToFind: (state, action) => {
			state.numberToFind = action.payload;
		},

		resetNumberToFind: (state) => {
			state.numberToFind = null;
		},

		resetMrXPlayed: (state) => {
			state.mrXPlayed = false;
			state.curMrXNumber = null;
		},
	},
});

export const {
	setCurPlayer,
	setPlayerCords,
	resetPlayers,
	resetX,
	setNumberToFind,
	resetNumberToFind,
	resetMrXPlayed,
} = gameSlice.actions;
export default gameSlice.reducer;
