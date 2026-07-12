import { CommonModule, NgClass, NgOptimizedImage } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, forwardRef, inject, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Shift } from 'src/app/core/backend/base/models';
import { environment } from 'src/environments/environment';
import { ShiftService } from 'src/app/core/backend/base/services';

@Component({
  selector: 'mg-shift-selector',
  templateUrl: './shift-selector.component.html',
  styleUrl: './shift-selector.component.scss',
  imports: [CommonModule, NgSelectModule, FormsModule, NgClass,],

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ShiftSelectorComponent),
      multi: true,
    },
  ]
})
export class ShiftSelectorComponent implements OnInit, ControlValueAccessor {
  value: Shift['id'] | undefined = undefined;
  domain = environment.api;
  @Input() disabled = false;
  @Input() classes = '';
  @Input() skipIds: number[] = [];
  @Input() placeholder = 'اختر الوردية';
  private shiftService = inject(ShiftService);
  @Output() isChanged = new EventEmitter<Shift | undefined>();
  @Output() allShifts = new EventEmitter<Shift[] | undefined>();


  constructor() {
  }

  ngOnInit(): void {
    this.getshifts();
  }

  loading = false;
  shifts: Shift[] | null | undefined;
  getshifts() {
    this.loading = true;
    this.shiftService.getAllShifts({
      body: {
      }
    }).subscribe({
      next: (res) => {
        this.shifts = res.items || [];
        this.loading = false;
        this.isChanged.emit(this.shifts?.find(e => e.id == this.value) || undefined);
        this.allShifts.emit(this.shifts);
      },
      error: (err) => {
        this.loading = false;

      }
    })
  }


  // ?? Value accssor props

  onChange = (value: number) => { 
    this.isChanged.emit(this.shifts?.find(e => e.id == value) || undefined);
  };
  onTouched = () => { };

  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = (value: number) => {
      this.isChanged.emit(this.shifts?.find(e => e.id == value) || undefined);
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
