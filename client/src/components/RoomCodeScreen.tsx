import React, { useState } from 'react';

const RoomCodeScreen: React.FC = () => {
	const [roomCode, setRoomCode] = useState('');

	const submit = (e: any) => {
		e.preventDefault();
		console.log('submit');
	};

	return (
		<div id='room-code-screen'>
			<form
				autoComplete='off'
				id='room-code-form'
				className='pure-form'
				onSubmit={(e) => submit(e)}
			>
				<h2>Welcome!</h2>
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
		</div>
	);
};

export default RoomCodeScreen;
