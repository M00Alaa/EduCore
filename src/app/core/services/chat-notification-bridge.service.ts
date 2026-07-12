import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface ChatNotificationEvent {
    senderName: string;
    content: string;
    created_at: Date;
}

@Injectable({
    providedIn: 'root'
})
export class ChatNotificationBridgeService {
    private newMessageSubject = new Subject<ChatNotificationEvent>();
    public newMessage$: Observable<ChatNotificationEvent> = this.newMessageSubject.asObservable();

    constructor() { }

    startListening(): void {
        // In a real implementation, this would connect to a WebSocket or Firestore
        // For now, this is a placeholder
    }

    stopListening(): void {
        // In a real implementation, this would disconnect from the WebSocket or Firestore
    }

    // Method to simulate receiving a chat message (for testing)
    simulateMessage(senderName: string, content: string): void {
        this.newMessageSubject.next({
            senderName,
            content,
            created_at: new Date()
        });
    }
}