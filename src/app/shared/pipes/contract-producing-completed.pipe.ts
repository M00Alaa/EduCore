import { Pipe, PipeTransform } from '@angular/core';
import { ContractStatusEnum } from 'src/app/core/backend/base/models';

@Pipe({
  name: 'contractProducingCompleted',
  standalone: true
})
export class ContractProducingCompletedPipe implements PipeTransform {

  transform(status: ContractStatusEnum | undefined): boolean {
    const editableStatus = {
      [ContractStatusEnum.Pending]: false,
      [ContractStatusEnum.WaitingBrandSignature]: false,
      [ContractStatusEnum.WaitingConfirmBrandSignature]: false,
      [ContractStatusEnum.WaitingContractFile]: false,
      [ContractStatusEnum.InProgress]: false,
      [ContractStatusEnum.SoldOut]: true,
      [ContractStatusEnum.ProductionCompleted]: true,
    }
    return (status && editableStatus[status]) || false;
  }

}
