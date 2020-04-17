import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const InfoBar: React.FC = () => {
	const { connected } = useContext(GlobalContext);

	return (
		<div id='info-bar'>
			<h3>HomeDoneGames</h3>
			<span className='connection-status'>
				<i
					className={`fas fa-signal fa-fw ${
						connected ? 'success-icon' : 'danger-icon'
					}`}
				></i>
			</span>
		</div>
	);
};

export default InfoBar;
