import { Component, OnInit } from '@angular/core';
import { Subscription, interval, take } from 'rxjs';
import { SWAL, logo } from 'src/app/app-const';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
  standalone: false
})
export class VerificationComponent implements OnInit {

  logos = logo;
  logo = logo.light;
  phoneNumber = '0564225222'; // Can be dynamic from route params or service
  otpValue = '';

  constructor() { }
  // set the currenr year
  year: number = new Date().getFullYear();

  ngOnInit(): void {
    document.body.classList.remove('auth-body-bg')
    this.countDownTimer();
  }

  $timer = 0;
  timerSubscription: Subscription | undefined;

  countDownTimer() {
    this.$timer = 60;
    this.timerSubscription = interval(1000)
      .pipe(take(this.$timer))
      .subscribe(() => {
        this.$timer--;
        if (this.$timer === 0) {
          this.timerSubscription?.unsubscribe();
        }
      });
  }

  sendAgain() {
    if (this.$timer <= 0) {
      SWAL('success', 'UI_MESSAGES.VERIFICATION.RESEND_SUCCESS');
      this.countDownTimer();
    }
  }

  onOtpChange(otp: string) {
    this.otpValue = otp;
  }

  verifyOtp() {
    if (this.otpValue && this.otpValue.length === 4) {
      // Add your verification logic here
      console.log('OTP entered:', this.otpValue);
      SWAL('success', 'UI_MESSAGES.VERIFICATION.VERIFIED_SUCCESS');
    } else {
      SWAL('error', 'UI_MESSAGES.VERIFICATION.CODE_REQUIRED');
    }
  }

}
