import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
// import { UploadFoldersEnum } from 'src/app/core/backend/common/models';
import { CustomDropzonePreviewComponent } from '../custom-image-previewer/custom-dropzone-preview.component';
const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
@Component({
  selector: 'mg-uploader',
  imports: [
    CommonModule,
    NzUploadModule,
    CustomDropzonePreviewComponent
  ],
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploaderComponent),
      multi: true
    }
  ]
})
export class UploaderComponent implements ControlValueAccessor {
  @Input() multiple: boolean = false;
  @Input() removable: boolean = false;
  @Input() AttachmentModule: any | undefined = undefined;
  @Input({ required: true }) Mode: 'ViewImages' | 'ViewFiles' | 'Files' | 'Imgs' = 'Files';
  @Input() referenceId: string | undefined | null = undefined;
  @Input() filesUrls: Array<string | undefined | null> = [];

  beforeUpload = (file: NzUploadFile): boolean => {
    if (this.multiple) {
      this.files = this.files.concat(file);
    } else {
      this.files = [file];
    }
    this.onChange(this.multiple ?
      this.files.filter(file => file as unknown as File)?.map(file => file as unknown as File) as File[] || []
      : this.files[0] as unknown as File || undefined);


    return false;
  };



  files: NzUploadFile[] = [];
  onChange: (value: File[] | File | undefined) => void = () => { };
  onTouched: () => void = () => { };

  constructor() {
    console.log(this.filesUrls);

  }

  writeValue(files: File[] | File): void {
    this.files = [];
    if (files) {
      this.files = Array.isArray(files) ?
        files.map(file => ({ originFileObj: file, name: file.name, uid: file.name }))
        : [{ originFileObj: files, uid: files.name, name: files.name }];
    }
  }

  registerOnChange(fn: (value: File[] | File | undefined) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }


}
