export interface GlobalState {
	socket: SocketIOClient.Socket | null;

	// State
	connected: boolean;
	joining: boolean;
	loading: boolean;

	// Actions:
	joinRoom: (name: string, roomCode: string) => any;
	makeConnection: () => any;
}
