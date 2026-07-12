
import { Component, ViewChild, TemplateRef, signal, ChangeDetectorRef, NgZone, Input } from '@angular/core';
import { NgbModal, NgbModalModule, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CalendarOptions, DatesSetArg, EventInput, EventClickArg } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import arLocale from '@fullcalendar/core/locales/ar';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { PlayerAttendanceService } from 'src/app/core/backend/academy/services/player-attendance.service';
import { ScheduleService } from 'src/app/core/backend/academy/services/schedule.service';
import { PlayersService } from 'src/app/core/backend/academy/services/players.service';
import { SchedulePlayerAttendance, MarkAttendancePayload } from 'src/app/core/backend/academy/models/player-attendance-manual.models';
import { SWAL } from 'src/app/app-const';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NgSelectModule } from '@ng-select/ng-select';
import { NzDatePickerComponent, NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

type FCView = 'dayGridMonth' | 'dayGridWeek' | 'dayGridDay' | 'listWeek';

interface PreparedSchedule {
  raw: any;
  days: string[];
  dayScheduleIds: Record<string, number>;
  dayCapacities: Record<string, number>;
  dayAttended: Record<string, number>;
  dayPending: Record<string, number>;
  earliest: string | null;
}

@Component({
  selector: 'mo-shared-appointments',
  imports: [CommonModule,
    FormsModule,
    TranslateModule,
    FullCalendarModule,
    NgbModalModule,
    NzBadgeModule,
    NzAvatarModule,
    NzAlertModule,
    NzSpinModule,
    NgSelectModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzCheckboxModule,
    NzTabsModule,
    RouterModule],
  templateUrl: './shared-appointments.component.html',
  styleUrl: './shared-appointments.component.scss'
})
export class SharedAppointmentsComponent {
  @Input() trainer = false;

  private static readonly attendanceManagePermissions = [
    'players.attendance.add',
    'players.attendance.edit',
    'players.add',
    'players.edit',
  ];

  get canManagePlayerAttendance(): boolean {
    if (this.trainer) {
      return true;
    }

    return this.authService.hasPermission(SharedAppointmentsComponent.attendanceManagePermissions);
  }

  selectedIndex = 0;

  @ViewChild('calendar') calendarRef!: FullCalendarComponent;
  @ViewChild('calendarDatePicker') calendarDatePicker?: NzDatePickerComponent;
  @ViewChild('attendanceModal') attendanceModal!: TemplateRef<any>;
  @ViewChild('qrAttendanceModal') qrAttendanceModal!: TemplateRef<any>;

  // ── Calendar state ──
  activeView: FCView = 'dayGridMonth';
  _currentTitle = '';
  calendarNavigationDate: Date | null = null;
  private suppressCalendarNavigation = false;
  loading = false;
  private lastSchedulesFilterKey = '';
  private _scheduleLoadId = 0;
  private _playersLoadId = 0;
  private _viewStart: Date | null = null;
  private _viewEnd: Date | null = null;
  // Full visible grid range (includes leading/trailing filler days shown in month view).
  // Used to render events so every visible cell matches the Daily-view inclusion rule.
  private _visibleStart: Date | null = null;
  private _visibleEnd: Date | null = null;

  // ── Attendance modal state ──
  private attendanceModalRef?: NgbModalRef;
  attendanceLoading = false;
  selectedScheduleId: number | null = null;
  selectedScheduleTitle = '';
  selectedDate = '';
  selectedTimeRange = { start: '', end: '' };
  selectedScheduleCapacity = 0;
  selectedScheduleCurrentCapacity = 0;
  selectedScheduleGenderKey: 'male' | 'female' | 'mixed' = 'mixed';
  selectedScheduleGenderName = '';
  attendanceWarnings: string[] = [];

  // Three separate lists matching the API response shape
  _pendingList: SchedulePlayerAttendance[] = [];
  _attendedList: SchedulePlayerAttendance[] = [];
  _unassignedList: SchedulePlayerAttendance[] = [];

  playerSearch = '';
  attendanceTab: 'pending' | 'attended' | 'no-appointment' = 'pending';
  selectedPlayerIds = new Set<number>();
  saveLoading = false;

  academyId = '';

  // ── QR Attendance state ──
  qrInput = '';
  qrState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  qrError = '';
  qrResult: {
    schedule: { id: number; schedule_id: number; date: string; start_time: string; end_time: string };
    player: { id: number; name: string } | null;
    sport: { name: string } | null;
    package: { name: string } | null;
    remaining_sessions: number;
  } | null = null;
  qrSaveLoading = false;
  qrSaveSuccess = false;
  private _qrDebounceTimer: ReturnType<typeof setTimeout> | null = null;


  calendarOptions = signal<CalendarOptions>({
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin],
    locale: arLocale,
    direction: 'rtl',
    headerToolbar: false,
    initialView: 'dayGridMonth',
    weekends: true,
    editable: false,
    selectable: false,
    allDaySlot: false,
    dayMaxEvents: false,
    slotEventOverlap: false,
    nowIndicator: true,
    slotMinTime: '09:00:00',
    slotMaxTime: '22:00:00',
    scrollTime: '09:00:00',
    events: [],
    eventClick: (info: EventClickArg) => this.ngZone.run(() => this.onEventClick(info)),
    datesSet: (arg: DatesSetArg) => this.ngZone.run(() => this.onDatesSet(arg))
  });

  constructor(
    private attendanceService: PlayerAttendanceService,
    private scheduleService: ScheduleService,
    private translate: TranslateService,
    private authService: AuthenticationService,
    private modalService: NgbModal,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) { }

  // ──────────────────────────────────────────────────────────────────────────
  // Lifecycle
  // ──────────────────────────────────────────────────────────────────────────

  ngOnInit(): void {
    const user = this.authService.currentUserValue;
    const branchId = localStorage.getItem('impersonated_branch_id');
    this.academyId = String(
      branchId || user?.academy?.id || ''
    );
  }

  ngOnDestroy(): void {
    this.attendanceModalRef?.dismiss();
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Calendar helpers
  // ──────────────────────────────────────────────────────────────────────────
  private formatDate(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  private dayAbbrFromDate(d: Date): string {
    const day = d.getDay(); // 0..6 (Sun..Sat)
    const map = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    return map[day] || 'mon';
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Schedules / calendar
  // ──────────────────────────────────────────────────────────────────────────

  loadSchedules(): void {
    this.loading = true;
    const loadId = ++this._scheduleLoadId;

    // Clear existing events immediately so stale events from a previous
    // view don't persist while the new request is in flight.
    this.calendarOptions.update(o => ({ ...o, events: [] }));

    const isDayView = this.activeView === 'dayGridDay';
    const filters: Record<string, any> = { per_page: 100 };

    if (isDayView) {
      // day view: send a single date — backend resolves day-of-week automatically
      filters['date'] = this.getCurrentCalendarDate();
    } else if (this._viewStart && this._viewEnd) {
      // month / week: send the visible period so attendance stats are scoped
      filters['date_from'] = this.formatDate(this._viewStart);
      // currentEnd is exclusive (first day of next period) — subtract 1 day for inclusive to-date
      const toDate = new Date(this._viewEnd);
      toDate.setDate(toDate.getDate() - 1);
      filters['date_to'] = this.formatDate(toDate);
    }

    this.scheduleService.getSchedules(this.academyId, filters).subscribe({
      next: (res) => {
        // Discard response if a newer loadSchedules() call was made in the meantime
        if (loadId !== this._scheduleLoadId) return;

        const schedules: any[] = (res as any).data || (res as any) || [];

        // Pre-normalize each schedule once so every view applies the exact same
        // inclusion rule. Daily/Weekly/Monthly differ ONLY in which dates we iterate.
        const prepared = schedules.map((s: any) => this.prepareSchedule(s));

        let events: EventInput[] = [];

        if (isDayView) {
          const todayStr = filters['date'] as string;
          events = this.buildEventsForDate(prepared, todayStr);
        } else if (this._visibleStart && this._visibleEnd) {
          // Week / month: generate concrete dated events for every visible day using
          // the same per-schedule rule as the day view, so the data is identical.
          const cursor = new Date(this._visibleStart);
          while (cursor < this._visibleEnd) {
            const dateStr = this.formatDate(cursor);
            events.push(...this.buildEventsForDate(prepared, dateStr));
            cursor.setDate(cursor.getDate() + 1);
          }
        }

        this.calendarOptions.update(o => ({ ...o, events }));
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        SWAL('error', 'تعذر تحميل مواعيد التدريب');
      }
    });
  }

  /** Normalize a raw schedule once, lowercasing all per-day keys. */
  private prepareSchedule(s: any): PreparedSchedule {
    const toLowerMap = (obj: Record<string, unknown> | null | undefined): Record<string, number> => {
      const out: Record<string, number> = {};
      Object.entries(obj || {}).forEach(([k, v]) => { out[k.toLowerCase()] = v as number; });
      return out;
    };

    return {
      raw: s,
      days: (s.days || [])
        .filter((d: unknown): d is string => typeof d === 'string')
        .map((d: string) => d.toLowerCase()),
      dayScheduleIds: toLowerMap(s.day_schedule_ids),
      dayCapacities: toLowerMap(s.day_current_capacities),
      dayAttended: toLowerMap(s.day_attendance_present_counts || s.day_attended_counts),
      dayPending: toLowerMap(s.day_waiting_counts || s.day_pending_counts),
      earliest: (s.earliest_session_date as string | null) || null,
    };
  }

  /** Build the concrete events occurring on a single date — shared by all views. */
  private buildEventsForDate(prepared: PreparedSchedule[], dateStr: string): EventInput[] {
    const dayAbbr = this.dayAbbrFromDate(new Date(dateStr + 'T00:00:00'));

    return prepared
      .map((p, index) => this.buildEventForDate(p, dateStr, dayAbbr, index))
      .filter((ev): ev is EventInput => ev !== null);
  }

  /** Single inclusion rule used everywhere; returns null when the schedule doesn't occur. */
  private buildEventForDate(
    p: PreparedSchedule,
    dateStr: string,
    dayAbbr: string,
    index: number
  ): EventInput | null {
    const { raw: s, days, dayScheduleIds, dayCapacities, dayAttended, dayPending, earliest } = p;

    // Hide occurrences before the schedule's first session date.
    if (earliest && dateStr < earliest) {
      return null;
    }

    // Only include schedules that occur on this day of the week.
    if (days.length > 0 && !days.includes(dayAbbr)) {
      return null;
    }

    const scheduleId = Number(dayScheduleIds[dayAbbr] ?? s.schedule_id ?? s.id);
    const enrolled = Number(dayCapacities[dayAbbr] ?? s.current_capacity ?? 0);
    const attended = Number(dayAttended[dayAbbr] ?? s.attendance_count ?? s.attended_count ?? 0);
    const pending = Number(dayPending[dayAbbr] ?? Math.max(0, enrolled - attended));
    const startTime = String(s.start_time ?? '');
    const endTime = String(s.end_time ?? '');
    const rowKey = Number(s.schedule_id ?? s.id ?? index);

    return {
      // FullCalendar requires unique event ids; include the date so the same schedule
      // can repeat across days in week/month views.
      id: `${scheduleId}-${startTime}-${endTime}-${rowKey}-${dateStr}`,
      title: s.activity_name || s.display_title || s.title || '',
      date: dateStr,
      extendedProps: {
        scheduleId,
        timeStart: s.start_time,
        timeEnd: s.end_time,
        activity: s.activity_name,
        gender: s.gender,
        level: s.level,
        ageGroup: s.age_group_name,
        capacity: s.capacity,
        enrolled,
        attended,
        pending,
        dayScheduleIds, // needed by onEventClick
        earliestSessionDate: earliest,
      }
    } as EventInput;
  }

  /** Helper callable from template to create an empty Set */
  newSet(): Set<number> { return new Set<number>(); }

  setView(v: FCView): void {
    this.activeView = v;
    this.calendarRef?.getApi()?.changeView(v);
  }

  prev(): void { this.calendarRef?.getApi()?.prev(); }
  next(): void { this.calendarRef?.getApi()?.next(); }

  openCalendarDatePicker(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    const api = this.calendarRef?.getApi();
    const current = api?.getDate();
    this.suppressCalendarNavigation = true;
    this.calendarNavigationDate = current ? new Date(current) : new Date();

    queueMicrotask(() => {
      this.calendarDatePicker?.open();
      this.suppressCalendarNavigation = false;
    });
  }

  onCalendarNavigationDateChange(date: Date | null): void {
    if (this.suppressCalendarNavigation || !date || Number.isNaN(date.getTime())) {
      return;
    }

    this.calendarNavigationDate = date;
    this.calendarRef?.getApi()?.gotoDate(date);
    this.calendarDatePicker?.close();
  }

  private onDatesSet(arg: DatesSetArg): void {
    const title = arg.view.title;
    const viewType = arg.view.type as FCView;
    // Use the actual period start (not activeStart which includes filler days)
    const periodStart: Date = (arg.view as any).currentStart ?? arg.start;
    const periodEnd: Date = (arg.view as any).currentEnd ?? arg.end;
    // Full grid range, including filler days from adjacent months in the month view.
    const visibleStart: Date = arg.start ?? periodStart;
    const visibleEnd: Date = arg.end ?? periodEnd;
    const dateKey = this.formatDate(periodStart);
    const key = `${viewType}|${dateKey}`;

    Promise.resolve().then(() => {
      this._currentTitle = title;
      this.activeView = viewType;
      this._viewStart = periodStart;
      this._viewEnd = periodEnd;
      this._visibleStart = visibleStart;
      this._visibleEnd = visibleEnd;
      this.cdr.markForCheck();

      if (this.lastSchedulesFilterKey !== key) {
        this.lastSchedulesFilterKey = key;
        this.loadSchedules();
      }
    });
  }

  private getCurrentCalendarDate(): string {
    const calendarDate = this.calendarRef?.getApi()?.getDate();
    return this.formatDate(calendarDate ? new Date(calendarDate) : new Date());
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Attendance modal
  // ──────────────────────────────────────────────────────────────────────────

  onEventClick(info: EventClickArg): void {
    const eventDate = info.event.start;
    if (!eventDate) {
      SWAL('error', 'تعذر تحديد تاريخ الجلسة');
      return;
    }

    const ext = info.event.extendedProps;
    const clickedDayAbbr = this.dayAbbrFromDate(eventDate); // lowercase
    // Normalize stored keys to lowercase (API may have returned 'Sun', 'Mon', etc.)
    const rawExtDayScheduleIds = (ext['dayScheduleIds'] || {}) as Record<string, number>;
    const dayScheduleIds: Record<string, number> = {};
    Object.entries(rawExtDayScheduleIds).forEach(([k, v]) => { dayScheduleIds[k.toLowerCase()] = v; });
    const mappedScheduleId = Number(dayScheduleIds[clickedDayAbbr]);
    const fallbackId = Number(ext['scheduleId'] || info.event.id);
    const scheduleId = mappedScheduleId || fallbackId;

    if (!scheduleId || isNaN(scheduleId)) {
      SWAL('error', 'تعذر تحديد الجدول المحدد');
      return;
    }

    const selectedDate = this.formatDate(eventDate);
    const earliestSessionDate = (ext['earliestSessionDate'] as string | null) || null;
    if (earliestSessionDate && selectedDate < earliestSessionDate) {
      return;
    }

    // Cancel any in-flight player list request from a previous modal.
    ++this._playersLoadId;
    this.attendanceModalRef?.dismiss();

    // Reset before opening so stale data is never shown
    this._pendingList = [];
    this._attendedList = [];
    this._unassignedList = [];
    this.playerSearch = '';
    this.attendanceLoading = false;
    this.attendanceTab = 'pending';
    this.selectedPlayerIds = new Set();
    this.saveLoading = false;
    this.attendanceWarnings = [];

    this.selectedScheduleId = scheduleId;
    this.selectedScheduleTitle = info.event.title;
    this.selectedDate = selectedDate;
    this.selectedTimeRange = { 'start': ext['timeStart'], 'end': ext['timeEnd'] };
    this.selectedScheduleCapacity = Number(ext['capacity'] || 0);
    this.selectedScheduleCurrentCapacity = Number(ext['enrolled'] || 0);
    this.selectedScheduleGenderKey = this.normalizeScheduleGenderKey(ext['gender']);
    this.selectedScheduleGenderName = this.resolveScheduleGenderLabel(this.selectedScheduleGenderKey);

    this.attendanceModalRef = this.modalService.open(
      this.attendanceModal,
      { size: 'lg', scrollable: true }
    );

    this.loadPlayers();
  }

  private mapUnassigned(raw: any[]): SchedulePlayerAttendance[] {
    return (raw || []).map(p => ({
      schedule_player_id: 0, // unassigned players have no schedule_player row
      player_id: p.player_id,
      player_name: p.player_name,
      gender: p.gender ?? null,
      mobile: p.mobile ?? '',
      subscription: {
        id: p.subscription?.id ?? 0,
        detail_id: p.subscription?.detail_id ?? 0,
        package_name: p.subscription?.package_name ?? p.package_name_ar ?? '',
        status: p.subscription?.status?.name ?? '',
        status_code: p.subscription?.status?.id ?? 0,
        package_type: p.subscription?.package_type?.id ?? 0,
        total_classes: p.subscription?.total_classes ?? null,
        remaining_classes: p.subscription?.remaining_classes ?? p.remaining_sessions ?? null,
        can_attend: p.subscription?.can_attend ?? false,
        attend_reason: p.subscription?.attend_reason ?? null,
        requires_schedule_assignment: p.subscription?.requires_schedule_assignment ?? false,
        required_days_per_week: p.subscription?.required_days_per_week ?? null,
        required_appointments_per_week: p.subscription?.required_appointments_per_week ?? p.subscription?.required_days_per_week ?? null,
        weeks_in_period: p.subscription?.weeks_in_period ?? null,
        classes_total: p.subscription?.classes_total ?? null,
        weekly_schedule_message: p.subscription?.weekly_schedule_message ?? null,
        schedule_assignment: p.subscription?.schedule_assignment ?? null,
      },
      attendance: {
        is_marked: false,
        attendance_id: null,
        attend_status: null,
        marked_at: null,
      },
      loading: false,
    }));
  }

  loadPlayers(): void {
    if (!this.selectedScheduleId || !this.selectedDate || !this.academyId) {
      return;
    }
    const loadId = ++this._playersLoadId;
    this.attendanceLoading = true;
    this.attendanceService
      .getSchedulePlayers(
        this.academyId,
        this.selectedScheduleId,
        this.selectedDate,
        this.trainer,
      )
      .subscribe({
        next: (res) => {
          if (loadId !== this._playersLoadId) {
            return;
          }
          const data = res?.data ?? res ?? {};
          this._pendingList = (data.pending_players ?? []).map((p: any) => ({ ...p, loading: false }));
          this._attendedList = (data.attended_players ?? []).map((p: any) => ({ ...p, loading: false }));
          this._unassignedList = this.mapUnassigned(data.unassigned_players ?? []);
          this.applyScheduleInfo(data.schedule);
          this.refreshAttendanceWarnings();
          this.attendanceLoading = false;
        },
        error: () => {
          if (loadId !== this._playersLoadId) {
            return;
          }
          this._pendingList = [];
          this._attendedList = [];
          this._unassignedList = [];
          this.attendanceWarnings = [];
          this.attendanceLoading = false;
          SWAL('error', 'تعذر تحميل قائمة اللاعبين');
        }
      });
  }

  toggleSelection(player: SchedulePlayerAttendance): void {
    if (!this.canManagePlayerAttendance) {
      return;
    }
    if (this.attendanceTab !== 'attended' && player.subscription && !player.subscription.can_attend) {
      SWAL('warning', player.subscription.attend_reason || 'لا يمكن تحضير اللاعب لعدم وجود حصص متبقية في الاشتراك');
      return;
    }
    if (this.selectedPlayerIds.has(player.player_id)) {
      this.selectedPlayerIds.delete(player.player_id);
    } else {
      this.selectedPlayerIds.add(player.player_id);
    }
    this.selectedPlayerIds = new Set(this.selectedPlayerIds); // trigger CD
    this.refreshAttendanceWarnings();
  }

  isSelected(player: SchedulePlayerAttendance): boolean {
    return this.selectedPlayerIds.has(player.player_id);
  }

  get allPendingSelected(): boolean {
    return this.pendingPlayers.length > 0 &&
      this.pendingPlayers.every(p => this.selectedPlayerIds.has(p.player_id));
  }

  get allAttendedSelected(): boolean {
    return this.attendedPlayers.length > 0 &&
      this.attendedPlayers.every(p => this.selectedPlayerIds.has(p.player_id));
  }

  get allNoAppointmentSelected(): boolean {
    return this.noAppointmentPlayers.length > 0 &&
      this.noAppointmentPlayers.every(p => this.selectedPlayerIds.has(p.player_id));
  }

  selectAll(): void {
    if (!this.canManagePlayerAttendance) {
      return;
    }
    if (this.allPendingSelected) {
      this.pendingPlayers.forEach(p => this.selectedPlayerIds.delete(p.player_id));
    } else {
      this.pendingPlayers.forEach(p => {
        if (p.subscription?.can_attend) {
          this.selectedPlayerIds.add(p.player_id);
        }
      });
    }
    this.selectedPlayerIds = new Set(this.selectedPlayerIds);
    this.refreshAttendanceWarnings();
  }

  selectAllAttended(): void {
    if (!this.canManagePlayerAttendance) {
      return;
    }
    if (this.allAttendedSelected) {
      this.attendedPlayers.forEach(p => this.selectedPlayerIds.delete(p.player_id));
    } else {
      this.attendedPlayers.forEach(p => this.selectedPlayerIds.add(p.player_id));
    }
    this.selectedPlayerIds = new Set(this.selectedPlayerIds);
    this.refreshAttendanceWarnings();
  }

  selectAllNoAppointment(): void {
    if (!this.canManagePlayerAttendance) {
      return;
    }
    if (this.allNoAppointmentSelected) {
      this.noAppointmentPlayers.forEach(p => this.selectedPlayerIds.delete(p.player_id));
    } else {
      this.noAppointmentPlayers.forEach(p => {
        if (p.subscription?.can_attend) {
          this.selectedPlayerIds.add(p.player_id);
        }
      });
    }
    this.selectedPlayerIds = new Set(this.selectedPlayerIds);
    this.refreshAttendanceWarnings();
  }

  setAttendanceTab(tab: 'pending' | 'attended' | 'no-appointment'): void {
    this.attendanceTab = tab;
    this.selectedPlayerIds = new Set();
    this.refreshAttendanceWarnings();
  }

  saveSelectedAttendance(): void {
    if (!this.canManagePlayerAttendance) {
      return;
    }

    if (this.selectedPlayerIds.size === 0 || !this.selectedScheduleId || !this.selectedDate) return;

    // ── No-appointment tab: manual attendance by player_id ──
    if (this.attendanceTab === 'no-appointment') {
      const targetPlayers = this._unassignedList.filter(p => this.selectedPlayerIds.has(p.player_id));
      if (targetPlayers.length === 0) return;

      const playerIds = targetPlayers.map(p => p.player_id);
      this.saveLoading = true;
      targetPlayers.forEach(p => (p.loading = true));

      this.attendanceService
        .markBulk(this.academyId, {
          schedule_id: this.selectedScheduleId,
          attend_date: this.selectedDate,
          manual_attendances: [{ player_id: playerIds }],
        })
        .subscribe({
          next: (res) => {
            this.selectedPlayerIds = new Set();
            this.saveLoading = false;
            this.loadPlayers();
            SWAL('success', res?.message || 'تم إضافة اللاعبين للحضور بنجاح');
          },
          error: (err) => {
            targetPlayers.forEach(p => (p.loading = false));
            this.saveLoading = false;
            SWAL('error', err?.error?.message || 'حدث خطأ أثناء الحفظ');
          },
        });
      return;
    }

    const sourceList = this.attendanceTab === 'attended' ? this._attendedList : this._pendingList;
    const targetPlayers = sourceList.filter(p => this.selectedPlayerIds.has(p.player_id));

    if (targetPlayers.length === 0) return;

    const schedulePlayerIds = targetPlayers
      .map(p => p.schedule_player_id)
      .filter(id => id > 0);
    const manualPlayerIds = this.attendanceTab === 'attended'
      ? targetPlayers
        .filter(p => Number(p.schedule_player_id) <= 0)
        .map(p => p.player_id)
      : [];

    if (schedulePlayerIds.length === 0 && manualPlayerIds.length === 0) {
      SWAL('warning', 'لا توجد سجلات حضور قابلة للحفظ');
      return;
    }

    this.saveLoading = true;

    targetPlayers.forEach(p => (p.loading = true));

    const payload: {
      schedule_id: number;
      attend_date: string;
      attendances?: { schedule_player_id: number[] }[];
      manual_attendances?: { player_id: number[]; attend_status: string }[];
    } = {
      schedule_id: this.selectedScheduleId,
      attend_date: this.selectedDate,
    };

    if (schedulePlayerIds.length > 0) {
      payload.attendances = [{ schedule_player_id: schedulePlayerIds }];
    }

    if (manualPlayerIds.length > 0) {
      payload.manual_attendances = [{ player_id: manualPlayerIds, attend_status: 'present' }];
    }

    this.attendanceService
      .markBulk(this.academyId, payload)
      .subscribe({
        next: (res) => {
          // Reload the players list so attendance state is fresh from server
          this.selectedPlayerIds = new Set();
          this.saveLoading = false;
          this.loadPlayers();
          const fallbackMessage = this.attendanceTab === 'attended'
            ? 'تم إلغاء الحضور بنجاح'
            : 'تم تحديث التحضير بنجاح';
          SWAL('success', res?.message || fallbackMessage);
        },
        error: (err) => {
          targetPlayers.forEach(p => (p.loading = false));
          this.saveLoading = false;
          SWAL('error', err?.error?.message || 'حدث خطأ أثناء حفظ التحضير');
        },
      });
  }

  get attendanceModalTitle(): string {
    if (!this.selectedDate) return 'حضور اللاعبين';
    const date = new Date(this.selectedDate + 'T00:00:00');
    const formatted = new Intl.DateTimeFormat('ar', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
    return `حضور اللاعبين ${formatted}`;
  }

  formatTime(t: string): string {
    if (!t) return '';
    const parts = t.split(':');
    const h = Number(parts[0] ?? 0);
    const m = Number(parts[1] ?? 0);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return new Intl.DateTimeFormat('ar', { hour: '2-digit', minute: '2-digit' }).format(d);
  }

  private filterBySearch(list: SchedulePlayerAttendance[]): SchedulePlayerAttendance[] {
    const term = this.playerSearch.trim().toLowerCase();
    if (!term) return list;
    return list.filter(p =>
      p.player_name.toLowerCase().includes(term) ||
      (p.mobile && p.mobile.includes(term))
    );
  }

  get pendingPlayers(): SchedulePlayerAttendance[] {
    return this.filterBySearch(this._pendingList);
  }

  get attendedPlayers(): SchedulePlayerAttendance[] {
    return this.filterBySearch(this._attendedList);
  }

  get noAppointmentPlayers(): SchedulePlayerAttendance[] {
    return this.filterBySearch(this._unassignedList);
  }

  requiresScheduleAssignment(player: SchedulePlayerAttendance): boolean {
    return !!player?.subscription?.requires_schedule_assignment;
  }

  navigateToScheduleAssignment(player: SchedulePlayerAttendance): void {
    if (!this.canManagePlayerAttendance) {
      return;
    }

    const subscriptionId = Number(
      player?.subscription?.schedule_assignment?.subscription_id
      || player?.subscription?.id
      || 0
    );
    const detailId = Number(
      player?.subscription?.schedule_assignment?.detail_id
      || player?.subscription?.detail_id
      || 0
    );

    if (!subscriptionId || !detailId) {
      SWAL('warning', 'تعذر تحديد بيانات الاشتراك للاعب المحدد.');
      return;
    }

    this.closeAttendanceModal();
    const urlTree = this.router.createUrlTree(
      ['/subscriptions', subscriptionId],
      {
        queryParams: {
          detail_id: detailId,
          open_schedule: 1,
        },
      }
    );
    const url = this.router.serializeUrl(urlTree);
    window.open(url, '_blank', 'noopener');
  }

  closeAttendanceModal(): void {
    ++this._playersLoadId;
    this.attendanceModalRef?.dismiss();
    this._pendingList = [];
    this._attendedList = [];
    this._unassignedList = [];
    this.playerSearch = '';
    this.attendanceWarnings = [];
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Display helpers
  // ──────────────────────────────────────────────────────────────────────────

  getGenderKey(gender: string): string {
    if (gender === 'male') return 'TRAINING_SCHEDULES.FORM.MALE';
    if (gender === 'female') return 'TRAINING_SCHEDULES.FORM.FEMALE';
    return 'TRAINING_SCHEDULES.FORM.MIXED';
  }

  getStatusBadgeColor(statusCode: number): string {
    const map: Record<number, string> = {
      0: 'primary', 1: 'danger', 2: 'fa4b42', 3: 'warning', 6: 'secondary'
    };
    return map[statusCode] ?? 'info';
  }

  private applyScheduleInfo(schedule: any): void {
    if (!schedule) return;

    this.selectedScheduleCapacity = Number(schedule.capacity ?? this.selectedScheduleCapacity ?? 0);
    this.selectedScheduleCurrentCapacity = Number(schedule.current_capacity ?? this.selectedScheduleCurrentCapacity ?? 0);
    this.selectedScheduleGenderKey = this.normalizeScheduleGenderKey(schedule.gender ?? this.selectedScheduleGenderKey);
    this.selectedScheduleGenderName = String(schedule.gender?.name || '').trim()
      || this.resolveScheduleGenderLabel(this.selectedScheduleGenderKey);
  }

  private refreshAttendanceWarnings(): void {
    this.attendanceWarnings = this.buildAttendanceWarnings();
  }

  private buildAttendanceWarnings(): string[] {
    if (this.attendanceTab !== 'no-appointment' || this.selectedPlayerIds.size === 0) {
      return [];
    }

    const selectedPlayers = this._unassignedList.filter((player) => this.selectedPlayerIds.has(player.player_id));
    if (selectedPlayers.length === 0) {
      return [];
    }

    const warnings: string[] = [];
    const capacityLimit = Number(this.selectedScheduleCapacity || 0);
    if (capacityLimit > 0) {
      const assignedPlayersCount = Math.max(
        this.getAssignedPlayersCount(),
        Number(this.selectedScheduleCurrentCapacity || 0)
      );
      const projectedPlayersCount = assignedPlayersCount + selectedPlayers.length;

      if (projectedPlayersCount > capacityLimit) {
        warnings.push(this.translate.instant('PLAYERS.MESSAGES.CAPACITY_EXCEEDED', { count: capacityLimit }));
      }
    }

    if (this.selectedScheduleGenderKey !== 'mixed') {
      const mismatchedPlayersCount = selectedPlayers.filter((player) => {
        const playerGender = this.normalizePlayerGenderKey(player.gender);
        return !playerGender || playerGender !== this.selectedScheduleGenderKey;
      }).length;

      if (mismatchedPlayersCount > 0) {
        warnings.push(this.translate.instant('PLAYERS.MESSAGES.GENDER_MISMATCH', {
          count: mismatchedPlayersCount,
          gender: this.selectedScheduleGenderName || this.resolveScheduleGenderLabel(this.selectedScheduleGenderKey),
        }));
      }
    }

    return warnings;
  }

  private getAssignedPlayersCount(): number {
    const playerIds = new Set<number>();
    [...this._pendingList, ...this._attendedList].forEach((player) => {
      if (player.player_id) {
        playerIds.add(player.player_id);
      }
    });
    return playerIds.size;
  }

  private normalizeScheduleGenderKey(value: any): 'male' | 'female' | 'mixed' {
    const raw = String(value?.key ?? value?.id ?? value ?? '').trim().toLowerCase();
    if (raw === 'male' || raw === '2') return 'male';
    if (raw === 'female' || raw === '1') return 'female';
    return 'mixed';
  }

  private normalizePlayerGenderKey(value: any): 'male' | 'female' | null {
    const raw = String(value?.key ?? value?.id ?? value ?? '').trim().toLowerCase();
    if (raw === 'male' || raw === '1') return 'male';
    if (raw === 'female' || raw === '2') return 'female';
    return null;
  }

  private resolveScheduleGenderLabel(gender: 'male' | 'female' | 'mixed'): string {
    if (gender === 'male') return this.translate.instant('TRAINING_SCHEDULES.FORM.MALE');
    if (gender === 'female') return this.translate.instant('TRAINING_SCHEDULES.FORM.FEMALE');
    return this.translate.instant('TRAINING_SCHEDULES.FORM.MIXED');
  }


  openQrAttendanceModal(): void {
    if (!this.canManagePlayerAttendance) {
      return;
    }

    this.qrInput = '';
    this.qrState = 'idle';
    this.qrError = '';
    this.qrResult = null;
    this.qrSaveLoading = false;
    this.qrSaveSuccess = false;
    if (this._qrDebounceTimer) clearTimeout(this._qrDebounceTimer);
    const ref = this.modalService.open(this.qrAttendanceModal, { size: 'md', centered: true });
    ref.shown.subscribe(() => setTimeout(() => this.focusQrInput(), 80));
    ref.hidden.subscribe(() => {
      if (this._qrDebounceTimer) clearTimeout(this._qrDebounceTimer);
    });
  }

  focusQrInput(): void {
    const input = document.querySelector('.qr-scanner-input') as HTMLInputElement;
    input?.focus({ preventScroll: true });
  }

  onQrInputChange(): void {
    if (this._qrDebounceTimer) clearTimeout(this._qrDebounceTimer);
    const value = this.qrInput.trim();
    if (!value) return;
    this._qrDebounceTimer = setTimeout(() => {
      this.processQrScan(value);
    }, 2000);
  }

  onQrKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (this._qrDebounceTimer) clearTimeout(this._qrDebounceTimer);
      const value = this.qrInput.trim();
      if (value) this.processQrScan(value);
    }
  }

  processQrScan(value: string): void {
    this.qrState = 'loading';
    this.qrError = '';
    this.qrResult = null;
    this.qrSaveSuccess = false;
    this.attendanceService.scanQr(value).subscribe({
      next: (res) => {
        if (res?.success && res?.data) {
          this.qrResult = res.data;
          this.qrState = 'success';
          this.qrInput = '';
          setTimeout(() => this.focusQrInput(), 80);
        } else {
          this.qrState = 'error';
          this.qrError = res?.message || 'تعذر قراءة رمز QR';
        }
      },
      error: (err) => {
        this.qrState = 'error';
        this.qrError = err?.error?.message || 'تعذر قراءة رمز QR';
        this.qrInput = '';
        setTimeout(() => this.focusQrInput(), 80);
      }
    });
  }

  saveQrAttendance(): void {
    if (!this.canManagePlayerAttendance) {
      return;
    }

    if (!this.qrResult || !this.academyId) return;
    const { schedule } = this.qrResult;
    this.qrSaveLoading = true;
    this.attendanceService.markBulk(this.academyId, {
      schedule_id: schedule.schedule_id,
      attend_date: schedule.date,
      attendances: [{ schedule_player_id: [schedule.id] }],
    }).subscribe({
      next: () => {
        this.qrSaveLoading = false;
        this.qrSaveSuccess = true;
        this.qrResult = null;
        this.qrState = 'idle';
        this.qrInput = '';
        setTimeout(() => this.focusQrInput(), 80);
      },
      error: (err) => {
        this.qrSaveLoading = false;
        SWAL('error', err?.error?.message || 'حدث خطأ أثناء تسجيل الحضور');
      }
    });
  }

  resetQrScan(): void {
    if (this._qrDebounceTimer) clearTimeout(this._qrDebounceTimer);
    this.qrInput = '';
    this.qrState = 'idle';
    this.qrError = '';
    this.qrResult = null;
    this.qrSaveSuccess = false;
    setTimeout(() => this.focusQrInput(), 80);
  }
}
