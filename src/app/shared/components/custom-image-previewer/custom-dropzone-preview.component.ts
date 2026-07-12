/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/component-selector */
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NgxDropzoneModule, NgxDropzonePreviewComponent } from 'ngx-dropzone';
import { SWALConfirmation } from 'src/app/app-const';
// import { UploadFoldersEnum } from 'src/app/core/backend/common/models';
// import { AttachmentService } from 'src/app/core/backend/common/services';
import { environment } from 'src/environments/environment';

@Component({
  host: {
    '[class.bg-transparent]': '!this.url',
    '[class.border-0]': '!this.url',
  },
  selector: 'custom-dropzone-preview',
  templateUrl: './custom-dropzone-preview.component.html',
  styleUrls: ['./custom-dropzone-preview.component.scss'],
  imports: [NgxDropzoneModule, CommonModule, NzImageModule],
  providers: [
    {
      provide: NgxDropzonePreviewComponent,
      useExisting: CustomDropzonePreviewComponent,
    },
  ]
})
export class CustomDropzonePreviewComponent
  extends NgxDropzonePreviewComponent
  implements OnInit {
  domain = environment.api;
  @Input() loading = false;
  @Input({ required: true }) referenceId: number | string | undefined | null = undefined;
  @Input({ required: true }) AttachmentModule: any | undefined = undefined;
  @Input({ required: true }) url: string | undefined | null = '';
  @HostBinding('class')
  classes = '';

  public get fileTypeClass(): 'img' | 'file' {
    const fileName = this.fileType.toLowerCase();
    if (
      fileName.includes('png') ||
      fileName.includes('jpg') ||
      fileName.includes('jpeg') ||
      fileName.includes('gif') ||
      fileName.includes('svg') ||
      fileName.includes('webp') ||
      fileName.includes('jfif')
    ) {
      return 'img';
    }

    return 'file';
  }

  @Input() type: 'IMG' | 'FILE' = 'FILE';
  @Output() override removed: EventEmitter<File> = new EventEmitter<File>();
  @Output() fileRemoved: EventEmitter<string> = new EventEmitter<string>();
  override _remove(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.url) {
      // SWALConfirmation(
      //   'warning',
      //   'هل تريد حذف هذا الملف؟',
      //   this.attachmentService.deleteFile({
      //     body: {
      //       Url: this.url,
      //       AttachType: this.AttachmentModule,
      //       ReferenceId: (this.referenceId as any)
      //     },
      //   }),
      //   'تم الحذف',
      //   'نعم، احذف',
      //   'سيتم حذف هذا الملف بشكل دائم ولا يمكن استرجاعه',
      // )
      //   .then((res) => {
      //     if (res.value) {
      //       this.url = undefined;
      //       this.fileRemoved.emit(this.url || undefined);
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    }
  }

  public get fileType(): string {
    return this.url?.slice(this.url.lastIndexOf('.') + 1)?.slice(0, 5) || '';
  }
  public get fileName(): string {
    return this.url?.substring((this.url?.lastIndexOf('\\') || this.url?.lastIndexOf('/')) + 1).slice(0, 50) || '';
  }

  constructor(
    sanitizer: DomSanitizer,
    // private attachmentService: AttachmentService,
  ) {
    super(sanitizer);
  }

  ngOnInit(): void {
    this.classes = this.type;
  }
}
