import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, forwardRef, inject, Input, Output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { StoneCrusher, WorkLocation } from 'src/app/core/backend/base/models';
import { StoneCrusherService, WorkLocationService } from 'src/app/core/backend/base/services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'mg-stone-crusher-selector',
  imports: [CommonModule, NgSelectModule, FormsModule, NgClass,],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StoneCrusherSelectorComponent),
      multi: true,
    },
  ],
  templateUrl: './stone-crusher-selector.component.html',
  styleUrl: './stone-crusher-selector.component.scss'
})
export class StoneCrusherSelectorComponent {
  value: StoneCrusher['id'] | undefined = undefined;
  domain = environment.api;
  @Input() disabled = false;
  @Input() classes = '';
  @Input() skipIds: number[] = [];
  @Input() placeholder = 'اختر الموقع';
  private workLocationService = inject(StoneCrusherService);
  @Output() isChanged = new EventEmitter<StoneCrusher | undefined>();


  constructor() {
  }

  ngOnInit(): void {
    this.getStoneCrusher();
  }

  loading = false;
  StoneCrusher: StoneCrusher[] | null | undefined;
  getStoneCrusher() {
    this.loading = true;
    this.workLocationService.getAllStoneCrushers({
      body: {

      }
    }).subscribe({
      next: (res) => {
        this.StoneCrusher = res.items?.items || [];
        this.loading = false;
        this.isChanged.emit(this.StoneCrusher?.find(e => e.id == this.value) || undefined);
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
      this.isChanged.emit(this.StoneCrusher?.find(e => e.id == value) || undefined);
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
