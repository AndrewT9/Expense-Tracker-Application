import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ITransaction } from '../../models/transaction.interface'
import { dateFormat } from '../../helpers/dateFormat.helper'

export enum NewFilingFormControls {
  Name = 'name',
  Amount = 'amount',
  TransactionType = 'transactionType',
  Category = 'category',
  Date = 'date'
}

export class NewFilingForm extends FormGroup {
  constructor(data?: ITransaction) {    
    super({
      [NewFilingFormControls.Name]: new FormControl(data?.name ?? '', Validators.required),
      [NewFilingFormControls.Amount]: new FormControl(data?.amount ?? '', [Validators.required,  Validators.pattern('^[0-9]*$')]),
      [NewFilingFormControls.TransactionType]: new FormControl(data?.transactionType ?? '', Validators.required),
      [NewFilingFormControls.Category]: new FormControl(data?.category ?? '', Validators.required),
      [NewFilingFormControls.Date]: new FormControl(data?.date || dateFormat(), Validators.required),
    })
  }
}
