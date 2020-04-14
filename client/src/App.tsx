import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import InfoBar from './components/InfoBar';
import LoadingScreen from './components/LoadingScreen';
import RoomCodeScreen from './components/RoomCodeScreen';

const App: React.FC = () => {
	const [loading, setLoading] = useState(true);
	const [connected, setConnected] = useState(false);

	useEffect(() => {
		const socket = io('http://localhost:5000'); // Temp
		if (socket) {
			setTimeout(() => {
				setLoading(false); // TODO: move to global state
				setConnected(true); // TODO: move to global state
			}, 2000);
			console.log(socket);
		}
	}, []);

	return (
		<div className='container'>
			{loading ? (
				<LoadingScreen />
			) : (
				<>
					<InfoBar />
					<RoomCodeScreen />
				</>
			)}
		</div>
	);
};

export default App;
