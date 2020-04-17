import { Action } from '../models/Action';
import { ActionType } from '../models/constants/ActionType';
import { GlobalState } from '../models/GlobalState';

export default (state: GlobalState, action: Action): GlobalState => {
	switch (action.type) {
		case ActionType.CONNECTED:
			return {
				...state,
				connected: action.payload.connected,
				loading: action.payload.loading,
				socket: action.payload.socket,
			};
		case ActionType.JOINING:
			return {
				...state,
				joining: action.payload.joining,
			};
		default:
			return state;
	}
};
