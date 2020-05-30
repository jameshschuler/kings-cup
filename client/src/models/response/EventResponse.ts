import { EventType } from '../enums/EventType';

export interface EventResponse {
    eventType: EventType;
    message: string;
}