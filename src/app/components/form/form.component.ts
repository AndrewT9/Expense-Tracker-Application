import { CATEGORIES, TRANSACTION_TYPE } from './../../models/transaction.const'
import { TransactionService } from '../../services/transaction.service'
import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, Inject, OnInit } from '@angular/core'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { Subject } from 'rxjs'
import { NewFilingForm } from './form.class'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatSelectModule } from '@angular/material/select'
import { MatDatepickerModule } from '@angular/material/datepicker'
import type { ICategories, ITransaction, ITransactionType } from '../../models/transaction.interface'

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    CommonModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {
  private filterEventEmitter = new Subject();
  public formGroup!: FormGroup;
  public submitted = false;
  public btnText = this.data ? 'Update' : 'Add';
  public transactionTypes: ITransactionType[] = TRANSACTION_TYPE;
  public categories: ICategories[] = CATEGORIES;

  constructor(
    private transactionService: TransactionService,
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITransaction,
  ) {}

  public today = new Date();

  ngOnInit() {
    this.formGroup = new NewFilingForm(this.data);
    this.filterEventSource(this.filterEventEmitter);
  }

  private _snackBar = inject(MatSnackBar)

  public openSnackBar(message: string, action: string, duration: number) {
    this._snackBar.open(message, action, { duration })
  }

  public get form() {
    return this.formGroup?.controls
  }

  private filterEventSource(event: { subscribe: (arg0: (event: any) => void) => void }) {
    event.subscribe(this.reloadData)
  }

  private reloadData(event: Event) {
    console.log(event)
  }

  public createForm() {
    this.formGroup = new NewFilingForm()
  }

  public onSubmit() {
    const snakeBarText = this.data ? 'Updated' : 'Added'
    this.submitted = true

    if (!this.formGroup?.valid) return

    if (this.data?.id) {
      this.transactionService.updateData({
        ...this.formGroup?.value,
        id: this.data.id,
      })
      this.transactionService.countTotalData()
    } else {
      this.transactionService.addData(this.formGroup?.value)
    }

    this.dialogRef.close()
    this.openSnackBar(`Successful ${snakeBarText}`, 'Ok', 2000)
  }
}
