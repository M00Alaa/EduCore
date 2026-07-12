import { CommonModule, NgClass, NgOptimizedImage } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, forwardRef, inject, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SparePart, SparePartVm } from 'src/app/core/backend/base/models';
import { environment } from 'src/environments/environment';
import { SparePartService } from 'src/app/core/backend/base/services';
@Component({
  selector: 'mg-spare-part-selector',
  imports: [CommonModule, NgSelectModule, FormsModule, NgClass,],

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SparePartSelectorComponent),
      multi: true,
    },
  ],
  templateUrl: './spare-part-selector.component.html',
  styleUrl: './spare-part-selector.component.scss'
})
export class SparePartSelectorComponent {
  value: SparePart['id'] | undefined = undefined;
  domain = environment.api;
  @Input() disabled = false;
  @Input() classes = '';
  @Input() skipIds: number[] = [];
  @Input() placeholder = 'اختر قطعة الغيار';
  private sparePartService = inject(SparePartService);
  @Output() isChanged = new EventEmitter<SparePartVm | undefined>();


  constructor() {
  }

  ngOnInit(): void {
    this.getspareParts();
  }

  loading = false;
  spareParts: SparePartVm[] | null | undefined;
  getspareParts() {
    this.loading = true;
    this.sparePartService.getAllSpareParts({
      body: {

      }
    }).subscribe({
      next: (res) => {
        this.spareParts = res.items?.items || [];
        this.loading = false;
        this.isChanged.emit(this.spareParts?.find(e => e.id == this.value) || undefined);
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
      this.isChanged.emit(this.spareParts?.find(e => e.id == value) || undefined);
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
