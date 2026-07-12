import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, forwardRef, inject, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SWAL } from 'src/app/app-const';
import { Equipment, EquipmentVm } from 'src/app/core/backend/base/models';
import { EquipmentService, HrService } from 'src/app/core/backend/base/services';

@Component({
  selector: 'mg-equipment-selector',
  imports: [CommonModule, NgSelectModule, FormsModule, NgClass],
  templateUrl: './equipment-selector.component.html',
  styleUrl: './equipment-selector.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EquipmentSelectorComponent),
      multi: true,
    },
  ]
})
export class EquipmentSelectorComponent implements OnInit, ControlValueAccessor {
  value: EquipmentVm['id'] | undefined = undefined;
  @Input() disabled = false;
  @Input() classes = '';
  @Input() placeholder = 'اختر المعدة';
  private eqService = inject(EquipmentService);
  @Output() isChanged = new EventEmitter<EquipmentVm | undefined>();

  constructor() {
  }

  ngOnInit(): void {
    this.getEquipments();
  }

  // Group by equipmentTypeName
  groupByFn = (item: EquipmentVm) => item.equipmentTypeName || 'غير معرف';

  loading = false;
  equipments: EquipmentVm[] | null | undefined
  getEquipments() {
    this.loading = true;
    this.eqService.getEquipmentsForDropDown({
      body: {

      }
    }).subscribe({
      next: (res) => {
        this.equipments = res.items;
        this.loading = false;
        this.isChanged.emit(this.equipments?.find(e => e.id == this.value) || undefined);
      },
      error: (err) => {
        this.loading = false;

      }
    })
  }


  // ?? Value accssor props

  onChange = (value: EquipmentVm['id']) => { };
  onTouched = () => { };

  writeValue(value: EquipmentVm['id']): void {
    this.value = value;
  }

  registerOnChange(fn: (value: EquipmentVm['id']) => void): void {
    this.onChange = (value: EquipmentVm['id']) => {
      this.isChanged.emit(this.equipments?.find(e => e.id == value) || undefined);
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
