import { TransactionService } from '../../services/transaction.service'
import { ChangeDetectionStrategy, Component, OnDestroy, ViewContainerRef } from '@angular/core'
import { ListComponent } from '../../components/item-list/item-list.component'
import { MatDialog } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { FormComponent } from '../../components/form/form.component'
import { CommonModule } from '@angular/common'
import { ITransaction } from '../../models/transaction.interface'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  standalone: true,
  providers: [TransactionService],
  imports: [ListComponent, MatButtonModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage implements OnDestroy {
  public data = this.transactionService.getData();
  public totalAmount$ = this.transactionService.totalAmount$;

  constructor(
    public dialog: MatDialog,
    private transactionService: TransactionService,
    private viewContainerReference: ViewContainerRef,
  ) { }

  public handleUpdate(data: ITransaction) {
    this.transactionService.updateData(data);
    this.openDialog(data);
  }

  public handleDelete(id: number) {
    this.transactionService.deleteData(id);
  }

  public openDialog(data?: ITransaction): void {
    this.dialog.open(FormComponent, {
      minWidth: '250px',
      data: data,
      viewContainerRef: this.viewContainerReference,
    })
  }

  ngOnDestroy() {
    this.transactionService.transactionDataSource$.unsubscribe()
  }
}
