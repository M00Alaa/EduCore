import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SimplebarAngularComponent, SimplebarAngularModule } from 'simplebar-angular';
import { FirebaseMessagingService, FirebaseMessagePayload } from 'src/app/core/services/firebase-messaging.service';

import { ChatNotificationBridgeService, ChatNotificationEvent } from 'src/app/core/services/chat-notification-bridge.service';
import { Subject, takeUntil } from 'rxjs';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'sahely-notifications',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    SimplebarAngularModule,
    NzDropDownModule
  ],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  @ViewChild('simplebar') simplebar?: SimplebarAngularComponent;
  now = new Date();
  notifs: any[] = [];
  $total = 0;
  $page = 1;
  $pageSize = 10;
  unreadCount = 0;
  gettingNotifs = false;
  bell = new Audio('assets/audio/noti.wav');

  private destroy$ = new Subject<void>();

  // Firebase notification properties
  fcmToken: string | null = null;
  notificationsSupported = false;
  notificationPermission: NotificationPermission = 'default';

  scrollbarOptions = {
    autoHide: true,
    direction: 'rtl',
  };

  constructor(
    private router: Router,
    private firebaseMessaging: FirebaseMessagingService,

    private chatBridge: ChatNotificationBridgeService,
    private translate: TranslateService
  ) {
    // Check if Firebase Cloud Messaging is supported
    this.notificationsSupported = this.firebaseMessaging.isNotificationSupported();
    this.notificationPermission = this.firebaseMessaging.getPermissionStatus();
  }

  ngOnInit(): void {
    // Initialize Firebase Cloud Messaging
    this.initializeFirebaseMessaging();

    // Load notifications from backend
    this.getAll();
    this.getUnreadCount();

    // Subscribe to real-time Firestore chat notifications
    this.chatBridge.startListening();
    this.chatBridge.newMessage$
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: ChatNotificationEvent) => {
        const item = {
          id: `chat_${Date.now()}`,
          title: this.translate.instant('UI_MESSAGES.NOTIFICATIONS.NEW_MESSAGE_FROM', { senderName: event.senderName }),
          message: event.content,
          type: 'chat_message',
          read: false,
          createdate: event.created_at.toISOString(),
          route: 'chat_message',
          module: 'chat',
        };
        this.notifs.unshift(item);
        this.unreadCount++;
        this.playNotificationSound();
      });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.simplebar?.SimpleBar) {
        const scrollElement = this.simplebar.SimpleBar.getScrollElement();
        if (scrollElement) {
          scrollElement.onscroll = (event: Event) => this.handleScroll(event);
        }
      }
    }, 10);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Initialize Firebase Cloud Messaging
   */
  private async initializeFirebaseMessaging(): Promise<void> {
    if (!this.notificationsSupported) {
      return;
    }

    try {
      // Request notification permissions
      if (this.notificationPermission === 'default') {
        const token = await this.firebaseMessaging.requestPermission();
        if (token) {
          this.fcmToken = token;
          this.notificationPermission = 'granted';
        }
      } else if (this.notificationPermission === 'granted') {
        const token = await this.firebaseMessaging.getToken();
        if (token) {
          this.fcmToken = token;
        }
      }

      // Listen to foreground messages
      this.firebaseMessaging.listenToMessages()
        .pipe(takeUntil(this.destroy$))
        .subscribe((payload: FirebaseMessagePayload) => {
          this.playNotificationSound();

          // Add notification to local list
          this.addFirebaseNotificationToList(payload);

          // Show browser notification
          if (payload.notification) {
            this.firebaseMessaging.showNotification(
              payload.notification.title || 'New Notification',
              {
                body: payload.notification.body,
                icon: payload.notification.icon || '/assets/images/logo-sm.png',
                badge: '/assets/images/logo-sm.png',
                data: payload.data
              }
            );
          }
        });

    } catch (error) {
    }
  }

  /**
   * Add Firebase notification to local list
   */
  private addFirebaseNotificationToList(payload: FirebaseMessagePayload): void {
    const notification = {
      id: Date.now().toString(),
      title: payload.notification?.title || 'Notification',
      message: payload.notification?.body || '',
      type: payload.data?.type || 'general',
      read: false,
      createdAt: new Date().toISOString(),
      data: payload.data
    };

    this.notifs.unshift(notification);
    this.unreadCount++;
  }

  /**
   * Play notification sound
   */
  private playNotificationSound(): void {
    setTimeout(() => {
      this.bell.play().catch(err => {
        console.warn('Could not play notification sound:', err);
      });
    }, 300);
  }

  handleScroll(event: any) {
    const simplebarElement = this.simplebar?.SimpleBar.getScrollElement();
    if (!simplebarElement) return;

    // Check if the user has scrolled to the bottom of the scrollbar
    if (simplebarElement.scrollTop + simplebarElement.clientHeight === simplebarElement.scrollHeight) {
      // Load more notifications
      if (this.$page * this.$pageSize < this.$total) {
        this.$page++;
        this.getAll();
      }
    }
  }

  /**
   * Get all notifications from backend
   */
  getAll() {
    this.gettingNotifs = false;
  }

  /**
   * Mark notification as read
   */
  readNotification(not: any) {
    if (not.read) return;

    not.read = true;
    this.unreadCount = Math.max(0, this.unreadCount - 1);

    if (not.type === 'chat_message') return;
  }

  /**
   * Mark all notifications as read
   */
  readAll() {
    this.unreadCount = 0;
    this.notifs = this.notifs.map(n => ({ ...n, read: true }));
  }

  /**
   * Get unread notification count from backend
   */
  getUnreadCount() {
    this.unreadCount = 0;
  }

  /**
   * Redirect to notification detail
   */
  redirectTo(not: any) {
    if (!not.read) {
      this.readNotification(not);
    }

    // Route to chat page for chat notifications
    if (not.route === 'chat_message' || not.module === 'chat') {
      this.router.navigate(['/communication'], { queryParams: { chatId: not.payload?.chatId } });
      return;
    }
  }
}
