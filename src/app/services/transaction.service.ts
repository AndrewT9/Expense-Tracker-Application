import { ITransaction } from '../models/transaction.interface'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { TransactionData, TransactionEnum } from '../models/transaction.const'

export class TransactionService {
  public transactionDataSource$ = new BehaviorSubject<ITransaction[]>(this.getDataFromLocalStorage())
  public searchTransactionSource$ = new BehaviorSubject<ITransaction[]>(this.getDataFromLocalStorage())
  public totalAmount$ = new BehaviorSubject<number>(0)

  constructor() {
    this.countTotalData()
  }

  private getDataFromLocalStorage(): ITransaction[] {
    const storedData = localStorage.getItem('transactions')
    return storedData ? JSON.parse(storedData) : TransactionData
  }

  private saveDataToLocalStorage(data: ITransaction[]): void {
    localStorage.setItem('transactions', JSON.stringify(data))
  }

  public countTotalData() {
    this.transactionDataSource$
      .pipe(
        map((transactions) => {
          return transactions.reduce((total, transaction) => {
            const condition = transaction.transactionType === TransactionEnum.Income
            return condition ? total + +transaction.amount : total - +transaction.amount
          }, 0)
        }),
      )
      .subscribe((total) => {
        this.totalAmount$.next(total)
      })
  }

  public getData(): Observable<ITransaction[]> {
    return this.searchTransactionSource$
  }

  public addData(data: ITransaction): void {
    const newData = { ...data, id: this.searchTransactionSource$.value.length + 1 }
    const updatedData = [...this.searchTransactionSource$.value, newData]
    this.searchTransactionSource$.next(updatedData)
    this.transactionDataSource$.next(updatedData)
    this.saveDataToLocalStorage(updatedData)
  }

  public deleteData(id: number): void {
    const updatedData = this.transactionDataSource$.value.filter((b) => b.id !== id)
    this.transactionDataSource$.next(updatedData)
    this.searchTransactionSource$.next(updatedData)
    this.saveDataToLocalStorage(updatedData)
  }

  public updateData(updatedData: ITransaction): void {
    const data = this.transactionDataSource$.value
    const index = data.findIndex((b) => b.id === updatedData.id)
    if (index > -1) {
      data[index] = updatedData
      this.searchTransactionSource$.next([...data])
      this.saveDataToLocalStorage(data)
    }
  }
}
