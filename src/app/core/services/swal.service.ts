import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HandlingService {

  constructor(
    private translate: TranslateService
  ) { }

  static error(title: string, msg: string) {
    Swal.fire(title, msg, 'error');
  }

  handleError(err: {
    status: number;
    error?: any,
    errors?: any,
    message: string;
  }) {

    try {
      if (err?.errors) {
        let msg = ``;
        Object.entries(err.errors).forEach((e) => {
          msg += this.translate.instant(e[0] as string || ' ') + '-' + this.translate.instant(e[1] as string || ' ') + '\n'
        })
        Swal.fire('', msg, 'error');
        return;
      }
      let errorTitle = '';
      if (err?.status) {
        switch (err.status) {
          case 401:
            errorTitle = 'you-are-unauthorized';
            break;

          default:
            break;
        }
      }
      Swal.fire(this.translate.instant(errorTitle || ' ') || '', this.translate.instant(err?.message || ' ') || '', 'error');

    } catch (error) {
      console.error(error);

      Swal.fire(this.translate.instant('an-error-occurred'), '', 'error');

    }
  }

  deleteConfirmation(title: string, text: string, callBack: Observable<any>): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: title || this.translate.instant('Are you sure you want to remove this?'),
      text: text || this.translate.instant("You can't undo this action"),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('Yes, remove it forever!'),
      cancelButtonText: this.translate.instant('No, keep it 😊'),
      preConfirm: () => {
        // Return a Promise to handle asynchronous operations
        return new Promise((resolve, reject) => {
          // Display loading state
          Swal.showLoading();

          // Call the deleteAccount function
          callBack.subscribe(
            {
              next: (res) => {
                // Close the loading state
                Swal.close();
                resolve(true); // Resolve the Promise
              },
              error: (err) => {
                // Close the loading state
                Swal.close();
                // Handle error
                this.handleError(err);

                reject(); // Reject the Promise
              }
            }
          );
        });
      },
    })

  }

}
