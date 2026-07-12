import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, Input } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxPrintModule, NgxPrintService, PrintOptions } from 'ngx-print';

@Component({
  selector: 'mg-qr-viewer',
  standalone: true,
  imports: [CommonModule,
    QRCodeModule,
    NgxPrintModule
  ],
  templateUrl: './qr-viewer.component.html',
  styleUrls: ['./qr-viewer.component.scss']
})
export class QrViewerComponent {
  @Input({ required: true }) QRValue: string | undefined | null;
  @Input() showText = true;
  @Input() size = 100;
  @Input() Printable = false;
  @Input() PrintLabel: string | undefined | null;
  @Input() boxMode = true;

  private printService: NgxPrintService = inject(NgxPrintService);

  print() {
    const customPrintOptions: PrintOptions = new PrintOptions({
      printSectionId: 'QR-print-section-' + this.QRValue,
      useExistingCss: true,
      closeWindow: true,
      bodyClass: 'qrcode-print',
    });
    this.printService.print(customPrintOptions)
  }
  qrCodeDownloadLink: SafeUrl | undefined = undefined;
  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }
}
