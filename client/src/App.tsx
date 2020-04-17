import React, { useContext, useEffect } from 'react';
import InfoBar from './components/InfoBar';
import LoadingScreen from './components/LoadingScreen';
import RoomCodeScreen from './components/RoomCodeScreen';
import { GlobalContext } from './context/GlobalContext';

const App: React.FC = () => {
	const { loading, makeConnection } = useContext(GlobalContext);

	useEffect(() => {
		setTimeout(() => {
			makeConnection();
		}, 2000);
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
