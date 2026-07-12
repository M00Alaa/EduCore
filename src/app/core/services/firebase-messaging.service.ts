import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface FirebaseMessagePayload {
    notification?: {
        title?: string;
        body?: string;
        icon?: string;
    };
    data?: Record<string, string>;
}

@Injectable({
    providedIn: 'root'
})
export class FirebaseMessagingService {
    private token: string | null = null;

    constructor() {
        // Check if Firebase messaging is supported
        if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
            // Firebase messaging would be initialized here
            // For now, we'll provide a mock implementation
        }
    }

    isNotificationSupported(): boolean {
        return typeof Notification !== 'undefined' && 'serviceWorker' in navigator;
    }

    getPermissionStatus(): NotificationPermission {
        return typeof Notification !== 'undefined' ? Notification.permission : 'default';
    }

    async requestPermission(): Promise<string | null> {
        if (!this.isNotificationSupported()) {
            return null;
        }

        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                // In a real implementation, this would get the FCM token
                this.token = 'mock-fcm-token-' + Date.now();
                return this.token;
            }
            return null;
        } catch (error) {
            console.error('Error requesting notification permission:', error);
            return null;
        }
    }

    async getToken(): Promise<string | null> {
        if (!this.token) {
            this.token = 'mock-fcm-token-' + Date.now();
        }
        return this.token;
    }

    listenToMessages(): Observable<FirebaseMessagePayload> {
        // In a real implementation, this would listen to Firebase messages
        // For now, return an empty observable
        return of({
            notification: {
                title: 'Mock Notification',
                body: 'This is a mock notification'
            },
            data: {}
        });
    }

    showNotification(title: string, options?: NotificationOptions): void {
        if (this.isNotificationSupported() && this.getPermissionStatus() === 'granted') {
            new Notification(title, options);
        }
    }
}
