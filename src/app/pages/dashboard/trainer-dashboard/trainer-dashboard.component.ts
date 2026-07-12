import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { SWAL } from 'src/app/app-const';
import {
  TrainerDashboardAttendanceItem,
  TrainerDashboardTeam,
  TrainerPortalService
} from 'src/app/core/backend/academy/services/trainer-portal.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'mo-trainer-dashboard',
  standalone: false,
  templateUrl: './trainer-dashboard.component.html',
  styleUrl: './trainer-dashboard.component.scss'
})
export class TrainerDashboardComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  academyId = '';
  loading = false;
  playerCount = 0;
  teamCount = 0;
  teams: TrainerDashboardTeam[] = [];
  attendanceItems: TrainerDashboardAttendanceItem[] = [];

  constructor(
    private trainerPortalService: TrainerPortalService,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.identity()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          const user = this.authService.currentUserValue as any;
          const branchId = localStorage.getItem('impersonated_branch_id');
          this.academyId = String(branchId || user?.academy?.id || user?.academy_id || '');

          if (!this.academyId) {
            SWAL('error', 'تعذر تحديد الأكاديمية الحالية');
            return;
          }

          this.loadDashboard();
        }
      });
  }

  loadDashboard(): void {
    this.loading = true;

    this.trainerPortalService.getDashboard(this.academyId, {
      teams_limit: 8,
      attendance_limit: 8
    })
      .pipe(
        finalize(() => (this.loading = false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (data) => {
          this.playerCount = Number(data?.cards?.players_count ?? 0);
          this.teamCount = Number(data?.cards?.teams_count ?? 0);
          this.teams = Array.isArray(data?.teams) ? data.teams : [];
          this.attendanceItems = Array.isArray(data?.attendance_items) ? data.attendance_items : [];
        },
        error: () => {
          this.playerCount = 0;
          this.teamCount = 0;
          this.teams = [];
          this.attendanceItems = [];
          SWAL('error', 'تعذر تحميل بيانات لوحة المدرب');
        }
      });
  }

  goToAppointments(): void {
    this.router.navigate(['/trainer/appointments']);
  }

  goToPlayers(): void {
    this.router.navigate(['/trainer/players']);
  }

  formatTime(value?: string | null): string {
    if (!value) {
      return '-';
    }

    const timeParts = String(value).match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
    if (timeParts) {
      const hours = Number(timeParts[1]);
      const minutes = Number(timeParts[2]);
      if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
        const suffix = hours >= 12 ? 'م' : 'ص';
        const hour12 = hours % 12 || 12;
        return `${hour12}:${String(minutes).padStart(2, '0')} ${suffix}`;
      }
    }

    return String(value);
  }
}
