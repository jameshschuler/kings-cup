import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import Loader from './Loader';

const RoomCodeScreen: React.FC = () => {
	const [roomCode, setRoomCode] = useState('');
	const [name, setName] = useState('');

	const { joining, joinRoom } = useContext(GlobalContext);

	const submit = (e: any) => {
		e.preventDefault();
		joinRoom(name, roomCode);
	};

	return (
		<div id='room-code-screen'>
			{joining ? (
				<Loader text='Joining Room...' />
			) : (
				<form
					autoComplete='off'
					id='room-code-form'
					className='pure-form'
					onSubmit={(e) => submit(e)}
				>
					<h2>Welcome!</h2>
					<input
						id='name'
						type='text'
						name='name'
						placeholder='Your Name...'
						className='pure-input-1'
						value={name}
						required
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						id='room-code'
						type='text'
						name='roomCode'
						placeholder='Room Code...'
						className='pure-input-1'
						value={roomCode}
						required
						onChange={(e) => setRoomCode(e.target.value)}
					/>
					<button
						className='pure-button pure-button-primary'
						type='submit'
						id='join-room-button'
					>
						Join Room
					</button>
				</form>
			)}
		</div>
	);
};

export default RoomCodeScreen;
