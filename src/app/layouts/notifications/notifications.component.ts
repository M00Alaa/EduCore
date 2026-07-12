import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SimplebarAngularComponent } from 'simplebar-angular';
import { environment } from 'src/environments/environment';
import { FirebaseMessagingService } from 'src/app/core/services/firebase-messaging.service';
import { NotificationsService } from 'src/app/core/backend/common/services/notifications.service';
import { ChatNotificationBridgeService } from 'src/app/core/services/chat-notification-bridge.service';
import { Subject, takeUntil } from 'rxjs';
import { MessagePayload } from 'firebase/messaging';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'sahely-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  standalone: false
})
export class NotificationsComponent implements OnInit, OnDestroy {
  @ViewChild('simplebar') simplebar?: SimplebarAngularComponent;
  NotificationType: any = {};
  domain = environment.api;
  now = new Date();
  notifs: any[] = [];
  $total = 0;
  $page = 1;
  $pageSize = 10;
  acc: any | null;
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
    private notificationsService: NotificationsService,
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
      .subscribe((event) => {
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
      console.warn('Firebase Cloud Messaging is not supported in this browser');
      return;
    }

    try {
      // Request notification permissions
      if (this.notificationPermission === 'default') {
        const token = await this.firebaseMessaging.requestPermission();
        if (token) {
          this.fcmToken = token;
          this.notificationPermission = 'granted';

          // TODO: Send token to backend to associate with user
          // await this.saveTokenToBackend(token);
          console.log('FCM Token ready to be saved to backend:', token);
        }
      } else if (this.notificationPermission === 'granted') {
        // Get existing token
        const token = await this.firebaseMessaging.getToken();
        if (token) {
          this.fcmToken = token;
          console.log('Existing FCM Token:', token);
        }
      }

      // Listen to foreground messages
      this.firebaseMessaging.listenToMessages()
        .pipe(takeUntil(this.destroy$))
        .subscribe((payload: MessagePayload) => {
          console.log('Firebase notification received:', payload);

          // Play notification sound
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
      console.error('Error initializing Firebase Messaging:', error);
    }
  }

  /**
   * Add Firebase notification to local list
   */
  private addFirebaseNotificationToList(payload: MessagePayload): void {
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

  /**
   * TODO: Save FCM token to backend
   * This method should be called after getting the FCM token
   */
  private async saveTokenToBackend(token: string): Promise<void> {
    // TODO: Implement API call to save token
    // Example:
    // await this.notificationService.saveFcmToken({ token }).toPromise();
    console.log('TODO: Save FCM token to backend:', token);
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
    this.gettingNotifs = true;
    this.notificationsService.apiV1NotificationsGet({
      page: String(this.$page),
      per_page: String(this.$pageSize)
    }).subscribe({
      next: (res: any) => {
        this.gettingNotifs = false;
        const items = res?.data?.notifications || [];
        const mapped = items.map((n: any) => ({
          id: n.id,
          title: n.title_ar || n.title_en || n.title || 'إشعار',
          message: n.message_ar || n.message_en || n.message || '',
          type: n.key_id,
          read: n.seen === 1 || n.read === true,
          createdate: n.created_at,
          route: n.route,
          payload: n.payload,
          module: n.module,
          module_id: n.module_id,
        }));
        this.notifs.push(...mapped);
        this.$total = res?.data?.pagination?.total || 0;
      },
      error: () => {
        this.gettingNotifs = false;
      }
    });
  }

  /**
   * Mark notification as read
   */
  readNotification(not: any) {
    if (not.read) return;

    not.read = true;
    this.unreadCount = Math.max(0, this.unreadCount - 1);

    // Local chat notifications have no backend record — skip API call
    if (not.type === 'chat_message') return;

    this.notificationsService.apiV1NotificationsIdReadPut({
      id: String(not.id)
    }).subscribe({
      error: () => {
        this.unreadCount++;
        not.read = false;
      }
    });
  }

  /**
   * Mark all notifications as read
   */
  readAll() {
    const prevCount = this.unreadCount;
    const prevNotifs = this.notifs.map(n => ({ ...n }));
    this.unreadCount = 0;
    this.notifs = this.notifs.map(n => ({ ...n, read: true }));

    this.notificationsService.apiV1NotificationsReadAllPut().subscribe({
      error: () => {
        this.unreadCount = prevCount;
        this.notifs = prevNotifs;
      }
    });
  }

  /**
   * Get unread notification count from backend
   */
  getUnreadCount() {
    this.notificationsService.apiV1NotificationsUnreadCountGet().subscribe({
      next: (res: any) => {
        this.unreadCount = res?.data?.count || 0;
      }
    });
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
