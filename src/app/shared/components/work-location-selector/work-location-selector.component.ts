
import { CommonModule, NgClass, NgOptimizedImage } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, forwardRef, inject, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { environment } from 'src/environments/environment';
import { WorkLocationService } from 'src/app/core/backend/base/services';
import { WorkLocation } from 'src/app/core/backend/base/models';

@Component({
  selector: 'mg-work-location-selector',
  templateUrl: './work-location-selector.component.html',
  styleUrl: './work-location-selector.component.scss',
  imports: [CommonModule, NgSelectModule, FormsModule, NgClass,],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WorkLocationSelectorComponent),
      multi: true,
    },
  ]
})
export class WorkLocationSelectorComponent implements OnInit, ControlValueAccessor {
  value: WorkLocation['id'] | undefined = undefined;
  domain = environment.api;
  @Input() disabled = false;
  @Input() classes = '';
  @Input() skipIds: number[] = [];
  @Input() placeholder = 'اختر الموقع';
  private workLocationService = inject(WorkLocationService);
  @Output() isChanged = new EventEmitter<WorkLocation | undefined>();


  constructor() {
  }

  ngOnInit(): void {
    this.getworkLocations();
  }

  loading = false;
  workLocations: WorkLocation[] | null | undefined;
  getworkLocations() {
    this.loading = true;
    this.workLocationService.getAllWorkLocations({
      body: {

      }
    }).subscribe({
      next: (res) => {
        this.workLocations = res.items?.items || [];
        this.loading = false;
        this.isChanged.emit(this.workLocations?.find(e => e.id == this.value) || undefined);
      },
      error: (err) => {
        this.loading = false;

      }
    })
  }


  // ?? Value accssor props

  onChange = (value: number) => { };
  onTouched = () => { };

  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = (value: number) => {
      this.isChanged.emit(this.workLocations?.find(e => e.id == value) || undefined);
      fn(value);
    };;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
