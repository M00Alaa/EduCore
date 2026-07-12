import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ContractStatusEnum } from 'src/app/core/backend/base/models';

@Component({
  selector: 'mg-contract-details-status',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './contract-details-status.component.html',
  styleUrls: ['./contract-details-status.component.scss']
})
export class ContractDetailsStatusComponent {
  @Input() contractStatus: ContractStatusEnum | undefined;
  ContractStatusEnum = ContractStatusEnum;
}
