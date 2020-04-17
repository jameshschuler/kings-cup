import React, { createContext, useReducer } from 'react';
import io from 'socket.io-client';
import { ActionType } from '../models/constants/ActionType';
import { GlobalState } from '../models/GlobalState';
import AppReducer from './AppReducer';

const initialState: GlobalState = {
	connected: false,
	joining: false,
	loading: true,
	socket: null,
	joinRoom: (name: string, roomCode: string) => {},
	makeConnection: () => {},
};

export const GlobalContext = createContext(initialState);

interface GlobalProviderProps {
	children: any;
}

// Provider component
export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
	const [{ connected, joining, loading, socket }, dispatch] = useReducer(
		AppReducer,
		initialState
	);

	// Actions:
	const joinRoom = (name: string, roomCode: string) => {
		socket?.emit('join-room', { name, roomCode });

		dispatch({ type: ActionType.JOINING, payload: { joining: true } });
	};

	const makeConnection = (): void => {
		const socket = io('http://localhost:5000');

		// TODO: will need to register listeners when connection is made

		dispatch({
			type: ActionType.CONNECTED,
			payload: {
				socket,
				connected: socket !== null,
				loading: false,
			},
		});
	};

	return (
		<GlobalContext.Provider
			value={{ connected, joining, loading, socket, joinRoom, makeConnection }}
		>
			{children}
		</GlobalContext.Provider>
	);
};
